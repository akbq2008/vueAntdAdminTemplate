<template>
  <div class="container-bg">
    <a-form :form="form" class="form">
      <a-form-item
        :colon="false"
        label="日期"
        :label-col="{ span: 2 }"
        :class="{ 'form-remove-margin': !collapse }"
      >
        <a-row>
          <a-col :span="12">
            <a-range-picker @change="onChange" size="large" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="标题"
        :label-col="{ span: 2 }"
        v-show="collapse"
      >
        <a-row>
          <a-input
            aria-placeholder="请输入标题"
            placeholder="请输入标题"
            size="large"
            class="form-item_240"
          ></a-input>
          <label for="org" class="form-label">组织机构</label>
          <a-input
            id="org"
            class="form-keywords form-item_240"
            aria-placeholder="请输入组织机构"
            placeholder="请输入组织机构"
            size="large"
          ></a-input>
          <label for="status" class="form-label">审核状态</label>
          <a-select
            v-model="selectOption"
            class="form-item_240"
            size="large"
            id="status"
          >
            <a-select-option v-for="listItem in listOption" :key="listItem">
              {{ listItem }}
            </a-select-option>
          </a-select>
        </a-row>
      </a-form-item>
      <a-form-item
        :colon="false"
        label="地区"
        :label-col="{ span: 2 }"
        v-show="collapse"
        class="form-item__address"
        :class="{ 'form-remove-margin': collapse }"
      >
        <a-cascader
          :options="options"
          @change="onChange"
          changeOnSelect
          size="large"
          class="form-item_240"
        />
      </a-form-item>
      <ToggleOption
        :collapse="collapse"
        @toggle="hanldeToggle($event)"
      ></ToggleOption>
    </a-form>
  </div>
</template>

<script>
import ToggleOption from '@/components/toggleOption/ToggleOption';
export default {
  components: {
    ToggleOption
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'demo2' }),
      collapse: false,
      selectOption: ['全部'],
      listOption: ['全部', '省', '市', '区'],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
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
    color: rgba(0, 0, 0, 0.87);
  }
  &-item__address {
    padding-bottom: 64px;
  }
  &-item_240 {
    width: 240px;
  }
}
</style>
