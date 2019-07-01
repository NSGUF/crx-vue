<template lang="pug">
  .register(v-if='isShowRegisterPage')
    MaskComponent(@click.native="closeRegisterPage")
    .register-container
      input.user-name(type="text" v-model="username" placeholder="请输入用户名" maxlength=30)
      input.password(type="password" v-model="password" placeholder="请输入密码" maxlength=30)
      input.password(type="password" v-model="confirmPassword" placeholder="请输入确认密码" maxlength=30)
      .captcha
        input.captcha-input(type='text' v-model='code' maxlength=4 placeholder="请输入验证码")
        img(:src='captcha' @click="updateCaptcha")
      button.submit(@click="doRegister") 登录
</template>

<script lang="ts">
  import {Component, Vue, Model} from 'vue-property-decorator';
  import MaskComponent from './common/MaskComponent.vue';
  import PopupApi from '../apis/PopupApi'
  import {optionUrl} from "@/utils/config"

  import AjaxResponse = Response.AjaxResponse

  @Component({
    components: {
      MaskComponent
    },
  })
  export default class Register extends Vue {
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    code: string = '';
    popupApi: PopupApi = new PopupApi();

    @Model('isShowRegisterPage', {
      type: Boolean
    })
    readonly isShowRegisterPage!: boolean;
    captcha: string = '';

    updateCaptcha() {
      this.captcha = optionUrl + '/captcha?' + Math.random()
    }

    closeRegisterPage() {
      this.$emit('closeRegisterPage')
    }

    doRegister() {
      if (this.username === '') {
        alert('用户名不能为空')
      } else if (this.password === '') {
        alert('密码不能为空')
      } else if (this.confirmPassword === '') {
        alert('确认密码不能为空')
      } else if (this.password !== this.confirmPassword) {
        alert('密码和确认密码不一致')
      } else if (this.code === '') {
        alert('验证码不能为空')
      } else {
        this.popupApi.doRegiest({
          username: this.username,
          password: this.password,
          code: this.code
        }).then((res: AjaxResponse) => {
          alert(res.msg)
          this.username = ''
          this.password = ''
          this.confirmPassword = ''
          this.code = ''
          this.updateCaptcha()
          this.$emit('closeRegisterPage')
        }).catch((res: AjaxResponse) => {
          alert(res.msg)
        })
      }
    }

    mounted() {
      this.updateCaptcha()
    }
  }
</script>

<style scoped lang="stylus">
  .register {


    .register-container {
      padding 10px 0;
      min-width 400px;
      position fixed;
      top 50px;
      background #fff;
      font-size 24px;

      .captcha {
        width 90%;
        margin auto;
        display flex;
        align-items center;
        justify-content space-between;
        margin-bottom 10px;

        .captcha-input {
          width 50%
          margin 0;
        }

        > img {
        }
      }

      .submit {
        width 90%;
        display block;
        margin auto;
        height 42px;
        text-align center;
        line-height 42px;
        border 0;
        outline 0;
        color #fff;
        background mainColor;
        cursor pointer;
      }

    }
  }
</style>
