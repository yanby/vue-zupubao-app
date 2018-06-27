<template>
    <div class="noMessageWrap" v-if="this.listArr == ''">
        <div class="noMessageTop">
            <i>
                <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                </router-link>
            </i>
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
                <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                </router-link>
            </i>
            <h3>我的消息</h3>
            <p @click="allIsread()">全部已读</p>
        </div>
        <div class="marginTop-box"></div>
        <div class="message-box" v-for="(item,index) in listArr" @click="isRead(item.id,item.createtype,item.shopid)">
            <div class="message-time"><span>{{item.createTime}}</span></div>
            <dl>
                <dt>
                    <span v-if="item.status == 0" @click="redEllipse()"><img src="../../../static/images/mine/red-ellipse.png"></span>
                    <span v-else></span>
                    <h3 v-if="item.status == 0">{{item.title}}</h3>
                    <h3  style="color:#898989;" v-else>{{item.title}}</h3>
                </dt>
                <dd>{{item.content}}</dd>
                <div v-if="item.createtype == 1 || item.createtype == 2" class="moreBtn">
                    <p>更多<img src="../../../static/images/mine/more.png"></p>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
  export default {
      data(){
          return{
            listArr: []
          }
      },
      mounted() {

      },
      methods: {
        // 列表渲染
        dataList(){
            let _this = this;
            let url = _this.changeData() + '/select/phone';
            axios(url,{
                method: 'post',
                params:
                {
                    phone: localStorage.iphone
                },
            }).then(data => {
                console.log(data);
                this.listArr = data.data.data;

                console.log(this.listArr);
            }).catch(err => {
                console.log(err)
            });
        },
        // 已阅
        isRead(id,type,link){
            let _this = this;
            let url = _this.changeData() + '/select/readMsg';
            axios(url,{
                method: 'post',
                params:
                {
                    id: id,
                    phone: localStorage.iphone
                },
            }).then(data => {
                console.log(data);
                if(data.data.status == "ok"){
                    _this.dataList();
                }
                if(type == "1" ){
                   // window.location.href = 'http://m.youpuchina.com/shopDetail?shopId='+link+"&msg=1";
                   this.$router.push({path:"/shopDetail",query:{shopId: link,msg: 1}})
                } else if(type == "2"){
                   window.location.href = link + "&msg=1";
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 全部已阅
        allIsread(){
            let _this = this;
            let url = _this.changeData() + '/select/readMsg';
            axios(url,{
                method: 'post',
                params:
                {
                    id: "0",
                    phone: localStorage.iphone
                },
            }).then(data => {
                console.log(data);
                if(data.data.status == "ok"){
                    _this.dataList();
                }
            }).catch(err => {
                console.log(err)
            });
        },
      },
      created() {
        // 列表渲染调用
        this.dataList()
      }
  }
</script>

<style lang="scss" type="text/scss" scoped>
.messageWrap{
    padding-bottom: .3rem;
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
</style>
