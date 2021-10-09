<template>
  <div class="app-container">
    <avue-crud v-model="form" :table-loading="listLoading" :data="list" :option="option">
      <template #display_time="{row}">
        <i class="el-icon-time" />
        <span>{{ $day(row.display_time).format(' YYYY-MM-DD HH:mm:ss') }}</span>
      </template>

      <template #status="{row}">
        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      form: {},
      option: {
        indexLabel: 'ID',
        index: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: 'Title',
            prop: 'title'
          },
          {
            label: 'Author',
            prop: 'author'
          },
          {
            label: 'Pageviews',
            prop: 'pageviews'
          },
          {
            label: 'Status',
            prop: 'status'
          },
          {
            label: 'Display_time',
            prop: 'display_time'
          }
        ]
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
