<template>
  <div :class="classObj" class="app-wrapper">
    <div @click="handleClickOutside" class="drawer-bg" v-if="device === 'mobile' && sidebar.opened"></div>

    <!-- 侧栏 -->
    <!-- <section class="sidebar-container">
      <div class="app-title">
        <router-link :to="{ name: 'dashboard' }">{{ $t('app.name') }}</router-link>
      </div>
      <side-bar class="side-bar"/>
    </section>-->
    <side-bar class="sidebar-container"/>

    <!-- 主体内容 -->
    <section :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar/>
        <tags-view v-if="needTagsView"/>
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

  /* .app-wrapper {
                            @include clearfix;
                            position: relative;
                            height: 100%;
                            width: 100%;

                            .sidebar-container {
                              transition: width 0.28s;
                              width: $sideBarWidth !important;
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
                              margin-left: $sideBarWidth;
                              position: relative;
                            }

                            &.hideSidebar {
                              .sidebar-container {
                                width: $sideBarMinWidth !important;
                              }

                              .main-container {
                                margin-left: $sideBarMinWidth;
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
                                width: $sideBarWidth !important;
                              }

                              &.hideSidebar {
                                .sidebar-container {
                                  transition-duration: 0.3s;
                                  transform: translate3d(-$sideBarWidth, 0, 0);
                                }
                              }

                              .openSidebar {
                                position: fixed;
                                top: 0;
                              }
                            }
                          } */
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

