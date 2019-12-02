<template>
  <div>
    <ul class="nav">
      <li class="nav-item" v-for="(nav, index) in navArr" :key="nav.id">
        <a-dropdown placement="bottomLeft">
          <span
            class="nav-item__wrap"
            :class="{ 'nav-item_selected': currentNavIndex === index }"
          >店铺{{ index + 1 }}</span>
          <a-menu slot="overlay" class="nav-item__drop" @click="handleNav(index)">
            <a-menu-item>
              <router-link :to="nav.path">{{ nav.title }}</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentNavIndex: null,
      navArr: [
        { path: '/form/control/1', title: '其他控件1' },
        { path: '/form/control/2', title: '其他控件2' }
      ]
    };
  },
  methods: {
    handleNav(index) {
      this.currentNavIndex = index;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../config/theme.less";
.nav {
  display: flex;
  &-item {
    width: 120px;
    user-select: none;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.54);
    &:hover &__wrap {
      padding: 6px 16px;
      border-radius: 16px;
      background-color: @menuHoverBg;
      font-weight: 500;
      color: rgba(85, 54, 54, 0.87);
    }
    &_selected {
      padding: 6px 16px;
      border-radius: 16px;
      font-weight: 500;
      color: rgba(85, 54, 54, 0.87);
      background-color: @menuSelectedBg;
    }
    &__drop {
      width: 168px;
    }
  }
}
</style>
