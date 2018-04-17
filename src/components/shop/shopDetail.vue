<template>
  <div class="detail">
    <div class="today" v-show="today">您今日还可免费查看 <span>{{numIndex}}套</span> 商铺（共10套/日）</div>
    <div class="jiantou-title" v-show="title===1"><span @click="back()"></span>商铺详情页面</div>
    <div class="downing"></div>
    <div class="banner" @click="tab1()">
      <div class="jiantou" v-show="title===0"><span @click.stop="back()"></span></div>
      <div class="wrap">
        <div class="txt">
          <span>商品编号：{{shopNumber}}</span>
          <span class="swiperOne">{{num1}}/{{total}}</span>
        </div>
        <div class="swiper-container swiper-container1 swiper-container-horizontal" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in imgs"><img :src="item" alt=""></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="bannerBig">
      <div class="swiper-top"><span @click="tab2()"></span>{{wzxx.areaName}}{{wzxx.road}}</div>
      <div class="swiper-bottom">{{num2}}/{{total}}</div>
      <div class="swiper-container swiper-container2 swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgs"><img :src="item" alt=""></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="msg">
      <h2>{{wzxx.areaName}}区{{businessAreaName}}{{wzxx.road}}{{wyxx.buildArea}}m²商铺&nbsp;,<b v-show="rentType">&nbsp;{{rentType}}&nbsp;,</b>&nbsp;{{license}}</h2>
      <ul class="youshi">
        <li v-for="item in shopTags">{{item}}</li>
      </ul>
      <div class="money">
        <dl>
          <dt>月租金</dt>
          <dd><span>{{monthlyRent}}</span>{{unitMonthRent}}</dd>
        </dl>
        <dl>
          <dt>日租金</dt>
          <dd><span>{{dailyRent}}</span>{{unitDailyRent}}</dd>
        </dl>
        <dl>
          <dt>转让费</dt>
          <dd><span>{{zrfy.transferFee}}</span>{{zrfy.unitTransFerfee}}</dd>
        </dl>
      </div>
      <div class="address">
          <div class="one" :class="{'cur':add===2}">
              <div><span>面积：</span><b>{{useArea}}m²</b></div>
              <div v-show="add===1"><span class="adree">地址：</span><b class="area">{{wzxx.areaName}}{{wzxx.road}} &nbsp;附近</b></div>
              <div class="look" v-show="add===2"><span>地址：</span><b>{{wzxx.areaName}}{{wzxx.road}}{{realAddress}}</b></div>
          </div>
          <div class="two"  v-show="add===1">
            <div @click="address()">查看详细地址</div>
          </div>
          <div class="map" @click="mapBtn()">
            <!--<router-link to="/shopMap"></router-link>-->
            <!-- <a :href="gnote"></a> -->
          </div>
      </div>
      <div class="zhuangtai">
        <div class="sheshi">
          <h3>配套设施</h3>
          <div class="list clearfix">
            <dl>
              <dt class="dian"></dt>
              <dd>380伏</dd>
            </dl>
            <dl>
              <dt class="pai"></dt>
              <dd>排污管道</dd>
            </dl>
            <dl>
              <dt class="yan"></dt>
              <dd>烟管道</dd>
            </dl>
            <dl>
              <dt class="xia"></dt>
              <dd>下水</dd>
            </dl>
            <dl>
              <dt class="shang"></dt>
              <dd>上水</dd>
            </dl>
            <dl>
              <dt class="wai"></dt>
              <dd>外摆区</dd>
            </dl>
            <dl>
              <dt class="ting"></dt>
              <dd>停车位</dd>
            </dl>
            <dl>
              <dt class="mei"></dt>
              <dd>煤气</dd>
            </dl>
            <dl>
              <dt class="tian"></dt>
              <dd>天然气</dd>
            </dl>
            <dl>
              <dt class="ming"></dt>
              <dd>明火</dd>
            </dl>
          </div>
        </div>
        <div class="jingying">
          <h3><span></span>经营状态</h3>
          <ul>
            <li v-show="manageType"><span>当前经营：</span><b>{{manageType}}</b></li>
            <li v-show="license"><span><b>证</b>照：</span><b>{{license}}</b></li>
            <li v-show="shopPapers.length"><span>已有证件：</span><b v-for="item in shopPapers">{{item}} &nbsp;</b></li>
            <li v-show="jyzt.manageStatus"><span>经营状态：</span><b>{{jyzt.manageStatus}}</b></li>
            <li v-show="shopAdvantages.length"><span>本店优势：</span><b v-for="item in jyzt.shopAdvantages">{{item}} &nbsp;</b></li>
            <li v-show="shopIssues.length"><span>过往经营最大的问题：</span><b v-for="item in jyzt.shopIssues">{{item}} &nbsp;</b></li>
            <li v-show="brandStatus.length"><span>品牌情况：</span><b v-for="item in jyzt.brandStatus">{{item}}</b></li>
            <li v-show="" class="m0"><span>不可经营业态：</span><b></b></li>
          </ul>
        </div>
        <div class="jingying wuye">
          <h3><span></span>物业信息</h3>
          <ul>
            <li v-show="wyxx.typeName"><span>商铺类型：</span><b>{{wyxx.typeName}}</b></li>
            <li v-show="wyxx.buildArea"><span>建筑面积：</span><b>{{wyxx.buildArea}}m²</b></li>
            <li v-show="useArea"><span>使用面积：</span><b>{{useArea}}m²</b></li>
            <li v-show="wyxx.floor"><span><b>楼</b>层：</span><b>{{wyxx.floor}}</b></li>
            <li v-show="wyxx.spearate"><span>是否分隔：</span><b>{{wyxx.spearate}}</b></li>
            <li v-show="wyxx.froutage"><span>临主干道：</span><b>{{wyxx.froutage}}</b></li>
            <li v-show="wyxx.floorHeight"><span><b>层</b>高：</span><b>{{wyxx.floorHeight}}米</b></li>
            <li v-show="wyxx.faceWidth"><span><b>面</b>宽：</span><b>{{wyxx.faceWidth}}米</b></li>
            <li v-show="wyxx.depth"><span><b>进</b>深：</span><b>{{wyxx.depth}}米</b></li>
            <li v-show="wyxx.orientation"><span><b>朝</b>向：</span><b>{{wyxx.orientation}}</b></li>
            <li v-show="wyxx.propertyName"><span><b>产</b>权：</span><b>{{wyxx.propertyName}}</b></li>
            <li v-show="" class="m0"><span>其他产权：</span><b>{{}}</b></li>
          </ul>
        </div>
        <div class="jingying zuyue">
          <h3><span></span>租约相关</h3>
          <ul>
            <li v-show="monthlyRent"><span><i>月</i><i>租</i>金：</span><b>{{monthlyRent}}/月</b></li>
            <li v-show="wyxx.pledgeCash"><span><b>押</b>金：</span><b>{{wyxx.pledgeCash}}</b></li>
            <li v-show="wyxx.payType"><span>支付方式：</span><b>{{wyxx.payType}}</b></li>
            <li v-show="wyxx.timeRent"><span>分时出租：</span><b>{{wyxx.timeRent}}</b></li>
            <li v-show="wyxx.maxLease"><span>最长租约：</span><b>{{wyxx.maxLease}}个月</b></li>
            <li v-show="wyxx.currLease"><span>当前租约：</span><b>{{wyxx.currLease}}个月</b></li>
            <li v-show="wyxx.residue"><span><i>还</i><i>剩</i>余：</span><b>{{wyxx.residue}}个月</b></li>
            <li v-show="wyxx.leaseCase" class="m0"><span>续约情况：</span><b>{{wyxx.leaseCase}}</b></li>
          </ul>
        </div>
        <div class="jingying weizhi">
          <h3><span></span>位置信息</h3>
          <ul>
            <li v-show="wzxx.areaName"><span><b>区</b>域：</span><b>{{wzxx.areaName}}</b></li>
            <li v-show="wzxx.loopLine"><span><b>环</b>线：</span><b>{{wzxx.loopLine}}</b></li>
            <li v-show="wzxx.road" class="m0"><span>临近道路：</span><b>{{wzxx.road}}</b></li>
          </ul>
        </div>
        <div class="jingying zhuanrang">
          <h3><span></span>转让相关</h3>
          <ul>
            <li><span><i>转</i><i>让</i>费：</span><b>{{zrfy.transferFee}}{{zrfy.unitTransFerfee}}</b></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cang">
        <dl>
          <dt class="myshou" @click="shoucang($event)"></dt>
          <dd>收藏</dd>
        </dl>
      </div>
      <div class="tel" @click="telPhone()">
        <span></span><b>直拨店主</b>  <!-- <a :href="tel">直拨店主</a> -->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data(){
      return{
        id: "",
        today: false,
        tel: "",
        add: 1,
        address1: "",
        shou: 0,
        num1: 1,
        title: 0,
        num2: 1,
        tab: 0,
        total: "",
        monthlyRent: "",
        dailyRent: "",
        shopTags:"",
        realAddress: "",
        shopPapers: "",
        license: "",
        manageType: "",
        shopNumber: "",
        shopSupportings: "",
        wyxx: "",
        useArea: "",
        wzxx: "",
        jyzt: "",
        imgs: "",
        gnote: "",
        zrfy: "",
        shopIssues: "",
        shopAdvantages: "",
        brandStatus: "",
        iphone: "",
        rentType: "",
        businessAreaName: "",
        fenxiangID: "",
        unitDailyRent: "",
        unitMonthRent: "",
        unitTransFerfee: "",
        numIndex: "",  // 查看商铺次数
        bolClick: true,  // 是否点击
        shopIdObj: "", // 判断是否收藏id
        checkedLook: false, // 判断此商铺是否被查看过
        countNum: false, //
        screen: "",
        screenKey: ""
      }
    },
    created(){
      this.search = this.$route.query.search;
      this.screenKey = this.$route.query.screenKey;
      this.screen = this.$route.query.screen;
      console.log(this.screen)
      this.fenxiangID = getQueryString("url");
      this.id = this.$route.query.shopId || this.fenxiangID;
      var data = {
        shopId: this.id
      }
      this.$http.post(this.changeData() + '/shop/getShopDetail',qs.stringify(data)).then(function(res){
      // this.$http.post('http://192.168.1.144:8080/shop/getShopDetail',qs.stringify(data)).then(function(res){
        console.log(res)
        this.dailyRent = res.data.dailyRent;
        this.monthlyRent = res.data.monthlyRent;
        this.shopTags = res.data.shopTags;
        this.realAddress = res.data.realAddress;
        this.shopPapers = res.data.shopPapers;//已有证件
        this.useArea = res.data.useArea;
        this.license = res.data.license;
        this.manageType = res.data.manageType;
        this.shopNumber = res.data.shopNumber;
        this.shopSupportings = res.data.shopSupportings;
        this.wyxx = res.data.wyxx;
        this.wzxx = res.data.wzxx;
        this.jyzt = res.data.jyzt;
        this.zrfy = res.data.zrfy;
        this.imgs = res.data.imgs;
        this.total = res.data.imgs.length;
        this.lng = res.data.lng;
        this.lat = res.data.lat;

        this.shopIssues = res.data.jyzt.shopIssues;
        this.shopAdvantages = res.data.jyzt.shopAdvantages;
        this.brandStatus = res.data.jyzt.brandStatus;
        this.iphone = res.data.phone;
        this.rentType = res.data.rentType;
        this.businessAreaName = res.data.businessAreaName;
        this.unitMonthRent = res.data.unitMonthRent;
        this.unitDailyRent = res.data.unitDailyRent;
        this.unitTransFerfee = res.data.unitTransFerfee;
        this.gnote = "http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title="+this.wzxx.road+"&content="+this.realAddress+"&output=html&src=zupubao";
        try{
          this.shopSupportings.forEach(function (item) {
            $(".list dl").forEach(function (item1) {
              if(item == $(item1).find("dd").html()){
                $(item1).addClass("cur");
              }
            })
          })
        }catch(e){
          console.log(e)
        }
      }.bind(this)).catch(function(err){
        console.log("商店详情页面错误：",err)
      });
    },
    mounted(){
      //初始化
        this.dataPost();
    //滚动事件
      var that = this;
      window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 100){
          that.title = 1;
        }else{
          that.title = 0;
        }
      }
    },
    updated(){
      var that = this;
      var swiper1 = new Swiper('.swiper-container1', {
        on: {
          slideChangeTransitionEnd: function(){
           $(".swiperOne").text(1+this.activeIndex + "/" + that.total);
          }
        }
      });
    },
    methods:{
        tab1(){
          $(".bannerBig").show()
          var that = this;
          var swiper2 = new Swiper('.swiper-container2', {
            on: {
              slideChangeTransitionEnd: function(){
                $(".swiper-bottom").text(1+this.activeIndex + "/" + that.total);
              }
            }
          });
        },
        tab2(){
          this.num2 = 1;
          $(".bannerBig").hide();
        },
        back(){
          if(this.fenxiangID){
            this.$router.push({path:"/lookShop"})
          }else if(this.search){
            this.$router.push({path:"/lookShop",query:{search: this.search}})
          }else if(this.screenKey){
            this.$router.push({path:"/lookShop",query:{screenKey: this.screenKey,screen: this.screen}})
          }else{
            this.$router.push({path:"/lookShop"})
          }
        },
        // 页面初始化
        dataPost(){
          let _this = this;
          var that = this;
          let USERS = window.localStorage.getItem("iphone");
          let TOKEN = window.localStorage.getItem("token");
          let url =  this.changeData() + '/user/shopCheckedRecords'
          //  let url =  'http://192.168.1.55:8080/user/shopCheckedRecords'
          axios(url,{
            method: 'post',
            params:
            {
                account: USERS,
                shopId: _this.id,
                type: "0",
                token: localStorage.token
            },
          }).then(data => {
              console.log(data);
              if(data.data.code == "200"){
                this.shopIdObj = data.data.shopId;
                let bol = data.data.checkedStatus  // 'true' 查看过  false 没有查看过
                if(bol == 'true'){
                  _this.add = 2;
                }
                if(data.data.checkedStatus == "true"){
                  this.checkedLook = true;
                }
                if(data.data.count == 1){
                  this.countNum = true;
                }
                if(data.data.collectionStatus == 'true') {
                  $(".myshou").addClass("cur");
                }
              }else if(data.data.code == "401"){
                localStorage.clear();
              }

          }).catch(err => {
              console.log(err)
          });
        },

        // 直播店主电话
        telPhone(){
          let _this = this;
          let that = this;
          let USERS = window.localStorage.getItem("iphone");
          let TOKEN = window.localStorage.getItem("token");

          if(TOKEN == null){
              this.$router.push({path: '/login'});
          } else {
            let url =  this.changeData() + '/user/shopCheckedRecords'

            axios(url,{
                method: 'post',
                params:
                {
                  account: USERS,
                  shopId: _this.id,
                  type: "1",
                  token: localStorage.token
                },
            }).then(data => {
              if(data.data.code=="200"){
                console.log(data)
                this.numIndex = data.data.count;
                if( data.data.checkedStatus == 'true'){
                  if(this.bolClick){
                    this.today = true;
                    setTimeout(function (){
                      _this.today = false;
                    },2000)
                    this.bolClick = false;
                  }
                }
                if(this.checkedLook == true){
                  window.location.href = "tel:" + this.iphone;
                }
                if(this.countNum == true){
                  window.location.href = "tel:" + this.iphone;
                }
                if(data.data.count == 0 && this.checkedLook == false && this.countNum == false){
                  layer.open({
                    content: '<h2>温馨提示</h2><p>您今日<span class="red">10次</span>看铺机会已用完，开通会员可继续查看也可明天再来哦~</p >',
                    btn: ['明天再来', '立即开通'],
                    yes: function(index){
                      layer.close(index);
                    },
                    no: function () {
                      that.$router.push({path:"/buymember"})
                    },
                    skin: 'tishi'
                  });
                }else{
                  window.location.href = "tel:" + this.iphone;
                }
              }else if(data.data.code=="401"){
                localStorage.clear();
                that.$router.push({path:"/login"})
              }
            }).catch(err => {
                console.log(err)
            });
          }
        },

        // 点击查看详细地址
        address(){
          let _this = this
          let that = this
          let USERS = window.localStorage.getItem("iphone");
          let TOKEN = window.localStorage.getItem("token");
          if(TOKEN == null){
              this.$router.push({path: '/login'});
          } else {
            let url =  this.changeData() + '/user/shopCheckedRecords'
            axios(url,{
              method: 'post',
              params:
              {
                  account: USERS,
                  shopId: _this.id,
                  type: "1",
                token: localStorage.token
              },
            }).then(data => {
              console.log(data);

              if(data.data.code == 200){
                this.numIndex = data.data.count;
                if(data.data.checkedStatus == 'true'){
                  if(this.bolClick){
                    this.today = true;
                    setTimeout(function (){
                      _this.today = false;
                    },2000)
                    this.bolClick = false;
                  }
                }
                if(this.countNum == true){
                  this.add = 2;
                }
                if(data.data.count == 0 && this.checkedLook == false && this.countNum == false){
                  layer.open({
                    content: '<h2>温馨提示</h2><p>您今日<span class="red">10次</span>看铺机会已用完，开通会员可继续查看也可明天再来哦~</p >',
                    btn: ['明天再来', '立即开通'],
                    yes: function(index){
                      layer.close(index);
                    },
                    no: function () {
                      that.$router.push({path:"/buymember"})
                    },
                    skin: 'tishi'
                  });
                }else{
                  this.add = 2;
                }
              }else if(data.data.code=="401"){
                localStorage.clear();
                that.$router.push({path:"/login"})
              }

            }).catch(err => {
                console.log(err)
            });
          }
        },
        // 点击地图
        mapBtn(){
          let _this = this
          let that = this
          let USERS = window.localStorage.getItem("iphone");
          let TOKEN = window.localStorage.getItem("token");

          if(TOKEN == null){
              this.$router.push({path: '/login'});
          } else {

              let url =  this.changeData() + '/user/shopCheckedRecords'
              axios(url,{
                  method: 'post',
                  params:
                  {
                      account: USERS,
                      shopId: _this.id,
                      type: "1",
                    token: localStorage.token
                  },
              }).then(data => {
                if(data.data.code == "200"){
                  this.numIndex = data.data.count;
                  if(data.data.checkedStatus == 'true'){
                    if(this.bolClick){
                      this.today = true;
                      setTimeout(function (){
                        _this.today = false;
                      },2000)
                      this.bolClick = false;
                    }
                  }
                  if(this.checkedLook == true){
                    window.location.href = _this.gnote
                  }
                  if(this.countNum == true){
                    window.location.href = _this.gnote
                  }
                  if(data.data.count == 0 && this.checkedLook == false && this.countNum == false){
                    layer.open({
                      content: '<h2>温馨提示</h2><p>您今日<span class="red">10次</span>看铺机会已用完，开通会员可继续查看也可明天再来哦~</p >',
                      btn: ['明天再来', '立即开通'],
                      yes: function(index){
                        layer.close(index);
                      },
                      no: function () {
                        that.$router.push({path:"/buymember"})
                      },
                      skin: 'tishi'
                    });
                  }else{
                    window.location.href = _this.gnote
                  }
                }else if(data.data.code=="401"){
                  localStorage.clear();
                  that.$router.push({path:"/login"})
                }
              }).catch(err => {
                  console.log(err)
              });
          }
        },

        // 点击收藏
        shoucang(e){
          var that = this;
          let USERS = window.localStorage.getItem("iphone");
          var data1 = {
            shopId: this.shopIdObj,
            token: localStorage.token
          }

          var data2 = {
            shopId: this.id,
            userId: USERS,
            token: localStorage.token
          }
          if(localStorage.token){
            if($(e.srcElement).hasClass("cur")){
              this.$http.post(this.changeData() + '/shopCollection/dele',qs.stringify(data1)).then(function(res){
                console.log(res)
                if(res.data.code=="200"){
                  $(e.srcElement).removeClass("cur");
                  layer.open({
                    content: '取消收藏',
                    skin:  'msg',
                    time: 2
                  });
                }else if(res.data.code=="401"){
                  localStorage.clear();
                  that.$router.push({path:"/login"})
                }
              }.bind(this)).catch(function(err){
                console.log("商店列表页面错误：",err)
              })
            }else{
              this.$http.post(this.changeData() + '/shopCollection/save',qs.stringify(data2)).then(function(res){
                console.log(res)
                this.shopIdObj = res.data.shopCollId
                // console.log(this.shopIdObj);
                if(res.data.code=="200"){
                  $(e.srcElement).addClass("cur");
                  layer.open({
                    content: '收藏成功',
                    skin: 'msg',
                    time: 2
                  });
                }else if(res.data.code=="401"){
                  localStorage.clear();
                  that.$router.push({path:"/login"})
                }
              }.bind(this)).catch(function(err){
                console.log("商店列表页面错误：",err)
              })
            }
          }else{
            this.$router.push({path:"/login"})
          }
        },
      }
  }
