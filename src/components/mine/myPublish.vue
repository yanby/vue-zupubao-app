<template>
<div class="myPublish">
    <div class="myPublishBox">
        <div class="myPublishTop">
            <div class="clearfix">
                <i>
                    <!-- <router-link to='/mine'> -->
                        <img src="../../../static/images/mine/back.png" @click="backBtn()">
                    <!-- </router-link> -->
                </i>
                <h3>我的发布</h3>
            </div>
            <div class="myPublishNav">
                <ul class="clearfix">
                    <li class="li1" :class="{'on':tab===0}" @click="shopTransferFun()">商铺转让</li>
                    <li class="li2" :class="{'on':tab===1}" @click="shopLeaseFun()">商铺出租</li>
                    <li class="li3" :class="{'on':tab===2}" @click="shopWantedFun()">商铺求租</li>
                </ul>
            </div>
        </div>
        <!-- 商铺转让 -->
        <div class="shopTransferWrap" v-show="this.tab == 0">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                <div class="shopTransferBox" v-for="(item,index) in shopTransferArr">
                    <dl>
                        <dt>
                            <img :src="item.img" :onerror="defaultImg">
                            <i class="jingxuan" v-show="item.top_status == 1"><img src="../../../static/images/lookShop/jingxuan.png"></i>
                        </dt>
                        <dd>
                            <h3>{{item.title}}</h3>
                            <h5 v-show="item.shopStatus == 0">审核中</h5>
                            <h5 v-show="item.shopStatus == 1">审核通过</h5>
                            <h5 style="color: #da3a4d" v-show="item.shopStatus == 2">审核失败</h5>
                            <span>发布于{{item.createTime}}</span>
                        </dd>
                    </dl>
                    <ul v-if="item.shopStatus == 2">
                        <li style="margin-left: 3.9rem;" @click="isDelete(item.id,0);">删除</li>
                        <li @click="failCauseBtn(item.reason)">失败原因</li>
                    </ul>
                    <ul v-else>
                        <li class="li1" @click="goTurnShopMember(item.id)" v-show="item.top_status == 0">开通会员</li>
                        <li class="li1" v-show="item.top_status == 1" @click="goTurnShopMember(item.id)">推广中</li>
                        <li v-show="item.shopStatus == 1" @click="isPopupShow = true;">编辑</li>
                        <li v-show="item.shopStatus == 1" @click="isPopupShow = true;">下架</li>
                        <li v-show="item.shopStatus == 1" @click="goShopDetail(item.id)">查看</li>
                    </ul>
                </div>
                <div class="noInner" v-if="more">没有更多数据了...</div>
            </mt-loadmore>
            <!-- 无数据 -->
            <div class="noData" v-show="this.shopTransferArr.length == 0">
                <dl>
                    <dt>
                        <img src="../../../static/images/myPublish/noData.png">
                    </dt>
                    <p>暂无发布信息</p>
                    <p>快去发布一条试试吧～</p>
                </dl>
            </div>
        </div>

        <!-- 商铺出租 -->
        <div class="shopTransferWrap" v-if="this.tab == 1">
            <mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1" @bottom-status-change="handleBottomChange1"
                   ref="loadmore1" :bottom-all-loaded="allLoaded1" :auto-fill="false">
                <div class="shopTransferBox" v-for="(item,index) in shopLeaseArr">
                    <dl>
                        <dt>
                            <img :src="item.img" :onerror="defaultImg">
                            <i class="jingxuan" v-show="item.top_status == 1"><img src="../../../static/images/lookShop/jingxuan.png"></i>
                        </dt>
                        <dd>
                            <h3>{{item.title}}</h3>
                            <h5 v-show="item.shopStatus == 0">审核中</h5>
                            <h5 v-show="item.shopStatus == 1">审核通过</h5>
                            <h5 style="color: #da3a4d" v-show="item.shopStatus == 2">审核失败</h5>
                            <span>发布于{{item.createTime}}</span>
                        </dd>
                    </dl>
                    <ul v-if="item.shopStatus == 2">
                        <li style="margin-left: 3.9rem;" @click="isDelete(item.id,1);">删除</li>
                        <li @click="failCauseBtn(item.reason)">失败原因</li>
                    </ul>
                    <ul v-else>
                        <li class="li1" @click="goTurnShopMember(item.id)" v-show="item.top_status == 0">开通会员</li>
                        <li class="li1" v-show="item.top_status == 1" @click="goTurnShopMember(item.id)">推广中</li>
                        <li v-show="item.shopStatus == 1" @click="isPopupShow = true;">编辑</li>
                        <li v-show="item.shopStatus == 1" @click="isPopupShow = true;">下架</li>
                        <li v-show="item.shopStatus == 1" @click="goShopDetail(item.id)">查看</li>
                    </ul>
                </div>
                <div class="noInner" v-if="more1">没有更多数据了...</div>
            </mt-loadmore>
            <!-- 无数据 -->
            <div class="noData" v-show="this.shopLeaseArr.length == 0">
                <dl>
                    <dt>
                        <img src="../../../static/images/myPublish/noData.png">
                    </dt>
                    <p>暂无发布信息</p>
                    <p>快去发布一条试试吧～</p>
                </dl>
            </div>
        </div>

        <!-- 商铺求租 -->
        <div class="shopWantedWrap" v-show="this.tab == 2">
            <mt-loadmore :top-method="loadTop2" :bottom-method="loadBottom2" @bottom-status-change="handleBottomChange2"
                   ref="loadmore2" :bottom-all-loaded="allLoaded2" :auto-fill="false">
                <div class="shopWantedBox" v-for="(item,index) in shopWantedArr">
                    <h4>{{item.createTime}}</h4>
                    <ul>
                        <!-- <li><span class="span1">面积要求：</span><span>{{item.areaLower}}～{{item.areaUpper}}㎡</span></li> -->
                        <li><span class="span1">面积要求：</span><span>{{item.acreage}}㎡</span></li>
                        <li>
                            <span class="span1">月租范围：</span>
                            <span>{{item.monthlyRentLower}}万～{{item.monthlyRentUpper}}万</span>
                        </li>
                        <li><span class="span1">区域要求：</span><span>{{item.area}}</span></li>
                        <li><span class="span1">计划经营：</span><span>{{item.sonManageType}}</span></li>
                        <li><span class="span1">商铺类型：</span><span>{{item.type}}</span></li>
                    </ul>
                    <dl>
                        <dt>
                            <span @click="goBuymember()">开通会员</span> 
                            <!-- <span @click="goBuymember()">服务中</span>  -->
                        </dt>
                        <dd>
                            <span @click="isDelete(item.id,2);">删除</span>
                            <span @click="isPopupShow = true;">编辑</span>
                        </dd>
                    </dl>
                </div>
                <div class="noInner" v-if="more2">没有更多数据了...</div>
            </mt-loadmore>

            <!-- 无数据 -->
            <div class="noData1" v-show="this.shopWantedArr.length == 0">
                <dl>
                    <dt>
                        <img src="../../../static/images/myPublish/noData.png">
                    </dt>
                    <p>暂无发布信息</p>
                    <p>快去发布一条试试吧～</p>
                </dl>
            </div>
        </div>

        <!-- 编辑与下架 弹窗 -->
        <div class="popupWrap" v-if="isPopupShow">
            <div class="popupWrapBox">
                <h4>如需修改信息，可拨打电话，</h4>
                <h4>联系业务人员帮您修改</h4>
                <p>4008988808</p>
                <span class="span1" @click="isPopupShow = false;">取消</span>
                <span class="span2" @click="telephone()">拨打</span>
            </div>
        </div>

        <!-- 删除 弹窗 -->
        <!-- <div class="popupWrap" v-if="isPopupShow1">
            <div class="popupWrapBox popupWrapBox1">
                <h3>温馨提示</h3>
                <h4>确定要删除吗？</h4>
                <span class="span1" @click="isPopupShow1 = false;">取消</span>
                <span class="span2" @click="confirmDel();">确定</span>
            </div>
        </div> -->

        <!-- 删除 弹窗 -->
        <div class="popupWrap" v-if="isPopupShow1">
            <div class="popupWrapBox popupWrapBox1">
                <h3>温馨提示</h3>
                <h4>确定要删除吗？</h4>
                <span class="span1" @click="isPopupShow1 = false;">取消</span>
                <span class="span2" @click="confirmDel();">确定</span>
            </div>
        </div>

        <!-- 失败原因 弹窗 -->
        <div class="popupWrap" v-if="isPopupShow2">
            <div class="failureBox">
                <img src="../../../static/images/myPublish/closeBtn.png" @click="isPopupShow2 = false">
                <h5>失败原因</h5>
                <h6>{{failCauseStr}}</h6>
            </div>
        </div>
        <!-- 点击立即发布 -->
        <div class="goPublish" @click="goPublish()">点击立即发布</div>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'myPublish',
    data () {
        return {
            tab: 0,
            shopTransferArr: [], //商铺转让
            shopLeaseArr: [], //商铺出租
            shopWantedArr: [], //商铺求租
            isPopupShow: false, //编辑与下架 弹窗
            isPopupShow1: false, //删除 弹窗
            isPopupShow2: false, //失败原因 弹窗
            failCauseStr: "", //获取失败原因文案
            deleteId: "", //删除id
            deleteType: "", //删除类型
            // 商铺转让分页
            allLoaded: false,
            more: false,
            pageSize: 5, //每次请求的数量
            brandIndex: 1, //页码 
            // 商铺出租分页
            allLoaded1: false,
            more1: false,
            brandIndex1: 1, //页码 
            // 商铺求租分页
            allLoaded2: false,
            more2: false,
            brandIndex2: 1, //页码 

            goUrl: "", //返回路径
            wantedDetailId: "", //求租详情Id

            defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
        }
    },
    computed:{

    },
    methods:{
        // 返回按钮
        backBtn(){
            if(this.goUrl == 'publish'){
                this.$router.push({path:"/publish"});
            }else if(this.goUrl == 'wantedDetail'){
                this.$router.push({path:"/wantedDetail",query:{id:this.wantedDetailId}});
            }else{
                this.$router.push({path:"/mine"});
            }
        },

        // 商铺转让
        shopTransferFun(){
            this.tab=0;
            this.allLoaded1 = false;
            this.brandIndex = 1;
            let _this = this
            let url = this.changeData() + '/publish/auth/getPublishList'
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    pageSize: this.pageSize,
                    pageNum: 1,
                    type: 1 //转让1
                }
            }).then(data => {
                // console.log(data);
                this.shopTransferArr = data.data.publishList;
                if(data.data.totalCount <= _this.pageSize){
                    _this.allLoaded = true;
                }else{
                    _this.allLoaded = false;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        //下拉刷新
        loadTop(){
            let _this = this;
            setTimeout(function(){
                _this.$refs.loadmore.onTopLoaded();
            },1000)
        },
        //上拉加载
        loadBottom() {
            let _this = this;
            this.brandIndex++;
            this.allLoaded = false;
            let url = this.changeData() + '/publish/auth/getPublishList';
            var data = {
                cityId: sessionStorage.cityId, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex,     // 页码从1开始【必传】   
                type: 1 //转让1    
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.shopTransferArr = _this.shopTransferArr.concat(data.data.publishList);
                    if(data.data.publishList <= 0){
                      _this.allLoaded = true;
                    }
                    _this.$refs.loadmore.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },
        handleBottomChange(){
            var _this = this;
            if(this.allLoaded == true){
                _this.more = true;
                setTimeout(function () {
                    _this.more = false;
                },1000)
            }
        },

        // 商铺出租
        shopLeaseFun(){
            this.tab=1;
            this.brandIndex1 = 1;
            let _this = this
            let url = this.changeData() + '/publish/auth/getPublishList'
            axios(url,{
                method: 'post',
                params: {  
                    cityId: sessionStorage.cityId,
                    pageSize: this.pageSize,
                    pageNum: 1,
                    type: 0 //出租0 
                }
            }).then(data => {
                // console.log(data);
                this.shopLeaseArr = data.data.publishList;
                if(data.data.totalCount <= _this.pageSize){
                    _this.allLoaded1 = true;
                }else{
                    _this.allLoaded1 = false;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        //下拉刷新
        loadTop1(){
            let _this = this;
            setTimeout(function () {
                    _this.$refs.loadmore1.onTopLoaded();
            },1000)
        },
        //上拉加载
        loadBottom1(){
            let _this = this;
            this.brandIndex1++;
            this.allLoaded1 = false;
            let url = this.changeData() + '/publish/auth/getPublishList';
            var data = {
                cityId: sessionStorage.cityId, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex1,     // 页码从1开始【必传】   
                type: 0 //出租0    
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.shopLeaseArr = _this.shopLeaseArr.concat(data.data.publishList);
                    if(data.data.publishList <= 0){
                      _this.allLoaded1 = true;
                    }
                    _this.$refs.loadmore1.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },
        handleBottomChange1(){
            var _this = this;
            if(this.allLoaded1 == true){
                _this.more1 = true;
                setTimeout(function() {
                    _this.more1 = false;
                },1000)
            }
        },

        // 商铺求租
        shopWantedFun(){
            this.tab=2;
            this.brandIndex2 = 1;
            this.allLoaded1 = false;
            let _this = this
            let url = this.changeData() + '/publish/auth/getPublishList'
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    pageSize: this.pageSize,
                    pageNum: 1,
                    type: 2  //求租2 
                }
            }).then(data => {
                // console.log(data);
                this.shopWantedArr = data.data.publishList;
                // console.log(this.shopWantedArr);
                if(data.data.totalCount <= _this.pageSize){
                    _this.allLoaded2 = true;
                }else{
                    _this.allLoaded2 = false;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        //下拉刷新
        loadTop2(){
            let _this = this;
            setTimeout(function () {
                _this.$refs.loadmore2.onTopLoaded();
            },1000)
        },

        //上拉加载
        loadBottom2(){
            let _this = this;
            this.brandIndex2++;
            this.allLoaded2 = false;
            let url = this.changeData() + '/publish/auth/getPublishList';
            var data = {
                cityId: sessionStorage.cityId, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex2, // 页码从1开始【必传】   
                type: 2  //求租2    
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.shopWantedArr = _this.shopWantedArr.concat(data.data.publishList);
                    if(data.data.publishList <= 0){
                      _this.allLoaded2 = true;
                    }
                    _this.$refs.loadmore2.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },
        handleBottomChange2(){
            var _this = this;
            if(this.allLoaded2 == true){
                _this.more2 = true;
                setTimeout(function () {
                    _this.more2 = false;
                },1000)
            }
        },

        // 购买转铺会员
        goTurnShopMember(id){
            this.$router.push({path:"/turnShopMember",query:{url:"myPublish", urlType: this.tab}});
        },
        // 购买找铺会员
        goBuymember(){
            this.$router.push({path:"/buymember",query:{url:"myPublish", urlType: this.tab}});
        },

        // 点击立即发布
        goPublish(){
            if(this.tab == "0"){
                this.isUpperLimit("0");
            }else if(this.tab == "1"){
                this.isUpperLimit("1");
                // this.$router.push({path:"/gather",query:{type: 1}});
            }else{
                this.isUpperLimit("2");
                // this.$router.push({path:"/qiuzu"});
            }
        },

        // 判断是否达到上限次数
        isUpperLimit(typeData){
            let _this = this;
            let url = this.changeData() + '/publish/auth/isPublish'
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    type: typeData
                }
            }).then(data => {
                // console.log(data);
                if(data.data.flag == true){
                    if(this.tab == "0"){
                        this.$router.push({path:"/gather",query:{type: 0,urlId: 0}});
                    }else if(this.tab == "1"){
                        this.$router.push({path:"/gather",query:{type: 1,urlId: 1}});
                    }else{
                        this.$router.push({path:"/qiuzu",query:{type: 2}});
                    }
                }else{
                    if(this.tab == "0" || this.tab == "1"){
                        layer.open({
                            content: data.data.msg,
                            skin: 'msg',
                            time: 2
                        });
                    }else{
                        layer.open({
                            content: '您当月的3条求租发布权限已用尽，不可再次发布',
                            skin: 'msg',
                            time: 2
                        });
                    }  
                }
            }).catch(err => {
                console.log(err)
            });
        },

        // 点击拨打电话
        telephone() {
            window.location.href="tel:4008988808";
        },
        // 点击删除按钮
        isDelete(id,type){
            this.isPopupShow1 = true;
            this.deleteId = id;
            this.deleteType = type;
        },
        confirmDel(){
            let _this = this
            if(this.deleteType == "0"){
                let url = this.changeData() + '/publish/auth/delShop' // 转让
                axios(url,{
                    method: 'post',
                    params: { 
                        type: 1, //1 转让 
                        shopId: this.deleteId,    
                    }
                }).then(data => {
                    // console.log(data);
                    _this.isPopupShow1 = false;
                    layer.open({
                        content: "删除成功",
                        skin: 'msg',
                        time: 2
                    });
                    _this.shopTransferFun();
                }).catch(err => {
                    console.log(err)
                });
            }else if(this.deleteType == "1"){
                let url = this.changeData() + '/publish/auth/delShop' // 出租
                axios(url,{
                    method: 'post',
                    params: { 
                        type: 0, //0 出租
                        shopId: this.deleteId,    
                    }
                }).then(data => {
                    // console.log(data);
                    _this.isPopupShow1 = false;
                    layer.open({
                        content: "删除成功",
                        skin: 'msg',
                        time: 2
                    });
                    _this.shopLeaseFun();
                }).catch(err => {
                    console.log(err)
                });
            }else{
                let url = this.changeData() + '/publish/auth/delShop' // 求租
                axios(url,{
                    method: 'post',
                    params: { 
                        type: 2, //2 求租
                        shopId: this.deleteId   
                    }
                }).then(data => {
                    // console.log(data);
                    _this.isPopupShow1 = false;
                    layer.open({
                        content: "删除成功",
                        skin: 'msg',
                        time: 2
                    });
                    _this.shopWantedFun();
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        // 获取审核失败原因
        failCauseBtn(str){
            this.isPopupShow2 = true;
            this.failCauseStr = str;
        },
        // 查看商铺
        goShopDetail(id){
            this.$router.push({path:"/shopDetail",query:{shopId: id, myPublish: "myPublish", urlType: this.tab}});
        }

    },
    mounted() {
        var that = this;
        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
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
        var urlId = request['urlType'];
        this.wantedDetailId = request['wantedDetailId'];
        this.goUrl = urlId;
        // alert(urlId);
        if(urlId == 2){
            this.shopWantedFun();
        }else if(urlId == 1){
            this.shopLeaseFun();
        }else{
            this.shopTransferFun();
        }
    }
}
</script>
<style scoped lang="scss"  type="text/scss">
.myPublish{
    width: 7.5rem;
    background: #f7f8fa;
}
.myPublishTop{
    position: fixed;
    top: 0;
    height: 2rem;
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
        img{
            width: 0.4rem;
            height: 0.4rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
}
.myPublishNav{
    width: 7.5rem;
    height: 1rem;
    li{
        height: 1rem;
        float: left;
        color: #555;
        text-align: center;
        position: relative;
        font-size: .3rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        &.on{
            color: #64abff;
        }
    }
}
.myPublishNav .li1{
    width: 2rem;
    line-height: 1rem;
}
.myPublishNav .li2{
    width: 3.5rem;
    line-height: 1rem;
}
.myPublishNav .li3{
  width: 2rem;
    line-height: 1rem;
}

/*商铺转让*/
.shopTransferWrap{
    width: 7.5rem;
    margin-top: 2rem;
    padding-bottom: 1rem;
    .shopTransferBox{
        width: 7.1rem;
        height: 2.7rem;
        background: #fff;
        padding: .2rem;
        margin-bottom: .2rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        dl{
            height: 1.8rem;
            border-bottom: 1px solid #eaeaea;
            dt{
                /*background: pink;*/
                width: 2.16rem;
                height: 1.62rem;
                float: left;
                position: relative;
                i{
                    width: .8rem;
                    height: .4rem;
                    position: absolute;
                    left: 0;
                    top: -.06rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                img{
                    width: 2.16rem;
                    height: 1.62rem;
                }
            }
            dd{
                width: 4.2rem;
                height: 1.46rem;
                margin-left: .2rem;
                float: left;
                /*background: pink;*/
                position: relative;
                h3{
                    color: #000;
                    font-size: .34rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                h5{
                    color: #64abff;
                    font-size: .28rem;
                    position: absolute;
                    left: 0rem;
                    bottom: 0rem;
                }
                span{
                    color: #898989;
                    font-size: .28rem;
                    position: absolute;
                    right: 0rem;
                    bottom: 0rem;
                }
            }
        }
        ul{
            margin-top: .2rem;
            li{
                float: left;
                width: 1.5rem;
                height: .58rem;
                background: #64abff;
                line-height: .58rem;
                text-align: center;
                color: #fff;
                font-size: .3rem;
                border-radius: 6px;
                margin-left: .2rem;
            }
            .li1{
                background: #f4583e;
                margin-right: .5rem;
                margin-left: 0;
                background: url(../../../static/images/myPublish/btnBg.png);
                background-repeat: no-repeat;
                background-size: 1.5rem .58rem;
            }
        }
    }
}
/*商铺求租*/
.shopWantedWrap{
    width: 7.5rem;
    margin-top: 2rem;
    padding-bottom: 1.2rem;
    .shopWantedBox{
        width: 6.7rem;
        height: 3.8rem;
        margin: .2rem .2rem 0 .2rem;
        background: rgba(255,255,255,1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: .2rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        h4{
            color: #999;
            font-size: .26rem;
            text-align: right;
        }
        ul{
            li{
                color: #000;
                font-size: .3rem;
                .span1{
                    color: #898989;
                }
            }
        }
        dl{
            width: 6.7rem;
            margin-top: .1rem;
            border-top: 1px solid #eaeaea;
            span{
                display: inline-block;
                width: 1.5rem;
                background: #64abff;
                line-height: .58rem;
                text-align: center;
                font-size: .3rem;
                color: #fff;
                border-radius: 6px;
                margin-top: .2rem;
            }
            dt{
                float: left;
                span{
                    margin-right: 1.5rem;
                    background: #f4583e;
                    background: url(../../../static/images/myPublish/btnBg.png);
                    background-repeat: no-repeat;
                    background-size: 1.5rem .58rem;
                }
            }
            dd{
                float: left;
                span{
                    margin-left: .3rem;
                    float: left;
                }

            }
        }

    }
}


/*无数据*/
.noData{
    width: 7.5rem;
    dl{
        width: 7.5rem;
        text-align: center;
        dt{
            margin-top: 2.6rem;
            margin-bottom: .3rem;
            img{
                width: 2rem;
                height: 1.3rem;
            }
        }
        p{
            font-size: .3rem;
            color: #898989;
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
/*商铺求租无数据*/
.noData1{
    width: 7.5rem;
    dl{
        width: 7.5rem;
        text-align: center;
        dt{
            margin-top: 2.6rem;
            margin-bottom: .3rem;
            img{
                width: 2rem;
                height: 1.3rem;
            }
        }
        p{
            font-size: .3rem;
            color: #898989;
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

/*编辑与下架 弹窗*/
.popupWrap{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100000000000;
    .popupWrapBox{
        width: 5.64rem;
        height: 2.6rem;
        background: #fff;
        border-radius:10px;
        position: absolute;
        left: 50%;
        top: 3.84rem;
        margin-left: -2.82rem;
        padding-top: .5rem;
        overflow: hidden;
        h4{
            font-size: .32rem;
            color: #333;
            text-align: center;
        }
        p{
            color: #64abff;
            font-size: .32rem;
            text-align: center;
            margin-top: .08rem;
        }
        span{
            width: 50%;
            background: #eaeaea;
            display: inline-block;
            text-align: center;
            color: #898989;
            line-height: .88rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        .span1{
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .span2{
            position: absolute;
            bottom: 0;
            right: 0;
            background: #64abff;
            color: #fff;
        }
    }
    .popupWrapBox1{
        height: 2.3rem;
        h3{
            color: #333;
            font-size: .38rem;
            text-align: center;
            margin-bottom: .16rem;
            font-weight: 600;
        }
    }
    /* 失败原因 */
    .failureBox{
        width: 5.2rem;
        height: 2.5rem;
        background: #fff;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        top: 40%;
        margin-left: -2.6rem;
        text-align: center;
        img{
            width: .3rem;
            height: .3rem;
            position: absolute;
            top: .2rem;
            right: .2rem;
        }
        h5{
            color: #333;
            font-size: .38rem;
            margin-top: .8rem;
            margin-bottom: .2rem;
        }
        h6{
            color: #444;
            font-size: .32rem;
        }
    }
}

/*点击立即发布*/
.goPublish{
    width: 7.5rem;
    height: 1rem;
    background: #74aaf8;
    line-height: 1rem;
    text-align: center;
    font-size: .32rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.noInner{
    text-align: center;
    line-height: 1rem;
}
</style>
