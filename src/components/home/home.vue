<template>
<div class="home" ref="box">
    <div class="downing" v-if="downing">
        <span></span>
        <b>真铺源 无中介 最新铺源抢先看</b>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao">APP下载</a>
        <s @click="downing=false"></s>
    </div>
    <!-- 滑动导航 -->
    <div class="grayNab" ref="searchStyle" v-if="searchBar">
        <dl class="grayNab_left">
            <h5><span @click="goCitySelection()">{{cityNameStr}}</span><b></b></h5>
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
            <!-- <router-link to='/search'> -->
                <img src="../../../static/images/home/search.png" @click="goSearch()">
            <!-- </router-link> -->
        </div>
        
        <!-- 透明导航 -->
        <div class="whiteNab" ref="searchStyle">
            <dl class="whiteNab_left1">
                <h5><span @click="goCitySelection()">{{cityNameStr}}</span><b></b></h5>
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
                <dd style="margin-left: .1rem;">查看商铺</dd>
            </router-link>
        </dl>
        <dl class="dl2" @click="goPublish();">
            <!-- <router-link to='/publish'> -->
                <dt><img src="../../../static/images/home/imgDl1.png"></dt>
                <dd>发布出租</dd>
            <!-- </router-link> -->
        </dl>
        <dl class="dl3">
            <router-link to='/seekShop'>
                <dt><img src="../../../static/images/home/findShop.png"></dt>
                <dd>委托找铺</dd>
            </router-link>
        </dl>
        <dl class="dl1">
            <router-link to='/wanted'>
                <dt style="margin-left: .1rem;"><img src="../../../static/images/home/imgDl2.png"></dt>
                <dd style="margin-left: .1rem;">求租信息</dd>
            </router-link>
        </dl>
        <dl class="dl2" @click="goQiuzu()">
            <!-- <router-link to='/publish'> -->
                <dt><img src="../../../static/images/home/imgDl3.png"></dt>
                <dd>发布求租</dd>
            <!-- </router-link> -->
        </dl>
        <dl class="dl3">
            <router-link to='/turnShop'>
                <dt><img src="../../../static/images/home/turnShop.png"></dt>
                <dd>委托转铺</dd>
            </router-link>
        </dl>
    </div>
    
    <div class="backdrop-img">
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
    <!-- 本月租金均价 -->
    <div class="averagePrice">
        <div class="averagePriceTop">
            <h3>本月租金均价</h3>
            <!-- <router-link to="/cooperation"> -->
                <h4 @click="goEcharts()">查看详情<img src="../../../static/images/home/more.png"></h4>
            <!-- </router-link> -->
        </div>
        <div class="averagePriceBox">
            <dl class="monthPrice">
                <dt>{{dailyRent}}</dt>
                <dd>
                    <h5>环比上月{{shopRate}}</h5>
                    <h5>元/㎡/天</h5>
                </dd>
            </dl>
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
        </div>
    </div>

    <!-- 合作品牌 -->
    <div class="co-branding">
        <div class="co-branding-top">
            <h3>合作品牌</h3>
            <router-link to="/cooperation">
                <h4>查看全部<img src="../../../static/images/home/more.png"></h4>
            </router-link>
        </div>
        <div class="co-branding-box">
            <p>
                <span v-for="item in coBrandingArr"><img :src="item.img"></span>
            </p>
        </div>
    </div>

    <!-- 大咖推荐 -->
    <div class="big-caffeine">
        <div class="big-caffeine-top">
            <h3>大咖推荐</h3>
            <!-- <router-link :to="{name:'recommend'}">
                <h4>查看全部<img src="../../../static/images/home/more.png"></h4>
            </router-link> -->
        </div>
        <div class="big-caffeine-box">
            <p>
                <span v-for="item in bigCaffeineArr">
                    <img :src="item.Imgaddress">
                    <ul>
                        <h5>{{item.name}}</h5>
                        <li><h6>{{item.position}}</h6></li>
                    </ul>
                </span>
            </p>
        </div>
    </div>
    <!-- 城市切换弹窗 -->
    <div class="cityChangeWrap" v-if="isShowCityChangeWrap">
        <div class="cityChangeBox">
            <h2>温馨提示</h2>
            <p>是否切换到当前城市：{{locationCityNameStr}}</p>
            <div>
                <span class="span1" @click="cancelChangeUrlFun()">否</span>
                <span class="span2" @click="changeUrlFun()">是</span>
            </div>
        </div>
    </div>
    <div class="homeMain">
        <div class="homeMain-top">
            <h3>独家实勘商铺</h3>
            <!-- <router-link :to="{name:'cooperation'}"> -->
            <router-link :to="{name:'lookShop'}">
                <h4>查看更多<img src="../../../static/images/home/more.png"></h4>
            </router-link>
        </div>
        <div class="detail">
            <ul>
                <li v-for="(item,index) in shopListArr" @click="goShop(item.id)">
                    <div class="wrap">
                        <div class="img">
                            <img :src="item.img" alt="" :onerror="defaultImg">
                            <div v-if="item.type==1" class="xinshang"></div>
                            <div v-else-if="item.type==2" class="remeng"></div>
                            <div v-else-if="item.type==3" class="chengjiao"></div>
                            <div v-else-if="item.type==4" class="jingxuan"></div>
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
            downing: true,
            typeIndex: "",// 判断是否为当前页面
            // 合作品牌
            coBrandingArr:[],
            // 大咖推荐
            bigCaffeineArr: [],
            dailyRent: "", //日租金
            shopRate: "", //环比上月
            sessionCityId: "",  // 全局城市Id

            cityNameStr: "", //城市名称
            iphoneCookie: "",
            tokenCookie: "",

            isShowCityChangeWrap: false, //是否出现弹窗
            changeUrl: "", //定位切换路径

            isChangeCity: "", //是否提示切换页面
            locationCityNameStr: "", //获取定位城市
        }
    },
    computed:{
        // 新闻滚动
        top() {
            return - this.activeIndex * .8 + 'rem';
        }
    },
    beforeCreate: function () {
        // console.group('beforeCreate 创建前状态===============》');
    },
    methods:{
        // 跳转搜索页
        goSearch(){
            this.$router.push({path:"/search", query:{home:1}})
        },
        // 跳转查看商铺页
        goShop(id){
            this.$router.push({path:"/shopDetail", query:{shopId:id,home:1}});
        },
        // 搜索栏
        handleScroll(){
            let changBG = 0;
            let scrollTop = 0;
        },
        
        // 导航滑动
        handleScroll() {
            window.addEventListener('scroll', this.handleScroll);
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

        // 跳转城市选择
        goCitySelection(){
            this.$router.push({path: '/citySelection', query:{cityName: this.cityNameStr}});
        },
        // 滑到底部跳转商铺列表
        addScroll:function() {
            window.addEventListener("scroll",this.sa,false)
        },
        sa() {
            let _this = this;
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
            if(panDuan === 0){
                if(_this.typeIndex == "type"){
                    this.$router.push({
                        path: '/lookShop'
                    });
                    window.removeEventListener("scroll", _this.sa);
                }
            }
        },

        // 首页展示
        listData() {
            let _this = this
            let url = _this.changeData() + '/show/showInfo'
            axios(url,{
                method: 'post',
                params:{
                    cityId: sessionStorage.cityId //市 id
                }
            }).then(data => {
                // console.log(data);
                this.cityNameStr = data.data.data.cityName; //获取城市名
                this.picArr = data.data.data.imgUrl; //轮播图
                this.prizeList = data.data.data.title; //新闻
                this.coBrandingArr = data.data.data.getBrandLogoList; //品牌列表
                this.bigCaffeineArr = data.data.data.higherlist; //大咖列表
                this.shopListArr = data.data.data.djskList; // 独家实勘商铺列表
                this.PropertyObj = data.data.data.shopNewNum; //24小时房源
                this.onLineShopObj = data.data.data.shopLineNum; //在线商铺
                this.seekShopObj = data.data.data.peopleNum; //正在找铺
                this.dailyRent = data.data.data.dailyRent; //日租金
                this.shopRate = data.data.data.shopRate; //环比上月
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
            if(flag == "true"){
                window.location.href = url;
            }else{
                this.$router.push({path: '/consult', query:{id: id}});
            }
        },

        // 跳转商铺详情
        goEcharts(){
            this.$router.push({path:"/echarts", query:{url:"home",cityId:sessionStorage.cityId}});
        },
        // 跳转发布列表
        goPublish(){
            this.$router.push({path:"/publish", query:{url:"home"}});
        },
        // 跳转商铺求租
        goQiuzu(){
            if(!localStorage.iphone){
                this.$router.push({path:"/login", query:{urlType:"home"}});
            }else{
                this.isUpperLimit();
            }
        },

        // 判断是否达到上限次数
        isUpperLimit(){
            let _this = this;
            let url = this.changeData() + '/publish/auth/isPublish'
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId, 
                    type: "2"  // 求租
                }
            }).then(data => {
                // console.log(data);
                if(data.data.flag == true){
                    this.$router.push({path:"/qiuzu", url: "home"})
                }else{
                    layer.open({
                        content: '您当月的3条求租发布权限已用尽，不可再次发布',
                        skin: 'msg',
                        time: 2
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        },

        //城市定位
        cityFun(){
            let _this = this;
            function myFun(result){
                var locationCityName = result.name;
                _this.locationCityNameStr = locationCityName;
                // console.log("定位城市");
                // console.log(locationCityName);
                let url = _this.changeData() + '/show/changeCity'
                axios(url,{
                    method: 'post',
                    params: {
                        "cityName": locationCityName,
                    }
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == "101"){
                        // 本地调试
                        // sessionStorage.setItem("provinceId",data.data.provinceId);
                        // sessionStorage.setItem("cityId",data.data.cityId);

                        // var cityNameSplit =  locationCityName.split("市").join("");
                        // sessionStorage.setItem("cityName",cityNameSplit);
                        // _this.sessionCityId = sessionStorage.cityId;
                        // if(_this.sessionCityId){
                        //     _this.listData();
                        // }

                        // 如果在开通列表之内
                        if(data.data.status == true){
                            _this.changeUrl = data.data.m_url;
                            _this.isChangeCity = sessionStorage.isChangeCity;
                            // 提醒用户是否需要切换成为当前城市(只提示一次)
                            setTimeout(function () {
                                if(_this.isChangeCity == undefined || _this.isChangeCity == null || _this.isChangeCity == ""){
                                    if(locationCityName != sessionStorage.cityName){
                                        _this.isShowCityChangeWrap = true;
                                    }
                                }
                            },500);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        },

        // 城市切换
        changeUrlFun(){
            // console.log(this.changeUrl);
            window.location.href = this.changeUrl;
        },
        //取消切换城市
        cancelChangeUrlFun(){
            sessionStorage.setItem("isChangeCity","true");
            this.isShowCityChangeWrap = false;
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

        // 城市定位
        let that = this;
        
        setTimeout(function () {
            that.listData();
        },500);
        this.cityFun();

        // 获取cookie
        function getCookie(sName){
            var aCookie = document.cookie.split("; ");
            for (var i=0; i < aCookie.length; i++){
                var aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
            }
            return null;
        }
        this.iphoneCookie = getCookie("iphone");
        this.tokenCookie = getCookie("token");
        if(this.iphoneCookie){
            localStorage.iphone = this.iphoneCookie;
            localStorage.token = this.tokenCookie;
        }else{
            localStorage.clear();
        }
    },
    components:{
        // shopList
    },
    created() {
        this.typeIndex = "type";
        this.handleScroll();
        // 接口调用
        this.listData();
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
            b{
                display: inline-block;
                width:0;
                height:0;
                border-width: .08rem .08rem 0;
                border-style:solid;
                border-color: #fff transparent transparent;
                position:relative;
                left: .05rem;
                top: -.08rem;
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
                -webkit-tap-highlight-color: rgba(0,0,0,0); 
            }
            b{
                display: inline-block;
                width:0;
                height:0;
                border-width: .08rem .08rem 0;
                border-style:solid;
                border-color: #ccc transparent transparent;
                position:relative;
                left: .05rem;
                top: -.08rem;
            }
        }
        dt{
            float: left;
            img{
                width: .26rem;
                height: .26rem;
                position: relative;
                top: .04rem;
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
    height: 3.6rem;
    background-color: #fff;
    padding-top: .4rem;
}
.homeCenter dl{
    height: 1.8rem;
    font-size: 0.28rem;
    color: #333;
    float: left;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    a{
        color: #333;
    }
}
.dl1{
    width: 25%;
    /*-webkit-tap-highlight-color: rgba(0,0,0,0);*/
}
.dl2{
    width: 50%;
  /*-webkit-tap-highlight-color: rgba(0,0,0,0);*/
}
.dl3{
  /*-webkit-tap-highlight-color: rgba(0,0,0,0);*/
    width: 25%;
    text-align: center;
}
.homeCenter dl dt{
    margin-top: 0rem;
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
    height: 1rem;
    background-color: #fff;
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
    margin-top: 0.2rem;
    .homeMain-top{
        height: 1rem;
        background: #fff;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
            color: #111;
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
        position: relative;
        top: 0;
        right: .1rem;
    }
}
/*本月租金均价*/
.averagePrice{
    width: 7.5rem;
    height: 4.4rem;
    background: #fff;
    margin-top: 0.2rem;
    .averagePriceTop{
        height: 1rem;
        background: #fff;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
            color: #111;
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
    .averagePriceBox{
        width: 7.1rem;
        height: 2.8rem;
        background: red;
        background: url(../../../static/images/home/backdrop.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-top: .5rem;
        margin-left: .2rem;
    }
    .monthPrice{
        width: 4.4rem;
        height: .7rem;
        margin: 0 auto;
        text-align: center;
        dt{
            width: 2.1rem;
            color: #111;
            font-size: .78rem;
            float: left;
            margin-right: .18rem;
            margin-top: .1rem;
            float: left;
            text-align: right;
        }
        dd{
            float: left;
            h5{
                color: #666;
                font-size: .26rem;
                line-height: .32rem;
            }
        }
    }
}
.property{
    width: 100%;
}
.property dl{
    width: 33.33%;
    height: 0.7rem;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    float: left;
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.3rem;
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
/* 合作品牌 */
.co-branding{
    width: 7.5rem;
    background: #fff;
    .co-branding-top{
        height: 1rem;
        background: #fff;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
            color: #111;
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
    .co-branding-box{
        width: 7.1rem;
        height: 1.6rem;
        overflow: hidden;
        margin-left: .2rem;
        margin-right: .2rem;
        p{
            width: 100%;
            height: 1.8rem;
            display: box;
            display: -webkit-box;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            span{
                width: 1.8rem;
                height: 1.32rem;
                margin-right: .2rem;
                display: block;
                box-shadow:0px 0px 4px rgba(0,0,0,0.18);
                box-sizing: border-box;
                margin-top: .2rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            :nth-child(1){
                border-left: .01rem solid #eaeaea;
            }
            :nth-child(9){
                border-right: .01rem solid #eaeaea;
            }
        }
    }
}

/*大咖推荐*/
.big-caffeine{
    width: 7.5rem;
    padding-top: .2rem;
    background: #fff;
    .big-caffeine-top{
        height: 1rem;
        background: #fff;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
            color: #111;
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
    .big-caffeine-box{
        width: 7.1rem;
        height: 4rem;
        overflow: hidden;
        margin-left: .2rem;
        margin-right: .2rem;
        p{
            width: 100%;
            height: 4.2rem;
            display: box;
            display: -webkit-box;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            span{
                width: 3rem;
                height: 4rem;
                margin-right: .2rem;
                display: block;
                position: relative;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                ul{
                    width: 100%;
                    height: 1.28rem;
                    padding: .12rem;
                    position: absolute;
                    bottom: 0px;
                    background: rgba(0,0,0,0.5);
                    z-index: 2000;
                    color: #fff;
                    overflow: hidden;
                    z-index: 1;
                    h5{
                        font-size: .34rem;
                        line-height: .34rem;
                    }
                    h6{
                        margin-top: .04rem;
                        height: .68rem;
                        font-size: .3rem;
                        line-height: .36rem;
                        text-align: justify;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}

/*城市切换弹窗*/
.cityChangeWrap{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100000000;
    .cityChangeBox{
        width: 6rem;
        height: 3.2rem;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 32%;
        margin-left: -3rem;
        border-radius: 6px;
        overflow: hidden;

        h2{
            color: #444;
            text-align: center;
            line-height: 1.2rem;
            margin-top: .2rem;
            font-size: .4rem;
        }
        p{
            color: #444;
            text-align: center;
            font-size: .3rem;
            color: #444;
        }
        div{
            width: 100%;
            height: .88rem;
            /*background: red;*/
            position: absolute;
            left: 0;
            bottom: 0;
            span{
                display: inline-block;
                width: 50%;
                line-height: .88rem;
                float: left;
                text-align: center;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .span1{
                background: #eee;
            }
            .span2{
                background: #64ABFF;
                color: #fff;
            }
        }
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

