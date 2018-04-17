<template>
  <div class="detail">
    <div class="jiantou-title" v-show="title===1"><span @click="back()"></span>商铺详情页面</div>
    <div class="downing"></div>
    <div class="banner" @click="tab1()">
      <div class="jiantou" v-show="title===0"><span @click="back()"></span></div>
      <div class="wrap">
        <div class="txt">
          <span>商品编号：12132</span>
          <span>{{num}}/{{total}}</span>
        </div>
        <div class="swiper-container swiper-container1" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in swiper"><img :src="item" alt=""></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="bannerBig">
      <div class="swiper-top"><span @click="tab2()"></span>商铺名称</div>
      <div class="swiper-bottom">{{num2}}/{{total}}</div>
      <div class="swiper-container swiper-container2 swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiper"><img :src="item" alt=""></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="msg">
      <h2>项目名称朝阳区天村路商铺出租，天村路商铺项目名称朝阳区30个5s</h2>
      <ul class="youshi">
        <li>临近地铁</li>
        <li>临近地铁</li>
        <li>临近地铁</li>
      </ul>
      <div class="money">
        <dl>
          <dt>月租金</dt>
          <dd><span>12345</span>元/月</dd>
        </dl>
        <dl>
          <dt>日租金</dt>
          <dd><span>12345</span>元/天/m</dd>
        </dl>
        <dl>
          <dt>月租金</dt>
          <dd><span>45</span>万</dd>
        </dl>
      </div>
      <div class="address">
          <div class="one" :class="{'cur':add===2}">
              <div><span>面积：</span><b>80²</b></div>
              <div v-show="add===1"><span>地址：</span><b>朝阳区田村附近</b></div>
              <div class="look" v-show="add===2"><span>地址：</span><b>朝阳区田村附近阿萨德飞洒地方的萨芬撒爱上</b></div>
          </div>
          <div class="two"  v-show="add===1">
            <div @click="address()">查看详细地址</div>
          </div>
          <div class="map">
            <!--<router-link to="/shopMap"></router-link>-->
            <a href="http://api.map.baidu.com/marker?location=39.915119,116.403963&title=天安门&content=天安门广场&output=html&src=zupubao"></a>
          </div>
      </div>
      <div class="zhuangtai">
        <div class="sheshi">
          <h3>配套设施</h3>
          <div class="list">
            <dl class="cur">
              <dt class="dian"></dt>
              <dd>380伏</dd>
            </dl>
            <dl>
              <dt class="pai"></dt>
              <dd>排污管道</dd>
            </dl>
            <dl>
              <dt class="yan"></dt>
              <dd>烟管道</dd>
            </dl>
            <dl>
              <dt class="xia"></dt>
              <dd>下水</dd>
            </dl>
            <dl>
              <dt class="shang"></dt>
              <dd>上水</dd>
            </dl>
          </div>
          <div class="list list2">
            <dl>
              <dt class="wai"></dt>
              <dd>外摆区</dd>
            </dl>
            <dl>
              <dt class="ting"></dt>
              <dd>停车位</dd>
            </dl>
            <dl>
              <dt class="mei"></dt>
              <dd>煤气</dd>
            </dl>
            <dl>
              <dt class="tian"></dt>
              <dd>天然气</dd>
            </dl>
            <dl>
              <dt class="ming"></dt>
              <dd>明火</dd>
            </dl>
          </div>
        </div>
        <div class="jingying">
          <h3><span></span>经营状态</h3>
          <ul>
            <li><span>当前经营：</span><b>浴池浴场</b></li>
            <li><span><b>证</b>照：</span><b>公司可过户</b></li>
            <li><span>已有证件：</span><b>营业执照</b></li>
            <li><span>经营状态：</span><b>空铺</b></li>
            <li class="m0"><span>本店优势：</span><b>人流大/消费能力高/竞争少</b></li>
          </ul>
        </div>
        <div class="jingying wuye">
          <h3><span></span>物业信息</h3>
          <ul>
            <li><span>商铺类型：</span><b>购物百货中心</b></li>
            <li><span>建筑面积：</span><b>80²</b></li>
            <li><span>使用面积：</span><b>80²</b></li>
            <li><span><b>楼</b>层：</span><b>一层和二层</b></li>
            <li><span>是否分离：</span><b>否</b></li>
            <li class="m0"><span>临干主道：</span><b>否</b></li>
          </ul>
        </div>
        <div class="jingying zuyue">
          <h3><span></span>租约相关</h3>
          <ul>
            <li><span><i>月</i><i>租</i>金：</span><b>6000/月</b></li>
            <li><span><b>押</b>金：</span><b>10000</b></li>
            <li><span>支付方式：</span><b>年付</b></li>
            <li><span>分时出租：</span><b>否</b></li>
            <li><span>最长租约：</span><b>12月</b></li>
            <li class="m0"><span>当前租约：</span><b>1年</b></li>
          </ul>
        </div>
        <div class="jingying weizhi">
          <h3><span></span>位置信息</h3>
          <ul>
            <li><span><b>区</b>域：</span><b>朝阳区</b></li>
            <li><span><b>环</b>线：</span><b>北二环到北三环</b></li>
            <li class="m0"><span>临近道路：</span><b>西直门北大街</b></li>
          </ul>
        </div>
        <div class="jingying zhuanrang">
          <h3><span></span>转让相关</h3>
          <ul>
            <li><span><i>转</i><i>让</i>费：</span><b>576万</b></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cang">
        <dl>
          <dt @click="shoucang($event)"></dt>
          <dd>收藏</dd>
        </dl>
      </div>
      <div class="tel">
        <span></span><a :href="tel">直拨店主</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        tel: "tel:13800000000",
        add: 1,
        address1: "朝阳区田村附近",
        shou: 0,
        num: 1,
        title: 0,
        num2: 1,
        tab: 0,
        total: "",
        swiper: ["../../../static/images/shopDetail/banner.jpg","../../../static/images/shopDetail/banner.jpg","../../../static/images/shopDetail/banner.jpg"]
      }
    },
    created(){

    },
      mounted(){
        this.total = this.swiper.length;
        this.init();
      },
      methods:{
        tab1(){
          $(".bannerBig").show()
          var that = this;
          var swiper2 = new Swiper('.swiper-container2', {
            on: {
              slideChangeTransitionEnd: function(){
                that.num2 = 1 + this.activeIndex;//切换结束时，告诉我现在是第几个slide
              }
            }
          });
        },
        tab2(){
          this.num2 = 1;
          $(".bannerBig").hide();
        },
        init(){
          //轮播图
          var that = this;
          var swiper1 = new Swiper('.swiper-container1', {
            on: {
              slideChangeTransitionEnd: function(){
                that.num = 1 + this.activeIndex;//切换结束时，告诉我现在是第几个slide
              }
            }
          });

          //滚动事件
          window.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= 100){
              that.title = 1;
            }else{
              that.title = 0;
            }
          }
        },
        back(){
          this.$router.go(-1)
        },
        shoucang(e){
          if($(e.srcElement).hasClass("cur")){
            $(e.srcElement).removeClass("cur");
            layer.open({
              content: '取消收藏',
              skin:  'msg',
              time: 2
            });
          }else{
            $(e.srcElement).addClass("cur");
            layer.open({
              content: '收藏成功',
              skin: 'msg',
              time: 2
            });
          }
        },
        address(){
          this.add = 2;
          layer.open({
            content: '<h2>温馨提示</h2><p>您今日<span>50次</span>机会已用完</p><p>请明日再来</p>',
            btn: '好',
            skin: 'tishi'
          })
        }
      }
  }
