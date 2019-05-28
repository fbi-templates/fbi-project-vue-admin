<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      :toggle-click="toggleSideBar"
      class="hamburger-container"
    ></hamburger>

    <breadcrumb></breadcrumb>

    <div class="right-menu">
      <el-dropdown class="avatar-container" v-if="userInfo && userInfo.username">
        <div class="avatar-wrapper">
          {{ userInfo.username }}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <router-link :to="{ name: 'login' }" class="lnk-login" v-else>{{ $t('login.logIn') }}</router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        userInfo: state => state.user.info
      })
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$vrm.setRoles(null)
          location.reload()
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/vars';
  .navbar {
    height: $navBarHeight;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: calc($navBarHeight + 8px);
      height: 100%;
      float: left;
      padding: 0px 15px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: $navBarHeight;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          cursor: pointer;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

