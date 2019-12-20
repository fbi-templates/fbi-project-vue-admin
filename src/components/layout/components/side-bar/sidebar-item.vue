<template>
  <div class="menu-wrapper" v-if="!item.hidden && item.children">
    <!-- 只有一个子节点、没有子节点 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <a
        :href="onlyOneChild.path"
        @click="clickLink(onlyOneChild.path, $event)"
        target="_blank"
        v-if="onlyOneChild.meta"
      >
        <el-menu-item
          :class="{'submenu-title-noDropdown': !isNest}"
          :index="resolvePath(onlyOneChild.path)"
          v-if="sidebar.opened"
        >
          <menu-item
            :extra="onlyOneChild.meta.extra"
            :icon="onlyOneChild.meta.icon"
            :title="generateTitle(onlyOneChild.name)"
          ></menu-item>
        </el-menu-item>
        <el-tooltip
          :content="generateTitle(onlyOneChild.name)"
          class="item"
          effect="dark"
          placement="right"
          v-else
        >
          <el-menu-item
            :class="{'submenu-title-noDropdown': !isNest}"
            :index="resolvePath(onlyOneChild.path)"
          >
            <menu-item :extra="onlyOneChild.meta.extra" :icon="onlyOneChild.meta.icon"></menu-item>
          </el-menu-item>
        </el-tooltip>
      </a>
    </template>

    <el-submenu :index="item.name || item.path" popper-append-to-body v-else>
      <!-- menu title -->
      <template slot="title" v-if="item.meta">
        <!-- title也路由 -->
        <a
          :href="item.path"
          :key="item.name"
          @click="clickLink(item.path, $event, basePath)"
          target="_blank"
          v-if="item.meta.route"
        >
          <menu-item
            :extra="item.meta.extra"
            :icon="item.meta.icon"
            :title="generateTitle(item.name)"
          ></menu-item>
        </a>
        <!-- title不路由 -->
        <menu-item
          :extra="item.meta.extra"
          :icon="item.meta.icon"
          :title="generateTitle(item.name)"
          v-else
        ></menu-item>
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            :base-path="resolvePath(child.path)"
            :is-nest="true"
            :item="child"
            :key="child.path"
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
          />

          <a
            :href="child.path"
            :key="child.name"
            @click="clickLink(child.path, $event)"
            target="_blank"
            v-else-if="child.meta"
          >
            <el-menu-item :index="resolvePath(child.path)">
              <menu-item
                :extra="child.meta.extra"
                :icon="child.meta.icon"
                :title="generateTitle(child.name)"
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
  import { mapState } from 'vuex'
  import { validateURL } from '@/utils/validate'
  import { generateTitle } from '@/utils/i18n'
  import MenuItem from './menu-item'
  import FixiOSBug from './fix-iOS-bug'

  export default {
    name: 'SidebarItem',

    components: { MenuItem },

    mixins: [FixiOSBug],

    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      onlyOneChild: null
    }),

    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar
      })
    },

    methods: {
      generateTitle,
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // temp set(will be used if only has one showing child )
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },

      resolvePath(routePath) {
        return path.resolve(this.basePath, routePath)
      },

      isExternalLink(routePath) {
        return validateURL(routePath)
      },

      clickLink(routePath, e, exact) {
        if (!this.isExternalLink(routePath)) {
          e.preventDefault()

          if (exact) {
            this.$router.push(exact)
          } else {
            const path = this.resolvePath(routePath)
            this.$router.push(path)
          }
        }
      }
    }
  }
</script>
