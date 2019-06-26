<template lang="pug">
  .login(v-if='isShowLoginPage')
    MaskComponent(@click.native="closeLoginPage")
    .login-container
      input.user-name(type="text" v-model="username" placeholder="请输入用户名" maxlength=30)
      input.password(type="password" v-model="password" placeholder="请输入密码" maxlength=30)
      .captcha
        input.captcha-input(type='text' v-model='code' maxlength=4 placeholder="请输入验证码")
        img(:src='captcha' @click="updateCaptcha")
      button.submit(@click="doLogin") 登录


</template>

<script lang="ts">
  import {Component, Vue, Model} from 'vue-property-decorator';
  import MaskComponent from './common/MaskComponent.vue';
  import PopupApi from '../apis/PopupApi'
  import AjaxResponse = Response.AjaxResponse

  @Component({
    components: {
      MaskComponent
    },
  })
  export default class Login extends Vue {
    username: string = '';
    password: string = '';
    code: string = '';
    popupApi: PopupApi = new PopupApi()
    captcha: string = '';

    updateCaptcha() {
      const before = process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:5010' : '/api'
      this.captcha = before + '/captcha?' + Math.random()
    }


    @Model('isShowLoginPage', {
      type: Boolean
    })
    readonly isShowLoginPage!: boolean;

    closeLoginPage() {
      this.$emit('closeLoginPage')
    }

    doLogin() {
      if (this.username === '') {
        alert('用户名不能为空')
      } else if (this.password === '') {
        alert('密码不能为空')
      } else {
        this.popupApi.doLogin({
          username: this.username,
          password: this.password,
          code: this.code
        }).then((res: AjaxResponse) => {
          alert(res.msg)
          this.$emit('closeLoginPage', this.username)
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
  .login {


    .login-container {
      position fixed;
      top 50px;
      background #fff;
      font-size 24px;
      padding 10px 0;
      min-width 400px;

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
        height 42px;
        display block;
        text-align center;
        line-height 42px;
        border 0;
        outline 0;
        color #fff;
        background mainColor;
        cursor pointer;
        margin auto;
      }

    }
  }
</style>
