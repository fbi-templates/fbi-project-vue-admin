<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">
        {{ $t('app.name') }} {{ $t('login.title') }}
      </h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" :placeholder="$t('login.username')"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="on" :placeholder="$t('login.password')" @keyup.enter.native="handleLogin"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"></svg-icon>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
      </el-form-item>
      <div class="tips" v-if="isDev">
        开发环境随机帐号
        <p>{{ $t('login.username') }}: {{ loginForm.username }}</p>
        <p>{{ $t('login.password') }}: {{ loginForm.password }}</p>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'

  export default {
    name: 'Login',

    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin',
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername },
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass },
          ],
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        isDev: ENV === 'dev',
      }
    },

    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true,
      },
    },

    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(res => {
                if (res) {
                  this.loading = false
                  // set userinfo (role)
                  this.$user.set(res.data)

                  this.$router.push({ path: this.redirect || '/' })
                } else {
                  throw new Error(res.message)
                }
              })
              .catch(err => {
                this.loading = false
                this.$message.error(err.message || '登录失败')
              })
          }
        })
      },
    },

    created() {
      if (this.isDev) {
        // 仅开发环境测试用
        this.$ajax.get('/users').then(res => {
          if (res.data.code === 0) {
            const user = res.data.data[0]
            this.loginForm.username = user.username
            this.loginForm.password = user.password
          }
        })
      }
    },
  }
</script>

<style>
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
    }

    .tips {
      font-size: 14px;
      color: #ccc;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
