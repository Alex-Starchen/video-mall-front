<template>
    <div id="myCarousel" class="carousel slide row">
      <!-- 轮播（Carousel）指标 -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>   
      <!-- 轮播（Carousel）项目 -->
      <div class="carousel-inner"> 
        <div class="item active">
          <img src="http://puui.qpic.cn/vmall/0/3_186428585_1553235792432/750_20000" alt="First slide">
        </div>
        <div class="item">
          <img src="http://puui.qpic.cn/vmall/0/3_1054889754_1553845434851/750_20000" alt="Second slide">
        </div>
        <div class="item">
          <img src="http://puui.qpic.cn/vmall/0/3_186428585_1552989518801/750_20000" alt="Third slide">
        </div>
      </div>
      <!-- 轮播（Carousel）导航 -->
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>    
</template>

<script>
export default {
  name: "carousel",
  data () {
    return {
      msg1: 'Welcome to Vue-mall',
      msg2: 'There are some pictures',
      msg3: 'Slide to check'
    }
  },
}
</script>
<style lang="scss" scoped>
.carousel-caption{
  color: royalblue;
  font-size: 1.5em;
  top:50%;
  transform: translateY(-50%);
}
ol.carousel-indicators{
  bottom: 0;
}
.carousel-indicators li{
  background-color: white;
  border-color: aquamarine;
}
.carousel-control.right,.carousel-control.left{
  background-image:none;
}
</style>

