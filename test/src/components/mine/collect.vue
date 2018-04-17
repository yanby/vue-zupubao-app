<template>
  <div class="shopCollect">
    <h2><span @click="back()"></span><b>我的收藏</b><i v-if="yes===0" @click="compile()">编辑</i><i v-else-if="yes===1" @click="complete()">完成</i></h2>
    <!--<shopList :child-msg="yes"></shopList>-->
    <div class="detail">
      <ul>
        <li v-for="(item,index) in ids" :key="item.id" @click="go()">
          <div class="select" v-if="yes===1">
            <div class="check" @click.stop="xuan($event)"><input type="checkbox"></div>
          </div>
          <div class="wrap">
            <div class="img">
              <img src="../../../static/images/lookShop/shop.png" alt="">
            </div>
            <div class="msg">
              <h4>朝阳-双井 | 100m²</h4>
              <p>广平门黄平路平米商铺阿斯顿发撒旦的撒旦法</p>
              <div><span>临近地铁</span><span>可明火</span></div>
            </div>
            <div class="price" v-if="yes===0">{{item.id}}<span>万/月</span></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="delete" v-show="yes===1">删除</div>
  </div>
</template>

<script>
  import shopList from '@/components/shop/shopList.vue'
  export default {
    data(){
      return {
        yes: 0,
        select: 0,
        ids: [
          {id: 0.38},
          {id: 1.45},
          {id: 2.65},
          {id: 3.87}
        ]
      }
    },
    mounted(){

    },
    components:{
      shopList
    },
    methods:{
      go(){
        this.$router.push({path: "/shopDetail"})
      },
      back(){
        this.$router.go(-1);
      },
      compile(){
        this.yes = 1;
        this.select = 1;
        this.tab = 1;
      },
      complete(){
        this.yes = 0;
        this.select = 0;
        this.tab = 0;
      },
      xuan(e){
        console.log($(e.srcElement).prop("checked"))
        if($(e.srcElement).parent(".check").hasClass("cur")){
          $(e.srcElement).parent(".check").removeClass("cur")
        }else{
          this.tab = 3;
          $(e.srcElement).parent(".check").addClass("cur")
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/shopList.scss";
  .shopCollect{
    width: 7.5rem;
    margin: 0 auto;
    h2{
      position: fixed;
      top: 0;
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      background: #fff;
      z-index: 100;
      border-bottom: .01rem solid #eaeaea;
      span{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .3rem;
        width: .34rem;
        height: .34rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .34rem .34rem;
      }
      b{
        font-size: .34rem;
      }
      i{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        right: .2rem;
        top: 0;
        font-size: .3rem;
      }
    }
    .delete{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin: 0 auto;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #64AAFF;
      color: #fff;
      font-size: .34rem;
    }
  }
</style>
