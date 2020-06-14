<template>
    <div id="Cart" class="container">
        <div class="order_list" v-for="(product,i) in cartList" v-bind:key="i">
            <div class="order_item row">
                <div class="good_pic col-xs-4">
                    <div class="row">
                        <input type="checkbox" v-model="checkList" :value="product" v-on:change="showparam">
                        <img v-bind:src="product.params.skuPic" width="100px;" alt="">
                    </div>
                </div>
                <div class="good_title col-xs-8">
                    <div class="text_info" v-show="editing[i]">
                        <i class="glyphicon glyphicon-edit icon" v-on:click="editProd(i)"></i>
                        <div class="row">
                            <span class="name">{{product.proInfo.name}}</span>
                        </div>
                        <div class="row">
                            <span>尺寸：{{product.params.skuType}}</span>
                            <span>数量：x{{product.number}}</span>
                            <span style="color:red">￥{{product.params.skuPrice/100}}</span>
                        </div>
                    </div>
                    <div class="shop_edit row" v-show="!editing[i]">
                        <div class="col-xs-10 wrap">
                            <div class="edit_num row">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-minus" v-on:click="minus(i)"></i>
                                    </span>
                                    <input type="number" pattern="[0-9]*" v-model="product.number" class="form-control" v-on:change="checkNumber(i,product)">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-plus" v-on:click="plus(i)"></i>
                                    </span>
                                </div>                                
                            </div>
                            <div class="edit_type row">
                                <select class="input-group" v-bind:value="product.params.skuType" v-on:change="changeType(i)">
                                    <option v-for="sku in product.proInfo.sku" v-bind:key="sku.skuId">{{sku.skuType}}</option>
                                </select>                                                        
                            </div>
                        </div>
                        <button class="btn-primary col-xs-2 btn_fin" v-on:click="edited(i)">
                            完成
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bill navbar-fixed-bottom container">
            <div class="row">
                <span class="col-xs-2">
                    <input type="checkbox" id="all" @change="checkAll" ref="all">
                    <label for="all">全选</label>
                </span>
                <span class="col-xs-2" @click="removeProd">删除</span>
                <div class="col-xs-5">
                    <span>合计:</span>
                    <span>￥{{countAll}}</span>
                </div>
                <button class="col-xs-3" @click="balance">结算</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    name: "Cart",
    data:function(){
        return {
            Login:this.$store.state.login,
            cartList:this.$store.state.cartList,
            checkList:[],
            editing:[],
            checkedNames:[]
        }
    },
    computed:{
        ...mapMutations(
            'addProduct',
            'removeProduct',
            'changeCart'
        ),
        countAll:function(){
            let price=0
            for(let i=0;i<this.checkList.length;i++){
                let item=this.checkList[i]
                price+=item.params.skuPrice*item.number/100
            }
            price=price.toFixed(2)
            return price
        }
    },
    created(){
        console.log(this.cartList)
        if(this.cartList.length==0){
            //如果购物车为空则显示提示画面...
        }
        //初始化商品为非编辑状态
        for(let i=0;i<this.cartList.length;i++){
            this.editing.push(1)
        }
    },
    methods:{
        //结算价格
        balance(){
            let proIdList=[]
            let skuIdList=[]
            let count=[]
            console.log(this.checkList)
            for(let i=0;i<this.checkList.length;i++){
                proIdList.push(this.checkList[i].proInfo.productId)
                skuIdList.push(this.checkList[i].params.skuId)
                count.push(this.checkList[i].number)
            }
            proIdList=proIdList.join(',')
            skuIdList=skuIdList.join(',')
            count=count.join(',')
            let params="proId="+proIdList+"&skuId="+skuIdList+"&count="+count
            this.$router.push({path:'order?'+params})
        },
        //选中商品
        showparam(e){
            if(this.checkList.length!=this.cartList.length){
                if(this.$refs.all.checked==true){
                    this.$refs.all.checked=false
                }
            }
        },
        //删除商品
        removeProd(){
            this.$store.commit('removeProduct',this.checkList)
        },
        //全部选中
        checkAll(){
            if(this.$refs.all.checked==true){
                this.checkList=[]
                for(let i=0;i<this.cartList.length;i++){
                    this.checkList.push(this.cartList[i])
                }                                
            }else{
                this.checkList=[]
            }
        },
        //修改商品的编辑状态
        editProd(i){
            this.$set(this.editing,i,!this.editing[i])
        },
        //完成商品编辑
        edited(i){
            this.$store.commit('changeCart',this.cartList)
            this.editProd(i)
        },
        //检查数量
        checkNumber(i,product){
            if(product.number>product.params.skuNum){
                this.cartList[i].number=product.params.skuNum
            }
            if(product.number<1){
                this.cartList.splice(i,1)
            }
        },
        //修改尺寸
        changeType(i){
            let index=event.target.selectedIndex
            this.cartList[i].params=this.cartList[i].proInfo.sku[index]
            console.log(this.cartList[i].params)
        },
        //减少商品数量
        minus(i){
            this.cartList[i].number--
            if(this.cartList[i].number<1){
                this.cartList[i].number=1
            }
        },
        //增加商品数量
        plus(i){
            this.cartList[i].number++
            if(this.cartList[i].number>this.cartList[i].params.skuNum){
                this.cartList[i].number=this.cartList[i].params.skuNum
            }
        }
    }
}
</script>
<style lang="scss">
#Cart{
    margin-bottom: 84px;
    .bill{
        bottom: 42px;
        height: 42px;
        background-color: white;
        span{
            display: inline;
            padding-right: 0;
        }
    }
    .text_info{
        text-align: left;
        .icon{
            float: right;
        }
    }
    .shop_edit{
        height: 100px;
        .btn_fin{
            height: 100px;
        }
        button{
            height: 26px
        }
        li{
            display: inline;
        }
        .edit_type{
            .btn_type{
                width: 158px;
            }
            a{
                text-align: center;
            }
            select{
                width: 100%;
            }
        }
        .wrap{
            position: relative;
            top: 50%;
            transform: translateY(-50%)
        }
        .edit_num{
            span{
                display: table-cell;
            }
            input{
                text-align: center;
            }
        }
    }
}
</style>


