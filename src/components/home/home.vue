<template>
<div class="home" ref="box">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="searchBar" v-show="searchBar">
        <!-- <div class="searchBar">    -->
            <dl class="locate">
                <dt>北京</dt>
                <dd><img src="../../../static/images/home/locate.png"></dd>
            </dl>
            <div class="search" ref="searchStyle">
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
                    <div style="width: 100%; height: 100%;" @click="goNewInfo(item.artitleId)">
                        <img :src="item.url">
                    </div>
                </mt-swipe-item>
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
                    <dt>{{this.PropertyObj}}<span>套</span></dt>
                    <dd>24小时新上</dd>
                </dl>
                <dl class="dl2">
                    <dt>{{this.onLineShopObj}}<span>套</span></dt>
                    <dd>在线商铺</dd>
                </dl>
                <dl class="dl3">
                    <dt>{{this.seekShopObj}}<span>人</span></dt>
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
                        <!-- <dd class="scroll-wrap">
                            <ul class="scroll-content" :style="{ top }">
                                <li v-for="item in prizeList" @click="goNews(item.id)">{{item.title}}</li>
                            </ul>
                        </dd>
 -->

                        <!-- 修改部分 -->
                        <dd class="scroll-wrap">
                            <div class="box3">
                                <div class="border3">
                                    <div v-for="item in prizeList" @click="goNews(item.id)">{{item.title}}</div>
                                    <!-- <div>This is a test 1.</div>
                                    <div>This is a test 2.</div>
                                    <div>This is a test 3.</div> -->
                                </div>
                             </div>
                        </dd>

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
                    <li v-for="(item,index) in shopListArr" @click="goShop(item.id)">
                        <div class="wrap">
                            <div class="img">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="msg">
                                <h4>{{item.title}}</h4>
                                <p>{{item.shopName}}</p>
                                <div class="tags" v-if="item.shopTags"><span v-for="(item1,index1) in item.shopTags">{{item1}}</span></div>
                                <div class="price">{{item.monthlyRent}}<span>{{item.unit}}</span></div>
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
        goShop(id){
            this.$router.push({path:"/shopDetail", query:{shopId:id}});
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


            // if(scrollTop > 1){
            //     // this.$refs.searchStyle.style = "opacity: 1"
            //     // this.$refs.searchStyle.style = "background-rgba: (225,225,225,0)"
            //     // this.$refs.searchStyle.style = "background: red;"
            // }else{
            //     // this.$refs.searchStyle.style = "opacity: 0"
            // }


            // if(scrollTop > 1) {
            //     this.$refs.searchStyle.style = "opacity: 0.3"
            // }
        },
        // 点击拨打电话
        telephone() {
            // 判断用户是否登录 如未登录调转登录页
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
        sa() {
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

                let h = location.href.includes('/home');
                // let h = location.href('/home')
                // let h = window.location.href('/home')
                if( h == true){
                    this.$router.push({
                        path: '/lookShop'
                    })
                }
            }
        },

        loadTop() {
            // let _this = this;
            //...// 加载更多数据

            this.dataPost();
            this.listData();


            setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
            }, 1500);
        },

        // 列表接口调用
        dataPost() {
            let _this = this
            // let url = 'api/shop/getTopDjsk'
            let url = _this.changeData() + '/shop/getTopDjsk'
            axios(url,{
                method: 'post',
            }).then(data => {
                // 列表商铺展示
                console.log(data);
                _this.shopListArr = data.data.content;
                // console.log(_this.shopListArr);
            }).catch(err => {
                console.log(err)
            });
        },

        // 首页展示
        listData() {
            let _this = this
            let url = _this.changeData() + '/show/showInfo'
            console.log(url);
            axios(url,{
                method: 'get',
                // data: obj
                url: url,
            }).then(data => {
                console.log(data);
                // 轮播图
                _this.picArr = data.data.data.imgUrl;
                // // 24小时房源
                _this.PropertyObj = data.data.data.shopNewNum;
                // // 在线商铺
                _this.onLineShopObj = data.data.data.shopLineNum;
                // // 正在找铺
                _this.seekShopObj = data.data.data.peopleNum;
                // 新闻
                _this.prizeList = data.data.data.title;
            }).catch(err => {
                console.log(err)
            });
        },

        // 跳转新闻详情页
        goNews(id){
            this.$router.push({path: '/consult', query:{id: id}});
        },
        // 点击轮播图 跳转详情页
        goNewInfo(id) {
            this.$router.push({path: '/consult', query:{id: id}});
        }

    },
    mounted() {
        // 新闻滚动
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 2500);
        // console.log(this.$refs.box.scrollHeight);
        this.addScroll()
    },
    components:{
        // shopList
    },
    created() {
        this.handleScroll();

        // 接口调用
        this.dataPost();
        this.listData();
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

.homeTop img{
  width: 7.5rem;
  height: 4rem;
}
/*搜索框*/
.searchBar{
    width: 7.5rem;
    height: .8rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 10000000;
    border-bottom: .01rem solid #eee;
    /*opacity: 0; */

    .locate{
        width: 15%;
        line-height: .9rem;
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
        height: .8rem;
        position: relative;
        input{
            width: 95%;
            height: 0.52rem;
            border-radius: 5px;
            background: #f0f1f3;
            color: #ccc;
            font-size: 0.24rem;
            text-indent: 10%;
            margin-top: 0.15rem;
            margin-left: 0.15rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        img{
            width: 0.24rem;
            height: 0.24rem;
            position: absolute;
            top: 0.28rem;
            left: 6%;
        }
    }
    .telephone{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 8%;
        float: right;
        line-height: .8rem;
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

<style type="text/css">
@-webkit-keyframes scrollText1 {
    /*0%{
        -webkit-transform: translateY(-0px);
    }
    20%{
        -webkit-transform: translateY(-30px);
    }
    40%{
        -webkit-transform: translateY(-60px);
    }
    60%{
        -webkit-transform: translateY(-90px);
    }
    80%{
        -webkit-transform: translateY(-120px);
    }
    100%{
        -webkit-transform: translateY(-150px);
    }*/

    0%{
        -webkit-transform: translateY(-0px);
    }
    30%{
        -webkit-transform: translateY(-30px);
    }
    60%{
        -webkit-transform: translateY(-60px);
    }
    100%{
        -webkit-transform: translateY(-90px);
    }
   


}

@keyframes scrollText1 {
   /* 0%{
        transform: translateY(-0px);
    }
    20%{
        transform: translateY(-30px);
    }
    40%{
        transform: translateY(-60px);
    }
    60%{
        transform: translateY(-90px);
    }
    80%{
        transform: translateY(-120px);
    }
    100%{
        transform: translateY(-150px);
    }*/

     0%{
        transform: translateY(-0px);
    }
    30%{
        transform: translateY(-30px);
    }
    60%{
        transform: translateY(-60px);
    }
    100%{
        transform: translateY(-90px);
    }

}

.box3{
    position: relative;
    top: 2px;
    left: 10px;
    width: 200px;
    height: 30px;
    overflow: hidden;
    /*background: yellow;*/
    /*border:1px solid #ccc;*/
}       

.border3{
    top: 0px;
    /* -webkit-animation:scrollText1 8s infinite  cubic-bezier(1,0,0.5,0) ;
    animation:scrollText1 8s infinite  cubic-bezier(1,0,0.5,0) ;*/

    -webkit-animation:scrollText1 15s infinite  cubic-bezier(1,0,0.5,0) ;
   animation:scrollText1 12s infinite  cubic-bezier(1,0,0.5,0) ;
}
 
.border3 div{
    height: 30px;
    /*background: red;*/
    font-size: .3rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
 
.border3:hover{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
}



</style>


