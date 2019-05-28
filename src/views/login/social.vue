<template>
  <section>
    <div @click="wechatHandleClick('wechat')" class="sign-btn" title="微信">
      <span class="wx-svg-container">
        <svg-icon class="icon" icon-class="wechat"/>
      </span>
    </div>
    <div @click="tencentHandleClick('tencent')" class="sign-btn" title="QQ">
      <span class="qq-svg-container">
        <svg-icon class="icon" icon-class="qq"/>
      </span>
    </div>
  </section>
</template>

<script>
  // import openWindow from '@/utils/openWindow'

  export default {
    name: 'Social',
    methods: {
      wechatHandleClick(thirdpart) {
        alert('ok')
        // this.$store.commit('SET_AUTH_TYPE', thirdpart)
        // const appid = 'xxxxx'
        // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
        // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
        // openWindow(url, thirdpart, 540, 540)
      },
      tencentHandleClick(thirdpart) {
        alert('ok')
        // this.$store.commit('SET_AUTH_TYPE', thirdpart)
        // const client_id = 'xxxxx'
        // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
        // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        // openWindow(url, thirdpart, 540, 540)
      }
    }
  }
</script>

<style scoped>
  .sign-btn {
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    vertical-align: -8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    background-color: #6ba2d6;
    .icon {
      vertical-align: -6px;
    }
  }
</style>
