<template>
    <div class="product col-xs-6">
        <div class="row" v-on:click="ProdDetail(content.productId)">
            <span class="product_pic">
                <img v-bind:src="pic" width="120" alt="">
            </span>
            <span class="product_title">{{content.name}}</span>
            <span class="product_price">
                ￥{{content.price}}
            </span>
        </div>
    </div>                          
</template>
<script>
export default {
    props:["content"],
    data:function(){
        let pictures=JSON.parse(this.$props.content.pic)
        return {
            pic: pictures[0]
        }
    },
    methods:{
        ProdDetail(id){
            // console.log(id)
            this.$router.push({path:'Details?proId='+id})
        }
    }
}
</script>
<style lang="scss" scoped>
.product{
    padding-top: 1vh;
    height: 200px;
}
.product_title{
    height: 40px;
    overflow: hidden;
}
.product_pic{
    img{
        border-radius: 6px;
    }
}
.product_price{
    color: red
}
</style>

