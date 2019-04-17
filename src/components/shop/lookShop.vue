<template>
<div class="lookShop">
    <div class="backTop" @click.stop="backTopFun()"></div>
    <div class="title">
        <div class="grayNab">
            <dl class="grayNab_left" @click="goSearch()">
                <h5><span>{{sessionCityName}}</span></h5>
                <dt><img src="../../../static/images/home/search2.png"></dt>
                <dd>
                    <input type="text" placeholder="区域/商圈/业态/商铺编号" v-model="search">
                    <span v-if="search" @click.stop="searchFun()"></span>
                </dd>
            </dl>
        </div>
        <div class="shaixuan">
            <div class="list">
                <div @click="tab1($event)" :class="{'cur':tab===0}">区域 <span></span></div>
                <div @click="tab2($event)" :class="{'cur':tab===1}">业态 <span></span></div>
                <div @click="tab3($event)" :class="{'cur':tab===2}">面积 <span></span></div>
                <div @click="tab4($event)" :class="{'cur':tab===3}">价格 <span></span></div>
                <!-- <div> <router-link to="/shopMore">更多 <span></span></router-link></div> -->
            </div>
            <div class="list-content">
                <div class="modal" @click="modalHide()" ref="modal"></div>
                <ul class="one">
                    <!-- 区域 -->
                    <li class="oneList" v-show="tab===0">
                        <ul class="two twoArea">
                            <li class="twoChild" v-for="(item,index) in area" ref="first">
                                <span class="first" @click="quyuFun($event,item)">{{item.name}}</span>
                                <ol class="three">
                                    <li v-for="(item1,index1) in areaChild.childList" @click="quyuChildFun($event,item1)">{{item1.childName}}</li>
                                </ol>
                            </li>
                        </ul>
                        <!--<div class="btn">-->
                          <!--<div><span @click="clean()">清除</span></div>-->
                          <!--<div><span>确定</span></div>-->
                        <!--</div>-->
                    </li>
                    <!-- 业态 -->
                    <li class="oneList" v-show="tab===1">
                        <ul class="four">
                            <ul class="two twoYetai">
                                <li class="twoChild" v-for="(item,index) in yetai"><span class="first2" @click="yetaiFun($event,item)">{{item.name}}</span>
                                    <ol class="three">
                                        <li v-for="(item1,index1) in yetaiChild.childList" @click="yetaiChildFun($event,item1)">{{item1.childName}}</li>
                                    </ol>
                                </li>
                            </ul>
                        </ul>
                    </li>
                    <!-- 面积 -->
                    <li class="oneList" v-show="tab===2">
                        <ul class="four">
                            <li v-for="(item,index) in mianji" @click="mianjiFun($event,item)">{{item.show_text}}</li>
                        </ul>
                    </li>
                    <!-- 价格 -->
                    <li class="oneList" v-show="tab===3">
                        <ul class="two twoPrice">
                            <li class="twoChild" v-for="(item,index) in price">
                                <span class="first1" @click="priceFun($event,index)">{{item.name}}</span>
                                <ol class="three">
                                    <li v-for="(item1,index1) in priceChild" @click="priceChildFun($event,item1)">{{item1.show_text}}</li>
                                </ol>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="shoplist" v-show="yes===1">
        <div class="detail" ref="wrapper">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                <ul>
                    <li v-for="(item,index) in shopMsg" @click="go(item,index)">
                        
                        <div class="wrap" v-if="index===9 && item.remark == 0" @click.stop="zhuanFun()">
                            <img src="../../../static/images/lookShop/zhuan.png" alt="" style="width: 7.09rem;height: 1.93rem;">
                        </div>

                        <div class="wrap" v-if="index===3 && item.remark == 0" @click.stop="zhaoFun()">
                            <img src="../../../static/images/lookShop/zhao.png" alt="" style="width: 7.09rem;height: 1.93rem;">
                        </div>

                        <div class="wrap" v-if="index!=3 && index!=9 || item.remark == 1">
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
                                <div class="tags" v-if="item.shopTags != ''">
                                    <span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span>
                                </div>
                                <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
                            </div>
                        </div>

                    </li>
                </ul>
                <div class="no" v-if="more" style=" margin-bottom: 1.8rem;">没有更多数据了...</div>
            </mt-loadmore>
        </div>
    </div>

    <div class="noOrder" v-show="yes===0">
        <dl>
            <dt>
                <img src="../../../static/images/mine/noOrders.png">
            </dt>
            <p>暂无信息</p>
        </dl>
    </div>
    <div class="shopWrite" v-show="shopMsg.length > 4"></div>
