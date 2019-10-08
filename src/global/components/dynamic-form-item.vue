<template>
  <div :class="item.class || ''" class="form-item" v-if="show">
    <!-- 标题 -->
    <h3 class="title" v-if="item.type === 'title'">{{ item.content }}</h3>

    <!-- 子标题 -->
    <h4 class="sub-title" v-else-if="item.type === 'sub-title'">{{ item.content }}</h4>

    <!-- 分割线 -->
    <el-divider v-bind="item" v-else-if="item.type === 'divider'">{{ item.content || '' }}</el-divider>

    <!-- 表单项 -->
    <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules" v-else>
      <!-- element组件 -->
      <template v-if="item.el">
        <component
          :is="'el-' + item.el"
          :value="value"
          @input="itemUpdate(item.prop, $event)"
          v-bind="item"
        >
          <template v-if="['select', 'checkbox-group', 'radio-group'].includes(item.el)">
            <template v-if="item.optionEl === 'radio'">
              <!-- radio单独处理 -->
              <el-radio
                :key="optionIndex"
                v-bind="option"
                v-for="(option, optionIndex) in item.options"
              >{{option.value}}</el-radio>
            </template>
            <template v-else-if="item.optionEl === 'radio-button'">
              <!-- radio-button单独处理 -->
              <el-radio-button
                :key="optionIndex"
                v-bind="option"
                v-for="(option, optionIndex) in item.options"
              >{{option.value}}</el-radio-button>
            </template>
            <template v-else>
              <component
                :is="'el-' + item.optionEl"
                :key="optionIndex"
                v-bind="option"
                v-for="(option, optionIndex) of item.options"
              ></component>
            </template>
          </template>
        </component>
      </template>

      <!-- 自定义组件 -->
      <component
        :is="item.component"
        :value="value"
        @input="itemUpdate(item.prop, $event)"
        v-bind="item"
        v-if="item.component"
        v-on="$listeners"
      ></component>

      <!-- 提示 -->
      <p class="form-item-tip" v-if="item.tips">{{ item.tips }}</p>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    props: ['value', 'item'],

    computed: {
      show() {
        return this.item.vIf === undefined || this.item.vIf()
      }
    },

    methods: {
      itemUpdate(itemName, itemValue) {
        this.$emit('item-update', itemName, itemValue)
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/vars';

  .form-item-tip {
    margin: 10px 0 0;
    padding: 0;
    color: $color-text-placeholder;
    line-height: 1.4;
    font-size: 12px;
  }

  .form-item {
    margin-bottom: 20px;

    &.inline {
      display: inline-block !important;
    }

    &.block {
      display: block !important;

      >>> .el-date-editor--datetimerange.el-input,
      >>> .el-date-editor--datetimerange.el-input__inner {
        width: 100%;
      }
    }
  }
</style>
