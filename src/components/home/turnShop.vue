<template>
    <div class="turnShop">
        <div class="main">
            <div class="nav clearfix">
                <!-- <router-link to='/home'> -->
                    <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="" @click="navBack()">
                <!-- </router-link> -->
                <h2 class="navTitle pull-left">委托转铺</h2>
            </div>
            <div class="wrap">
                <div class="wrap-input">
                    <p><span>客服电话：400-898-8808</span></p>
                </div>
            </div>
            <div class="input-bottom">
                <input type="tel" name="" placeholder="请输入手机号码，专属顾问5分钟内与您联系" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号码，专属顾问5分钟内与您联系'" maxlength="11" class="txt-input" v-model="telVal">
                <div class="wrap-input-img"><img src="../../../static/images/home/turnBtn.png" alt="" @click="sumbtn()"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'turnShop',
    data () {
        return {
            telVal: "",
            source: ""
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
                // let url = "http://192.168.1.168:8200/show/addCutomer"
                let url = _this.changeData() + '/show/addCutomer'
                axios(url,{
                    method: 'post',
                    // url: url,
                    params: {
                        account: _this.telVal,
                        type: '2',
                        source: this.source || "2"
                    }
                    // params: obj
                }).then(data => {
                  if(data.data.code == 200){
                    layer.open({
                      content: data.data.msg,
                      skin: 'msg',
                      time: 4
                    });
                    _this.telVal = "";
                  }
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        navBack(){
            this.$router.go(-1)
        }
    },
  mounted() {
        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            // alert(url);
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                // alert(str);
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
        if(urlId){
            this.source = urlId;
            $(".nav").hide();
          // $(".wrap").css({"margin-top":0})
        }
        if(urlIndex){
            this.telVal = urlIndex;
        }

        let USERS = window.localStorage.getItem("iphone");
        if(USERS){
            this.telVal = USERS
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
    /* 使之可以滚动 */
    /*overflow-y: scroll;*/
    /*-webkit-overflow-scrolling: touch;   !*这句是为了滑动更顺畅*!  */
    padding-bottom: .5rem;
}
.nav{
    width: 7.1rem;
    height: 1rem;
    background: #fff;
    margin:0 auto;
    padding: 0.2rem 0.2rem 0 0.2rem;
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
    margin-top: 0.26rem;
}
.navTitle{
    height: 1rem;
    width: 6.4rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #111;
    text-align: center;
}
.wrap{
    width: 7.5rem;
    height: 23rem;
    margin: 0 auto;
    background: url("../../../static/images/home/turnShop.jpg") no-repeat top center;
    background-size: 7.5rem 23rem;
    position: relative;
    margin-top: 1rem;
  margin-bottom: .5rem;
}
.wrap-input{
    width: 7.5rem;
    height: 2.5rem;
    position: absolute;
    bottom: 0px;
    left: 0px;
    p{
        width: 100%;
        text-align: center;
        margin-top: .4rem;
        span{
            color: #fff;
            font-size: .28rem;
        }
    }
}
.txt-input{
    margin-top: 0.2rem;
    /*margin-bottom: 0.3rem;*/
    font-size: 0.3rem;
    background-color: #2b61c1;
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
.input-bottom{
    width: 7.5rem;
    height: 1.3rem;
    position: fixed;
    bottom: 0px;
    background: #3C87F1;
    box-shadow:0px 0px 14px rgba(0,0,0,0.18);
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
</style>













