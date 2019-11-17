<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-layout-header class="header">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />
    </a-layout-header>
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{
        paddingLeft: contentPaddingLeft,
        minHeight: 'calc(100vh - 64px)'
      }"
    >
      <div class="layout-container">
        <div
          class="layout-left animated"
          :class="[collapsed ? 'fadeOutLeft' : 'fadeInLeft']"
        >
          <main-menu :menus="menus"></main-menu>
        </div>
        <div class="layout-right">
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
import { triggerWindowResizeEvent } from '@/utils/util';
import { mapActions } from 'vuex';
import { mixin, mixinDevice } from '@/utils/mixin';
import config from '@/config/defaultSettings';
import RouteView from './RouteView';
import mainMenu from '@/components/mainMenu/index';
import GlobalHeader from '@/components/globalHeader';
import mainRoutes from '@/router';
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    mainMenu,
    GlobalHeader
  },
  data() {
    return {
      production: config.production,
      collapsed: false,
      menus: []
    };
  },
  computed: {
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0';
      }
      if (this.sidebarOpened) {
        return '256px';
      }
      return '80px';
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    }
  },
  created() {
    // 路由
    this.menus = mainRoutes.options.routes;
    this.collapsed = !this.sidebarOpened;
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed;
      triggerWindowResizeEvent();
    },
    paddingCalc() {
      let left = '';
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px';
      } else {
        left = (this.isMobile() && '0') || (this.fixSidebar && '80px') || '0';
      }
      return left;
    },
    menuSelect() {},
    drawerClose() {
      this.collapsed = false;
    }
  }
};
</script>

<style lang="scss">
@import '../config/theme.scss';
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}
.page-transition-enter,
.page-transition-leave-active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.header {
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
}
.layout-container {
  display: flex;
  min-height: calc(100vh - 64px);
}
.layout-left {
  background-color: #fff;
  transition: 0.5s linear;
  max-width: 240px;
  width: 240px;
}
.layout-right {
  padding: 16px;
  width: 100%;
  flex: auto;
}
.content-container {
  padding: 24px;
  background-color: $layoutBg;
  border-radius: 2px;
}
.layout-content {
  height: '100%';
  margin: '16px 16px 24px 16px';
}
@-webkit-keyframes fadeOutLeft {
  from {
    opacity: 1;
    width: 100%;
  }

  to {
    width: 0%;
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
    width: 100%;
  }

  to {
    opacity: 0;
    width: 0%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.fadeOutLeft {
  -webkit-animation-name: fadeOutLeft;
  animation-name: fadeOutLeft;
}
@-webkit-keyframes fadeInLeft {
  from {
    width: 0%;
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    width: 100%;
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    width: 0%;
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    width: 100%;
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
