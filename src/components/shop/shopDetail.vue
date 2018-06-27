
<template>
  <div class="detail">
    <div class="model-wrap" v-if="modelPu===1">
      <div class="model"><h2>您找到满意的铺源了吗？</h2>
        <div class="input"><input v-model="modelTxt" type="text" placeholder="输入手机号，专家免费帮您找铺"><span>*请输入手机号</span></div>
        <div class="btn"><span @click="zhaoFun()">我要找铺</span><b @click="zhuanFun()">我要转铺</b></div>
        <div class="close" @click="modelPu=0"></div>
      </div>
    </div>
    <div class="today" v-show="today">您今日还可免费查看 <span>{{numIndex}}套</span> 商铺（共{{pvCount}}套/日）</div>
    <div class="jiantou-title" v-show="title===1"><span @click="back()"></span>{{titleMsg}}</div>
    <div class="downing" v-if="downing">
      <span></span><b>真铺源 无中介 最新铺源抢先看</b><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">APP下载</a><s @click="downing=false"></s>
    </div>

    <div class="banner" @click="tab1()">
      <div class="jiantou" v-show="title===0"><span @click.stop="back()"></span></div>
      <div class="wrap">
        <div class="txt">
          <span>商铺编号：{{shopNumber}}</span>
          <span class="swiperOne">{{num1}}/{{total}}</span>
        </div>
        <div class="swiper-container swiper-container1 swiper-container-horizontal" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in imgs"><img :src="item" alt="" :onerror="defaultImg"></div>
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
          <div class="swiper-slide" v-for="(item,index) in imgs"><img :src="item" alt="" :onerror="defaultImg"></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="msg">
      <h2>{{wzxx.areaName}}{{businessAreaName}}{{wzxx.road}}{{useArea}}m²&nbsp;,<b v-show="rentType">&nbsp;{{rentType}}&nbsp;,</b>&nbsp;{{license}}</h2>
      <div class="tags">
        <div class="youshi">
          <span v-for="item in shopTags">{{item}}</span>
        </div>
      </div>
      <div class="money">
        <dl>
          <dt>月租金</dt>
          <dd><span>{{monthlyRent}}</span>{{unitMonthRent}}</dd>
        </dl>
        <dl v-if="dailyRent">
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
              <div v-show="add===1"><span class="adree">地址：</span><b class="area">{{wzxx.road}} &nbsp;附近</b></div>
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
            <li v-show="shopPapers.length > 0"><span>已有证件：</span>
              <div class="more">
                <b v-for="item in shopPapers">{{item}} &nbsp;</b>
              </div>
            </li>
            <li v-show="jyzt.manageStatus"><span>经营状态：</span><b>{{jyzt.manageStatus}}</b></li>
            <li v-show="shopAdvantages.length > 0"><span>本店优势：</span>
              <div class="more">
                <b v-for="item in jyzt.shopAdvantages">{{item}} &nbsp;</b>
              </div>
            </li>
            <li v-show="brandStatus.length > 0"><span>品牌情况：</span><b v-for="item in jyzt.brandStatus">{{item}}</b></li>
            </li>
            <li v-show="jyzt.noManageType" class="m0"><span>不可经营业态：</span><b>{{jyzt.noManageType}}</b></li>
            <li v-show="shopIssues.length > 0"><span>过往经营最大的问题：</span>
              <div class="mores">
                <b v-for="item in jyzt.shopIssues">{{item}} &nbsp;</b>
              </div>
            </li>
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
              <li v-show="wyxx.floorHeight"><span><b>层</b>高：</span><b>{{wyxx.floorHeight}}m</b></li>
              <li v-show="wyxx.faceWidth"><span><b>面</b>宽：</span><b>{{wyxx.faceWidth}}m</b></li>
              <li v-show="wyxx.depth"><span><b>进</b>深：</span><b>{{wyxx.depth}}m</b></li>
              <li v-show="wyxx.orientation"><span><b>朝</b>向：</span><b>{{wyxx.orientation}}</b></li>
              <li v-show="wyxx.propertyName"><span><b>产</b>权：</span><b>{{wyxx.propertyName}}</b></li>
              <li v-show="" class="m0"><span>其他产权：</span><b>{{}}</b></li>
          </ul>
        </div>
        <div class="jingying zuyue">
          <h3><span></span>租约相关</h3>
          <ul>
            <li v-show="monthlyRent"><span><i>月</i><i>租</i>金：</span><b>{{monthlyRent}}{{unitMonthRent}}</b></li>
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
        <div class="tel-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
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
        msg:"",
        defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
        browseCount: "",//多少人看了该商铺
        modelPu: "",//找铺转铺弹窗
        modelTxt: "",//转铺找铺
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
        screenKey: "",
        sliderIndex: "",
        downing: true,//下载显示隐藏
        titleMsg: "",
        pvCount: ""//查看总数
      }
    },
    created(){
      // this.search = this.$route.query.search;
      // this.screenKey = this.$route.query.screenKey;
      // this.screen = this.$route.query.screen;
      this.fenxiangID = getQueryString("url");
      this.msg = this.$route.query.msg;
      this.id = this.$route.query.shopId || this.fenxiangID;
      this.init()
    },
    mounted(){
      var that = this;
      //没有登录30秒后弹框
      if(localStorage.token == undefined){
        setTimeout(function () {
          that.modelPu = 1;
        },30000)
      }

      // alert(location.href.split('#')[0]);
      //初始化
      this.dataPost();

    //滚动事件
      var that = this;
      window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 100){
          that.title = 1;
          $(".tel-msg").hide()
        }else{
          that.title = 0;
        }
      }
    },
    updated(){
      this.fenxiangFun();
      var that = this;
      var swiper1 = new Swiper('.swiper-container1', {
        on: {
          slideChangeTransitionEnd: function(){
            that.sliderIndex = this.activeIndex;
           $(".swiperOne").text(1+this.activeIndex + "/" + that.total);
          }
        }
      });
    },
    beforeRouteEnter (to, from, next) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // XXX: 修复iOS版微信HTML5 History兼容性问题
      if (isiOS && to.path !== location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next()
      }
    },
    methods:{
      zhaoFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          this.$http(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '1',
              source: "2"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              layer.open({
                content: '<h2>委托成功</h2><p>优铺客服会在<span class="red">24小时内</span>与您联系， 请保持手机畅通！</p>'
                ,btn: '我知道了',
                skin: 'tel1'
              });
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      zhuanFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          this.$http(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '2',
              source: "2"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              layer.open({
                content: '<h2>委托成功</h2><p>优铺客服会在<span class="red">24小时内</span>与您联系， 请保持手机畅通！</p>'
                ,btn: '我知道了',
                skin: 'tel1'
              });
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      init(){
        var data = {
          shopId: this.id
        }
        this.$http.post(this.changeData() + '/shop/getShopDetail',qs.stringify(data)).then(function(res){
          console.log(res)

          this.browseCount = res.data.browseCount;
          this.dailyRent = res.data.dailyRent;
          this.monthlyRent = res.data.monthlyRent;
          this.shopTags = res.data.shopTags;
          this.realAddress = res.data.realAddress;
          this.shopPapers = res.data.shopPapers;//已有证件
          this.useArea = res.data.useArea;//使用面积
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
          this.titleMsg =this.wzxx.areaName+this.businessAreaName+this.wzxx.road+this.useArea+"m²,"+this.rentType+","+this.license;
          this.gnote = "http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title="+this.wzxx.areaName+"-"+this.wzxx.road+"&content="+this.wzxx.areaName+this.wzxx.road+this.realAddress+"&output=html&src=zupubao";
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
      fenxiangFun(){
        var that = this;
        var data = {
          url : window.location.href.split('#')[0]
        }
        this.$http.post(this.changeData() + '/shop/getwx',qs.stringify(data)).then(function(res){
        // this.$http.post("http://tidhy.s1.natapp.cc/shop/getwx",qs.stringify(data)).then(function(res){
          console.log(res)
          wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
          });

          wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: that.titleMsg, // 分享标题
              desc: '租铺转铺找优铺', // 分享描述
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.imgs[0], // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户点击了分享后执行的回调函数
              }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: that.titleMsg, // 分享标题
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.imgs[0], // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
              }
            });
          });
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        }.bind(this)).catch(function(err){
          console.log("商店详情页面错误：",err)
        });
      },
      tab1(){
        $(".bannerBig").show()
        var that = this;
        var swiper2 = new Swiper('.swiper-container2', {
          initialSlide : that.sliderIndex,
          on: {
            slideChangeTransitionEnd: function(){
              that.sliderIndex = this.activeIndex;
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
        if(this.msg && localStorage.iphone){
          this.$router.push({path:"/message"})
        }else{
          this.$router.push({path:"/lookShop"})
        }

        // if(this.fenxiangID){
        //   this.$router.push({path:"/lookShop"})
        // }else if(this.search){
        //   this.$router.push({path:"/lookShop",query:{search: this.search}})
        // }else if(this.screenKey){
        //   this.$router.push({path:"/lookShop",query:{screenKey: this.screenKey,screen: this.screen}})
        // }else{
        //   history.back();
        // }
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
            //console.log(data);
            if(data.data.code == "200"){
              this.shopIdObj = data.data.shopId;
              this.pvCount = data.data.pvCount;
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
          layer.open({
            content: '请先登录'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
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
              if( this.checkedLook != 'true'){
                if(this.bolClick){
                  this.today = true;
                  setTimeout(function (){
                    _this.today = false;
                  },2000)
                  this.bolClick = false;
                }
              }
              // if(this.checkedLook == true){
              //   window.location.href = "tel:" + this.iphone;
              // }
              // if(this.countNum == true){
              //   window.location.href = "tel:" + this.iphone;
              // }
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
              layer.open({
                content: '请先登录'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
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
          layer.open({
            content: '请先登录'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
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
              if(this.checkedLook != 'true'){
                if(this.bolClick){
                  this.today = true;
                  setTimeout(function (){
                    _this.today = false;
                  },2000)
                  this.bolClick = false;
                }
              }
              // if(this.countNum == true){
              //   this.add = 2;
              // }
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
              layer.open({
                content: '请先登录'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
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
          layer.open({
            content: '请先登录'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
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
                if(this.checkedLook != 'true'){
                  if(this.bolClick){
                    this.today = true;
                    setTimeout(function (){
                      _this.today = false;
                    },2000)
                    this.bolClick = false;
                  }
                }
                // if(this.checkedLook == true){
                //   window.location.href = _this.gnote
                // }
                // if(this.countNum == true){
                //   window.location.href = _this.gnote
                // }
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
                  setTimeout(function (){
                    window.location.href = _this.gnote
                  },1000)

                }
              }else if(data.data.code=="401"){
                layer.open({
                  content: '请先登录'
                  ,skin: 'msg'
                  ,time: 2 //2秒后自动关闭
                });
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

        if($(e.srcElement).hasClass("cur")){
          var data1 = {
            shopId: this.shopIdObj,
            token: localStorage.token
          }
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
              layer.open({
                content: '请先登录'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
              that.$router.push({path:"/login"})
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        }else{
          var data2 = {
            shopId: this.id,
            userId: USERS,
            token: localStorage.token
          }
          this.$http.post(this.changeData() + '/shopCollection/save',qs.stringify(data2)).then(function(res){
            console.log(res)
            this.shopIdObj = res.data.shopCollId;
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
              layer.open({
                content: '请先登录'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });
              that.$router.push({path:"/login"})
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
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

  .layui-m-layer-tel1 .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-tel1 h2{
    font-size: .34rem;
    font-weight: bold;
    color: #333;
    margin-bottom: .3rem;
  }
  .layui-m-layer-tel1 p{
    font-size: .30rem;
    text-align: center;
    color: #333;
  }
  .layui-m-layer-tel1 p span{
    color: #E8584F;
  }
  .layui-m-layer-tel1 .layui-m-layerbtn{
    background: #64ABFF;
  }
  .layui-m-layer-tel1 .layui-m-layerbtn span{
    color: #fff!important;
    font-size: .34rem;
  }
</style>
<style lang="scss" type="text/scss" scoped>

  .detail{
    width: 7.5rem;
    margin: 0 auto;
    .model-wrap{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.5);
      z-index: 99999;
      .model{
        width: 6.6rem;
        height: 3.6rem;
        background: #fff;
        position: absolute;
        left: 50%;
        margin-left: -3.3rem;
        top: 50%;
        margin-top: -1.9rem;
        border-radius: .1rem;
        h2{
          text-align: center;
          font-size: .34rem;
          color: #333;
          font-weight: bold;
          margin-bottom: .3rem;
          margin-top: .48rem;
        }
        .input{
          position: relative;
          margin: 0 auto;
          width: 5.4rem;
          input{
            width: 5.4rem;
            height: 0.84rem;
            padding-left: .2rem ;
            line-height: 0.84rem;
            border: 1px solid #ccc;
            border-radius: 0.05rem;
          }
          span{
            display: none;
            position: absolute;
            left: 0;
            top: .85rem;
            font-size: .22rem;
            color: #E8584F;
          }
        }
        .btn{
          margin-top: .6rem;
          span,b{
            display: inline-block;
            width: 50%;
            height: .88rem;
            line-height: .88rem;
            color: #fff;
            text-align: center;
          }
          span{
            background: #93C5FF;
            border-radius: 0 0 0 5px;
          }
          b{
            background: #64ABFF;
            border-radius: 0 0 5px 0;
          }
        }
        .close{
          position: absolute;
          right: .1rem;
          top: .1rem;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../../../static/images/shopDetail/close.png") no-repeat;
          -webkit-background-size: 0.32rem 0.32rem;
          background-size: 0.32rem 0.32rem;
        }
      }
    }
    .downing{
      width: 7.5rem;
      height: .88rem;
      line-height: .88rem;
      background: rgba(255,255,255,.8);
      span{
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background: url("../../../static/images/shopDetail/xiazai.png") no-repeat;
        -webkit-background-size: .6rem .6rem;
        background-size: .6rem .6rem;
        vertical-align: middle;
        margin: 0 .3rem 0 .2rem;
      }
      b{
        font-size: .28rem;
        display: inline-block;
        vertical-align: middle;
        color: #666;
      }
      a{
        display: inline-block;
        vertical-align: middle;
        width: 1.56rem;
        height: .6rem;
        line-height: .65rem;
        border: 1px solid #64ABFF;
        color: #64ABFF;
        border-radius: .1rem;
        text-align: center;
        margin: 0 .2rem;
        font-size: .28rem;
      }
      s{
        display: inline-block;
        vertical-align: middle;
        width: .32rem;
        height: .32rem;
        background: url("../../../static/images/shopDetail/close.png") no-repeat;
        -webkit-background-size: .32rem .32rem;
        background-size: .32rem .32rem;
      }
    }
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
      padding: 0 2rem;
      left: 0;
      top: 0;
      width: 3.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .34rem;
      font-weight: bold;
      background: #fff;
      z-index: 1000;
      border-bottom: .01rem solid #eaeaea;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
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
      h2{
        font-size:.36rem;
        color: #111;
        line-height: .48rem;
        padding: .4rem .2rem .2rem;
      }
      .tags{
        width: 7.1rem;
        height: .7rem;
        line-height: .7rem;
        overflow: hidden;
        margin: 0 .2rem;
        border-bottom: 1px solid #f5f5f5;
        .youshi{
          width: 100%;
          height: .72rem;
          display: -webkit-box;
          display: box;
          overflow-x: scroll;
          span{
            display: block;
            height: .34rem;
            padding: 0 .07rem;
            line-height: .36rem;
            text-align: center;
            font-size:.24rem;
            border: 1px solid #1988ef;
            margin-right: .2rem;
            color: #1988ef;
          }
        }
      }
      .money{
        padding: 0 .2rem;
        display: flex;
        border-bottom:1px solid #f5f5f5;
        dl{
          margin-right:1rem;
          padding: .3rem 0;
          dt{
            font-size: .26rem;
            color: #898989;
            height: .26rem;
            line-height: .26rem;
            margin-bottom:.25rem;
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
            margin-bottom: .15rem;
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
          margin-top: .6rem;
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
          margin-top: .15rem;
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
        padding: .5rem .2rem 1rem .2rem;
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
              display: none;
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
                display: block;
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
                  color: #64abff;
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
              margin-bottom: .2rem;
             overflow: hidden;
              .more{
                text-align: justify;
                float: left;
                width: 5.3rem;
              }
              .mores{
                text-align: justify;
                float: left;
                width: 3.9rem;
              }
              span{
                float: left;
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
        position: relative;
        .tel-msg{
          width: 5rem;
          height: .6rem;
          line-height: .6rem;
          color: #fff;
          font-size: .22rem;
          background: #93C5FF;
          position: absolute;
          right: .55rem;
          top: -.8rem;
          border-radius: .05rem;
          .jiao{
            position: absolute;
            top: .6rem;
            left: 50%;
            margin-left: -.1rem;
            width: 0;
            height: 0;
            border: .15rem solid #93C5FF;
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
          }
        }
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
