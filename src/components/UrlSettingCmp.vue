<template>
  <div>
<!--    这里用一个布局-->
    <div>
      <a-divider>模板下载</a-divider>
      <a-row >
        <a-col :span="6"  style="text-align: center"><div class="ant-steps-item-icon"><span class="ant-steps-icon">1</span></div></a-col>
        <a-col :span="6"><h3>请先下载并填写模板</h3></a-col>
        <a-col :span="6"><a @click="handleDownload"><span>下载模板</span></a></a-col>
        <a-col :span="6"></a-col>
      </a-row>
      <a-divider>清单上传</a-divider>
      <a-row>
        <a-col :span="6" style="text-align: center"><div class="ant-steps-item-icon"><span class="ant-steps-icon">2</span></div></a-col>
        <a-col :span="6"><h3>上传清单</h3></a-col>
        <a-col :span="6">
          <a-upload name="file" :multiple="true" action="/api/v1/upload" :headers="headers" @change="handleChange">
            <a-button>
              <a-icon type="upload" /> 点击上传
            </a-button>
          </a-upload>
        </a-col>
        <a-col :span="6"></a-col>
      </a-row>
    </div>
<!--    <a-button class="editable-add-btn"  @click="loaddata">加载</a-button>-->
    <a-divider>任务清单</a-divider>
    <div>
      <a-table :columns="columns"
               :rowKey="record => record.id"
               :dataSource="dataSource"
               :loading="loading"
               :pagination="pagination"
               @change="handleTableChange"
               bordered
      >
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [{
  title: '名称',
  dataIndex: 'name',
  sorter: true,
  width: '20%'
  // scopedSlots: { customRender: 'name' }
}, {
  title: 'url',
  dataIndex: 'url',
  width: '60%'
}, {
  title: '模式',
  dataIndex: 'mode',
  width: '10%'
}, {
  title: '超时时长(ms)',
  dataIndex: 'timeout',
  width: '10%'
}]
export default {
  name: 'UrlSettingCmp',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      dataSource: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    handleDownload () {
      window.open('http://127.0.0.1:5000/api/v1/getUrlTemplate', '_blank')
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      var me = this
      this.axios.post('/api/v1/geturls', params).then((response) => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = response.data.total
        me.loading = false
        me.dataSource = response.data.data
        me.pagination = pagination
      })
    },
    loaddata () {
      var me = this
      this.$axios.post('/api/v1/geturls').then((response) => {
        const pagination = { ...this.pagination }
        pagination.total = response.data.total
        me.loading = false
        me.dataSource = response.data.data
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