</div>
</template>

<script>
import qs from 'qs';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            yes: 1,
            num: 0,
            num1: 0,
            num2: 0,
            tab : "",
            val: "",
            area: "",
            next: "",
            areaChild:"",
            yetai: "",
            yetaiChild: "",
            mianji:"",
            price:[
                {"name": "月租金",},
                {"name": "转让费"}
            ],
            priceIndex: "", //月租金转让费Id
            priceChild:"",
            shopMsg: [],
            allLoaded: false,
            more: false,
            wrapperHeight: 0,
            search: "",
            quyuID: "",
            yetaiID: "",
            mianjiID: "",
            jiageID: "",
            nextSearch: "",
            homeMore: "",//首页查看更多
            defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
            monthlyList: "", //月租金
            transferList: "", // 转让费
            monthlyId: "", //月租金id
            transfeeId: "", //转让费id
            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码 
            sessionCityName: ""  // 城市名
        };
    },    
    // updated(){

    // },
    beforeRouteLeave(to,from,next){
        let position = $(window).scrollTop();
        localStorage.setItem("scrollTop",position);
        if(to.path == "/shopDetail"){
            if(!from.meta.keepAlive){
                from.meta.keepAlive = true;
            }
            next();
        }else{
            from.meta.keepAlive = false;
            to.meta.keepAlive = false;
            next();
            // window.location.reload()
        }
    },
    methods: {
        errFun(){
            this.src = ""
        },
        zhuanFun(){
            this.$router.push({path:"/turnShop",query:{lookShop:1}})
        },
        zhaoFun(){
            this.$router.push({path:"/seekShop",query:{lookShop:1}})
        },
        goSearch(){
            this.$router.push({path:"/search",query:{lookShop:1}})
        },
        backTopFun(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        searchFun(){
            this.search = '';
            sessionStorage.search = "";
            // this.init();
            this.postData();
        },

        // 跳转商详情
        go(item,index){
            $(".shoplist ul li").eq(index).addClass("cur");
            this.$router.push({path:"/shopDetail",query:{shopId: item.id,lookShop:1,type:item.type}})
        },
        tab1(e){
            if($(e.srcElement).hasClass("cur")){
               this.tab = "";
               this.$refs.modal.style.display = "none";
            }else{
                this.tab = 0;
                this.$refs.modal.style.display = "block";
                if(this.num === 0){
                   $(".twoArea li").eq(0).children(".first").click();
                   this.num++;
                }
            }
        },
        tab2(e){
            if($(e.srcElement).hasClass("cur")){
                this.tab = "";
                this.$refs.modal.style.display = "none";
            }else{
                this.tab = 1;
                this.$refs.modal.style.display = "block";
                if(this.num2 === 0){
                    $(".twoYetai li").eq(0).children(".first2").click();
                    this.num2++;
                }
            }
        },
        tab3(e){
            if($(e.srcElement).hasClass("cur")){
                this.tab = "";
                this.$refs.modal.style.display = "none";
            }else{
                this.tab = 2;
                this.$refs.modal.style.display = "block";
            }
        },
        tab4(e){
            if($(e.srcElement).hasClass("cur")){
                this.tab = "";
                this.$refs.modal.style.display = "none";
            }else{
                this.tab = 3;
                this.$refs.modal.style.display = "block";
                if(this.num1 === 0){
                    $(".twoPrice li").eq(0).children(".first1").click();
                    this.num1++;
                }
            }
        },

        // 筛选数据
        init(){
            this.$http(this.changeData() + '/shop/getSearchConditon',{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId
                }
            }).then(function(res){
                // console.log(res)
                this.area = res.data.areas; //区域
                this.yetai = res.data.shopBusinessTypes; //业态
                this.mianji = res.data.acreageList; //acreageList
                this.monthlyList = res.data.monthlyList; //月租金
                this.transferList = res.data.transferList; //转让费
            }.bind(this)).catch(function(err){
                console.log("商店列表页面错误：",err)
            })
        },

        //下拉刷新
        loadTop(){
            $(".shoplist ul li").removeClass("cur");
            var that = this;
            if(this.search){
                var data = {
                    cityId: sessionStorage.cityId, //城市id
                    pageSize: this.pageSize, //每页数据量
                    pageNum: "1", //页码从1开始
                    search: this.search,
                }
                setTimeout(function () {
                    that.$http.post(that.changeData() + '/shop/getShopList',qs.stringify(data)).then(function(res){
                        that.shopMsg = that.shopMsg.concat(res.data.shopList)
                        that.$refs.loadmore.onTopLoaded();
                    }.bind(that)).catch(function(err){
                        console.log("商店列表页面错误：",err)
                    })
                },2000)
            }else{
                var data = {
                    cityId: sessionStorage.cityId, //城市id
                    pageSize: this.pageSize, //每页数据量
                    pageNum: "1", //页码从1开始
                    businessCircleId: this.quyuID, //区域id
                    businessTypeId: this.yetaiID, //业态id
                    areaId: this.mianjiID, //面积id
                    monthlyId: this.monthlyId, //月租金id
                    transfeeId: this.transfeeId, //转让费id  
                }
                setTimeout(function () {
                    that.$http.post(that.changeData() + '/shop/getShopList', qs.stringify(data)).then(function (res) {
                        //console.log(res)
                        that.shopMsg = res.data.shopList;
                        that.$refs.loadmore.onTopLoaded();
                    }.bind(that)).catch(function (err) {
                        console.log("商店列表页面错误：", err)
                    })
                }, 2000)
            }
        },

        //上拉加载
        loadBottom() {
            var that = this;
            this.brandIndex++;
            if(this.search){
                var data = {
                    cityId: sessionStorage.cityId, //城市id
                    pageSize: this.pageSize, //每页数据量
                    pageNum: this.brandIndex, //页码从1开始
                    search: this.search
                }
                setTimeout(function () {
                    that.$http.post(that.changeData() + '/shop/getShopList',qs.stringify(data)).then(function(res){
                        that.shopMsg = that.shopMsg.concat(res.data.shopList)
                        that.$refs.loadmore.onBottomLoaded();
                    }.bind(that)).catch(function(err){
                        console.log("商店列表页面错误：",err)
                    })
                },2000);
            }else{
                var data = {
                    cityId: sessionStorage.cityId, //城市id
                    pageSize: this.pageSize, //每页数据量
                    pageNum: this.brandIndex, //页码从1开始
                    businessCircleId: this.quyuID, //区域id
                    businessTypeId: this.yetaiID, //业态id
                    areaId: this.mianjiID, //面积id
                    monthlyId: this.monthlyId, //月租金id
                    transfeeId: this.transfeeId, //转让费id
                }
                that.$http.post(that.changeData() + '/shop/getShopList',qs.stringify(data)).then(function(res){
                    that.shopMsg = that.shopMsg.concat(res.data.shopList);
                    if(res.data.shopList == ''){
                        this.allLoaded = true;
                    }
                    that.$refs.loadmore.onBottomLoaded();
                }.bind(that)).catch(function(err){
                    console.log("商店列表页面错误：",err);
                })
            }
        },
        handleBottomChange(){
            var that = this;
            if(this.allLoaded == true){
                this.more = true;
                setTimeout(function () {
                    that.more = false;
                },2000)
            }
        },

        // 初始数据
        postData(){
            let that = this;
            var data = {
                cityId: sessionStorage.cityId, //城市id
                pageSize: this.pageSize, //每页数据量
                pageNum: "1", //页码从1开始
                businessCircleId: this.quyuID, //区域id
                businessTypeId: this.yetaiID, //业态id
                areaId: this.mianjiID, //面积id
                monthlyId: this.monthlyId, //月租金id
                transfeeId: this.transfeeId, //转让费id
            }
            this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
                $(".shoplist ul li").removeClass("cur");
                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
                setTimeout(function () {
                    Indicator.close();
                },1000)
                  // console.log(res);
                if(res.data.code == 101){
                    this.shopMsg = res.data.shopList;
                    this.tab = "";
                    this.$refs.modal.style.display = "none";

                    if(this.shopMsg.length==0){
                        this.yes = 0;
                    }else{
                        this.yes = 1;
                    }
                    if(res.data.totalCount <= that.pageSize){
                        that.allLoaded = true;
                    }else{
                        that.allLoaded = false;
                    }
                    window.scrollTo(0, 0);
                }
            }.bind(this)).catch(function(err){
                console.log("商店列表页面错误：",err)
            })
        },

        // 区域筛选
        quyuFun(e,item){
            this.areaChild = item;
            $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        },
        quyuChildFun(e,item){
            this.brandIndex = 1;
            this.allLoaded = false;
            this.quyuID = item.childId;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
            this.postData();
        },

        // 业态筛选
        yetaiFun(e,item){
            this.yetaiChild = item;
            $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        },
        yetaiChildFun(e,item){
            this.brandIndex = 1;
            this.allLoaded = false;
            this.yetaiID = item.childId;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
            this.postData();
        },
        // 面积
        mianjiFun(e,item){
            this.brandIndex = 1;
            this.allLoaded = false;
            this.mianjiID = item.id;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
            this.postData();
        },
        // 价格
        priceFun(e,index){
            if(index == 0){
                this.priceChild = this.monthlyList; //月租金
                this.priceIndex = 0;
            }else{
                this.priceIndex = 1;
                this.priceChild = this.transferList; //转让费
            }
            $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        },
        priceChildFun(e,item){
            this.brandIndex = 1;
            this.allLoaded = false;
            if(this.priceIndex == 0){
                this.monthlyId = item.id;  //月租金id
            }else{
                this.transfeeId = item.id; //转让费id
            }
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
            this.postData();
        },
        clean(){
            this.$router.go(0);
        },
        modalHide(){
            this.tab = "";
            this.$refs.modal.style.display = "none";
        }
    },
    mounted() {
        let _this = this;
        this.homeMore = this.$route.params.more;
        this.search = this.$route.query.search;
        // alert(this.search);
        if(this.search){
            var data = {
                cityId: sessionStorage.cityId, //城市id
                pageSize: _this.pageSize, //每页数据量
                pageNum: "1", //页码从1开始
                search: _this.search
            }
            this.$http.post(this.changeData() + '/shop/getShopList',qs.stringify(data)).then(function(res){
                // console.log(res)
                this.shopMsg = res.data.shopList;
            }.bind(this)).catch(function(err){
                console.log("商店列表页面错误：",err)
            })
        }else{
            // 初始数据
            this.postData();
        }
        var cityNameStr = sessionStorage.cityName;
        this.sessionCityName = cityNameStr.split("市").join("");
    },
    created(){
        // 筛选数据
        this.init();
    }

}
</script>

