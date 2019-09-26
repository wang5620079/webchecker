<template>
<div>
  <h2>自动任务控制</h2>
  <div>
    <a-switch  @change='onChange' :checked="checked"/>
  </div>
  <h2>虚拟浏览器控制</h2>
  <div>
    <span><a-button type="primary" @click="restartbrowsers()" :loading="loading" >重启所有虚拟浏览器</a-button></span>
  </div>
  <div><p>说明：虚拟浏览器用于NORMAL类型的爬虫任务。虚拟浏览器可以渲染并返回js生成的页面。但是虚拟浏览器稳定性不强，不适用于大量并行查询。如果在异常任务清单中发现大量的"普通任务"出错，则此时可以尝试重启所有虚拟浏览器，以便解决问题。如果还是依然发生大量错误，建议重启整个检查器。重启之前会关闭所有自动任务。</p></div>
</div>
</template>

<script>
export default {
  name: 'RuntimeSettingCmp',
  data () {
    return {
      checked: false,
      loading: false
    }
  },
  mounted () {
    this.loaddata()
  },
  methods: {
    restartbrowsers () {
      let me = this
      me.loading = true
      if (this.checked) {
        this.$axios.post('/api/v1/pausejobs').then((response) => {
          me.checked = !response.data
          me.info('自动任务停止。')
        }, (error) => {
          if (error.response && error.response.status === 403) {
            this.info('api请求方式错误')
            this.checked = true
          }
          if (error.response && error.response.status === 404) {
            this.info('api未找到')
            this.checked = true
          }
          if (error.response && error.response.status === 500) {
            this.info('服务器内部错误')
            this.checked = true
          }
        })
      }
      this.$axios.post('/api/v1/restartbrowsers').then((response) => {
        me.loading = false
        let success = response.data.success
        if (!success) {
          this.info('重启失败')
        } else {
          this.info('重启成功')
        }
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
    onChange () {
      if (!this.checked) {
        let me = this
        this.$axios.post('/api/v1/resumejobs').then((response) => {
          me.checked = response.data
          me.info('自动任务已恢复。')
        }, (error) => {
          if (error.response && error.response.status === 403) {
            this.info('api请求方式错误')
            this.checked = false
          }
          if (error.response && error.response.status === 404) {
            this.info('api未找到')
            this.checked = false
          }
          if (error.response && error.response.status === 500) {
            this.info('服务器内部错误')
            this.checked = false
          }
        })
      }
      if (this.checked) {
        let me = this
        this.$axios.post('/api/v1/pausejobs').then((response) => {
          me.checked = !response.data
          me.info('自动任务停止。')
        }, (error) => {
          if (error.response && error.response.status === 403) {
            this.info('api请求方式错误')
            this.checked = true
          }
          if (error.response && error.response.status === 404) {
            this.info('api未找到')
            this.checked = true
          }
          if (error.response && error.response.status === 500) {
            this.info('服务器内部错误')
            this.checked = true
          }
        })
      }
    },
    loaddata () {
      let me = this
      this.$axios.post('/api/v1/getjobstatus').then((response) => {
        me.checked = response.data
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
