<template>
  <div class="sub-container">
    <ul class="sub-menu">
      <li
        v-for="routeItem in subRoute"
        :key="routeItem.id"
        @click="chooseRoute(routeItem)"
      >
        <div class="sub-menu-title">
          {{ routeItem.meta.title }}
          <a-icon
            type="down"
            v-if="routeItem.children && routeItem.children.length > 0"
          ></a-icon>
        </div>
        <sub-menu :subRoute="routeItem.children"></sub-menu>
      </li>
    </ul>
  </div>
</template>

<script>
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
  methods: {
    chooseRoute(routeItem) {
      // this.$router.push(routeItem.path);
      console.log(routeItem.path, 'routeItem');
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../config/theme.scss";
.sub-menu {
  .sub-menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    padding-left: 24px;
    &:hover {
      background-color: $hoverBg;
    }
  }
}
</style>
