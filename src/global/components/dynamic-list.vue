// 动态列表
// el-table: 支持 el-table 和 el-table-column 的所有属性、方法、slots
// 新增属性: type('table'和其他), v-model, schema, pager(url,urlKeys)
// 新增方法: fetch-list

/*
  支持的slot:
  1. header
*/

/*
  支持的皮肤:
  1. ''(默认)
  2. card
  可扩展
*/

<template>
  <section :class="theme" class="dynamic-list">
    <div class="el-alert el-alert--error is-dark list-error" v-if="disabled">
      <span class="txt">{{ message }}</span>
      <el-link @click="goToFirstPage" type="primary">返回第一页</el-link>
    </div>
    <template v-else>
      <header class="block-title header" v-if="title || $slots.header">
        <span v-if="title">{{ title }}</span>
        <slot name="header" v-if="$slots.header"></slot>
      </header>

      <!-- 表格 -->
      <el-table
        :data="value"
        :element-loading-background="$attrs['loading-background'] || 'rgba(0, 0, 0, 0.3)'"
        :element-loading-spinner="$attrs['loading-spinner'] || 'el-icon-loading'"
        :element-loading-text="$attrs['loading-spinner'] || '加载中···'"
        :fit="true"
        class="table"
        v-bind="$attrs"
        v-if="!type || type==='table'"
        v-loading="listLoading"
        v-on="$listeners"
      >
        <!-- 列 -->
        <template v-for="(col, index) of computedSchema">
          <slot :name="col.slot" :width="col.width" v-if="col.slot"></slot>
          <el-table-column
            :key="index"
            :render-header="col['render-header'] || col['renderHeader'] || renderHeader"
            show-overflow-tooltip
            v-bind="col"
            v-else
          >
            <template v-if="col.component" v-slot="scope">
              <component :col="col" :is="col.component" :scope="scope" v-on="$listeners"></component>
            </template>

            <template v-if="Array.isArray(col.columns)">
              <el-table-column
                :key="index2"
                show-overflow-tooltip
                v-bind="col2"
                v-for="(col2, index2) of col.columns"
              ></el-table-column>
            </template>
          </el-table-column>
        </template>

        <!-- 传递插槽 -->
        <slot :name="slot" :slot="slot" v-for="slot in Object.keys($slots)" />

        <!-- 插槽例子1: -->
        <!--
        附加行
        Docs: https://element.eleme.io/#/table-slot
        <template v-slot:append>
          <el-button>button</el-button>
        </template>
        -->

        <!-- 插槽例子2 -->
        <!--
        自定义列
        Docs: https://element.eleme.io/#/table-column-scoped-slot
        <el-table-column>
          <template v-slot:header>自定义列头</template>
          <template v-slot="{ row }">{{ row.PictureURL }}</template>
        </el-table-column>
        -->
      </el-table>

      <!-- 其他列表 -->
      <template v-else>
        <el-row
          :element-loading-background="$attrs['loading-background'] || 'rgba(0, 0, 0, 0.3)'"
          :element-loading-spinner="$attrs['loading-spinner'] || 'el-icon-loading'"
          :element-loading-text="$attrs['loading-spinner'] || '加载中···'"
          class="dynamic-list-row"
          v-bind="$attrs"
          v-loading="listLoading"
        >
          <div class="both-center empty-wrap" v-if="!Array.isArray(value) || value.length < 1">
            <slot name="empty">暂无数据</slot>
          </div>

          <slot v-bind="{ item, index }" v-else v-for="(item, index) of value"></slot>
        </el-row>
      </template>

      <!-- 分页 -->
      <div class="infinite-pager" v-if="pagerOptions.type === 'infinite'">
        <slot name="pager">
          <el-button :loading="loadMoreLoading" @click="loadMore" v-if="hasMoreData">加载更多</el-button>
          <span v-else-if="Array.isArray(value) && value.length > 0">没有更多数据了</span>
        </slot>
      </div>
      <!-- 添加定制样式的分页 -->
      <div class="pager custom-pager" v-else-if="pagerOptions.type === 'custom'">
        <slot name="pager">
          <slot
            class="pager-slot"
            name="pager-slot"
            v-bind="{pagerOptions, listLoading, onPageCurrentChange, onPageSizeChange}"
          >
            <custom-pager-slot
              :disabled="listLoading"
              :hide-on-single-page="hideOnSinglePage"
              @current-change="onPageCurrentChange"
              @size-change="onPageSizeChange"
              v-bind="pagerOptions"
            ></custom-pager-slot>
          </slot>
        </slot>
      </div>
      <div class="pager" v-else>
        <slot name="pager">
          <el-pagination
            :disabled="listLoading"
            :hide-on-single-page="hideOnSinglePage"
            @current-change="onPageCurrentChange"
            @size-change="onPageSizeChange"
            v-bind="pagerOptions"
          >
            <slot
              class="pager-slot"
              name="pager-slot"
              v-bind="{pagerOptions, listLoading, onPageCurrentChange, onPageSizeChange}"
            ></slot>
          </el-pagination>
        </slot>
      </div>
    </template>
  </section>
