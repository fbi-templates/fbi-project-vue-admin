<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="currentList"
      :height="tableHeight"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" width="200"></el-table-column>
      <el-table-column label="角色" width="200">
        <template slot-scope="scope">
          <el-tag class="tag-role" v-for="role of scope.row.roles" :key="role">{{ role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status ? 'success' : 'info'"
          >{{ scope.row.status ? '已启用' : '已禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{ scope.row.createdAt | datetimeFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="onEditClick(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status!='deleted'"
            type="text"
            @click="onDelClick(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-if="formData" v-el-drag-dialog :visible.sync="dialogTableVisible" title="用户编辑">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="formData.roles">
            <el-checkbox v-for="role of allRoles" :key="role.id" :label="role.name" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">已启用</el-radio>
            <el-radio :label="0">已禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import elDragDialog from '@/common/el-drag-ialog'

  export default {
    filters: {
      statusFilter (status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },

    directives: { elDragDialog },

    data: () => ({
      list: null,
      currentList: null,
      listLoading: false,
      dialogTableVisible: false,
      total: 0,
      listQuery: {
        page: 0,
        limit: 50,
      },
      formData: null,
    }),

    computed: {
      tableHeight () {
        return window.innerHeight - 50 - 34 - 92
      },
      ...mapState({
        allRoles: state => state.user.roles,
      }),
    },

    created () {
      this.fetchUsers()
    },

    methods: {
      fetchUsers () {
        this.listLoading = true
        this.$ajax
          .get('/users')
          .then(res => {
            const ret = res.data
            if (ret.code === 0) {
              this.list = ret.data
              this.listLoading = false
              this.total = this.list.length
              this.pager()
            } else {
              throw new Error(res.message)
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error(err.message || '数据拉取失败')
          })
      },
      fetchRoles () {
        if (!this.allRoles || this.allRoles.length <= 0) {
          return this.$store.dispatch('user/roles')
        }
      },
      formReset () {
        this.formData = null
      },
      onEditClick (user) {
        if (this.$vrm.hasAccess(['super-admin'])) {
          this.formData = user
          this.dialogTableVisible = true
          this.fetchRoles()
        } else {
          this.$message.warning("You don't have permission")
        }
      },
      onDelClick (user) {
        if (this.$vrm.hasAccess(['super-admin'])) {
          // TODO
        } else {
          this.$message.warning("You don't have permission")
        }
      },
      onSubmit () {
        this.$ajax
          .put(`/users/${this.formData.id}`, this.formData)
          .then(response => {
            this.$message('保存成功!')
            this.formData = null
          })
      },
      onCancel () {
        this.dialogTableVisible = false
        this.formReset()
        this.$message('已取消!')
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        // this.fetchData()
        this.pager()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        // this.fetchData()
        this.pager()
      },
      pager () {
        this.total = this.list.length
        const start = this.listQuery.page * this.listQuery.limit
        const end = start + this.listQuery.limit
        this.currentList = this.list.slice(start, end)
      },
    },

  }
</script>

<style>
  .tag-role {
    margin-right: 5px;
  }
</style>
