<template>
    <div id="order" class="container-fluid">
        <div class="user_addr" @click="changeAddr">
            <div class="addr_defalut row" v-show="address.name">
                <div class="name">
                    <span>收货人：</span>
                    <span>{{address.name}}</span>
                </div>
                <div class="phone">
                    <span>手机号码：</span>
                    <span>{{address.phone}}</span>
                </div>
                <div class="detail">
                    <span>收货地址：</span>
                    <span>{{address.region+address.details}}</span>
                </div>                    
            </div>
            <div class="addr_none row" v-show="!address.name">
                <span>{{address}}</span>
            </div>
        </div>
        <div class="content">
            <div class="product_info row" v-for="(product,i) in products" :key="i" style="padding-bottom:1em;">
                <div class="good_pic col-xs-4">
                    <div class="row">
                        <img v-bind:src="product.params.skuPic" width="100px;" alt="">
                    </div>
                </div>
                <div class="good_title col-xs-8">
                    <div class="text_info">
                        <div class="row">
                            <span class="name">{{product.proInfo.name}}</span>
                        </div>
                        <div class="row">
                            <span>尺寸：{{product.params.skuType}}</span>
                            <span>数量：x{{product.number}}</span>
                            <span style="color:red">￥{{product.params.skuPrice/100}}</span>
                        </div>
                        <div class="row">
                            <span>运费：0</span>
                        </div>
                        <div class="row" style="text-align:left;">
                            <span style="display:inline-block;">买家留言：</span>
                            <input type="text" placeholder="备注" v-model="message[i]">
                        </div>
                    </div>
                </div>                                
            </div>
            <div class="pay_bill row">
                <div class="bill_list col-xs-12">
                    <span>共计<b>{{itemNumber}}</b>件商品</span>
                    <span>商品总价:<strong>￥{{goodsPrice}}</strong></span>
                    <span>运费:<strong>￥{{postages}}</strong></span>
                    <span>合计:<strong>￥{{totalPrice}}</strong></span>
                </div>
            </div>
        </div>
        <div class="order_submit row">
            <button @click="payOrder" class="btn-lg">提交订单</button>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            productList:[],
            address:null,
            products:[],
            itemNumber:0,
            goodsPrice:0,
            postages:10,
            totalPrice:0,
            message:[]
        }
    },
    created(){
        //解析url参数
        let params=this.$route.query
        let proId=params.proId.split(',')
        let skuId=params.skuId.split(',')
        let count=params.count.split(',')
        for(let i=0;i<proId.length;i++){
            this.productList.push({
                proId:proId[i],
                skuId:skuId[i],
                count:count[i]
            })
        }
        //获取购物车数据
        let cartList=this.$store.state.cartList
        //找到选中的商品
        for(let i=0;i<cartList.length;i++){
            for(let j=0;j<this.productList.length;j++){
                if(this.productList[j].skuId==cartList[i].params.skuId){
                    this.products.push(cartList[i])
                    this.itemNumber+=cartList[i].number
                    this.goodsPrice+=cartList[i].params.skuPrice/100*cartList[i].number
                }
            }
        }
        this.totalPrice=this.postages+this.goodsPrice
        console.log(this.productList)
        let addressList=JSON.parse(this.$store.state.userInfo.addressList)
        if(addressList.length==0){
            this.address="请选择收货地址"
        }else{
            console.log(addressList)
            //先赋值地址为地址列表里的第一个
            this.address=addressList[0]
            //若有默认地址则选择默认地址
            for(let i=0;i<addressList.length;i++){
                if(addressList[i].default==true){
                    this.address=addressList[i]
                }
            }
        }
    },
    methods:{
        payOrder(){
            let order={
                orderId:'', 
                payTime:Date.now(),
                status:0,
                productList:JSON.stringify(this.productList),
                productNumber:this.itemNumber,
                goodsPrice: this.goodsPrice,
                postages: this.postages,
                payPrice: this.totalPrice,
                userId:this.$store.state.userInfo.userId,
                userAddress:JSON.stringify(this.address),
            }
            console.log(order)
            if(typeof(this.address)=='string'){
                alert('你还没有选择收货地址')
                return
            }
            this.$store.commit('createOrder',order)
        },
        changeAddr(){
            this.$router.push('/addr')
        }
    }
}
</script>

<style lang="scss">
#order{
    margin-bottom: 60px;
    .user_addr{
        .addr_defalut{
            border: 1px solid;
            text-align: left;
            span{
                display: inline;                
            }
        }
        .addr_none{
            height: 40px;
            border: 1px solid;
            text-align: left;
            span{
                display: inline;                
            }            
        }
    }
    .content{
        span{
            text-align: left;
        }
        .product_info{
            border: 1px solid;
            margin-top: 1em;
        }
        .pay_bill{
            border: 1px solid;
            margin-top: 1em;
            margin-bottom: 1em;
            strong{
                color: red;
                font-size: 20px;
            }
        }
        .order_submit{
            span{
                display: inline-block;
            }
        }
    }
}
</style>
