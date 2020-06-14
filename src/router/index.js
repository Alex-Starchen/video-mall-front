import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home/Home'
import Category from '@/page/Category/Category'
import Cart from '@/page/Cart/Cart'
import UserInfo from '@/page/User/UserInfo'
import address from '@/page/User/address'
import GoodsDetails from '@/components/GoodsDetails'
import Login from '@/page/Login/Login'
import Register from '@/page/Login/Register'
import orderList from '@/page/Order/orderList'
import order from '@/page/Order/order'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      redirect: '/'
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/Details',
      name: 'Details',
      component: GoodsDetails
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/addr',
      name: 'address',
      component: address
    }
  ]
})
