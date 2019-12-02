<template>
  <a-layout>
    <!-- SideMenu -->
    <a-layout-header class="header">
      <div class="header-container">
        <div class="header-icon inline-block" @click="toggle">
          <img
            src="@/assets/images/ic_dawer_24px.svg"
            alt=""
            class="header-icon_menu"
          />
        </div>
        <h1 class="header-title inline-block">科乐美股份有限公司</h1>
        <navigation></navigation>
      </div>
      <user-menu class="header-right"></user-menu>
    </a-layout-header>
    <a-layout>
      <div class="layout-container">
        <div
          class="layout-left animated"
          :class="[collapsed ? 'fadeOutLeft' : 'fadeInLeft']"
        >
          <main-menu :menus="menus"></main-menu>
        </div>
        <div class="layout-right" :class="{ 'layout-right_open': !collapsed }">
          <transition name="page-transition">
            <div class="content-container">
              <route-view />
            </div>
          </transition>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import Navigation from '@/components/nav/Nav';
import RouteView from './RouteView';
import mainMenu from '@/components/mainMenu/MainMenu';
import UserMenu from '@/components/tools/UserMenu';
import mainRoutes from '@/router';
import { mapGetters } from 'vuex';
import Bus from '@/utils/eventBus';
export default {
  name: 'BasicLayout',
  components: {
    RouteView,
    mainMenu,
    UserMenu,
    Navigation
  },
  data() {
    return {
      menus: []
    };
  },
  computed: {
    ...mapGetters(['collapsed'])
  },
  created() {
    // 路由
    this.menus = mainRoutes.options.routes;
  },
  methods: {
    toggle() {
      Bus.$emit('toggle', !this.collapsed);
      this.$store.commit('TOGGLE_MENU', !this.collapsed);
    }
  }
};
</script>

<style lang="less">
@import "../config/theme.less";
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
  background-color: @containerBg !important;
  padding: 0 !important;
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-icon {
    user-select: none;
    cursor: pointer;
    padding-left: 26px;
    padding-right: 26px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  &-right {
    display: flex;
    align-items: center;
    margin-right: 82px;
  }
  &-title {
    vertical-align: middle;
    margin: 0;
    padding-right: 112px;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }
}
.layout-container {
  padding-top: 64px;
  display: flex;
  min-height: 100vh;
}
.layout-left {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  z-index: 100;
  background-color: @containerBg;
  transition: 0.5s linear;
  max-width: 240px;
  width: 240px;
  border-right: 1px solid @menuBorderRightColor;
  box-sizing: border-box;
}
.layout-right {
  padding: 16px;
  width: 100%;
  transition: 0.5s ease;
  &_open {
    margin-left: 240px;
  }
}
.content-container {
  border-radius: 2px;
}
@keyframes fadeOutLeft {
  from {
    opacity: 1;
    width: 100%;
  }
  to {
    opacity: 0;
    width: 0%;
    transform: translate3d(-100%, 0, 0);
  }
}
.fadeOutLeft {
  animation-name: fadeOutLeft;
}
@keyframes fadeInLeft {
  from {
    width: 0%;
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    width: 100%;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.fadeInLeft {
  animation-name: fadeInLeft;
  min-width: 168px;
}
.animated {
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: both;
}
</style>
