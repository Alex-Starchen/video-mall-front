<template>
    <div id="login">
        <div class="content">
            <div class="userInput container">
                <input type="text" id="account" placeholder="账号" v-model="user.account">
                <input type="password" id="password" placeholder="密码" v-model="user.password">
                <span>{{message}}</span>       
            </div>
            <div class="sign-in btn-group-lg container">
                <button class="btn btn-default" @click="signIn(user)">登录</button>
            </div>
            <div class="register btn-group-lg container">
                <button class="btn btn-default" @click="goRegister">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import {userLogin} from '@/api/index'
import {mapMutations} from 'vuex'
export default {
    data:function(){
        return {
            user:{
                account:'',
                password:''
            },
            message:''
        }
    },
    methods:{
        signIn(params){
            userLogin(params).then((res)=>{
                console.log(res)
                if(res.ret_code==0){
                    this.message=res.ret_msg
                    this.$store.commit('recordUser',res.data)
                    this.$router.push('/')
                }else if(res.ret_code==1){
                    this.message=res.ret_msg
                }
            })
        },
        goRegister(){
            this.$router.push('/register')
        }
    }
}
</script>

<style lang="scss">
#login{
    height: 400px;
    .userInput{
        padding-top: 100px;
        padding-bottom: 1em;
    }
    button{
        width: 100%;
    }
    input{
        height: 44px;
        width: 100%;
        text-align: center;
    }
}
</style>
