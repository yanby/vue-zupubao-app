<template>
<div class="inviteFriends">
    <div class="inviteFriends-top">
        <i>
            <router-link to='/mine'>
                <img src="../../../static/images/mine/back.png">
            </router-link>
        </i>
        <h3>邀请好友</h3>
        <router-link to='/myInvite'>
            <h5>我的邀请</h5>
        </router-link>
    </div>
    <div class="inviteFriends-Main">
        <div class="inviteFriends-Box">
            <div class="inviteTxt">
                <img src="../../../static/images/invite/inviteTxt.png">
            </div>
            <dl class="dl1">
                <dt><img src="../../../static/images/invite/inviteIcon1.png"></dt>
                <dd>您可以通过分享链接给好友</dd>
            </dl>
            <dl  class="dl2">
                <dt><img src="../../../static/images/invite/inviteIcon2.png"></dt>
                <dd>若成功邀请3位好友就送优铺7天会员！</dd>
            </dl>
            <div class="giveOut-invite" @click="btn()">发出邀请</div>
        </div>
    </div>

    <!-- 下载APP弹窗 -->
    <div class="popup" v-if="showPopup">
        <div class="popup-box">
            <p>若想成功邀请好友</p>
            <h5>请先下载APP！</h5>
            <div class="popupBtn"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">点击下载APP</a></div>
            <i @click="showPopup = false"></i>
        </div>
    </div>

</div>
</template>
<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'inviteFriends',
    data () {
        return {
            showPopup: false,
            move: ""
        }
    },
    computed:{

    },
    methods:{
        btn(){
            if(this.move == "ios"){
                window.location.href = "invite://" 
            }else if(this.move == "android"){
                return AndroidFunction.showToast("");
            }else{
                this.showPopup = true;
            }
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
        var request = new Object();
        request = GetRequest();
        this.move = request['move'];
        if(this.move == "ios"){
            $(".inviteFriends-top").hide();
            // $(".inviteFriends-Main").css({"margin-top":"1rem"});
        }else if(this.move == "android"){
            $(".inviteFriends-top").hide();
            $(".inviteFriends-Main").css({"margin-top":"0rem"});
        }  
    }
}
</script>
<style scoped lang="scss"  type="text/scss">
.inviteFriends{
    width: 7.5rem;
    margin: 0 auto;
}
.inviteFriends-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 1000000;
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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        img{
            width: 0.4rem;
            height: 0.4rem;
        }
    }
    h5{
        color: #111;
        font-size: .28rem;
        position: absolute;
        top: .28rem;
        right: .2rem;
    }
}
.inviteFriends-Main{
    height: 7.5rem;
    height: 13.1rem;
    margin-top: 1rem;
    padding-top: .01rem;
    background: url(../../../static/images/invite/inviteBg.png);
    background-size: 7.5rem 13.1rem;
    background-repeat: no-repeat;
    .inviteFriends-Box{
        width: 5.7rem;
        height: 6.53rem;
        margin-left: .9rem;
        margin-top: 5.03rem;
        padding-top: .6rem;
        .inviteTxt{
            width: 3.7rem;
            height: 1rem;
            margin: 0 auto .5rem;
            img{
                width: 3.7rem;
                height: 1rem;
            }
        }
        dl{
            text-align: center;
            dd{
                color: #333;
                font-size: .28rem;
                margin-top: .1rem;
                margin-bottom: .1rem;
            }
        }
        .dl1{
            dt{
                img{
                    display: inline-block;
                    width: .64rem;
                    height: .64rem;
                }

            }
        }
        .dl2{
             dt{
                img{
                    display: inline-block;
                    width: .64rem;
                    height: 1rem;
                }
            }
        }
        .giveOut-invite{
            background: #e5716c;
            width: 4.6rem;
            text-align: center;
            line-height: .8rem;
            border-radius: .14rem;
            color: #fff;
            font-size: .34rem;
            margin: .8rem auto 0;
        }
    }
}
/* 邀请好友弹窗 */
.popup{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000000;
    .popup-box{
        width: 4.8rem;
        height: 5.06rem;
        position: fixed;
        top: 3.2rem;
        left: 1.35rem;
        background: url(../../../static/images/invite/invitePopup.png);
        background-size: 4.8rem 5.06rem;
        background-repeat: no-repeat;
        position: relative;
        text-align: center;
        p{
            color: #333;
            font-size: .32rem;
            text-align: center;
            padding-top: 2.6rem;
            margin-bottom: .1rem;
        }
        h5{
            color: #333;
            font-size: .32rem;
        }
        i{
            display: block;
            width: .4rem;
            height: .4rem;
            position: absolute;
            right: .1rem;
            top: 1rem;
        }
        .popupBtn{
            width: 3.96rem;
            height: .78rem;
            background: #e5716c;
            line-height: .78rem;
            color: #fff;
            font-size: .3rem;
            position: absolute;
            bottom: .3rem;
            left: .42rem;
            a{
                color: #fff;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
    }
}
</style>