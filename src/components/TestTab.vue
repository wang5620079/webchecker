<template>
  <a-table :columns="columns" :dataSource="data">
<!--    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>-->
    <span slot="customTitle"> 名称</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="red" :key="tag">{{tag}}</a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="openlink(record)">打开{{record.name}}</a>
    </span>
  </a-table>
</template>

<script>

const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
}, {
  title: '地址',
  dataIndex: 'url',
  key: 'url'
}, {
  title: '状态',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  key: '1',
  name: '网易',
  url: 'http://www.163.com',
  address: 'New York No. 1 Lake Park',
  tags: []
}, {
  key: '2',
  name: '新浪',
  url: 'http://www.sina.com.cn',
  address: 'London No. 1 Lake Park',
  tags: ['404']
}, {
  key: '3',
  name: '百度',
  url: 'http://www.百度.com.cn',
  address: 'Sidney No. 1 Lake Park',
  tags: ['超时']
}]

export default {
  name: 'TestTab',
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    openlink (record) {
      window.open(record.url, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
