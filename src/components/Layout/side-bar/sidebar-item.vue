<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <!-- 只有一个子节点、没有子节点 -->
    <template
      v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && !item.alwaysShow"
    >
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path, $event)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown': !isNest}"
        >
          <menu-item
            v-if="onlyOneChild.meta"
            :icon="onlyOneChild.meta.icon"
            :title="generateTitle(onlyOneChild.name)"
            :extra="onlyOneChild.meta.extra"
          ></menu-item>
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.name || item.path">
      <!-- menu title -->
      <template slot="title">
        <!-- title也路由 -->
        <a
          v-if="item.meta && item.meta.route"
          :href="item.path"
          :key="item.name"
          target="_blank"
          @click="clickLink(item.path, $event, basePath)"
          class="title-link"
        >
          <menu-item
            v-if="item.meta"
            :icon="item.meta.icon"
            :title="generateTitle(item.name)"
            :extra="item.meta.extra"
          ></menu-item>
        </a>
        <!-- title不路由 -->
        <menu-item
          v-else-if="item.meta"
          :icon="item.meta.icon"
          :title="generateTitle(item.name)"
          :extra="item.meta.extra"
        ></menu-item>
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
          />

          <a
            v-else
            :href="child.path"
            :key="child.name"
            target="_blank"
            @click="clickLink(child.path, $event)"
          >
            <el-menu-item :index="resolvePath(child.path)">
              <menu-item
                v-if="child.meta"
                :icon="child.meta.icon"
                :title="generateTitle(child.name)"
                :extra="child.meta.extra"
              ></menu-item>
            </el-menu-item>
          </a>
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { validateURL } from '@/utils/validate'
  import { generateTitle } from '@/utils/i18n'
  import MenuItem from './menu-item'

  export default {
    name: 'SidebarItem',

    components: { MenuItem },

    props: {
      // route配置json
      item: {
        type: Object,
        required: true,
      },
      isNest: {
        type: Boolean,
        default: false,
      },
      basePath: {
        type: String,
        default: '',
      }
    },

    data () {
      return {
        onlyOneChild: null,
      }
    },

    methods: {
      generateTitle,
      hasOneShowingChild (children) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // temp set(will be used if only has one showing child )
            this.onlyOneChild = item
            return true
          }
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },

      resolvePath (routePath) {
        return path.resolve(this.basePath, routePath)
      },

      isExternalLink (routePath) {
        return validateURL(routePath)
      },

      clickLink (routePath, e, exact) {
        if (!this.isExternalLink(routePath)) {
          e.preventDefault()

          if (exact) {
            this.$router.push(exact)
          } else {
            const path = this.resolvePath(routePath)
            this.$router.push(path)
          }
        }
      },
    },
  }
</script>
