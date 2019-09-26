<template>
  <div>
    <a-form
      :form="form"
      layout="horizontal"
    >
    <div>
      <div><h2>检查器设置</h2></div>
      <div>
      <a-form-item
        label="默认检查模式"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select defaultValue="QUICK" style="width: 120px" @change="handleChange" v-model="checkermode">
          <a-select-option value="NORMAL">NORMAL</a-select-option>
          <a-select-option value="QUICK">QUICK</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="网页加载超时时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="50" v-model="page_load_timeout" />
      </a-form-item>
      <a-form-item
        label="脚本加载超时时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="50" v-model="script_timeout"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary" @click="submit">
          提交
        </a-button>
        <a-button type="primary" @click="loaddata">
          提交
        </a-button>
      </a-form-item>

      </div>
  </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'TestCmp',
  data () {
    return {
      checkermode: 'QUICK',
      page_load_timeout: 10,
      script_timeout: 5,
      rerundtime: 60,
      form: this.$form.createForm(this),
      // eslint-disable-next-line
      count: 2,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      buttonItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    submit () {

    },
    loaddata () {
      // let me = this
      this.$axios.post('/api/v1/getsettings').then((response) => {
        let success = response.data.success
        let data = response.data.data
        console.log(success)
        console.log(data)
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
