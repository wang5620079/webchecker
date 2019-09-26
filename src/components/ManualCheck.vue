<template>
  <div>
    <div>
      <a-table :columns="columns" :dataSource="data" :rowKey="(record=>record.id)" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
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
      <a href="javascript:;" @click="manualcheck(record)">手动检查</a>
      <a-divider type="vertical" />
      <a href="javascript:;" @click="openlink(record)">打开{{record.name}}</a>
    </span>
      </a-table>
    </div>
    <div>
      <span><a-button type="primary" :disabled="!hasSelected"  @click="batchmanualcheck()" :loading="loading" >批量手动检查</a-button></span>
      <span><a-button class="primary" @click="stopbatmanualcheck()" >停止批量检查</a-button></span>
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
  name: 'ManualCheck',
  data () {
    return {
      data: [],
      columns,
      pagination: {},
      loading: false,
      selectedRowKeys: [], // Check here to configure the default column
      checking: false
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted () {
    this.loaddata()
  },
  methods: {
    openlink (record) {
      window.open(record.url, '_blank')
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      console.log(this.selectedRowKeys)
    },
    manualcheck (record) {
      var me = this
      me.data[record.id - 1].status = {error: [], ok: ['检查中...']}
      this.$axios.post('/api/v1/maualcheckurl', {params: {data: record}}).then((response) => {
        var tmpdata = response.data.data
        me.$set(me.data, tmpdata.id - 1, tmpdata)
      }, (error) => {
        if (error.response && error.response.status === 403) {
          me.info('api请求方式错误')
        }
        if (error.response && error.response.status === 404) {
          me.info('api未找到')
        }
        if (error.response && error.response.status === 500) {
          me.info('服务器内部错误')
        }
      })
    },
    batchmanualcheck () {
      // 逐个发出请求，检查url情况
      this.loading = true
      this.checking = true
      for (var i = 0, len = this.selectedRowKeys.length; i < len; i++) {
        if (this.checking === false) {
          break
        }
        var me = this
        var record = me.data[this.selectedRowKeys[i] - 1]
        record.status = {error: [], ok: ['检查中...']}
        this.$axios.post('/api/v1/maualcheckurl', {params: {data: record}}).then((response) => {
          var tmpdata = response.data.data
          me.$set(me.data, tmpdata.id - 1, tmpdata)
        }, (error) => {
          if (error.response && error.response.status === 403) {
            me.info('api请求方式错误')
          }
          if (error.response && error.response.status === 404) {
            me.info('api未找到')
          }
          if (error.response && error.response.status === 500) {
            me.info('服务器内部错误')
          }
        })
      }
      this.checking = false
      this.loading = false
    },
    stopbatmanualcheck () {
      this.checking = false
    },
    loaddata () {
      let me = this
      this.$axios.post('/api/v1/getmaualcheckurls').then((response) => {
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
