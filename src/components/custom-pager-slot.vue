<template>
  <div class="el-pager pager-slot" v-if="!ifHide">
    <div class="fr right">
      每页显示项
      <el-dropdown @command="handleSizeChange">
        <div class="el-dropdown-link">
          {{pageSize}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-scrollbar class="vertical select-box">
            <el-dropdown-item
              :class="{ current: pageSize === size }"
              :command="size"
              :key="index"
              v-for="(size,index) in pageSizes"
            >{{ size }}</el-dropdown-item>
            <!-- 下面这个盒子用来把最后一个选项顶起来, 否则会被el-scrollbar的盒子盖住而不会出现滚动条 -->
            <div style="height: 15px; width: 1px; display: block;"></div>
          </el-scrollbar>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="page-nav">
        <el-button
          :disabled="currentPage < 2"
          @click="handlePrev"
          class="border-right button"
          icon="el-icon-arrow-left"
          plain
        ></el-button>
        <el-dropdown @command="handleCurrentChange" class="dropdown">
          <div class="el-dropdown-link">
            {{currentPage}}
            <div class="dark-text inline">/ {{totalPage}}</div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-scrollbar class="vertical select-box">
              <el-dropdown-item
                :class="{ current: currentPage === index }"
                :command="index"
                :key="index"
                v-for="index in totalPage"
              >
                {{index}}
                <div class="dark-text inline">/ {{totalPage}}</div>
              </el-dropdown-item>
              <!-- 下面这个盒子用来把最后一个选项顶起来, 否则会被el-scrollbar的盒子盖住而不会出现滚动条 -->
              <div style="height: 15px; width: 1px; display: block;"></div>
            </el-scrollbar>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          :disabled="currentPage >= totalPage"
          @click="handleNext"
          class="border-left button"
          icon="el-icon-arrow-right"
          plain
        ></el-button>
      </div>
    </div>

    <div class="total">共 {{total}} 项</div>
  </div>
</template>

<script>
  export default {
    name: 'CustomPaginationSlot',

    props: {
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number
      },
      pageSizes: {
        type: Array
      },
      currentPage: {
        type: Number,
        default: 1
      },
      hideOnSinglePage: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        ifHide: false
      }
    },

    watch: {
      total: {
        handler(val, oldVal) {
          if (this.hideOnSinglePage && this.pageSize >= val) {
            // 单页隐藏属性被设置且满足一页内显示完毕的情况
            this.ifHide = true
          } else {
            // 只有一页的时候也不隐藏, 即一直显示
            this.ifHide = false
          }
        },
        immediate: true
      }
    },

    computed: {
      totalPage() {
        return Math.ceil(this.total / this.pageSize) || 1
      }
    },
    methods: {
      handlePrev() {
        this.$emit('current-change', this.currentPage - 1)
      },
      handleNext() {
        this.$emit('current-change', this.currentPage + 1)
      },
      handleCurrentChange(val) {
        this.$emit('current-change', val)
      },
      handleSizeChange(val) {
        this.$emit('size-change', val)
      }
    }
  }
</script>

<style scoped>
  @import url('../assets/css/vars.css');

  $content-height: 36px;

  .pager-slot {
    width: 100%;
    height: $content-height;
    line-height: $content-height;
    text-align: left;
    color: $color-info;
    font-size: $font-size-medium;

    .total {
      display: inline-block;
      vertical-align: middle;
    }

    .right {
      margin-top: -1px;

      .button {
        width: 50px;
        height: $content-height;
        border: 0 none;

        &.border-right {
          border-right: 1px solid $border-color-base;
        }

        &.border-left {
          border-left: 1px solid $border-color-base;
        }
      }

      .page-nav {
        display: inline-block;
        height: $content-height;
        vertical-align: middle;
        margin-left: 10px;
        overflow: hidden;
        border: 1px solid $border-color-base;
        border-radius: 2px;
        /* 消除盒子之间的间隙 */
        font-size: 0;
      }
    }

    .dropdown {
      padding: 0 10px;
    }

    >>> .el-dropdown {
      cursor: pointer;
    }
  }

  .inline {
    display: inline-block;
  }

  .dark-text {
    color: $color-info;
  }

  .select-box >>> .el-scrollbar__wrap {
    height: auto;
    max-height: 200px;
  }

  >>> .el-dropdown-menu__item {
    white-space: nowrap;

    &.current {
      color: $color-primary;
    }
  }
</style>
