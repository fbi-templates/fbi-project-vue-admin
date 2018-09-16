<template>
  <div class="components-container">

    <h2>Draggable Panel</h2>
    <div class="draggable-panel-wrap">
      <draggable-panel :key="1" :list="panelData.one" :options="options" class="draggable-panel todo" header-text="Todo" />
      <draggable-panel :key="2" :list="panelData.two" :options="options" class="draggable-panel working" header-text="Working" />
      <draggable-panel :key="3" :list="panelData.three" :options="options" class="draggable-panel done" header-text="Done" />
    </div>

    <div class="draggable-list-wrap">
      <h2>Draggable List</h2>
      <draggable-list :list1="listData.left" :list2="listData.right" list1-title="Left" list2-title="Right" />
    </div>
  </div>
</template>

<script>
  import DraggableList from '@/examples/components/DraggableList'
  import DraggablePanel from '@/examples/components/DraggablePanel'

  export default {
    name: 'DraggableDemo',

    components: {
      DraggableList,
      DraggablePanel,
    },

    data() {
      return {
        options: {
          group: 'mission',
        },
        panelData: {
          one: [
            { name: 'Mission', id: 1 },
            { name: 'Mission', id: 2 },
            { name: 'Mission', id: 3 },
            { name: 'Mission', id: 4 },
          ],
          two: [
            { name: 'Mission', id: 5 },
            { name: 'Mission', id: 6 },
            { name: 'Mission', id: 7 },
          ],
          three: [
            { name: 'Mission', id: 8 },
            { name: 'Mission', id: 9 },
            { name: 'Mission', id: 10 },
          ],
        },
        listData: {
          left: [],
          right: [],
        },
      }
    },

    methods: {
      fetchData() {
        this.$ajax
          .get('/articles')
          .then(res => {
            const ret = res.data
            if (ret.code === 0) {
              this.listData.left = ret.data.splice(0, 5)
              this.listData.right = ret.data.splice(5, 18)
            } else {
              throw new Error(res.message)
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error(err.message || '数据拉取失败')
          })
      },
    },

    created() {
      this.fetchData()
    },
  }
</script>


<style>
  .draggable-panel-wrap {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  .draggable-panel {
    &.todo {
      .board-column-header {
        background: #4a9ff9;
      }
    }
    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }
    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }

  .draggable-list-wrap {
    margin-top: 50px;
    border-top: 2px solid #eee;
  }
</style>