</script>
<style>

  .layui-m-layer-tishi .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-tishi h2{
    font-size: .34rem!important;
    font-weight: bold!important;
    margin-bottom: .3rem;
    color: #333;
  }
  .layui-m-layer-tishi p{
    font-size: .3rem;
    color: #333;
  }
  .layui-m-layer-tishi p span{
    color: #e8584f;
  }
  .layui-m-layer-tishi .layui-m-layerbtn span{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background: #64AAFF;
    font-size: .34rem;
    color: #fff;
  }
  .layui-m-layer-tishi .layui-m-layerbtn span:nth-of-type(1){
    background: #f7f8fa;
    color: #999;
  }
  .layui-m-layer-tishi .layui-m-layerbtn span:nth-of-type(2){
    border-radius: 0 0 5px 0;
  }
</style>
<style lang="scss" type="text/scss" scoped>

  .detail{
    width: 7.5rem;
    margin: 0 auto;
    .today{
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      border-bottom: 0.01rem solid #eaeaea;
      font-size: .3rem;
      position: fixed;
      z-index: 9999999;
      background: #fff;
      span{
        color: #e8584f;
      }
    }
    .jiantou-title{
      position: fixed;
      left: 0;
      top: 0;
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .34rem;
      font-weight: bold;
      background: #fff;
      z-index: 1000;
      border-bottom: .01rem solid #eaeaea;
      span{
        position: absolute;
        left: .2rem;
        top: .25rem;
        width: .36rem;
        height: .36rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .36rem .36rem;
      }
    }
    .down{
      width: 100%;
      height: .88rem;
      line-height: .88rem;
      background: #fff;
      z-index: 1000;
      border-bottom: 0.01rem solid #f5f5f5;
      span{
        display: inline-block;
        width: .74rem;
        height: .44rem;
        margin: .2rem;
        background: url("../../../static/images/shopDetail/logo.png") no-repeat;
        background-size: .74rem .44rem;
      }
      b{
        display: inline-block;
        font-size: .26rem;
        vertical-align: top;
        font-weight:bold;
        color: #65abff;
      }
      a{
        margin-top: .1rem;
        margin-left: .4rem;
        vertical-align: top;
        display: inline-block;
        width: 1.8rem;
        height: .7rem;
        line-height: .7rem;
        background: #64aaff;
        border-radius: .1rem;
        color: #fff;
        text-align: center;
        font-size:.32rem;
      }
    }
    .banner{
      width: 100%;
      height: 5.62rem;
      overflow: hidden;
      position: relative;
      .jiantou{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .2rem;
        width: .6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        z-index: 10000;
        border-radius: .5rem;
        background: rgba(0,0,0,.5);
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -.18rem;
          margin-top: -.18rem;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/shopDetail/jiantou.png") no-repeat;
          background-size: .36rem .36rem;
        }
      }
      .swiper-container {
        width: 100%;
        height: 5.62rem;
      }
      .swiper-slide {
        width: 7.5rem!important;
        height: 5.62rem;
        img{
          width: 7.5rem;
          height: 5.62rem;
        }
      }

      .txt{
        width: 96%;
        height: .5rem;
        line-height: .54rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        padding: 0 2%;
        z-index: 100;
        span{
          font-size:.24rem;
          color: #fff;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
    }
    .bannerBig{
      display: none;
      /*visibility: hidden;*/
      width: 7.5rem;
      height: 100% ;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      background: #010101;
      z-index: 10000;
      .swiper-top{
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        color: #fff;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        background: #141414;
        span{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          position: absolute;
          left: .2rem;
          top: .3rem;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/common/back-write.png") no-repeat;
          background-size: .36rem .36rem;
        }
      }
      .swiper-bottom{
        width: 7.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
        z-index: 1000;
      }
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 5.56rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -3.75rem;
            margin-top: -2.78rem;
            text-align: center;
          }
        }
      }
    }
    .msg{
      background: #fff;
      padding-bottom: 1rem;
      h2{
        font-size:.36rem;
        color: #111;
        line-height: .48rem;
        padding: .4rem .2rem .2rem;
      }
      .youshi{
        padding: 0 .2rem;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom:.3rem;
        li{
          width: 1.06rem;
          height: .32rem;
          line-height: .36rem;
          text-align: center;
          font-size:.22rem;
          border: 1px solid #1988ef;
          margin-right: .2rem;
          color: #1988ef;
        }
      }
      .money{
        padding: 0 .2rem;
        display: flex;
        border-bottom:1px solid #f5f5f5;
        dl{
          padding: .3rem;
          dt{
            font-size: .26rem;
            color: #898989;
            height: .26rem;
            line-height: .26rem;
            margin-bottom:.1rem;
          }
          dd{
            height: .32rem;
            line-height: .32rem;
            font-size: .22rem;
            color: #e8584f;
            span{
              font-size:.32rem;
              color: #e8584f;
              font-size: .32rem;
            }
          }
        }
      }
      .address{
        padding: .3rem .2rem .3rem;
        display: flex;
        .one{
          width: 3.4rem;
          overflow: hidden;
          &.cur{
            width: 5.4rem;
            .look{
              width: 5rem;
              span{
                float: left;
                width: .84rem;
                height: .8rem;
                line-height: .55rem;
              }
              b{
                margin-top: -.2rem;
              }
            }
          }

          div{
            /*margin-bottom: .05rem;*/
            span,b{
              font-size: .28rem;
              color: #898989;
            }
            span.adree{
              float: left;
              height: .5rem;
            }
            b.area{
              line-height: .2rem;
            }
            b{
              color: #333;
              line-height: .35rem;
            }
          }
        }
        .two{
          width: 2rem;
          margin-top: .45rem;
          div{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: block;
            width: 1.5rem;
            height: .46rem;
            line-height: .5rem;
            color: #fff;
            text-align: center;
            background: #64AAFF;
            border-radius: .1rem;
            font-size: .2rem;
            margin-right: .7rem;
          }
        }
        .map{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          flex: 0 0 auto;
          margin-top: .05rem;
          width: 1.4rem;
          height: .9rem;
          background: url("../../../static/images/shopDetail/map.png") no-repeat;
          background-size:  1.4rem .9rem;
          a{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .zhuangtai{
        background: #f7f8fa;
        padding: .5rem .2rem;
        .sheshi{
          h3{
            height: .34rem;
            line-height: .34rem;
            color: #111;
            font-size: .34rem;
          }
          .list{
            padding: 0rem 0 .4rem;
            flex-wrap: wrap;
            justify-content: space-around;
            &.list2{
              padding: 0 0 .58rem;
            }
            dl{
              margin-top: .4rem;
              width: 20%;
              float: left;
              dt{
                width: .36rem;
                height: .36rem;
                margin-bottom:.1rem;
                width: .3rem;
                height: .3rem;
                background: url("../../../static/images/shopDetail/dian.png") no-repeat;
                background-size: .3rem .3rem;
                margin-left:.55rem;
                &.dian{
                  background-image: url("../../../static/images/shopDetail/dian-bg.png");
                }
                &.pai{
                  background-image: url("../../../static/images/shopDetail/pai-bg.png");
                }
                &.yan{
                  background-image: url("../../../static/images/shopDetail/yan-bg.png");
                }
                &.xia{
                  background-image: url("../../../static/images/shopDetail/xia-bg.png");
                }
                &.shang{
                  background-image: url("../../../static/images/shopDetail/shang-bg.png");
                }
                &.wai{
                  background-image: url("../../../static/images/shopDetail/wai-bg.png");
                }
                &.ting{
                  background-image: url("../../../static/images/shopDetail/ting-bg.png");
                }
                &.mei{
                  background-image: url("../../../static/images/shopDetail/mei-bg.png");
                }
                &.tian{
                  background-image: url("../../../static/images/shopDetail/tian-bg.png");
                }
                &.ming{
                  background-image: url("../../../static/images/shopDetail/ming-bg.png");
                }
              }
              dd{
                font-size: .22rem;
                height: .22rem;
                line-height: .22rem;
                text-align: center;
                color: #ccc;
              }
              &.cur{
                dt{
                  &.dian{
                    background-image: url("../../../static/images/shopDetail/dian.png");
                  }
                  &.pai{
                    background-image: url("../../../static/images/shopDetail/pai.png");
                  }
                  &.yan{
                    background-image: url("../../../static/images/shopDetail/yan.png");
                  }
                  &.xia{
                    background-image: url("../../../static/images/shopDetail/xia.png");
                  }
                  &.shang{
                    background-image: url("../../../static/images/shopDetail/shang.png");
                  }
                  &.wai{
                    background-image: url("../../../static/images/shopDetail/wai.png");
                  }
                  &.ting{
                    background-image: url("../../../static/images/shopDetail/ting.png");
                  }
                  &.mei{
                    background-image: url("../../../static/images/shopDetail/mei.png");
                  }
                  &.tian{
                    background-image: url("../../../static/images/shopDetail/tian.png");
                  }
                  &.ming{
                    background-image: url("../../../static/images/shopDetail/ming.png");
                  }
                }
                dd{
                  color: #666;
                }
              }
            }
          }
        }
        .jingying{
          border-radius: .1rem;
          background: #fff;
          padding: .4rem .2rem;
          margin-top: .18rem;
          h3{
            font-size: .34rem;
            height: .34rem;
            line-height: .34rem;
            color: #111;
            font-weight:bold;
            margin-bottom: .3rem;
            span{
              display: inline-block;
              vertical-align: -.04rem;
              margin-right:.1rem;
              width: .34rem;
              height: .34rem;
              background: url("../../../static/images/shopDetail/jinyin.png") no-repeat;
              background-size:.34rem .34rem;
            }
          }
          ul{
            li{
              font-size: .28rem;
              span{
                color: #898989;
                b{
                  color: #898989;
                  margin-right: .55rem;
                }
                i{
                  color: #898989;
                  margin-right: .13rem;
                }
              }
              b{
                color: #333;
              }
            }
          }
        }
        .wuye{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/wuye.png");
            }
          }
        }
        .zuyue{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/zuyue.png");
            }
          }
        }
        .weizhi{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/weizhi.png");
            }
          }
        }
        .zhuanrang{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/zhuanrang.png");
            }
          }
        }
      }
    }
    .footer{
      width: 7.5rem;
      position: fixed;
      bottom: 0;
      //left: 0;
      height: 1.1rem;
      line-height: 1.1rem;
      display: flex;
      .cang{
        background: #fff;
        width: 1.4rem;
        dl{
          width: 1.4rem;
          margin: .2rem 0;
          box-sizing: border-box;
          border-right: 1px solid #f5f5f5;
          dt{
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            margin-left: 0.5rem;
            width: .42rem;
            height: .40rem;
            margin-bottom: .1rem;
            background: url("../../../static/images/shopDetail/shoucang.png") no-repeat;
            background-size: .42rem .40rem;
            &.cur{
              background-image: url("../../../static/images/shopDetail/shoucang-bg.png");
            }
          }
          dd{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            height: .2rem;
            line-height: .2rem;
            font-size: .2rem;
            text-align: center;
          }
        }
        dl.fenxiang{
          margin: .25rem 0;
          dt{
            width: .39rem;
            height: .35rem;
            background: url("../../../static/images/shopDetail/fenxiang.png") no-repeat;
            background-size: .39rem .35rem;
          }
        }
      }
      .tel{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        text-align: center;
        background: #64aaff;
        width:6.1rem;
        height: 1.1rem;

        span{
          display: inline-block;
          width: .36rem;
          height: .38rem;
          background: url("../../../static/images/shopDetail/tel.png") no-repeat;
          background-size: .36rem .38rem;
          vertical-align: -.1rem;
          margin-right: .2rem;
        }
        b{
          color: #fff;
        }
        a{
          font-size: .32rem;
          color: #fff;
        }
      }
    }
  }
</style>
