<template>
  <div>
    <ul class="menu">
      <li
        class="menuItem"
        v-for="route in menuRoutes"
        :key="route.id"
        @click="chooseRoute(route)"
      >
        <div class="route-wrap">
          <a :href="route.path">{{ route.meta.title }}</a>
          <a-icon
            type="down"
            v-if="route.children && route.children.length > 1"
          ></a-icon>
        </div>
        <!-- :class="[
            route.meta.collapse ? 'sub-container-open' : 'sub-container-close'
          ]" -->
        <sub-menu
          :subRoute="route.children"
          v-if="route.children && route.children.length > 1"
        ></sub-menu>
      </li>
    </ul>
  </div>
</template>

<script>
import subMenu from './subMenu';
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
  data() {
    return {};
  },
  methods: {
    handleCollapse() {},
    chooseRoute(route) {
      console.log(route);
      if (route.children && route.children.length > 1) {
        // this.collapse = !this.collapse;
        // route.meta.collapse = !route.meta.collapse;
      } else {
        // 只有一级
        if (route.redirect) {
          this.$router.push(route.redirect);
        } else {
          var path = route.path + '/' + route.children[0].path;
          // https://github.com/vuejs/vue-router/issues/2872
          console.log(path, 'path');
          this.$router.push(path).catch(err => {
            console.log(err);
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../config/theme.scss";
.middle {
  vertical-align: middle;
}
.over {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.menu {
  padding-top: 8px;
  .menuItem {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.54);
    line-height: 48px;
    .route-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 24px;
      &:hover {
        background-color: $hoverBg;
        > a {
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
    ul {
      display: block;
      height: 100%;
      .sub-menu-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .menuTitle {
      width: 170px;
    }
    .icon {
      flex: 1;
    }
    &:hover {
      cursor: pointer;
    }
    a {
      margin-left: 24px;
      color: rgba(0, 0, 0, 0.54);
    }
    .sub-container-open {
      max-height: 100%;
    }
    .sub-container-close {
      height: 0;
      overflow: hidden;
    }
  }
  .icon {
    width: 8px;
    height: 5px;
    margin-top: -12px;
  }
}
</style>
