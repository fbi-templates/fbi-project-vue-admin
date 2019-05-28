<template>
  <div class="components-container">
    <quill-editor
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      ref="myQuillEditor"
      v-model="content"
    ></quill-editor>

    <el-button @click="getEditorContent" class="btn-get-content" type="primary">获取内容</el-button>

    <div class="result">
      <h3>预览</h3>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'

  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'Editor',

    components: { quillEditor },

    data() {
      return {
        // https://quilljs.com/docs/configuration/#options
        editorOption: {
          // debug: 'info',
          // modules: {
          //   toolbar: '#toolbar'
          // },
          placeholder: '请输入内容...'
          // readOnly: true,
          // theme: 'snow'
        },
        content: ''
      }
    },

    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },

    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      // onEditorChange ({ quill, html, text }) {
      //   console.log('editor change!', quill, html, text)
      //   this.content = html
      // }
      getEditorContent() {
        alert(this.content)
      }
    },

    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style scoped>
  .btn-get-content {
    margin: 10px 0;
  }
  .result {
    margin-top: 50px;

    h3 {
      color: #999;
    }
  }
</style>

