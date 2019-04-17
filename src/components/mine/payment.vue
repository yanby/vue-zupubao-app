<template>
<div class="payment">
    <div class="paymentTop">
        <i @click="quitPayment()">
            <!-- <router-link to='/mine'> -->
                <img src="../../../static/images/mine/back.png">
            <!-- </router-link> -->
        </i>
        <h3>选择支付方式</h3>
    </div>
    <div class="paymentMain">
        <p>您需要支付<span>{{price}}</span>元</p>
        <dl>
            <dt>
                <img src="../../../static/images/mine/wechat.png">
            </dt>
            <dd>微信支付</dd>
            <i :class="{'on':tab===0}" @click="tab=0">
                <!-- <img src="../../../static/images/mine/selected.png"> -->
                <span></span>
            </i>
        </dl>
        <dl>
            <dt>
                <img src="../../../static/images/mine/alipay.png">
            </dt>
            <dd>支付宝支付</dd>
            <i :class="{'on':tab===1}" @click="tab=1">
                <span></span>
                <!-- <img src="../../../static/images/mine/round.png"> -->
            </i>
        </dl>
    </div>
    <div class="pay" @click="go()">立即支付<span>{{price}}</span>元</div>
    <!-- <mt-button type="primary">primary</mt-button> -->
    <div class="zhifubao"></div>
</div>
</template>

