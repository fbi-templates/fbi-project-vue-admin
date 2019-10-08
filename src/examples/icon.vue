<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="SVG Icons">
          <p class="warn-content">
            <el-link href="https://www.iconfont.cn/" target="_blank" type="primary">SVG图标下载</el-link>
          </p>
          <div
            :key="item"
            @click="handleClipboard(generateIconCode(item), $event)"
            v-for="item of svgIcons"
          >
            <el-tooltip placement="top">
              <div slot="content">{{ generateIconCode(item) }}</div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Element-UI Icons">
          <div
            :key="item"
            @click="handleClipboard(generateElementIconCode(item),$event)"
            v-for="item of elementIcons"
          >
            <el-tooltip placement="top">
              <div slot="content">{{ generateElementIconCode(item) }}</div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import clipboard from '@/utils/clipboard'

  export default {
    name: 'Icons',

    data: () => ({
      elementIcons: [
        'platform-eleme',
        'delete-solid',
        'eleme',
        'c-scale-to-original',
        'sort-up',
        'sort-down',
        'upload',
        'goods',
        'video-pause',
        'video-play',
        's-cooperation',
        's-order',
        's-platform',
        's-unfold',
        's-operation',
        's-promotion',
        's-home',
        's-release',
        's-ticket',
        's-management',
        's-open',
        's-shop',
        's-help',
        's-goods',
        's-marketing',
        's-flag',
        's-comment',
        's-finance',
        's-claim',
        's-tools',
        's-custom',
        's-opportunity',
        's-fold',
        's-data',
        's-check',
        's-grid',
        'user-solid',
        'question',
        'warning',
        'remove',
        'info',
        'circle-plus',
        'picture',
        'location',
        'error',
        'success',
        'camera-solid',
        'd-caret',
        'message-solid',
        'menu',
        'star-on',
        'video-camera-solid',
        'phone',
        'more',
        'share',
        'caret-left',
        'caret-right',
        'caret-bottom',
        'caret-top',
        'date',
        'circle-close',
        'edit',
        'folder',
        'folder-opened',
        'folder-add',
        'folder-remove',
        'folder-delete',
        'folder-checked',
        'tickets',
        'document-remove',
        'document-delete',
        'document-copy',
        'document-checked',
        'document',
        'document-add',
        'printer',
        'paperclip',
        'download',
        'upload2',
        'takeaway-box',
        'camera',
        'search',
        'zoom-in',
        'zoom-out',
        'monitor',
        'attract',
        'mobile',
        'video-camera',
        'scissors',
        'umbrella',
        'headset',
        'brush',
        'data-line',
        'mouse',
        'coordinate',
        'magic-stick',
        'reading',
        'data-board',
        'pie-chart',
        'data-analysis',
        'collection-tag',
        'edit-outline',
        'film',
        'suitcase',
        'suitcase-1',
        'picture-outline-round',
        'picture-outline',
        'receiving',
        'collection',
        'files',
        'notebook-1',
        'notebook-2',
        'toilet-paper',
        'office-building',
        'school',
        'table-lamp',
        'house',
        'no-smoking',
        'smoking',
        'shopping-cart-full',
        'shopping-cart-1',
        'shopping-cart-2',
        'shopping-bag-1',
        'shopping-bag-2',
        'present',
        'box',
        'bank-card',
        'money',
        'coin',
        'wallet',
        'discount',
        'price-tag',
        'bicycle',
        'truck',
        'ship',
        'news',
        'help',
        'guide',
        'male',
        'female',
        'thumb',
        'cpu',
        'link',
        'connection',
        'open',
        'turn-off',
        'set-up',
        'chat-round',
        'chat-line-round',
        'chat-square',
        'chat-dot-round',
        'chat-dot-square',
        'chat-line-square',
        'message',
        'postcard',
        'position',
        'turn-off-microphone',
        'microphone',
        'close-notification',
        'bell',
        'bangzhu',
        'circle-plus-outline',
        'remove-outline',
        'circle-check',
        'time',
        'odometer',
        'crop',
        'aim',
        'switch-button',
        'full-screen',
        'copy-document',
        'star-off',
        'basketball',
        'football',
        'soccer',
        'baseball',
        'mic',
        'stopwatch',
        'medal-1',
        'medal',
        'trophy',
        'trophy-1',
        'first-aid-kit',
        'discover',
        'place',
        'location-outline',
        'location-information',
        'add-location',
        'delete-location',
        'map-location',
        'alarm-clock',
        'timer',
        'watch-1',
        'watch',
        'wind-power',
        'light-rain',
        'lightning',
        'heavy-rain',
        'sunrise',
        'sunrise-1',
        'sunset',
        'sunny',
        'cloudy',
        'partly-cloudy',
        'cloudy-and-sunny',
        'moon',
        'moon-night',
        'bottom-left',
        'bottom-right',
        'bottom',
        'back',
        'right',
        'top-left',
        'top-right',
        'top',
        'lock',
        'unlock',
        'user',
        'key',
        'arrow-up',
        'arrow-right',
        'arrow-down',
        'arrow-left',
        'd-arrow-left',
        'd-arrow-right',
        'close',
        'check',
        'plus',
        'minus',
        'delete',
        'sold-out',
        'sell',
        'service',
        'mobile-phone',
        'sort',
        'rank',
        'refresh',
        'loading',
        'view',
        'finished',
        'more-outline',
        'phone-outline',
        'setting',
        'warning-outline',
        'refresh-right',
        'refresh-left',
        'dish',
        'dish-1',
        'food',
        'chicken',
        'fork-spoon',
        'knife-fork',
        'burger',
        'tableware',
        'sugar',
        'dessert',
        'ice-cream',
        'hot-water',
        'water-cup',
        'coffee-cup',
        'cold-drink',
        'goblet',
        'goblet-full',
        'goblet-square',
        'goblet-square-full',
        'refrigerator',
        'grape',
        'watermelon',
        'cherry',
        'apple',
        'pear',
        'orange',
        'coffee',
        'ice-tea',
        'ice-drink',
        'milk-tea',
        'potato-strips',
        'lollipop',
        'ice-cream-square',
        'ice-cream-round'
      ]
    }),

    computed: {
      svgIcons() {
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
      generateElementIconCode(symbol) {
        return `<i class="el-icon-${symbol}" />`
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

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 12px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
