<template>
  <div>
    <ul class="sub-menu">
      <li
        v-for="(routeItem, index) in subRoute"
        :key="routeItem.id"
        class="sub-menu__item"
        :index="index"
        :route-name="routeItem.name"
      >
        <div v-if="!routeItem.meta.hidden">
          <!-- 三级导航侧边栏竖线 -->
          <div
            :style="{ height: calculateHeight(subRoute, routeItem) }"
            ref="tab"
            class="sub-menu__line"
            v-if="
              routeItem.children &&
                routeItem.children.length > 1 &&
                routeItem.collapse
            "
          ></div>
          <!-- 二级导航 -->
          <div
            class="sub-menu__title"
            :class="{
              'sub-menu__title_selected': routeItem.secondSelected,
              'sub-menu__title-sub-menu_selected': routeItem.thirdSelected,
              'sub-menu__title-sub-menu_selected-bg': routeItem.seondSelectedBg
            }"
            @click.stop="chooseRoute(routeItem, index)"
          >
            <!-- 三级侧边栏竖线选中状态 -->
            <span
              v-if="routeItem.meta && routeItem.meta.title"
              class="sub-title"
              :class="{
                subMenuSelected: routeItem.thirdSelected
              }"
              >{{ routeItem.meta.title }}</span
            >
            <i
              class="sub-menu__arrow"
              :class="[
                routeItem.collapse
                  ? 'sub-menu__arrow_up'
                  : 'sub-menu__arrow_down'
              ]"
              v-if="routeItem.children && routeItem.children.length > 0"
            ></i>
          </div>
          <sub-menu
            :subRoute="routeItem.children"
            class="sub-menu__sub"
            :class="[
              routeItem.collapse === true
                ? 'sub-menu__sub_open'
                : 'sub-menu__sub_close'
            ]"
          ></sub-menu>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus';
