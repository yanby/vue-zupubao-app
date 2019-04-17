<template>
<div class="map">
	<div class="back" @click.stop="back()">
        <!-- <div class="wrap"> 
            <span></span>
        </div> -->
    </div>
    <iframe class="iframe" name="iframe" :src="gnote" frameborder="0" scrolling="auto"></iframe>
</div>
</template>
<script>
  export default{
	data(){
	    return{
        gnote: "",
        lng: "",
        lat: "",
        areaName: "",
        road: "",
        realAddress: "",
        shopId:"",
        shopOther: "",
        collect: "",
        shopName: "",
    }
  },
  mounted(){
	$(".iframe").height($(window).height());
    this.collect = this.$route.query.collect;
    this.shopOther = this.$route.query.shopOther;
    this.shopId = this.$route.query.shopId;
    this.lng = this.$route.query.lng;
    this.lat = this.$route.query.lat;
    this.areaName = this.$route.query.areaName;
    this.road = this.$route.query.road;
    this.realAddress = this.$route.query.realAddress;
    this.gnote = "http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title="+this.areaName+"-"+this.road+"&content="+this.areaName+this.road+this.realAddress+"&output=html&src=zupubao";
  },
  methods: {
	back(){
        this.$router.push({path:"/shopDetail",query:{shopMap:1,shopId:this.shopId,shopOther:this.shopOther,collectOther:this.collect}})
    }
  }
}


</script>
<style scoped lang="scss" type="text/scss">
.map{
	width: 7.5rem;
	position: relative;
	.back{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: fixed;
        left: 0rem;
        top: 0rem;
        width: 1rem;
        height: 1rem;
        z-index: 99999;
        background: transparent;
        text-align: center;
        .wrap{
            position: absolute;
            left: .2rem;
            top: .2rem;
            width: .6rem;
            height: .6rem;
            border-radius: 1rem;
            background: rgba(0,0,0,.5);
            span{
              display: inline-block;
              margin-top: .12rem;
              width: .34rem;
              height: .34rem;
              background: url("../../../static/images/common/back-write.png") no-repeat;
              background-size: .34rem .34rem;
            }
        }
	}
	.iframe{
      width: 7.5rem;
    }
}
</style>
