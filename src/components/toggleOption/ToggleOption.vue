<template>
  <div :class="{ 'form-search__bar': collapse }">
    <div
      class="form-choice"
      :class="[collapse ? 'form-choice_open' : 'form-choice_close']"
    >
      <a-button
        type="primary"
        class="form-search"
        :size="currentSize"
        @click="hanldeSearch"
        >搜索</a-button
      >

      <a-button
        type="primary"
        class="form-reset"
        :size="currentSize"
        @click="handleReset"
        >重置</a-button
      >

      <a-button type="link" class="form-toggle" @click="handleToggle">
        <span class="form-toggle__text">{{ collapse ? "收起" : "展开" }}</span>
        <i
          class="form-toggle__arrow"
          :class="[collapse ? 'form-toggle_up' : 'form-toggle_down']"
        ></i>
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSize: {
      type: String,
      default: 'large'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', !this.collapse);
    },
    hanldeSearch() {
      this.$emit('search');
    },
    handleReset() {
      this.$emit('resetForm');
    }
  }
};
</script>

<style scoped lang="less">
.form {
  &-choice {
    position: absolute;
    right: 0;
    &_close {
      bottom: 5px;
    }
    &_open {
      bottom: 11px;
    }
  }
  &-reset {
    margin-left: 16px;
    background-color: #eeeef0;
    border: 1px solid #eeeef0;
    color: rgba(0, 0, 0, 0.87);
  }
  &-toggle {
    color: rgba(0, 0, 0, 0.38);
    width: 72px;
    height: 40px;
    &__text {
      vertical-align: middle;
    }
    &__arrow {
      transition: 0.5s ease;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    &_down {
      background-image: url("../../assets/images/ic_arrow_down_24px.svg");
    }
    &_up {
      transform: rotate(180deg);
      background-image: url("../../assets/images/ic_arrow_down_24px.svg");
    }
  }
}
</style>
