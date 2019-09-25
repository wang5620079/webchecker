<template>
  <div>
    <div>
  <a-table :columns="columns" :dataSource="data">
<!--    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>-->
    <span slot="customTitle"> 名称</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="red" :key="tag">{{tag}}</a-tag>
    </span>
    <span slot="status" slot-scope="status">
      <a-tag v-for="item in status.error" color="red" :key="item">{{item}}</a-tag>
      <a-tag v-for="item in status.ok" color="blue" :key="item">{{item}}</a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;">Invite 一 {{record.name}}</a>
      <a-divider type="vertical" />
      <a href="javascript:;" >打开{{record.name}}</a>
    </span>
  </a-table>
    </div>
    <div><a-button class="primary" @click="openlink()" >测试</a-button></div>
  </div>
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
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  key: '1',
  name: '网易',
  url: 'http://www.163.com',
  address: 'New York No. 1 Lake Park',
  tags: [],
  status: {error: ['404', '500'], ok: ['ok']}
}, {
  key: '2',
  name: '新浪',
  url: 'http://www.sina.com.cn',
  address: 'London No. 1 Lake Park',
  tags: ['404'],
  status: {error: ['404', '500'], ok: ['ok']}
}, {
  key: '3',
  name: '百度',
  url: 'http://www.百度.com.cn',
  address: 'Sidney No. 1 Lake Park',
  tags: ['超时'],
  status: {error: ['404', '500'], ok: ['ok']}
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
      this.data[0].status = {error: ['超市1', '超市2'], ok: ['ok']}
    }
  }
}
</script>

<style scoped>

</style>
