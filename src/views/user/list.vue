<template>
  <div class="app-container">
    <dynamic-list
      :loading="listLoading"
      :pager="listPager"
      :schema="listSchema"
      @fetch-list="fetchList"
      v-model="listData"
    >
      <el-table-column width="200">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button @click="onEditClick(row)" type="primary">编辑</el-button>
          <el-button @click="onDelClick(row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </dynamic-list>

    <el-dialog :visible.sync="dialogTableVisible" title="用户编辑" v-el-drag-dialog v-if="formData">
      <dynamic-form
        :loading="formLoading"
        :schema="formSchema"
        @reset="formReset"
        @submit="formSubmit"
        label-width="80px"
        max-width="600px"
        v-model="formData"
      ></dynamic-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import elDragDialog from '@/components/el-drag-dialog'

  let testData = []

  export default {
    directives: { elDragDialog },

    data: () => ({
      // list: null,
      // currentList: null,
      // listLoading: false,
      dialogTableVisible: false,
      // total: 0,
      // listQuery: {
      //   page: 0,
      //   limit: 50
      // },
      // formData: null,

      // list
      listData: [],
      listSchema: [
        {
          prop: 'username',
          label: '用户名'
        },
        {
          label: '角色',
          component: {
            props: ['scope'],
            template: `<div><el-tag :key="role" class="tag-role" v-for="role of scope.row.roles">{{ role }}</el-tag></div>`
          }
        },
        {
          prop: 'email',
          label: '邮箱'
        },

        {
          prop: 'date',
          label: '状态',
          formatter: row => (row.status === 'false' ? '已启用' : '已禁用')
        }
      ],
      listPager: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50],
        url: false,
        // 采用自定义分页
        type: 'custom',
        hideOnSinglePage: false
      },
      listLoading: false,

      // form
      formData: {
        username: '',
        roles: [],
        status: true
      },
      // formSchema: ,
      formLoading: false
    }),

    computed: {
      ...mapState({
        allRoles: state => state.user.roles
      }),
      formSchema() {
        return [
          {
            el: 'input',
            label: '用户名',
            prop: 'username'
          },
          {
            el: 'checkbox-group',
            label: '角色',
            prop: 'roles',
            optionEl: 'checkbox',
            options: this.allRoles.map(item => ({
              label: item.name,
              value: item.name
            }))
          },
          {
            el: 'radio-group',
            label: '状态',
            prop: 'status',
            optionEl: 'radio', // 'radio-button'
            options: [
              {
                label: 'true',
                value: '已启用'
              },
              {
                label: 'false',
                value: '已禁用'
              }
            ]
          }
        ]
      }
    },

    mounted() {
      this.fetchRoles()
    },

    methods: {
      fetchList(pagerOptions) {
        this.listLoading = true

        this.fetchUsers().then(() => {
          const pager = pagerOptions || this.listPager
          pager.total = testData.length
          const start = (pager.currentPage - 1) * pager.pageSize
          const end = start + pager.pageSize
          this.listData = testData.slice(start, end)
          this.listLoading = false
        })
      },

      fetchUsers() {
        if (testData && testData.length > 0) {
          return Promise.resolve()
        }

        return this.$ajax
          .get('/users')
          .then(res => {
            const ret = res.data
            if (ret.code === 0) {
              testData = ret.data
            } else {
              throw new Error(res.message)
            }
          })
          .catch(err => {
            this.$message.error(err.message || '数据拉取失败')
          })
      },

      fetchRoles() {
        if (!this.allRoles || this.allRoles.length <= 0) {
          return this.$store.dispatch('user/roles')
        }
      },

      formSubmit(valid, data) {
        console.log('formSubmit', valid, data)
        if (valid) {
          this.formLoading = true
          setTimeout(() => {
            alert(JSON.stringify(data, null, 2))
            this.formLoading = false
          }, 1500)
        } else {
          alert('form data is not valid')
        }
      },

      formReset() {
        this.formData = null
      },

      onEditClick(user) {
        console.log({ user })
        if (this.$vrm.hasAccess(['admin'])) {
          this.formData = user
          this.dialogTableVisible = true
        } else {
          this.$message.warning("You don't have permission")
        }
      },

      onDelClick(user) {
        if (this.$vrm.hasAccess(['admin'])) {
          // TODO
          alert('user deleted')
        } else {
          this.$message.warning("You don't have permission")
        }
      }
    }
  }
</script>

<style>
  .tag-role {
    margin-right: 5px;
  }
</style>
