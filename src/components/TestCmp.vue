<template>
  <div>
    <a-form
      :form="form"
      layout="horizontal"
    >
    <div>
      <div><h1>参数设置</h1></div>
      <div><h2>浏览器路径设置</h2></div>
      <div>
        <div>
          <a-button type="primary" @click="increment">+</a-button>
          <a-button type="primary" @click="decrement">-</a-button>
        </div>
        <div>
          <ul>
          <li v-for="item in browsers"  :key='item.id' style="list-style-type:none;">
            <a-form-item
              :label=item.name
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input placeholder="input placeholder" :value="item.path" />
            </a-form-item>
          </li>
        </ul>
        </div>
      </div>
    </div>
    <div>
      <div><h2>检查器设置</h2></div>
      <div>
      <a-form-item
        label="默认检查模式"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select defaultValue="NORMAL" style="width: 120px" @change="handleChange" v-mode="checkermode">
          <a-select-option value="NORMAL">NORMAL</a-select-option>
          <a-select-option value="QUICK">QUICK</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="网页加载超时时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="50" v-model="page_load_timeout" @change="onChange" />
      </a-form-item>
      <a-form-item
        label="脚本加载超时时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="50" v-model="script_timeout" @change="onChange" />
      </a-form-item>
      <a-form-item
        label="重新运行检查器间隔时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="600" v-model="rerundtime" @change="onChange" />
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary">
          Submit
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
      form: this.$form.createForm(this),
      // eslint-disable-next-line
      browsers:[{'id':0,'name':'IE',path:'C:\\Program Files\\Internet Explorer\\iexplore.exe'},{'id':1,'name':'Chrome',path:'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application'},],
      checkermode: 'NORMAL',
      page_load_timeout: 10,
      script_timeout: 5,
      rerundtime: 60,
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
    handleChange  (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
