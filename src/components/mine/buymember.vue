<template>
  <div class="buy">
    <div class="title">
      <h3>
        <div class="back" @click.stop="back()"><span></span></div>
        <div class="huiyuan" :class="{'on':tab===0}" @click="tab=0">优铺会员 <span></span></div>
        <div class="fuwu" :class="{'on':tab===1}" @click="tab=1">VIP服务 <span></span></div>
      </h3>
    </div>
    <div class="content">
      <ul>
        <li v-show="tab===0">
          <div class="huiyuan">
            <div class="price">
              <div v-for="(item,index) in msg"><span>{{item.huiyuan}}</span><b>{{item.price}}</b><i @click="huiyuanbuy(item.id)">购买</i></div>
            </div>
          </div>
        </li>
        <li v-show="tab===1">
          <div class="fuwu-title"><h3>优铺VIP选址管家服务</h3></div>
          <div class="fuwu-msg">
            <div>1、优铺金牌选址顾问<span>一对一</span>开店专属服务</div>
            <div>2、基于大数据系统，提供符合VIP客户需求的商铺信息</div>
            <div>3、VIP客户可预约选址顾问协助洽谈、议价、签约等相关服务</div>
            <div>4、签约推荐商铺，租赁后一年内拆迁10倍赔偿</div>
            <div>5、如果您购买了VIP服务，拨打业主电话会由每日免费拨打<span>10次升至50次</span>，开店速度提升 <span>5</span>倍哦</div>
          </div>
          <div class="table">
            <table>
              <tr>
                <th>选址面积</th>
                <th>价格</th>
                <th class="other">服务时长</th>
              </tr>
              <tr v-for="(item,index) in fuwu">
                <td>{{item.vip}}</td>
                <td>{{item.price}}</td>
                <td>{{item.month}}  <span @click="fuwubuy(item.id)">购买</span></td>
              </tr>
            </table>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          tab:0,
          msg: [
            {huiyuan:"1个月VIP",price:"300元",id:0},
            {huiyuan:"3个月VIP",price:"500元",id:1},
            {huiyuan:"6个月VIP",price:"1000元",id:2},
            {huiyuan:"1年VIP",price:"2000元",id:3}
          ],
          fuwu: [
            {vip:"小于50m²",price:2000,month:"3个月",id:0},
            {vip:"51-150m²",price:3000,month:"3个月",id:1},
            {vip:"151-300m²",price:4000,month:"3个月",id:2},
            {vip:"301m²以上",price:6000,month:"3个月",id:3}
          ]
        }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        huiyuanbuy(e){
          window.location.href="tel:4008988808"
            // layer.open({
            //   content: '<h2>客服热线</h2><p>4008988808</p >',
            //   btn: ['拨打', '取消'],
            //   yes: function(index){
            //     layer.close(index);
            //     window.location.href="tel:4008988808"
            //   },
            //   skin: 'tel'
            // });
          // this.$router.push({path: "/payment"})
          // console.log(e)
        },
        fuwubuy(e){
          window.location.href="tel:4008988808"
          // layer.open({
          //   content: '<h2>客服热线</h2><p>4008988808</p >',
          //   btn: ['拨打', '取消'],
          //   yes: function(index){
          //     layer.close(index);
          //     window.location.href="tel:4008988808"
          //   },
          //   skin: 'tel'
          // });
          // console.log(e)
          // this.$router.push({path: "/payment"})
          // var data = {
          //     id: e
          // }
          // this.$http.post(loginUrl,$qs.stringify(data)).then(function(res){
          //   console.log(res)
          //
          // }.bind(this)).catch(function(err){
          //   console.log("会员页面错误：",err)
          // })
        }
      }
    }
</script>

