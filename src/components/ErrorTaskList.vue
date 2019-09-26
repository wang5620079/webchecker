<template>
  <div>
    <a-table :columns="columns" :dataSource="data" :rowKey="(record=>record.id)">
      <!--    <span slot="tags" slot-scope="tags">-->
      <!--      <a-tag v-for="tag in tags" color="red" :key="tag">{{tag}}</a-tag>-->
      <!--    </span>-->
    </a-table>
  </div>
</template>

<script>

const columns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '时间',
  dataIndex: 'timestamp',
  key: 'timestamp'
}, {
  title: '任务名称',
  dataIndex: 'jobid',
  key: 'jobid'
}, {
  title: '事件',
  dataIndex: 'event',
  key: 'event'
}]

export default {
  name: 'TestTab',
  data () {
    return {
      data: [],
      columns
    }
  },
  mounted () {
    this.loaddata()
  },
  methods: {
    loaddata () {
      var me = this
      this.$axios.post('/api/v1/getJobEvents').then((response) => {
        const pagination = { ...this.pagination }
        pagination.total = response.data.total
        me.loading = false
        me.data = response.data.data
        me.pagination = pagination
      }, (error) => {
        if (error.response && error.response.status === 403) {
          this.info('api请求方式错误')
        }
        if (error.response && error.response.status === 404) {
          this.info('api未找到')
        }
        if (error.response && error.response.status === 500) {
          this.info('服务器内部错误')
        }
      })
    },
    info (msg) {
      this.$message.info(msg)
    }
  }
}
</script>

<style scoped>

</style>
