<template>
    <div id="register">
        <div class="user_info container">
            <input type="text" id="account" placeholder="账号" v-model="user.account">
            <span class="message">{{message.account}}</span>
            <input type="password" id="password" placeholder="密码" v-model="user.password">
            <span class="message">{{message.pwd}}</span>
            <input type="text" id="name" placeholder="用户名" v-model="user.name">
            <span class="message">{{message.name}}</span>
            <input type="number" id="phone" placeholder="手机" v-model="user.phone">
            <span class="message">{{message.phone}}</span>
            <div class="btn_reg">
                <button class="btn btn-default btn-lg" @click="onSubmit">立即注册</button>
                <span>{{message.result}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import {userRegister} from '@/api/'
export default {
    data:function(){
        return {
            user:{
                account:'',
                password:'',
                name:'',
                phone:''
            },
            message:{
                account:'',
                pwd:'',
                name:'',
                phone:'',
                result:''
            }
        }
    },
    methods:{
        onSubmit(){
            let exc1=/^(_|[a-zA-Z])[\w]{4}/g
            let isAccount=exc1.test(this.user.account)
            let exc2=/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/g
            let isPassword=exc2.test(this.user.password)
            let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/img,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/img;
            let isName=Boolean
            if(regEn.test(this.user.name) || regCn.test(this.user.name)){
                isName=false
            }else{
                isName=true
            }
            let exc4=/\d{11}/g
            let isPhone=exc4.test(this.user.phone)
            if(!isAccount){
                this.message.account="账号不合法"
            }else{this.message.account=""}
            if(!isPassword){
                this.message.pwd="请输入至少6位包含字母数字的密码"
            }else{this.message.pwd=""}
            if(!isName){
                this.message.name="用户名不合法"
            }else{this.message.name=""}
            if(!isPhone){
                this.message.phone="请输入正确的手机号"
            }else{this.message.phone=""}
            if(isAccount&&isPassword&&isName&&isPhone){
                userRegister(this.user).then((res)=>{
                    if(res.errMessage){
                        this.message.account="用户名重复"
                    }
                    if(res.isSuccess){
                        this.message.result="注册成功"
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#register{
    .user_info{
        padding-top: 44px;
        input{
            width: 200px;
            height: 36px;
        }
        span{
            width: 200px;
            height: 2em;
            margin: auto;
        }
    }
    .btn_reg{
        padding-top: 1em;
    }
    .message{
        color: red;
    }
}
</style>

