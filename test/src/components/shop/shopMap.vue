<template>
	<div class="map">
		<div class="back"><span @click="back()"></span></div>
		<div id="allmap"></div>
	</div>
</template>
<script>
	export default{
		mounted(){
	        this.init()
	    },
		methods: {
			back(){
        this.$router.go(-1)
      },
			init(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
        map.enableScrollWheelZoom(true);

        // 用经纬度设置地图中心点
        var new_point = new BMap.Point(116.40387397,39.91488908);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);

        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : "海底捞王府井店" , // 信息窗口标题
          enableMessage:true,//设置允许信息窗发送短息
          message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        }
        var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,new_point); //开启信息窗口
			}
		}
	}


</script>
<style scoped lang="scss" type="text/scss">

	.map{
		width: 7.5rem;
		height: 13.34rem;
		position: relative;
		.back{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      position: fixed;
      left: .2rem;
      top: .3rem;
      width: .6rem;
      height: .6rem;
      z-index: 100;
      background: rgba(0,0,0,.5);
      text-align: center;
      border-radius: 1rem;
      span{
        display: inline-block;
        margin-top: .12rem;
        width: .34rem;
        height: .34rem;
        background: url("../../../static/images/common/back-write.png") no-repeat;
        background-size: .34rem .34rem;
      }

		}
		#allmap{
			width: 100%;
      height: 100%;
		}
	}
</style>
