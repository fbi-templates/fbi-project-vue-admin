<template>
  <div class="app-container">
    <el-table
      :data="allRoles"
      element-loading-text="Loading"
      fit
      highlight-current-row
      v-loading="listLoading"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="角色名" prop="username" width="300"></el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" v-roles:class.is-disabled="['admin']">编辑</el-button>
          <el-button type="text" v-roles:action.remove="['super-admin']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      listLoading: false
    }),

    computed: {
      ...mapState({
        allRoles: state => state.user.roles
      })
    },

    methods: {
      fetchRoles() {
        if (!this.allRoles || this.allRoles.length <= 0) {
          this.listLoading = true
          return this.$store
            .dispatch('user/roles')
            .then(() => {
              this.listLoading = false
            })
            .catch(err => {
              this.listLoading = false
              this.$message.error(err.message || '角色数据拉取失败')
            })
        }
      }
    },

    created() {
      this.fetchRoles()
    }
  }
</script>
