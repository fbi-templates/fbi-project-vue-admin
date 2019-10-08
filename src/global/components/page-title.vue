// 页面标题与返回组件 v1.0.0
// 定义的属性: title为String, 默认是提示字符, 必须自定义使用
// 定义的属性: show-back为Boolean, 默认false, 即默认无箭头无返回功能
// 定义的监听: back, 以@back的形式调用, 默认为this.$router.go(-1)
// 简易使用样例: <page-title :show-back="true" title="返回首页" @back="$router.push('/')"></page-title>
// 完整使用样例请参考: src/examples/ui.vue  L1766

<template>
  <section class="page-title">
    <div class="fr slot-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <span @click="clickGoBack" class="lnk-back" v-if="showBack">
      <svg-icon class="icon-back" icon-class="back"></svg-icon>
    </span>
    <h2 class="title">{{ title }}</h2>
    <div class="slot-default" v-if="$slots.default">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PageTitle',
    props: {
      title: {
        type: String,
        default: 'Please use "page-title" attribute to define this content.'
      },
      showBack: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickGoBack() {
        // 可修改返回按钮的功能
        if (this.$listeners.back) {
          this.$emit('back')
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/css/vars.css');
  section.page-title {
    min-height: 35px;
    padding: 0 0 20px 0;

    .lnk-back {
      cursor: pointer;
      .icon-back {
        height: 22px;
        width: 32px;
        padding-top: 2px;
      }
    }

    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 550; /* 需要注意字体在windows系统下显示过粗的问题 */
      color: $color-text-primary;
    }

    .lnk-back,
    .title,
    .slot-default {
      display: inline-block;
      vertical-align: middle;
    }

    .lnk-back,
    .title {
      margin-right: 10px;
    }
  }
</style>
