<template>
  <div id="app">
    <router-view/>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import BottomNav from './components/bottomNav'
export default {
  name: 'App',
  components:{
    BottomNav
  }
}
</script>

<style lang="scss">
@media screen and (min-device-width:760px) {
  .container,.container-fluid{
  width: 480px;
}
}
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  span{
    display: block;
  }
}

</style>
