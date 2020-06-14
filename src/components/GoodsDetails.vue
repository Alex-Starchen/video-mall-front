<template>
    <div id="details" class="container-fluid">
        <div id="myCarousel" class="carousel slide row">
            <!-- 轮播（Carousel）项目 -->
            <div class="carousel-inner"> 
                <div class="item" v-for="(item,i) in proInfo.pic" v-bind:key="i" v-bind:class="{active:i==0}">
                    <img v-bind:src="item">
                </div>
            </div>
            <!-- 轮播（Carousel）导航 -->
            <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div v-show="added" class="message">
            <div class="alert alert-success">
                <span>已成功添加到购物车</span>
            </div>
        </div>
        <div class="product-info">
            <div class="price">
                <b>价格：</b>
                <strong>￥{{proInfo.price}}</strong>
            </div>
            <div class="name">
                <b>标题：</b>
                <span style="display:inline">{{proInfo.name}}</span>
            </div>
            <div class="postage">
                <b>运费：</b>
                <span>全场包邮</span>
            </div>
        </div>
        <div class="product-type row">
            <div class="col-xs-2">
                <b>尺寸：</b>
            </div>
            <div class="sku_id col-xs-10">
                <div class="btn-group" v-for="(sku,i) in proInfo.sku" v-bind:key="i">
                    <button type="button" class="btn btn-default" v-on:click="showSku(i)">{{sku.skuType}}</button>
                </div>        
            </div>
        </div>
        <div class="product-sku">
            <div class="sku-picure">
                <img v-bind:src="currentSku.skuPic" width="100%" alt="">
            </div>
            <div class="sku-price">价格:<span style="color:red">￥{{currentSku.skuPrice/100}}</span></div>
            <div class="sku-number">剩余库存:{{currentSku.skuNum}}</div>
        </div>     
        <div class="trolley">
            <button type="button" v-on:click="addCart(currentSku)" class="btn">加入购物车</button>
        </div>
    </div>
</template>
<script>
import {goodsDetails} from '../api/index'
export default {
    data:function(){
        return {
            proId:this.$route.query,
            proInfo:{},
            currentSku:{},
            added:false
        }
    },
    created(){
        this.getDetails(this.proId)
    },
    methods:{
        getDetails(params){
            goodsDetails(params).then((res)=>{
                this.proInfo=res
                this.proInfo.details=JSON.parse(res.details)
                this.proInfo.pic=JSON.parse(res.pic)
                this.proInfo.sku=JSON.parse(res.sku)
                this.currentSku=this.proInfo.sku[0]
            })
        },
        showSku(num){
            this.currentSku=this.proInfo.sku[num]
        },
        addCart(params){
            this.added=true
            setTimeout(() => {
                this.added=false
            }, 2000);
            let payload={
                params,
                proInfo:this.proInfo,
                number:1
            }
            this.$store.commit('addProduct',payload)
            let trolley=this.$store.state.cartList
            // console.log(trolley)
        }
    }
    
}
</script>
<style lang="scss" scoped>
#details{
    margin-bottom: 60px;
    span{
        display: inline-block;
    }
    font-size: 16px;
    white-space:nowrap;
    .name{
        white-space: normal;
    }
}
.carousel-caption{
  color: royalblue;
  font-size: 1.5em;
  top:50%;
  transform: translateY(-50%);
}
ol.carousel-indicators{
  bottom: 0;
}
.carousel-indicators li{
  background-color: white;
  border-color: aquamarine;
}
.carousel-control.right,.carousel-control.left{
  background-image:none;
}
.product-info{
    strong{
        color: red;
        font-size: 1.5em;
    }
    text-align: left;
    padding-bottom: 10px;
    div{
        margin-top: 0.5em
    }
}
.sku_id{
    padding-left: 0;
}
.btn-group{
    display: inline;
}
.message{
    position: fixed;
    left: 50%;
    z-index: 1000;
    div{
        float: left;
        position: relative;
        right: 50%;
    }
}
</style>
