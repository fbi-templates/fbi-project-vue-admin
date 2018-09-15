<template>
  <div>
    <el-card class="box-card" style="margin-top:40px;">
      <div slot="header" class="clearfix">
        <svg-icon icon-class="international"></svg-icon>
        <span style="margin-left:10px;">{{ $t('settings.language') }}</span>
      </div>
      <div>
        <el-radio-group v-model="lang">
          <el-radio label="zh" border>简体中文</el-radio>
          <el-radio label="en" border>English</el-radio>
        </el-radio-group>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top:40px;">
      <div slot="header" class="clearfix">
        <svg-icon icon-class="theme"></svg-icon>
        <span style="margin-left:10px;">{{ $t('settings.size') }}</span>
      </div>
      <div>
        <el-radio-group v-model="size" @change="onSizeChange">
          <el-radio label="medium" border>{{ $t('settings.sizeM') }}</el-radio>
          <el-radio label="small" border>{{ $t('settings.sizeS') }}</el-radio>
          <el-radio label="mini" border>{{ $t('settings.sizem') }}</el-radio>
        </el-radio-group>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Settings',

    data() {
      return {
        locals: {
          en: {
            settings: {
              language: 'Switch Language',
              size: 'UI Size',
              sizeM: 'medium',
              sizeS: 'small',
              sizem: 'mini',
            },
          },
          zh: {
            settings: {
              language: '切换语言',
              size: 'UI尺寸',
              sizeM: '大',
              sizeS: '中',
              sizem: '小',
            },
          },
        },
      }
    },

    computed: {
      lang: {
        get() {
          return this.$store.state.app.language
        },
        set(lang) {
          this.$i18n.locale = lang
          this.$store.dispatch('app/setLanguage', lang)
        },
      },
      size: {
        get() {
          return this.$store.state.app.size
        },
        set(size) {
          this.$store.dispatch('app/setSize', size)
        },
      },
    },

    methods: {
      onSizeChange() {
        location.reload()
      }
    },

    created() {
      if (!this.$i18n.getLocaleMessage('en')['settings']) {
        this.$i18n.mergeLocaleMessage('en', this.locals.en)
        this.$i18n.mergeLocaleMessage('zh', this.locals.zh)
      }
    },
  }
</script>

<style scoped>
  .box-card {
    width: 600px;
    max-width: 100%;
    margin: 20px auto;
  }
  .item-btn {
    margin-bottom: 15px;
    margin-left: 0px;
  }
  .block {
    padding: 25px;
  }
</style>
