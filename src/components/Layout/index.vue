<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>

    <!-- 侧栏 -->
    <section class="sidebar-container">
      <div class="app-title">
        <router-link :to="{ name: 'dashboard' }">{{ $t('app.name') }}</router-link>
      </div>
      <side-bar class="side-bar"></side-bar>
    </section>

    <!-- 主体内容 -->
    <section class="main-container">
      <nav-bar></nav-bar>
      <tags-view></tags-view>
      <app-main></app-main>
    </section>
  </div>
</template>

<script>
  import NavBar from './nav-bar'
  import SideBar from './side-bar'
  import TagsView from './tags-view'
  import AppMain from './app-main'
  import ResizeMixin from './mixin/resize-handler'

  export default {
    name: 'Layout',

    components: {
      NavBar,
      SideBar,
      TagsView,
      AppMain,
    },

    mixins: [ResizeMixin],

    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      },
      device () {
        return this.$store.state.app.device
      },
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile',
        }
      },
    },

    methods: {
      handleClickOutside () {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    },
  }
</script>

<style scoped>
  @import "../../assets/css/vars";
  @import "../../assets/css/mixin";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    .sidebar-container {
      transition: width 0.28s;
      width: $sidebar-width !important;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;

      .app-title {
        height: $appTitleHeight;
        line-height: $appTitleHeight;
        text-align: center;
        background-color: #304156;
        color: #fff;
        border-right: solid 1px #e6e6e6;
        font-size: 24px;
      }

      .side-bar {
        height: calc(100vh - $appTitleHeight);
      }
    }

    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s;
      margin-left: $sidebar-width;
      position: relative;
    }

    &.hideSidebar {
      .sidebar-container {
        width: $sidebar-min-width !important;
      }

      .main-container {
        margin-left: $sidebar-min-width;
      }

      >>> .submenu-title-noDropdown {
        padding-left: 10px !important;
        position: relative;

        .el-tooltip {
          padding: 0 10px !important;
        }
      }

      >>> .el-submenu {
        overflow: hidden;
        & > .el-submenu__title {
          padding-left: 10px !important;

          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      >>> .el-menu--collapse {
        .el-submenu {
          & > .el-submenu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }

    &.mobile {
      .main-container {
        margin-left: 0px;
      }

      .sidebar-container {
        transition: transform 0.28s;
        width: $sidebar-width !important;
      }

      &.hideSidebar {
        .sidebar-container {
          transition-duration: 0.3s;
          transform: translate3d(-$sidebar-width, 0, 0);
        }
      }

      .openSidebar {
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

