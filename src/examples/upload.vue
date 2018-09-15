// 组件级别本地化配置（仅在当前组件有效）
// http://kazupon.github.io/vue-i18n/guide/sfc.html#single-file-components
<i18n>
{
  "en": {
    "uploadText": "Upload and Crop Image",
    "tips": "Compatible with IE10+ {br} Reference: {link}"
  },
  "zh": {
    "uploadText": "上传并剪裁图片",
    "tips": "兼容IE10+ {br} 参考: {link}"
  }
}
</i18n>

<template>
  <section class="components-container">
    <el-button type="primary" @click="toggleShow">
      {{ $t('uploadText') }}
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>

    <!--
      Docs:
    https://github.com/dai-siki/vue-image-crop-upload/blob/master/README.md#props
    -->
    <image-crop-upload field="img" v-model="show" :width="300" :height="300" url="/upload" :params="params" :headers="headers" img-format="png" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail"></image-crop-upload>

    <img :src="imgDataUrl">

    <div class="tips">
      <!--
        Docs:
      http://kazupon.github.io/vue-i18n/guide/interpolation.html#advanced-usage
      -->
      <i18n path="tips" tag="p">
        <span place="br"><br></span>
        <a place="link" href="https://github.com/dai-siki/vue-image-crop-upload/blob/master/README.md#usage" target="blank">https://github.com/dai-siki/vue-image-crop-upload/blob/master/README.md#usage</a>
      </i18n>
    </div>
  </section>
</template>

<script>
  import ImageCropUpload from 'vue-image-crop-upload'

  export default {
    name: 'ImageUpload',

    components: {
      ImageCropUpload,
    },

    data() {
      return {
        show: false,
        params: {
          token: '123456798',
          name: 'avatar',
        },
        headers: {
          smail: '*_~',
        },
        imgDataUrl: '', // the datebase64 url of created image
      }
    },

    methods: {
      toggleShow() {
        this.show = !this.show
      },

      cropSuccess(imgDataUrl, field) {
        console.log(`[image-crop-upload] crop success! imgDataUrl: ${imgDataUrl}`)
        this.imgDataUrl = imgDataUrl
      },

      cropUploadSuccess(jsonData, field) {
        console.log(`[image-crop-upload] upload success! jsonData: ${jsonData}`)
        console.log(jsonData)
        console.log('field: ' + field)
      },

      cropUploadFail(status, field) {
        console.log(
          `[image-crop-upload] upload fail! status: ${status}; field: ${field}`
        )
      },
    },
  }
</script>


<style scoped>
  .tips {
    margin: 10px;
    color: #999;
    font-size: 12px;
    line-height: 1.6;
  }
</style>
