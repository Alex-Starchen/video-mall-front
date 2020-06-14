<template>
  <div id="home" class="container-fluid">
    <search-bar></search-bar>
    <carousel></carousel>
    <nav-list></nav-list>
    <shelfs v-bind:key="i" v-for="(item,i) in goodsRes" v-bind:goodsList="item">{{titles[i]}}</shelfs>
  </div>
</template>

<script>
import navList from './navList'
import shelfs from './shelfs'
import carousel from './carousel'
import searchBar from '@/components/searchBar'
import {goodsInfo} from '@/api/index'
export default {
  name: 'Home',
  components:{
    navList,
    shelfs,
    carousel,
    searchBar
  },
  data:function(){
    return {
      goodsId:[
        [20000938,10000976,20000840],
        [20001022,20001252,20001250],
        [10000496,20001294,20001022],
        [20000955,20001255,20000110],
        [20000889,20000771,20000905]
      ],
      titles:["新品首发","热销单品","数码科技","生活家居","手办玩具"],
      goodsRes:[]
    }
  },
  created(){
    for (let i=0;i<this.goodsId.length;i++){
      this.getProInfo(this.goodsId[i])
    }
  },
  methods:{
    getProInfo(prodIds){
      let req=prodIds
      goodsInfo(req).then((res)=>{
        this.goodsRes.push(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
img{
  margin: auto;
}
#home{
  box-sizing: border-box;
  padding-bottom: 60px;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  word-break: keep-all;
}
</style>
