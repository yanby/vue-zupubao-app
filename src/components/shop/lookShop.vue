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
            <!--<div> <router-link to="/shopMore">更多 <span></span></router-link></div>-->
          </div>

          <div class="list-content">
            <div class="modal" @click="modalHide()" ref="modal"></div>
            <ul class="one">
              <li class="oneList" v-show="tab===0">
                <ul class="two twoArea">
                  <li class="twoChild" v-for="(item,index) in area" ref="first"><span class="first" @click="quyuFun($event,item)">{{item.name}}</span>
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
                  <ul class="two twoYetai">
                    <li class="twoChild" v-for="(item,index) in yetai"><span class="first2" @click="yetaiFun($event,item)">{{item.name}}</span>
                      <ol class="three">
                        <li v-for="(item1,index1) in yetaiChild.childList" @click="yetaiChildFun($event,item1)">{{item1.childName}}</li>
                      </ol>
                    </li>
                  </ul>
                </ul>
              </li>
              <li class="oneList" v-show="tab===2">
                <ul class="four">
                  <li v-for="(item,index) in mianji" @click="mianjiFun($event,item)">{{item.name}}</li>
                </ul>
              </li>
              <li class="oneList" v-show="tab===3">
                <ul class="two twoPrice">
                  <li class="twoChild" v-for="(item,index) in price"><span class="first1" @click="priceFun($event,item)">{{item.name}}</span>
                    <ol class="three">
                      <li v-for="(item1,index1) in priceChild.childList" @click="priceChildFun($event,item1)">{{item1.childName}}</li>
                    </ol>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="shoplist" v-show="yes===1">
        <div class="detail" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <ul>
              <li v-for="(item,index) in shopMsg" @click="go(item.id)">
                <div class="wrap">
                  <div class="img">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="msg">
                    <h4>{{item.title}}</h4>
                    <p>{{item.shopName}}</p>
                    <div class="tags" v-if="item.shopTags"><span v-for="(item1,index1) in item.shopTags">{{item1}}</span></div>
                    <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="no" v-if="more">没有更多数据了...</div>
          </mt-loadmore>
        </div>
      </div>
      <div class="noOrder" v-show="yes===0">
        <dl>
          <dt>
            <img src="../../../static/images/mine/noOrders.png">
          </dt>
          <p>暂无信息</p>
        </dl>
      </div>
    </div>
</template>

