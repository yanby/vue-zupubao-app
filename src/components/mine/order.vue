<template>
    <div class="order">

        <div class="yesOrder">
            <div class="orderTop">
              <div class="clearfix">
                <i>
                  <router-link to='/mine'>
                    <img src="../../../static/images/mine/back.png">
                  </router-link>
                </i>
                <h3>我的订单</h3>
              </div>

              <div class="orderNav">
                  <ul class="clearfix">
                      <li class="li1" :class="{'on':tab===0}" @click="allFun()">全部<span></span></li>
                      <li class="li2" :class="{'on':tab===1}" @click="noFun()">待支付<span></span></li>
                      <li class="li3" :class="{'on':tab===2}" @click="yesFun()">已支付<span></span></li>
                  </ul>
              </div>
            </div>

            <!-- 全部 -->
            <div class="whole">
                <div class="orderMain" v-for="item in msg">
                    <ul>
                        <li class="li1" v-if="item.orderType==='优铺会员'">优铺会员</li>
                        <li class="li1" v-else>VIP服务</li>
                        <li class="li2">
                            <div v-if="item.status==='待支付'">
                                <router-link :to='{path:"/payment",query:{order:item.orderNo,price:item.fee}}'>
                                去支付
                                </router-link>
                            </div>
                            <div class="yishixiao" v-if="item.status==='已支付'">已支付</div>
                            <div class="yishixiao" v-if="item.status==='已失效'">已失效</div>
                        </li>
                    </ul>
                    <dl class="orderMainDl clearfix" v-if="order===1">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p class="p1">购买产品：<span>{{item.productName}}</span></p>
                            <p>消费金额：<span>{{item.fee}}元</span></p>
                            <p>创建时间：<span>{{item.createTime}}</span></p>
                            <p v-if="item.feeTime">付款时间：<span>{{item.feeTime}}</span></p>
                            <p>订单编号：<span>{{item.orderNo}}</span></p>
                        </dd>
                    </dl>

                </div>
            </div>

            <!-- 暂无订单 -->
            <div class="noOrder" v-if="order===0">
              <dl>
                <dt>
                  <img src="../../../static/images/mine/noOrders.png">
                </dt>
                <p>暂无订单信息</p>
                <dd>
                  <router-link to="/buymember">
                    <span>立即升级会员</span>
                  </router-link>
                </dd>
              </dl>
            </div>
        </div>


    </div>
</template>


<script>
export default {
    name: 'order',
    data () {
        return {
            tab: 0,
            msg: "",//订单详情
            order: "",//有没有订单
        }
    },
    computed:{

    },
    methods:{
      init(data){
        var that = this;
        this.$http(this.changeData() + "/order/getMyOrders",{
          method: 'post',
          params: data
        }).then(res => {
          console.log(res)
          try{
            this.msg = res.data.data;
            if(this.msg.length == 0){
              this.order = 0;
            }else{
              this.order = 1;
            }
            this.msg.forEach(function (item,index) {
              item.createTime = getMyDate(item.createTime);
              if(item.feeTime != ""){
                item.feeTime = getMyDate(item.feeTime);
              }
            })
          }catch(e){
            console.log(e)
          }

        }).catch(err => {
          console.log(err)
        });
      },
      allFun(){
        this.tab=0;
        var data = {
          account: localStorage.iphone,
          status: "",
          token: localStorage.token
        }
        this.init(data);
      },
      noFun(){
        this.tab=1;
        var data = {
          account: localStorage.iphone,
          status: 0,
          token: localStorage.token
        }
        this.init(data);
      },
      yesFun(){
        this.tab=2;
        var data = {
          account: localStorage.iphone,
          status: 1,
          token: localStorage.token
        }
        this.init(data);
      }
    },
    mounted() {
      var that = this;
      this.allFun();
    }


}
</script>
<style scoped lang="scss"  type="text/scss">

body{
    width: 7.5rem;
    background: #f7f8fa;
}
.order{
    width: 7.5rem;
    background: #f7f8fa;
}
.orderTop{
  position: fixed;
  top: 0;
    height: 2rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
}
.orderTop h3{
    width: 75%;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #333;
    float: left;
    text-align: center;
}
.orderTop i{

    display: inline-block;
    width: 13%;
    height: 1rem;
    line-height: 1rem;
    float: left;
}
.noOrderTop i a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.orderTop i>a>img{
    width: 0.4rem;
    height: 0.4rem;
}

.orderNav{
  width: 7.5rem;
    height: 1rem;
}
.orderNav li{
    height: 1rem;
    float: left;
    color: #555;
    text-align: center;
    position: relative;
    font-size: .28rem;
    span{
        display: none;
        width: .62rem;
        height: .04rem;
        background: #49ACFF;
        position: absolute;
        left: 50%;
        margin-left:-.31rem;
        bottom: 0;
    }
    &.on{
        color: #64abff;
        span{
            display: block;
        }
    }
}
.orderNav .li1{
    width: 2.5rem;
    line-height: 1rem;
}
.orderNav .li2{
  width: 2.5rem;
    line-height: 1rem;
}

.orderNav .li3{
  width: 2.5rem;
    line-height: 1rem;
}
.whole{
  margin-top: 2.3rem;
}
.orderMain{
    width: 94%;
    margin-top: 0.3rem;
    margin-left: 3%;
    border-radius: 0.1rem;
    background: #fff;
}
.orderMain ul{
    height: 0.96rem;
    border-bottom: 0.02rem solid #fafafa;
}
.orderMain ul>li{
    float: left;
}
.orderMain .li1{
    color: #333;
    font-size: 0.36rem;
    margin-left: 0.2rem;
    line-height: 0.96rem;
}
.orderMain .li2{
    float: right;
}
.orderMain .li2>div{
    width: 1.4rem;
    height: 0.5rem;
    font-size: 0.28rem;
    border: 1px solid #64aaff;
    color: #64aaff;
    text-align: center;
    line-height: 0.52rem;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    border-radius: 5px;
    a{
        color: #64aaff;
    }
}
.orderMain .li2>div.yishixiao{
  border: none!important;
  color: #ccc;
}
.orderMain .li2>h4{
    line-height: 0.98rem;
    margin-right: 0.2rem;
    color: #ccc;
}
.orderMainDl{
    /*height: 2.2rem;*/
  padding-bottom: .3rem;
}
.orderMainDl dt{
    width: 1.2rem;
    /*height: 2.2rem;*/
    margin-top: 0.3rem;
    margin-left: 0.2rem;

    float: left;
}
.orderMainDl dt>img{
    width: 1rem;
    height: 1rem;
    float: left;
}
.orderMainDl dd{
    font-size: 0.28rem;
    color: #666;
    float: left;
}
.orderMainDl p{
    line-height: 0.5rem;
}
.orderMainDl .p1{
    margin-top: 0.1rem;
}

.noOrder{
    width: 7.5rem;
    .noOrderTop{
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



</style>













