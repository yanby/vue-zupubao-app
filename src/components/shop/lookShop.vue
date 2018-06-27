<template>
    <div class="lookShop">
      <div class="backTop" @click.stop="backTopFun()"></div>
      <div class="title">
        <div class="grayNab">
          <dl class="grayNab_left" @click="goSearch()">
            <h5><span>北京</span></h5>
            <dt><img src="../../../static/images/home/search2.png"></dt>
            <dd>区域/商圈/业态/商铺编号</dd>
          </dl>
        </div>
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
        <!--<div class="detail" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">-->
        <div class="detail" ref="wrapper">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <ul>
              <li v-for="(item,index) in shopMsg" @click="go(item.id,index)">
                <div class="wrap" v-if="index!=3 && index!=9">
                  <div class="img">
                    <img :src="item.img" alt="" :onerror="defaultImg">
                  </div>
                  <div class="msg">
                    <h4>{{item.title}}</h4>
                    <p>{{item.shopName}}</p>
                    <div class="tags" v-if="item.shopTags"><span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span></div>
                    <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
                  </div>
                </div>
                <div class="wrap" v-if="index===9" @click.stop="zhuanFun()">
                    <img src="../../../static/images/lookShop/zhuan.png" alt="" style="width: 7.09rem;height: 1.93rem;">
                </div>
                <div class="wrap" v-if="index===3" @click.stop="zhaoFun()">
                    <img src="../../../static/images/lookShop/zhao.png" alt="" style="width: 7.09rem;height: 1.93rem;">
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
      <div class="shopWrite" v-show="shopMsg.length > 4"></div>
    </div>
</template>

