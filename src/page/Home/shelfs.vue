<template>
    <div class="section">
        <div class="section_title row">
            <h3><slot></slot></h3>
        </div>
        <div class="section_content">
            <div v-for="(item,i) in content" v-bind:key="i">
                <div class="col-xs-4" v-on:click="ProdDetail(item.productId)">
                    <span class="product_pic">
                        <img v-bind:src="JSON.parse(item.pic)[0]" width="100" alt="">                        
                    </span>
                    <span class="product_title">{{item.name}}</span>
                    <span class="product_price">
                        ￥{{item.price}}
                    </span>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
export default {
    name: "shelfs",
    props:['goodsList'],
    data:function(){
        return {
            content: this.goodsList
        }
    },
    methods:{
        ProdDetail(id){
            this.$router.push({path:'Details?proId='+id})
        }
    }    
}
</script>
<style lang="scss" type="text/css" scoped>
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
