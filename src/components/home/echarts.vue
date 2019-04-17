<template>
<div class="echarts">
    <div class="nav">
        <h3 v-if="title==1" class="back" @click="back()"><span></span></h3>
        <div class="jiantou-title" v-else="title==2"><span @click="back()"></span>{{cityName}}商铺行情</div>
        <h4>{{cityName}}商铺行情</h4>
    </div>
    <div class="content">
        <div class="title">
            <h3>{{cityName}}商铺{{year}}年{{month}}月成交均价</h3>
            <div class="price"><span>{{dailyRent}}元</span>/㎡/天  <dl><dt>环比上月</dt><dd>{{shopRate}}</dd></dl>  </div>
        </div>
        <div class="txt">
            <h3>租金均价涨跌情况</h3>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in list" @click="listFun(item,index)">
                        <p>{{item.area}}</p>
                        <p>{{item.dailyRent}}元/㎡/天</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rizujing">
            <h3>{{cityName}}租金趋势（月租金）</h3>
            <div id="myChart1"></div>
        </div>
        <div class="rizujing">
            <h3>{{cityName}}商铺成交量（套）</h3>
            <div id="myChart2"></div>
        </div>
        <div class="rizujing">
            <h3>商铺成交效率（天）</h3>
            <div id="myChart3"></div>
            <div class="side">左右滑动可查看更多</div>
        </div>
        <div class="rizujing">
            <h3>铺源分布占比 </h3>
            <div id="myChart4"></div>
        </div>
        <div class="rizujing">
            <h3>商铺面积分布</h3>
            <div id="myChart5"></div>
        </div>
        <div class="shengming">数据申明：{{cityName}}商铺行情由优铺提供，仅供参考，如需引用请注明出处！</div>
    </div>
