<template>
  <div>
    <el-collapse-transition>
      <div v-show="show">
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
              <img
                :src="
                  route.collapse
                    ? require('@/assets/images/ic_arrow_up_24px.svg')
                    : require('@/assets/images/ic_arrow_down_24px.svg')
                "
                alt="menu-arrow"
                class="menu-arrow"
                v-if="route.children && route.children.length > 1 && route.meta"
              />
            </div>

            <sub-menu
              :subRoute="route.children"
              class="sub-menu"
              v-if="route.children && route.children.length > 1 && route.meta"
              :class="[
                route.collapse === true
                  ? 'sub-menu_open sub-menu-bottom'
                  : 'sub-menu_close'
              ]"
            ></sub-menu>
          </li>
        </ul>
      </div>
    </el-collapse-transition>
    <button @click="show = !show">Show</button>
  </div>
</template>

<script>
import Bus from './eventBus';
import subMenu from './subMenu';
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
      show: false,
      firstSelectedIndex: ''
    };
  },
  mounted() {
    this.menuRoutes.forEach(v => {
      v.collapse = false;
    });
    this.handleCurrentSelected();
  },
  methods: {
    handleCurrentSelected() {
      this.firstSelectedIndex = '';
      this.menuRoutes.forEach((route, index) => {
        // 二级
        if (route.children && route.children.length > 0) {
          route.children.forEach((subRoute, subIndex) => {
            if (subRoute.name === this.$route.name) {
              this.firstSelectedIndex = index;
              Bus.$emit('chooseFirstIndex', index);
              Bus.$emit('chooseSecondIndex', subIndex);
              this.menuRoutes[index].collapse = true;
              this.menuRoutes[index].children[subIndex].collapse = true;
            } else if (subRoute.children && subRoute.children.length > 0) {
              // 三级
              subRoute.children.forEach((lastRoute, lastIndex) => {
                if (lastRoute.name === this.$route.name) {
                  this.firstSelectedIndex = index;
                  Bus.$emit('chooseFirstIndex', index);
                  this.menuRoutes[index].collapse = true;
                  Bus.$emit('chooseSecondIndex', subIndex);
                  this.menuRoutes[index].children[subIndex].collapse = true;
                  Bus.$emit('chooseThirdIndex', lastIndex);
                  this.menuRoutes[index].children[subIndex].children[
                    lastIndex
                  ].collapse = true;
                }
              });
            }
          });
        }
      });
    },
    handleCollapse(route, index) {
      this.$set(
        this.menuRoutes[index],
        'collapse',
        !this.menuRoutes[index].collapse
      );
      this.menuRoutes.forEach((v, i) => {
        if (index !== i) {
          v.collapse = false;
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

<style scoped lang="scss">
@import '../../config/theme.scss';

.menu {
  padding-top: 8px;
  .menu-item {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.54);
    line-height: 48px;
    &:hover {
      cursor: pointer;
    }
    .menu-item__route {
      border-top: 1px solid #fff;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 24px;
      &:hover {
        background-color: $hoverBg;
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
      &-bottom {
        border-bottom: 1px solid #eeeef0;
      }
    }
    .selected {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87) !important;
    }
    .menu-arrow {
      svg {
        width: 8px;
      }
    }
  }
}
</style>
