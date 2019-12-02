<template>
  <div>
    <div class="container-bg">
      <a-form :form="form" class="form">
        <a-row>
          <a-col class="form-time" :xl="{ span: 8 }" :lg="{ span: 8 }" :sm="{ span: 8 }">
            <a-form-item
              :colon="false"
              label="发表时间"
              :class="{ 'form-remove-margin': !collapse }"
              :labelCol="{
          xl: { span: 9 },
          lg: { span: 14 },
          md:{span:14},
          sm: { span: 14 }
        }"
              :wrapperCol="{ xl: { span: 15},lg: { span: 14 },  md:{ span:14},sm: { span: 14 } }"
            >
              <a-range-picker @change="onChange" size="large" class="form-date__picker"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{ offset:2 }" :lg="{offset:2 }" :sm="{ span: 8 }">
            <a-form-item :colon="false" :class="{ 'form-remove-margin': !collapse }">
              <div class="form-date__choose">
                <div
                  v-for="(date, index) in dateList"
                  :key="date.id"
                  class="form-date__item"
                  :class="{ 'form-date__item_active': index === selectedIndex }"
                  @click="handleDate(index)"
                >{{ date.label }}</div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="grid">
          <a-col :xl="{ span: 8 }" :lg="{ span: 8 }" :sm="{ span: 8 }">
            <a-form-item
              :colon="false"
              label="发布者"
              :labelCol="{
          xl: { span: 9 },
          lg: { span: 14 },
          md:{span:14},
          sm: { span: 14 }
        }"
              :wrapperCol="{ xl: { span: 15},lg: { span: 14 },  md:{ span:14},sm: { span: 14 } }"
              v-show="collapse"
              class="form-deliver"
              :class="{ 'form-remove-margin': collapse }"
            >
              <a-input
                aria-placeholder="请输入发布者名称"
                placeholder="请输入发布者名称"
                size="large"
                class="form-deliver__input_280"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8 }" :lg="{ span: 8 }" :sm="{ span: 8 }">
            <a-form-item
              :colon="false"
              label="关键词"
              :labelCol="{
          xl: { span: 9 },
          lg: { span: 14 },
          md:{span:14},
          sm: { span: 14 }
        }"
              :wrapperCol="{ xl: { span: 15},lg: { span: 14 }, md:{ span:14},sm: { span: 14 } }"
              v-show="collapse"
              class="form-deliver"
              :class="{ 'form-remove-margin': collapse }"
            >
              <a-input
                class="form-deliver__input_240"
                aria-placeholder="请输入关键词"
                placeholder="请输入关键词"
                size="large"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8 }" :lg="{ span: 8 }" :sm="{ span: 8 }">
            <a-form-item
              :colon="false"
              label="有无评价"
              :labelCol="{
          xl: { span: 9 },
          lg: { span: 14 },
          md:{span:14},
          sm: { span: 14 }
        }"
              :wrapperCol="{ xl: { span: 15},lg: { span: 14 },  md:{ span:14},sm: { span: 14 } }"
              v-show="collapse"
              class="form-deliver"
              :class="{ 'form-remove-margin': collapse }"
            >
              <a-select v-model="selectOption" class="form-deliver__select" size="large">
                <a-select-option v-for="listItem in listOption" :key="listItem">{{ listItem }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <ToggleOption :collapse="collapse" @toggle="hanldeToggle($event)"></ToggleOption>
      </a-form>
    </div>
    <div class="container-bg file-upload">
      <a-form :form="form2" class="form">
        <a-form-item
          :colon="false"
          label="上传凭证"
          :labelCol="{
          xl: { span: 3 },
          lg: { span: 4 },
          sm: { span: 7 }
        }"
          :wrapperCol="{ lg: { span: 10 }, md: { span: 14 }, sm: { span: 17 } }"
        >
          <a-upload action="" directory>
            <a-button>
              <a-icon type="upload"/>Upload Directory
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </div>
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
      form: this.$form.createForm(this, { name: 'control2' }),
      form2: this.$form.createForm(this, { name: 'control3' }),
      dateList: [
        { label: '昨天', value: '' },
        { label: '前天', value: '' },
        { label: '近7天', value: '' },
        { label: '近30天', value: '' }
      ],
      selectedIndex: 0,
      selectOption: ['中国工商银行'],
      listOption: ['中国银行', '中国工商银行'],
      collapse: false
    };
  },

  methods: {
    hanldeToggle(data) {
      this.collapse = data;
    },
    onChange(e) {
      console.log(e, 'e');
    },
    handleDate(index) {
      this.selectedIndex = index;
    }
  }
};
</script>

<style scoped lang="less">
.form {
  position: relative;
  &-date__picker {
    width: 280px;
  }
  &-date__choose {
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
    padding: 2px;
    margin-left: 16px;
    width: 260px;
    border-radius: 4px;
    background-color: #f2f2f4;
    > .form-date__item {
      vertical-align: top;
      display: inline-block;
      text-align: center;
    }
  }
  &-deliver {
    padding-bottom: 64px;
    &__input_280 {
      max-width: 280px;
    }
    &__input_240 {
      max-width: 240px;
    }
    &__select {
      max-width: 240px;
    }
  }
  &-choice {
    position: absolute;
    bottom: 0px;
    right: 0;
  }
  &-date__item {
    user-select: none;
    transition: 0.3s ease;
    cursor: pointer;
    width: 64px;
    height: 36px;
    font-size: 12px;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.38);
    &_active {
      background-color: white;
      color: rgba(0, 0, 0, 0.87);
    }
  }
  &-label {
    font-size: 14px;
    margin-left: 22px;
    margin-right: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 14px;
    &:last-of-type {
      margin-left: 48px;
    }
  }
}
.file-upload {
  margin-top: 16px;
}
</style>
