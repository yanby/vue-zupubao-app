<template>
  <div class="buy">
    <div class="title">
        <h3>
            <!-- <div class="back" @click.stop="back()"><span></span></div> -->
            <div class="huiyuan" :class="{'on':tab===0}" @click="tab=0">找铺会员 <span></span></div>
            <div class="xuanzhi" :class="{'on':tab===1}" @click="tab=1">转铺会员<span></span></div>
            <div class="zhuanpu" :class="{'on':tab===2}" @click="tab=2">VIP选址服务<span></span></div>
        </h3>
    </div>
    <div class="content">
        <ul>
            <!-- 找铺会员 -->
            <li v-show="tab===0" class="huiyuan">
                <div class="zhuanpu-bg">
                    <div class="zhuanpu-title">
                        <div class="title-txt">已有 <span>18376</span> 位用户成功升级</div>
                        <div class="title-msg clearfix">
                            <ul>
                                <!-- <li v-for="(item,index) in msg">
                                    <span>{{item.huiyuan}}</span>
                                    <b>{{item.price}}元</b>
                                    <i @click="huiyuanbuy(item)">购买</i>
                                </li> -->
                                <li v-for="(item,index) in seekShopMemberArr">
                                    <span>{{item.dsc}}</span>
                                    <b>{{item.price}}元</b>
                                    <i @click="huiyuanbuy(item)">购买</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="zhuanpu-liucheng">
                        <h3>找铺会员专享特权</h3>
                        <dl class="clearfix">
                            <dt></dt>
                            <dd>
                                <h5>每天查看30套铺源</h5>
                                <p>每日查看铺源从5套增加到30套，店主电话随意拨打</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="other"></dt>
                            <dd>
                                <h5>新上热门铺源抢先看</h5>
                                <p>新上热门铺源48小时内只对会员开放，看铺抢先一步</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="two"></dt>
                            <dd>
                                <h5>商铺资质免费审核</h5>
                                <p>商铺证照、产权专业顾问审核，确保商铺合规</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="three"></dt>
                            <dd>
                                <h5>拆迁风险免费评估</h5>
                                <p>权威机构拆迁风险评估，顾问陪同实地勘验</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="four"></dt>
                            <dd>
                                <h5>转让费免费评估</h5>
                                <p>转让费平均虚高3成，专业顾问一对一评估，确保实价</p>
                            </dd>
                        </dl>
                        <dl class="clearfix cur">
                            <dt class="five"></dt>
                            <dd>
                                <h5>协助谈判议价</h5>
                                <p>专业顾问全程协助谈判议价，如高出个人自行谈判价格，赔</p>
                                <p class="cur">差价</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="six"></dt>
                            <dd>
                                <h5>交易过户担保</h5>
                                <p>免费提供标准合同，转让费过户监管，零风险交付</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="seven"></dt>
                            <dd>
                                <h5>开店专家经营指导</h5>
                                <p>数百位行业开店专家，免费指导经营，开店不再难</p>
                            </dd>
                        </dl>
                    </div>
                    <div class="zhuanpu-wenti">
                        <h3>问题解答</h3>
                        <div class="wenti-img"></div>
                    </div>
                    <div class="zhuangpu-tel"><b></b><s>服务咨询电话：400-898-8808</s><b></b></div>
               </div>
            </li>
            <!-- 转铺会员 -->
            <li v-show="tab===1">
                <div class="turnShopMemberBox">
                    <img src="../../../static/images/turnShopMember/turnShopMemberBg.png">
                    <div class="turnShopMemberdiv">
                        <h3>您想购买多久的转铺会员呢？</h3>
                        <ul>
                            <!-- <li v-for="(item,index) in xuanzhi">
                                <h5>{{item.month}}</h5>
                                <p>¥{{item.price}}</p>
                                <span @click="fuwubuy(item)">购买</span>
                            </li> -->
                            <li v-for="(item,index) in turnShopMemberArr">
                                <h5>{{item.dsc}}</h5>
                                <p>¥{{item.price}}</p>
                                <span @click="fuwubuy(item)">购买</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="turnShopMemberText">
                    <img src="../../../static/images/turnShopMember/turnShopMemberText.png">
                </div>
            </li>
            <!-- VIP选址服务 -->
            <li v-show="tab===2" class="xuanzhi">
                <div class="zhuanpu-bg">
                    <div class="zhuanpu-title clearfix">
                        <dl>
                            <dt></dt>
                            <dd>
                                <p><span>10万+</span>套真铺源</p>
                                <p>日更新<span>1000+套</span></p>
                            </dd>
                        </dl>
                        <dl>
                            <dt class="two"></dt>
                            <dd>
                                <p>最快<span>48小时</span>成交</p>
                                <p>平均<span>28天</span>成功开店</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt class="three"></dt>
                            <dd>
                                <p>一对一顾问服务</p>
                                <p>不成交<span>不收费</span></p>
                            </dd>
                        </dl>
                        <dl>
                            <dt class="four"></dt>
                            <dd>
                                <p>收费仅为中介<span>1/10</span></p>
                                <p>省时省心更省钱</p>
                            </dd>
                        </dl>
                    </div>
                    <div class="zhuanpu-biaozhun">
                        <h3>VIP 选址服务服务收费标准</h3>
                        <div class="table">
                            <table>
                                <!-- <tr v-for="(item,index) in zhuanpu">
                                    <td>{{item.zujing}}</td>
                                    <td>{{item.price}}元</td>
                                    <td>{{item.month}}<span @click="zhuanpuFun(item)">立即购买</span></td>
                                </tr> -->
                                <tr v-for="(item,index) in vipSiteServeArr">
                                    <td>{{item.dsc}}</td>
                                    <td>{{item.price}}元</td>
                                    <td>服务期3个月<span @click="zhuanpuFun(item)">立即购买</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="zhuanpu-baozhang">
                        <h3>VIP选址服务6大安心服务承诺 </h3>
                        <div class="baozhang-list clearfix">
                            <div class="baozhang-msg">
                                <div class="img one"></div>
                                <h5>100%真铺源 精准匹配商铺</h5>
                                <p>铺源100%人工核验，证照、产权审核确保合规，按需精准配铺，拒绝低效找铺方式</p>
                            </div>
                            <div class="baozhang-msg">
                                <div class="img two"></div>
                                <h5>不成交 退服务费</h5>
                                <p>合作期间未能成功找到满意店铺，退还服务费，找铺无压力</p>
                            </div>
                        </div>
                        <div class="baozhang-list clearfix">
                            <div class="baozhang-msg">
                                <div class="img three"></div>
                                <h5>实价保障 差价赔付</h5>
                                <p>专业选址顾问协助谈判议价，转让费平均砍掉3成，如高出个人谈判价格，赔差价</p>
                            </div>
                            <div class="baozhang-msg">
                                <div class="img four"></div>
                                <h5>拆迁担保 10倍赔付</h5>
                                <p>权威机构拆迁风险评估，如一年内遇拆迁，保障资金10倍赔付</p>
                            </div>
                        </div>
                    <div class="baozhang-list clearfix">
                        <div class="baozhang-msg">
                            <div class="img five"></div>
                            <h5>全程陪签  规避风险</h5>
                            <p>专业选址顾问全程陪同签约，免费提供标准合同，零风险交付</p>
                        </div>
                        <div class="baozhang-msg">
                            <div class="img six"></div>
                            <h5>交易托管 安全可靠</h5>
                            <p>转让费过户监管，免费法律援助，平稳交易更安全 </p>
                        </div>
                    </div>
                </div>
                <div class="zhuanpu-liucheng">
                    <h3>VIP选址服务具体服务流程</h3>
                    <dl class="clearfix">
                            <dt></dt>
                            <dd>
                                <h5>支付成功</h5>
                                <p>在线支付付款完成</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="two"></dt>
                            <dd>
                                <h5>匹配顾问</h5>
                                <p>根据经营业态匹配顾问，一对一服务</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="three"></dt>
                            <dd>
                                <h5>精准配铺</h5>
                                <p>顾问根据店铺需求，精准推荐符合客源</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="four"></dt>
                            <dd>
                                <h5>谈判议价</h5>
                                <p>意向店铺顾问免费协助谈判议价，确保实价杜绝虚高</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="five"></dt>
                            <dd>
                                <h5>陪同签约</h5>
                                <p>顾问全程陪同签约，免费提供标准合同，转让费过户监管</p>
                            </dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="six"></dt>
                            <dd>
                                <h5>成功开店</h5>
                                <p>店铺签约成功，提供代办证照、金融贷款等延伸服务</p>
                            </dd>
                        </dl>
                    </div>
                    <div class="zhuangpu-tel"><b></b><s>服务咨询电话：400-898-8808</s><b></b></div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
  export default {
    data(){
      return{
        tab:0,
        android: "",
        ios:"",
        news: "",
        shopId: "",
        shopDetail:"",
        price: false,
        iphone: "",
        cityId: "",
        // 找铺会员
        msg: [
            {huiyuan:"1个月",price:400,id:1},
            {huiyuan:"2个月",price:600,id:2},
            {huiyuan:"3个月",price:1000,id:3}
        ],
        // 转铺会员 
        xuanzhi: [
            {price:500,month:"1个月",id:18},
            {price:800,month:"2个月",id:19},
            {price:1200,month:"3个月",id:20}
        ],
        // VIP 选址
        zhuanpu: [
            {zujing:"小于50㎡",price:5000,month:"服务期3个月",id:5},
            {zujing:"51-150㎡",price:6000,month:"服务期3个月",id:6},
            {zujing:"151-300㎡",price:7000,month:"服务期3个月",id:7},
            {zujing:"301-500㎡",price:8000,month:"服务期3个月",id:8},
            {zujing:"501㎡以上",price:10000,month:"服务期3个月",id:21},
        ],

        // 找铺会员
        seekShopMemberArr: [],
        // 转铺会员
        turnShopMemberArr: [],
        // vip选址服务
        vipSiteServeArr: []
      }
    },
    computed:{

    },
    mounted(){
        // this.init();
        this.android = getUrlId("android");
        this.ios = getUrlId("ios");
        this.iphone = getUrlId("iphone");
        // this.cityId = getUrlId("cityId");

        if(this.android == 1 || this.ios == 1){
            // $(".back").hide()
        }else if(this.android == 2 || this.ios == 2){
            // $(".back").hide()
            this.tab = 1;
        }else if(this.android == 3 || this.ios == 3){
            // $(".back").hide()
            this.tab = 2;
        }

        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
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
        this.cityId = request['cityId'];

        console.log(this.cityId);

        this.memberData(0); 
        this.memberData(4);
        this.memberData(1);

    },
    methods:{
        init(){
            this.$http(this.changeData()+"/order/memberOfOne",{
                method: 'post',
                params:{
                    phone: this.iphone
                }
            }).then(res => {
                // console.log(res);
                if(res.data.data == true){
                    this.price = true;
                    this.msg[0].price = 1;
                    this.msg[0].id = 13;
                }
            }).catch(err => {
              console.log(err)
            });
        },

        // 获取产品信息
        memberData(type){
            // 接口调用
            let _this = this;
            let url = _this.changeData() + '/member/selectProductList'
            axios(url,{
                method: 'post',
                params: {
                    type: type, // 0 找铺会员 4 转铺会员 1 VIP选址服务
                    // cityId: "110100", // 市id
                    // cityId: this.$route.query.cityId // 市id
                    cityId: this.cityId
                }
            }).then(data => {
                if(type == 0){
                    // 找铺会员
                    this.seekShopMemberArr = data.data.productList;
                }else if(type == 4){
                    // 转铺会员
                    this.turnShopMemberArr = data.data.productList;
                    console.log(this.turnShopMemberArr);
                }else if(type == 1){
                    // 转铺会员
                    this.vipSiteServeArr = data.data.productList;
                }
            }).catch(err => {
                console.log(err)
            });
        },

        huiyuanbuy(item){
            if(this.android){
                return AndroidBuy.showToast(item.id);
            }else if(this.ios){
                window.location.href="next://" + item.id;
            }
        },
        fuwubuy(item){
            if(this.android){
                return AndroidBuy.showToast(item.id);
            }else if(this.ios){
                window.location.href="next://" + item.id;
            }
        },
        zhuanpuFun(item){
            if(this.android){
                return AndroidBuy.showToast(item.id);
            }else if(this.ios){
                window.location.href="next://" + item.id;
            }
        }

        
    }
}
</script>

