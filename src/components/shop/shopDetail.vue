<template>
<div class="shopdetail">
    <div v-if="yijian" class="yijian" @click="jiucuoFun()"></div>
    <!-- 委托找铺弹窗 -->
    <div class="model-wrap" v-if="modelPu===1">
        <div class="model">
            <h2>委托找铺</h2>
            <div class="msg">
                <input type="tel" name="" placeholder="请输入手机号码，专属顾问5分钟内与您联系" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号码，专属顾问5分钟内与您联系'" maxlength="11" class="txt-input" v-model="telVal">
                <h5 v-if="isTelError">*请输入正确手机号</h5>
            </div>
            <!-- <div class="btn"><span @click="zhaoFun()">委托找铺</span><b @click="zhuanFun()">委托转铺</b></div> -->
            <div class="btn"><span @click="modelPu=0">取消</span><b @click="zhaoFun()">提交</b></div>
            <div class="close" @click="modelPu=0"></div>
        </div>
    </div>
    <div class="model-login" v-if="modelLogin===1">
        <div class="model">
            <h2>登录</h2>
            <ul>
                <li><span></span><input type="text" maxlength="11" v-model="tel" class="tel" placeholder="请输入手机号" @blur="telFun()"></li>
                <li><span></span><input type="text" v-model="code" class="code" placeholder="请输入验证码"><b class="cur" :disabled="disabled" v-if="sendClass===0" @click="sendFun()">{{send}}</b><b class="sendColor" v-if="sendClass===1">重新发送 ({{this.time}})</b></li>
            </ul>
            <div class="btn" @click="loginFun()">提交</div>
            <div class="close" @click="modelLogin=0"></div>
        </div>
    </div>
    <div class="model-tishi" v-if="modelTishi===1">
        <div class="model">
            <h2>温馨提示</h2>
            <p>您今日<span class="red">{{pvCount}}次</span>看铺机会已用完，开通会员可继续查看也可明天再来哦~</p >
            <div><span @click="modelTishi=0">明天再来</span><b><router-link :to="{path:'buymember',query:{shopDetail:1,shopId:id}}">立即开通</router-link></b>
            </div>
        </div>
    </div>

    <div class="model-down" v-if="modelDown===1">
        <div class="model">
            <div class="close" @click="modelDown=0"></div>
            <h2>温馨提示</h2>
            <p class="txt">您今日<span class="red">3次</span>看铺机会已用完，可下载app享受更多查看次数，也可开通会员继续查看</p >
            <div>
                <span>
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">APP下载</a>
                </span>
                <b><router-link :to="{path:'buymember',query:{shopDetail:1,shopId:id}}">立即开通</router-link></b>
            </div>
        </div>
    </div>

    <div class="today" v-show="today">您今日还可免费查看<span>{{numIndex}}套</span> 商铺（共{{pvCount}}套/日）</div>
    <div class="jiantou-title" v-show="title===1"><span @click="back()"></span>{{shopDetailArr.shopName}}</div>
    <!-- APP下载页 -->
    <div class="downing" v-if="downing">
        <span></span><b>真铺源 无中介 最新铺源抢先看</b>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">APP下载</a>
        <s @click="downing=false"></s>
    </div>
    <!-- 轮播图 -->
    <div class="banner" @click="tab1()">
        <div class="jiantou" v-show="title===0">
            <div class="wrap"><span @click.stop="back()"></span></div>
        </div>
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
    <!-- 大轮播图 -->
    <div class="bannerBig">
        <div class="swiper-top"><span @click="tab2()"></span>{{shopDetailArr.areaName}}{{shopDetailArr.road}}</div>
        <div class="swiper-bottom">{{num2}}/{{total}}</div>
        <div class="swiper-container swiper-container2 swiper-container-horizontal">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in imgs"><img :src="item" alt="" :onerror="defaultImg"></div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
    <!-- 商铺详情内容 -->
    <div class="msg">
        <h2>{{shopDetailArr.shopName}}</h2>
        <div class="tags" v-if="shopTagsArr != []">
            <div class="youshi">
                <span v-for="item in shopTagsArr">{{item}}</span>
            </div>
        </div>
        <div class="money">
            <dl>
                <dt>月租金</dt>
                <dd><span>{{shopDetailArr.monthlyRent}}</span>{{unitMonthRent}}</dd>
            </dl>
            <dl v-if="shopDetailArr.dailyRent">
                <dt>日租金</dt>
                <dd><span>{{shopDetailArr.dailyRent}}</span>{{unitDailyRent}}</dd>
            </dl>
            <dl>
                <dt>转让费</dt>
                <dd><span>{{shopDetailArr.transferFee}}</span>{{shopDetailArr.unitTransFerfee}}</dd>
            </dl>
        </div>
        <div class="address">
            <div class="one" :class="{'cur':add===2}">
                <div><span>面积：</span><b>{{shopDetailArr.buildArea}}m²</b></div>
                <div v-show="add===1"><span class="adree">地址：</span><b class="area">{{shopDetailArr.road}} &nbsp;附近</b></div>
                <div class="look" v-show="add===2"><span>地址：</span><b>{{shopDetailArr.areaName}}{{shopDetailArr.road}}{{realAddress}}</b></div>
            </div>
            <div class="two"  v-show="add===1">
                <div v-if="type!=3" @click="address()">查看详细地址</div>
                <div v-else class="cur">查看详细地址</div>
            </div>
            <div v-if="type!=3" class="map" @click="mapBtn()">
            <!--<router-link to="/shopMap"></router-link>-->
            <!-- <a :href="gnote"></a> -->
            <!--<iframe class="iframe" name="iframe" :src="gnote" frameborder="0" scrolling="auto"></iframe>-->
            </div>
        </div>
        <div class="zhuangtai">
            <div class="sheshi">
                <h3>配套设施</h3>
                <div class="list clearfix">
                    <dl>
                        <dt class="yan"></dt>
                        <dd>烟管道</dd>
                    </dl>
                    <dl>
                        <dt class="xia"></dt>
                        <dd>下水</dd>
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
                        <dt class="tian"></dt>
                        <dd>天然气</dd>
                    </dl>
                    <dl>
                        <dt class="shang"></dt>
                        <dd>上水</dd>
                    </dl>
                    <dl>
                        <dt class="ming"></dt>
                        <dd>明火</dd>
                    </dl>
                    <dl>
                        <dt class="pai"></dt>
                        <dd>排污管道</dd>
                    </dl>
                    <dl>
                        <dt class="mei"></dt>
                        <dd>煤气</dd>
                    </dl>
                    <dl>
                        <dt class="dian"></dt>
                        <dd>380伏</dd>
                    </dl>
                </div>
            </div>
            <div class="jingying">
                <h3><span></span>经营状态</h3>
                <ul>
                    <li v-show="manageType">
                        <span>当前经营：</span><b>{{manageType}}</b>
                    </li>
                    <li v-show="license">
                        <span><b>证</b>照：</span>
                        <b>{{license}}</b>
                    </li>
                    <li v-show="shopPapers.length > 0">
                        <span>已有证件：</span>
                        <div class="more">
                            <b v-for="item in shopPapers">{{item}} &nbsp;</b>
                        </div>
                    </li>
                    <li v-show="shopDetailArr.manageStatus">
                        <span>经营状态：</span>
                        <b>{{shopDetailArr.manageStatus}}</b>
                    </li>
                    <!-- <li v-show="shopAdvantages.length > 0">
                        <span>本店优势：</span>
                        <div class="more">
                            <b v-for="item in jyzt.shopAdvantages">{{item}} &nbsp;</b>
                        </div>
                    </li>
                    <li v-show="brandStatus.length > 0">
                        <span>品牌情况：</span>
                        <b v-for="item in jyzt.brandStatus">{{item}}</b>
                    </li> -->
                    <!-- <li v-show="jyzt.noManageType" class="m0">
                        <span>不可经营业态：</span><b>{{jyzt.noManageType}}</b>
                    </li>
                    <li v-show="shopIssues.length > 0"><span>过往经营最大的问题：</span>
                        <div class="mores">
                            <b v-for="item in jyzt.shopIssues">{{item}} &nbsp;</b>
                        </div>
                    </li> -->
                </ul>
            </div>
            <div class="jingying wuye">
                <h3><span></span>物业信息</h3>
                <ul>
                    <li v-show="shopDetailArr.typeName"><span>商铺类型：</span><b>{{shopDetailArr.typeName}}</b></li>
                    <li v-show="shopDetailArr.buildArea"><span>建筑面积：</span><b>{{shopDetailArr.buildArea}}m²</b></li>
                    <!-- <li v-show="useArea"><span>建筑面积：</span><b>{{useArea}}m²</b></li> -->
                    <li v-show="shopDetailArr.floor"><span><b>楼</b>层：</span><b>{{shopDetailArr.floor}}</b></li>
                    <li v-show="shopDetailArr.spearate"><span>是否分隔：</span><b>{{shopDetailArr.spearate}}</b></li>
                    <li v-show="shopDetailArr.froutage"><span>临主干道：</span><b>{{shopDetailArr.froutage}}</b></li>
                    <li v-show="shopDetailArr.floorHeight"><span><b>层</b>高：</span><b>{{shopDetailArr.floorHeight}}m</b></li>
                    <li v-show="shopDetailArr.faceWidth"><span><b>面</b>宽：</span><b>{{shopDetailArr.faceWidth}}m</b></li>
                    <li v-show="shopDetailArr.depth"><span><b>进</b>深：</span><b>{{shopDetailArr.depth}}m</b></li>
                    <li v-show="shopDetailArr.orientation"><span><b>朝</b>向：</span><b>{{shopDetailArr.orientation}}</b></li>
                    <li v-show="shopDetailArr.propertyName"><span><b>产</b>权：</span><b>{{shopDetailArr.propertyName}}</b></li>
                    <!-- <li v-show="" class="m0"><span>其他产权：</span><b>{{}}</b></li> -->
                </ul>
            </div>
            <div class="jingying zuyue">
                <h3><span></span>租约相关</h3>
                <ul>
                    <li v-show="shopDetailArr.monthlyRent"><span><i>月</i><i>租</i>金：</span><b>{{shopDetailArr.monthlyRent}}{{unitMonthRent}}</b></li>
                    <li v-show="shopDetailArr.pledgeCash"><span><b>押</b>金：</span><b>{{shopDetailArr.pledgeCash}}</b></li>
                    <li v-show="shopDetailArr.payType"><span>支付方式：</span><b>{{shopDetailArr.payType}}</b></li>
                    <li v-show="shopDetailArr.timeRent"><span>分时出租：</span><b>{{shopDetailArr.timeRent}}</b></li>
                    <li v-show="shopDetailArr.maxLease"><span>最长租约：</span><b>{{shopDetailArr.maxLease}}个月</b></li>
                    <li v-show="shopDetailArr.currLease"><span>当前租约：</span><b>{{shopDetailArr.currLease}}个月</b></li>
                    <li v-show="shopDetailArr.residue"><span><i>还</i><i>剩</i>余：</span><b>{{shopDetailArr.residue}}个月</b></li>
                    <li v-show="shopDetailArr.leaseCase" class="m0"><span>续约情况：</span><b>{{shopDetailArr.leaseCase}}</b></li>
                </ul>
            </div>
            <div class="jingying weizhi">
                <h3><span></span>位置信息</h3>
                <ul>
                    <li v-show="shopDetailArr.areaName"><span><b>区</b>域：</span><b>{{shopDetailArr.areaName}}</b></li>
                    <li v-show="shopDetailArr.loopLine"><span><b>环</b>线：</span><b>{{shopDetailArr.loopLine}}</b></li>
                    <li v-show="shopDetailArr.road" class="m0"><span>临近道路：</span><b>{{shopDetailArr.road}}</b></li>
                </ul>
            </div>
            <div class="jingying zhuanrang">
                <h3><span></span>转让相关</h3>
                <ul>
                    <li><span><i>转</i><i>让</i>费：</span><b>{{shopDetailArr.transferFee}}{{shopDetailArr.unitTransFerfee}}</b></li>
                </ul>
            </div>
        </div>
        <div class="jieshao" v-if="shopDetailArr.linkman">
            <h3>店铺介绍</h3>
            <h4><img src="../../../static/images/shopDetail/user.png" alt=""><span>{{shopDetailArr.linkman}}</span>
              <b v-if="type!=3" class="fr" @click="telPhone()">电话咨询</b>
              <b v-else class="fr cur">电话咨询</b>
            </h4>
            <!--<p>融创国博城 国博会展商圈 建面约41-65㎡国博十字临街铺加推总价90万起120万止年均400万人潮 商机涌动 坐拥海量商务租住人气 下楼即享的社区消费主场</p>-->
        </div>
        <div class="detail" v-if="recommendList != ''">
            <h3>为您推荐</h3>
            <ul>
                <li v-for="(item,index) in recommendList" @click="go(item)">
                    <div class="wrap">
                        <div class="img">
                            <img :src="item.img" alt="" :onerror="defaultImg">
                            <div v-if="item.topStatus===1" class="zhiding"></div>
                        </div>
                        <div class="msg">
                            <h4>{{item.title}}</h4>
                            <p>{{item.shopName}}</p>
                            <div class="tags" v-if="item.shopTags != ''">
                                <span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span>
                            </div>
                            <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 委托找铺 -->
        <div class="weituo">
            <h3>一键委托 多块好省</h3>
            <div class="img"></div>
            <!-- <p><span @click="zhaoFun()">委托找铺</span><b @click="zhuanFun()">委托转铺</b></p> -->
            <p @click="modelPu=1"></p>
        </div>
    </div>
    <div class="footer">
        <div class="cang">
            <dl>
                <dt class="myshou" @click="shoucang($event)"></dt>
                <dd>收藏</dd>
            </dl>
        </div>
        <div class="tel" v-if="type!=3" @click="telPhone()">
            <span></span><b>直拨店主</b>  <!-- <a :href="tel">直拨店主</a> -->
            <div class="tel-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
        </div>
        <div class="tel cur" v-else>
            <span></span><b>直拨店主</b>  <!-- <a :href="tel">直拨店主</a> -->
            <div class="tel-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
        </div>
    </div>
    
    <!-- 热门商铺弹窗 -->
    <div class="popup-wrap" v-if="isPopupShow">
        <div class="popup-box">
            <h3>温馨提示</h3>
            <p>此商铺为热门商铺 仅限找铺会员查看</p>
            <p>升级找铺会员独享最新热门铺源</p>
            <p>同时享有8项专属服务</p>
            <ul>
                <li class="li1" @click="isPopupShow = false">知道了</li>
                <li @click="goBuymember()">升级找铺会员</li>
            </ul>
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
        yijian: true,//一键显示影藏
        type:"",//3是成交
        // shopName:"",//标题
        tel:"",//登录手机号
        code: "",//登录验证吗
        time: 60,
        send: "获取验证码",
        disabled:false,//验证码店家
        sendClass: 0,//验证码颜色
        modelLogin: "",//登录弹窗
        msg:"",
        defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
        browseCount: "",//多少人看了该商铺
        modelPu: "",//找铺转铺弹窗
        modelTxt: "",//转铺找铺
        id: "",  //商铺id
        today: false,
        // tel: "",
        add: 1,
        address1: "",
        shou: 0,
        num1: 1,
        title: 0,
        num2: 1,
        tab: 0,
        total: "",
        // monthlyRent: "",
        // dailyRent: "",
        shopTagsArr: [],
        realAddress: "", //店主真实地址
        shopPapers: "", //已有证件
        license: "", //证照：
        manageType: "", //当前经营
        shopNumber: "", //商铺编号
        shopSupportings: "", //配套设施
        useArea: "",
        imgs: "",
        gnote: "",
        dpjs:"",
        iphone: "", //获取店主电话
        rentType: "",
        businessAreaName: "", //商圈名称
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
        pvCount: "",//查看总数
        modelDown: "",
        modelTishi: "",
        threeNum: "",//三次
        buyMember: "",
        recommendList: "",//推荐列表
        telVal: "", // 委托找铺
        isPopupShow: false, //是否为热门
        isTelError: false,  //"手机号码错误提示"

        shopDetailArr: []


      }
    },
    watch:{
        tel(){
            let reg = isPoneAvailable(this.tel)
            if(reg == false){
                $(".model-login .cur").css({"background":"#ccc"})
            }else{
                $(".model-login .cur").css({"background":"#64ABFF"})
            }
        }
    },
    mounted(){
        var that = this;
        this.fenxiangID = getQueryString("url");
        this.msg = this.$route.query.msg;
        this.type = this.$route.query.type;
        this.id = this.$route.query.shopId || this.fenxiangID;

        if(this.type == 3){
            this.yijian = false;
        }

        // if(localStorage.total){
        //     alert(1);
            // 获取业主电话接口
            // this.phoneData();
        //}

        let USERS = window.localStorage.getItem("iphone");
        if(USERS){
            this.telVal = USERS;
            this.phoneData();
        }

        //初始化
        this.init()
        this.dataPost();
        if(getUrlId("move")){
            $(".back").hide();
            $(".content").css({margin:0})
        }

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
        jiucuoFun(){ //纠错
            if(localStorage.token){
                this.$http(this.changeData() + '/shop/auth/getCorrectionInfo',{
                    method: 'post',
                    params: {
                        cityId: sessionStorage.cityId,
                        shopId: this.id
                    }
                }).then(res => {
                    // console.log(res);
                    if(res.data.code == 101){
                        if(res.data.flag == true){
                            if(res.data.count == true){
                                layer.open({
                                    content: '每天只能纠错十个铺子哦～请明天再来吧！'
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                            }else{
                                this.$router.push({path:"/errorCorrection",query:{id:res.data.shop.id}})
                            }
                        }else{
                            layer.open({
                                content: '已有提交纠错信息且再审核中，不能重复提交！',
                                skin: 'msg',
                                time: 2 //2秒后自动关闭
                            });
                        }
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }else{
                this.$router.push({path: '/login',query:{shopDetail:1,shopId:this.id}});
            }
        },

        loginFun(){
            if(this.telFun() == true && this.code != ""){
                this.$http(this.changeData() + '/login',{
                    method: 'post',
                    params:{
                        account: this.tel,
                        password: this.code,
                        channel: 2
                    }
                }).then(res => {
                    // console.log(res);
                    if(res.data.code == 101){
                        this.modelLogin = 0;
                        layer.open({
                            content: '<h2>委托成功</h2><p>优铺客服会在<span class="red">24小时内</span>与您联系， 请保持手机畅通！</p>'
                            ,btn: '我知道了',
                            skin: 'tel1'
                        });
                        window.localStorage.setItem("iphone",res.data.phone);
                        window.localStorage.setItem("token",res.data.token);
                        window.localStorage.setItem("pvCount",res.data.pvCount);
                        window.localStorage.setItem("memberType",res.data.memberType);
                    }else if(res.data.code == 103){
                        layer.open({
                            content: '请输入正确验证码',
                            skin: 'msg',
                            time: 2});
                    } else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2
                        });
                    }
              }).catch(err => {
                console.log(err)
              });
            }else if(this.code == ""){
                layer.open({
                    content: '请输入验证码',
                    skin: 'msg',
                    time: 2
                });
            }
        },

        telFun(){//验证手机号
            let reg = isPoneAvailable(this.tel)
            if(this.tel==''){
                layer.open({
                    content: '请输入手机号',
                    skin: 'msg',
                    time: 2
                });
                this.disabled = false;
            }else if(reg == false){
                layer.open({
                    content: '请输入正确的手机号',
                    skin: 'msg',
                    time: 2
                });
                this.disabled = false;
            }else{
                return true;
            }
        },

        sendFun(){//发送验证码
            if(this.telFun() == true){
                this.$http(this.changeData() + '/user/sendsms',{
                    method: 'post',
                    params: {
                        phoneNumber: this.tel
                    }
                }).then(data => {
                    // console.log(data);
                    this.time = 60;
                    this.sendClass = 1;
                    this.timer();
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        timer() {
            if (this.time > 0) {
              this.time--;
              setTimeout(this.timer, 1000);
            } else{
              this.time=0;
              this.sendClass = 0;
              this.send = "重新获取";
            }
        },

        // 委托找铺
        zhaoFun(){
            let _this = this
            // 手机号码验证
            let reg=/^[1][3,4,5,7,8][0-9]{9}$/;

            if(this.telVal == ""){
                this.isTelError = true;
            }else if(!reg.test(this.telVal)){
                this.isTelError = true;
            }else {
                // 接口调用
                let url =  _this.changeData() + '/show/addCutomer'
                axios(url,{
                    method: 'post',
                    params: {
                        account: _this.telVal, //   委托手机号
                        type: '0', // 0 委托找铺 1 委托转铺
                        provinceId: sessionStorage.provinceId, // 省id
                        cityId: sessionStorage.cityId, // 市id
                        source: "3", // 渠道 0 Android 1 IOS 2 官网 3 M站
                    }
                }).then(data => {
                   if(data.data.code == 101){
                        layer.open({
                            content: data.data.msg,
                            skin: 'msg',
                            time: 4
                        });
                        _this.telVal = "";
                        _this.modelPu = 0;
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        // 委托转铺
        zhuanFun(){
            // this.$router.push({path:"/turnShop",query:{shopId:this.id}})
            // let that = this;
            // let kong = /^\s*$/g;
            // let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
            // if(kong.test(this.modelTxt)){
            //   $(".input span").show();
            //   $(".input span").html("*请输入手机号");
            // }else if(!reg.test(this.modelTxt)){
            //   $(".input span").show();
            //   $(".input span").html("*请输入正确手机号");
            // }else{
            //   this.$http(this.changeData() + '/show/addCutomer',{
            //     method: 'post',
            //     params: {
            //       account: this.modelTxt,
            //       type: '2',
            //       source: "2"
            //     }
            //   }).then(data => {
            //     if(data.data.code == 200){
            //       this.modelPu = 0;
            //       this.tel = this.modelTxt;
            //       this.modelLogin = 1;
            //       this.sendFun();
            //     }
            //   }).catch(err => {
            //     console.log(err)
            //   });
            // }
        },
        init(){
            var data = {
              shopId: this.id
            }
            this.$http.post(this.changeData() + '/shop/getShopDetail',qs.stringify(data)).then(function(res){
              // console.log(res);
              this.shopDetailArr = res.data.shopDetail;
              // this.shopName = res.data.shopDetail.shopName; //商铺名称
              this.browseCount = res.data.shopDetail.browseCount; //浏览次数
              this.shopSupportings = res.data.shopDetail.shopSupportings; //配套设施

              this.shopTagsArr = res.data.shopDetail.shopTags; //商铺的标签
              this.realAddress = res.data.shopDetail.realAddress; //真实地址
              this.shopPapers = res.data.shopDetail.shopPapers; //已有证件
              this.useArea = res.data.shopDetail.useArea; //使用面积
              this.license = res.data.shopDetail.license; //证照
              this.manageType = res.data.shopDetail.manageType; //当前经营
              this.shopNumber = res.data.shopDetail.shopNumber; //商铺编号

              this.imgs = res.data.shopDetail.imgs; //轮播图
              this.total = res.data.shopDetail.imgs.length;
              this.lng = res.data.shopDetail.lng;
              this.lat = res.data.shopDetail.lat;
              // this.dpjs = res.data.shopDetail.linkman; //店铺介绍
              this.recommendList = res.data.shopDetail.recommendList; //店铺推荐
              this.rentType = res.data.shopDetail.rentType;
              this.businessAreaName = res.data.shopDetail.businessAreaName; //商圈名称
              this.unitMonthRent = res.data.shopDetail.unitMonthRent; 
              this.unitDailyRent = res.data.shopDetail.unitDailyRent;
              this.unitTransFerfee = res.data.shopDetail.unitTransFerfee;

              // this.titleMsg = this.shopDetailArr.areaName+this.businessAreaName+this.shopDetailArr.road+this.shopDetailArr.buildArea+"m²,"+this.rentType+","+this.license;

              this.titleMsg = res.data.shopDetail.shopName;

              // console.log(this.titleMsg);

              try{
                this.shopSupportings.forEach(function (item,index,) {
                  $(".list dl").forEach(function (item1,index1) {
                    if(item == index1+1){
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
        // 微信分享
        fenxiangFun(){
            var that = this;
            var data = {
              url : window.location.href.split('#')[0]
            }
            this.$http.post(this.changeData() + '/member/weChatShare',qs.stringify(data)).then(function(res){
            // this.$http.post("http://tidhy.s1.natapp.cc/shop/getwx",qs.stringify(data)).then(function(res){
              // console.log(res);
              // console.log(that.imgs[0]);
              
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
                  desc: '租铺卖铺找优铺', // 分享描述
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
            }else if(localStorage.iphone && this.$route.query.shopOther){
              this.$router.push({path:"/message"})
            }else if(localStorage.iphone && this.$route.query.collectOther){
              this.$router.push({path:"/collect"})
            }else if(this.$route.query.shopMap || this.$route.query.buyMember || this.fenxiangID){
              this.$router.push({path:"/lookShop"})
            }else if(this.$route.query.home){
              this.$router.push({path:"/home"})
            }else if(this.$route.query.collect){
              this.$router.push({path:"/collect"})
            }else if(this.$route.query.url){
              this.$router.push({path:this.$route.query.url,query:{urlType:this.$route.query.urlType,shopId:this.$route.query.shopId}})
            }else if(this.$route.query.myPublish){
                this.$router.push({path:"/myPublish",query:{urlType: this.$route.query.urlType}});
            }else if(this.$route.query.shopDetail){
                this.$router.go(-1);
                window.scrollTo('0','0');
            }else if(this.$route.query.lookShop){

                this.$router.push({path:"/lookShop"});
                // this.$router.go(-1);
                // alert(1);
                // this.$router.back();

                // this.$router.push({path:"/lookShop"});
            }else{
                this.$router.push({path:"/lookShop"});
            }
        },
        // 页面初始化
        dataPost(){
            let url =  this.changeData() + '/shop/shopCheckedRecords';
            axios(url,{
                method: 'post',
                params:{
                    cityId: sessionStorage.cityId,
                    shopId: this.id,
                    type: "0",
                    roof: "0"
                },
            }).then(data => {
                // console.log("页面初始化");
                // console.log(data);
                if(data.data.code == "101"){
                    this.shopIdObj = data.data.shopId;
                    if(data.data.checkedStatus == "true"){ // 'true' 查看过  false 没有查看过
                        this.checkedLook = true;
                        this.add = 2;
                    }else{
                        this.checkedLook = false;
                    }
                    if(data.data.count == 1){
                        this.countNum = true;
                    }
                    if(data.data.collectionStatus == 'true') {
                        $(".myshou").addClass("cur");
                    }
                }else if(data.data.code == "201"){
                    localStorage.clear();
                }
            }).catch(err => {
                console.log(err)
            });
        },

        //直拨店主电话，查看详细地址，地图
        threeFun(fun){
            let that = this;
            if(localStorage.token == null){
                layer.open({
                    content: '请先登录',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                this.$router.push({path: '/login',query:{shopDetail:1,shopId:this.id}});
            }else{
                axios(this.changeData() + '/shop/shopCheckedRecords',{
                    method: 'post',
                    params:{
                        cityId: sessionStorage.cityId,
                        shopId: this.id,
                        type: "1",
                        roof: "0"
                    },
                }).then(data => {
                    // console.log(data);
                    if(data.data.code=="101"){
                        if(data.data.isHot == false){
                            this.isPopupShow = true;
                        }else{
                            this.numIndex = data.data.count;
                            this.pvCount = data.data.pvCount;
                            if(this.checkedLook == true){ //已经看过
                                this.lookFun(fun)
                            }else{
                                if(data.data.countStatus == false){//已经看了10次了
                                    this.modelTishi = 1;
                                }else {
                                    if(data.data.memberType == "2"){ //不是会员
                                        if(data.data.MlimitCountStatus == false) {//表示三套已经看完
                                            this.modelDown = 1;
                                        }else{
                                            if(this.bolClick){
                                                this.today = true;
                                                setTimeout(function () {
                                                    that.today = false;
                                                }, 2000)
                                                this.bolClick = false;
                                            }
                                            this.checkedLook = true;
                                            this.lookFun(fun)
                                        }
                                    }else{//会员
                                        if (this.bolClick) {
                                            this.today = true;
                                            setTimeout(function () {
                                                that.today = false;
                                            }, 2000)
                                            this.bolClick = false;
                                        }
                                        this.checkedLook = true;
                                        this.lookFun(fun)
                                    }
                                }
                            }
                        }
                    }else if(data.data.code=="201"){
                        localStorage.clear();
                        layer.open({
                            content: '请先登录',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                        this.$router.push({path: '/login',query:{shopDetail:1,shopId:this.id}});
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        lookFun(fun){
            var that = this;
            if(fun == "tel"){
                // console.log(this.iphone);
                window.location.href = "tel:" + this.iphone;
              
            }else if(fun == "map"){
              setTimeout(function (){
                that.$router.push({path:"/shopMap",query:{
                    shopDetail:1,
                    shopOther:that.msg,
                    collect:that.$route.query.collect,
                    shopId:that.id,lng:that.lng,
                    lat:that.lat,
                    areaName:that.shopDetailArr.areaName,
                    road:that.shopDetailArr.road,
                    realAddress:that.realAddress}})
              },1000)

            }else if(fun == "adr"){
              this.add = 2;
            }
        },
        // 获取业主电话接口
        phoneData(){
            let url =  this.changeData() + '/shop/auth/selectPhone';
            axios(url,{
                method: 'post',
                params:{
                    shopId: this.id,
                    type: "0",
                },
            }).then(data => {
                // console.log("店主电话");
                // console.log(data);
                if(data.data.code == "101"){
                    this.iphone = data.data.phone;
                    // console.log(this.iphone);
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 直拨店主电话
        telPhone(){
            let fun = "tel";
            this.threeFun(fun)
        },

        // 点击查看详细地址
        address(){
            let fun = "adr";
            this.threeFun(fun)
        },
        // 点击地图
        mapBtn(){
            let fun = "map";
            this.threeFun(fun)
        },

        // 点击收藏
        shoucang(e){
            var that = this;
            // let USERS = window.localStorage.getItem("iphone");

            if($(e.srcElement).hasClass("cur")){
                var data1 = {
                    shopId: this.id,
                }
                this.$http.post(this.changeData() + '/member/auth/cancelCollection',qs.stringify(data1)).then(function(res){
                    // console.log(res)
                    if(res.data.code=="101"){
                        $(e.srcElement).removeClass("cur");
                        layer.open({
                            content: '取消收藏',
                            skin:  'msg',
                            time: 2
                        });
                    }else if(res.data.code=="201"){
                        localStorage.clear();
                        layer.open({
                            content: '请先登录',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                        that.$router.push({path: '/login',query:{shopDetail:1,shopId:that.id}});
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin:  'msg',
                            time: 2
                        });
                    }
                }.bind(this)).catch(function(err){
                    console.log("商店列表页面错误：",err)
                })
            }else{
                var data2 = {
                    shopId: this.id,
                }
                this.$http.post(this.changeData() + '/member/auth/saveCollection',qs.stringify(data2)).then(function(res){
                    // console.log(res)
                    this.shopIdObj = res.data.shopCollId;
                    // console.log(this.shopIdObj);
                    if(res.data.code=="101"){
                        $(e.srcElement).addClass("cur");
                        layer.open({
                            content: '收藏成功',
                            skin: 'msg',
                            time: 2
                        });
                    }else if(res.data.code=="201"){
                        localStorage.clear();
                        layer.open({
                            content: '请先登录',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                        that.$router.push({path: '/login',query:{shopDetail:1,shopId:that.id}});
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin:  'msg',
                            time: 2
                        });
                    }
                }.bind(this)).catch(function(err){
                    console.log("商店列表页面错误：",err)
                })
            }
        },

        // 去会员购买页面
        goBuymember(){
            this.$router.push({path: '/buymember'});
        },

        // 为您推荐
        go(item){
            window.location.href = "http://"+window.location.host+"/shopDetail?"+"shopId="+item.id+"&shopDetail="+1+"&type="+item.type;
            window.scrollTo('0','0');
        }

    },
    watch: {
        telVal(){
            if(this.telVal.length == 13){
                this.isTelError = true;
            }else{
                this.isTelError = false;
            }
            let reg = /^1([38]\d|4[57]|5[0-35-9]|7[01-8])(\-\d{4}){2}$/;

            if(!reg.test(this.telVal)){
                this.isTelError  = false;
            }else{
                this.isTelError = true;
            }
        }
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
@import "../../../static/css/shopList.scss";
.shopdetail{
    width: 7.5rem;
    margin: 0 auto;
    position: relative;
    padding-bottom: 1rem;
    .yijian{
        position: fixed;
        right: -.12rem;
        top:50%;
        margin-top: -0.55rem;
        width: 1.59rem;
        height: 1.1rem;
        z-index: 99999;
        background: url("../../../static/images/shopDetail/yijian.png") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
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
            margin-top: -3.26rem;
            border-radius: .1rem;
            h2{
                text-align: center;
                font-size: .34rem;
                color: #333;
                font-weight: bold;
                margin-bottom: .3rem;
                margin-top: .48rem;
            }
            .msg{
                margin-left: .3rem;
                input{
                    width: 5.8rem;
                    height: .7rem;
                    padding-top: .06rem;
                    line-height: .4rem;
                    background: rgba(255,255,255,1);
                    border: 1px solid rgba(204,204,204,1);
                    border-radius: 6px;
                    padding-left: .2rem;
                    color: #ccc;
                    font-size: .26rem;
                    /*outline: none;*/
                    appearance:button;
                　　-moz-appearance:button; /* Firefox */
                　　-webkit-appearance:button; /* Safari 和 Chrome */
                }
                h5{
                    color: #e8584f;
                    font-size: .22rem;
                }
            }
            .btn{
                width: 6.6rem;
                position: absolute;
                left: 0;
                bottom: 0;
                margin-top: .6rem;
                span,b{
                    display: inline-block;
                    width: 50%;
                    height: .88rem;
                    line-height: .88rem;
                    color: #fff;
                    text-align: center;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                }
                span{
                    background: #F7F8FA;
                    border-radius: 0 0 0 5px;
                    color: #898989;
                }
                b{
                    background: #64ABFF;
                    border-radius: 0 0 5px 0;
                }
            }
            .close{
                position: absolute;
                right: .2rem;
                top: .2rem;
                width: 0.32rem;
                height: 0.32rem;
                background: url("../../../static/images/shopDetail/close.png") no-repeat;
                -webkit-background-size: 0.32rem 0.32rem;
                background-size: 0.32rem 0.32rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
    }
    .model-login{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: 99999;
        .model {
            width: 7.5rem;
            height: 4.74rem;
            background: #fff;
            position: absolute;
            left: 0;
            top: 0;
            h2 {
                height: 0.55rem;
                line-height: 0.55rem;
                text-align: center;
                font-size: .34rem;
                color: #333;
                font-weight: bold;
                margin-bottom: .3rem;
                margin-top: .65rem;
            }
            ul{
                margin-bottom: .5rem;
                li{
                    width: 6.33rem;
                    height: 0.84rem;
                    line-height: 0.84rem;
                    margin: 0 auto 0.3rem;
                    position: relative;
                    &:nth-of-type(1){
                        span{
                            position: absolute;
                            left: .1rem;
                            top: .25rem;
                            width: 0.24rem;
                            height: 0.36rem;
                            background: url("../../../static/images/shopDetail/iphone.png") no-repeat;
                            -webkit-background-size: 0.24rem 0.36rem;
                            background-size: 0.24rem 0.36rem;
                        }
                    }
                    &:nth-of-type(2){
                        span{
                            position: absolute;
                            left: .1rem;
                            top: .3rem;
                            width: 0.26rem;
                            height: 0.3rem;
                            background: url("../../../static/images/shopDetail/code.png") no-repeat;
                            -webkit-background-size: 0.26rem 0.3rem;
                            background-size: 0.26rem 0.3rem;
                        }
                    }
                    .tel{
                        font-size: .28rem;
                        width: 5.83rem;
                        height: 0.84rem;
                        padding-left: .5rem;
                        line-height: 0.84rem;
                        border: 0.01rem solid #ccc;
                        border-radius: .05rem;
                    }
                    .code{
                        font-size: .28rem;
                        width: 3.41rem;
                        height: 0.84rem;
                        padding-left: .5rem;
                        line-height: 0.84rem;
                        border: 0.01rem solid #ccc;
                        margin-right: .18rem;
                        border-radius: .05rem;
                    }
                    input{
                        vertical-align: middle;
                    }
                    b{
                        vertical-align: middle;
                        display: inline-block;
                        width: 2.22rem;
                        height: 0.84rem;
                        text-align: center;
                        color: #fff;
                        cursor: pointer;
                        line-height: 0.84rem;
                        background: #64ABFF;
                        border-radius: .05rem;
                        &.sendColor{
                            background: #ccc;
                            color: #fff;
                        }
                    }
                }
            }
            .close{
              position: absolute;
              left: .2rem;
              top: .5rem;
              width: 0.32rem;
              height: 0.32rem;
              background: url("../../../static/images/shopDetail/close.png") no-repeat;
              -webkit-background-size: 0.32rem 0.32rem;
              background-size: 0.32rem 0.32rem;
            }
            .btn{
              cursor: pointer;
              width: 7.5rem;
              height: 0.88rem;
              line-height: 0.88rem;
              text-align: center;
              font-size: 0.34rem;
              color: #fff;
              background: #64ABFF;
            }
        }
    }
    .model-tishi,.model-down{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: 99999;
        &.model-down{
            .model{
                height: 3.8rem;
                .close{
                   width: 0.32rem;
                   height: 0.32rem;
                   background: url("../../../static/images/shopDetail/close.png") no-repeat;
                   background-size: 0.32rem 0.32rem;
                   position: absolute;
                   left: 6.2rem;
                   top: .05rem;
                }
            }
        }
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
            p{
                text-align: center;
                width: 5.5rem;
                margin: 0 auto;
                .red{
                    color: #E8584F;
                }
            }
            div{
                width: 6.6rem;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 0.88rem;
                line-height: 0.88rem;
                span{
                    display: inline-block;
                    width: 50%;
                    font-size: .34rem;
                    background: #EAEAEA;
                    border-radius: 0 0 0 5px;
                    text-align: center;
                    color: #898989;
                    float: left;
                    a{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }
                }
               b{
                    display: inline-block;
                    width: 50%;
                    background: #64ABFF;
                    border-radius: 0 0 5px 0;
                    text-align: center;
                    a{
                        width: 100%;
                        height: 100%;
                        font-size: 0.34rem;
                        color: #fff;
                    }
                }
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
        left: auto;
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
            left: 0rem;
            top: 0rem;
            width: 1rem;
            height: 1rem;
            z-index: 100;
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
            border-bottom: 1px solid #f5f5f5;
            .youshi{
                width: 100%;
                height: .72rem;
                display: -webkit-box;
                display: box;
                overflow-x: auto;
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
                    &.cur{
                      background: #ccc;
                    }
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
                .iframe{
                    width: 7.5rem;
                    height: 13.3rem;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 99999;
                }
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
       .zhuangtai{
            background: #f7f8fa;
            padding: .5rem .2rem .2rem .2rem;
           .sheshi{
                h3{
                    height: .34rem;
                    line-height: .34rem;
                    color: #111;
                    font-weight: bold;
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
    .jieshao{
        background: #fff;
        padding: .2rem;
        h3{
            height: .34rem;
            line-height: .34rem;
            color: #111;
            font-weight: bold;
            font-size: .34rem;
        }
        h4{
            padding-top: .4rem;
            height: .9rem;
            line-height: .9rem;
            margin-bottom: .2rem;
            img{
                width:.9rem;
                height:.9rem;
                border-radius:50%;
            }
            span{
                margin-left: .1rem;
                font-size: .3rem;
            }
            b{
                margin-top: .1rem;
                width: 1.7rem;
                height: .7rem;
                line-height: .7rem;
                text-align: center;
                color: #fff;
                background: #64ABFF;
                border-radius: .06rem;
                &.cur{
                    background: #ccc;
                }
            }
        }
        p{
            width: 6.2rem;
            background: #EDEFF2;
            padding: .3rem;
            font-size: .28rem;
        }
    }
    .detail{
        h3{
          padding: .4rem .2rem 0;
          height: .34rem;
          line-height: .34rem;
          color: #111;
          font-weight: bold;
          font-size: .34rem;
        }
    }
    .weituo{
        padding-top: .2rem;
        padding-bottom: .4rem;
        h3{
            padding: .4rem 0;
            font-size: .34rem;
            text-align: center;
            font-weight: bold;
        }
        .img{
            width: 6.5rem;
            height: 6.14rem;
            margin: 0 auto;
            background: url("../../../static/images/shopDetail/zhao.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
        p{
            width: 6.25rem;
            height: .8rem;
            background: url("../../../static/images/shopDetail/zhaoBtn.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            /*margin-top: .3rem;*/
            margin: .4rem auto .8rem;
        }
        }
    }
    .footer{
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: auto;
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
        .tel.cur{
            background: #ccc;
        }
    }
}
/* 弹窗 */
.popup-wrap{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000000;
    .popup-box{
        width: 6.6rem;
        height: 3.6rem;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 30%;
        margin-left: -3.3rem;
        border-radius:10px;
        overflow: hidden;
        h3{
            color: #333;
            font-size: .34rem;
            text-align: center;
            /*line-height: 1.2rem;*/
            margin-top: .3rem;
            margin-bottom: .2rem;
        }
        p{
            text-align: center;
            color: #333;
            font-size: .3rem;
        }
        ul{
            width: 100%;
            height: .88rem;
            position: absolute;
            bottom: 0;
            left: 0;
            li{
                width: 50%;
                line-height: .88rem;
                float: left;
                background: #64ABFF;
                color: #fff;
                font-size: .34rem;
                text-align: center;
            }
            .li1{
                background: #f7f8fa;
                color: #898989;

            }
        }
    }
}
</style>
