<template>
  <div class="components-container">
    <div class="editor-container">
      <!-- https://github.com/sparksuite/simplemde-markdown-editor -->
      <markdown
        :height="300"
        :z-index="20"
        id="contentEditor"
        ref="contentEditor"
        v-model="content"
      ></markdown>
    </div>
    <el-button
      @click="markdown2Html"
      icon="el-icon-document"
      style="margin-top:80px;"
      type="primary"
    >To HTML</el-button>
    <div v-html="html"></div>
  </div>
</template>

<script>
  import Markdown from '@/examples/components/markdown'

  const content = `
      **this is test**

      * vue
      * element
      * webpack

      ## Simplemde
      `

  export default {
    name: 'MarkdownEditor',

    components: {
      Markdown
    },

    data() {
      return {
        content: content,
        html: ''
      }
    },

    methods: {
      markdown2Html() {
        import('showdown').then(showdown => {
          const converter = new showdown.Converter()
          this.html = converter.makeHtml(this.content)
        })
      }
    }
  }
</script>