<style>
  .layui-m-layer-tel .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-tel h2{
    font-size: .32rem;
    color: #333;
    margin-bottom: .3rem;
  }
  .layui-m-layer-tel p{
    font-size: .36rem;
    color: #e8584f;
  }
  .layui-m-layer-tel .layui-m-layerbtn span:nth-of-type(1){
    color: #898989;
    background: #f7f8fa;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .layui-m-layer-tel .layui-m-layerbtn span:nth-of-type(2){
    color: #fff;
    background: #64AAFF;
    font-size: .34rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 0 0 5px 0;
  }
</style>
<style scoped lang="scss" type="text/scss">
  .buy{
    width: 7.5rem;
    margin: 0 auto;
    .title{
      width: 100%;
      height: .9rem;
      line-height: .9rem;
      position: fixed;
      top: 0;
      z-index: 100;
      background: #FFF;
    h3{
      display: flex;
      justify-content: space-around;
      .back{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 10%;
        height: .9rem;
        span{
          display: inline-block;
          width: .34rem;
          height: .34rem;
          margin-top: .3rem;
          margin-left: .2rem;
          background: url("../../../static/images/common/back.png") no-repeat;
          background-size: .34rem .34rem;
        }
      }
      .huiyuan,.fuwu{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 45%;
        text-align: center;
        font-size: .34rem;
        color: #111;
        font-weight:bold;
        position: relative;
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
           color: #49ACFF;
          span{
            display: block;
          }
        }
      }
    }
  }
    .content{
      padding-top: .9rem;
      ul{
        li{
          background: #fff;
          .huiyuan{
            width: 7.5rem;
            height: 16.68rem;
            position: relative;
            background: url("../../../static/images/mine/huiyuan.png") no-repeat;
            background-size: 7.5rem 16.68rem;
            .price{
              position: absolute;
              left: .9rem;
              top: 5.9rem;
              width: 5.6rem;
              height: 4.1rem;
              div{
                width: 100%;
                height: .88rem;
                line-height: .88rem;
                font-size: .26rem;
                background: #FFF1E7;
                border-radius: .1rem;
                border: 0.01rem solid #fcba82;
                position: relative;
                margin-bottom: .2rem;
                span{
                  margin-left:.3rem;
                  color: #111;
                  margin-right: .12rem;
                }
                b{
                  color: #FC2F38;
                }
                i{
                  -webkit-tap-highlight-color: rgba(0,0,0,0);
                  display: inline-block;
                  width: 1.62rem;
                  height: .88rem;
                  line-height: .92rem;
                  background: #fcba82;
                  color: #fff;
                  text-align: center;
                  border-radius: 0.1rem;
                  position: absolute;
                  right: 0;
                  top: 0;
                }
              }
            }
          }
          .fuwu-title{
            width: 100%;
            height: 2.12rem;
            background: #70BBFF;
            h3{
              font-size: .32rem;
              padding: .6rem 0.32rem;
              text-align: center;
              color: #fff;
            }
          }
          .fuwu-msg{
            margin: -.9rem .2rem .4rem;
            padding: .3rem .2rem;
            background: #fff;
            border-radius: .05rem;
            box-shadow: 0 0 .02rem .02rem #f5f5f5;
            div{
              line-height: .4rem;
              font-size: .28rem;
              span{
                color: #e8584f;
              }
            }
          }
          .table{
            background: #fff;
            margin: 0 .2rem;
            padding-bottom: 1rem;
            table{
              width: 100%;
              text-align: center;
              tr{
                border-bottom: .01rem solid #eaeaea;
              th{
                font-size: .32rem;
                height: .94rem;
                line-height: .94rem;
                background: #eff8ff;
                &.other{
                  padding-left: .6rem;
                  text-align: left;
                }
              }
              td{
                height: .94rem;
                line-height: .94rem;
                font-size: .28rem;
              span{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                display: inline-block;
                width: 1.2rem;
                height: .6rem;
                line-height: .65rem;
                color: #fff;
                margin-left: .6rem;
                border-radius: .05rem;
                background: #FFB678;
              }
            }
            }
          }
          }
        }
      }
    }
  }
</style>
