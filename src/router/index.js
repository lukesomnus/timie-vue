import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Plugin from '@/components/plugins/Plugin'
import Todo from '@/components/plugins/Todo'
import TimeNote from '@/components/plugins/TimeNote'
import Tomato from '@/components/plugins/Tomato'
import AnnualPlan from '@/components/plugins/AnnualPlan'
import Birthday from '@/components/plugins/Birthday'
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
        },
        {
          path:'tomato',
          name:'tomato',
          component:Tomato
        },
        {
          path:'annualPlan',
          name:'annualPlan',
          component:AnnualPlan
        },
        {
          path:'birthday',
          name:'birthday',
          component:Birthday
        }
        
      ]
    },
  ]
})