<script>
import qs from "qs";
import { MessageBox } from 'mint-ui';
export default {
name: 'collect',
  data () {
    return {
      tab: 0,
      id: "",
      order: "",
      price: "",
      ip:"",
      code: "",
      appId: "",
      timestamp : "",
      nonceStr : "",
      signature: "",
      package: "",
      signType: "",
      paySign: "",
      shopId: ""
    }
  },
  mounted(){
    this.id = this.$route.query.id;
    this.order = this.$route.query.order;
    this.price =  this.$route.query.price;
    this.shopId = this.$route.query.shopId;
    this.ip = returnCitySN["cip"];

    // 如果是微信浏览器，获取code
    if(isWeiXin()){
      this.init()
    }
  },
  methods:{
    go(){
        var that = this;
        var data = {
            cityId: sessionStorage.cityId, //市id
            id: that.id, //购买产品id
            orderSource: "3", //订单来源 0 android 1 ios 2 pc 3 m站
            orderNo: that.order, //订单编号
            ip: this.ip,
        }
        if(this.tab == 0){
            //判断是不是微信浏览器
            if(isWeiXin()){
                this.payFun();
                // MessageBox.confirm("下载租铺宝APP").then(action => {
                //   window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao";
                // });
            }else{
                // 微信支付
                this.$http(this.changeData() + "/weChat/auth/h5WeChatPay",{
                    method: 'post',
                    params: data
                }).then(res => {
                    // console.log(res)
                    if(res.data.code == "201"){
                        localStorage.clear();
                        layer.open({
                            content: '请先登录',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                        that.$router.push({path:"/login"})
                    }else{
                        window.location.href = res.data.data;
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        }else if(this.tab == 1){
            // 支付宝
            this.$http(this.changeData() + "/aliPay/auth/h5Pay",{                
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId, //市id
                    id: that.id, //购买产品id
                    orderSource: "3", //订单来源 0 android 1 ios 2 pc 3 m站
                    orderNo: that.order //订单编号
                }
            }).then(res => {
                // console.log(res);
                if(res.data.code == "201"){
                    localStorage.clear();
                    layer.open({
                        content: '请先登录',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                    that.$router.push({path:"/login"})
                }else{
                    $(".zhifubao").html(res.data.data);
                    document.forms[0].submit();
                }
            }).catch(err => {
              console.log(err)
            });
        }
    },
    quitPayment() {
        let _this = this;
        layer.open({
            content: '<h2>确定要放弃支付</h2><p>您与VIP会员只差一步之遥</p ><p>更多独享特权尽在<span>优铺</span>VIP会员</p >',
            btn: ['继续支付', '确认离开'],
            yes: function(index){
                layer.close(index);
            },
            no: function(index){
                // alert(1);
                if(_this.id && _this.$route.query.buyMember){
                  _this.$router.push({path:"/buymember",query:{"payMember":_this.$route.query.buyMember,"shopId":_this.$route.query.shopId}})
                }else if(_this.id && _this.$route.query.seekShop){
                  _this.$router.push({path:"/seekShop"})
                } else if(_this.id && _this.$route.query.turnShop){
                  _this.$router.push({path:"/turnShop"})
                } else if(_this.$route.query.url){
                  _this.$router.push({path:_this.$route.query.url,query:{urlType:_this.$route.query.urlType}})
                } else if(_this.id){
                  _this.$router.push({path:"/buymember",query:{mine:1}})
                }  else{
                  _this.$router.push({path:"/order"})
                }
            },
            skin: 'zhifu'
        })
    },
    init(){
        // var appId = 'wx424b6c66d2b53250';
        var appId = 'wx06e4787ad5a187a7';
        var oauth_url = encodeURIComponent(window.location.href.split('#')[0]);
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + oauth_url + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
        this.code = getQueryString("code");

        // alert(this.code);

        if (!this.code) {
            window.location = url;
        }
    },
    payFun(){
        var that = this;
        var data = {
            // url : window.location.href.split('#')[0],
            // token: localStorage.token,
            // account : localStorage.iphone,
            // productId: this.id,
            // orderNo: this.order,
            // code: this.code

            cityId: sessionStorage.cityId, //市id
            id: that.id, //购买产品id
            orderSource: "3", //订单来源 0 android 1 ios 2 pc 3 m站
            orderNo: that.order, //订单编号
            code: this.code
        }
        this.$http.post(this.changeData() + '/weChat/auth/weChatPay',qs.stringify(data)).then(function(res){
            // alert(res.data.appid);
            // alert(res.data.data.appid);

            if(res.data.code == "201"){
                localStorage.clear();
                layer.open({
                    content: '请先登录',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                that.$router.push({path:"/login"})
            }else{
                function onBridgeReady(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":res.data.data.appid, //公众号名称，由商户传入
                            "timeStamp":res.data.data.timestamp,  //时间戳，自1970年以来的秒数
                            "nonceStr":res.data.data.noncestr, //随机串
                            "package":res.data.data.package, //统一订单号
                            "signType":res.data.data.signType, //微信签名方式：
                            "paySign":res.data.data.sign //微信签名
                        },
                        function(res1){
                            WeixinJSBridge.log(res1.err_msg)
                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证 它绝对可靠。
                            if(res1.err_msg == "get_brand_wcpay_request:ok" ) {
                                that.$router.push({path:"/goodmember"})
                            } else{
                                // alert(res1.err_msg)
                                history.back();
                            }
                        }
                    );
                }
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if(document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                }else{
                    onBridgeReady();
                }
            }
        }.bind(this)).catch(function(err){
            console.log("商店详情页面错误：",err)
        });
    },
  }
}
</script>

<style scoped lang="scss">
.payment{
    width: 7.5rem;
    background: #f7f8fa;
}
.paymentTop{
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: relative;
}
.paymentTop h3{
    width: 75%;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #333;
    float: left;
    text-align: center;
}
.paymentTop i{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: inline-block;
    width: 13%;
    height: 1rem;
    line-height: 1rem;
    float: left;
}
.paymentTop i>img{
    width: 0.4rem;
    height: 0.4rem;
}
/*.paymentTop i>a>img{
    width: 0.4rem;
    height: 0.4rem;
}*/

.paymentMain{
    width: 7.5rem;
    p{
        height: 1.92rem;
        line-height: 1.92rem;
        color: #333;
        font-size: 0.34rem;
        border-bottom: 0.03rem solid #eaeaea;
        padding-left: 0.2rem;
        span{
            color: #e5091e;
            margin: 0 0.1rem;
        }
    }
    dl{
        width: 7.5rem;
        height: 1.2rem;
        border-bottom: 0.03rem solid #eaeaea;
        dt{
            width: 1.32rem;
            height: 1.2rem;
            /*background: red;*/
            text-align: center;
            line-height: 1.2rem;
            float: left;
            img{
                width: .8rem;
                height: .8rem;

            }
        }
        dd{
            color: #333;
            line-height: 1.2rem;
            font-size: .3rem;
            float: left;
        }
        i{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            line-height: 1.2rem;
            display: inline-block;
            float: right;
            margin-right: .2rem;
            span{
                display: inline-block;
                width: .5rem;
                height: .5rem;
                background: url(../../../static/images/mine/round.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            &.on{
                span{
                    display: inline-block;
                    width: .5rem;
                    height: .5rem;
                    background: url(../../../static/images/mine/selected.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
}
.pay{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 80%;
    height: 1rem;
    font-size: 0.34rem;
    color: #fff;
    font-weight: 600;
    line-height: 1rem;
    text-align: center;
    background: #47abff;
    border-radius: 5px;
    margin-left: 10%;
    margin-top: .64rem;
    span{
        margin: 0 0.1rem;
    }
}
</style>
<style>
  .layui-m-layer-zhifu .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-zhifu h2{
    font-size: .34rem!important;
    font-weight: bold!important;
    margin-bottom: .3rem;
    color: #333;
  }
  .layui-m-layer-zhifu p{
    font-size: .32rem;
    line-height: .5rem;
    color: #333;
  }
  .layui-m-layer-zhifu p span{
    color: #76aaf8;
  }
  .layui-m-layer-zhifu .layui-m-layerbtn{
    border-top: 0.01rem solid #D0D0D0;
  }
  .layui-m-layer-zhifu .layui-m-layerbtn span:nth-of-type(1){
    color: #898989;
    background: #f7f8fa;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-right: 0.01rem solid #D0D0D0;
  }
  .layui-m-layer-zhifu .layui-m-layerbtn span:nth-of-type(2){
    color: #fff;
    background: #64AAFF;
    font-size: .34rem;
    border-radius: 0 0 5px 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>