<script>
  import qs from 'qs';
  import { Indicator } from 'mint-ui';
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
        key: "",
        quyuID: "",
        yetaiID: "",
        mianjiID: "",
        jiageID: "",
        nextSearch: "",
        homeMore: "",//首页查看更多
        defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"'
      };
    },
    beforeRouteLeave(to,from,next){
      let position = $(window).scrollTop();
      localStorage.setItem("scrollTop",position);
      if(to.path == "/shopDetail"){
        if(!from.meta.keepAlive){
          from.meta.keepAlive = true;
        }
        next();
      }else{
        from.meta.keepAlive = false;
        to.meta.keepAlive = false;
        next();
        window.location.reload()
      }
    },
    created(){
      this.init();
    },
    mounted() {

      this.screenKey = this.$route.query.screenKey;
      this.screen = this.$route.query.screen;
      this.search = this.$route.query.search;
      this.homeMore = this.$route.params.more;
      console.log(this.homeMore)

      if(this.search){
        var data = {
          search: this.search
        }
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        setTimeout(function () {
          Indicator.close();
        },2000)
         this.$http.post(this.changeData() + '/shop/getSearch',qs.stringify(data)).then(function(res){
        //this.$http.post('http://192.168.1.157:8200/shop/getSearch',qs.stringify(data)).then(function(res){
          //console.log(res)
          this.shopMsg = res.data.content;
          this.nextSearch = res.data.next;
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      }else if(this.homeMore){
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        setTimeout(function () {
          Indicator.close();
        },2000)
      }
      // else if(this.$route.query.screenKey){
      //   if(this.screenKey == "businessCircleId"){
      //     this.quyuID = this.screen;
      //     var data1 = {
      //       businessCircleId : this.quyuID
      //     }
      //   }else if(this.screenKey == "businessTypeId"){
      //     this.yetaiID = this.screen;
      //     var data1 = {
      //       businessTypeId : this.screen
      //     }
      //   }else if(this.screenKey == "areaId"){
      //     this.mianjiID = this.screen;
      //     var data1 = {
      //       areaId : this.screen
      //     }
      //   }else if(this.screenKey == "priceId"){
      //     this.jiageID = this.screen;
      //     var data1 = {
      //       priceId : this.screen
      //     }
      //   }
      //   this.$http.post(this.changeData() + '/shop/getShopList',qs.stringify(data1)).then(function(res){
      //     // console.log(res)
      //     this.shopMsg = res.data.content;
      //     this.next = res.data.next;
      //   }.bind(this)).catch(function(err){
      //     console.log("商店列表页面错误：",err)
      //   })
      // }

    },
    updated(){
      // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
      errFun(){
        this.src = ""
      },
      zhuanFun(){
        this.$router.push({path:"/turnShop"})
      },
      zhaoFun(){
        this.$router.push({path:"/seekShop"})
      },
      goSearch(){
        this.$router.push({path:"/search"})
      },
      backTopFun(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      init(){
        if(this.homeMore){
          Indicator.open({
            text: '',
            spinnerType: 'fading-circle'
          });
          setTimeout(function () {
            Indicator.close();
          },2000)
        }
        this.$http.post(this.changeData() + '/shop/getShopList').then(function(res){
          console.log(res)
          if(this.screenKey == null && this.search == null){
            this.shopMsg = res.data.content;
          }

          this.area = res.data.areas;
          this.yetai = res.data.shopBusinessTypes;
          this.mianji = res.data.mg;
          this.price = res.data.prices;
          this.next = res.data.next;

        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      loadTop(){//下拉刷新
        $(".shoplist ul li").removeClass("cur");
        var that = this;
        if(this.search){
          var data = {
            search : this.search,
            next: this.nextSearch
          }
          if(this.next == null){
            this.allLoaded = true;
            // this.$refs.loadmore.onTopLoaded();
          }else{
            that.allLoaded = false;
            setTimeout(function () {
              that.$http.post(that.changeData() + '/shop/getSearch',qs.stringify(data)).then(function(res){
                //that.$http.post('http://192.168.1.157:8200/shop/getSearch',qs.stringify(data)).then(function(res){
                that.nextSearch = res.data.next;
                //console.log(res.data.content)
                that.shopMsg = that.shopMsg.concat(res.data.content)
                that.$refs.loadmore.onTopLoaded();
              }.bind(that)).catch(function(err){
                console.log("商店列表页面错误：",err)
              })
            },2000)
          }
        }else{
          var data = {
            businessCircleId : this.quyuID,
            businessTypeId : this.yetaiID,
            areaId : this.mianjiID,
            priceId : this.jiageID,
            search: this.search
          }
          if(this.next == null){
            this.allLoaded = true;
            // this.$refs.loadmore.onTopLoaded();
          }else {
            that.allLoaded = false;
            setTimeout(function () {
              that.$http.post(that.changeData() + '/shop/getShopList', qs.stringify(data)).then(function (res) {
                //console.log(res)
                that.shopMsg = res.data.content;
                that.area = res.data.areas;
                that.yetai = res.data.shopBusinessTypes;
                that.mianji = res.data.mg;
                that.price = res.data.prices;
                that.next = res.data.next;
                that.$refs.loadmore.onTopLoaded();
              }.bind(that)).catch(function (err) {
                console.log("商店列表页面错误：", err)
              })
            }, 2000)
          }
        }
      },
      loadBottom() {//上拉加载
        var that = this;
        if(this.search){
          var data = {
            search : this.search,
            next: this.nextSearch
          }
          if(this.next == null){
            this.allLoaded = true;
            // this.$refs.loadmore.onBottomLoaded();
          }else{
            that.allLoaded = false;
            setTimeout(function () {
              that.$http.post(that.changeData() + '/shop/getSearch',qs.stringify(data)).then(function(res){
              //that.$http.post('http://192.168.1.157:8200/shop/getSearch',qs.stringify(data)).then(function(res){
                that.nextSearch = res.data.next;
                //console.log(res.data.content)
                that.shopMsg = that.shopMsg.concat(res.data.content)
                that.$refs.loadmore.onBottomLoaded();
              }.bind(that)).catch(function(err){
                console.log("商店列表页面错误：",err)
              })
            },2000)
          }
        }else{
          var data = {
            businessCircleId : this.quyuID,
            businessTypeId : this.yetaiID,
            areaId : this.mianjiID,
            priceId : this.jiageID,
            next: this.next
          }
          if(this.next == null){
            this.allLoaded = true;
            // this.$refs.loadmore.onBottomLoaded();
          }else{
            that.allLoaded = false;
            setTimeout(function () {
              that.$http.post(that.changeData() + '/shop/getShopList',qs.stringify(data)).then(function(res){
                that.next = res.data.next;
                that.shopMsg = that.shopMsg.concat(res.data.content)
                that.$refs.loadmore.onBottomLoaded();
              }.bind(that)).catch(function(err){
                console.log("商店列表页面错误：",err)
              })
            },2000)
          }
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
      go(id,index){
          $(".shoplist ul li").eq(index).addClass("cur");
          this.$router.push({path:"/shopDetail",query:{shopId: id}})

        // if(this.key){
        //   this.$router.push({path:"/shopDetail",query:{shopId: id,screenKey: this.key,screen: this.screen,search: this.search}})
        // }else{
        //   this.$router.push({path:"/shopDetail",query:{shopId: id,screenKey: this.screenKey,screen: this.screen,search: this.search}})
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
        this.key = "businessCircleId";
        this.quyuID = item.childId;
        this.screen = item.childId;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        var data = {
          businessCircleId : this.quyuID,
          businessTypeId : this.yetaiID,
          areaId : this.mianjiID,
          priceId : this.jiageID,
          next: this.next
        }
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          $(".shoplist ul li").removeClass("cur");
          Indicator.open({
            text: '',
            spinnerType: 'fading-circle'
          });
          setTimeout(function () {
            Indicator.close();
          },2000)
          //console.log(res)
          if(res.data.code == 200){
            this.shopMsg = res.data.content;
            this.next = res.data.next;
            // this.quyuID = "";
            // this.yetaiID = "";
            // this.mianjiID = "";
            // this.jiageID = "";
            // this.search = "";
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
            window.scrollTo(0, 0);
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
        this.key = "businessTypeId";
        this.yetaiID = item.childId;
        this.screen = item.childId;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        var data = {
          businessCircleId : this.quyuID,
          businessTypeId : this.yetaiID,
          areaId : this.mianjiID,
          priceId : this.jiageID,
          next: this.next
        }
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          $(".shoplist ul li").removeClass("cur");
          if(res.data.code == 200){
            console.log(res)

            Indicator.open({
              text: '',
              spinnerType: 'fading-circle'
            });
            setTimeout(function () {
              Indicator.close();
            },2000)

            this.shopMsg = res.data.content;
            this.next = res.data.next;
            // this.quyuID = "";
            // this.yetaiID = "";
            // this.mianjiID = "";
            // this.jiageID = "";
            // this.search = "";
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
            window.scrollTo(0, 0);
          }
        }.bind(this)).catch(function(err){
          //console.log("商店列表页面错误：",err)
        })
      },
      mianjiFun(e,item){
        this.key = "areaId";
        this.mianjiID = item.id;
        this.screen = item.id;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        var data = {
          businessCircleId : this.quyuID,
          businessTypeId : this.yetaiID,
          areaId : this.mianjiID,
          priceId : this.jiageID,
          next: this.next
        }
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          $(".shoplist ul li").removeClass("cur");
          if(res.data.code == 200){
            Indicator.open({
              text: '',
              spinnerType: 'fading-circle'
            });
            setTimeout(function () {
              Indicator.close();
            },2000)
            this.shopMsg = res.data.content;
            this.next = res.data.next;
            // this.quyuID = "";
            // this.yetaiID = "";
            // this.mianjiID = "";
            // this.jiageID = "";
            // this.search = "";
            console.log(res)
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
          window.scrollTo(0, 0);
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      priceFun(e,item){
        this.priceChild = item;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
      },
      priceChildFun(e,item){
        this.key = "priceId";
        this.jiageID = item.childId;
        this.screen = item.childId;
        //console.log(item.childId)
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        var data = {
          businessCircleId : this.quyuID,
          businessTypeId : this.yetaiID,
          areaId : this.mianjiID,
          priceId : this.jiageID,
          next: this.next
        }
        this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
          if(res.data.code == 200){
            Indicator.open({
              text: '',
              spinnerType: 'fading-circle'
            });
            setTimeout(function () {
              Indicator.close();
            },2000)
            $(".shoplist ul li").removeClass("cur");
            this.shopMsg = res.data.content;
            // this.quyuID = "";
            // this.yetaiID = "";
            // this.mianjiID = "";
            // this.search = "";
            // this.jiageID = "";
            this.next = res.data.next;
            this.tab = "";
            this.$refs.modal.style.display = "none";
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }
          window.scrollTo(0, 0);
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
  input::-webkit-input-placeholder{
    color: #ccc;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:  #ccc;
  }

  .lookShop{
    width:7.5rem;
    margin: 0 auto;
    background: #fff;
    .backTop{
      width: .9rem;
      height: .9rem;
      position: fixed;
      right: .5rem;
      bottom: 2.74rem;
      z-index: 1000;
      background: url("../../../static/images/lookShop/top.png") no-repeat;
      -webkit-background-size: .9rem .9rem;
      background-size: .9rem .9rem;
    }
    .shopWrite{
      width: 7.5rem;
      height: 1rem;
      background: #fff;
    }
    .title{
      position: fixed;
      /*left: 0;*/
      top: 0;
      z-index: 2000;
      .grayNab {
        width: 7.5rem;
        height: .76rem;
        padding-top: .2rem;
        background: #fff;

        .grayNab_left {
          float: left;
          width: 6.3rem;
          height: .56rem;
          color: #ccc;
          font-size: 0.24rem;
          margin-left: .55rem;
          border-radius: 6px;
          border: 1px solid #f0f1f2;
          background: #f0f1f3;
          h5 {
            height: .36rem;
            float: left;
            font-size: .24rem;
            margin-left: .14rem;
            padding-right: .15rem;
            margin-right: .15rem;
            border-right: 1px solid #ccc;
            margin-top: .1rem;
            span {
              display: inline-block;
              position: relative;
              top: -.04rem;
            }
          }
          dt {
            float: left;
            img {
              width: .26rem;
              height: .26rem;
              position: relative;
              top: .01rem;
              margin-right: .1rem;
            }
          }
          dd {

            float: left;
            line-height: .6rem;
            font-size: .24rem;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
        }
      }

      /*h2{*/
        /*text-align: center;*/
        /*font-size: .34rem;*/
        /*height: .9rem;*/
        /*line-height: .9rem;*/
        /*color: #333;*/
        /*font-weight:bold;*/
        /*position: relative;*/
        /*background: #fff;*/
        /*a{*/
          /*-webkit-tap-highlight-color: rgba(0,0,0,0);*/
          /*position: absolute;*/
          /*width: .36rem;*/
          /*height: .36rem;*/
          /*background: url("../../../static/images/common/search.png") no-repeat;*/
          /*background-size: .36rem .36rem;*/
          /*top: .25rem;*/
          /*right: .3rem;*/
        /*}*/
      /*}*/
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
            font-size: .3rem;
            justify-content: space-around;
            text-align: center;
            background: #fff;
            border-bottom: .01rem solid #eaeaea;
            &.cur{
              color: #7bb5ff;
              span{
                background: url("../../../static/images/lookShop/up-bg.png") no-repeat ;
                background-size: .14rem .1rem;
              }
            }
            span{
              display: inline-block;
              width: .14rem;
              height: .1rem;
              background: url("../../../static/images/lookShop/down.png") no-repeat;
              background-size: .14rem .1rem;
              vertical-align: .06rem;
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
                width: 2.95rem;
                height: 5rem;
                border-right: .01rem solid #eaeaea;
                overflow: scroll;
                .twoChild{
                  text-align: center;
                  height: .78rem;
                  line-height: .78rem;
                  font-size: .3rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    span{
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                      color: #7bb5ff;
                    }
                  }
                  .three{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    background: #fff;
                    width: 4rem;
                    height: 5rem;
                    padding-left: .54rem;
                    position: absolute;
                    left: 2.96rem;
                    top: 0;
                    text-align: left;
                    background: #f7f8fa;
                    overflow: scroll;
                    li{
                      height: .78rem;
                      line-height: .78rem;
                      font-size: .3rem;
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
                  margin-left: .55rem;
                  height: .78rem;
                  margin-right: .4rem;
                  line-height: .78rem;
                  font-size: .3rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    color: #7bb5ff;
                    /*border-bottom: .01rem solid #7bb5ff;*/
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
      padding-top: 1.77rem;
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