<style scoped lang="scss" type="text/scss">
@import "../../../static/css/shopList.scss";
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

.lookShop{
    width:7.5rem;
    margin: 0 auto;
    background: #fff;
    .backTop{
        width: .9rem;
        height: .9rem;
        position: fixed;
        right: .5rem;
        bottom: 2.74rem;
        z-index: 1000;
        background: url("../../../static/images/lookShop/top.png") no-repeat;
        -webkit-background-size: .9rem .9rem;
        background-size: .9rem .9rem;
    }
    .shopWrite{
        width: 7.5rem;
        height: 1rem;
        background: #fff;
    }
    .title{
        position: fixed;
        left: auto;
        top: 0;
        z-index: 2000;
        .grayNab {
            width: 7.5rem;
            height: .76rem;
            padding-top: .2rem;
            background: #fff;
            .grayNab_left {
                float: left;
                width: 6.3rem;
                height: .56rem;
                color: #ccc;
                font-size: 0.24rem;
                margin-left: .55rem;
                border-radius: 6px;
                border: 1px solid #f0f1f2;
                background: #f0f1f3;
                h5 {
                    height: .36rem;
                    float: left;
                    font-size: .24rem;
                    margin-left: .14rem;
                    padding-right: .15rem;
                    margin-right: .15rem;
                    border-right: 1px solid #ccc;
                    margin-top: .1rem;
                    span {
                        display: inline-block;
                        position: relative;
                        top: -.04rem;
                    }
                }
                dt{
                    float: left;
                    img {
                        width: .26rem;
                        height: .26rem;
                        position: relative;
                        top: .01rem;
                        margin-right: .1rem;
                    }
                }
                dd{
                    position: relative;
                    float: left;
                    line-height: .6rem;
                    font-size: .24rem;
                    width: 4.8rem;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    input{
                        width: 3rem;
                        background: #f0f1f3;
                        position: relative;
                        top: -.05rem;
                    }
                    span{
                        position: absolute;
                        width: 0.26rem;
                        height: 0.26rem;
                        right: 0;
                        top: .15rem;
                        background: url("../../../static/images/search/close.png") no-repeat;
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .shaixuan{
            position: relative;
            width: 7.5rem;
            height: .81rem;
            z-index: 11;
            background: #fff;
            .list{
                width: 7.5rem;
                height: .81rem;
                display: flex;
                background: #fff;
                div{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    width: 25%;
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .3rem;
                    justify-content: space-around;
                    text-align: center;
                    background: #fff;
                    border-bottom: .01rem solid #eaeaea;
                    &.cur{
                        color: #7bb5ff;
                        span{
                            background: url("../../../static/images/lookShop/up-bg.png") no-repeat ;
                            background-size: .14rem .1rem;
                        }
                    }
                    span{
                        display: inline-block;
                        width: .14rem;
                        height: .1rem;
                        background: url("../../../static/images/lookShop/down.png") no-repeat;
                        background-size: .14rem .1rem;
                        vertical-align: .06rem;
                    }
                }
            }
            .list-content{
                position: relative;
                top: .01rem;
                ul.one{
                    position: absolute;
                    background: #fff;
                    left: 0;
                    top: 0rem;
                    z-index:2;
                    overflow: hidden;
                    .oneList{
                        width: 7.5rem;
                        height: 5rem;
                        border-bottom: .01rem solid #eaeaea;
                        .btn{
                            width: 7.5rem;
                            height: .88rem;
                            background: #fff;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            border-top: 0.01rem solid #eaeaea;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            div:nth-of-type(1){
                                width: 50%;
                                text-align: center;
                                span{
                                    display: inline-block;
                                    width: 3rem;
                                    height: .5rem;
                                    line-height: .5rem;
                                    text-align: center;
                                    font-size: .3rem;
                                    background: #aaa;
                                    color: #fff;
                                    border-radius: .05rem;
                                }
                            }
                            div:nth-of-type(2){
                               width: 50%;
                               text-align: center;
                                span{
                                    display: inline-block;
                                    width: 3rem;
                                    height: .5rem;
                                    line-height: .5rem;
                                    text-align: center;
                                    font-size: .3rem;
                                    background: #7bb5ff;
                                    color: #fff;
                                    border-radius: .05rem;
                                }
                            }
                        }
                        .two{
                            -webkit-tap-highlight-color: rgba(0,0,0,0);
                            background: #fff;
                            width: 2.95rem;
                            height: 5rem;
                            border-right: .01rem solid #eaeaea;
                            overflow: scroll;
                            .twoChild{
                                text-align: center;
                                height: .78rem;
                                line-height: .78rem;
                                font-size: .3rem;
                                border-bottom: .01rem solid #fff;
                                &.cur{
                                    span{
                                        display: inline-block;
                                        width: 100%;
                                        height: 100%;
                                        color: #7bb5ff;
                                    }
                                }
                                .three{
                                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                                    background: #fff;
                                    width: 4rem;
                                    height: 5rem;
                                    padding-left: .54rem;
                                    position: absolute;
                                    left: 2.96rem;
                                    top: 0;
                                    text-align: left;
                                    background: #f7f8fa;
                                    overflow: scroll;
                                    li{
                                      height: .78rem;
                                      line-height: .78rem;
                                      font-size: .3rem;
                                      &.cur{
                                        color: #7bb5ff;
                                      }
                                    }
                                }
                            }
                        }
                       .four{
                            -webkit-tap-highlight-color: rgba(0,0,0,0);
                            background: #fff;
                            height: 5rem;
                            width: 7.5rem;
                            overflow: auto;
                            &>li{
                                margin-left: .55rem;
                                height: .78rem;
                                margin-right: .4rem;
                                line-height: .78rem;
                                font-size: .3rem;
                                border-bottom: .01rem solid #fff;
                                &.cur{
                                    color: #7bb5ff;
                                    /*border-bottom: .01rem solid #7bb5ff;*/
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .modal{
        width: 7.5rem;
        height: 13.34rem;
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
        background: rgba(0,0,0,.3);
    }
    .shoplist{
        padding-top: 1.77rem;
    }
    .noOrder{
        padding-top: 1.5rem;
        width: 7.5rem;
        height: 90vh;
        .noOrderTop{
            height: .9rem;
            text-align: center;
            background: #fff;
            border-bottom: 0.02rem solid #eee;
            position: relative;
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
                img{
                    width: 0.4rem;
                    height: 0.4rem;
                }
            }
        }
        dl{
            width: 7.5rem;
            text-align: center;
            dt{
                margin-top: 1.4rem;
                img{
                    width: 3rem;
                    height: 3rem;
                }
            }
            p{
                font-size: .28rem;
                color: #898989;
                margin-top: .38rem;
                margin-bottom: .5rem;
            }
            dd{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                span{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    display: inline-block;
                    width: 3rem;
                    height: .89rem;
                    background: #47abff;
                    line-height: .89rem;
                    color: #fff;
                    font-size: .34rem;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>
