<template>
  <section class="wrapper">
    <h1>动态列表</h1>
    <h2>表格</h2>
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
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </dynamic-list>

    <h2>表格 (无数据)</h2>
    <dynamic-list
      :auto-fetch="false"
      :loading="listLoading2"
      :pager="listPager2"
      :schema="listSchema"
      @fetch-list="fetchList"
      v-model="listData2"
    ></dynamic-list>

    <h2>其他列表</h2>
    <dynamic-list
      :gutter="50"
      :loading="listLoading3"
      :pager="listPager3"
      @fetch-list="fetchList3"
      type="row"
      v-model="listData3"
    >
      <template v-slot="{ item, index }">
        <el-col :span="4">
          <el-card :body-style="{ padding: '0px', fontSize: '12px' }">
            <img class="image" src="https://via.placeholder.com/150" style="width: 100%" />
            <div style="padding: 14px;">
              <strong>{{ item.name }}</strong>
              <p>{{item.province}}-{{item.city}}-{{item.address}}</p>
            </div>
          </el-card>
        </el-col>
      </template>
    </dynamic-list>
  </section>
</template>

<script>
  import CustomPagerSlot from '@/components/custom-pager-slot'
  const testData = [
    {
      date: '2016-05-01',
      name: '王小虎1',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200331
    },
    {
      date: '2016-05-02',
      name: '王小虎2',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200332
    },
    {
      date: '2016-05-03',
      name: '王小虎3',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-04',
      name: '王小虎4',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200334
    },
    {
      date: '2016-05-05',
      name: '王小虎5',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200335
    },
    {
      date: '2016-05-06',
      name: '王小虎6',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200336
    },
    {
      date: '2016-05-07',
      name: '王小虎7',
      province: '上海',
      city: '普陀区',
      address: '金沙江路 1518 弄',
      zip: 200337
    }
  ]

  export default {
    components: { CustomPagerSlot },

    data: () => ({
      // 1
      listData: [],
      listSchema: [
        { type: 'selection', width: 55 },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'date',
          label: '日期',
          formatter: row => `${row.date}`
        },
        {
          label: '地址',
          component: {
            props: ['col', 'scope'],
            template: `
                  <div>
                    <p>{{ scope.row.province }}-{{ scope.row.city }}-{{ scope.row.address }}</p>
                    <p><el-link type="primary">{{ scope.row.zip }}</el-link></p>
                  </div>
                  `
          },
          tooltip: {
            content: '提示信息',
            effect: 'dark',
            placement: 'top',
            class: '',
            icon: 'el-icon-info'
          }
        }
      ],
      listPager: {
        total: 0,
        currentPage: 1,
        pageSize: 2,
        pageSizes: [2, 10, 20],
        // 采用自定义分页
        type: 'custom',
        hideOnSinglePage: false
      },
      listLoading: false,

      // 2
      listData2: [],
      listPager2: {
        total: 0,
        currentPage: 1,
        pageSize: 2,
        pageSizes: [2, 10, 20]
      },
      listLoading2: false,

      // 3
      listData3: [],
      listPager3: {
        total: 0,
        currentPage: 1,
        pageSize: 2,
        pageSizes: [2, 10, 20],
        urlKeys: {
          index: 'index3',
          size: 'size3'
        }
      },
      listLoading3: false
    }),

    methods: {
      fetchList(pagerOptions) {
        this.listLoading = true

        const pager = pagerOptions || this.listPager
        setTimeout(() => {
          pager.total = testData.length
          const start = (pager.currentPage - 1) * pager.pageSize
          const end = start + pager.pageSize
          this.listData = testData.slice(start, end)
          console.log(pager)

          this.listLoading = false
        }, 500)
      },
      fetchList3(pagerOptions) {
        this.listLoading3 = true

        setTimeout(() => {
          const pager = pagerOptions || this.listPager3
          pager.total = testData.length
          const start = (pager.currentPage - 1) * pager.pageSize
          const end = start + pager.pageSize
          this.listData3 = testData.slice(start, end)

          this.listLoading3 = false
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    padding: 20px;
  }

  .dynamic-list {
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 50px;
  }
</style>
