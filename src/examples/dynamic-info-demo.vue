<template>
  <section class="wrapper">
    <h1>动态信息</h1>

    <h2>基础使用</h2>
    <dynamic-info :schema="infoSchema" label-width="60px" v-model="infoData"></dynamic-info>

    <h2>inline</h2>
    <dynamic-info :schema="infoSchema" inline label-width="60px" v-model="infoData"></dynamic-info>

    <h2>theme card</h2>
    <dynamic-info :schema="infoSchema" label-width="80px" theme="card" v-model="infoData"></dynamic-info>

    <h2>theme card width header</h2>
    <dynamic-info :schema="infoSchema" label-width="80px" theme="card" v-model="infoData">
      <template v-slot:header>这里是标题</template>
    </dynamic-info>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        // 1 基本使用
        infoSchema: [
          {
            label: '活动名称',
            prop: 'name'
          },
          {
            label: '活动区域',
            prop: 'region',
            long: true
          },
          {
            label: '活动时间',
            prop: 'date',
            formatter: item => `---${item}---`
          },
          {
            label: '即时配送',
            prop: 'delivery',
            formatter: item => (item ? '是' : '否')
          },
          {
            prop: 'desc',
            label: '活动形式'
          },
          {
            label: '图片',
            prop: 'Picture',
            component: {
              props: ['value', 'scope'],
              template: `<el-image src="https://via.placeholder.com/150"></el-image>`
            }
          }
        ],
        infoData: {
          name: '名称',
          region: '区域',
          date: '2019-07-05',
          delivery: false,
          desc: 'blablablabla'
        }
      }
    },

    methods: {}
  }
</script>

<style scoped>
  @import url('../assets/css/vars.css');

  .wrapper {
    padding: 20px;
  }

  .dynamic-info {
    max-width: 600px;
  }

  h2 {
    margin-top: 80px;
  }
</style>
