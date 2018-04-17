<template>
    <div class="order">

        <div style="display: none;">
            <div class="orderTop">
                <i>
                    <router-link to='/mine'>
                        <img src="../../../static/images/mine/back.png">
                    </router-link>
                </i>
                <h3>我的订单</h3>
                <div class="orderNav">
                    <ul>
                        <li class="li1" :class="{'on':tab===0}" @click="tab=0">全部<span></span></li>
                        <li class="li2" :class="{'on':tab===1}" @click="tab=1">待支付<span></span></li>
                        <li class="li3" :class="{'on':tab===2}" @click="tab=2">已支付<span></span></li>
                    </ul>
                </div>
            </div>

            <!-- 全部 -->
            <div class="whole" v-show="tab===0">
                <div class="orderMain">
                    <ul>
                        <li class="li1">优铺会员</li>
                        <li class="li2">
                            <!-- <div>
                                <router-link :to="{
                                    path: 'payment',
                                    params: {
                                        name: 'name',
                                        dataObj: data
                                    },
                                    query: {
                                        name: 'name',
                                        dataObj: data
                                    }
                                }">
                                去支付
                                </router-link>
                            </div> -->

                            <div>
                                <router-link to='/payment'>
                                去支付
                                </router-link>
                            </div>


                            <!-- <span>已支付</span>
                            <span>已失效</span> -->
                        </li>
                    </ul>
                    <dl class="orderMainDl">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p class="p1">购买产品：<span>1个月会员</span></p>
                            <p>消费金额：<span>300元</span></p>
                            <p>创建时间：<span>2018-02-02 11:48:42</span></p>
                            <p>购买产品：<span>1个月会员</span></p>
                        </dd>
                    </dl>
                </div>
                <div class="orderMain">
                    <ul>
                        <li class="li1">优铺会员</li>
                        <li class="li2">
                            <h4>已失效</h4>
                        </li>
                    </ul>
                    <dl class="orderMainDl">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p>购买产品：<span>1个月会员</span></p>
                            <p>消费金额：<span>300元</span></p>
                            <p>创建时间：<span>2018-02-02 11:48:42</span></p>
                            <p>购买产品：<span>1个月会员</span></p>
                        </dd>
                    </dl>
                </div>
                <div class="orderMain">
                    <ul>
                        <li class="li1">VIP服务</li>
                        <li class="li2">
                            <h4>已支付</h4>
                        </li>
                    </ul>
                    <dl class="orderMainDl">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p>购买产品：<span>1个月会员</span></p>
                            <p>消费金额：<span>300元</span></p>
                            <p>创建时间：<span>2018-02-02 11:48:42</span></p>
                            <p>购买产品：<span>1个月会员</span></p>
                        </dd>
                    </dl>
                </div>
            </div>

            <!-- 未完成 -->
            <div class="incomplete" v-show="tab===1">
                <div class="orderMain">
                    <ul>
                        <li class="li1">优铺会员</li>
                        <li class="li2">
                            <div>去支付</div>
                        </li>
                    </ul>
                    <dl class="orderMainDl">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p>购买产品：<span>1个月会员</span></p>
                            <p>消费金额：<span>300元</span></p>
                            <p>创建时间：<span>2018-02-02 11:48:42</span></p>
                            <p>购买产品：<span>1个月会员</span></p>
                        </dd>
                    </dl>
                </div>
            </div>

            <!-- 已完成 -->
            <div class="completed" v-show="tab===2">
                <div class="orderMain">
                    <ul>
                        <li class="li1">VIP服务</li>
                        <li class="li2">
                            <h4>已支付</h4>
                        </li>
                    </ul>
                    <dl class="orderMainDl">
                        <dt>
                            <img src="../../../static/images/mine/VIP.png">
                        </dt>
                        <dd>
                            <p>购买产品：<span>1个月会员</span></p>
                            <p>消费金额：<span>300元</span></p>
                            <p>创建时间：<span>2018-02-02 11:48:42</span></p>
                            <p>购买产品：<span>1个月会员</span></p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- 暂无订单 -->
        <div class="noOrder">
            <div class="noOrderTop">
                <i>
                    <router-link to='/mine'>
                        <img src="../../../static/images/mine/back.png">
                    </router-link>
                </i>
                <h3>我的订单</h3>
            </div>
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
</template>


<script>
export default {
    name: 'order',
    data () {
        return {
            tab:0
        }
    },
    computed:{

    },
    methods:{

    },
    created() {

    }

}
</script>
<style scoped lang="scss">

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
    position: relative;
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
    width: 20%;
    line-height: 1rem;
}
.orderNav .li2{
    width: 60%;
    line-height: 1rem;
}
.orderNav .li3{
    width: 20%;
    line-height: 1rem;
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
.orderMain .li2>h4{
    line-height: 0.98rem;
    margin-right: 0.2rem;
    color: #ccc;
}
.orderMainDl{
    height: 2.2rem;
}
.orderMainDl dt{
    width: 1.2rem;
    height: 2.2rem;
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













