<template>
<div class="home" ref="box">
    <div class="downing" v-if="downing">
        <span></span><b>真铺源 无中介 最新铺源抢先看</b><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">APP下载</a><s @click="downing=false"></s>
    </div>
        <!-- 滑动导航 -->
        <div class="grayNab" ref="searchStyle" v-if="searchBar">
            <dl class="grayNab_left">
                <h5><span>北京</span></h5>
                <dt @click="goSearch()"><img src="../../../static/images/home/search2.png"></dt>
                <dd @click="goSearch()">区域/商圈/业态/商铺编号</dd>
            </dl>
            <li class="telephone" @click="telephone()">
                <img src="../../../static/images/home/phone.png">
            </li>
        </div>
        <!-- 轮播图 -->
        <div class="homeTop">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in picArr" style="width: 100%; height: 100%;">
                    <div style="width: 100%; height: 100%;" @click="goNewInfo(item.artitleId,item.urlApp,item.flag)">
                        <img :src="item.url">
                    </div>
                </mt-swipe-item>
            </mt-swipe>

            <div class="search-icon">
                <router-link to='/search'>
                    <img src="../../../static/images/home/search.png">
                </router-link>
            </div>
            <!-- 透明导航 -->
            <div class="whiteNab" ref="searchStyle">
                <dl class="whiteNab_left1">
                    <h5><span>北京</span></h5>
                    <dt @click="goSearch()"><img src="../../../static/images/home/whiteSearch.png"></dt>
                    <dd @click="goSearch()">区域/商圈/业态/商铺编号</dd>
                </dl>
                <li class="telephone" @click="telephone()">
                    <img src="../../../static/images/home/whitePhone.png">
                </li>
            </div>
        </div>
        <div class="homeCenter">
            <dl class="dl1">
                <router-link :to="{name:'lookShop',params:{more:1}}">
                    <dt style="margin-left: .1rem;"><img src="../../../static/images/home/newshop.png"></dt>
                    <dd style="margin-left: .1rem;">查看新铺</dd>
                </router-link>
            </dl>
            <dl class="dl2">
                <router-link to='/seekShop'>
                    <dt><img src="../../../static/images/home/findShop.png"></dt>
                    <dd>委托找铺</dd>
                 </router-link>
            </dl>
            <dl class="dl3">
                <router-link to='/turnShop'>
                    <dt><img src="../../../static/images/home/turnShop.png"></dt>
                    <dd>委托转铺</dd>
                </router-link>
            </dl>
        </div>
        <div class="backdrop-img">
            <div class="property">
                <router-link :to="{name:'lookShop',params:{more:1}}">
                    <dl class="dl1">
                        <dt>{{this.PropertyObj}}<span>套</span></dt>
                        <dd>24小时新上</dd>
                    </dl>
                </router-link>
                <router-link :to="{name:'lookShop',params:{more:1}}">
                    <dl class="dl2">
                        <dt>{{this.onLineShopObj}}<span>套</span></dt>
                        <dd style="margin-left: -.2rem;">在线商铺</dd>
                    </dl>
                </router-link>
                <dl class="dl3">
                    <dt>{{this.seekShopObj}}<span>人</span></dt>
                    <dd style="margin-left: -.2rem;">正在找铺</dd>
                </dl>
            </div>
            <div class="suggest">
                <ul>
                    <li><img src="../../../static/images/home/message.png"></li>
                    <i></i>
                </ul>
                <dl>
                    <dt><img src="../../../static/images/home/hot.png"></dt>
                    <!-- 修改部分 -->
                    <dd class="scroll-wrap">
                        <div class="box3">
                            <div class="border3">
                                <div v-for="item in prizeList" @click="goNews(item.id)">{{item.title}}</div>
                            </div>
                         </div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="homeMain">
            <div class="homeMain-top">
                <h3>独家实勘商铺</h3>
                <router-link :to="{name:'lookShop',params:{more:1}}">
                    <h4>查看更多<img src="../../../static/images/home/more.png"></h4>
                </router-link>
            </div>
            <div class="detail">
                <ul>
                    <li v-for="(item,index) in shopListArr" @click="goShop(item.id)">
                        <div class="wrap">
                            <div class="img">
                                <img :src="item.img" alt="" :onerror="defaultImg">
                            </div>
                            <div class="msg">
                                <h4>{{item.title}}</h4>
                                <p>{{item.shopName}}</p>
                                <div class="tags" v-if="item.shopTags"><span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span></div>
                                <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
           </div>
        <div class="shopWrite"></div>
    </div>
