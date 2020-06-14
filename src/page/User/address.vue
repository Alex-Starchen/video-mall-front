<template>
    <div id="address" class="container navbar-default">
        <div class="user_addr" v-for="(item,n) in addressList" :key="n" v-show="!editing">
            <div class="address" style="padding-top:10px;" v-bind:class="isDefault(n)?'default':'not_default'">
                <div class="row">
                    <div class="name col-xs-4">
                        <span>收货人：</span>
                        <span>{{item.name}}</span>
                    </div>
                    <div class="phone col-xs-6">
                        <span>手机号码：</span>
                        <span>{{item.phone}}</span>
                    </div>
                    <button class="edit_icon col-xs-2" @click="editAddr(n)">编辑</button>
                </div>
                <div class="row">
                    <div class="detail col-xs-12">
                        <span>收货地址：</span>
                        <span>{{item.region+item.details}}</span>
                    </div>                    
                </div>
            </div>
        </div>
        <div v-show="!editing" @click="createAddr">
            <ul class="list-group">
                <li class="list-group-item">
                    <span>添加地址</span>
                </li>
            </ul>
        </div>
        <div v-show="editing" class="edit_addr">
            <ul class="list-group" style="text-align:left;">
                <li class="list-group-item row">
                    <span class="pre_text col-xs-3">收货人：</span>
                    <span class="col-xs-9">
                        <input type="text" v-model="address.name">
                    </span>
                </li>
                <li class="list-group-item row">
                    <span class="pre_text col-xs-3">手机号码：</span>
                    <span class="col-xs-9">
                        <input type="text" v-model="address.phone">
                    </span>
                </li>
                <li class="list-group-item row">
                    <span class="pre_text col-xs-3">所在地区：</span>
                    <span class="col-xs-9">
                        <input type="text" v-model="address.region">
                    </span>
                </li>
                <li class="list-group-item row">
                    <textarea name="addr_detail" cols="30" rows="5" placeholder="详细地址" v-model="address.details"></textarea>
                </li>
                <li class="list-group-item row">
                    <span v-if="address.default">默认地址</span>
                    <button class="pull-right btn" @click="setDefault()">设为默认</button>
                </li>
                <li class="list-group-item row">
                    <span style="color:red;">{{message}}</span>
                </li>
            </ul>
            <div class="row">
                <ul class="list-group">
                    <li class="list-group-item" @click="saveAddr(curEdit)">
                        <span>保存</span>
                    </li>
                    <li class="list-group-item" @click="deleteAddr(curEdit)">
                        <span>删除</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            addressList:[],
            address:{
                name:'',
                phone:'',
                region:'',
                details:'',
                default:false
            },
            editing:false,
            curEdit:'',
            message:''
        }
    },
    created(){
        this.getAddress()
    },
    methods:{
        //初始化获取地址列表
        getAddress(){
            this.addressList=JSON.parse(this.$store.state.userInfo.addressList)
        },
        //编辑地址
        editAddr(i){
            this.editing=true
            this.curEdit=i
            this.address=Object.assign({},this.addressList[i])
        },
        //删除地址
        deleteAddr(i){
            this.addressList.splice(i,1)
            this.$store.commit('updateAddr',this.addressList)
            this.editing=false
        },        
        //保存地址
        saveAddr(i){
            if(this.address.name&&this.address.phone&&this.address.region&&this.address.details){
                //若当前地址设置为默认地址
                if(this.address.default==true&&this.addressList){
                    for(let i=0;i<this.addressList.length;i++){
                        //则取消原来的默认地址
                        if(this.addressList[i].default==true){
                            this.addressList[i].default=false
                        }
                    }
                }
                //回到展示页面
                this.editing=false
                //地址列表为空时定义为数组
                if(this.addressList===null){
                    this.addressList=[]
                }
                //修改地址,记住对象赋值不要用=号
                this.addressList[i]=Object.assign({},this.address)
                this.$store.commit('updateAddr',this.addressList)
            }else{
                this.message="请填写完整的信息"            
            }
        },
        //添加地址
        createAddr(){
            this.address.name=''
            this.address.phone=''
            this.address.region=''
            this.address.details=''
            this.editing=true
            if(this.addressList){
                this.curEdit=this.addressList.length
            }
        },
        //设置默认地址
        setDefault(){
            //切换默认地址
            this.address.default=!this.address.default
        },
        //判断默认地址
        isDefault(i){
            return this.addressList[i].default            
        }
    }
}
</script>

<style lang="scss">
#address{
    span{
        display: inline;
    }
    .address{
        margin-bottom: 10px;
        text-align: left;
        .row{
            margin-bottom: 0.2em;
        }
    }
    .edit_addr{
        span{
            display: inline-block;
        }
        input{
            width: 100%;
        }
        textarea{
            width: 100%;
        }
        .pre_text{
            padding:0;
        }
    }
    .default{
        border-bottom: 1px solid red;
    }
}
</style>
