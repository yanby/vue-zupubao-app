<template>
    <div class="noMessageWrap" v-if="this.listArr == ''">
        <div class="noMessageTop">
            <!-- <i>
                <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                </router-link>
            </i> -->
            <h3>我的消息</h3>
        </div>
        <dl>
            <dt>
                <img src="../../../static/images/mine/noOrders.png">
            </dt>
            <p>暂无消息</p>
        </dl>
    </div>
    <div class="messageWrap" v-else>
        <div class="message-top">
            <i>
                <!-- <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                </router-link> -->
            </i>
            <h3>我的消息</h3>
            <p @click="allIsread()">全部已读</p>
        </div>
        <div class="marginTop-box"></div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <div class="message-box" v-for="(item,index) in listArr" @click="isRead(item)">
                <div class="message-time"><span>{{item.createTime}}</span></div>
                <dl>
                    <dt>
                        <span v-if="item.status == 0">
                            <img src="../../../static/images/mine/red-ellipse.png">
                        </span>
                        <span v-else></span>
                        <h3 v-if="item.status == 0">{{item.title}}</h3>
                        <h3 style="color:#898989;" v-else>{{item.title}}</h3>
                    </dt>
                    <dd>{{item.content}}</dd>
                    <div v-if="item.createtype == 1 || item.createtype == 2" class="moreBtn">
                        <p>更多<img src="../../../static/images/mine/more.png"></p>
                    </div>
                </dl>
            </div>
            <div class="noData" v-if="more">没有更多数据了...</div>
        </mt-loadmore>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
import Bus from '../../../static/js/bus.js'
  export default {
      data(){
          return{
            listArr: [],
            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码 
            allLoaded: false,
            more: false,
          }
      },
      mounted() {

      },
      methods: {
        // 列表渲染
        dataList(){
            let _this = this;
            let url = _this.changeData() + '/member/auth/selectMsgList';
            axios(url,{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId, //string  是   市id
                    pageSize: this.pageSize,    //string  是   每页数据量
                    pageNum: 1  //string  是   页码从1开始
                },
            }).then(data => {
                // console.log(data);
                this.listArr = data.data.data;
            }).catch(err => {
                console.log(err)
            });
        },

        //上拉加载
        loadBottom() {
            let _this = this;
            this.brandIndex++;
            this.allLoaded = false;
            let url = this.changeData() + '/member/auth/selectMsgList';
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
                    _this.listArr = _this.listArr.concat(data.data.data);
                    if(data.data.data <= 0){
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
            let url = this.changeData() + '/member/auth/selectMsgList';
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
                    this.listArr = data.data.data;
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

        // 已阅
        isRead(item){
            let _this = this;
            if(item.createtype == "1"){
                // 跳转商铺详情
                // alert("跳转商铺详情");

                let url = _this.changeData() + '/member/auth/updateMsgStatus';
                axios(url,{
                    method: 'post',
                    params: {
                        cityId: sessionStorage.cityId,  //string  是   市id
                        id: item.id //string  是   消息id 如果全部已读 id 传固定值 0
                    },
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == 101){
                        this.$router.push({path:"/shopDetail",query:{shopId: item.shopid,msg: "1"}})
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });

                // this.$router.push({path:"/shopDetail",query:{shopId: item.shopid,msg: "1"}})
                // http://192.168.1.218:8088/shopDetail?shopId=86323&msg=1
            }else if(item.createtype == "2"){
                // 跳转资讯详情
                // alert("跳转资讯详情");

                let url = _this.changeData() + '/member/auth/updateMsgStatus';
                axios(url,{
                    method: 'post',
                    params: {
                        cityId: sessionStorage.cityId,  //string  是   市id
                        id: item.id //string  是   消息id 如果全部已读 id 传固定值 0
                    },
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == 101){
                        this.$router.push({path: '/consult', query:{id: item.id,msg: "1"}});
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2
                        });
                    }
                    // this.$router.push({path: '/consult', query:{id: item.id,msg: "1"}});

                }).catch(err => {
                    console.log(err)
                });

                // this.$router.push({path: '/consult', query:{id: item.id,msg: "1"}});
            }else{
                let url = _this.changeData() + '/member/auth/updateMsgStatus';
                axios(url,{
                    method: 'post',
                    params: {
                        cityId: sessionStorage.cityId,  //string  是   市id
                        id: item.id //string  是   消息id 如果全部已读 id 传固定值 0
                    },
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == 101){
                        _this.dataList();
                    }else{
                        layer.open({
                            content: '系统繁忙，请稍后再试',
                            skin: 'msg',
                            time: 2
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        // 全部已阅
        allIsread(){           
            let _this = this;
            let url = this.changeData() + '/member/auth/updateMsgStatus';
            axios(url,{
                method: 'post',
                params: {
                    id: "0", // 传0表示全部已读
                    cityId: sessionStorage.cityId,  //string  是   市id
                },
            }).then(data => {
                // // console.log(data);
                // if(data.data.status == "ok"){
                //     _this.dataList();
                //     Bus.$emit('msg', '传值');
                // }
                // console.log(data);
                if(data.data.code == 101){
                    _this.dataList();
                    // 给底部tab传值
                    Bus.$emit('msg', '传值');
                }else{
                    layer.open({
                        content: '系统繁忙，请稍后再试',
                        skin: 'msg',
                        time: 2
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        },

      },
      created() {
        // 列表渲染调用
        this.dataList();


      }
  }
</script>

<style lang="scss" type="text/scss" scoped>
.messageWrap{
    padding-bottom: 1.5rem;
}
.message-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 1000000;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    h3{
        width: 70%;
        line-height: 1rem;
        font-size: 0.36rem;
        color: #333;
        float: left;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
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
    p{
        font-size: .26rem;
        color: #111;
        line-height: 1rem;
        margin-right: .16rem;
    }
}
.marginTop-box{
    width: 100%;
    height: 1rem;
}
.message-box{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    /*padding-bottom: 1.2rem;*/
    .message-time{
        width: 1.6rem;
        text-align: center;
        background: #D5D5D5;
        margin: auto;
        margin-top: .4rem;
        margin-bottom: .2rem;
        border-radius: .1rem;
        span{
            font-size: .24rem;
            color: #fff;
            line-height: .4rem;
        }
    }
    dl{
        width: 6.7rem;
        background: #FFF;
        margin-left: .2rem;
        border-radius: .06rem;
        padding: .2rem;
        position: relative;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        dt{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            span{
                float: left;
                width: .2rem;
                height: .2rem;
                img{
                    width: .14rem;
                    height: .14rem;
                    display: inline-block;
                }
            }
            h3{
                color: #333;
                font-size: .32rem;
                margin-top: .1rem;
                margin-bottom: .18rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
        dd{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
           width: 5.1rem;
           color: #898989;
           font-size: .28rem;
           margin-left: .2rem;
           text-align: justify;
        }
        .moreBtn{
            width: 100%;
            height: .4rem;
            position: relative;
            p{
                position: absolute;
                right: .2rem;
                background: 0;
                font-size: .24rem;
                color: #aaa;
                img{
                    width: .11rem;
                    height: .19rem;
                    margin-left: .1rem;
                    position: relative;
                    top: -.03rem;
                }
            }
        }
    }
}
.noMessageWrap{
    width: 7.5rem;
    .noMessageTop{
        height: 1rem;
        text-align: center;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        position: relative;
        h3{
            width: 100%;
            line-height: 1rem;
            font-size: 0.36rem;
            color: #333;
            float: left;
            text-align: center;
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
    font-size: .3rem;
}
</style>