</div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: "eCharts",
    data () {
      return {
        title: 1,
        msg: "Welcome to Your Vue.js App",
        num: 0,
        myChart: "",
        areas: "",
        // area:["朝阳","昌平","通州","大兴","丰台","顺义","海淀","房山","西城","东城","石景山","密云","怀柔","门头沟","平谷","延庆"],
        // areaAargain: [49,34,43,28,31,46,39,30,38,30,29,20,23,33,22,43], //铺源成交
        // areaDistribution: [27.15,13.36,10.37,8.81,8.67,8.41,5.25,5.14,2.99,2.98,2.44,1.47,1.01,0.84,0.69,0.42], //铺源分布
        list: "",//全部数据
        dailyRentList: "",// 日租金趋势图
        dealCountList: "",// 商铺成交量
        shopRate: "",//环比
        dailyRent:"",//每天价格
        year: "",//年份
        month: "",//月份
        cityId: "",
        cityName: "",
        cityAreaArr: [], //商铺成交效率（天）
        cityAreaDataArr: [],
        shopRateCityAreaArr: [], // 铺源分布占比 
        shopRateCityAreaDataArr: [],
        shopAcreageListDataArr: [], //商铺面积分布
      }
    },
    beforeRouteEnter (to, from, next) {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // 修复iOS版微信HTML5 History兼容性问题
        if (isiOS && to.path !== location.pathname) {
            // 此处不可使用location.replace
            location.assign(to.fullPath)
        } else {
            next()
        }
    },
    mounted(){
        var d = document.documentElement;
        var cw = d.clientWidth || 750;
        document.documentElement.style.fontSize = (cw/750 * 100) + 'px';
        var date = new Date();
        this.year = date .getFullYear(); //获取完整的年份(4位)
        this.month = date.getMonth() + 1; //月份
        //滚动事件
        var that = this;
        if(getUrlId("move")){
            $(".back").hide();
            $(".jiantou-title").hide();
        }else{
            window.onscroll = function(){
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop >= 100){
                    that.title = 2;
                }else{
                    that.title = 1;
                }
            }
        }

        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        this.cityId = request['cityId'];
        var appMove = request['move'];

       

        if(appMove == "android"){
            $(".nav h4").hide();
            $(".nav").css("height","2rem;"); 
        }

        this.init();

        setTimeout(function () {
            $(".list ul li").eq(0).addClass("cur");
        },1000)
    },
    updated(){
        this.fenxiangFun();
    },
    methods: {
        back(){
            this.$router.push({path:"/home"})
        },
        init(){
            let _this = this;
            this.$http(this.changeData() + '/show/getShopExponential',{
                method: 'post',
                params: {
                    // area: this.areas,
                    cityId: this.cityId
                }
            }).then(res => {
                // console.log(res);
                this.cityName = res.data.data.cityName;
                this.list = res.data.data.list;
                this.dailyRentList = res.data.data.dailyRentList;
                this.dealCountList = res.data.data.dealCountList;
                this.dailyRent = res.data.data.dailyRent;
                this.shopRate = res.data.data.shopRate;
                this.linechart1();//租金趋势折线图
                this.linechart2();//成交量折线图
                
                //商铺成交平均效率
                var dealRateList = res.data.data.dealRateList;
                dealRateList.forEach(function (item,index) {
                    _this.cityAreaArr.push(item.area);
                    _this.cityAreaDataArr.push(item.shopDealCount);
                });
                this.histogram1(_this.cityAreaArr,_this.cityAreaDataArr);//成交率柱状图
                
                //铺源分布占比
                var shopRateList = res.data.data.shopRateList;
                shopRateList.forEach(function (item,index) {
                    _this.shopRateCityAreaArr.push(item.area);
                    var dataType = item.shopRate
                    var dataType1 = dataType.split("%").join("");
                    _this.shopRateCityAreaDataArr.push(dataType1);
                }); 
                this.histogram2(_this.shopRateCityAreaArr,_this.shopRateCityAreaDataArr);
                
                //铺源分布占比
                var shopAcreageList = res.data.data.shopAcreageList;
                shopAcreageList.forEach(function (item,index) {
                    var dataType = item.acreageRate
                    var dataType1 = dataType.split(".00%").join("");
                    _this.shopAcreageListDataArr.push(dataType1);
                    // console.log(_this.shopAcreageListDataArr);
                }); 
                this.piechart(_this.shopAcreageListDataArr);//面积分布饼图

            }).catch(err => {
                console.log(err)
            });
        },

        init1(){
            let _this = this;
            this.$http(this.changeData() + '/show/getShopExponential',{
                method: 'post',
                params: {
                    area: this.areas,
                    cityId: this.cityId
                }
            }).then(res => {
                
                this.list = res.data.data.list;
                this.dailyRentList = res.data.data.dailyRentList;
                this.dealCountList = res.data.data.dealCountList;
                this.dailyRent = res.data.data.dailyRent;
                this.shopRate = res.data.data.shopRate;
                this.linechart1();//租金趋势折线图
                this.linechart2();//成交量折线图
            }).catch(err => {
                console.log(err)
            });
        },

        linechart1(){
            var monthlys1 = [];//日租金月份
            var dailyRents = [];//日租金数据
            this.dailyRentList.forEach(function (item,index) {
                monthlys1.push(item.monthly);
                dailyRents.push(item.dailyRent)
            })
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("myChart1"))
            // 绘制图表
            myChart.setOption({
                color: "#64ABFA",
                tooltip: {
                    formatter: function (param) { //修改点击后的提示信息
                        return param.name+"租金均价："+param.value+"/㎡/天";
                    }
                },
                xAxis: {
                    type: 'category',
                    data: monthlys1
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    data: dailyRents,
                    type: 'line',
                    symbolSize: 8
                }]
            });
        },
        linechart2(){
            var monthlys2 = [];//成交量月份
            var dealCounts = [];//成交量套数
            this.dealCountList.forEach(function (item,index) {
                monthlys2.push(item.monthly)
                dealCounts.push(item.dealCount)
            })
            // 基于准备好的dom，初始化echarts实例
            var myChart2 = this.$echarts.init(document.getElementById("myChart2"))
            // 绘制图表
            myChart2.setOption({
                color: "#64ABFA",
                tooltip: {
                    formatter: function (param) { //修改点击后的提示信息
                        return param.name+"成交量："+param.value+"套/天";
                    }
                },
                xAxis: {
                    type: 'category',
                    data: monthlys2,
                },
                yAxis: {
                    type: 'value',
                    // axisTick: {
                    //   inside: true
                    // },
                    axisLabel: {
                        margin: 6,
                        formatter: function (value, index) {
                        if (value >= 10000 && value < 10000000) {
                            value = value / 10000 + "万";
                        } else if (value >= 10000000) {
                            value = value / 10000000 + "千万";
                        }
                        return value;
                        }
                    },
                },
                series: [{
                    data: dealCounts,
                    type: 'line',
                    symbolSize: 8
                }]
            });
        },
        //成交率柱状图
        histogram1(area,areaAargain){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("myChart3"))
            // 绘制图表
            myChart.setOption({
              color: "#64ABFA",
              tooltip: {
                formatter: function (param) { //修改点击后的提示信息
                  return param.name +"成交率:"+param.value+"套/天";
                }
              },
              xAxis: {
                type: 'category',
                data: area
              },
              yAxis: {
                type: 'value',
              },
              series: [{
                type: "bar",
                barWidth: 20,  // 柱形的宽度
                barCategoryGap: '20%',  // 柱形的间距
                label: { //柱状图顶部数字显示
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#333'
                    }
                  }
                },
                data: areaAargain
              }],
              dataZoom: [
                {   // 这个dataZoom组件，也控制x轴。
                  type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                  start: 0,      // 左边在 10% 的位置。
                  end: 50         // 右边在 60% 的位置。
                }
              ],
            });
          },
      histogram2(area,areaDistribution){
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById("myChart4"))
        // 绘制图表
        myChart.setOption({
          color: "#64ABFA",
          tooltip: {
            formatter: function (param) { //修改点击后的提示信息
              // console.log(param)
              return param.name +"分布占比："+param.value+"%";
            }
          },
          xAxis: {
            type: 'category',
            data: area,
            axisLabel :{
              interval:0
            },
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              }
            }
          ],
          series: [{
            type: "bar",
            barWidth: 20,  // 柱形的宽度
            barCategoryGap:'20%',
            label: { //柱状图顶部数字显示
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#333'
                }
              }
            },
            data: areaDistribution
          }],
          dataZoom: [
            {   // 这个dataZoom组件，也控制x轴。
              type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
              start: 0,      // 左边在 10% 的位置。
              end: 50        // 右边在 60% 的位置。
            }
          ],
        });
      },
      piechart(value){
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById("myChart5"))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            formatter: function (param) { //修改点击后的提示信息
              return param.name+"："+param.value+"%";
            }
          },
          series: [
            {
              type:'pie',
              label:{            //饼图图形上的文本标签
                normal:{
                  formatter:function (param) {
                    // console.log(param)
                    return param.name + ":\n" + param.value+"%";
                  },
                  textStyle: {
                    color: '#333'
                  }
                },
                emphasis: {
                  show: true,
                }
              },
              radius: ['40%', '52%'],
              data:[
                {value:value[0], name:'0-30㎡',itemStyle:{normal:{color:'#64abfa'}}},
                {value:value[1], name:'31-50㎡',itemStyle:{normal:{color:'#03b8d8'}}},
                {value:value[2], name:'51-100㎡',itemStyle:{normal:{color:'#ffb786'}}},
                {value:value[3], name:'101-150㎡',itemStyle:{normal:{color:'#b6a4dd'}}},
                {value:value[4], name:'151-200㎡',itemStyle:{normal:{color:'#e27983'}}},
                {value:value[5], name:'201-500㎡',itemStyle:{normal:{color:'#b5f0d7'}}},
                {value:value[6], name:'500㎡以上',itemStyle:{normal:{color:'#93deff'}}}
              ]
            }
          ]
        })
      },
      listFun(item,index){
        this.areas = item.area;
        $(".list ul li").eq(index).addClass("cur").siblings().removeClass("cur");
        this.init1();
      },
      fenxiangFun(){

        // console.log(this.cityName);

        var that = this;
        var data = {
          url: window.location.href.split('#')[0]
        }
        this.$http.post(this.changeData() + '/member/weChatShare',qs.stringify(data)).then(function(res){
          // this.$http.post("http://tidhy.s1.natapp.cc/shop/getwx",qs.stringify(data)).then(function(res){
            console.log(res)
          wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // appId: res.data.appId, // 必填，公众号的唯一标识
            // timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            // nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            // signature: res.data.signature,// 必填，签名
            // jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表

            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
          });

          wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: that.cityName + "商铺行情", // 分享标题
              desc: '租铺卖铺找优铺', // 分享描述
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://up-img.oss-cn-beijing.aliyuncs.com/logo/11527824725_.pic.jpg", // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户点击了分享后执行的回调函数
              }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: that.cityName + "商铺行情", // 分享标题
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://up-img.oss-cn-beijing.aliyuncs.com/logo/11527824725_.pic.jpg", // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
              }
            });
          });
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        }.bind(this)).catch(function(err){
          console.log("商店详情页面错误：",err)
        });
      },
    }
  }
