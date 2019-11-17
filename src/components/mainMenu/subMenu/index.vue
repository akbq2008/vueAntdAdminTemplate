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
              'sub-menu__title_selected':routeItem.secondSelected
                ,
              'sub-menu__title-sub-menu_selected':
               routeItem.thirdSelected
            }"
            @click.stop="chooseRoute(routeItem, index, $event)"
          >
            <!-- 三级侧边栏竖线选中状态 -->
            <span
              v-if="routeItem.meta && routeItem.meta.title"
              class="sub-title"
              :class="{
                subMenuSelected:
                  routeItem.thirdSelected
              }"
            >{{ routeItem.meta.title }}</span>
            <img
              :src="
                routeItem.collapse
                  ? require('@/assets/images/ic_arrow_up_24px.svg')
                  : require('@/assets/images/ic_arrow_down_24px.svg')
              "
              alt="sub-menu__arrow"
              class="sub-menu__arrow"
              v-if="routeItem.children && routeItem.children.length > 0"
            >
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
import Bus from '../eventBus';
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
      currenRoutetName: '', // 当前路由的M
      isSecond: false, // 是否是二级menu
      firstMenu: [],
      secondeMenu: [],
      selectedSecondMenu: []
    };
  },
  mounted() {
    // 三级菜单偏移
    let dom = [...document.querySelectorAll('.sub-menu__sub .sub-title')];
    dom.forEach(v => {
      v.style.marginLeft = '15px';
    });
    this.subRoute.forEach((v, index) => {
      if (v.name === this.$route.name) {
        v.collapse = true;
      }
      this.$forceUpdate();
    });
    Bus.$on('chooseFirstIndex', data => {
      this.firstSelectedIndex = data;
      this.firstMenu = this.menuRoutes[data];
      this.subRoute.forEach((v, i) => {
        v.collapse = false;
      });
      this.$forceUpdate();
    });
    this.currenRoutetName = this.$route.name;
    Bus.$on('chooseSecondIndex', data => {
      this.isSecond = true;
      this.secondSelectIndex = data;
      this.clickedSecondMenu.set(this.firstSelectedIndex, data);
      this.menuRoutes[this.firstSelectedIndex].children[
        data
      ].secondSelected = true; // 二级默认选中
    });
    Bus.$on('chooseThirdIndex', data => {
      this.thirdSelectIndex = data;
      this.selectedSecondMenu = this.firstMenu.children[this.secondSelectIndex];
      this.selectedSecondMenu.children[
        this.thirdSelectIndex
      ].thirdSelected = true;
      this.isSecond = false;
      this.clickedSThirdMenu.set(
        this.firstSelectedIndex + '-' + this.secondSelectIndex,
        data
      );
    });
  },
  inject: ['clickedSecondMenu', 'clickedSThirdMenu', 'menuRoutes'],
  computed: {},
  methods: {
    handleCollapse(route, index) {
      this.$set(
        this.subRoute[index],
        'collapse',
        !this.subRoute[index].collapse
      );
      this.subRoute.forEach((v, i) => {
        if (index !== i) {
          v.collapse = false;
        }
      });
      this.$forceUpdate();
    },
    // 计算子路由高度
    calculateHeight(routeArr, routeItem) {
      let height;
      routeArr.map(v => {
        if (v.name === routeItem.name) {
          if (v.children) {
            let len = v.children.length;
            let hiddenLen = v.children.filter(item => {
              return item.meta.hidden;
            });
            height = 48 * (len - hiddenLen.length) - 28 + 'px';
          }
        }
      });
      return height;
    },
    chooseRoute(routeItem, index, event) {
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
        this.firstMenu.children.forEach((v, childIndex) => {
          if (childIndex !== index) {
            v.secondSelected = false;
          }
        });
        this.clickedSecondMenu.set(this.firstSelectedIndex, index);
        for (let [key, value] of this.clickedSecondMenu.entries()) {
          if (key !== this.firstSelectedIndex) {
            this.menuRoutes[key].children[value].secondSelected = false;
          }
        }
        routeItem.secondSelected = true;
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

<style scoped lang="scss">
@import '../../../config/theme.scss';
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
    content: '';
  }
  &__line {
    width: 2px;
    bottom: 14px;
    position: absolute;
    z-index: 100;
    left: 23px;
    background-color: rgba(0, 0, 0, 0.12);
  }
  &__title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    padding-left: 24px;
    &:hover {
      background-color: $hoverBg;
      color: $menuSelectedColor;
    }
  }
  &__title-sub-menu_selected {
    color: $menuSelectedColor;
    background-color: $hoverBg;
  }
  &__title_selected {
    color: $menuSelectedColor;
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
    svg {
      width: 8px;
    }
  }
}
.selected {
  font-weight: 500;
  color: $menuSelectedColor !important;
}

.sub-title {
  position: relative;
}
</style>
