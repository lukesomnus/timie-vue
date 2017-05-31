// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import App from './App'
import LayoutHeader from '@/components/layout/Header'
import router from './router'

Vue.component(LayoutHeader.name, LayoutHeader)
Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
