<template>
  <div class="wrap">
    <h1>403</h1>
    <h3>{{ $t('error.403') }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Error403',

    created() {
      this.$store.dispatch('user/hasLogin').then(hasLogin => {
        if (hasLogin) {
          const redirectTo = this.$route.query.redirect
          const { access, redirect } = this.$vrm.hasAccessToRoute(redirectTo)
          if (access) {
            this.$router.push(redirectTo)
          }
        }
      })
    }
  }
</script>


<style scoped>
  .wrap {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;

    h1 {
      font-size: 48px;
      color: #999;
    }

    h3 {
      color: #666;
    }
  }
</style>
