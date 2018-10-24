<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
  }
</script>

<style scoped>
  @import '../../assets/css/vars';

  .app-main {
    /* 50 = navbar  */
    min-height: calc(100vh - $nav-bar-height - $tags-view-height);
    position: relative;
    overflow: hidden;
  }
</style>
