<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">

      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path">
      </sidebar-item>

    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {
      SidebarItem,
    },

    computed: {
      ...mapGetters(['sidebar']),

      routes() {
        return this.$router.options.routes
      },

      isCollapse() {
        return !this.sidebar.opened
      },
    },
  }
</script>


<style>
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
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
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
