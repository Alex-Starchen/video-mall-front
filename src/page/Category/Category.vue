<template>
    <div id="Category" class="container-fluid">
        <search-bar></search-bar>
        <div class="row">
            <div class="cat_bar col-xs-3">
                <nav class="navbar navbar-default row">
                    <ul class="nav nav-pills nav-stacked">                    
                        <li role="presentation" v-on:click="getIpPage(ipid[0])"><a>火箭少女</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[1])"><a>王者荣耀</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[2])"><a>大话西游</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[3])"><a>三生三世</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[4])"><a>黑豹</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[5])"><a>草场地</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[6])"><a>腾讯视频</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[7])"><a>熊本熊</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[8])"><a>复仇者联盟</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[9])"><a>正义联盟</a></li>
                        <li role="presentation" v-on:click="getIpPage(ipid[10])"><a>变形金刚</a></li>
                    </ul>
                </nav>
            </div>
            <div class="goods_sort col-xs-9">
                <div class="row">
                    <product v-bind:key="item.id" v-for="item in currentContent" v-bind:content="item" ></product>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {goodsIp} from '@/api/index'
import searchBar from '@/components/searchBar'
import product from '@/components/product'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    name: 'Category',
    components:{
        searchBar,
        product
    },
    data:()=>{
        return {
            
            ipid:[426,92,302,160,381,202,144,458,148,88,84,158,500,230,559,27],
            ipContent:[],
            currentContent:[],
            ipRes:[]
        }
    },
    created(){
        //在挂载数据绑定事件之后进行数据的初始化，即获取第一个ip页面数据
        let currentPath=this.$route.query
        let currentIp=currentPath.ipid?currentPath.ipid:this.ipid[0]    //获取当前路径的url参数，为空则取第一个ipid
        currentIp=parseInt(currentIp)   //将ipid转为数字类型
        this.getIpPage(currentIp)
    },
    methods:{
        getIpPage(id){
            //获取当前ipid的页面数据
            let req={"ip":id}
            this.$router.push({path:'Category?ipid='+id}) //修改当前路由的url参数
            //判断该ip是否已经取得返回数据，没有则发送请求
            if (this.ipRes.indexOf(id)==-1){
                goodsIp(req).then((res)=>{
                    for (let i=0;i<res.length;i++){                        
                        this.ipContent.push(res[i])     //将返回数据存进ipContent数组里
                    }
                    this.currentContent=this.ipContent.filter(function(curVal,index,arr){
                        return curVal.ip==id
                        })
                })
                this.ipRes.push(id) //标记该ip已取得返回
            }
            this.currentContent=this.ipContent.filter(function(curVal,index,arr){
                return curVal.ip==id
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#Category{
    margin-bottom: 60px;
}
</style>

