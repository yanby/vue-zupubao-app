<template>
<div class="errorCorrection">
    <div class="errorCorrection-top">
        <i @click="goShopDetail">
            <img src="../../../static/images/mine/back.png" :onerror="defaultImg">
        </i>
        <h3>我要纠错</h3>
    </div>
    <div class="errorCorrection-Shop">
        <dl>
            <dt>
                <img :src="shopListObj.img">
            </dt>
            <dd>
                <h2>{{shopListObj.title}}</h2>
                <h4>{{shopListObj.shopName}}</h4>
                <div class="errorCorrection-list">
                    <p>
                        <span v-for="(item,index) in shopListObj.shopTags">{{item}}</span>
                    </p>
                </div>
            </dd>
            <h5><span>{{shopListObj.monthlyRent}}</span>{{shopListObj.unit}}</h5>
        </dl>
    </div>
    <div class="errorCorrection-account">
        <h3>纠错理由</h3>
        <ul>
            <li v-for="(item,index) in listArr" :class="{active:index===number}" @click="changeColor(item.id)">{{item.name}}</li>
        </ul>
        <textarea placeholder="请填写相关说明信息～～～" v-model="remarkVal"></textarea>
        <h6>提示：纠错可奖励5次看铺次数！</h6>
    </div>
    <div class="btn" @click="btn()">立即纠错</div>
    <!-- 提交成功 -->
    <div class="popup" v-if="showPopup">
        <div class="popup-box">
            <dl>
                <dt><img src="../../../static/images/common/greenCheck.png"></dt>
                <dd>感谢您的纠错</dd>  
            </dl>
            <p>审核通过后</p>
            <p>您将获得<span>看铺次数</span>奖励</p>
            <div class="popup-btn" @click="goShopDetail">我知道了</div>
        </div>
    </div>
    <!-- 提交失败 -->
    <div class="failurePopup" v-if="showfailurePopup">
        <div class="failurePopup-box">
            <h3>提交失败</h3>
            <p>您没有选择纠错理由</p>
            <div class="failurePopup-btn" @click="showfailurePopup = false">我知道了</div>
        </div>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'errorCorrection',
    data () {
        return {
            number: 5,
            defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
            // shopListArr: [],
            shopListObj: {},
            remarkVal: "",
            showPopup: false, //提交成功
            showfailurePopup: false, //提交失败
            listArr: [
                {
                    "id": 0,
                    "name": "商铺不存在",
                },
                {
                    "id": 1,
                    "name": "商铺已出租或转出",
                },
                {
                    "id": 2,
                    "name": "价格不属实",
                },
                {
                    "id": 3,
                    "name": "面积不属实",
                },
                {
                    "id": 4,
                    "name": "其他信息不属实",
                },
            ],
        }
    },
    computed:{

    },
    methods:{
        goShopDetail(){
            this.$router.back(-1);
        },

        // 获取商铺信息
        shopData(){
            let _this = this;
            // 接口调用
            let url = this.changeData() + '/shop/auth/getCorrectionInfo'
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    shopId: this.$route.query.id
                }
            }).then(data => {
                // console.log(data);
                if(data.data.code == 101){
                    this.shopListObj = data.data.shop;
                }else{
                    layer.open({
                        content: '系统繁忙，请稍后再试',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        },
        
        changeColor(id){
            this.number = id;
        },

        // 点击立即纠错
        btn(){
            let _this = this;
            // 接口调用
            let url = this.changeData() + '/shop/auth/submitCorrectionInfo'
            if(this.number == 5){
                this.showfailurePopup = true;
            }else{
                axios(url,{
                    method: 'post',
                    params: {
                        shopId: this.$route.query.id,
                        cityId: sessionStorage.cityId,
                        reason: this.number,
                        content: this.remarkVal
                    }
                }).then(data => {
                    if(data.data.code == 101){
                        this.showPopup = true;
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }            
        }

    },
    mounted() {
        this.shopData();
    }
}
</script>
<style scoped lang="scss"  type="text/scss">
textarea { 
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
}
.errorCorrection{
    width: 7.5rem;
    height: 100vh;
    margin: 0 auto;
    background: #fff;
}
.errorCorrection-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
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
}
.errorCorrection-Shop{
    width: 7.1rem;
    height: 1.62rem;
    padding: .3rem .2rem;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    dl{
        dt{
            width: 2.16rem;
            height: 1.62rem;
            border: 1px solid #eaeaea;
            float: left;
            img{
                width: 2.16rem;
                height: 1.62rem;
            }
        }
        dd{
            height: 1.62rem;
            width: 3.1rem;
            float: left;
            margin-left: .22rem;
            h2{
                width: 3.1rem;
                color: #333;
                font-size: .32rem;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                position: relative;
                top: -.04rem;
            }
            h4{
                width: 3.1rem;
                color: #aaa;
                font-size: .28rem;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                margin-top: .14rem;
                margin-bottom: .18rem;
            }
        }
    }
    h5{
        width: 1.4rem;
        float: right;
        color: #d76255;
        font-size: .24rem;
        margin-top: .6rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        span{
            font-size: .34rem;
        }
    }
}
.errorCorrection-list{
    width: 3.1rem;
    height: .32rem;
    overflow: hidden;
    p{
        width: 100%;
        height: 4rem;
        display: box;
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        span{
            padding-left: .1rem;
            padding-right: .1rem;
            height: .32rem;
            margin-right: .2rem;
            display: block;
            border: .02rem solid #74aaf8;
            box-sizing: border-box;
            font-size: .22rem;
            line-height: .32rem;
            color: #74aaf8;
        }
    }
}
.errorCorrection-account{
    width: 7.1rem;
    padding: .2rem;
    h3{
        color: #333;
        font-size: .32rem;
        margin-top: .2rem;
        margin-bottom: .3rem;
    }
    ul{
        li{
            width: 3.34rem;
            line-height: .68rem;
            background: #e8eaec;
            color: #898989;
            font-size: .28rem;
            text-align: center;
            float: left;
            margin-bottom: .2rem;
            border-radius: 4px;
        }
        li:nth-of-type(odd){float: left;}
        li:nth-of-type(even){float: right;}
    }
    textarea{
        width: 6.5rem;
        height: 1.7rem;
        background: #f7f8fa;
        border: none;
        font-size: .28rem;
        padding: .3rem;
        margin-top: .2rem;
        outline: none;
    }
    h6{
        color: #74aaf8;
        font-size: .28rem;
    }
}
.btn{
    width: 7.5rem;
    height: 1rem;
    line-height: 1rem;
    color: #fff;
    font-size: .32rem;
    background: #74aaf8;
    text-align: center;
    position: fixed;
    bottom: 0px;
}
.active{
    color: #fff!important;
    background: #74aaf8!important;
}
.popup{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    .popup-box{
        width: 6.6rem;
        height: 3.6rem;
        background: #fff;
        position: fixed;
        top: 4.2rem;
        left: .45rem;
        border-radius: .1rem;
        position: relative;
        dl{
            width: 3rem;
            height: .7rem;
            margin: 0 auto;
            padding-top: .6rem;
            dt{
                width: .44rem;
                height: .44rem;
                float: left;
                margin-right: .2rem;
                margin-top: -.04rem;
                img{
                    width: .44rem;
                    height: .44rem;
                }
            }
            dd{
                color: #333;
                font-size: .38rem;
                float: left;
            }
        }
        p{
            color: #333;
            font-size: .32rem;
            text-align: center;
            span{
                color: #76aaf8;
            }
        }
        .popup-btn{
            width: 6.6rem;
            line-height: .88rem;
            background: #74aaf8;
            color: #fff;
            font-size: .34rem;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 0 0 .1rem .1rem;
        }
    }
}

.failurePopup{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    .failurePopup-box{
        width: 4.8rem;
        height: 3rem;
        background: #fff;
        position: fixed;
        top: 4.2rem;
        left: 1.35rem;
        border-radius: .1rem;
        position: relative;
        h3{
            color: #333;
            font-size: .38rem;
            text-align: center;
            padding-top: .6rem;
            margin-bottom: .2rem;
        }
        p{
            color: #333;
            font-size: .32rem;
            text-align: center;
        }
        .failurePopup-btn{
            width: 4.8rem;
            line-height: .88rem;
            background: #74aaf8;
            color: #fff;
            font-size: .34rem;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 0 0 .1rem .1rem;
        }
    }
}

</style>