<script>
  import qs from 'qs';
  export default {
    data() {
      return {
        yes: 1,
        num: 0,
        num1: 0,
        num2: 0,
        tab : "",
        val: "",
        area: "",
        next: "",
        areaChild:"",
        yetai: "",
        yetaiChild: "",
        mianji:"",
        price:"",
        priceChild:"",
        shopMsg: [],
        allLoaded: false,
        more: false,
        wrapperHeight: 0,
        search: "",
        screen: "", //筛选id
        screenKey: "",//筛选id
        key: ""
      };
    },
    created(){
      var that = this;
      this.screenKey = this.$route.query.screenKey;
      this.screen = this.$route.query.screen;

      this.search = this.$route.query.search;

      if(this.$route.query.search){
        var data = {
          search: this.search
        }
        this.$http.all([
          this.$http.post(this.changeData() + "/shop/getSearch",qs.stringify(data)),
          this.$http.post(this.changeData() + '/shop/getShopList')
        ]).then(this.$http.spread(function (resSearch, reaList) {
          // 上面两个请求都完成后，才执行这个回调方法
          that.shopMsg = resSearch.data.content;
          that.area = reaList.data.areas;
          that.yetai = reaList.data.shopBusinessTypes;
          that.mianji = reaList.data.mg;
          that.price = reaList.data.prices;
          that.next = reaList.data.next;
          })
        );
      }else if(this.$route.query.screenKey){
        if(this.screenKey == "businessCircleId"){
          var data1 = {
            businessCircleId : this.screen
          }
        }else if(this.screenKey == "businessTypeId"){
          var data1 = {
            businessTypeId : this.screen
          }
        }else if(this.screenKey == "areaId"){
          var data1 = {
            areaId : this.screen
          }
        }else if(this.screenKey == "priceId"){
          var data1 = {
            priceId : this.screen
          }
        }
        this.$http.post(this.changeData() + '/shop/getShopList',qs.stringify(data1)).then(function(res){
          console.log(res)
          this.shopMsg = res.data.content;
          this.area = res.data.areas;
          this.yetai = res.data.shopBusinessTypes;
          this.mianji = res.data.mg;
          this.price = res.data.prices;
          this.next = res.data.next;
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      }else{
        this.$http.post(this.changeData() + '/shop/getShopList').then(function(res){
          console.log(res)
          this.shopMsg = res.data.content;
          this.area = res.data.areas;
          this.yetai = res.data.shopBusinessTypes;
          this.mianji = res.data.mg;
          this.price = res.data.prices;
          this.next = res.data.next;
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      }
    },
    mounted() {

    },
    updated(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
      loadTop(){
        var that = this;
        setTimeout(function () {
          that.$http.post(that.changeData() + '/shop/getShopList').then(function(res){
            console.log(res)
            that.shopMsg = res.data.content;
            that.area = res.data.areas;
            that.yetai = res.data.shopBusinessTypes;
            that.mianji = res.data.mg;
            that.price = res.data.prices;
            that.next = res.data.next;
            that.$refs.loadmore.onTopLoaded();
          }.bind(that)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },2000)
      },
      loadBottom() {
        var that = this;
        var data = {
          next: this.next
        }
        if(this.next == null){
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
        }else{
          that.allLoaded = false;
          setTimeout(function () {
            that.$http.post(that.changeData() + '/shop/getUpLoadShopList',qs.stringify(data)).then(function(res){
              that.next = res.data.next;
              that.shopMsg = that.shopMsg.concat(res.data.content)
              that.$refs.loadmore.onBottomLoaded();
            }.bind(that)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          },2000)
        }
      },
      handleBottomChange(){
        var that = this;
        if(this.allLoaded == true){
          this.more = true;
          setTimeout(function () {
            that.more = false;
          },2000)
        }
      },
      go(id){
        // if(this.search){
        //   this.$router.push({path:"/shopDetail",query:{shopId: id,search: this.search}})
        // }else if(this.screenKey){
        if(this.key){
          this.$router.push({path:"/shopDetail",query:{shopId: id,screenKey: this.key,screen: this.screen,search: this.search}})
        }else{
          this.$router.push({path:"/shopDetail",query:{shopId: id,screenKey: this.screenKey,screen: this.screen,search: this.search}})
        }

        // }else{
        //   this.$router.push({path:"/shopDetail",query:{shopId: id}})
        // }
      },
      tab1(e){
       if($(e.srcElement).hasClass("cur")){
         this.tab = "";
         this.$refs.modal.style.display = "none";
       }else{
         this.tab = 0;
         this.$refs.modal.style.display = "block";
         if(this.num === 0){
           $(".twoArea li").eq(0).children(".first").click();
           this.num++;
         }
       }
      },
      tab2(e){
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 1;
          this.$refs.modal.style.display = "block";
          if(this.num2 === 0){
            $(".twoYetai li").eq(0).children(".first2").click();
            this.num2++;
          }
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
          if(this.num1 === 0){
            $(".twoPrice li").eq(0).children(".first1").click();
            this.num1++;
          }
        }
      },
      quyuFun(e,item){
        this.areaChild = item;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      quyuChildFun(e,item){
        var data = {
          businessCircleId: item.childId
        }
        this.key = "businessCircleId";
        this.screen = item.childId;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          console.log(res)
          if(res.data.code == 200){
            this.shopMsg = res.data.content;
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      yetaiFun(e,item){
        this.yetaiChild = item;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      yetaiChildFun(e,item){
        var data = {
          businessTypeId: item.childId
        }
        this.key = "businessTypeId";
        this.screen = item.childId;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          if(res.data.code == 200){
            this.shopMsg = res.data.content;
            console.log(res)
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      mianjiFun(e,item){
        var data = {
          areaId: item.id
        }
        this.key = "areaId";
        this.screen = item.id;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          if(res.data.code == 200){
            this.shopMsg = res.data.content;
            console.log(res)
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      priceFun(e,item){
        this.priceChild = item;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      priceChildFun(e,item){
        var data = {
          priceId: item.childId
        }
        this.key = "priceId";
        this.screen = item.childId;
        console.log(item.childId)
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          if(res.data.code == 200){
            this.shopMsg = res.data.content;
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
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
    .detail{
      padding-bottom: 1rem;
    }
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
            width: 25%;
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
          top: .01rem;
          ul.one{
            position: absolute;
            background: #fff;
            left: 0;
            top: 0rem;
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
                width: 7.5rem;
                overflow: auto;
                &>li{
                  margin-left: .7rem;
                  height: .78rem;
                  margin-right: .4rem;
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
    .noOrder{
      padding-top: 1.5rem;
      width: 7.5rem;
      .noOrderTop{
        height: .9rem;
        text-align: center;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        position: relative;
        h3{
          width: 75%;
          line-height: 1rem;
          font-size: 0.36rem;
          color: #333;
          float: left;
          text-align: center;
        }
        i{
          display: inline-block;
          width: 13%;
          height: 1rem;
          line-height: 1rem;
          float: left;
          img{
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
      dl{
        width: 7.5rem;
        /*height: 6rem;*/
        /*background: pink;*/
        text-align: center;
        dt{
          /*width: 3rem;
          height: 3rem;*/
          /*background: red;*/
          margin-top: 1.4rem;
          img{
            width: 3rem;
            height: 3rem;
          }
        }
        p{
          font-size: .28rem;
          color: #898989;
          margin-top: .38rem;
          margin-bottom: .5rem;
        }
        dd{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          span{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: inline-block;
            width: 3rem;
            height: .89rem;
            background: #47abff;
            line-height: .89rem;
            color: #fff;
            font-size: .34rem;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
