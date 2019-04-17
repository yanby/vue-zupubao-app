<template>
    <div class="turnShop">
        <div class="turnShop-main">
            <div class="nav clearfix">
                    <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="" @click="navBack()">
                <h2 class="navTitle pull-left">委托转铺</h2>
            </div>

            <!-- 委托转铺头部 -->
            <div class="turnShopTop">
                <div @click="sendContent()">立即委托</div>
            </div>
            <!-- 多块好省 -->
            <div class="turnShopTop2">
                <img src="../../../static/images/turnShop/turnShopBg.png">
                <!-- <dl>
                    <dt><img src="../../../static/images/seekShop/much.png"></dt>
                    <dd>
                        <p><span>5万+</span>找铺客户</p>
                        <p>日新增<span>1000+</span>客户</p>
                    </dd>
                </dl>
                <dl>
                    <dt><img src="../../../static/images/seekShop/fast.png"></dt>
                    <dd>
                        <p>最快<span>7天</span>成交</p>
                        <p>平均<span>32天</span>成功转出</p>
                    </dd>
                </dl>
                <dl>
                    <dt><img src="../../../static/images/seekShop/good.png"></dt>
                    <dd>
                        <p>一对一顾问服务</p>
                        <p>不成交<span>不收费</span></p>
                    </dd>
                </dl>
                <dl>
                    <dt><img src="../../../static/images/seekShop/province.png"></dt>
                    <dd>
                        <p>收费仅为中介<span>1/10</span></p>
                        <p>省时省心更省钱</p>
                    </dd>
                </dl> -->
            </div>
            <!-- 6大保障 -->
            <div class="sixSecurity">
                <div class="sixSecurityTitle">
                    <h3>委托转铺6大安心服务保障</h3>
                    <i></i>
                </div>
                <div class="sixSecurityMain">
                    <dl v-for="item in sixSecurityArr">
                        <dt><img :src="item.img"></dt>
                        <dd>
                            <h4>{{item.msg1}}</h4>
                            <p>{{item.msg2}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
            <!-- 委托转铺具体服务流程 -->
            <div class="serviceFlow">
                <div class="serviceFlowTitle">
                    <h3>委托转铺具体服务流程</h3>
                    <i></i>
                </div>
                <div class="serviceFlowMain">
                    <dl v-for="item in serviceFlowArr">
                        <dt>
                            <img :src="item.img">
                        </dt>
                        <dd>
                            <h4>{{item.msg1}}</h4>
                            <p>{{item.msg2}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
            <!-- 委托转铺服务收费标准 -->
            <div class="chargeStandard clearfix">
                <div class="chargeStandardTitle">
                    <h3>委托转铺服务收费标准</h3>
                    <i></i>
                </div>
                <div class="chargeStandardMain" v-for="item in vipArr">
                    <!-- <div class="chargeStandardMainDl"> -->
                        <dl>
                            <dt>
                                <h4>{{item.dsc}}</h4>
                                <h5>¥{{item.price}}</h5>
                            </dt>
                            <dd @click="goBuyBtn(item)">立即购买</dd>
                        </dl>
                    <!-- </div> -->
                </div>
            </div>
            <div class="consultingTel">
                <p>服务咨询电话：400-898-8808</p>
            </div>
            <!-- 底部盒子 -->
            <div class="bottomDiv"></div>
            <!-- 悬浮框 -->
            <div class="input-bottom">
                <input type="tel" name="" placeholder="请输入手机号码，专属顾问5分钟内与您联系" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号码，专属顾问5分钟内与您联系'" maxlength="11" class="txt-input" v-model="telVal">
                <div class="wrap-input-img"><img src="../../../static/images/seekShop/seekBtn.png" alt="" @click="sumbtn()"></div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'turnShop',
    data () {
        return {
            telVal: "",
            // source: "",
            shopIndex: "",
            // 6大保障
            sixSecurityArr: [
                {
                    img: "../../../static/images/turnShop/img1.png",
                    msg1: "上门实勘 免费评估",
                    msg2: "专业商铺顾问上门核实店铺，免费评估费用信息，确保价位合理"},
                // {
                //     img: "../../../static/images/turnShop/img2.png",
                //     msg1: "不成交 退服务费",
                //     msg2: "合作期间未能成功转出店铺，退还服务费，转铺无压力"},
                {
                    img: "../../../static/images/turnShop/img3.png",
                    msg1: "全网推广 效果倍增",
                    msg2: "优铺自有平台，外部合作平台全覆盖推广，转店效率提升10倍"},
                {
                    img: "../../../static/images/turnShop/img4.png",
                    msg1: "精准配客 一对一服务",
                    msg2: "大数据匹配系统+专业顾问一对一服务，精准推荐匹配客户，协助店主谈判议价"},
                {
                    img: "../../../static/images/turnShop/img5.png",
                    msg1: "全程陪签 规避风险",
                    msg2: "专业商铺顾问全程陪同签约，免费提供标准合同，杜绝签约风险"},
                {
                    img: "../../../static/images/turnShop/img6.png",
                    msg1: "资金托管 安全交易",
                    msg2: "转让费过户监管，免费法律援助，平稳交易更安全"}
            ],
            // 委托转铺具体服务流程
            serviceFlowArr: [
                {
                    img: "../../../static/images/turnShop/up1.png",
                    msg1: "在线委托",
                    msg2: "填写联系电话等待顾问联系"},
                {
                    img: "../../../static/images/turnShop/up2.png",
                    msg1: "支付成功",
                    msg2: "在线支付付款完成"},
                {
                    img: "../../../static/images/turnShop/up3.png",
                    msg1: "匹配顾问",
                    msg2: "根据经营业态匹配顾问，一对一服务"},
                {
                    img: "../../../static/images/turnShop/up4.png",
                    msg1: "精准配客",
                    msg2: "顾问根据店铺需求，精准推荐符合客源"},
                {
                    img: "../../../static/images/turnShop/up5.png",
                    msg1: "交易撮合",
                    msg2: "顾问免费协助店主与意向客户谈判议价促成交易"},
                {
                    img: "../../../static/images/turnShop/up6.png",
                    msg1: "陪同签约",
                    msg2: "顾问全程陪同签约，免费提供标准合同，转让费过户监管"},
                {
                    img: "../../../static/images/turnShop/up7.png",
                    msg1: "成功转出",
                    msg2: "顾问全程协助办理过户交割，店铺成功转出"}
            ],
            // 购买VIP
            // vipArr: [
            //     {msg:"1个月",price:500,id:18},
            //     {msg:"2个月",price:800,id:19},
            //     {msg:"3个月",price:1200,id:20},
            //     // {msg:"101万以上",price:8000,id:12}
            // ],
            vipArr: [],
            appCityId: "",
            move: "",
            appProvinceId: "",
            appAccount: "",
            appSource: ""

        }
    },
    computed:{

    },
    methods:{
        // 点击提交按钮
        sumbtn() {
            let _this = this

            // 手机号码验证
            let reg=/^[1][3,4,5,7,8][0-9]{9}$/;

            if(this.telVal == ""){
                layer.open({
                    content: '请输入手机号码',
                    skin: 'msg',
                    time: 2
                });
            }else if(!reg.test(this.telVal)){
                layer.open({
                    content: '请输入正确手机号',
                    skin: 'msg',
                    time: 2
                });
            }else {
                // 接口调用
                let url = _this.changeData() + '/show/addCutomer'
                axios(url,{
                    method: 'post',
                    // url: url,
                    params: {
                        // account: _this.telVal, //   委托手机号
                        // type: '1', // 0 委托找铺 1 委托转铺
                        // provinceId: sessionStorage.provinceId, // 省id
                        // cityId: sessionStorage.cityId, // 市id
                        // source: "3", // 渠道 0 Android 1 IOS 2 官网 3 M站

                        account: _this.telVal || _this.appAccount, //   委托手机号
                        type: '1', // 0 委托找铺 1 委托转铺
                        provinceId: sessionStorage.provinceId || _this.appProvinceId, // 省id
                        cityId: sessionStorage.cityId || _this.appCityId, // 市id
                        source: "3" || _this.appSource, // 渠道 0 Android 1 IOS 2 官网 3 M站
                    }
                    // params: obj
                }).then(data => {
                    if(data.data.code == 101){
                        layer.open({
                          content: data.data.msg,
                          skin: 'msg',
                          time: 4
                        });
                        _this.telVal = "";
                    }else{
                        ayer.open({
                          content: '系统繁忙，请稍后再试',
                          skin: 'msg',
                          time: 4
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        navBack(){
            // this.$router.go(-1);
            if(this.shopIndex){
                this.$router.push({path:"/shopDetail",query:{shopId: this.shopIndex}});
            }else if(this.$route.query.lookShop){
                this.$router.push({path: '/lookShop'});
            }else{
                this.$router.push({path: '/home'});
            }
        },
        sendContent(){
            if(this.move == "ios"){
                window.location.href="seekshopbtn://";
            }else{
                $(".txt-input").focus();
            }
        },
        // 去支付页面
        goBuyBtn(item){
            if(this.move == "ios"){
                window.location.href="turnshop://" + item.id;
            }else if(this.move == "android"){
                return AndroidBuy.showToast(item.id);
            }else{
                let isLogin = window.localStorage.getItem("iphone");
                if(isLogin){
                    this.$router.push({path:"/payment",query:{"id":item.id,"price":item.price,"turnShop":"1"}});
                }else{
                    this.$router.push({path:"/login",query:{"id":item.id,"price":item.price,"urlType":"turnShop"}});
                }
            }
        },
        // 获取产品信息
        memberData(){
            // 接口调用
            let _this = this;
            let url = _this.changeData() + '/member/selectProductList'
            axios(url,{
                method: 'post',
                // url: url,
                params: {
                    type: '4', // 0 找铺会员 4 转铺会员 1 VIP选址服务
                    cityId:  sessionStorage.cityId || this.appCityId, // 市id
                }
            }).then(data => {
                // console.log(data);
                this.vipArr = data.data.productList;
            }).catch(err => {
                console.log(err)
            });
        }


    },
  mounted() {
        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        // var urlId = request['id'];
        var urlIndex = request['url'];
        var shopId = request['shopId'];
        this.shopIndex = shopId;

        this.appCityId = request['cityId'];
        this.move = request['move'];
        this.appProvinceId = request['provinceId'];
        this.appAccount = request['account'];
        this.appSource = request['source'];

        if(this.move == "ios"){
            $(".input-bottom").hide();
        }else if(this.move == "android"){
            $(".nav").hide();
        }

        // 获取产品信息
        this.memberData();

        // if(urlId){
        //     this.source = urlId;
        //     $(".nav").hide();
        // }
        
        if(urlIndex){
            this.telVal = urlIndex;
        }

        let USERS = window.localStorage.getItem("iphone");
        if(USERS){
            this.telVal = USERS
        }
        if(this.move == "android"){
            this.telVal = this.appAccount;
        }
    }
}
</script>

<style scoped lang="scss">
/*浮动*/
.pull-right{
    float: right;
}
.pull-left{

    float: left;
}
.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}
.clearfix {
    zoom: 1;
}

input::-webkit-input-placeholder{
    color: #fff;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #fff;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #fff;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:  #fff;
}

.main{
    width: 7.5rem;
    margin: 0 auto;
    background: #f0eff6;
    position: absolute;
    top: 0;
    bottom: 0rem;
    padding-bottom: .5rem;
}
/*导航*/
.nav{
    width: 7.1rem;
    height: 1rem;
    background: #fff;
    margin:0 auto;
    padding: 0rem 0.2rem 0 0.2rem;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 10000;
}
.nav a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.navBack{
    width: 0.32rem;
    height: 0.36rem;
    margin-top: 0.3rem;
}
.navTitle{
    height: 1rem;
    width: 6.4rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #111;
    text-align: center;
}
/**/
.turnShop-main{
    width: 7.5rem;
    margin: 0 auto;
    background: #f0eff6;
    position: absolute;
    top: 0;
    bottom: 0rem;
    padding-bottom: 1rem;
}
.turnShopTop{
    width: 7.5rem;
    height: 7.9rem;
    background: url("../../../static/images/turnShop/turnShopTop.png") no-repeat top center;
    background-size: 7.5rem 7.9rem;
    position: relative;
    div{
        width: 3.66rem;
        height: .84rem;
        background: url("../../../static/images/seekShop/seekShopTopBtn.png") no-repeat top center;
        background-size: 3.66rem .84rem;
        position: absolute;
        bottom: 2rem;
        left: -1.83rem;
        margin-left: 50%;
        text-align: center;
        line-height: .84rem;
        color: #fff;
        font-size: .36rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}
/*多块好省*/
.turnShopTop2{
    width: 7.5rem;
    height: 3.5rem;
    background: #fff;
    position: relative;
    img{
        width: 6.74rem;
        height: 4.8rem;
        position: absolute;
        left: .38rem;
        top: -1.4rem;
    }
}
/*6大保障*/
.sixSecurity{
    width: 7.5rem;
    background: #fff;
    padding-bottom: 1.07rem;
    .sixSecurityTitle{
        width: 7.5rem;
        height: 1.1rem;
        background: #fff;
        padding-top: 1rem;
        text-align: center;
        h3{
            color: #333;
            text-align: center;
            font-size: .34rem;
            font-weight: medium;
        }
        i{
            width: 1.06rem;
            height: .06rem;
            background: #66ABFF;
            display: inline-block;
            position: relative;
            top: -.16rem;
        }
    }
    .sixSecurityMain{
        width: 7.5rem;
        dl{
            width: 7.12rem;
            height: 1.9rem;
            background: #F7F8FA;
            margin-left: .19rem;
            margin-bottom: .2rem;
            dt{
                width: 1.36rem;
                float: left;
                img{
                    width: .6rem;
                    height: .6rem;
                    margin-top: .68rem;
                    margin-left: .36rem;
                }
            }
            dd{
                width: 5.7rem;
                float: left;
                h4{
                    color: #333;
                    font-size: .32rem;
                    font-weight: medium;
                    margin-top: .3rem;
                    margin-bottom: .1rem;
                }
                p{
                    color: #666;
                    font-size: .28rem;
                    line-height: .4rem;

                }
            }
        }
    }
}
/*服务流程*/
.serviceFlow{
    width: 7.5rem;
    height: 8.76rem;
    /*background: url("../../../static/images/turnShop/backgroundImg.png") no-repeat top center;*/
    background: url("https://up-static.oss-cn-beijing.aliyuncs.com/backgroundImg.png") no-repeat top center;
    background-size: 7.5rem 8.76rem;
    .serviceFlowTitle{
        width: 7.5rem;
        height: 1.04rem;
        padding-top: .5rem;
        text-align: center;
        h3{
            color: #fff;
            font-size: .34rem;
            text-align: center;
        }
        i{
            width: 1.06rem;
            height: .06rem;
            background: #66ABFF;
            display: inline-block;
            position: relative;
            top: -.16rem;
        }
    }
    .serviceFlowMain{
        dl{
            width: 7.5rem;
            height: .98rem;
            dt{
                width: 1.07rem;
                height: .8rem;
                float: left;
                text-align: center;
                img{
                    width: .5rem;
                    height: .5rem;
                    margin-top: .14rem;
                }
            }
            dd{
                h4{
                    color: #66ABFF;
                    font-size: .3rem;
                }
                p{
                    color: #fff;
                    font-size: .24rem;
                    line-height: .3rem;
                }
            }
        }
    }
}
/*购买Vip*/
.chargeStandard{
    width: 7.5rem;
    .chargeStandardTitle{
        width: 7.5rem;
        height: 1.04rem;
        padding-top: 1rem;
        text-align: center;
        h3{
            color: #333;
            font-size: .34rem;
            text-align: center;
        }
        i{
            width: 1.06rem;
            height: .06rem;
            background: #66ABFF;
            display: inline-block;
            position: relative;
            top: -.16rem;
        }
    }
    .chargeStandardMain{
        dl{
            width: 2rem;
            height: 2.35rem;
            background: rgba(255,255,255,1);
            border: 2px solid rgba(100,171,255,1);
            border-radius: 10px;
            float: left;
            margin-left: .3rem;
            position: relative;
            overflow: hidden;
            dt{
                text-align: center;
                h4{
                    margin-top: .46rem;
                    font-size: .30rem;
                    color: #444;

                }
                h5{
                    font-weight: 600;
                    font-size: .36rem;
                    color: #f0715c;
                }
            }
            dd{
                width: 2rem;
                line-height: .6rem;
                background: #64abff;
                font-size: .3rem;
                color: #fff;
                text-align: center;
                position: absolute;
                bottom: 0rem;
                left: 0rem;
            }
        }
    }
}
/*客服电话*/
.consultingTel{
    width: 7.5rem;
    padding-top: .8rem;
    padding-bottom: .55rem;
    p{
        color: #333;
        font-size: .28rem;
        text-align: center;
    }
}
/*底部输入框*/
.input-bottom{
    width: 7.5rem;
    height: 1.3rem;
    position: fixed;
    bottom: 0px;
    background: #fff;
    box-shadow:0px 0px 2px #64ABFF;
    input{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 68%;
        height: 0.9rem;
        border-radius: 10px;
        margin-left: 6%;
        float: left;
        font-size: .24rem;
    }
}
.txt-input{
    margin-top: 0.2rem;
    font-size: 0.3rem;
    background: #64ABFF;
    text-indent: 0.2rem;
    color: #fff;
    float: left;
}
.wrap-input-img{
    width: 18%;
    margin-left: 2%;
    float: left;
    margin-top: 0.2rem;
    img{
        width: 100%;
        height: .9rem;
    }
}
/*底部盒子*/
.bottomDiv{
    height: 1.3rem;
    width: 7.5rem;
    background: #f7f8fa;
}
</style>

