import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import TestCmp from '@/components/TestCmp'
import Test from '@/components/Test'
import RuntimeSettingCmp from '@/components/RuntimeSettingCmp'
import UrlSettingCmp from '@/components/UrlSettingCmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ]
})
