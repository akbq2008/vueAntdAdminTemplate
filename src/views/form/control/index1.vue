<template>
  <div class="container-bg">
    <a-form :form="form" class="form">
      <a-form-item
        :colon="false"
        label="选择银行"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-select defaultValue="中国工商银行" size="large" class="form-item">
          <a-select-option value="中国工商银行">中国工商银行</a-select-option>
          <a-select-option value="中国银行">中国银行</a-select-option>
          <a-select-option value="中国建设银行">中国建设银行</a-select-option>
          <a-select-option value="中国农业银行">中国农业银行</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="金额"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <span class="form-switch">是否开启</span>
        <a-switch defaultChecked></a-switch>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="滑动输入"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-slider
          :marks="marks"
          :step="20"
          :defaultValue="40"
          class="form-item"
        />
      </a-form-item>
      <a-form-item
        :colon="false"
        label="单选"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1">选项01</a-radio>
          <a-radio :value="2">选项02</a-radio>
          <a-radio :value="3">选项03</a-radio>
          <a-radio :value="4">选项04</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="复选"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-checkbox-group
          :options="plainOptions"
          v-model="checkedList"
          @change="onChange"
        />
      </a-form-item>
      <a-form-item
        :colon="false"
        label="图片"
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-upload
          action=""
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 3">
            <a-icon type="plus" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item
        :colon="false"
        label=" "
        :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
        :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
      >
        <a-button size="large" type="primary">保存</a-button>
      </a-form-item>
    </a-form>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'control1' }),
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100'
      },
      plainOptions: ['选项01', '选项02', '选项03', '选项04', '选项05'],
      checkedList: ['选项02', '选项03'],
      previewImage: '',
      previewVisible: false,
      fileList: [
        {
          uid: '0',
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ]
    };
  },
  methods: {
    onChange(e) {
      console.log(e, 'e');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>

<style scoped lang="less">
.form {
  &-switch {
    color: rgba(0, 0, 0, 0.87);
    margin: 0 16px;
  }
  &-item {
    width: 280px;
  }
}
</style>
