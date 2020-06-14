<template>
    <div id="order_list" class="container">
        <nav class="navbar-default row">
            <ul class="list-inline"> 
                <li class="col-xs-2" @click="changeTab('all')">全部</li>
                <li class="col-xs-2" @click="changeTab('unpaid')">待付款</li>
                <li class="col-xs-2" @click="changeTab('unshipped')">待发货</li>
                <li class="col-xs-2" @click="changeTab('unreceived')">待收货</li>
                <li class="col-xs-2" @click="changeTab('unrecommend')">待评价</li>
                <li class="col-xs-2" @click="changeTab('refund')">售后</li>
            </ul>
        </nav>
        <div class="order_item" v-for="(item,i) in orders" :key="i">
            <div class="row">
                <ul class="list-group">
                    <li class="list-group-item" v-show="payStatus(item.status)">
                        <div class="page-header">
                            <span>订单{{i+1}}</span>
                        </div>
                        <ul class="list-group" v-for="(product,j) in item.productList" :key="j">
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="prod_pic col-xs-4">
                                        <img v-bind:src="product.sku.skuPic" width="100"> 
                                    </div>
                                    <div class="col-xs-8">
                                        <div class="prod_info">
                                            <div class="prod_name">
                                                <span>{{product.product.name}}</span>
                                            </div>
                                            <div class="prod_type" >
                                                <span class="prod_num">
                                                    尺寸：{{product.sku.skuType}}
                                                </span>
                                            </div>
                                            <div class="prod_price">
                                                <span class="price">
                                                    ￥{{product.sku.skuPrice/100}}
                                                </span>
                                                <span class="pull-right">
                                                    x{{product.count}}
                                                </span>
                                            </div>
                                            <div class="prod_number">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="clearfix">
                            <span class="pull-left">共{{item.productNumber}}件商品</span>
                            <span class="pull-right">合计:<strong>￥{{item.payPrice}}</strong>(含邮费{{item.postages}}元)</span>
                        </div>
                        <div class="clearfix">
                            <div class="btn-group pull-right">
                                <button class="btn btn-primary">去支付</button>
                                <button class="btn btn-danger" @click="deleteOrder(item.orderId,item.userId)">删除订单</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {goodsMultiple} from '@/api/index'
import { mapMutations } from 'vuex';
export default {
    data:function(){
        return {
            orderList:null,
            productList:[],
            orders:null
        }
    },
    created(){
        this.getOrderList()
    },
    computed:{
    },
    methods:{      
        getOrderList(){
            this.orderList=JSON.parse(this.$store.state.userInfo.orderList)
            if(this.orderList===null){
                return 
            }
            // console.log(this.orderList)
            //向后台发送所有productId组成的列表查询数据
            let productIdList=[]
            for(let i=0;i<this.orderList.length;i++){
                let order=this.orderList[i]
                for(let j=0;j<order.productList.length;j++){
                    let prodId=order.productList[j].proId
                    let skuId=order.productList[j].skuId
                    productIdList.push(prodId)               
                }
            }
            // console.log(productIdList)
            goodsMultiple(productIdList).then((res)=>{
                let productList=[]
                for(let i=0;i<res.length;i++){
                    productList.push(res[i])
                }
                for(let i=0;i<productList.length;i++){
                    productList[i].details=JSON.parse(productList[i].details)
                    productList[i].pic=JSON.parse(productList[i].pic)
                    productList[i].sku=JSON.parse(productList[i].sku)
                }
                this.productList=productList
                // console.log(this.productList)
                //添加orderList[i].productList[j].sku
                for(let i=0;i<this.orderList.length;i++){
                    let order=this.orderList[i]
                    let orderProducts=[]       
                    for(let j=0;j<order.productList.length;j++){
                        let prodId=order.productList[j].proId
                        let skuId=order.productList[j].skuId
                        let sku=this.findProd(skuId,prodId)
                        //插入该订单的商品sku信息                   
                        this.orderList[i].productList[j].sku=sku
                        for(let k=0;k<this.productList.length;k++){
                            if(this.orderList[i].productList[j].proId==this.productList[k].productId){
                                this.orderList[i].productList[j].product=this.productList[k]
                            }
                        }
                    }
                }
                this.orders=Object.assign(this.orderList)
                console.log(this.orders)
            })
        },
        changeTab(tab){
            this.$router.push('/orderlist?tab='+tab)
        },
        //根据id查找数据
        findProd(skuId,proId){
            // console.log(skuId)
            // console.log(proId)
            for(let i=0;i<this.productList.length;i++){
                if(proId==this.productList[i].productId){
                    let sku=this.productList[i].sku
                    for(let j=0;j<sku.length;j++){
                        if(skuId==sku[j].skuId){
                            return sku[j]
                        }
                    }
                }
            }
        },
        //判断支付状态，按状态分页
        payStatus(status){
            let kinds=["unpaid","unshipped","unreceived","unrecommend","refund"]
            let tab=this.$route.query.tab
            if(kinds[status]==tab){
                return true
            }
            else if(tab=="all"){
                return true
            }
        },
        //删除订单
        deleteOrder(orderId,userId){
            let params={
                'orderId':orderId,
                'userId':userId
            }
            this.$store.commit('removeOrder',params)
            
        }
    },

}
</script>
<style lang="scss" scoped>
#order_list{
    margin-bottom: 60px;
    strong{
        color: red;
        font-size: 1.5em;
    }
    .list-inline{
        li{
            height: 50px;
            line-height: 50px;
        }
    }
    .list-group{
        margin-top: 0;
        margin-bottom: 0;
    }
    .price{
        color: red;
    }
    .order_item{
        span{
            display: inline;
        }
        .prod_info{
            text-align: left;
        }
    }
    .page-header{
        margin-top: 20px;
    }
}
</style>
