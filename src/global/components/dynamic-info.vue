// 动态展示信息

/*
  使用方法:
  <dynamic-info :schema="infoSchema" label-width="60px" theme="card" v-model="profile"></dynamic-info>
*/

/*
  自定义组件使用方式:
  props: value 为当前项的值；scope为整个info的值
  {
    label: '图片',
    prop: 'Picture',
    component: {
      props: ['value', 'scope'],
      template: `<el-image :src="value" fit="cover" style="width:100px;height:100px;"><div class="image-slot" slot="error"><i class="el-icon-picture-outline"></i></div></el-image>`,
    }
  }
*/

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
  <section :class="theme" class="dynamic-info">
    <header class="block-title header" v-if="title || $slots.header">
      <span v-if="title">{{ title }}</span>
      <slot name="header" v-if="$slots.header"></slot>
    </header>

    <div class="both-center empty-wrap" v-if="!isValid">暂无数据</div>

    <template v-else v-for="(schemaItem, index) in schema">
      <div
        :class="{ inline: inline }"
        :key="index"
        :style="{ paddingLeft: innerLabelWidth }"
        class="info-item"
        v-if="Object.keys(value).includes(schemaItem.prop)"
      >
        <label
          :style="{
          width: labelWidth,
          textAlign: labelAlign,
          marginLeft: labelMarginLeft
        }"
          class="label"
        >{{ schemaItem.label }}</label>
        <div class="content">
          <template v-if="schemaItem.component">
            <component
              :is="schemaItem.component"
              :scope="value"
              :value="value[schemaItem.prop]"
              v-bind="schemaItem"
              v-on="$listeners"
            ></component>
          </template>
          <template
            v-else-if="schemaItem.formatter"
          >{{ schemaItem.formatter(value[schemaItem.prop]) }}</template>
          <template v-else>{{ value[schemaItem.prop] }}</template>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
  export default {
    name: 'DynamicInfo',

    inheritAttrs: false,

    props: {
      value: {
        type: Object,
        default: _ => ({})
      },
      schema: {
        type: Array | Object,
        default: _ => []
      },
      title: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: String,
        default: '60px'
      },
      labelAlign: {
        type: String,
        default: 'left'
      },
      labelMargin: {
        type: String,
        default: '10px'
      },
      inline: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: ''
      }
    },

    computed: {
      innerLabelWidth() {
        return `calc(${this.labelWidth} + ${this.labelMargin})`
      },
      labelMarginLeft() {
        return `calc(-${this.labelWidth} - ${this.labelMargin})`
      },
      isValid() {
        return (
          this.schema &&
          Array.isArray(this.schema) &&
          this.value &&
          Object.keys(this.value).length > 0
        )
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/vars';

  $item-min-height: 18px;

  .dynamic-info {
    position: relative;
    min-height: 100px;

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

    /* 更多的皮肤写在这里 */
  }

  .header {
    margin-bottom: 20px;
  }

  .info-item {
    min-height: $item-min-height;
    font-size: $font-size-medium;

    &.inline {
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;

      .content {
        min-width: 100px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    .label {
      float: left;
      color: $color-text-secondary;
    }
  }
</style>
