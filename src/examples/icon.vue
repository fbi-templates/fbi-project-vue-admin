<template>
  <div class="icons-container">
    <p class="warn-content">
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
      >Add and use</a>
    </p>
    <div class="icons-wrapper">
      <div
        :key="item"
        @click="handleClipboard(generateIconCode(item), $event)"
        v-for="item of icons"
      >
        <el-tooltip placement="top">
          <div slot="content">{{ generateIconCode(item) }}</div>
          <div class="icon-item">
            <svg-icon :icon-class="item" class-name="disabled"></svg-icon>
            <span>{{ item }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import clipboard from '@/utils/clipboard'

  export default {
    name: 'Icons',

    computed: {
      icons() {
        const req = require.context('@/assets/svg', false, /\.svg$/)
        const requireAll = requireContext => requireContext.keys()

        const re = /\.\/(.*)\.svg/

        return requireAll(req).map(i => {
          return i.match(re)[1]
        })
      }
    },

    methods: {
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}"></svg-icon>`
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      }
    }
  }
</script>

<style scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .icons-wrapper {
      margin: 0 auto;
    }

    .icon-item {
      margin: 20px;
      width: 90px;
      height: 90px;
      text-align: center;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;

      span {
        display: block;
        font-size: 18px;
        margin-top: 10px;
      }
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
