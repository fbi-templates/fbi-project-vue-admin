<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item :key="item.path" v-if="item.name">
          <span
            class="no-redirect"
            v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          >{{ generateTitle(item.name) }}</span>

          <router-link :to="item.redirect || item.path" v-else>{{ generateTitle(item.name) }}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { generateTitle } from '@/utils/i18n'

  export default {
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      generateTitle,
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'dashboard') {
          matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
        }
        this.levelList = matched
      }
    }
  }
</script>

<style scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
