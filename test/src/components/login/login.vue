<template>
    <div class="login">
        <div class="loginMain">
            <div class="nav clearfix">
                <router-link to='/mine'>
                    <img class="navBack pull-left" src="../../../static/images/login/backWhite.png" alt="">
                </router-link>
                <h2 class="navTitle pull-left">登录／注册</h2>
            </div>
            <img class="logo" src="../../../static/images/login/logo.png" alt="">
            <div class="dInput clearfix">
                <img class="pull-left" src="../../../static/images/login/input1.png" alt="">
                <div class="input1 pull-left">
                    <input type="text" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="13" @keyup="keyVal($event)">
                </div>
            </div>
            <div class="dInput clearfix">
                <img class="pull-left" src="../../../static/images/login/input2.png" alt="">
                <div class="input2 pull-left">
                    <input type="text" v-model="securityCode" placeholder="请输入验证码" maxlength="6">
                    <!-- <a class="pull-right" id="btn" href="javascript:;" @click="query">获取验证码</a> -->
                    <!-- <input type="button" id="btn" value="获取验证码" @click="sendemail()" class="pull-right code"/>  -->
                    <button type="button" :disabled="disabled" @click="sendcode" class="btns">{{btntxt}}</button>
                </div>
            </div>
            <div class="btn">
                <p>无需注册，输入手机号即可登录</p>
                <!-- <a href="javascript:;" >登录／注册</a> -->
                <div class="login-btn" @click="loginBtn($event)">登录／注册</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
