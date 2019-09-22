<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">增加</a-button>
    <a-button class="editable-add-btn" @click="handleDeleteSelections">删除所选项目</a-button><span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`已选择 ${selectedRowKeys.length} 项`}}
        </template>
      </span>
    <a-table bordered :dataSource="dataSource" :columns="columns" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
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
</template>
<script>
import EditableCell from './EditableCell'
/*
  * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
  */
export default {
  name: 'Test',
  components: {
    EditableCell
  },
  data () {
    return {
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
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    handleDeleteSelections () {
      console.log(this.selectedRowKeys)
      const dataSource = [...this.dataSource]
      for (var keyitem in this.selectedRowKeys) {
        console.log(keyitem)
        this.dataSource = dataSource.filter(item => item.key !== this.selectedRowKeys[keyitem])
      }
      console.log(this.cacheData)
      console.log(this.dataSource)
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      console.log(this.selectedRowKeys)
    },
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
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