export default {
  name: 'subMenu',
  props: {
    subRoute: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      firstSelectedIndex: null, // 一级
      secondSelectIndex: null,
      thirdSelectIndex: null,
      currenRoutetName: '', // 当前路由的名字
      isSecond: false, // 是否是二级menu
      firstMenu: [],
      secondMenu: [],
      selectedSecondMenu: []
    };
  },
  mounted() {
    // 三级菜单偏移
    let dom = [...document.querySelectorAll('.sub-menu__sub .sub-title')];
    dom.forEach(item => {
      item.style.marginLeft = '31px';
    });
    this.init();
  },
  inject: ['clickedSecondMenu', 'clickedSThirdMenu', 'menuRoutes'],
  computed: {},
  methods: {
    init() {
      this.subRoute.forEach(item => {
        if (item.name === this.$route.name) {
          item.collapse = true;
        }
        this.$forceUpdate();
      });
      Bus.$on('chooseFirstIndex', data => {
        this.firstSelectedIndex = data;
        this.firstMenu = this.menuRoutes[data];
        this.subRoute.forEach(item => {
          item.collapse = false;
        });
        this.menuRoutes.forEach((menuItem, menuIndex) => {
          if (menuItem.children) {
            menuItem.children.forEach(subItem => {
              subItem.secondSelected = false;
              subItem.seondSelectedBg = false;
            });
          }
        });
      });
      this.currenRoutetName = this.$route.name;
      Bus.$on('chooseSecondIndex', data => {
        this.secondMenu = this.menuRoutes[this.firstSelectedIndex].children;
        this.secondMenu.forEach((menuItem, menuIndex) => {
          if (menuIndex !== data) {
            menuItem.seondSelectedBg = false;
            menuItem.secondSelected = false;
          } else {
            menuItem.secondSelected = true; // 二级字体选中
            menuItem.seondSelectedBg = true; // 二级背景选中
          }
        });
        this.isSecond = true;
        this.secondSelectIndex = data;
        this.clickedSecondMenu.set(this.firstSelectedIndex, data);

        this.$forceUpdate();
      });
      Bus.$on('chooseThirdIndex', data => {
        this.thirdSelectIndex = data;
        this.secondMenu[this.secondSelectIndex].seondSelectedBg = false; // 取消二级背景
        this.secondMenu[this.secondSelectIndex].children.forEach(
          (menuItem, menuIndex) => {
            if (menuIndex !== data) {
              menuItem.thirdSelected = false;
            } else {
              menuItem.thirdSelected = true;
            }
          }
        );
        this.isSecond = false;
        this.clickedSThirdMenu.set(
          this.firstSelectedIndex + '-' + this.secondSelectIndex,
          data
        );
      });
    },
    handleCollapse(route, index) {
      this.$set(
        this.subRoute[index],
        'collapse',
        !this.subRoute[index].collapse
      );
      this.subRoute.forEach((menu, menuIndex) => {
        if (index !== menuIndex) {
          menu.collapse = false;
        }
      });
      this.$forceUpdate();
    },
    // 计算子路由高度
    calculateHeight(routeArr, routeItem) {
      let height;
      routeArr.forEach(menu => {
        if (menu.name === routeItem.name) {
          if (menu.children) {
            let len = menu.children.length;
            let hiddenLen = menu.children.filter(item => {
              return item.meta.hidden;
            });
            height = 48 * (len - hiddenLen.length) - 28 + 'px';
          }
        }
      });
      return height;
    },
    chooseRoute(routeItem, index) {
      this.currenRoutetName = routeItem.name;
      if (this.firstSelectedIndex === null) {
        return;
      }
      if (
        this.firstMenu &&
        this.firstMenu.children &&
        this.firstMenu.children[index]
      ) {
        this.firstMenu.children[index].name === this.currenRoutetName
          ? (this.isSecond = true)
          : (this.isSecond = false);
      }
      if (this.isSecond) {
        this.firstMenu.children.forEach((firstMenuItem, childIndex) => {
          if (childIndex !== index) {
            firstMenuItem.secondSelected = false;
            firstMenuItem.seondSelectedBg = false;
          }
        });
        this.clickedSecondMenu.set(this.firstSelectedIndex, index);
        for (let [key, value] of this.clickedSecondMenu.entries()) {
          if (key !== this.firstSelectedIndex) {
            this.menuRoutes[key].children[value].secondSelected = false;
            this.menuRoutes[key].children[value].seondSelectedBg = false;
          }
        }
        routeItem.secondSelected = true;
        routeItem.seondSelectedBg = true;
        for (let [key, value] of this.clickedSThirdMenu.entries()) {
          let itemIndex = key.split('-');
          let thirdItem = this.menuRoutes[itemIndex[0]].children[itemIndex[1]]
            .children;
          let copy = JSON.parse(JSON.stringify(thirdItem[value]));
          copy.thirdSelected = false;
          thirdItem.splice(value, 1, copy);
        }
      } else {
        let item = this.clickedSecondMenu.get(this.firstSelectedIndex);
        this.menuRoutes[this.firstSelectedIndex].children.forEach(menuItem => {
          this.$set(menuItem, 'seondSelectedBg', false); // 取消二级背景
        });
        this.clickedSThirdMenu.set(this.firstSelectedIndex + '-' + item, index);
        let childItem = this.menuRoutes[this.firstSelectedIndex].children[item]
          .children;
        childItem.forEach((item, itemIndex) => {
          if (itemIndex !== index) {
            item.thirdSelected = false;
          }
        });
        // 清除其他三级选中状态
        for (let [key, value] of this.clickedSThirdMenu.entries()) {
          if (key !== this.firstSelectedIndex + '-' + item) {
            let itemIndex = key.split('-');
            let thirdItem = this.menuRoutes[itemIndex[0]].children[itemIndex[1]]
              .children;
            let copy = JSON.parse(JSON.stringify(thirdItem[value]));
            copy.thirdSelected = false;
            thirdItem.splice(value, 1, copy);
          }
        }
        routeItem.thirdSelected = true;
      }
      this.handleCollapse(routeItem, index);
      // 外链
      if (routeItem.meta.target === '_blank') {
        window.open(routeItem.path);
        return;
      }
      if (!routeItem.children) {
        this.$router.push(routeItem.path).catch(err => {});
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../config/theme.less";
.sub-menu {
  position: relative;
  top: 0;
  bottom: 0;
  &__item {
    position: relative;
  }
  .subMenuSelected::after {
    position: absolute;
    top: 10px;
    left: -16px;
    bottom: 0;
    height: 27px;
    border-right: 2px solid rgba(0, 0, 0, 0.54);
    transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
      opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    content: "";
  }
  &__line {
    width: 2px;
    bottom: 14px;
    position: absolute;
    z-index: 100;
    left: 39px;
    background-color: rgba(0, 0, 0, 0.12);
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-right: 24px;
    padding-left: 24px;
    &:hover {
      background-color: @menuHoverBg;
      color: @menuSelectedColor;
    }
  }
  &__title-sub-menu_selected {
    color: @menuSelectedColor;
    background-color: @menuSelectedBg;
  }
  &__title_selected {
    color: @menuSelectedColor;
  }
  &__title-sub-menu_selected-bg {
    background-color: @menuSelectedBg;
  }
  &-offset {
    margin-left: 15px;
  }
  .sub-menu__sub {
    transition: 0.5s ease;
  }
  &__sub_open {
    max-height: 100%;
  }
  &__sub_close {
    height: 0;
    overflow: hidden;
  }
  &__arrow {
    transition: 0.5s ease;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    line-height: 24px;
    &_down {
      background-image: url("../../../assets/images/ic_arrow_down_24px.svg");
    }
    &_up {
      transform: rotate(180deg);
      background-image: url("../../../assets/images/ic_arrow_down_24px.svg");
    }
  }
}
.selected {
  font-weight: 500;
  color: @menuSelectedColor !important;
}
.sub-title {
  position: relative;
  margin-left: 16px;
}
</style>
