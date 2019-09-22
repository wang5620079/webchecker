<template>
  <div>
    <a-form
      :form="form"
      layout="horizontal"
    >
      <div>
        <a-button class="editable-add-btn" @click="handleAdd">增加</a-button>
        <a-table bordered :dataSource="dataSource" :columns="columns" >
          <!--      <template slot="name" slot-scope="text, record">-->
          <!--        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>-->
          <!--      </template>-->
          <template v-for="col in ['browername', 'path']" :slot="col" slot-scope="text, record, index">
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record,index">
            <a-popconfirm
              v-if="dataSource.length"
              title="确认删除?"
              @confirm="() => onDelete(record.key)">
              <a href="javascript:;">刪除</a>
            </a-popconfirm>
            <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm title='确认取消?' @confirm="() => cancel(record.key)">
            <a>取消</a>
          </a-popconfirm>
        </span>
            <span v-else>
          <a @click="() => edit(record.key)">修改</a>
        </span>
          </template>
        </a-table>
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
        <a-input-number :min="1" :max="50" v-mode="page_load_timeout" />
      </a-form-item>
      <a-form-item
        label="脚本加载超时时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="50" v-mode="script_timeout"/>
      </a-form-item>
      <a-form-item
        label="重新运行检查器间隔时间"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input-number :min="1" :max="600" v-mode="rerundtime"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary">
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
      form: this.$form.createForm(this),
      // eslint-disable-next-line
      dataSource: [{
        key: '1',
        browername: 'IE',
        path: 'C:\\Program Files\\Internet Explorer\\iexplore.exe',
        editable: false
      }, {
        key: '2',
        browername: 'Chrome',
        path: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application',
        editable: false
      }],
      count: 2,
      columns: [ {
        title: '浏览器名称',
        dataIndex: 'browername',
        scopedSlots: { customRender: 'browername' }
      }, {
        title: '路径',
        dataIndex: 'path',
        scopedSlots: { customRender: 'path' }
      }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }],
      selectedRowKeys: [], // Check here to configure the default column
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
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    handleAdd () {
      const { count, dataSource } = this
      const newData = {
        key: count + 1 + '',
        browername: `browername`,
        path: 'd:\\',
        editable: false
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
      console.log(this.cacheData)
      console.log(this.dataSource)
    },

    edit (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    save (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    cancel (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        if (this.cacheData) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        }
        delete target.editable
        this.dataSource = newData
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    }
  }
}
</script>

<style scoped>

</style>