const countdown = 60;
export default {
    name: 'aboutUP',
    data () {
        return {
            phoneVal: '', // 手机号码
            securityCode: '', // 验证码
            disabled:false,
            time:0,
            btntxt:"获取验证码",
            formMess:{
                email:this.email,
                phone:this.phone
            }
        }
    },
    computed:{

    },
    methods:{
        // 
        keyVal(e) {
            var phoneNum = this.phoneVal.trim();
            //如果是删除按键，则什么都不做
            if (e.keyCode === 8) {
              this.phoneVal = phoneNum;
              return;
            }

            var len = phoneNum.length;
            if (len === 3 || len === 8) {
              phoneNum += '-';
              this.phoneVal = phoneNum;
            }
        },

        //获取验证码
        sendcode(){              
            let reg=/^1([38]\d|4[57]|5[0-35-9]|7[06-8])(\-\d{4}){2}$/;
            if(this.phoneVal==''){
               layer.open({
                    content: '请输入手机号码',
                    skin: 'msg',
                    time: 2
                });
            }else if(!reg.test(this.phoneVal)){
                layer.open({
                    content: '手机格式不正确',
                    skin: 'msg',
                    time: 2
                });
            }else{
                this.time=60;
                this.disabled=true;
                this.timer();

                // 接口调用
                let _this = this
                let url = 'api/upzl_getCode'
                axios(url,{
                    method: 'get',
                }).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err)
                });
           }
        },
        // 倒计时
        timer() {
            if (this.time > 0) {
                this.time--;
                // this.btntxt=this.time+"s后重新获取";
                this.btntxt= "重新获取(" + this.time + ")";
                setTimeout(this.timer, 1000);
            } else{
                this.time=0;
                this.btntxt="获取验证码";
                this.disabled=false;
            }
        },
        query() {
            var formMess=this.formMess
            Axios.post(api+"/order/select/reception", formMess)
             .then(function (res) {
                 if(res.data.code==200){
                    console.log(res.data.data);
                    this.productResult=res.data.data;
                    this.productResult.length=3;
                }else if(res.data.code==400){
                    alert(res.data.message)
                }
            }.bind(this))
        },
        // 点击登录按钮
        loginBtn() {
            if(this.phoneVal == ""){
                layer.open({
                    content: '请输入手机号码',
                    skin: 'msg',
                    time: 2
                });
            }else if(this.securityCode == ""){
                layer.open({
                    content: '请输入验证码',
                    skin: 'msg',
                    time: 2
                });
            }else{

                // http://www.mockhttp.cn/mock/upzl-login

            }
        },
    },
    created() {


    },
    watch: {
        // phoneVal(newValue, oldValue) {
        //     let _this = this
        //     // 具体的代码在这里实现
        //     if (newValue.length > oldValue.length) {
        //         // ...
        //         if (newValue.replace(/\s/g, '').length < 3) {
        //             this.phoneVal = newValue.replace(/\s/g, '') 
        //             console.log(this.phoneVal);
        //         } else if (newValue.replace(/\s/g, '-').length >= 3 && newValue.replace(/\s/g, '').length < 4) {
        //             this.phoneVal = newValue.replace(/\s/g, '-').replace(/(\d{3})/, '$1 ')
        //             console.log(this.phoneVal);
        //         } else if (newValue.replace(/\s/g, '').length >= 5) {
        //             this.phoneVal = newValue.replace(/\s/g, '').replace(/(\d{3})(\d{4})/, '$1 $2 ')
        //             console.log(this.phoneVal);
        //         }

        //         // if (newValue.replace(/\s/g, '').length < 3) {
        //         //     this.phoneVal = newValue.replace(/\s/g, '') 
        //         //     console.log(this.phoneVal);
        //         // } else if (newValue.replace(/\s/g, '-').length >= 3 && newValue.replace(/\s/g, '').length < 7) {
        //         //     this.phoneVal = newValue.replace(/\s/g, '-').replace(/(\d{3})/, '$1 ')
        //         //     console.log(this.phoneVal);
        //         // } else if (newValue.replace(/\s/g, '').length >= 7) {
        //         //     this.phoneVal = newValue.replace(/\s/g, '').replace(/(\d{3})(\d{4})/, '$1 $2 ')
        //         //     console.log(this.phoneVal);
        //         // }

        //     } else {
        //         if (newValue.length === 9 || newValue.length === 4) {
        //             this.phonVale = this.phoneVal.split("-");
        //         }
        //     }
        // }
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
.loginMain{
    width: 7.5rem;
    margin: 0 auto;
    background: url("../../../static/images/login/loginBg.png") no-repeat top center;
    background-size: 7.5rem 13.34rem;
}
.nav{
    width: 7.1rem;
    height:1rem;
    background: transparent;
    margin:0 auto;
    padding: 0.2rem 0.2rem 0 0.2rem;
    /*background: red;*/
}
.nav a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.navBack{
    width: 0.14rem;
    height: 0.26rem;
    margin-top: 0.3rem;
    margin-left: .1rem;
    /*background: pink;*/
}
.navTitle{
    height: 1rem;
    width: 6.8rem;
    line-height: 1rem;
    font-size: 0.38rem;
    color: #fff;
    text-align: center;
}
.logo{
    display: block;
    width: 2.48rem;
    height: 2.48rem;
    margin:0.8rem auto;
}
.dInput{
    width: 6.9rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
}
.dInput img{
    width: 0.48rem;
    height: 0.48rem;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
}
.dInput .input1{
    border-bottom: 1px solid #ccc;
}
.dInput .input1 input{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    height: 0.68rem;
    width: 5.5rem;
  line-height: .7rem;
    background: transparent;
    font-size: 0.28rem;
    color: #fff;
}
.dInput .input2{
    border-bottom: 1px solid #ccc;
}
input::-webkit-input-placeholder{
    color:#ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#ccc;
}
.dInput .input2 input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    line-height: .7rem;
    height: 0.68rem;
    width: 3.7rem;
    background: transparent;
    font-size: 0.28rem;
    color: #fff;
}
/*.dInput .input2 a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 1.4rem;
    font-size: 0.28rem;
    color: #3a8ff3;
    line-height: 0.68rem;
}*/
.btns{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 1.7rem;
    font-size: 0.28rem;
    color: #3a8ff3;
    line-height: 0.68rem;
    background: rgba(0,0,0,0);
    text-align: right;
}
.btn{
    margin-top: 2rem;
    text-align: center;
    padding-bottom: 2.5rem;
}
.btn p{
    font-size: 0.26rem;
    line-height: 0.22rem;
    color: #fff;
}
.btn .login-btn{
    width: 4.3rem;
    height: 0.88rem;
    display: block;
    margin: 0.2rem auto;
    background: #3a8ff3;
    border-radius: 0.44rem;
    font-size: 0.34rem;
    line-height: 0.88rem;
    color: #fff;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>








