<template>
<div class="turnShopMember">
    <div class="turnShopMember-top">
        <i @click="goMyPublish()">
            <!-- <router-link to='/myPublish'> -->
                <img src="../../../static/images/mine/back.png">
            <!-- </router-link> -->
        </i>
        <h3>转铺会员</h3>
    </div>
    <div class="turnShopMemberBox">
        <img src="../../../static/images/turnShopMember/turnShopMemberBg.png">
        <div class="turnShopMemberdiv">
            <h3>您想购买多久的转铺会员呢？</h3>
            <ul>
                <li v-for="(item,index) in memberDataArr">
                    <h5>{{item.dsc}}</h5>
                    <p>¥{{item.price}}</p>
                    <span @click="goPayment(item)">购买</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="turnShopMemberText">
        <img src="../../../static/images/turnShopMember/turnShopMemberText.png">
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'turnShopMember',
    data () {
        return {
            listArr: [],
            days: "",
            totalCount: "",
            shopId: "",
            urlId: "",
            memberDataArr: [],
            appCityId: "",
            move: ""
        }
    },
    computed:{

    },
    methods:{
        // 获取邀请好友列表
        listData(){
            let _this = this;
            // 接口调用
            let url = this.changeData() + '/user/selectInvitedList'
            axios(url,{
                method: 'post',
                params: {
                    token: window.localStorage.token,
                    phone: window.localStorage.iphone
                }
            }).then(data => {
                // console.log(data);
                // 邀请人数
                this.totalCount = data.data.totalCount;
                this.days = data.data.days;
                this.listArr = data.data.invitedList;

            }).catch(err => {
                console.log(err)
            });
        },
        goPayment(item){
            if(this.move == "ios"){
                window.location.href="turnshopmember://" + item.id;
            }else if(this.move == "android"){
                return AndroidBuy.showToast(item.id);
            }else{
                this.$router.push({path:"/payment",query:{"id":item.id,"price":item.price,"url":"turnShopMember"}})
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
                    cityId: sessionStorage.cityId || this.appCityId // 市id
                }
            }).then(data => {
                // console.log("获取城市");
                // console.log(data);
                this.memberDataArr = data.data.productList;
            }).catch(err => {
                console.log(err)
            });
        },

        goMyPublish(){
            this.$router.push({path:"/myPublish",query:{urlType:this.urlId}});
        }


    },
    mounted() {
        var that = this;
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
        var request = new Object();
        request = GetRequest();
        this.urlId = request['urlType'];
        this.shopId = request['shopId'];
        this.move = request['move'];
        this.appCityId = request['cityId'];

        if(this.move == "android"){
            $(".turnShopMember-top").hide();
            $(".turnShopMemberBox").css({"padding-top":"0"});
        }

        // 获取产品信息
        this.memberData();
    }

}
</script>
<style scoped lang="scss"  type="text/scss">
.turnShopMember{
    width: 7.5rem;
    margin: 0 auto;
}
.turnShopMember-top{
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
}

.turnShopMemberBox{
    width: 7.5rem;
    height: 6.7rem;
    padding-top: 1rem;
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