</script>
<style>

  .layui-m-layer-tishi .layui-m-layercont{
    padding: 35px 30px;
  }
  .layui-m-layer-tishi h2{
    font-size: .34rem!important;
    font-weight: bold!important;
    margin-bottom: .3rem;
    color: #333;
  }
  .layui-m-layer-tishi p{
    font-size: .3rem;
    color: #333;
  }
  .layui-m-layer-tishi p span{
    color: #e8584f;
  }
  .layui-m-layer-tishi .layui-m-layerbtn span{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background: #64AAFF;
    font-size: .34rem;
    color: #fff;
  }
</style>
<style lang="scss" type="text/scss" scoped>

  .detail{
    width: 7.5rem;
    margin: 0 auto;
    .jiantou-title{
      position: fixed;
      left: 0;
      top: 0;
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .34rem;
      font-weight: bold;
      background: #fff;
      z-index: 1000;
      border-bottom: .01rem solid #eaeaea;
      span{
        position: absolute;
        left: .2rem;
        top: .25rem;
        width: .36rem;
        height: .36rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .36rem .36rem;
      }
    }
    .down{
      width: 100%;
      height: .88rem;
      line-height: .88rem;
      background: #fff;
      z-index: 1000;
      border-bottom: 0.01rem solid #f5f5f5;
      span{
        display: inline-block;
        width: .74rem;
        height: .44rem;
        margin: .2rem;
        background: url("../../../static/images/shopDetail/logo.png") no-repeat;
        background-size: .74rem .44rem;
      }
      b{
        display: inline-block;
        font-size: .26rem;
        vertical-align: top;
        font-weight:bold;
        color: #65abff;
      }
      a{
        margin-top: .1rem;
        margin-left: .4rem;
        vertical-align: top;
        display: inline-block;
        width: 1.8rem;
        height: .7rem;
        line-height: .7rem;
        background: #64aaff;
        border-radius: .1rem;
        color: #fff;
        text-align: center;
        font-size:.32rem;
      }
    }
    .banner{
      width: 100%;
      height: 5.62rem;
      overflow: hidden;
      position: relative;
      .jiantou{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .2rem;
        width: .6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        z-index: 10000;
        border-radius: .5rem;
        background: rgba(0,0,0,.5);
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -.18rem;
          margin-top: -.18rem;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/shopDetail/jiantou.png") no-repeat;
          background-size: .36rem .36rem;
        }
      }
      .swiper-container {
        width: 100%;
        height: 100%;
      }
      .swiper-slide {
        width: 7.5rem!important;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
        }
      }

      .txt{
        width: 96%;
        height: .5rem;
        line-height: .54rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        padding: 0 2%;
        z-index: 100;
        span{
          font-size:.24rem;
          color: #fff;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
    }
    .bannerBig{
      display: none;
      /*visibility: hidden;*/
      width: 7.5rem;
      height: 100% ;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      background: #010101;
      z-index: 10000;
      .swiper-top{
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        color: #fff;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        background: #141414;
        span{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          position: absolute;
          left: .2rem;
          top: .3rem;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/common/back-write.png") no-repeat;
          background-size: .36rem .36rem;
        }
      }
      .swiper-bottom{
        width: 7.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
        z-index: 1000;
      }
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 5.56rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -3.75rem;
            margin-top: -2.78rem;
            text-align: center;
          }
        }
      }
    }
    .msg{
      background: #fff;
      padding-bottom: 1rem;
      h2{
        font-size:.36rem;
        color: #111;
        line-height: .48rem;
        padding: .4rem .2rem .2rem;
      }
      .youshi{
        padding: 0 .2rem;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom:.3rem;
        li{
          width: 1.06rem;
          height: .32rem;
          line-height: .36rem;
          text-align: center;
          font-size:.22rem;
          border: 1px solid #1988ef;
          margin-right: .2rem;
          color: #1988ef;
        }
      }
      .money{
        padding: 0 .2rem;
        display: flex;
        border-bottom:1px solid #f5f5f5;
        dl{
          padding: .3rem;
          dt{
            font-size: .26rem;
            color: #898989;
            height: .26rem;
            line-height: .26rem;
            margin-bottom:.1rem;
          }
          dd{
            height: .32rem;
            line-height: .32rem;
            font-size: .22rem;
            color: #e8584f;
            span{
              font-size:.32rem;
              color: #e8584f;
              font-size: .32rem;
            }
          }
        }
      }
      .address{
        padding: .3rem .2rem .3rem;
        display: flex;
        .one{
          width: 3.4rem;
          &.cur{
            width: 5.4rem;
            .look{
              width: 5rem;
              span{
                float: left;
                width: .84rem;
                height: .8rem;
                line-height: .55rem;
              }
              b{
                margin-top: -.2rem;
              }
            }
          }

          div{
            /*margin-bottom: .05rem;*/
            span,b{
              font-size: .28rem;
              height: .28rem;
              line-height: .28rem;
              color: #898989;
            }
            b{
              color: #333;
              line-height: .35rem;
            }
          }
        }
        .two{
          width: 2rem;
          margin-top: .4rem;
          div{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: block;
            width: 1.5rem;
            height: .46rem;
            line-height: .5rem;
            color: #fff;
            text-align: center;
            background: #64AAFF;
            border-radius: .1rem;
            font-size: .2rem;
            margin-right: .7rem;
          }
        }
        .map{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          flex: 0 0 auto;
          width: 1.4rem;
          height: .9rem;
          background: url("../../../static/images/shopDetail/map.png") no-repeat;
          background-size:  1.4rem .9rem;
          a{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .zhuangtai{
        background: #f7f8fa;
        padding: .5rem .2rem;
        .sheshi{
          h3{
            height: .34rem;
            line-height: .34rem;
            color: #111;
            font-size: .34rem;
          }
          .list{
            display: flex;
            padding: .4rem 0 .58rem;
            flex-wrap: wrap;
            justify-content: space-around;
            &.list2{
              padding: 0 0 .58rem;
            }
            dl{
              width: 20%;
              dt{
                width: .36rem;
                height: .36rem;
                margin-bottom:.1rem;
                width: .3rem;
                height: .3rem;
                background: url("../../../static/images/shopDetail/dian.png") no-repeat;
                background-size: .3rem .3rem;
                margin-left:.55rem;
                &.dian{
                  background-image: url("../../../static/images/shopDetail/dian.png");
                }
                &.pai{
                  background-image: url("../../../static/images/shopDetail/pai.png");
                }
                &.yan{
                  background-image: url("../../../static/images/shopDetail/yan.png");
                }
                &.xia{
                  background-image: url("../../../static/images/shopDetail/xia.png");
                }
                &.shang{
                  background-image: url("../../../static/images/shopDetail/shang.png");
                }
                &.wai{
                  background-image: url("../../../static/images/shopDetail/wai.png");
                }
                &.ting{
                  background-image: url("../../../static/images/shopDetail/ting.png");
                }
                &.mei{
                  background-image: url("../../../static/images/shopDetail/mei.png");
                }
                &.tian{
                  background-image: url("../../../static/images/shopDetail/tian.png");
                }
                &.ming{
                  background-image: url("../../../static/images/shopDetail/ming.png");
                }
              }
              dd{
                font-size: .22rem;
                height: .22rem;
                line-height: .22rem;
                text-align: center;
              }
              &.cur{
                dt{
                  &.dian{
                    background-image: url("../../../static/images/shopDetail/dian-bg.png");
                  }
                  &.pai{
                    background-image: url("../../../static/images/shopDetail/pai-bg.png");
                  }
                  &.yan{
                    background-image: url("../../../static/images/shopDetail/yan.png");
                  }
                  &.xia{
                    background-image: url("../../../static/images/shopDetail/xia.png");
                  }
                  &.shang{
                    background-image: url("../../../static/images/shopDetail/shang.png");
                  }
                  &.wai{
                    background-image: url("../../../static/images/shopDetail/wai.png");
                  }
                  &.ting{
                    background-image: url("../../../static/images/shopDetail/ting.png");
                  }
                  &.mei{
                    background-image: url("../../../static/images/shopDetail/mei.png");
                  }
                  &.tian{
                    background-image: url("../../../static/images/shopDetail/tian.png");
                  }
                  &.ming{
                    background-image: url("../../../static/images/shopDetail/ming.png");
                  }
                }
                dd{
                  color: #ccc;
                }
              }
            }
          }
        }
        .jingying{
          border-radius: .1rem;
          background: #fff;
          padding: .4rem .2rem;
          margin-top: .18rem;
          h3{
            font-size: .34rem;
            height: .34rem;
            line-height: .34rem;
            color: #111;
            font-weight:bold;
            margin-bottom: .3rem;
            span{
              display: inline-block;
              vertical-align: -.04rem;
              margin-right:.1rem;
              width: .34rem;
              height: .34rem;
              background: url("../../../static/images/shopDetail/jinyin.png") no-repeat;
              background-size:.34rem .34rem;
            }
          }
          ul{
            li{
              height: .28rem;
              line-height: .28rem;
              font-size: .28rem;
              margin-bottom: .2rem;
              span{
                color: #898989;
                b{
                  color: #898989;
                  margin-right: .55rem;
                }
                i{
                  color: #898989;
                  margin-right: .13rem;
                }
              }
              b{
                color: #333;
              }
            }
          }
        }
        .wuye{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/wuye.png");
            }
          }
        }
        .zuyue{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/zuyue.png");
            }
          }
        }
        .weizhi{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/weizhi.png");
            }
          }
        }
        .zhuanrang{
          h3{
            span{
              background-image: url("../../../static/images/shopDetail/zhuanrang.png");
            }
          }
        }
      }
    }
    .footer{
      width: 7.5rem;
      position: fixed;
      bottom: 0;
      //left: 0;
      height: 1.1rem;
      line-height: 1.1rem;
      display: flex;
      .cang{
        background: #fff;
        width: 1.4rem;
        dl{
          width: 1.4rem;
          margin: .2rem 0;
          box-sizing: border-box;
          border-right: 1px solid #f5f5f5;
          dt{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            margin-left: 0.5rem;
            width: .42rem;
            height: .40rem;
            margin-bottom: .1rem;
            background: url("../../../static/images/shopDetail/shoucang.png") no-repeat;
            background-size: .42rem .40rem;
            &.cur{
              background-image: url("../../../static/images/shopDetail/shoucang-bg.png");
            }
          }
          dd{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            height: .2rem;
            line-height: .2rem;
            font-size: .2rem;
            text-align: center;
          }
        }
        dl.fenxiang{
          margin: .25rem 0;
          dt{
            width: .39rem;
            height: .35rem;
            background: url("../../../static/images/shopDetail/fenxiang.png") no-repeat;
            background-size: .39rem .35rem;
          }
        }
      }
      .tel{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        text-align: center;
        background: #64aaff;
        width:6.1rem;

        span{
          display: inline-block;
          width: .36rem;
          height: .38rem;
          background: url("../../../static/images/shopDetail/tel.png") no-repeat;
          background-size: .36rem .38rem;
          vertical-align: -.1rem;
          margin-right: .2rem;
        }
        a{
          font-size: .32rem;
          color: #fff;
        }
      }
    }
  }
</style>
