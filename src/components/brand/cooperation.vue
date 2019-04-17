<template>
<div class="cooperation">
    <h2><span @click="back()"></span>合作品牌</h2>
    <div class="content" ref="wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <ul>
                <li class="clearfix" v-for="item in brandList">
                    <div class="img"><img :src="item.img" alt=""></div>
                    <div class="txt">
                        <p>品牌名称：{{item.brandName}}</p>
                        <p>拓展区域：{{item.region}}</p>
                        <p>需求面积：{{item.area}}</p>
                        <p>品牌业态：{{item.brandType}}</p>
                    </div>
                </li>
            </ul>
            <div class="noData" v-if="more">没有更多数据了...</div>
        </mt-loadmore>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: "",
    data(){
        return{
            brandList:"",
            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码 
            allLoaded: false,
            more: false,
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        back(){
            this.$router.push({path:"/home"})
        },

        init(){
            let _this = this;
            let url = this.changeData() + '/show/getBrandList'
            axios(url,{
                method: 'post',
                params: {
                    pageSize: this.pageSize, // 每页的数量
                    pageNum: "1", // 页码从1开始
                    cityId: sessionStorage.cityId // 市id
                }
            }).then(data => {
                // console.log(data);
                this.brandList = data.data.brandList;
            }).catch(err => {
                console.log(err)
            });
        },

        //上拉加载
        loadBottom() {
            let _this = this;
            this.brandIndex++;
            this.allLoaded = false;
            let url = this.changeData() + '/show/getBrandList' 
            var data = {
                cityId: sessionStorage.cityId, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex,     // 页码从1开始【必传】       
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.brandList = _this.brandList.concat(data.data.brandList);
                    if(data.data.brandList <= 0){
                      _this.allLoaded = true;
                    }
                    _this.$refs.loadmore.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },

        //下拉刷新
        loadTop(){ 
            var _this = this;
            let url = this.changeData() + '/show/getBrandList'
            var data = {
                cityId: sessionStorage.cityId, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: '1',     // 页码从1开始【必传】              
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    this.brandList = data.data.brandList;
                    _this.$refs.loadmore.onTopLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },

        handleBottomChange(){
            var that = this;
            if(this.allLoaded == true){
                this.more = true;
                setTimeout(function () {
                    that.more = false;
                },1000)
            }
        },
        
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.cooperation{
    width: 7.5rem;
    margin: 0 auto;
    background: #f7f8fa;
    h2{
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        font-size: .34rem;
        text-align: center;
        color: #333;
        font-weight: bold;
        position: fixed;
        top: 0;
        background: #fff;
        span{
            width: .34rem;
            height: .34rem;
            position: absolute;
            left: .2rem;
            top: .3rem;
            background: url("../../../static/images/mine/back.png") no-repeat;
            -webkit-background-size: .34rem .34rem;
            background-size: .34rem .34rem;
        }
    }
    .content{
        padding-bottom: .2rem;
        margin-top: 1.1rem;
        ul{
            li{
                width: 6.9rem;
                margin: 0 auto .2rem;
                padding: .1rem;
                background: #fff;
                .img{
                    width: 2.55rem;
                    height: 1.94rem;
                    float: left;
                    margin: .2rem .1rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .txt{
                    float: left;
                    margin: .2rem 0 .2rem .2rem;
                    p{
                        font-size: .28rem;
                        color: #666;
                        width: 3.5rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .noData{
            text-align: center;
            line-height: .8rem;
            font-size: .3rem;
        }
    }
}
</style>
