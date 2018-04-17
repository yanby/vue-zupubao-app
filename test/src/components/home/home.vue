<template>
<div class="home" ref="box">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="searchBar" v-show="searchBar">
            <dl class="locate">
                <dt>北京</dt>
                <dd><img src="../../../static/images/home/locate.png"></dd>
            </dl>
            <div class="search">
                <img src="../../../static/images/home/search2.png">
                <input @click="goSearch()" type="text" name="" placeholder="区域/面积/租金/商铺编号">
            </div>
            <li class="telephone" @click="telephone()">
                <img src="../../../static/images/home/phone.png">
            </li>
        </div>
        <div class="homeTop">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in picArr" style="width: 100%; height: 100%;">
                    <img :src="item.shopImgUrl">
                </mt-swipe-item>
                <!-- <mt-swipe-item><img src="../../../static/images/home/banner.jpg"></mt-swipe-item>
                <mt-swipe-item><img src="../../../static/images/home/banner.jpg"></mt-swipe-item>
                <mt-swipe-item><img src="../../../static/images/home/banner.jpg"></mt-swipe-item> -->
            </mt-swipe>
            <div class="search-icon">
                <router-link to='/search'>
                    <img src="../../../static/images/home/search.png">
                </router-link>
            </div>
        </div>
        <div class="homeCenter">
            <dl class="dl1">
                <router-link to='/lookShop'>
                    <dt><img src="../../../static/images/home/newshop.png"></dt>
                    <dd>查看新铺</dd>
                </router-link>
            </dl>
            <dl class="dl2">
                <router-link to='/seekShop'>
                    <dt><img src="../../../static/images/home/findShop.png"></dt>
                    <dd>委托找铺</dd>
                 </router-link>
            </dl>
            <dl class="dl3">
                <router-link to='/turnShop'>
                    <dt><img src="../../../static/images/home/turnShop.png"></dt>
                    <dd>委托转铺</dd>
                </router-link>
            </dl>
        </div>
        <div class="backdrop-img">
            <div class="property">
                <dl class="dl1">
                    <dt  v-text="PropertyObj"><span>套</span></dt>
                    <dd>24小时新上</dd>
                </dl>
                <dl class="dl2">
                    <dt v-text="onLineShopObj"><span>套</span></dt>
                    <dd>在线商铺</dd>
                </dl>
                <dl class="dl3">
                    <dt v-text="seekShopObj"><span>人</span></dt>
                    <dd>正在找铺</dd>
                </dl>
            </div>
            <div class="suggest">
                <ul>
                    <li><img src="../../../static/images/home/message.png"></li>
                    <i></i>
                </ul>
                <dl>
                    <dt><img src="../../../static/images/home/hot.png"></dt>
                    <router-link to='/consult'>
                        <dd class="scroll-wrap">
                            <ul class="scroll-content" :style="{ top }">
                                <li v-for="item in prizeList">{{item.newMsg}}</li >
                            </ul>
                        </dd>
                    </router-link>
                </dl>
            </div>
        </div>

        <div class="homeMain">
            <div class="homeMain-top">
                <h3>独家实勘商铺</h3>
                <router-link to='/lookShop'>
                    <h4>查看全部<img src="../../../static/images/home/more.png"></h4>
                </router-link>
            </div>
            <div class="detail">
                <ul>
                    <li v-for="(item,index) in shopListArr" @click="goShop(item.shopId)">
                        <div class="wrap">
                            <div class="img">
                                <img :src="item.shopImgUrl" alt="">
                            </div>
                            <div class="msg">
                                <h4>{{item.shopName}}</h4>
                                <p>{{item.shopAddress}}</p>
                                <div class="tags" v-if="item.shopTags"><span v-for="(item1,index1) in item.shopTags">{{item1.tag}}</span></div>
                                <div class="price">{{item.shopMonery}}<span>{{item.shopMoneryUnit}}</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
           </div>
        </div>
    </mt-loadmore>
