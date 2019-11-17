<template>
  <div>
    <a-form :form="form">
      <a-form-item
        :colon="false"
        label="日期"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 4 }"
      >
        <a-range-picker @change="onChange" size="large" />
      </a-form-item>
      <a-form-item
        :colon="false"
        label="日期"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 4 }"
      >
        <a-range-picker
          @change="onChange"
          size="large"
          :defaultValue="[moment('2019-06-22'), moment('2019-10-18')]"
        />
      </a-form-item>
      <a-form-item
        :colon="false"
        label="金额"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 4 }"
      >
        <div class="fx_sp money-container">
          <a-input
            class="money"
            size="large"
            allowClear
            aria-placeholder="请输入金额"
            placeholder="请输入金额"
          ></a-input>
          <a-select
            size="large"
            defaultValue="人命币"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="人命币">人命币</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled
              >Disabled</a-select-option
            >
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="时间"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 4 }"
      >
        <a-range-picker @change="onChange" size="large" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'single' })
    };
  },
  methods: {
    moment,
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  }
};
</script>

<style scoped>
/deep/ .ant-input {
  width: 280px;
}
.money-container {
  width: 280px;
}
.money {
  width: 140px;
}
</style>
