<template>
    <div id="buttom_nav" role="navigation" class="navbar-fixed-bottom">
        <div class="container-fluid">
            <ul class="nav nav-tabs row">
                <li v-on:click="chosen(0)" class="col-xs-3" role="presentation" v-bind:class="{active:isActive===0}">
                    <i class="glyphicon glyphicon-home"></i>
                    <span>首页</span>
                </li>
                <li v-on:click="chosen(1)" class="col-xs-3" role="presentation" v-bind:class="{active:isActive===1}">
                    <i class="glyphicon glyphicon-th-large"></i>
                    <span>分类</span>
                </li>
                <li v-on:click="chosen(2)" class="col-xs-3" role="presentation" v-bind:class="{active:isActive===2}">
                    <i class="glyphicon glyphicon-shopping-cart"></i>
                    <span>购物车</span>
                </li>
                <li v-on:click="chosen(3)" class="col-xs-3" role="presentation" v-bind:class="{active:isActive===3}">
                    <i class="glyphicon glyphicon-user"></i>
                    <span>我的</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "BottomNav",
    data: function() {
        return {
            paths:["Home","Category","Cart","UserInfo"]
        }
    },
    computed:{
        isActive: function(){
            let currentPath=this.$route.name
            return this.paths.indexOf(currentPath)            
        }
    },
    methods:{
        chosen(num){
            this.$router.push({
                path: '/'+this.paths[num]
            })
        }
    }
}
</script>
<style lang="scss">
#buttom_nav{
    .container-fluid{
        border: 1px solid gray;
        cursor: pointer;        
        margin: auto
    }
    background-color: #fff;
    li.active{
    background-color: gray;
}
}

</style>
