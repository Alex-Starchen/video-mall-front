<template>
    <div id="navList">
        <div class="row">
            <div class="nav_item col-xs-3" v-bind:key="ipList.ipid[n-1]" v-for="n in 8" v-on:click="getIpPage(ipList.ipid[n-1])">
                <span class="icon_pic">
                    <img v-bind:src="ipList.imgUrl[n-1]" width="48" alt="">
                </span>
                <span class="icon_text">{{ipList.ipName[n-1]}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "navList",
    data:function(){
        return {
            ipList:{
                ipid:[158,500,230,92,202,144,559,27],
                ipName:["火影忍者","黑白猴","魔道祖师","王者荣耀","草场地","腾讯视频","Fate","怪企鹅"],
                imgUrl:[
                    "//puui.qpic.cn/vmall/0/1_782904507_1528889206791/220_308",
                    "//puui.qpic.cn/vmall/0/1_496826496_1544782058019/220_308",
                    "//puui.qpic.cn/vmall/0/1_782904507_1528872663376/220_308",
                    "//puui.qpic.cn/vmall/0/1_782904507_1527848516425/220_308",
                    "//puui.qpic.cn/vmall/0/1_747134689_1545272885624/220_308",
                    "//puui.qpic.cn/vmall/0/1_690683887_1523626758982/220_308",
                    "//puui.qpic.cn/vmall/0/1_158157573_1546840804414/220_308",
                    "//puui.qpic.cn/vmall/0/1_271955453_1521805980232/220_308"
                ]
            }
        }
    },
    methods:{
        getIpPage(ipid){
            this.$router.push({path:'Category?ipid='+ipid})
        }
    }
}
</script>
<style>
.nav_item{
    display: inline-block;
    margin-top: 10px;
    padding: 0;
}    
</style>