</div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import shopList from '@/components/shop/shopList.vue'
export default {
    name: 'home',
    data () {
        return {
            // 控制搜索栏显示隐藏
            searchBar: false,
            // 新闻滚动
            prizeList: [
                { name: "他是中国共享办公第一人。他用两年时间,建设出中国最大的共享办公平台，服务于全国30多个城市的几十万创业者。"},
                { name: "在消费升级浪潮中，他创造了零售新物种，用“科技创新+模式创新”的方式，攻克了生鲜电商这个“电商历史性难题”。" },
                { name: "在新经济浪潮中，他为创业者们提供了一个梦想的栖息地."},
                { name: "他开创了中国新“社交电商”模式。在大家都认为电商格局已定时，他用极具想象力的“移动社交+团购电商”模式改变了行业格局。" },
                { name: "这个年轻的创业家，改变了出行行业的格局，引领共享经济趋势。"}
            ],
            activeIndex: 0,
            // 轮播图数组
            picArr: [],
            // 新闻数组
            newArr: [],
            // 24小时房源
            PropertyObj: {},
            // 在线商铺
            onLineShopObj: {},
            // 正在找铺
            seekShopObj: {},
            // 商铺列表展示
            shopListArr: [],
        }
    },
    computed:{
        // 新闻滚动
        top() {
            return - this.activeIndex * .8 + 'rem';
        }
    },
    methods:{
        // 跳转搜索页
        goSearch(){
            this.$router.push({path:"/search"})
        },
        // 跳转查看商铺页
        goShop(){
            this.$router.push({path:"/shopDetail"})
        },
        // 搜索栏
        handleScroll(){
            let changBG = 0;
            let scrollTop = 0;
        },
        handleScroll() {
            window.addEventListener('scroll', this.handleScroll)
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)
            if(scrollTop > 1){
                this.searchBar = true;
            }else{
                this.searchBar = false;
            }
            // if(scrollTop > 1 && scrollTop < 10) {
            //     // this.$refs.searchStyle.style = "background: rgba(255,255,255,0.3)"
            // }
        },
        // 点击拨打电话
        telephone(){
            layer.open({
                content: '<h2>业务咨询 | 服务投诉热线</h2><p>4008988808</p >',
                btn: ['拨打', '取消'],
                yes: function(index){
                    layer.close(index);
                    window.location.href="tel:4008988808"
                },
                skin: 'tel'
            });
        },
        // 点击商铺列表
        seeDetails(index) {
            // alert(index);
            this.$router.push({
                path: '/shopDetail',
            })
        },

        addScroll:function() {
            window.addEventListener("scroll",this.sa,false)
        },
        sa () {            
            // var that = this
            let webHeight=document.body.offsetHeight
            let screenHeight=window.innerHeight
            let h1 = document.body.scrollTop
            let h2 = document.documentElement.scrollTop
            let scrollTopNum
            if(h1>h2){
                scrollTopNum=h1
            }else{
                scrollTopNum=h2
            }

            let panDuan=webHeight-scrollTopNum-screenHeight
            // console.log(panDuan);
            if(panDuan === 0){
                // console.log("到底部啦！！！")
                // window.location.href = '/lookShop';

                let h = location.href.includes('/home')
                // let h = window.location.href('/home')
                if( h === true){
                    this.$router.push({
                        path: '/lookShop'
                    })
                }
            }
        },

        loadTop() {
            //...// 加载更多数据
            setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
            }, 1500);
        },

        // 接口调用
        dataPost() {
            let _this = this
            //   let url = this.changeData() + '/abc-pc/course/getAllCourseScheduleData'
            let url = 'api/upzl-android-home2'

            // let params1 = {
            //     page: 1,
            //     queryType: 1,
            //     studentType: 1,
            //     rows: 1
            // }

            // let obj = qs.stringify(params1);
            // console.log(obj)
            axios(url,{
                method: 'get',
                // data: obj
            }).then(data => {
                // this.tableDataAll = data.data.content
                console.log(data);
                // 轮播图
                _this.picArr = data.data.data.home_shoplist;
                // 24小时房源
                _this.PropertyObj = data.data.data.home_shopnewnum;
                // 在线商铺
                _this.onLineShopObj = data.data.data.home_shopline;
                // 正在找铺
                _this.seekShopObj = data.data.data.home_people;
                // 新闻
                _this.prizeList = data.data.data.home_news;
                // 列表商铺展示
                _this.shopListArr = data.data.data.home_shoplist;
                // console.log(_this.shopListArr);
            }).catch(err => {
                console.log(err)
            });
        },      
       

        // loadBottom() {
        //     //...// 加载更多数据
        //     this.allLoaded = true;// 若数据已全部获取完毕
        //     this.$refs.loadmore.onBottomLoaded();
        // }

      //   handleTopChange(status) {
      //   this.moveTranslate = 1;
      //   this.topStatus = status;
      // },
      // translateChange(translate) {
      //   const translateNum = +translate;
      //   this.translate = translateNum.toFixed(2);
      //   this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      // },

      //   loadTop() {
      //   setTimeout(() => {
      //     // let firstValue = this.list[0];
      //     // for (let i = 1; i <= 10; i++) {
      //     //   this.list.unshift(firstValue - i);
      //     // }
      //     this.$refs.loadmore.onTopLoaded();
      //   }, 1500);
      // },

    },
    mounted() {
        // 新闻滚动
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 1500);
        // console.log(this.$refs.box.scrollHeight);
        this.addScroll()
    },
    components:{
        shopList
    },
    created() {
        this.handleScroll();
        // 接口调用
        this.dataPost();
    }
}
</script>

<style scoped lang="scss">
@import "../../../static/css/shopList.scss";
  .detail{
    padding-top: 0;
  }
