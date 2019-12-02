<template>
  <div class="container-bg">
    <a-form :form="form" class="form">
      <a-form-item
        :colon="false"
        label="搜索关键字"
        :label-col="{ span: 2 }"
        :class="{ 'form-remove-margin': !collapse }"
      >
        <a-input
          aria-placeholder="请输搜索入关键字"
          placeholder="请输搜索入关键字"
          size="large"
          class="form-item_280"
        ></a-input>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="ID"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-input
            aria-placeholder="请输入搜索ID精确查找"
            placeholder="请输入搜索ID精确查找"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">名称</label>
          <a-input
            aria-placeholder="请输入名称"
            placeholder="请输入名称"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">外网IP</label>
          <a-input
            aria-placeholder="请输入外网IP"
            placeholder="请输入外网IP"
            size="large"
            class="form-item_280"
          ></a-input>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="到期时间"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            size="large"
            class="form-item_280"
            :showTime="{
              defaultValue: moment('2019-01-02 11:59:00', 'YYYY-MM-DD HH:mm:ss')
            }"
          />
          <label for="" class="form-label">创建时间</label>
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            size="large"
            class="form-item_280"
            :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          />
          <label for="" class="form-label">镜像ID</label>
          <a-input
            aria-placeholder="2019-01-02 11:59"
            placeholder="2019-01-02 11:59"
            size="large"
            class="form-item_280"
          ></a-input>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="私有IP"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">内网IP</label>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">安全组ID</label>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="规格"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">专有网络ID</label>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
          <label for="" class="form-label">虚拟交换机ID</label>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="可用区ID"
        :label-col="{ span: 2 }"
        v-show="collapse"
        class="form-address"
        :class="{ 'form-remove-margin': collapse }"
      >
        <a-row>
          <a-input
            aria-placeholder="输入XXX"
            placeholder="输入XXX"
            size="large"
            class="form-item_280"
          ></a-input>
        </a-row>
      </a-form-item>
      <ToggleOption
        :collapse="collapse"
        @toggle="hanldeToggle($event)"
      ></ToggleOption>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment';
import ToggleOption from '@/components/toggleOption/ToggleOption';
export default {
  components: {
    ToggleOption
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'demo4' }),
      collapse: false,
      selectOption: ['全部'],
      listOption: ['全部', '省', '市', '区']
    };
  },
  methods: {
    moment,
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
    text-align: right;
    display: inline-block;
    width: 90px;
    margin-left: 24px;
    margin-right: 16px;
  }
  &-item_280 {
    width: 280px !important;
  }
  &-item_240 {
    width: 240px;
  }
  &-address {
    padding-bottom: 64px;
  }
}
</style>
