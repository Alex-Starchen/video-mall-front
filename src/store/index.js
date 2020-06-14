import Vue from 'vue'
import Vuex from 'vuex'
import { setStore, getStore,removeStore } from '../utils/storage'
import {userUpdate,addOrder,delOrder} from '@/api/index'
import router from '../router';
Vue.use(Vuex)

const state={
    login:false,//是否登录
    userInfo: null, // 用户信息
    cartList:[],//购物车列表
    orderList:[],//订单列表
}
const mutations={
    //添加商品
    addProduct(state,payload){
        console.log(payload)
        //判断购物车是否有商品
        if(state.cartList.length==0){
            state.cartList.push(payload)
        }else{//判断商品是否在购物车中，有的话数量增加
            let flag=0
            for (let i=0;i<state.cartList.length;i++){
                let item=state.cartList[i]
                if(item.params.skuId==payload.params.skuId){
                    state.cartList[i].number+=1
                    flag=1
                }
            }
            if(flag==0){
                state.cartList.push(payload)
            }
        }
        mutations.updateUser(state)
    },
    //移除购物车商品
    removeProduct(state,payload){
        for(let i=0;i<state.cartList.length;i++){
            for(let j=0;j<payload.length;j++){
                if(state.cartList[i].params.skuId==payload[j].params.skuId){
                    state.cartList.splice(i,1)
                }
            }
        }
        mutations.updateUser(state)
    },
    //下单后清空购物车下过单的商品
    clearCart(state,orderList){
        let productList=JSON.parse(orderList.productList)
        for(let i=0;i<state.cartList.length;i++){
            for(let j=0;j<productList.length;j++){
                if(state.cartList[i].params.skuId==productList[j].skuId){
                    state.cartList.splice(i,1)
                }
            }
        }
        mutations.updateUser(state)
    },
    //更新购物车商品
    changeCart(state,payload){
        state.cartList=payload
        mutations.updateUser(state)
    },
    //记录用户信息
    recordUser(state,payload){
        state.userInfo=payload//保存用户信息
        // console.log(state.userInfo)
        if(state.userInfo.cartList){
            let cartList=JSON.parse(state.userInfo.cartList)
            state.cartList=cartList//读取用户购物车列表
        }
        if(state.userInfo.orderList){
            let orderList=JSON.parse(state.userInfo.orderList)
            state.orderList=orderList//读取用户订单列表
        }
        state.login=true
        setStore('user',state.userInfo)
    },
    //更新用户信息
    updateUser(state){
        if(state.login==true){
            // console.log(state.orderList)
            //解析orderList中的JSON数据
            for(let i=0;i<state.orderList.length;i++){
                if(typeof(state.orderList[i].productList)=='string'){
                    state.orderList[i].productList=JSON.parse(state.orderList[i].productList)
                }
                if(typeof(state.orderList[i].userAddress)=='string'){
                    state.orderList[i].userAddress=JSON.parse(state.orderList[i].userAddress)
                }
            }
            //更新state.userInfo
            state.userInfo.cartList=JSON.stringify(state.cartList)
            state.userInfo.orderList=JSON.stringify(state.orderList)
            let params=state.userInfo
            // console.log(params)
            userUpdate(params).then((res)=>{
                console.log("updated")
            })
        }
    },
    //更新地址信息
    updateAddr(state,payload){
        state.userInfo.addressList=JSON.stringify(payload)
        mutations.updateUser(state)
    },
    //添加订单并更新订单列表
    createOrder(state,order){
        //添加订单
        addOrder(order).then((res)=>{
            let order=res
            state.orderList.push(order)
            console.log(state.orderList)
            //清空购物车
            mutations.clearCart(state,order)
            mutations.updateUser(state)
            router.push('/orderList?tab=all')
        })
    },
    removeOrder(state,params){
        for(let i=0;i<state.orderList.length;i++){
            if(state.orderList[i].orderId==params.orderId){
                //删除state里的订单
                state.orderList.splice(i,1)
            }
        }
        //更新用户信息到服务器
        mutations.updateUser(state)
        //刷新页面
        router.go(0)
        // 删除orders表的订单
        // delOrder(params).then((res)=>{
        //     console.log(res)
        // })
    }
}
export default new Vuex.Store({
    state,
    mutations
})