</script>


<style lang="scss" type="text/scss" scoped>
  .echarts{
    width: 7.5rem;
    margin: 0 auto;
    .nav{
      width: 7.5rem;
      height: 2.76rem;
      background: #64ABFA;
      h3{
        height: .6rem;
        text-align: center;
        position: relative;
        color: #fff;
        font-size: .36rem;
        span{
          position: absolute;
          left: .2rem;
          top: .22rem;
          width: .36rem;
          height: .36rem;
          background: url("../../../static/images/common/back-write.png") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
      .jiantou-title{
        position: fixed;
        padding: 0 2rem;
        left: 0;
        top: 0;
        width: 3.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: bold;
        background: #fff;
        z-index: 1000;
        border-bottom: .01rem solid #eaeaea;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
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
      h4{
        color: #fff;
        font-size: .36rem;
        text-align: center;
        padding-top: .2rem;
      }
    }
    .content{
      padding: .2rem;
      .title{
        width: 6.5rem;
        height: 1.66rem;
        padding: .3rem;
        background: #fff;
        margin: -1.4rem auto 0;
        border-radius: .1rem;
        h3{
          height: .68rem;
          color: #111;
          border-bottom: 0.01rem solid #eaeaea;
        }
        .price{
          color: #666;
          position: relative;
          padding-top: .4rem;
          span{
            font-size: .65rem;
            color: #111;
          }
          dl{
            position: absolute;
            right: 0;
            top: .2rem;
          }
        }
      }
      .txt{
        padding-top: .2rem;
        h3{
          font-size: .28rem;
          color: #111;
          padding-bottom: .3rem;
        }
        .list{
          padding-bottom: .6rem;
          height: 1.3rem;
          overflow: hidden;
          ul{
            height: 1.5rem;
            display: box;
            display: -webkit-box;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            li{
              padding: .2rem;
              width: 2.0rem;
              height: .9rem;
              font-size: .3rem;
              margin: 0 .5rem 0 0;
              border-radius: .1rem;
              box-shadow:0px 0px .1rem 0px rgba(0, 0, 0, 0.1);
              background: #fff;
              &.cur{
                background: #64ABFA;
                color: #fff;
              }
              p{
                height: .4rem;
                line-height: .4rem;
                margin-bottom: .1rem;
              }
            }
          }
        }
      }
      .rizujing{
        padding: 0 .3rem;
        background: #fff;
        margin-bottom: .3rem;
        position: relative;
        .side{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: .8rem;
          line-height: .8rem;
          color: #333;
          background: #fff;
          text-align: center;
          font-size: .26rem;
        }
        h3{
          font-size: .3rem;
          height: .86rem;
          line-height: .86rem;
          border-bottom: 0.01rem solid #eaeaea;
        }
        #myChart1, #myChart2,#myChart3,#myChart4,#myChart5{
          width: 6.8rem;
          height: 6rem;
        }
      }
      .shengming{
        padding: 0 .3rem;
        font-size: .28rem;
        color: #888;
      }
    }
  }
  .dist{
    width: 7.5rem;
    height: 1.2rem;
    overflow: hidden;
  }
  ul{
    width: 7.5rem;
    height: 1.2rem;
    display: box;
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    li{
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      background: #f00;
      border-radius: 50%;
      margin: 0 .1rem;
    }
  }
</style>
