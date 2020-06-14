<template>
    <div id="UserInfo">
        <div class="jumbotron container">
            <div class="head_info row">
                <div class="col-xs-4">
                    <img v-bind:src="user.photo" width="80" alt="head" class="img-circle">
                    <span>个人中心</span>
                </div>
                <div class="col-xs-8">
                    <h1 class="" style="border:1px solid">{{user.name}}</h1>
                </div>
            </div>
        </div>
        <div class="order_info container">
            <div class="page-header" @click="getOrder('all')">
                <h4>我的订单<small>></small></h4>
            </div>
            <div class="status_list row">
                <span class="status_item col-xs-2" @click="getOrder('unpaid')">
                    <i class="icon">
                        <svg class="svg_icon" viewBox="0 0 16 16" width="25" height="25">
                            <svg id="svg_icon_pay" viewBox="0 0 20 20" width="100%" height="100%">
                                <path d="M17.806 4.388h-11.346l9.762-2.916c.248-.069.503.084.567.342l.412 1.598h1.443l-.508-1.974c-.265-1.034-1.285-1.646-2.274-1.369l-14.274 4.263c-.713.2-1.213.81-1.34 1.52h.063c-.04.156-.069.317-.069.487v11.708c0 1.077.874 1.95 1.951 1.95h15.612c1.079 0 1.952-.873 1.952-1.95v-11.708c.001-1.078-.872-1.951-1.951-1.951zm.487 9.268h-3.902v-2.927h3.902v2.927zm0-4.39h-4.389c-.54 0-.977.438-.977.976v3.901c0 .539.437.976.977.976h4.389v2.928c0 .27-.219.487-.487.487h-15.613c-.269 0-.487-.218-.487-.487v-11.708c0-.269.219-.488.487-.488h15.612c.269 0 .487.219.487.488v2.927z"></path>
                            </svg>                        
                        </svg>
                    </i>
                    <span>待付款</span>
                </span>
                <span class="status_item col-xs-2" @click="getOrder('unshipped')">
                    <i class="icon">
                        <svg class="svg_icon" viewBox="0 0 16 16" width="25" height="25">
                            <svg id="svg_icon_ship" viewBox="0 0 20 20" width="100%" height="100%">
                                    <path d="M19.059 1.657h-18.117c-.527 0-.954.427-.954.954v3.813c0 .526.427.954.954.954v9.058c0 1.055.853 1.907 1.907 1.907h14.301c1.055 0 1.908-.853 1.908-1.907v-8.104h-1.432v8.104c0 .263-.213.477-.477.477h-14.3c-.263 0-.477-.214-.477-.477v-9.058h4.291v6.676l3.337-2.02v.005l3.338 1.941v-6.602h5.721c.527 0 .953-.427.953-.954v-3.813c0-.527-.426-.954-.953-.954zm-7.153 9.559l-1.906-.905v-.075l-1.907.95v-3.808h3.813v3.838zm6.676-5.268h-17.163v-2.86h17.163v2.86z"></path>
                            </svg>                       
                        </svg>
                    </i>
                    <span>待发货</span>
                </span>
                <span class="status_item col-xs-2" @click="getOrder('unreceived')">
                    <i class="icon">
                        <svg class="svg_icon" viewBox="0 0 16 16" width="25" height="25">
                            <svg id="svg_icon_shipped" viewBox="0 0 20 20" width="100%" height="100%">
                                    <path d="M17 8.75l-2.5-1v3.5h2.5v-2.5zm1.5-3l-4-1.5v1.5l4 1.5v7.5h-1.404c-.52-.896-1.486-1.5-2.596-1.5s-2.076.604-2.596 1.5h-4.308c-.52-.896-1.486-1.5-2.596-1.5s-2.076.604-2.595 1.5h-.905v-12.5h10v9h1.5v-9c0-.828-.672-1.5-1.5-1.5h-10c-.828 0-1.5.672-1.5 1.5v12.5c0 .828.672 1.5 1.5 1.5h.5c0 1.657 1.343 3 3 3s3-1.343 3-3h3.5c0 1.657 1.343 3 3 3s3-1.343 3-3h1c.828 0 1.5-.672 1.5-1.5v-7c0-1.229-.777-1.623-1.5-2zm-13.5 12c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm9.5 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"></path>
                            </svg>                     
                        </svg>
                    </i>
                    <span>待收货</span>
                </span>
                <span class="status_item col-xs-2" @click="getOrder('unrecommend')">
                    <i class="icon">
                        <svg class="svg_icon" viewBox="0 0 16 16" width="25" height="25">
                            <svg id="svg_icon_comment" viewBox="0 0 20 20" width="100%" height="100%">
                                    <path d="M6.75 7.002h6.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.5c-.414 0-.75.336-.75.75s.336.75.75.75zm11.25-6.5h-16c-1.105 0-2 .895-2 2v11c0 1.104.895 2 2 2h5.774l.947-1.5h-6.721c-.276 0-.5-.224-.5-.5v-11c0-.276.224-.5.5-.5h16c.275 0 .5.224.5.5v11c0 .276-.225.5-.5.5h-5.906l-.053.082c-.373-.17-.824-.043-1.035.304l-2.399 3.965c-.221.365-.09.832.293 1.043.383.211.872.086 1.093-.279l2.188-3.614h5.819c1.105 0 2-.896 2-2v-11c0-1.106-.895-2.001-2-2.001zm-11.25 9.999h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5c-.414 0-.75.336-.75.75 0 .415.336.75.75.75z"></path>
                            </svg>                     
                        </svg>
                    </i>
                    <span>待评价</span>
                </span>
                <span class="status_item col-xs-2" @click="getOrder('refund')">
                    <i class="icon">
                        <svg class="svg_icon" viewBox="0 0 16 16" width="25" height="25">
                            <svg id="svg_icon_aftermarket" viewBox="0 0 20 20" width="100%" height="100%">
                                    <path d="M12.433 9.757c.403 0 .73-.327.73-.73s-.327-.73-.73-.73h-.86l1.005-1.419c.202-.325.082-.742-.267-.93-.349-.188-.796-.077-.997.249l-1.315 1.854-1.314-1.854c-.202-.324-.648-.436-.997-.249-.35.188-.469.605-.268.93l1.008 1.419h-.861c-.403 0-.73.327-.73.73s.327.73.73.73h1.703v.973h-1.703c-.403 0-.73.327-.73.73s.327.729.73.729h1.703v1.808c0 .345.327.626.73.626s.73-.281.73-.626v-1.808h1.703c.403 0 .73-.326.73-.729s-.327-.73-.73-.73h-1.703v-.973h1.703zm3.389 6.047c-.273-.274-.718-.274-.992 0-.273.273-.273.718 0 .992l1.72 1.72h-5.577l-.243.044v-.082c-.242.021-.484.038-.73.038-4.704 0-8.516-3.813-8.516-8.516 0-4.703 3.812-8.516 8.516-8.516 4.703 0 8.516 3.813 8.516 8.516 0 1.357-.326 2.635-.891 3.773l1.054 1.135c.821-1.45 1.297-3.123 1.297-4.908 0-5.51-4.466-9.976-9.976-9.976s-9.976 4.466-9.976 9.976c0 5.509 4.466 9.976 9.976 9.976.246 0 .488-.019.73-.038v-.008l.243.046h6.813c.101 0 .197-.021.285-.057.242.077.517.028.709-.166.275-.273.275-.718 0-.992l-2.958-2.957z"></path>
                            </svg>                     
                        </svg>
                    </i>
                    <span>退款/售后</span>
                </span>                                                                
            </div>
            <div class="intro row">
                <ul class="list-group">
                    <li class="list-group-item" @click="editAddr">地址管理</li>
                    <li class="list-group-item" @click="customPhone">客服电话</li>
                    <li class="list-group-item" @click="getHelp">帮助</li>
                    <li class="list-group-item" @click="advice">投诉/建议</li>
                    <li class="list-group-item" @click="logout">退出登录</li>
                </ul>                
            </div>
        </div>
    </div>
</template>
<script>
import {removeStore} from '@/utils/storage'
import {userLogout} from '@/api/index'
export default {
    name: "UserInfo",
    data:function(){
        return {
            user:null
        }
    },
    created(){
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            this.user=JSON.parse(window.localStorage.user)
            console.log(this.user)
        },
        getOrder(tab){
            this.$router.push('/orderlist?tab='+tab)
        },
        logout(){
            userLogout().then((res)=>{
                console.log(res)
                removeStore('user')
                this.$router.push('/')
            })
        },
        editAddr(){
            this.$router.push('/addr')
        },
        customPhone(){
            alert("咨询电话：13924585383")
        },
        getHelp(){
            window.open('http://www.baidu.com')
        },
        advice(){
            console.log("不要点了，不接受投诉")
        }
    }
}
</script>

<style lang="scss" scoped>
#UserInfo{
    .page-header{
        margin-top: 0;
    }
    .status_list{
        margin-bottom: 20px;
    }
    .intro{
        margin-top: 40px;
    }
    span.status_item{
        display: inline-block;
        width: 20%;
    }
}
</style>


