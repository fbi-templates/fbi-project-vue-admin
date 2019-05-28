<template>
  <section class="app-main">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import styles from '@/assets/css/vars.css'

  export default {
    name: 'AppMain',

    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/vars';

  .app-main {
    /* 50 = navbar  */
    min-height: calc(100vh - $navBarHeight - $tagsViewHeight);
    position: relative;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: $navBarHeight;
  }

  .hasTagsView {
    .app-main {
      min-height: calc(100vh - $navBarHeight - $tagsViewHeight);
    }

    .fixed-header + .app-main {
      padding-top: calc($navBarHeight + $tagsViewHeight);
    }
  }
</style>
