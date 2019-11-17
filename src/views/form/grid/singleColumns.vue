<template>
    <div style="text-align:left;">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item :colon="false" label="昵称" :label-col="{ span: 2 }" :wrapper-col="{span:4}">
                <a-input
                    size="large"
                    aria-placeholder="请输入昵称"
                    placeholder="请输入昵称"
                    allowClear
                    v-decorator="['name', { rules: [ {required: true, message: '请输入昵称'} ]
                }
                ]"
                ></a-input>
            </a-form-item>
            <a-form-item label="密码" :colon="false" :label-col="{ span: 2 }" :wrapper-col="{span:4}">
                <a-input
                    size="large"
                    aria-placeholder="密码"
                    placeholder="密码"
                    type="password"
                    allowClear
                    v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                ></a-input>
            </a-form-item>
            <a-form-item
                label="确认密码"
                :colon="false"
                :label-col="{ span: 2 }"
                :wrapper-col="{span:4}"
            >
                <a-input
                    size="large"
                    aria-placeholder="确认密码"
                    placeholder="确认密码"
                    type="password"
                    allowClear
                    v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                ></a-input>
            </a-form-item>
            <a-form-item
                label="手机号"
                :colon="false"
                :label-col="{ span: 2 }"
                :wrapper-col="{span:4}"
            >
                <a-input
                    size="large"
                    aria-placeholder="请输入手机号"
                    placeholder="请输入手机号"
                    allowClear
                    v-decorator="['phone', { rules: [ {required: true, message: '请输入正确的手机号',pattern: /^1[3456789]\d{9}$/ } ]
                }
                ]"
                ></a-input>
            </a-form-item>
            <a-form-item
                label="手机验证码"
                :colon="false"
                :label-col="{ span: 2 }"
                :wrapper-col="{span:4}"
            >
                <div class="fx_sp sms-container">
                    <a-input
                        size="large"
                        type="text"
                        class="sms-input"
                        placeholder="验证码"
                        v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
                    ></a-input>
                    <a-button
                        class="getCaptcha"
                        size="large"
                        :disabled="state.smsSendBtn"
                        @click.stop.prevent="getCaptcha"
                        v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
                    ></a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'single' }),
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      }
    };
  },
  mounted() {
    console.log(this.form.getFieldsError());
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error('密码强度不够'));
      }
    },
    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password');
      console.log('value', value);
      if (value === undefined) {
        callback(new Error('请输入密码'));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'));
      }
      callback();
    },
    handlePhoneCheck() {},
    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
        // $message,
        // $notification
      } = this;

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);
          // const hide = $message.loading('验证码发送中..', 0);

          // getSmsCaptcha({ mobile: values.mobile })
          //   .then(res => {
          //     setTimeout(hide, 2500);
          //     $notification['success']({
          //       message: '提示',
          //       description:
          //         '验证码获取成功，您的验证码为：' + res.result.captcha,
          //       duration: 8
          //     });
          //   })
          //   .catch(err => {
          //     setTimeout(hide, 1);
          //     clearInterval(interval);
          //     state.time = 60;
          //     state.smsSendBtn = false;
          //     this.requestFailed(err);
          //   });
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  }
};
</script>

<style scoped>
/deep/ .ant-input {
  width: 280px;
}
.sms-container {
  width: 280px;
}
.sms-input {
  width: 144px;
}
.getCaptcha {
  width: 120px;
}
</style>
