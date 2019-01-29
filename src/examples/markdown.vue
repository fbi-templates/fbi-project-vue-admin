<template>
  <div class="components-container">
    <div class="editor-container">
      <!-- https://github.com/sparksuite/simplemde-markdown-editor -->
      <markdown
        id="contentEditor"
        ref="contentEditor"
        v-model="content"
        :height="300"
        :z-index="20"
      ></markdown>
    </div>
    <el-button
      style="margin-top:80px;"
      type="primary"
      icon="el-icon-document"
      @click="markdown2Html"
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
      Markdown,
    },

    data () {
      return {
        content: content,
        html: '',
      }
    },

    methods: {
      markdown2Html () {
        import('showdown').then(showdown => {
          const converter = new showdown.Converter()
          this.html = converter.makeHtml(this.content)
        })
      },
    },
  }
</script>

