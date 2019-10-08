<template>
  <div :class="classObj" class="app-wrapper">
    <div @click="handleClickOutside" class="drawer-bg" v-if="device === 'mobile' && sidebar.opened"></div>

    <!-- 侧栏 -->
    <side-bar class="sidebar-container" />

    <!-- 主体内容 -->
    <section :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main></app-main>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppMain, NavBar, SideBar, TagsView } from './components'
  import ResizeMixin from './mixin/resize-handler'

  export default {
    name: 'Layout',

    components: {
      NavBar,
      SideBar,
      TagsView,
      AppMain
    },

    mixins: [ResizeMixin],

    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },

    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/vars';
  @import '../../assets/css/mixin';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - $sideBarWidth);
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - $sideBarMinWidth);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>

<style>
  .el-menu--vertical {
    & > .el-menu {
      .svg-icon {
        margin-right: 10px;
      }
    }
  }
</style>