</template>

<script>
  // 引入定制样式的分页
  import CustomPagerSlot from '@/components/custom-pager-slot'

  export default {
    name: 'DynamicList',
    components: { CustomPagerSlot },

    inheritAttrs: false,

    props: {
      type: {
        type: String,
        default: 'table'
      },
      schema: {
        type: Array,
        default: _ => []
      },
      value: {
        type: Array,
        default: _ => []
      },
      pager: {
        type: Object,
        default: _ => ({})
      },
      autoFetch: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      innerPager: null,
      pagerDefaults: {
        type: 'pager', // pager, infinite
        total: 0,
        currentPage: 0,
        pageSize: 15,
        pageSizes: [15, 30, 50],
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        hideOnSinglePage: true,
        url: false,
        urlKeys: {
          index: 'index',
          size: 'size'
        }
      },
      disabled: false,
      message: '',
      tmpDataList: []
    }),

    computed: {
      computedSchema() {
        return this.schema.filter(Boolean)
      },
      pagerOptions: {
        get() {
          // if (!this.innerPager) {
          this.innerPager = {
            ...this.pagerDefaults,
            ...(this.pager || {})
          }
          // }
          return this.innerPager
        },
        set(val) {
          this.innerPager = val
        }
      },
      hideOnSinglePage() {
        return this.pagerOptions.hideOnSinglePage === false ||
          this.pagerOptions['hide-on-single-page'] === false
          ? false
          : this.pagerOptions.pageSize <= Math.min(...this.pagerOptions.pageSizes)
      },
      needUpdateUrl() {
        return this.pager && this.pager.url
      },
      hasPagerQuery() {
        const query = this.$route.query
        return (
          query && (query[this.pagerOptions.urlKeys.index] || query[this.pagerOptions.urlKeys.size])
        )
      },
      hasMoreData() {
        return this.pagerOptions.pageSize * this.pagerOptions.currentPage < this.pagerOptions.total
      },
      listLoading() {
        return this.pagerOptions.type === 'infinite' ? false : this.loading
      },
      loadMoreLoading() {
        return this.loading
      }
    },

    watch: {
      $route: {
        handler() {
          if (this.needUpdateUrl) {
            this.fetchData()
          }
        },
        deep: true
      },
      pagerOptions: {
        handler(val) {
          if (val && val.total) {
            this.checkPageRange()
          }
        },
        deep: true
      },
      value: {
        handler(val) {
          if (Array.isArray(val)) {
            if (this.pagerOptions.type === 'infinite') {
              this.tmpDataList = this.tmpDataList.concat(val)
            } else {
              this.tmpDataList = val
            }
          }
        },
        immediate: true
      }
    },

    created() {
      if (this.autoFetch) {
        if (this.needUpdateUrl) {
          if (this.hasPagerQuery) {
            this.updatePager()
            this.fetchData()
          } else {
            this.updateUrl()
          }
        } else {
          this.fetchData()
        }
      }
    },

    methods: {
      fetchData() {
        this.$emit('update:pager', this.pagerOptions)
        this.$emit('fetch-list', this.pagerOptions)
      },
      renderHeader(creatElement, { column, $index }) {
        const field = this.computedSchema[$index]
        const tooltip = field.tooltip
        if (tooltip) {
          return creatElement('div', [
            column.label,
            creatElement(
              'el-tooltip',
              {
                class: `th-tips ${tooltip.class}`,
                props: {
                  content: tooltip.content,
                  effect: tooltip.effect,
                  placement: tooltip.placement || 'top'
                }
              },
              [
                creatElement('i', {
                  class: tooltip.icon
                })
              ]
            )
          ])
        }

        return column.label
      },
      onPageCurrentChange(index) {
        this.pagerOptions.currentPage = index
        if (this.needUpdateUrl) {
          this.updateUrl()
        } else {
          this.fetchData()
        }
      },
      onPageSizeChange(size) {
        this.pagerOptions.pageSize = size
        this.pagerOptions.currentPage = 1
        if (this.needUpdateUrl) {
          this.updateUrl()
        } else {
          this.fetchData()
        }
      },
      updatePager() {
        const query = this.$route.query
        const opts = this.pagerOptions
        const urlKeys = opts.urlKeys
        if (query[urlKeys.index] || query[urlKeys.size]) {
          if (query[urlKeys.index]) {
            opts.currentPage = query[urlKeys.index] * 1
          }
          if (query[urlKeys.size]) {
            const size = query[urlKeys.size] * 1
            if (!opts.pageSizes.includes(size)) {
              opts.pageSizes.unshift(size)
            }
            opts.pageSize = size
          }
        }
        this.$emit('update:pager', this.pagerOptions)
      },
      updateUrl() {
        const { name, params, query } = this.$route
        this.$router.push({
          name,
          params,
          query: {
            ...query,
            [this.pagerOptions.urlKeys.index]: this.pagerOptions.currentPage,
            [this.pagerOptions.urlKeys.size]: this.pagerOptions.pageSize
          }
        })
      },
      checkPageRange() {
        const { currentPage, pageSize, total } = this.pagerOptions
        const totalPages = Math.ceil(total / pageSize)
        const outOfRange = currentPage > totalPages
        this.message = outOfRange ? '页码超出范围' : ''
        this.disabled = outOfRange
      },
      goToFirstPage() {
        this.pagerOptions.currentPage = 1
        if (this.needUpdateUrl) {
          this.updateUrl()
        } else {
          this.fetchData()
        }
      },
      loadMore() {
        this.pagerOptions.currentPage = this.pagerOptions.currentPage + 1
        if (this.needUpdateUrl) {
          this.updateUrl()
        } else {
          this.fetchData()
        }
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/css/vars.css');

  .dynamic-list {
    position: relative;

    >>> .th-tips {
      margin-left: 5px;
    }

    >>> .el-button + .el-button {
      margin-left: 0;
    }

    >>> .el-button {
      margin-right: 5px;
    }

    >>> .el-button--text {
      padding: 2px 0;
    }

    .dynamic-list-row {
      min-height: 100px;
      position: relative;
    }

    .empty-wrap {
      text-align: center;
      line-height: 36px;
      font-size: $font-size-base;
      color: $color-info;
    }

    &.card {
      padding: 20px;
      background-color: $background-color-light;
    }
  }

  .header {
    margin-bottom: 20px;
  }

  .table {
    /* 修复IE 11下初次加载表格不能填满页面的问题 */
    >>> .el-table__header,
    >>> .el-table__body {
      width: 100% !important;
    }
  }

  .pager {
    padding: 20px 0 0;

    >>> .el-pagination {
      padding: 0;
    }

    .pager-slot {
      width: 100%;
    }
  }

  .infinite-pager {
    font-size: 12px;
    line-height: 34px;
    text-align: center;
  }

  .list-error {
    text-align: center;
    font-size: 12px;
    display: block;

    .txt {
      margin: 0 10px;
      vertical-align: middle;
    }
  }
</style>
