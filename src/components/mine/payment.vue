<template>
    <div class="payment">
        <div class="paymentTop" @click="quitPayment()">
            <i>
                <!-- <router-link to='/mine'> -->
                    <img src="../../../static/images/mine/back.png">
                <!-- </router-link> -->
            </i>
            <h3>选择支付方式</h3>
        </div>
        <div class="paymentMain">
            <p>您需要支付<span>399.00</span>元</p>
            <dl>
                <dt>
                    <img src="../../../static/images/mine/wechat.png">
                </dt>
                <dd>微信支付</dd>
                <i :class="{'on':tab===0}" @click="tab=0">
                    <!-- <img src="../../../static/images/mine/selected.png"> -->
                    <span></span>
                </i>
            </dl>
            <dl>
                <dt>
                    <img src="../../../static/images/mine/alipay.png">
                </dt>
                <dd>支付宝支付</dd>
                <i :class="{'on':tab===1}" @click="tab=1">
                    <span></span>
                    <!-- <img src="../../../static/images/mine/round.png"> -->
                </i>
            </dl>
        </div>
        <div class="pay" @click="go()">立即支付<span>399.00</span>元</div>
        <!-- <mt-button type="primary">primary</mt-button> -->
    </div>
</template>

<script>
export default {
    name: 'collect',
    data () {
        return {
            tab: 0

        }
    },
    computed:{

    },
    methods:{
      go(){
        this.$router.push({path: "/goodmember"})
      },
      quitPayment() {
            let _this = this;
            layer.open({
                content: '<h2>确定要放弃支付</h2><p>您与VIP会员只差一步之遥</p ><p>更多独享特权尽在<span>优铺</span>VIP会员</p >',
                btn: ['继续支付', '确认离开'],
                yes: function(index){
                    layer.close(index);
                },
                no: function(index){
                    // alert(1);
                    layer.close(index);
                    _this.$router.go(-1)
                },
                skin: 'zhifu'
            })
        }
    },
    created() {

    }

}
</script>

<style scoped lang="scss">
.payment{
    width: 7.5rem;
    background: #f7f8fa;
}
.paymentTop{
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: relative;
}
.paymentTop h3{
    width: 75%;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #333;
    float: left;
    text-align: center;
}
.paymentTop i{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: inline-block;
    width: 13%;
    height: 1rem;
    line-height: 1rem;
    float: left;
}
.paymentTop i>img{
    width: 0.4rem;
    height: 0.4rem;
}
/*.paymentTop i>a>img{
    width: 0.4rem;
    height: 0.4rem;
}*/

.paymentMain{
    width: 7.5rem;
    p{
        height: 1.92rem;
        line-height: 1.92rem;
        color: #333;
        font-size: 0.34rem;
        border-bottom: 0.03rem solid #eaeaea;
        padding-left: 0.2rem;
        span{
            color: #e5091e;
            margin: 0 0.1rem;
        }
    }
    dl{
        width: 7.5rem;
        height: 1.2rem;
        border-bottom: 0.03rem solid #eaeaea;
        dt{
            width: 1.32rem;
            height: 1.2rem;
            /*background: red;*/
            text-align: center;
            line-height: 1.2rem;
            float: left;
            img{
                width: .8rem;
                height: .8rem;

            }
        }
        dd{
            color: #333;
            line-height: 1.2rem;
            font-size: .3rem;
            float: left;
        }
        i{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
            line-height: 1.2rem;
            display: inline-block;
            float: right;
            margin-right: .2rem;
            span{

                display: inline-block;
                width: .5rem;
                height: .5rem;
                background: url(../../../static/images/mine/round.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            &.on{
                span{
                    display: inline-block;
                    width: .5rem;
                    height: .5rem;
                    background: url(../../../static/images/mine/selected.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
}
.pay{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 80%;
    height: 1rem;
    font-size: 0.34rem;
    color: #fff;
    font-weight: 600;
    line-height: 1rem;
    text-align: center;
    background: #47abff;
    border-radius: 5px;
    margin-left: 10%;
    margin-top: .64rem;
    span{
        margin: 0 0.1rem;
    }
}
</style>
<style>
  .layui-m-layer-zhifu .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-zhifu h2{
    font-size: .34rem!important;
    font-weight: bold!important;
    margin-bottom: .3rem;
    color: #333;
  }
  .layui-m-layer-zhifu p{
    font-size: .32rem;
    color: #333;
  }
  .layui-m-layer-zhifu p span{
    color: #76aaf8;
  }
  .layui-m-layer-zhifu .layui-m-layerbtn span:nth-of-type(1){
    color: #898989;
    background: #f7f8fa;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .layui-m-layer-zhifu .layui-m-layerbtn span:nth-of-type(2){
    color: #fff;
    background: #64AAFF;
    font-size: .34rem;
    border-radius: 0 0 5px 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>





















