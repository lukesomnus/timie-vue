import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Plugin from '@/components/plugins/Plugin'
import Todo from '@/components/plugins/Todo'
import TimeNote from '@/components/plugins/TimeNote'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/plugin',
      name: 'plugin',
      component: Plugin,
      children:[
        {
          path:'todo',
          name:'todo',
          component:Todo
        },
        {
          path:'timenote',
          name:'timenote',
          component:TimeNote
        }
      ]
    },
  ]
})
