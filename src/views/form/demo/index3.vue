<template>
  <div class="container-bg">
    <a-form :form="form" class="form">
      <a-form-item
        :colon="false"
        label="商品名"
        :label-col="{ span: 2 }"
        :class="{ 'form-remove-margin': !collapse }"
      >
        <a-input
          aria-placeholder="请输入商品名"
          placeholder="请输入商品名"
          size="large"
          class="form-item_280"
        ></a-input>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="上架时间"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-range-picker
            @change="onChange"
            size="large"
            class="form-item_280"
          />
          <label for="" class="form-label">到期时间</label>
          <a-range-picker
            @change="onChange"
            size="large"
            class="form-item_280"
          />
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="兑换积分"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <InputArea></InputArea>
          <label for="" class="form-label form-store">库存</label>
          <InputArea></InputArea>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="状态"
        :label-col="{ span: 2 }"
        v-show="collapse"
        class="form-status"
        :class="{ 'form-remove-margin': collapse }"
      >
        <a-select v-model="selectOption" class="form-item_280" size="large">
          <a-select-option v-for="listItem in listOption" :key="listItem">
            {{ listItem }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <ToggleOption
        :collapse="collapse"
        @toggle="hanldeToggle($event)"
      ></ToggleOption>
    </a-form>
  </div>
</template>

<script>
import InputArea from '@/components/inputArea/InputArea';
import ToggleOption from '@/components/toggleOption/ToggleOption';
export default {
  components: {
    ToggleOption,
    InputArea
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'demo3' }),
      collapse: false,
      selectOption: ['全部'],
      listOption: ['全部', '省', '市', '区']
    };
  },
  methods: {
    hanldeToggle(data) {
      this.collapse = data;
    },
    onChange(e) {
      console.log(e, 'e');
    }
  }
};
</script>

<style scoped lang="less">
.form {
  position: relative;
  &-label {
    margin-left: 48px;
    margin-right: 16px;
  }
  &-store {
    text-align: right;
    display: inline-block;
    width: 56px;
  }
  &-item_280 {
    width: 280px;
  }
  &-status {
    padding-bottom: 64px;
  }
}
</style>
