<template>
<div class="inviteRegister">
    <div class="inviteRegister-top">
        <h3>租铺宝邀请注册</h3>
    </div>
    <div class="inviteRegister-Main">
        <div class="inviteRegisterBg1"></div>
        <div class="inviteRegisterBg2">
            <div class="inviteRegister-login">
                <ul>
                    <li class="li1">
                        <img src="../../../static/images/invite/inviteRegisterPhone.png">
                        <input type="tel" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="11">
                    </li>
                    <li class="li2">
                        <img src="../../../static/images/invite/inviteRegisterCode.png">
                        <input type="tel" v-model="securityCode" placeholder="请输入验证码" maxlength="6">
                        <!-- <button type="button" :disabled="disabled" @click="sendcode">请输入验证码</button> -->
                        <button type="button" :disabled="disabled" @click="sendcode">{{btntxt}}</button>
                    </li>
                    <div class="registerBtn" @click="loginBtn()">注册</div>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import qs from "qs";
export default {
    name: 'inviteRegister',
    data () {
        return {
            phoneVal: "", // 验证码
            securityCode: "", // 验证码  
            disabled:false,
            btntxt: "请输入验证码",
            time: 0,  
            mobileTel: "" 
        }
    },
    computed:{

    },
    methods:{

        // 点击登录按钮
        loginBtn() {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
               layer.open({
                    content: '请输入手机号',
                    skin: 'msg',
                    time: 2
                });
            }else if(!reg.test(this.phoneVal)){
                layer.open({
                    content: '请输入正确的手机号',
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
                let url = this.changeData() + '/login'
                axios(url,{
                    method: 'post',
                    params:
                    {
                        account: this.phoneVal,
                        password: _this.securityCode,
                        channel: 2,
                        type: "1",
                        mobile: this.mobileTel
                    }
                }).then(data => {
                    // console.log(data);
                    let tel = data.data.phone
                    if(data.data.code == 200){
                        layer.open({
                            content: '登录成功',
                            skin: 'msg',
                            time: 2
                        });
                        window.localStorage.setItem("iphone",tel);
                        window.localStorage.setItem("token",data.data.token);
                        window.localStorage.setItem("pvCount",data.data.pvCount);
                        window.localStorage.setItem("memberType",data.data.memberType);
                        _this.$store.commit("login",data.data.token);
                        
                        this.$router.push({path: '/home'});

                    }else if(data.data.code == 500){
                      layer.open({
                        content: '请输入正确验证码',
                        skin: 'msg',
                        time: 2
                      });
                    } else{
                        layer.open({
                            content: '登录失败',
                            skin: 'msg',
                            time: 2
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        //获取验证码
        sendcode() {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
               layer.open({
                    content: '请输入手机号',
                    skin: 'msg',
                    time: 2
                });
            }else if(!reg.test(this.phoneVal)){
                layer.open({
                    content: '请输入正确的手机号',
                    skin: 'msg',
                    time: 2
                });
            }else{
                this.time=60;
                this.disabled=true;
                this.timer();
                // 接口调用
                let _this = this
                let url =  _this.changeData() + '/user/sendsms'
                let str = _this.phoneVal;
                axios(url,{
                    method: 'post',
                    params: {
                        phoneNumber: this.phoneVal,
                    }
                }).then(data => {
                    // console.log(data);
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
        this.mobileTel = request['tel'];

    }
}
</script>
<style scoped lang="scss"  type="text/scss">
.inviteRegister{
    width: 7.5rem;
    margin: 0 auto;
}
.inviteRegister-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 1000000;
    h3{
        width: 7.5rem;
        line-height: 1rem;
        font-size: 0.36rem;
        color: #333;
        float: left;
        text-align: center;
    }
}
.inviteRegister-Main{
    width: 7.5rem;
    margin-top: 1rem;
    .inviteRegisterBg1{
        height: 4.3rem;
        background: url(../../../static/images/invite/inviteRegisterBg1.png);
        background-size: 7.5rem 4.3rem;
        background-repeat: no-repeat;
    }
    .inviteRegisterBg2{
        height: 13.92rem;
        background: url(../../../static/images/invite/inviteRegisterBg2.png);
        background-size: 7.5rem 13.92rem;
        margin-top: -1.3rem;
        .inviteRegister-login{
            height: 4.4rem;
            ul{
                width: 5.82rem;
                height: 3.2rem;
                margin-left: .84rem;
                padding-top: 1.2rem;
                .li1{
                    height: .78rem;
                    position: relative;
                    input{
                        width: 5.22rem;
                        height: .78rem;
                        padding-left: .6rem;
                        font-size: .3rem;
                        border-radius: .1rem;
                    }
                    img{
                        width: .28rem;
                        height: .38rem;
                        position: absolute;
                        left: .2rem;
                        top: .2rem;
                    }
                }
                .li2{
                    height: .78rem;
                    position: relative;
                    margin-top: .4rem;
                    margin-bottom: .4rem;
                    input{
                        width: 2.8rem;
                        height: .78rem;
                        padding-left: .6rem;
                        font-size: .3rem;
                        border-radius: .1rem;
                    }
                    img{
                        width: .3rem;
                        height: .38rem;
                        position: absolute;
                        left: .18rem;
                        top: .24rem;
                    }
                    button{
                        width: 2.22rem;
                        background: #fed21e;
                        line-height: .78rem;
                        text-align: center;
                        color: #fff;
                        font-size: .3rem;
                        border-radius: .1rem;
                        position: relative;
                        top: .03rem;
                        left: .1rem;
                    }
                }
                .registerBtn{
                    width: 5.82rem;
                    line-height: .78rem;
                    color: #fff;
                    font-size: .3rem;
                    background: #fed21e;
                    text-align: center;
                    border-radius: .1rem;
                }
            }
        }
    }
}
</style>


