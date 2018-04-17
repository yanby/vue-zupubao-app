<template>
    <div class="lookShop">
      <div class="title">
        <h2>商铺 <router-link to="/search"></router-link></h2>
        <div class="shaixuan">
          <div class="list">
            <div @click="tab1($event)" :class="{'cur':tab===0}">区域 <span></span></div>
            <div @click="tab2($event)" :class="{'cur':tab===1}">业态 <span></span></div>
            <div @click="tab3($event)" :class="{'cur':tab===2}">面积 <span></span></div>
            <div @click="tab4($event)" :class="{'cur':tab===3}">价格 <span></span></div>
            <div> <router-link to="/shopMore">更多 <span></span></router-link></div>
          </div>

          <div class="list-content">
            <div class="modal" @click="modalHide()" ref="modal"></div>
            <ul class="one">
              <li class="oneList" v-show="tab===0">
                <ul class="two">
                  <li class="twoChild" v-for="(item,index) in area"><span @click="quyuFun($event,item)">{{item.area_name}}</span>
                    <ol class="three">
                      <li v-for="(item1,index1) in areaChild.childList" @click="quyuChildFun($event,item1)">{{item1.childName}}</li>
                    </ol>
                  </li>
                </ul>
                <!--<div class="btn">-->
                  <!--<div><span @click="clean()">清除</span></div>-->
                  <!--<div><span>确定</span></div>-->
                <!--</div>-->
              </li>
              <li class="oneList" v-show="tab===1">
                <ul class="four">
                  <li v-for="(item,index) in yetai" @click="yetaiFun($event)">{{item}}</li>
                </ul>
              </li>
              <li class="oneList" v-show="tab===2">
                <ul class="four">
                  <li v-for="(item,index) in mianji" @click="mianjiFun($event)">{{item}}</li>
                </ul>
              </li>
              <li class="oneList" v-show="tab===3">
                <ul class="two">
                  <li class="twoChild" v-for="(item,index) in price" @click="priceFun($event)"><span>{{item}}</span>
                    <ol class="three">
                      <li v-for="(item,index) in priceChild" @click="priceChildFun($event)">{{item}}</li>
                    </ol>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="shoplist">
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
          <div class="detail">
            <ul>
              <li v-for="(item,index) in shopMsg" @click="go(item.shopId)">
                <div class="wrap">
                  <div class="img">
                    <img :src="item.shopImgUrl" alt="">
                  </div>
                  <div class="msg">
                    <h4>{{item.shopName}}</h4>
                    <p>{{item.shopAddress}}</p>
                    <div class="tags" v-if="item.shopTags"><span v-for="(item1,index1) in item.shopTags">{{item1.tag}}</span></div>
                    <div class="price">{{item.shopMonery}}<span>{{item.shopMoneryUnit}}</span></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tab : "",
        area: "",
        areaChild: 0,
        yetai: ["全部","餐饮行业"],
        mianji:["1000m²","5000m²"],
        price:["日租金","月租金"],
        priceChild:["1000万以上","800-1000万"],
        shopMsg: "",
      };
    },
    mounted(){
      this.init();
    },
    methods: {
      go(){
        this.$router.push({path:"/shopDetail"})
      },
      init(){
        // this.$http.post("/api/upzl-android-home2").then(function(res){
        //   console.log(res)
        //   this.shopMsg = res.data.data.home_shoplist;
        //
        // }.bind(this)).catch(function(err){
        //   console.log("商店列表页面错误：",err)
        // })
        // this.$http.post("/api/youpu/erji").then(function(res){
        //   console.log(res)
        //   this.area = res.data;
        //
        // }.bind(this)).catch(function(err){
        //   console.log("商店列表页面错误：",err)
        // })
        var that = this;
        this.$http.all([
          that.$http.post('/api/upzl-android-home2'),
          that.$http.post('/api/youpu/erji')
        ]).then(that.$http.spread((shopList, filter) => {
          // 上面两个请求都完成后，才执行这个回调方法
          that.shopMsg = shopList.data.data.home_shoplist;
          that.area = filter.data;
        }));
      },
      loadBottom(){
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      tab1(e){
        // var data = {
        //   id: e
        // }
        // this.$http.post(loginUrl,$qs.stringify(data)).then(function(res){
        //   console.log(res)
        //
        // }.bind(this)).catch(function(err){
        //   console.log("会员页面错误：",err)
        // })
       if($(e.srcElement).hasClass("cur")){
         this.tab = "";
         this.$refs.modal.style.display = "none";
       }else{
         this.tab = 0;
         this.$refs.modal.style.display = "block";
       }
      },
      tab2(e){
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 1;
          this.$refs.modal.style.display = "block";
        }
      },
      tab3(e){
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 2;
          this.$refs.modal.style.display = "block";
        }
      },
      tab4(e){
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 3;
          this.$refs.modal.style.display = "block";
        }
      },
      quyuFun(e,item){
        this.areaChild = item;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      quyuChildFun(e,item){
        var data = {
          id: this.areaChild.id,
          childId: item.childId
        }
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
      },
      yetaiFun(e){
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
      },
      mianjiFun(e){
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
      },
      priceFun(e){
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      priceChildFun(e){
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
      },
      clean(){
        this.$router.go(0);
      },
      modalHide(){
        this.tab = "";
        this.$refs.modal.style.display = "none";
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "../../../static/css/shopList.scss";
  .lookShop{
    width:7.5rem;
    margin: 0 auto;
    .title{
      position: fixed;
      /*left: 0;*/
      top: 0;
      z-index: 2000;
      h2{
        text-align: center;
        font-size: .34rem;
        height: .9rem;
        line-height: .9rem;
        color: #333;
        font-weight:bold;
        position: relative;
        background: #fff;
        a{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          position: absolute;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/common/search.png") no-repeat;
          background-size: .36rem .36rem;
          top: .25rem;
          right: .3rem;
        }
      }
      .shaixuan{
        position: relative;
        width: 7.5rem;
        height: .81rem;
        z-index: 11;
        background: #fff;
        .list{
          width: 7.5rem;
          height: .81rem;
          display: flex;
          background: #fff;
          div{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 20%;
            height: .8rem;
            line-height: .8rem;
            font-size: .24rem;
            justify-content: space-around;
            text-align: center;
            background: #fff;
            border-bottom: .01rem solid #eaeaea;
            &.cur{
              span{
                background: url("../../../static/images/lookShop/up.png") no-repeat;
                background-size: .14rem .1rem;
              }
            }
            span{
              display: inline-block;
              width: .14rem;
              height: .1rem;
              background: url("../../../static/images/lookShop/down.png") no-repeat;
              background-size: .14rem .1rem;
              vertical-align: middle;
            }
          }
        }
        .list-content{
          position: relative;
          ul.one{
            position: absolute;
            background: #fff;
            left: 0;
            top: 0;
            z-index:2;
            overflow: hidden;
            .oneList{
              width: 7.5rem;
              height: 5rem;
              border-bottom: .01rem solid #eaeaea;
              .btn{
                width: 7.5rem;
                height: .88rem;
                background: #fff;
                position: absolute;
                left: 0;
                bottom: 0;
                border-top: 0.01rem solid #eaeaea;
                display: flex;
                justify-content: space-around;
                align-items: center;
                div:nth-of-type(1){
                  width: 50%;
                  text-align: center;
                  span{
                    display: inline-block;
                    width: 3rem;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: center;
                    font-size: .3rem;
                    background: #aaa;
                    color: #fff;
                    border-radius: .05rem;
                  }
                }
                div:nth-of-type(2){
                  width: 50%;
                  text-align: center;
                  span{
                    display: inline-block;
                    width: 3rem;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: center;
                    font-size: .3rem;
                    background: #7bb5ff;
                    color: #fff;
                    border-radius: .05rem;
                  }
                }
              }
              .two{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                background: #fff;
                width: 1.36rem;
                height: 5rem;
                padding: 0 0.44rem 0 .7rem;
                border-right: .01rem solid #eaeaea;
                overflow: scroll;
                .twoChild{
                  height: .78rem;
                  line-height: .78rem;
                  font-size: .26rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    span{
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                      color: #7bb5ff;
                      border-bottom: .01rem solid #7bb5ff;
                    }
                  }
                  .three{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    background: #fff;
                    width: 4.29rem;
                    height: 5rem;
                    padding-left: .7rem;
                    position: absolute;
                    left: 2.5rem;
                    top: 0;
                    background: #f7f8fa;
                    overflow: scroll;
                    li{
                      height: .78rem;
                      line-height: .78rem;
                      font-size: .26rem;
                      &.cur{
                        color: #7bb5ff;
                      }
                    }
                  }
                }
              }

              .four{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                background: #fff;
                height: 5rem;
                width: 7.1rem;
                padding: 0 .2rem;
                &>li{
                  padding-left: .2rem;
                  height: .78rem;
                  line-height: .78rem;
                  font-size: .26rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    color: #7bb5ff;
                    border-bottom: .01rem solid #7bb5ff;
                  }
                }
              }
            }
          }
        }
      }
    }
    .modal{
        width: 7.5rem;
        height: 13.34rem;
        /*margin: 0 auto;*/
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
        background: rgba(0,0,0,.3);
      }
    .shoplist{
      padding-top: 1.71rem;
    }
  }
</style>
