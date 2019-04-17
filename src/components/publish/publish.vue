<template>
    <div class="publish">
        <h2>发布 <b @click="go('4')">我的发布</b></h2>
        <div class="content">
            <ul>
                <li class="one"><span></span><b @click="go('1')">商铺转让</b></li>
                <li class="two"><span></span><b @click="go('2')">商铺出租</b></li>
                <li v-if="qiuzu" class="three"><span></span><b @click="go('3')">商铺求租</b></li>
                <li class="four"><span></span><b @click="go('4')">极速转铺服务</b></li>
                <li class="five"><span></span><b @click="go('5')">开通会员</b></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from 'axios';
import qs from "qs";
  export default {
    data(){
        return{
            qiuzu: true
        }
    },
    mounted() {
        if(this.$route.query.url){
            this.qiuzu = false;
        }
    },
    methods: {
        // back(){
        //     this.$router.go(-1);
        // },
        go(data){
            if(localStorage.token){
                if(data == 1){
                    this.$http(this.changeData() + "/publish/auth/isPublish",{
                        method: 'post',
                        params: {
                            cityId: sessionStorage.cityId,
                            type: 1
                        }
                    }).then(res => {
                        console .log(res)
                        if(res.data.flag){
                          this.$router.push({path:"/gather",query:{type:0}});
                        }else{
                          Toast(res.data.msg);
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }else if(data == 2){
                    this.$http(this.changeData() + "/publish/auth/isPublish",{
                        method: 'post',
                        params: {
                            cityId: sessionStorage.cityId,
                            type : 0
                        }
                    }).then(res => {
                        console .log(res)
                        if(res.data.flag){
                          this.$router.push({path:"/gather",query:{type:1}});
                        }else{
                          Toast(res.data.msg);
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }else if(data == 3){
                    this.$http(this.changeData() + "/publish/auth/isPublish",{
                        method: 'post',
                        params: {
                            cityId: sessionStorage.cityId,
                            type : 2
                        }
                    }).then(res => {
                        console .log(res)
                        if(res.data.flag){
                          this.$router.push({path:"/qiuzu"});
                        }else{
                          Toast("您当月的3条求租发布权限已用尽，不可再次发布！");
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }else if(data == 4){
                    this.$router.push({path:"/myPublish",query:{urlType:"publish"}});
                }else if(data == 5){
                    this.$router.push({path:"/buymember"});
                }
            }else{
                Toast("请先登录");
                if(this.$route.query.url){
                  this.$router.push({path:"/login",query:{urlType:"publish",url:"home"}});
                }else{
                  this.$router.push({path:"/login",query:{urlType:"publish"}});
                }
            }
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.publish{
    width: 7.5rem;
    margin: 0 auto;
    height: 90vh;
    background: #fff;
    h2{
        position: fixed;
        top: 0;
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        background: #fff;
        z-index: 100;
        border-bottom: .01rem solid #eaeaea;
        font-size: .34rem;
        font-weight: bold;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        b{
            position: absolute;
            right: .1rem;
            top: 0rem;
            font-size: .28rem;
        }
    }
    .content{
        margin-top: .9rem;
        padding: 0 .2rem;
        ul{
            li{
                height: 1.4rem;
                line-height: 1.4rem;
                position: relative;
                margin-left: 1.4rem;
                border-bottom: 0.01rem solid #eaeaea;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                span{
                    position: absolute;
                    left: -1.4rem;
                    top: .2rem;
                    width: 1rem;
                    height: 1rem;
                    background: url("../../../static/images/publish/zhuanrang.png") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                }
                b{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
            }
            li.two{
                span{
                    background: url("../../../static/images/publish/chuzu.png") no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                }
            }
            li.three{
                span{
                  background: url("../../../static/images/publish/qiuzu.png") no-repeat;
                  -webkit-background-size: 100% 100%;
                  background-size: 100% 100%;
                }
            }
            li.four{
                span{
                  background: url("../../../static/images/publish/jisu.png") no-repeat;
                  -webkit-background-size: 100% 100%;
                  background-size: 100% 100%;
                }
            }
            li.five{
                span{
                  background: url("../../../static/images/publish/kaitonghuiyuan.png") no-repeat;
                  -webkit-background-size: 100% 100%;
                  background-size: 100% 100%;
                }
            }
        }
    }
  /*.img{*/
    /*width: 7.5rem;*/
    /*height: 9.58rem;*/
    /*margin: .9rem auto 0;*/
    /*background: url("../../../static/images/publish/bg.png") no-repeat;*/
    /*-webkit-background-size: 7.5rem 9.58rem;*/
    /*background-size: 7.5rem 9.58rem;*/
    /*position: relative;*/
    /*a{*/
      /*display: inline-block;*/
      /*width: 100%;*/
      /*height: 100%;*/
    /*}*/
  /*}*/
}
</style>
