<template>
<div class="wantedDetail">
    <h2 class="back" @click="back()"><span></span>求租信息</h2>
    <div class="content">
        <div class="title">
            <h4>{{collection.title}}</h4>
            <p>{{collection.time}} | {{collection.count}}次浏览</p>
        </div>
        <div class="msg">
            <p>求租面积：<span>{{collection.areas}}</span></p>
            <p>租金预算：{{collection.rent}}</p>
            <p>期望区域：{{collection.businessArea}}</p>
            <p>计划经营：{{collection.marketing}}</p>
            <p>商铺类型：{{collection.type}}</p>
        </div>
        <div class="txt clearfix">
            <div class="img fl"><img src="../../../static/images/shopDetail/user.png" alt=""></div>
            <div class="name fl">
                <div>联系我</div>
                <p>{{collection.phone}}</p>
            </div>
            <div class="tel fr" @click="telFun()">电话联系</div>
        </div>
    </div>
    <!-- 弹窗 去发布商铺 -->
    <div class="popup-wrap" v-if="isShow1">
        <div class="popup-box">
            <h3>温馨提示</h3>
            <p>只有转铺店主才可直接联系求租人</p>
            <ul>
                <li class="li1" @click="isShow1=false">知道了</li>
                <li @click="goMyPublish()">发布信息</li>
            </ul>
        </div>
    </div>

    <!-- 弹窗 去购买转铺会员-->
    <div class="popup-wrap" v-if="isShow2">
        <div class="popup-box">
            <h3>温馨提示</h3>
            <p>只有转铺会员才可直接联系求租人</p>
            <ul>
                <li class="li1" @click="isShow2=false">知道了</li>
                <li @click="goMyPublish()">购买会员</li>
            </ul>
        </div>
    </div>
    
    <!-- 看铺机会已经用完 -->
    <div class="popup-wrap" v-if="isShow3">
        <div class="popup-box">
            <h3>温馨提示</h3>
            <p>您今日<span>30次</span>的看铺机会已用完</p>
            <p>请明日再来</p>
            <ul>
                <h5 @click="isShow3 = false">好</h5>
            </ul>
        </div>
    </div>

</div>
</template>

<script>
import qs from 'qs';
import axios from 'axios';
  export default {
    data(){
        return{
            collection: "",
            id: "",
            isShow1: false, // 弹窗 去发布商铺
            isShow2: false, // 弹窗 去购买转铺会员
            isShow3: false, // 弹窗 看铺次数已用完
            collectionName: "", //分享名称
        }
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
    mounted(){
        this.id = this.$route.query.id || getUrlId("id");
        this.init();
    },
    updated(){
        this.fenxiangFun();
    },
    methods:{
        back(){
            this.$router.push({path:"/wanted"});
        },
        init(){
            this.$http(this.changeData() + '/shop/selectSolicitDetail',{
                method: 'post',
                params: {
                    id: this.id
                }
            }).then(res => {
                console.log(res);
                this.collection = res.data.detail;

                this.collectionName = res.data.detail.title

            }).catch(err => {
                console.log(err)
            });
        },
        telFun(){
            if(localStorage.token){
                this.$http(this.changeData() + '/shop/auth/isVip',{
                    method: 'post',
                    params: {
                        id: this.id,
                        cityId: sessionStorage.cityId // 市id
                    }
                }).then(res => {
                    // console.log(res);
                    if(res.data.status=="ok"){
                        window.location.href = "tel:" + this.collection.account;
                    }else if(res.data.status == "release"){
                        this.isShow1 = true;
                    }else if(res.data.status == "fail"){
                        this.isShow2 = true;
                    }else if(res.data.status=="exceed"){
                        this.isShow3 = true;
                    }else{
                        layer.open({
                            content: '系统错误，请稍后再试',
                            skin: 'msg',
                            time: 2
                        })
                    }
                }).catch(err => {
                    console.log(err)
                });
            }else{
                this.$router.push({path:"/login",query:{urlType:"wantedDetail",id:this.id}})
            }
        },

        // 获取求租人电话
        phoneData(){
            let url =  this.changeData() + '/shop/auth/selectPhone';
            axios(url,{
                method: 'post',
                params:{
                    shopId: this.id,
                    type: "1", // 0 商铺详情页查询手机号 1 求租列表查询手机号
                },
            }).then(data => {
                // console.log("店主电话");
                // console.log(data);
                if(data.data.code == "101"){
                    // console.log(data.data.phone);
                    window.location.href = "tel:" + data.data.phone;
                }else{
                    layer.open({
                        content: '系统错误，请稍后再试',
                        skin: 'msg',
                        time: 2
                    })
                }
            }).catch(err => {
                console.log(err)
            });
        },

        goMyPublish(){
            this.$router.push({path:"/myPublish",query:{urlType:"wantedDetail",wantedDetailId:this.id}});
        },

        fenxiangFun(){
            var that = this;
            var data = {
                url : window.location.href.split('#')[0]
            }
            this.$http.post(this.changeData() + '/member/weChatShare',qs.stringify(data)).then(function(res){
                // this.$http.post("http://tidhy.s1.natapp.cc/shop/getwx",qs.stringify(data)).then(function(res){
                console.log(res);
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
                        title: that.collectionName, // 分享标题
                        desc: '租铺卖铺找优铺', // 分享描述
                        link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: "https://up-img.oss-cn-beijing.aliyuncs.com/logo/11527824725_.pic.jpg", // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                          // 用户点击了分享后执行的回调函数
                        }
                    });

                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: that.collectionName, // 分享标题
                        link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: "https://up-img.oss-cn-beijing.aliyuncs.com/logo/11527824725_.pic.jpg", // 分享图标
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
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .wantedDetail{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: 1rem;
    h2{
      width: 7.5rem;
      background: #fff;
      font-size: .34rem;
      text-align: center;
      position: relative;
      height: .9rem;
      line-height: .9rem;
      font-weight: bold;
      position: fixed;
      left: auto;
      top: 0;
      border-bottom: 0.01rem solid #eaeaea;
      margin: 0 auto;
      span{
        width: .34rem;
        height: .34rem;
        position: absolute;
        left: .2rem;
        top: .3rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
    }
    .content{
      padding: .9rem .2rem 0;
      background: #fff;
      .title{
        padding: .3rem 0;
        border-bottom: 0.01rem solid #eaeaea;
        h4{
          font-size: .34rem;
          font-weight: bold;
          margin-bottom: .2rem;
        }
        p{
          font-size: .24rem;
          color: #888;
        }
      }
      .msg{
        padding: .3rem 0 0;
        border-bottom: 0.01rem solid #eaeaea;
        p{
          font-size: .28rem;
          margin-bottom: .3rem;
          span{
            color: #E8584F;
          }
        }
      }
      .txt{
        padding: .3rem 0;
        .img{
          width: .9rem;
          height: .9rem;
          margin-right: .28rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          div{
            font-size: .28rem;
          }
          p{
            font-size: .36rem;
          }
        }
        .tel{
          width: 1.7rem;
          height: .7rem;
          line-height: .7rem;
          text-align: center;
          font-size: .3rem;
          border-radius: 0.06rem;
          background: #64ABFF;
          color: #fff;
          margin-top: .1rem;
        }
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
            line-height: 1.2rem;
            margin-bottom: .2rem;
        }
        p{
            text-align: center;
            color: #333;
            font-size: .3rem;
            span{
               color: #e8584f;
            }
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
            h5{
                width: 100%;
                line-height: .88rem;
                float: left;
                background: #64ABFF;
                color: #fff;
                font-size: .34rem;
                text-align: center; 
            }
        }
    }
}
</style>
