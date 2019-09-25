<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo"></div>
      <a-menu theme="dark" :defaultSelectedKeys="['3']" mode="inline" :defaultOpenKeys= "openKeys">
        <a-sub-menu
          key="sub1" @click="handleMenuClick"
        >
          <span slot="title"><a-icon type="setting" /><span>参数设置</span></span>
          <a-menu-item key="1"><router-link to="/UrlSetting">监控页面设置</router-link></a-menu-item>
          <a-menu-item key="2"><router-link to="/TestCmp">系统参数设置</router-link></a-menu-item>
          <a-menu-item key="3"><router-link to="/RuntimeSetting">运行参数设置</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu
          key="sub2"
        >
          <span slot="title"><a-icon type="setting" /><span>监控情况</span></span>
          <a-menu-item key="4"><router-link to="/ManualCheck">手动url监控</router-link></a-menu-item>
          <a-menu-item key="5"><router-link to="/TestTab">自动url监控情况</router-link></a-menu-item>
          <a-menu-item key="6"><router-link to="/ErrorTaskList">异常任务清单</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu
          key="sub3"
        >
          <span slot="title"><a-icon type="bulb" /><span>测试</span></span>
          <a-menu-item key="7"><router-link to="/Test">运行参数设置</router-link></a-menu-item>
          <a-menu-item key="8"><router-link to="/TestTab">表格测试</router-link></a-menu-item>
          <a-menu-item key="9"><router-link to="/ErrorTaskList">表格测试</router-link></a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', background: '#fff',  height: fullHeight + 'px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      openKeys: ['sub1', 'sub2'],
      fullHeight: document.documentElement.clientHeight
    }
  },
  watch: {
    fullHeight (val) { // 监控浏览器高度变化
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    this.get_bodyHeight()
  },
  methods: {
    get_bodyHeight () { // 动态获取浏览器高度
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    },
    handleMenuClick (e) {
      console.log(e)
    }
  }
}
</script>

<style>
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
</style>
