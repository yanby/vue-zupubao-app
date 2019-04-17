<template>
<div class="wanted">
    <h2 @click="back()"><span></span>求租信息</h2>
    <div class="wrap" v-if="tab=1">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <div class="list" v-for="item in collection" @click="goFun(item)">
                <h3><span>{{item.time}}</span></h3>
                <div class="msg">
                    <h4>{{item.title}}</h4>
                    <p>期望区域：{{item.businessArea}}</p>
                    <p>租金预算：{{item.rent}}</p>
                    <p>求租面积：<span>{{item.areas}}</span></p>
                </div>
            </div>
            <div class="noInner" v-if="more">暂无更多内容喽！</div>
        </mt-loadmore>
      <!--<div class="fabu" @click="fabuFun()">发布</div>-->
    </div>
    <div class="wrap" v-else>
        <div class="noOrder">
            <dl>
                <dt>
                    <img src="../../../static/images/mine/noOrders.png">
                </dt>
                <p>暂无求租信息</p>
            </dl>
         </div>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
  export default {
    data(){
        return{
          allLoaded: false,
          pageNumber: 1,
          collection: [],
          tab: "1",

          pageSize: 3, // 每次请求的数量
          brandIndex: 1, // 页码 
          allLoaded: false,
          more: false,
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        back(){
            this.$router.push({path:"/home"});
        },
        init(){
            this.$http(this.changeData() + '/shop/selectSolicit',{
                method: 'post',
                params: {
                    pageSize: this.pageSize, //每页数据量
                    pageNum: "1", //页码从1开始
                    cityId: sessionStorage.cityId //市 id
                }
            }).then(data => {
                // console.log(data);
                this.collection = data.data.shopList;
                if(this.collection == []){
                    this.tab = "2";
                }else{
                    this.tab = "1";
                }
            }).catch(err => {
                console.log(err)
            });
        },

        //上拉加载
        loadBottom() {
            let _this = this;
            this.brandIndex++;
            this.allLoaded = false;
            let url = this.changeData() + '/shop/selectSolicit' 
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
                    _this.collection = _this.collection.concat(data.data.shopList);
                    if(data.data.shopList <= 0){
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
            let url = this.changeData() + '/shop/selectSolicit'
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
                    this.collection = data.data.shopList;
                    _this.$refs.loadmore.onTopLoaded();
                    _this.allLoaded = false;
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
        
        // 跳转求租详情
        goFun(item){
            this.$router.push({path:"/wantedDetail",query:{id:item.id}})
        },
        fabuFun(){
            this.$router.push({path:"/publish"})
        }
        
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .wanted{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: 1rem;
    h2{
      width: 7.5rem;
      background: #fff;
      font-size: .34rem;
      text-align: center;
      position: relative;
      height: .9rem;
      line-height: .9rem;
      font-weight: bold;
      position: fixed;
      left: auto;
      top: 0;
      z-index: 99999;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      span{
        width: .34rem;
        height: .34rem;
        position: absolute;
        left: .2rem;
        top: .3rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
    }
    .wrap{
      padding-top: .9rem;
      .noOrder{
        width: 7.5rem;
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
          /*height: 6rem;*/
          /*background: pink;*/
          text-align: center;
          dt{
            /*width: 3rem;
            height: 3rem;*/
            /*background: red;*/
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
    .list{
      padding: 0 .2rem;
      h3{
        text-align: center;
        padding: .4rem 0 .26rem;
        span{
          display: inline-block;
          padding: 0 .1rem;
          background: #D5D5D5;
          color: #fff;
          font-size: .24rem;
        }
      }
      .msg{
        padding: .3rem;
        width: 7.08rem;
        height: 2.67rem;
        background: #fff;
        h4{
          font-size: .34rem;
          font-weight: bold;
          margin-bottom: .26rem;
        }
        p{
          margin-bottom: .2rem;
          font-size: .28rem;
          color: #666;
          span{
            color: #E8584F;
          }
        }
      }
    }
    .noInner{
      text-align: center;
      font-size: .3rem;
      padding-top: .2rem;
    }
    .fabu{
      width: 7.5rem;
      height: 1rem;
      background: #64ABFF;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      font-size: .34rem;
      cursor: pointer;
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }
  
</style>