</div>
</template>
<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import shopList from '@/components/shop/shopList.vue'
export default {
    name: 'home',
    data () {
        return {
            defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
            // 控制搜索栏显示隐藏
            searchBar: false,
            // 新闻数组
            prizeList:[],  
            // 新闻滚动         
            activeIndex: 0,
            // 轮播图数组
            picArr: [],
            // 24小时房源
            PropertyObj: {},
            // 在线商铺
            onLineShopObj: {},
            // 正在找铺
            seekShopObj: {},
            // 商铺列表展示
            shopListArr: [],
            //下载显示隐藏
            downing: true
        }
    },
    computed:{
        // 新闻滚动
        top() {
            return - this.activeIndex * .8 + 'rem';
        }
    },
    methods:{
        // 跳转搜索页
        goSearch(){
            this.$router.push({path:"/search"})
        },
        // 跳转查看商铺页
        goShop(id){
            this.$router.push({path:"/shopDetail", query:{shopId:id}});
        },
        // 搜索栏
        handleScroll(){
            let changBG = 0;
            let scrollTop = 0;
        },
        // 导航滑动
        handleScroll() {
            window.addEventListener('scroll', this.handleScroll)
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop);
            if(scrollTop >= 80){
                this.searchBar = true;
            }else{
                this.searchBar = false;
            }
        },
        // 点击拨打电话
        telephone() {
            // 判断用户是否登录 如未登录调转登录页
            layer.open({
                content: '<h2>业务咨询 | 服务投诉热线</h2><p>4008988808</p >',
                btn: ['拨打', '取消'],
                yes: function(index){
                    layer.close(index);
                    window.location.href="tel:4008988808"
                },
                skin: 'tel'
            });
        },
        // 点击商铺列表
        seeDetails(index) {
            // alert(index);
            this.$router.push({
                path: '/shopDetail',
            })
        },
        // 滑到底部跳转商铺列表
        addScroll:function() {
            window.addEventListener("scroll",this.sa,false)
        },
        sa() {
            // var that = this
            let webHeight=document.body.offsetHeight
            let screenHeight=window.innerHeight
            let h1 = document.body.scrollTop
            let h2 = document.documentElement.scrollTop
            let scrollTopNum
            if(h1>h2){
                scrollTopNum=h1
            }else{
                scrollTopNum=h2
            }

            let panDuan=webHeight-scrollTopNum-screenHeight
            // console.log(panDuan);
            if(panDuan === 0){
                // console.log("到底部啦！！！")
                let h = location.href.includes('/home');
                if( h == true){
                    this.$router.push({
                        path: '/lookShop'
                    })
                }
            }
        },
        // 列表接口调用
        dataPost() {
            let _this = this
            let url = _this.changeData() + '/shop/getTopDjsk'
            axios(url,{
                method: 'post',
            }).then(data => {                
                // console.log(data);
                this.shopListArr = data.data.content; // 列表商铺展示
            }).catch(err => {
                console.log(err)
            });
        },

        // 首页展示
        listData() {
            let _this = this
            let url = _this.changeData() + '/show/showInfo'
            axios(url,{
                method: 'get',
                url: url,
            }).then(data => {
                // console.log(data);               
                this.picArr = data.data.data.imgUrl; //轮播图                
                this.PropertyObj = data.data.data.shopNewNum; //24小时房源               
                this.onLineShopObj = data.data.data.shopLineNum; //在线商铺                
                this.seekShopObj = data.data.data.peopleNum; //正在找铺               
                this.prizeList = data.data.data.title; //新闻
            }).catch(err => {
                console.log(err)
            });
        },

        // 跳转新闻详情页
        goNews(id){
            this.$router.push({path: '/consult', query:{id: id}});
        },
        // 点击轮播图 跳转详情页
        goNewInfo(id,url,flag) {
            if(url == "" && flag == false){
                this.$router.push({path: '/consult', query:{id: id}});
            }else{
                window.location.href = url;
            }
        }
    },
    updated(){

    },
    mounted() {
        // 新闻滚动
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 2500);
        // console.log(this.$refs.box.scrollHeight);
        this.addScroll();
    },
    components:{
        // shopList
    },
    created() {
        this.handleScroll();
        // 接口调用
        this.dataPost();
        this.listData();
        // 导航滚动渐变
        // 查看2018-6-7版本
    }
}
</script>