<style>
.layui-m-layer-tel .layui-m-layercont{
    padding: 35px 30px;
}
.layui-m-layer-tel h2{
    font-size: .32rem;
    color: #333;
    margin-bottom: .3rem;
}
.layui-m-layer-tel p{
    font-size: .36rem;
    color: #e8584f;
}
.layui-m-layer-tel .layui-m-layerbtn span:nth-of-type(1){
    color: #898989;
    background: #f7f8fa;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.layui-m-layer-tel .layui-m-layerbtn span:nth-of-type(2){
    color: #fff;
    background: #64AAFF;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 0 0 5px 0;
}
</style>
<style scoped lang="scss" type="text/scss">
.buy{
    width: 7.5rem;
    margin: 0 auto;
    background: #fff;
    .title{
        width: 7.5rem;
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        top: 0;
        z-index: 10000;
        background: #FFF;
    h3{
      display: flex;
      justify-content: space-around;
      .back{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 10%;
        height: .9rem;
        span{
          display: inline-block;
          width: .34rem;
          height: .34rem;
          margin-top: .3rem;
          margin-left: .2rem;
          background: url("../../../static/images/common/back.png") no-repeat;
          background-size: .34rem .34rem;
        }
      }
      .huiyuan,.xuanzhi,.zhuanpu{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 30%;
        text-align: center;
        font-size: .28rem;
        color: #111;
        font-weight:bold;
        position: relative;
        span{
          display: none;
          width: .62rem;
          height: .04rem;
          background: #49ACFF;
          position: absolute;
          left: 50%;
          margin-left:-.31rem;
          bottom: 0;
        }
        &.on{
           color: #49ACFF;
          span{
            display: block;
          }
        }
      }
    }
  }
    .content{
     margin-top: .9rem;
      ul{
        li{
          background: #fff;
          &.huiyuan{
            .zhuanpu-bg{
              width: 7.5rem;
              height: 8.8rem;
              margin: 0 auto;
              padding-top: 1.86rem;
              border: 0.01rem solid #fff;
              background: url("../../../static/images/member/huiyuan-bg.png") no-repeat #fff;
              background-size: 7.5rem  4.8rem;
              border: 0.01rem solid #fff;
              .zhuanpu-title{
                width: 7.1rem;
                height: 4.8rem;
                margin: 0 auto;
                background: url("../../../static/images/member/huiyuan-title.png") no-repeat;
                -webkit-background-size: 7.1rem 4.78rem;
                background-size: 7.1rem 4.78rem;
                .title-txt{
                  font-size: .34rem;
                  color: #111;
                  font-weight: bold;
                  text-align: center;
                  height: 1.4rem;
                  line-height: 1.4rem;
                  span{
                    color: #EFAD00;
                  }
                }
                .title-msg{
                    height: 5.7rem;
                    padding:.5rem .54rem;
                    ul{
                        li{
                            width:6.28rem;
                            height:.8rem;
                            line-height: .8rem;
                            background:rgba(255,255,255,1);
                            box-shadow:0px 0px .1rem 0px rgba(255,86,0,0.15);
                            border-radius:.06rem;
                            margin-bottom: .2rem;
                            span{
                                display: inline-block;
                                width: 2rem;
                                text-align: center;
                            }
                            b{
                                display: inline-block;
                                width: 2rem;
                                text-align: center;
                                color: #F94200;
                            }
                            i{
                                margin-left: .52rem;
                                display: inline-block;
                                width: 1.55rem;
                                height: .8rem;
                                background: #FF7F6F;
                                text-align: center;
                                color: #fff;
                                font-size: .32rem;
                            }
                        }
                    }
                }
              }
              .zhuanpu-liucheng{
                width: 7.5rem;
                background: #fff;
                h3{
                  font-weight: bold;
                  font-size: .34rem;
                  font-weight: bold;
                  text-align: center;
                  padding: .7rem 0 .44rem;
                }
                dl{
                  margin-left: .3rem;
                  height: .96rem;
                  padding-bottom: .3rem;
                  &.cur{
                    height: 1.4rem;
                  }
                  dt{
                    margin-top: .3rem;
                    margin-right: .3rem;
                    float: left;
                    width: .4rem;
                    height: .4rem;
                    background: url("../../../static/images/member/21.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .two{
                    background: url("../../../static/images/member/22.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .other{
                    background: url("../../../static/images/member/28.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .three{
                    background: url("../../../static/images/member/23.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .four{
                    background: url("../../../static/images/member/24.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .five{
                    background: url("../../../static/images/member/25.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .six{
                    background: url("../../../static/images/member/26.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .seven{
                    background: url("../../../static/images/member/27.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  dd{
                    float: left;
                    h5{
                      font-size: .3rem;
                      color: #333;
                    }
                    p{
                      font-size: .24rem;
                      color: #666;
                    }
                  }
                }
              }
              .zhuanpu-wenti{
                background: #fff;
                h3{
                  font-weight: bold;
                  font-size: .34rem;
                  font-weight: bold;
                  text-align: center;
                  padding: .7rem 0 .44rem;
                }
                .wenti-img{
                  width: 7.09rem;
                  height: 5.18rem;
                  margin: 0 auto;
                  background: url("../../../static/images/member/wenti-bg.png") no-repeat #fff;
                  -webkit-background-size: 7.09rem 5.18rem;
                  background-size: 7.09rem 5.18rem;
                }
              }
              .zhuangpu-tel{
                background: #fff;
                text-align: center;
                padding: .7rem 0;
                b{
                  display: inline-block;
                  width: 1.53rem;
                  border: 0.01rem dashed #ccc;
                  vertical-align: middle;
                }
                s{
                  display: inline-block;
                  vertical-align: middle;
                  margin: 0 .1rem;
                  font-size: .28rem;
                }
              }
            }
          }
          &.xuanzhi{
            .zhuanpu-bg{
              width: 7.5rem;
              height: 6.8rem;
              margin: 0 auto;
              padding-top: 1.86rem;
              border: 0.01rem solid #fff;
              background: url("../../../static/images/member/xuanzhi-bg.png") no-repeat #fff;
              background-size: 7.5rem  4.8rem;
              .zhuanpu-title{
                width: 7.1rem;
                height: 4.7rem;
                margin: 0 auto 0;
                background: #fff;
                dl{
                  float: left;
                  width: 2.28rem;
                  margin: .4rem .6rem 0;
                  dt{
                    width: 1.07rem;
                    height: 1.07rem;
                    margin:0 auto .1rem;
                    background: url("../../../static/images/member/duo.png") no-repeat ;
                    -webkit-background-size: 1.07rem 1.07rem;
                    background-size: 1.07rem 1.07rem;
                  }
                  .two{
                    background: url("../../../static/images/member/kuai.png") no-repeat;
                    -webkit-background-size: 1.07rem 1.07rem;
                    background-size: 1.07rem 1.07rem;
                  }
                  .three{
                    background: url("../../../static/images/member/hao.png") no-repeat;
                    -webkit-background-size: 1.07rem 1.07rem;
                    background-size: 1.07rem 1.07rem;
                  }
                  .four{
                    background: url("../../../static/images/member/sheng.png") no-repeat;
                    -webkit-background-size: 1.07rem 1.07rem;
                    background-size: 1.07rem 1.07rem;
                  }
                  dd{
                    p{
                      text-align: center;
                      font-size: .28rem;
                      line-height: 0.4rem;
                      span{
                        color: #4AACFF;
                      }
                    }
                  }
                }
              }
              .zhuanpu-biaozhun{
                background: #fff;
                h3{
                  text-align: center;
                  padding: .6rem 0 .4rem;
                  font-size: .34rem;
                  font-weight: bold;
                }
                .table-title{
                  width: 7.1rem;
                  margin: 0 auto;
                  background: #49ACFF;
                  text-align: center;
                  height: .6rem;
                  line-height: .6rem;
                  color: #fff;
                  font-size: .3rem;
                }
                .table{
                  background: #fff;
                  margin: 0 .2rem;
                  padding: 0 .2rem;
                  border: 2px solid #49ACFF;
                  background:rgba(237,246,255,1);
                  table{
                    width: 100%;
                    text-align: center;
                    tr{
                      margin: 0 .2rem;
                      border-bottom: 1px dashed #49acff;
                      text-align: center;
                      td{
                        height: 1.10rem;
                        line-height: 1.10rem;
                        font-size: .28rem;
                        color: #333;
                        width: .8rem;
                        span{
                          -webkit-tap-highlight-color: rgba(0,0,0,0);
                          display: inline-block;
                          width: 1.78rem;
                          height: .86rem;
                          line-height: .86rem;
                          margin-left: .4rem;
                          color: #fff;
                          text-align: center;
                          background: url("../../../static/images/member/buy.png") no-repeat;
                          -webkit-background-size: 1.78rem .86rem;
                          background-size: 1.78rem .86rem;
                        }
                      }
                    }
                    tr:nth-of-type(5){
                      border-bottom: none;
                    }
                  }
                }
              }
              .zhuanpu-baozhang{
                width: 7.5rem;
                background: #fff;
                h3{
                  font-weight: bold;
                  font-size: .34rem;
                  font-weight: bold;
                  text-align: center;
                  padding: .7rem 0 .44rem;
                }
                .baozhang-list{
                  padding: 0 .2rem .2rem;
                  .baozhang-msg{
                    float: left;
                    width: 3.20rem;
                    height: 2.4rem;
                    padding: .3rem .1rem;
                    border-right: 0.05rem;
                    box-shadow:0px 0px 0.1rem rgba(73,172,255,0.3);
                    .img{
                      width: 0.36rem;
                      height: 0.36rem;
                      margin: 0 auto;
                      background: url("../../../static/images/member/7.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    .two{
                      background: url("../../../static/images/member/2.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    .three{
                      background: url("../../../static/images/member/8.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    .four{
                      background: url("../../../static/images/member/9.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    .five{
                      background: url("../../../static/images/member/5.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    .six{
                      background: url("../../../static/images/member/6.png") no-repeat;
                      -webkit-background-size: 0.36rem 0.36rem;
                      background-size: 0.36rem 0.36rem;
                    }
                    h5{
                      margin: .2rem 0 .1rem;
                      font-size: .26rem;
                      text-align: center;
                      font-weight: bold;
                    }
                    p{
                      font-size: .24rem;
                      color: #666;
                      text-align: justify;
                    }
                  }
                  .baozhang-msg:nth-of-type(1){
                    margin-right: .2rem;
                  }
                }
              }
              .zhuanpu-liucheng{
                width: 7.5rem;
                background: #fff;
                h3{
                  font-weight: bold;
                  font-size: .34rem;
                  font-weight: bold;
                  text-align: center;
                  padding: .7rem 0 .44rem;
                }
                dl{
                  margin-left: .3rem;
                  height: .96rem;
                  padding-bottom: .3rem;
                  dt{
                    margin-top: .3rem;
                    margin-right: .3rem;
                    float: left;
                    width: .4rem;
                    height: .4rem;
                    background: url("../../../static/images/member/11.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .two{
                    background: url("../../../static/images/member/12.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .three{
                    background: url("../../../static/images/member/17.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .four{
                    background: url("../../../static/images/member/18.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .five{
                    background: url("../../../static/images/member/15.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                  .six{
                    background: url("../../../static/images/member/16.png") no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }

                  dd{
                    float: left;
                    h5{
                      font-size: .3rem;
                      color: #333;
                    }
                    p{
                      font-size: .24rem;
                      color: #666;
                    }
                  }
                }
              }
              .zhuangpu-tel{
                background: #fff;
                text-align: center;
                padding: .7rem 0;
                b{
                  display: inline-block;
                  width: 1.53rem;
                  border: 0.01rem dashed #ccc;
                  vertical-align: middle;
                }
                s{
                  display: inline-block;
                  vertical-align: middle;
                  margin: 0 .1rem;
                  font-size: .28rem;
                }
              }
            }
          }
        }
      }
    }
  }

/* 转铺会员 */
.turnShopMemberBox{
    width: 7.5rem;
    height: 6.7rem;
    position: relative;
    background: #fff;
    img{
        width: 7.5rem;
        height: 4.06rem;
    }
    .turnShopMemberdiv{
        width: 6.1rem;
        height: 3.04rem;
        padding: .4rem;
        background: rgba(255,255,255,1);
        box-shadow: 0px 8px 38px 0px rgba(0,0,0,0.1);
        border-radius: 14px;
        position: absolute;
        left: .3rem;
        bottom: 0;
        h3{
            color: #444;
            font-size: .3rem;
            font-weight: 600;
        }
        ul{
            li{
                width: 1.8rem;
                height: 2.2rem;
                float: left;
                background:rgba(255,255,255,1);
                border: 2px solid rgba(249,218,73,1);
                border-radius:10px;
                margin-left: .34rem;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                overflow: hidden;
                h5{
                    color: #999999;
                    font-size: .3rem;
                    margin-top: .34rem;
                    margin-bottom: .1rem;
                }
                p{
                    color: #444444;
                    font-size: .36rem;
                    font-weight: 600;

                }
                span{
                    width: 1.72rem;
                    height: .5rem;
                    background: #f9da49;
                    display: inline-block;
                    color: #fff;
                    font-size: .3rem;
                    line-height: .5rem;
                    position: absolute;
                    bottom: 0rem;
                    left: 0rem;
                }
            }
            li:first-child{
                margin-left: 0rem;
            }
        }
    }
}
.turnShopMemberText{
    width: 6.7rem;
    height: 9.54rem;
    background: #fff;
    padding-top: .55rem;
    padding-left: .8rem;
    padding-bottom: .6rem;
    img{
        width: 6rem;
        height: 9.54rem;
    }
}

</style>
