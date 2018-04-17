<template>
  <div class="detail">
    <ul>
      <li v-for="(item,index) in ids" :key="item.id" @click="go()">
        <div class="wrap">
          <div class="img">
            <img src="../../../static/images/lookShop/shop.png" alt="">
          </div>
          <div class="msg">
            <h4>朝阳-双井 | 100m²</h4>
            <p>广平门黄平路平米商铺阿斯顿发撒旦的撒旦法</p>
            <div><span>临近地铁</span><span>可明火</span></div>
          </div>
          <div class="price">{{item.id}}<span>万/月</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          ids:[
            {id:0.38},
            {id:1.45},
            {id:2.65},
            {id:3.87}
          ],
          tab: false
        }
      },
      props: ['childMsg'],
      methods:{
        go(){
          this.$router.push({path:"/shopDetail"})
        },
        xuan(e){
          if($(e.srcElement).hasClass("cur")){
            $(e.srcElement).removeClass("cur")
          }else{
            this.tab = 3;
            $(e.srcElement).addClass("cur")
          }
        }
      }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/shopList.scss";
  .detail{
    padding-top: 0;
  }
</style>
