<template>
  <a-table :columns="columns" :dataSource="data">
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="red" :key="tag">{{tag}}</a-tag>
    </span>
  </a-table>
</template>

<script>

const columns = [{
  title: '时间',
  dataIndex: 'time',
  key: 'time'
}, {
  title: '任务类型',
  dataIndex: 'mode',
  key: 'url'
}, {
  title: '名称',
  dataIndex: 'urlname',
  key: 'urlname'
}, {
  title: 'url',
  dataIndex: 'url',
  key: 'url'
}, {
  title: '状态',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}]

const data = [{
  key: '1',
  time: '2019-09-24 :12:00:00',
  mode: '快速任务',
  urlname: '新浪',
  url: 'http://www.sina.com.cn',
  tags: ['任务异常:error']
}, {
  key: '2',
  time: '2019-09-24 :12:00:00',
  mode: '正常任务',
  urlname: '新浪',
  url: 'http://www.sina.com.cn',
  tags: ['任务异常:error']
}, {
  key: '3',
  time: '2019-09-24 :12:00:00',
  mode: '正常任务',
  urlname: '新浪',
  url: 'http://www.sina.com.cn',
  tags: ['任务异常:error']
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
