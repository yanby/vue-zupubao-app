<template>
<div class="goodmember">
    <h2><span @click="back()"></span>我的会员</h2>

    <div class="noMessageWrap" v-if="this.list == ''">
        <div class="noMessageTop">
            <!-- <i>
                <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                </router-link>
            </i> -->
            <h3>暂无会员</h3>
        </div>
        <dl>
            <dt>
                <img src="../../../static/images/mine/noOrders.png">
            </dt>
            <p>暂无消息</p>
        </dl>
    </div>

    <div class="wrap" v-else>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
            <div class="content" v-for="item in list">
                <div class="huiyuan" v-if="item.memberType === '0'">
                    <div class="title"><span></span><b>今日特权</b></div>
                    <div class="huiyuan-msg">
                        <div class="msg-txt">
                            <!-- <h4>{{item.title}}</h4> -->
                            <h4>找铺会员</h4>
                            <p><span>到期时间：{{item.endTime}}</span><router-link to="/buymember">会员延期</router-link></p>
                        </div>
                        <div class="msg-tao">
                            <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)</div>
                        </div>
                    </div>
                    <div class="huiyuan-txt"></div>
                </div>

                <div class="zhuanpu" v-if="item.memberType === '2'">
                    <div class="title"><span></span><b>今日特权</b></div>
                    <div class="zhuanpu-msg">
                        <div class="msg-txt">
                            <h4>{{item.title}}</h4>
                            <p><span>到期时间：{{item.endTime}}</span><router-link :to="{name:'buymember',query:{news:'2'}}">VIP延期</router-link></p>
                        </div>
                        <div class="msg-tao">
                            <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)</div>
                        </div>
                    </div>
                    <div class="zhuanpu-txt"></div>
                </div>

                <div class="xuanzhi" v-if="item.memberType === '1'">
                    <div class="title"><span></span><b>今日特权</b></div>
                    <div class="xuanzhi-msg">
                        <div class="msg-txt">
                            <h4>{{item.title}}</h4>
                            <p><span>到期时间：{{item.endTime}}</span><router-link :to="{name:'buymember',query:{news:'1'}}">VIP延期</router-link></p>
                        </div>
                        <div class="msg-tao">
                            <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)</div>
                        </div>
                    </div>
                    <div class="xuanzhi-txt"></div>
                </div>

                <div class="zhuanpuhuiyuan" v-if="item.memberType === '4'">
                    <div class="title"><span></span><b>今日特权</b></div>
                    <div class="zhuanpuhuiyuan-msg">
                        <div class="msg-txt">
                            <h4>转铺会员</h4>
                            <p>
                                <span>到期时间：{{item.endTime}}</span>
                                <router-link :to="{name:'buymember',query:{news:''}}">会员延期</router-link>
                            </p>
                        </div>
                        <div class="msg-tao">
                            <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)</div>
                        </div>
                    </div>
                    <div class="zhuanpuhuiyuan-txt"></div>
                </div>
            </div>
            <div class="noData" v-if="more">没有更多数据了...</p></div>
        </mt-loadmore>
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
            list: [],
            huiyuan: "",
            vip: "",
            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码 
            allLoaded: false,
            more: false
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        back(){
            this.$router.push({path:"/mine"})
        },
        init(){
            var that = this;
            var data = {
                pageSize: this.pageSize, //string  是   每页数据量
                pageNum: "1"  //string  是   页码从1开始
            }
            this.$http(this.changeData() + "/member/auth/getMyMember",{
                method: 'post',
                params: data
            }).then(res => {
                // console.log(res)
                this.list = res.data.data;  


                // if(res.data.data == []){
                //     alert(1);
                // }else{
                //     alert(2);
                // }



                try{
                    that.list.forEach(function (item,index) {
                        item.createTime = getNewDate(item.createTime);
                        item.endTime = getNewDate(item.endTime);
                    })
                }catch(e){
                    console.log(e)
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
            let url = this.changeData() + '/member/auth/getMyMember';
            var data = {
                pageSize: this.pageSize,  // 每页数据量【必传】
                pageNum: this.brandIndex  // 页码从1开始【必传】       
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.list = _this.list.concat(data.data.data);
                    if(data.data.data <= 0){
                        _this.allLoaded = true;
                    }
                    _this.$refs.loadmore.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000);
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
.goodmember{
    background: #fff;
    padding-bottom: .4rem;
    h2{
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: bold;
        border-bottom: 0.01rem solid #eaeaea;
        position: fixed;
        top: 0;
        background: #fff;
        z-index: 1000;
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
    }
    .wrap{
        margin-top: .9rem;
        .content{
            .title{
                padding: .3rem 0 .4rem;
                span{
                    display: inline-block;
                    vertical-align: middle;
                    width: .4rem;
                    height: .37rem;
                    margin: 0 .1rem 0 .18rem;
                    background: url("../../../static/images/member/tequan.png") no-repeat;
                    -webkit-background-size: .4rem .37rem;
                    background-size: .4rem .37rem;
                }
                b{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: .34rem;
                    font-weight: bold;
                }
            }
            .huiyuan-msg,.zhuanpu-msg,.xuanzhi-msg,.zhuanpuhuiyuan-msg{
                width: 7.5rem;
                height: 2.63rem;
                background: url("../../../static/images/member/huiyuan.png") no-repeat;
                -webkit-background-size: 7.5rem 2.63rem;
                background-size: 7.5rem 2.63rem;
                position: relative;
                &.zhuanpu-msg{
                    background: url("../../../static/images/member/zhuanpu.png") no-repeat;
                    -webkit-background-size: 7.5rem 2.63rem;
                    background-size: 7.5rem 2.63rem;
                }
                &.xuanzhi-msg{
                    background: url("../../../static/images/member/xuanzhi.png") no-repeat;
                    -webkit-background-size: 7.5rem 2.63rem;
                    background-size: 7.5rem 2.63rem;
                }
                &.zhuanpuhuiyuan-msg{
                    background: url("../../../static/images/member/zhuanpuhuiyuan.png") no-repeat;
                    -webkit-background-size: 7.5rem 2.63rem;
                    background-size: 7.5rem 2.63rem;
                }
                .msg-txt{
                    margin-left: 2.17rem;
                    padding-top: .5rem;
                    h4{
                        font-size: .3rem;
                        color: #fff;
                    }
                    p{
                        font-size: .24rem;
                        color: #fff;
                        a{
                            display: inline-block;
                            width: 1.4rem;
                            height: .48rem;
                            line-height: .48rem;
                            background:rgba(255,255,255,1);
                            border-radius:.5rem;
                            text-align: center;
                            font-size: .28rem;
                            color: #F8D34C;
                            margin-left: .1rem;
                        }
                    }
                }
                .msg-tao{
                    width: 6.22rem;
                    position: absolute;
                    bottom: .1rem;
                    left: .64rem;
                    background: rgba(0,0,0,.3);
                    font-size: .28rem;
                    color: #fff;
                    div{
                        text-indent: .4rem;
                        span{
                            color: #E8584F;
                        }
                    }
                }
            }
            /* 转铺会员 */
            .huiyuan-txt,.zhuanpu-txt,.xuanzhi-txt,.zhuanpuhuiyuan-txt{
                width: 6.6rem;
                height: 2.27rem;
                margin: .47rem auto;
                background: url("../../../static/images/member/huiyuan-txt.png") no-repeat;
                -webkit-background-size: 6.6rem 2.27rem;
                background-size: 6.6rem 2.27rem;
                &.zhuanpu-txt{
                    background: url("../../../static/images/member/zhuanpu-txt.png") no-repeat;
                    -webkit-background-size: 6.6rem 2.27rem;
                    background-size: 6.6rem 2.27rem;
                }
                &.xuanzhi-txt{
                    background: url("../../../static/images/member/xuanzhi-txt.png") no-repeat;
                    -webkit-background-size: 6.6rem 2.27rem;
                    background-size: 6.6rem 2.27rem;
                }
                &.zhuanpuhuiyuan-txt{
                    background: url("../../../static/images/member/zhuanpuhuiyuan-txt.png") no-repeat;
                    -webkit-background-size: 6.6rem 2.27rem;
                    background-size: 6.6rem 2.27rem;
                }
            }
        }
    }
    .member{
        padding-top: .4rem;
        .vip-msg{
            width: 7.5rem;
            height: 3.49rem;
            margin: 0 auto;
            background: url("../../../static/images/mine/vip-bg.png") no-repeat;
            background-size: 7.5rem 3.49rem;
            div{
                padding-top: 1.5rem;
                font-size: .3rem;
                height: .3rem;
                line-height: .3rem;
                color: #fff;
                text-align: center;
            }
            p{
                padding-top: 1.9rem;
                font-size: .22rem;
                color: #fff;
                text-align: center;
            }
        }
        .vip-tequan{
        h3{
            padding: 0 .2rem;
            height: .9rem;
            line-height: .9rem;
            font-size: .34rem;
            color: #111;
            border-bottom: .01rem solid #eaeaea;
            span{
                display: inline-block;
                width: .4rem;
                height: .37rem;
                background: url("../../../static/images/mine/tequan.png") no-repeat;
                background-size: .4rem .37rem;
                vertical-align: text-bottom;
                margin-right: .2rem;
            }
        }
        .vip-detail{
          padding: .3rem .68rem;
          div{
            font-size: .3rem;
            line-height: .5rem;
            color: #666;
            margin-bottom: .42rem;
            span{
              color: #e8584f;
            }
          }
          p{
            span{
              color: #ccc;
              font-size: .28rem;
              margin-right: .4rem;
            }
            a{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              display: inline-block;
              width: 1.8rem;
              height: .49rem;
              line-height: .53rem;
              font-size: .28rem;
              background: #ffb678;
              text-align: center;
              color: #fff;
              border-radius: .1rem;
            }
          }
        }
      }
      .member-msg{
        width: 7.5rem;
        height: 3.49rem;
        margin: 0 auto;
        background: url("../../../static/images/mine/member-bg.png") no-repeat;
        background-size: 7.5rem 3.49rem;
        div{
          padding-top: 1.5rem;
          font-size: .3rem;
          height: .3rem;
          line-height: .3rem;
          color: #fff;
          text-align: center;
        }
        p{
          padding-top: 1.9rem;
          font-size: .22rem;
          color: #fff;
          text-align: center;
        }
      }
      .member-tequan{
        h3{
          padding: 0 .2rem;
          height: .9rem;
          line-height: .9rem;
          font-size: .34rem;
          color: #111;
          border-bottom: .01rem solid #eaeaea;
          span{
            display: inline-block;
            width: .4rem;
            height: .37rem;
            background: url("../../../static/images/mine/tequan.png") no-repeat;
            background-size: .4rem .37rem;
            vertical-align: text-bottom;
            margin-right: .2rem;
          }
        }
        .member-detail{
          padding: .3rem .68rem;
          div{
            font-size: .3rem;
            height: .3rem;
            line-height: .3rem;
            color: #666;
            margin-bottom: .42rem;
            span{
              color: #e8584f;
            }
          }
          p{
            span{
              color: #ccc;
              font-size: .28rem;
              margin-right: .4rem;
            }
            a{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              display: inline-block;
              width: 1.8rem;
              height: .49rem;
              line-height: .53rem;
              font-size: .28rem;
              background: #ffb678;
              text-align: center;
              color: #fff;
              border-radius: .1rem;
            }
          }
        }
      }
    }
}
.noData{
    text-align: center;
    line-height: 1rem;
    font-size: .3rem;
}
.noMessageWrap{
    width: 7.5rem;
    height: 95vh;
    .noMessageTop{
        height: 1rem;
        text-align: center;
        background: #fff;
        /*border-bottom: 0.02rem solid #eee;*/
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
</style>
