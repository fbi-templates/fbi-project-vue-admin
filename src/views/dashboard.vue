<template>
  <div class="dashboard-container">
    <div v-if="userInfo">Hi, {{ userInfo.username }} !!!</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',

    computed: {
      ...mapState({
        userInfo: state => state.user.info
      })
    }
  }
</script>

<style scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