<style scoped lang="scss">
@import "../../../static/css/shopList.scss";
.shopWrite{
  width: 7.5rem;
  height: 1rem;
  background: #fff;
}
  .detail{
    padding-top: 0;
  }
*{margin: 0; padding: 0;}
ul,li,ol{list-style: none; box-sizing: border-box;}

.home{
    width: 7.5rem;
}

input::-webkit-input-placeholder{
    color: #ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:  #ccc;
}
/*首页头部*/
.homeTop img{
  width: 7.5rem;
  height: 4rem;
}
/*透明导航导航*/
.whiteNab{
    width: 7.5rem;
    height: .76rem;
    padding-top: .14rem;
    position: absolute;
    top: 0;
    z-index: 99999;
    .whiteNab_left1{
        float: left;
        width: 6.3rem;
        height: .56rem;
        color: #fff;
        background: rgba(225,225,225,0.5);
        margin-left: .3rem;
        border-radius: 6px;
        box-shadow:0px 0px 14px rgba(0,0,0,0.18);
        h5{
            height: .36rem;
            float: left;
            font-size: .24rem;
            /*line-height: .56rem;*/
            margin-left: .14rem;
            padding-right: .15rem;
            margin-right: .15rem;
            border-right: 1px solid #fff;
            margin-top: .1rem;
            span{
                display: inline-block;
                position: relative;
                top: -.04rem;
            }
        }
        dt{
            float: left;
            img{
                width: .26rem;
                height: .26rem;
                position: relative;
                top: .01rem;
                margin-right: .1rem;
            }
        }
        dd{
            width: 4rem;
            float: left;
            line-height: .6rem;
            font-size: .24rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
    li{
        float: left;
        margin-left: .28rem;
        img{
            width: .3rem;
            height: .36rem;
            position: relative;
            top: .04rem;
        }
    }
}
/*滑动导航*/
.grayNab{
    width: 7.5rem;
    height: .76rem;
    padding-top: .14rem;
    position: fixed;
    top: 0;
    z-index: 99999;
    background: #fff;
    .grayNab_left{
        float: left;
        width: 6.3rem;
        height: .56rem;
        background: #f0f1f3;
        color: #ccc;
        font-size: 0.24rem;
        margin-left: .3rem;
        border-radius: 6px;
        h5{
            height: .36rem;
            float: left;
            font-size: .24rem;
            margin-left: .14rem;
            padding-right: .15rem;
            margin-right: .15rem;
            border-right: 1px solid #ccc;
            margin-top: .1rem;
            span{
                display: inline-block;
                position: relative;
                top: -.04rem;
            }
        }
        dt{
            float: left;
            img{
                width: .26rem;
                height: .26rem;
                position: relative;
                top: .01rem;
                margin-right: .1rem;
            }
        }
        dd{
            width: 4rem;
            float: left;
            line-height: .6rem;
            font-size: .24rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
    li{
        float: left;
        margin-left: .28rem;
        img{
            width: .3rem;
            height: .36rem;
            position: relative;
            top: .04rem;
        }
    }
}
/*轮播图*/
.homeTop{
    height: 4rem;
    overflow: hidden;
    position: relative;
}
.homeCenter{
    height: 2.2rem;
    background-color: #fff;
}
.homeCenter dl{
    height: 2rem;
    font-size: 0.28rem;
    color: #333;
    float: left;
    text-align: center;
    a{
        color: #333;
    }
}
.dl1{
    width: 25%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.dl2{
    width: 50%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.dl3{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 25%;
    text-align: center;
}
.homeCenter dl dt{
    margin-top: 0.38rem;
    margin-bottom: 0.14rem;
}
.homeCenter dl img{
    width: 1rem;
    height: 1rem;
}

/*搜索图标*/
.search-icon{
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
   -webkit-tap-highlight-color: rgba(0,0,0,0);
   z-index: 10000;
}
.search-icon img{
    width: 0.7rem;
    height: 0.7rem;
}

/*咨询*/
.backdrop-img{
    height: 3rem;
    background-color: #fff;
}

.property{
    width: 96%;
    margin-left: 2%;
    height: 2.1rem;
    background: url(../../../static/images/home/backdrop.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.property dl{
    width: 33.33%;
    height: 0.7rem;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    float: left;
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.4rem;
}
.property .dl3{
    border-right: none;
}
.property dt{
    height: 0.4rem;
    font-size: 0.4rem;
    font-weight: 500;
    color: #fe8686;
    margin-bottom: .16rem;
}
.property dt>span{
    font-size: 0.24rem;
    color: #898989;
    margin-left: 0.2rem;
}
.property dd{
    height: 0.4rem;
    line-height: 0.4rem;
}

.suggest{
    line-height: 0.8rem;
    font-size: 0.26rem;
    ul{
        width: 14%;
        height: 0.8rem;
        margin-left: 4%;
        float: left;
        margin-right: 0.2rem;
        li{
            width: 0.8rem;
            height: 0.4rem;
            float: left;
            img{
                width: 100%;
                height: 100%;
            }
        }
        i{
            display: inline-block;
            width: 0.01rem;
            height: .4rem;
            background: #eee;
            float: right;
            margin-top: .2rem;
        }
    }
    dl{
        float: left;
        dt{
            width: 0.7rem;
            height: 0.36rem;
            float: left;
            margin-right: 0.1rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .scroll-wrap{
            text-align: left;
            float: left;
            width: 4.8rem;
            font-size: 0.26rem;
            overflow: hidden;
            .scroll-content{
                width: 4.6rem;
                height: 0.8rem;
                position: relative;
                transition: top 0.5s;
                li{
                  -webkit-tap-highlight-color: rgba(0,0,0,0);
                    line-height: .5rem;
                    text-align: left;
                    float: left;
                    width: 4.6rem;
                    font-size: 0.26rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin-top: .2rem;
                    margin-bottom: .2rem;
                }
            }
        }
    }
}

.homeMain{
    background: #fff;
    .homeMain-top{
        height: 1rem;
        background: #fff;
        margin-top: 0.2rem;
        border-bottom: 0.02px solid #eaeaea;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
        }
        h4{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-size: 0.34rem;
            float: right;
            line-height: 1rem;
            color: #aaa;
            font-size: 0.28rem;
            padding-right: 0.2rem;
            img{
                width: 0.3rem;
                height: 0.28rem;
                position: relative;
                top: -0.05rem;
            }
        }
    }
}
/*app下载页*/
.downing{
    width: 7.5rem;
    height: .88rem;
    line-height: .88rem;
    background: rgba(255,255,255,.8);
    z-index: 1000;
    span{
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background: url("../../../static/images/shopDetail/xiazai.png") no-repeat;
        -webkit-background-size: .6rem .6rem;
        background-size: .6rem .6rem;
        vertical-align: middle;
        margin: 0 .3rem 0 .2rem;
    }
    b{
        font-size: .28rem;
        display: inline-block;
        vertical-align: middle;
        color: #666;
    }
    a{
        display: inline-block;
        vertical-align: middle;
        width: 1.56rem;
        height: .6rem;
        line-height: .65rem;
        border: 1px solid #64ABFF;
        color: #64ABFF;
        border-radius: .1rem;
        text-align: center;
        margin: 0 .2rem;
        font-size: .28rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
   s{
        display: inline-block;
        vertical-align: middle;
        width: .32rem;
        height: .32rem;
        background: url("../../../static/images/shopDetail/close.png") no-repeat;
        -webkit-background-size: .32rem .32rem;
        background-size: .32rem .32rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}
</style>
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

<style type="text/css">
@-webkit-keyframes scrollText1 {
    0%{
        -webkit-transform: translateY(-0px);
    }
    30%{
        -webkit-transform: translateY(-30px);
    }
    60%{
        -webkit-transform: translateY(-60px);
    }
    100%{
        -webkit-transform: translateY(-90px);
    }
}

@keyframes scrollText1 {
    0%{
        transform: translateY(-0px);
    }
    30%{
        transform: translateY(-30px);
    }
    60%{
        transform: translateY(-60px);
    }
    100%{
        transform: translateY(-90px);
    }
}

.box3{
    position: relative;
    top: 2px;
    left: 10px;
    width: 210px;
    height: 30px;
    overflow: hidden;
}
.border3{
    top: 0px;
    -webkit-animation:scrollText1 15s infinite  cubic-bezier(1,0,0.5,0) ;
    animation:scrollText1 12s infinite  cubic-bezier(1,0,0.5,0) ;
}

.border3 div{
    height: 30px;
    font-size: .3rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.border3:hover{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
}
</style>

