<template>
  <el-scrollbar
    :vertical="false"
    @wheel.native.prevent="handleScroll"
    class="scroll-container"
    ref="scrollContainer"
  >
    <slot/>
  </el-scrollbar>
</template>

<script>
  const padding = 15 // tag's padding

  export default {
    name: 'ScrollPanel',
    data() {
      return {
        left: 0
      }
    },
    methods: {
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      },
      moveToTarget($target) {
        const $container = this.$refs.scrollContainer.$el
        const $containerWidth = $container.offsetWidth
        const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
        const $targetLeft = $target.offsetLeft
        const $targetWidth = $target.offsetWidth
        if ($targetLeft > $containerWidth) {
          // tag in the right
          $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + padding
        } else {
          // tag in the left
          $scrollWrapper.scrollLeft = $targetLeft - padding
        }
      }
    }
  }
</script>

<style scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;

    /deep/ {
      .el-scrollbar__bar {
        bottom: 0;
      }
      .el-scrollbar__wrap {
        height: 49px;
      }
    }
  }
</style>
