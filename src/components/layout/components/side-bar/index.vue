<template>
  <div :class="{'has-logo': showLogo}">
    <logo :collapse="isCollapse" v-if="showLogo"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="styles.menuActiveText"
        :background-color="styles.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="styles.menuText"
        :unique-opened="false"
        mode="vertical"
      >
        <sidebar-item
          :base-path="route.path"
          :item="route"
          :key="route.name"
          v-for="route in allRoutes"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Logo from './logo'
  import SidebarItem from './sidebar-item'
  import styles from '@/assets/css/vars.css'
  console.log(styles)

  export default {
    components: {
      Logo,
      SidebarItem
    },

    computed: {
      ...mapState({
        routes: state => state.app.routes,
        sidebar: state => state.app.sidebar
      }),
      allRoutes() {
        return this.routes.length > 0 ? this.routes : this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      styles: () => styles,
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      }
    }
  }
</script>

<style scoped>
  .el-scrollbar {
    height: 100%;
  }

  .scrollbar-wrapper {
    .el-scrollbar__view {
      height: 100%;

      .el-menu {
        height: 100%;
      }
    }

    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      /* border: none; */
      height: 100%;
      width: 100% !important;
    }
  }
</style>
