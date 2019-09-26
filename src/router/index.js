import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import TestCmp from '@/components/SysSettings'
import Test from '@/components/Test'
import RuntimeSettingCmp from '@/components/RuntimeSettingCmp'
import UrlSettingCmp from '@/components/UrlSettingCmp'
import TestTab from '@/components/TestTab'
import ErrorTaskList from '@/components/ErrorTaskList'
import ManualCheck from '@/components/ManualCheck'
import getAutoDataRecords from '@/components/getAutoDataRecords'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/TestCmp',
      name: 'TestCmp',
      component: TestCmp
    },
    {
      path: '/RuntimeSetting',
      name: 'RuntimeSettingCmp',
      component: RuntimeSettingCmp
    },
    {
      path: '/UrlSetting',
      name: 'UrlSettingCmp',
      component: UrlSettingCmp
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/TestTab',
      name: 'TestTab',
      component: TestTab
    },
    {
      path: '/ErrorTaskList',
      name: 'ErrorTaskList',
      component: ErrorTaskList
    },
    {
      path: '/ManualCheck',
      name: 'ManualCheck',
      component: ManualCheck
    },
    {
      path: '/getAutoDataRecords',
      name: 'getAutoDataRecords',
      component: getAutoDataRecords
    }
  ]
})
