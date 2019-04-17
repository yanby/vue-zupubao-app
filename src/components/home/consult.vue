<template>
<div class="consult">
    <div class="nav clearfix">
        <!-- <router-link to='/home'> -->
        <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <!-- </router-link> -->
        <p>{{this.newTitle}}</p>
    </div>
    <div class="wrapBox">
        <h1>{{this.newTitle}}</h1>
        <div class="wrap" v-html="newMain"></div>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';

export default {
    name: 'consult',
    data () {
        return {
          titleId: "",
          newTitle: "", // 文章标题
          newMain: "", // 文章主要内容
          move: ""
        }
    },
    computed:{

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
        navBack(){
            var filename=window.location.href;
            if(localStorage.iphone == null || localStorage.iphone == undefined){
                this.$router.push({path: '/home'}); 
            }else{
                if(filename.indexOf("msg=1") != -1){
                    // this.$router.go(-1);
                    this.$router.push({path: '/message'}); 
                    // this.$router.push({path: '/mine'}); 
                }else{
                    this.$router.push({path: '/home'});   
                }
            }
        },
        // 获取资讯id
        listData() {
            let _this = this;
            let url = _this.changeData() + '/show/getMediaList'
            axios(url,{
                method: 'post',
                params: {
                    titleId: _this.titleId,
                }
            }).then(data => {
                // console.log(data);
                _this.newTitle = data.data.info.title;
                _this.newMain = data.data.info.content;
            }).catch(err => {
                console.log(err)
            });
        },

        // 资讯分享
        fenxiangFun(){
            var that = this;
            var data = {
              url : window.location.href.split('#')[0]
            }
            this.$http.post(this.changeData() + '/member/weChatShare',qs.stringify(data)).then(function(res){
              console.log(res);
              wx.config({
                // debug: true, // 开启调试模式
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
              });
              // 分享给朋友
              wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                //分享给朋友
                wx.onMenuShareAppMessage({
                  title: that.newTitle, // 分享标题
                  desc: '优铺资讯', // 分享描述
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
                    title: that.newTitle, // 分享标题
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
                  console.log("资讯详情错误：",err)
                });
            },
    },
    mounted() {
        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            // alert(window.location.host)
            // alert(urlInfo);
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
        var urlId = request['id'];
        var urlIndex = request['url'];
        var move = request['move'];

        if(move == "android"){
            $(".nav").hide();
            $(".wrapBox").css({"margin-top":"0"});
            $(".wrapBox h1").css({"margin-top":".3rem"});
        }
    },
    updated(){
      this.fenxiangFun();
    },
    created() {
        this.titleId = this.$route.query.id;
        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            // alert(window.location.host)
            // alert(urlInfo);
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
        var urlId = request['id'];
        var urlIndex = request['url'];
        var move = request['move'];

        if(urlId){
            this.source = urlId;
            $(".nav").hide();
        }

        if(urlIndex){            
            this.titleId = urlIndex;         
        }
        this.listData();
    }
}
</script>

<style scoped>
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

.consult{
    /*height: 100vh;*/
    background: #fff;
}
.nav{
    width: 7.1rem;
    height: .9rem;
    margin:0 auto;
    padding: 0.2rem 0.2rem 0 0.2rem;
    border-bottom: .01rem solid #eee;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: fixed;
    top: 0;
    background: #fff;
}
.nav p{
    font-size: .34rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin-left: .6rem;
    line-height: .8rem;
    color: #000;
    text-align: center;
}
.navBack{
    width: 0.32rem;
    height: 0.36rem;
    margin-top: 0.22rem;
}
.wrapBox{
    width: 6.9rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin-top: .8rem;
    margin-bottom: .2rem;
    overflow: hidden;
}
h1{
    font-size: 0.34rem;
    color: #000;
    text-align: center;
    margin-top: .8rem;
    margin-bottom: .3rem;
}

.wrap >>> p {
    font-size: 0.3rem;
    line-height: 0.5rem;
    color: #333;
    text-align: justify;
    font-weight: 400;
}

.wrap >>> .p1 {
    font-size: 0.3rem;
    line-height: 0.5rem;
    color: #333;
    margin: 0.5rem 0;
    text-align: justify;
    font-weight: 400;
}

.wrap >>> img{
    max-width: 6.9rem;
}

img{
    width: 6.9rem;
}
</style>