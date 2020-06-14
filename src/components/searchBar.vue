<template>
    <div class="search_bar row">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for..." v-model="msg">
            <div class="input-group-btn">
                <button class="btn btn-default" type="button">搜索</button>
            </div>
        </div>  
    </div>        
</template>
<script>
let _ = require('lodash')
export default {
    data: ()=>{
        return {
            msg:'',
            hint:'',
        }
    },
    watch:{
        msg: ()=>{
            this.hint=""
        }
    },
    methods:{
        getHint:()=>{
            Vue.axios.get('/api')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
