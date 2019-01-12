<template>
  <div class="dashboard-container">Hi, {{ userInfo.username }} !</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',

    computed: {
      ...mapState({
        userInfo: state => state.user.info,
      }),
    },
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
