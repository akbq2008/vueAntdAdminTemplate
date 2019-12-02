<template>
  <div class="container-bg">
    <a-tabs @change="callback" :defaultActiveKey="activeIndex">
      <a-tab-pane v-for="tab in tabList" :tab="tab.label" :key="tab.value">
        <a-form :form="form" class="form">
          <a-form-item
            :colon="false"
            label="所有平台"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-select
              size="large"
              defaultValue="Android"
              class="form-item"
              @change="handleChange"
            >
              <a-select-option value="Android">Android</a-select-option>
              <a-select-option value="Ios">Ios</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :colon="false"
            label="更新地址"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-input
              aria-placeholder="请输入更新地址"
              placeholder="请输入更新地址"
              size="large"
              allowClear
              class="form-item"
            ></a-input>
          </a-form-item>
          <a-form-item
            :colon="false"
            label="版本号"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-input
              v-decorator="[
                'address',
                { rules: [{ required: true, message: '请输入更新地址' }] }
              ]"
              aria-placeholder="请输入更新地址"
              placeholder="请输入更新地址"
              size="large"
              allowClear
              class="form-item"
            ></a-input>
          </a-form-item>
          <a-form-item
            :colon="false"
            label="内部版本号"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-input
              v-decorator="[
                'version',
                { rules: [{ required: true, message: '请输入内部版本号' }] }
              ]"
              aria-placeholder="请输入内部版本号"
              placeholder="请输入内部版本号"
              size="large"
              allowClear
              class="form-item"
            ></a-input>
          </a-form-item>
          <a-form-item
            :colon="false"
            label="强制更新"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-switch defaultChecked></a-switch>
          </a-form-item>
          <a-form-item
            :colon="false"
            label="更新说明"
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-input
              type="textarea"
              class="form-item"
              placeholder="请输入更新说明"
              aria-placeholder="请输入更新说明"
              :rows="4"
            />
          </a-form-item>
          <a-form-item
            :colon="false"
            label=" "
            :labelCol="{
              xl: { span: 3 },
              lg: { span: 4 },
              sm: { span: 7 }
            }"
            :wrapperCol="{
              lg: { span: 10 },
              md: { span: 14 },
              sm: { span: 17 }
            }"
          >
            <a-button type="primary" size="large">保存</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      tabList: [{ label: '志愿者端', value: 0 }, { label: '组织端', value: 1 }],
      form: this.$form.createForm(this, { name: 'demo1' })
    };
  },
  methods: {
    callback(key) {
      this.activeIndex = key;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    }
  }
};
</script>

<style scoped lang="less">
.form-item {
  width: 280px;
}
</style>