*{margin: 0; padding: 0;}
ul,li,ol{list-style: none; box-sizing: border-box;}
.home{
    width: 7.5rem;
    background: #f7f8fa;
}

input::-webkit-input-placeholder{
    color: #ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:  #ccc;
}

/*搜索框*/
.searchBar{
    width: 7.5rem;
    height: 1rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 10000000;
    border-bottom: 0.01rem solid #eee;
    .locate{
        width: 15%;
        line-height: 1rem;
        float: left;
        text-align: center;
        dt{
            font-size: 0.28rem;
            float: left;
            text-align: right;
            width: 65%;
        }
        dd{
            width: 30%;
            float: left;
            img{
                width: 0.22rem;
                height: 0.22rem;
                position: relative;
                top: -0.05rem;
            }
        }
    }
    .search{
        width: 75%;
        float: left;
        height: 1rem;
        position: relative;
        input{
            width: 95%;
            height: 0.7rem;
            border-radius: 5px;
            background: #f0f1f3;
            color: #ccc;
            font-size: 0.24rem;
            text-indent: 15%;
            margin-top: 0.15rem;
            margin-left: 0.15rem;
        }
        img{
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: 0.32rem;
            left: 6%;
        }
    }
    .telephone{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 8%;
        float: right;
        line-height: 1rem;
        img{
            width: 0.3rem;
            height: 0.3rem;
        }
    }
}

/*轮播图*/
.homeTop{
    height: 4rem;
    overflow: hidden;
    position: relative;
}
.homeCenter{
    height: 2.2rem;
    background-color: #fff;
}
.homeCenter dl{
    height: 2rem;
    font-size: 0.28rem;
    color: #333;
    float: left;
    text-align: center;
    a{
        color: #333;
    }
}
.dl1{
    width: 25%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.dl2{
    width: 50%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.dl3{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 25%;
    text-align: center;
}
.homeCenter dl dt{
    margin-top: 0.38rem;
    margin-bottom: 0.14rem;
}
.homeCenter dl img{
    width: 1rem;
    height: 1rem;
}

/*搜索图标*/
.search-icon{
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.search-icon img{
    width: 0.7rem;
    height: 0.7rem;
}

/*咨询*/
.backdrop-img{
    height: 3rem;
    background-color: #fff;
}

.property{
    width: 96%;
    margin-left: 2%;
    height: 2.1rem;
    background: url(../../../static/images/home/backdrop.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.property dl{
    width: 33.33%;
    height: 0.7rem;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    float: left;
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.4rem;
}
.property .dl3{
    border-right: none;
}
.property dt{
    height: 0.4rem;
    font-size: 0.4rem;
    font-weight: 500;
    color: #fe8686;
}
.property dt>span{
    font-size: 0.24rem;
    color: #898989;
    margin-left: 0.2rem;
}
.property dd{
    height: 0.4rem;
    line-height: 0.4rem;
}

.suggest{
    line-height: 0.8rem;
    font-size: 0.26rem;
    ul{
        width: 14%;
        height: 0.8rem;
        margin-left: 4%;
        float: left;
        margin-right: 0.2rem;
        li{
            width: 0.8rem;
            height: 0.4rem;
            float: left;
            img{
                width: 100%;
                height: 100%;
            }
        }
        i{
            display: inline-block;
            width: 0.01rem;
            height: .4rem;
            background: #eee;
            float: right;
            margin-top: .2rem;
        }
    }
    dl{
        float: left;
        dt{
            width: 0.7rem;
            height: 0.36rem;
            float: left;
            margin-right: 0.1rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .scroll-wrap{
            text-align: left;
            float: left;
            width: 4.8rem;
            font-size: 0.26rem;
            overflow: hidden;
            .scroll-content{
                width: 4.6rem;
                height: 0.8rem;
                position: relative;
                transition: top 0.5s;
                li{
                  -webkit-tap-highlight-color: rgba(0,0,0,0);
                    line-height: .5rem;
                    text-align: left;
                    float: left;
                    width: 4.6rem;
                    font-size: 0.26rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin-top: .2rem;
                    margin-bottom: .2rem;
                }
            }
        }
    }
}

.homeMain{
    background: #fff;
    .homeMain-top{
        height: 1rem;
        background: #fff;
        margin-top: 0.2rem;
        border-bottom: 0.02px solid #eaeaea;
        h3{
            font-size: 0.34rem;
            float: left;
            line-height: 1rem;
            margin-left: 0.2rem;
        }
        h4{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-size: 0.34rem;
            float: right;
            line-height: 1rem;
            color: #aaa;
            font-size: 0.28rem;
            padding-right: 0.2rem;
            img{
                width: 0.3rem;
                height: 0.28rem;
                position: relative;
                top: -0.05rem;
            }
        }
    }
}
</style>
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
