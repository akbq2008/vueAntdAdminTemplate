<template>
  <div>
    <ul class="menu">
      <li
        class="menu-item"
        v-for="(route, index) in menuRoutes"
        :key="route.id"
      >
        <!-- 二级路由的上界 -->
        <div
          @click="chooseRoute(route, index)"
          class="menu-item__route"
          :class="{
            'menu-item__top':
              route.children &&
              route.children.length > 1 &&
              route.meta &&
              route.collapse
          }"
        >
          <a
            href="javascript:void(0)"
            class="menu-title"
            v-if="route.meta && route.meta.title"
            :class="{
              selected: firstSelectedIndex === index
            }"
            >{{ route.meta.title }}</a
          >
          <i
            class="menu-arrow"
            :class="[route.collapse ? 'menu-arrow_up' : 'menu-arrow_down']"
            v-if="route.children && route.children.length > 1 && route.meta"
          ></i>
        </div>
        <sub-menu
          :subRoute="route.children"
          class="sub-menu"
          v-if="route.children && route.children.length > 1 && route.meta"
          :class="[
            route.collapse === true
              ? 'sub-menu_open sub-menu__bottom'
              : 'sub-menu_close'
          ]"
        ></sub-menu>
      </li>
    </ul>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus';
import subMenu from './subMenu/SubMenu';
import mainRoutes from '@/router';
export default {
  name: 'customMenu',
  components: {
    subMenu
  },
  props: {
    // 路由
    menus: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    menuRoutes() {
      return this.menus;
    }
  },
  provide: function() {
    return {
      clickedSecondMenu: new Map(),
      clickedSThirdMenu: new Map(),
      menuRoutes: mainRoutes.options.routes
    };
  },
  data() {
    return {
      firstSelectedIndex: ''
    };
  },
  watch: {
    $route(now, old) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.menuRoutes.forEach(item => {
        item.collapse = false;
      });
      this.handleCurrentSelected();
    },
    handleCurrentSelected() {
      this.firstSelectedIndex = '';
      let menuRoutesLength = this.menuRoutes.length;
      for (let index = 0; index < menuRoutesLength; index++) {
        let route = this.menuRoutes[index];
        if (route.name === this.$route.name) {
          Bus.$emit('chooseFirstIndex', index);
          break;
        }
        if (route.children && route.children.length > 0) {
          let routeChildLength = route.children.length;
          for (let subIndex = 0; subIndex < routeChildLength; subIndex++) {
            let subRoute = route.children[subIndex];
            if (subRoute.name === this.$route.name) {
              this.firstSelectedIndex = index;
              route.collapse = true;
              Bus.$emit('chooseFirstIndex', index);
              subRoute.collapse = true;
              Bus.$emit('chooseSecondIndex', subIndex);
              break;
            } else if (subRoute.children && subRoute.children.length > 0) {
              let subRouteLength = subRoute.children.length;
              for (let lastIndex = 0; lastIndex < subRouteLength; lastIndex++) {
                let lastRoute = subRoute.children[lastIndex];
                if (lastRoute.name === this.$route.name) {
                  this.firstSelectedIndex = index;
                  route.collapse = true;
                  Bus.$emit('chooseFirstIndex', index);
                  subRoute.collapse = true;
                  Bus.$emit('chooseSecondIndex', subIndex);
                  lastRoute.collapse = true;
                  Bus.$emit('chooseThirdIndex', lastIndex);
                  break;
                }
              }
            }
          }
        }
      }
    },
    handleCollapse(route, index) {
      this.$set(
        this.menuRoutes[index],
        'collapse',
        !this.menuRoutes[index].collapse
      );
      this.menuRoutes.forEach((item, itemIndex) => {
        if (index !== itemIndex) {
          item.collapse = false;
        }
      });
      this.$forceUpdate();
    },
    chooseRoute(route, index) {
      this.firstSelectedIndex = index;
      Bus.$emit('chooseFirstIndex', index);
      this.handleCollapse(route, index);
      if (route.children && route.children.length > 1) {
      } else {
        // 外链
        if (route.meta.target === '_blank') {
          window.open(route.path);
          return;
        }
        // 只有一级
        this.$router
          .push(route.redirect ? route.redirect : route)
          .catch(err => {});
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../config/theme.less";

.menu {
  padding-top: 8px;
  .menu-item {
    user-select: none;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.54);
    line-height: 48px;
    &:hover {
      cursor: pointer;
    }
    .menu-item__route {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      box-sizing: border-box;
      padding-right: 24px;
      &:hover {
        background-color: @menuHoverBg;
        > .menu-title {
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
    .menu-item__top {
      border-top: 1px solid #eeeef0;
    }
    .menu-title {
      text-decoration: none;
      margin-left: 24px;
      color: rgba(0, 0, 0, 0.54);
    }
    .sub-menu {
      &_open {
        max-height: 100%;
      }
      &_close {
        max-height: 0;
        overflow: hidden;
      }
      &__bottom {
        border-bottom: 1px solid #eeeef0;
      }
    }
    .selected {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87) !important;
    }
    .menu-arrow {
      transition: 0.5s ease;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      line-height: 24px;
      &_down {
        background-image: url("../../assets/images/ic_arrow_down_24px.svg");
      }
      &_up {
        transform: rotate(180deg);
        background-image: url("../../assets/images/ic_arrow_down_24px.svg");
      }
    }
  }
}
</style>
