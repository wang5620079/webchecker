<template>
  <div>
    <div><span><a-button type="primary"  @click="refresh" :loading="loading" >刷新</a-button></span></div>
  <div>
    <a-table :columns="columns" :dataSource="data" :rowKey="(record=>record.id)">
      <!--    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>-->
      <span slot="status" slot-scope="status">
          <a-tag v-for="item in status.ok" color="blue" :key="item">{{item}}</a-tag>
          <a-tag v-for="item in status.error" color="red" :key="item">{{item}}</a-tag>
        </span>
      <span slot="urlinfos" slot-scope="urlinfos">
          <span v-for="info in urlinfos.ok" :key="info"><a-tag color="blue">{{info}}</a-tag></span>
          <span v-for="info in urlinfos.error" :key="info"><a-tag color="red">{{info}}</a-tag></span>
        <!--          <a-tag v-for="info in urlinfos" color="blue" :key="info">{{info}}</a-tag>-->
        </span>
      <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="openlink(record)">打开{{record.name}}</a>
    </span>
    </a-table>
  </div>
  </div>
</template>

<script>
const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  width: '10%'
}, {
  title: '地址',
  dataIndex: 'url',
  key: 'url',
  width: '10%'
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
  width: '20%',
  scopedSlots: { customRender: 'status' }
}, {
  title: '检查信息',
  key: 'urlinfos',
  dataIndex: 'urlinfos',
  width: '40%',
  scopedSlots: { customRender: 'urlinfos' }
}, {
  title: 'Action',
  key: 'action',
  width: '20%',
  scopedSlots: { customRender: 'action' }
}]
export default {
  name: 'getAutoDataRecords',
  data () {
    return {
      data: [],
      columns,
      pagination: {},
      loading: false
    }
  },
  mounted () {
    this.loaddata()
  },
  methods: {
    openlink (record) {
      window.open(record.url, '_blank')
    },
    refresh () {
      this.loading = true
      this.loaddata()
      this.loading = false
    },
    loaddata () {
      let me = this
      this.$axios.post('/api/v1/getAutoDataRecords', {params: {limit: 100}}).then((response) => {
        const pagination = { ...this.pagination }
        pagination.total = response.data.data.total
        me.loading = false
        me.data = response.data.data.data
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
