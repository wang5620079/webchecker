import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import TestCmp from '@/components/TestCmp'

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
    }
  ]
})
