// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {userInfo} from './api/index'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const whiteList = ['/Home', '/Category', '/login', '/Details','/','/register']
router.beforeEach(function (to, from, next) {
  userInfo().then(res => {
    // 没登录
    if (res.status) {
      // 白名单
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    } else {
      store.commit('recordUser', res.data[0])
      //  跳转到
      if (to.path === '/login') {
        next({path: '/'})
      }
      next()
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
