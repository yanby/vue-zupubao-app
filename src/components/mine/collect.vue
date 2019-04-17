<template>
<div class="shopCollect">
    <h2><span @click="back()"></span>
        <b>我的收藏</b>
        <i v-show="yes===1" @click="compile()">编辑</i>
        <i v-show="yes===2" @click="complete()">完成</i>
    </h2>
    <!--<shopList :child-msg="yes"></shopList>-->
    <div class="detail">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <ul>
                <li v-for="(item,index) in shopMsg" @click="go(item)">
                    <div class="wrap">
                        <div class="select" v-if="yes===2">
                            <div class="check" @click.stop="xuan($event,item.shopCollId)"></div>
                        </div>
                        <div class="img">
                            <div v-if="item.onlineStatus==0" class="xiajia">已下架</div>
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
            <div class="noData" v-if="more">没有更多数据了...</div>
        </mt-loadmore>
    </div>

    <div class="noOrder" v-show="yes===0">
        <dl>
            <dt>
                <img src="../../../static/images/mine/noOrders.png">
            </dt>
            <p>暂无收藏信息</p>
            <dd>
                <router-link to="/lookShop">
                    <span>立即收藏</span>
                </router-link>
            </dd>
        </dl>
    </div>
    <div class="delete" @click="remove()" v-show="yes===2">删除</div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
  data(){
    return {
        yes: "",
        select: 0,
        shopMsg: "",
        ids: "",
        arr: [],
        defaultImg: 'this.src="' + require('../../../static/images/lookShop/err.png') + '"',
        pageSize: 6, // 每次请求的数量
        brandIndex: 1, // 页码 
        allLoaded: false,
        more: false,
    }
  },
  mounted(){
    this.init()
  },
  components:{

  },
  methods:{
    // 页面初始化
    init(){
        let USERS = window.localStorage.getItem("iphone");
        var data = {
            pageSize: this.pageSize,  //每页数据量
            pageNum: 1  //页码从1开始
        }
        this.$http.post(this.changeData() + "/member/auth/selectCollectionList",qs.stringify(data)).then(function(res){
            // console.log(res);
            if(res.data.code=="101"){
                this.shopMsg = res.data.shopCollections;
                if(this.shopMsg.length==0){
                    this.yes = 0;
                }else{
                    this.yes = 1;
                }
            }else{
                this.yes = 0;
            }
        }.bind(this)).catch(function(err){
            console.log("收藏页面错误：",err)
        })
    },

    //上拉加载
    loadBottom() {
        let _this = this;
        this.brandIndex++;
        this.allLoaded = false;
        let url = this.changeData() + '/member/auth/selectCollectionList';
        var data = {
            pageSize: this.pageSize, // 每页数据量【必传】
            pageNum: this.brandIndex // 页码从1开始【必传】       
        }                             
        setTimeout(function () {
            axios(url,{
                method: 'post',
                params: data
            }).then(data => {
                _this.shopMsg = _this.shopMsg.concat(data.data.shopCollections);
                if(data.data.shopCollections <= 0){
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
        let url = this.changeData() + '/member/auth/selectCollectionList';
        var data = {
            pageSize: this.pageSize,   // 每页数据量【必传】
            pageNum: '1',     // 页码从1开始【必传】              
        }
        setTimeout(function () {
            axios(url,{
                method: 'post',
                params: data
            }).then(data => {
                this.shopMsg = data.data.shopCollections;
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

    go(item){
        if(item.onlineStatus != 0){
          this.$router.push({path: "/shopDetail",query:{shopId:item.id,collect:1}})
        }else{
          layer.open({
            content: '该商铺已下架~',
            skin: 'msg',
            time: 2 //2秒后自动关闭
          });
        }
    },
    back(){
        this.$router.push({path: "/mine"})
    },
    // 点击编辑
    compile(){
        this.yes = 2;
        this.select = 1;
        this.tab = 1;
        $(".price").css({"right":".5rem"})
    },
    // 点击完成
    complete(){
        this.yes = 1;
        this.select = 0;
        this.tab = 0;
        this.arr = [];
        $(".price").css({"right":"0rem"});
    },
    // 选中
    xuan(e,id){
        if($(e.srcElement).hasClass("cur")){
            $(e.srcElement).removeClass("cur")
            var obj = this.arr.indexOf(id);
            this.arr.splice(obj, 1);
        }else{
            this.tab = 3;
            $(e.srcElement).addClass("cur")
            this.arr.push(id);
            this.ids = this.arr.join(",");            
        }
    },
    // 点击删除
    remove(){
        var that = this;
        var data = {
            shopId: this.ids,
        }
        // let USERS = window.localStorage.getItem("iphone");
        // var data2 = {
        //     userId: USERS,
        //     token: localStorage.token
        // }
        this.$http.post(this.changeData() + "/member/auth/deleteCollection",qs.stringify(data)).then(function(res){
            // console.log(res)
            if(res.data.code == 101){
                layer.open({
                    content: '删除成功！',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                this.init();
            }
        }.bind(this)).catch(function(err){
            console.log("收藏页面错误：",err)
        })
    }
   
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/shopList.scss";
  .detail{
    padding-top: .91rem;
    padding-bottom: 0;
    ul{
      li{
        .img{
          position: relative;
          .xiajia{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 100;
            padding: 0rem .1rem;
            background: #f00;
            text-align: center;
            font-size: .24rem;
            color: #fff;
          }
        }
      }
    }
  }
  .shopCollect{
    width: 7.5rem;
    margin: 0 auto;
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
      span{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .3rem;
        width: .34rem;
        height: .34rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .34rem .34rem;
      }
      b{
        font-size: .34rem;
      }
      i{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        right: .2rem;
        top: 0;
        font-size: .3rem;
      }
    }
    .delete{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin: 0 auto;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #64AAFF;
      color: #fff;
      font-size: .34rem;
    }
  }

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
.noData{
    text-align: center;
    line-height: .8rem;
    margin-bottom: 1rem;
    font-size: .3rem;
}
</style>
