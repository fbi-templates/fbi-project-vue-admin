<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>

    <breadcrumb></breadcrumb>

    <el-dropdown v-if="userInfo && userInfo.username" class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        {{ userInfo.username }}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item>
          <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <router-link v-else class="lnk-login" :to="{ name: 'login' }">{{ $t('login.logIn') }}</router-link>
  </el-menu>
</template>

<script>
  import { mapState } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        userInfo: state => state.user.info,
      }),
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$user.set(null)
          location.reload()
        })
      },
    },
  }
</script>

<style scoped>
  @import '../../assets/css/vars';

  .navbar {
    height: $nav-bar-height;
    line-height: $nav-bar-height;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .lnk-login {
      float: right;
      margin-right: 1em;
      font-size: 14px;
    }
  }
</style>

