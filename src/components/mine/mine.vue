<template>
    <div class="mine">
        <div class="mineTop">
        	<div class="headImg"><img src="../../../static/images/mine/headImg.png"></div>
        	<dl>
                <dt  v-if="tel">我的优铺账号</dt>
        		<dt v-else>
                    <router-link to='/login'>登录您的优铺账号>></router-link>
                </dt>

                <dd v-if="tel">{{this.tel}}</dd>
    		    <dd v-else>获得最新商铺信息和专业服务</dd>

        	</dl>
        </div>
        <div class="mineMain">
            <div class="lookShop" v-if='num == false'>今日已查看<span>0</span>套铺源（共10套／日）</div>
        	<div class="lookShop" v-else>今日已查看<span>{{pvCount1 - numIndex}}</span>套铺源（共10套／日）</div>

        	<dl>
                <router-link to='/buymember'>
                    <dt><img src="../../../static/images/mine/member.png"></dt>
                    <dd>会员服务</dd>
                    <i class="more"><img src="../../../static/images/mine/more.png"></i>
                </router-link>
        	</dl>
            <!-- <dl>
                <router-link to='/order'>
                    <dt><img src="../../../static/images/mine/order.png"></dt>
                    <dd>我的订单</dd>
                    <i class="more"><img src="../../../static/images/mine/more.png"></i>
                </router-link>
            </dl> -->
        	<dl>
                <router-link to='/collect'>
            		<dt><img src="../../../static/images/mine/collect.png"></dt>
            		<dd>我的收藏</dd>
                    <i class="more"><img src="../../../static/images/mine/more.png"></i>
                </router-link>
        	</dl>
        	<dl>
                <router-link to='/aboutUP'>
            		<dt><img src="../../../static/images/mine/aboutUP.png"></dt>
            		<dd>关于优铺</dd>
                    <i class="more"><img src="../../../static/images/mine/more.png"></i>
                </router-link>
        	</dl>
        </div>
        <div class="edition">
            <h3>当前版本</h3>
            <h5>V1.0.0</h5>
        </div>
        <div class="quitBtn" v-if="tel" @click="btn()">退出当前帐号</div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
export default {
    name: 'home',
    data () {
        return {
            tel: '',
            numIndex: 0,
            pvCount1: 10,
            num: true
        }
    },
    computed:{

    },
    methods:{
        // loadTop() {
        //     '...'// 加载更多数据
        //     this.$refs.loadmore.onTopLoaded();
        // },
        // loadBottom() {
        //   '...'// 加载更多数据
        //   this.allLoaded = true;// 若数据已全部获取完毕
        //   this.$refs.loadmore.onBottomLoaded();
        // }

        btn(){
            layer.open({
                content: '退出成功!',
                skin: 'msg',
                time: 2
            });
            window.localStorage.clear();
            // location.reload();
            this.$router.push({path: '/login'});
            this.$store.commit("logout");
        }

    },
    mounted() {
      let url =  this.changeData() + '/user/shopCheckedRecords'

      axios(url,{
        method: 'post',
        params:
          {
            account: localStorage.iphone,
            shopId: '0',
            type: "0",
            token: localStorage.token
          },
      }).then(data => {
        console.log(data);
        if(data.data.code == 200){
            this.tel = localStorage.iphone;
            this.numIndex = data.data.count;
        }else if(data.data.code == 401){
            this.num = false;
            localStorage.clear();
        }

      }).catch(err => {
        console.log(err)
      });

      this.pvCount1 = localStorage.pvCount



        // let USERS = window.localStorage.getItem("iphone");
        //
        // this.tel = USERS
        //
        // let userTel = USERS
        //
        // // console.log("-----")
        // // console.log(userTel);
        //
        // // 接口调用
        // let _this = this
        // let url =  this.changeData() + '/user/shopCheckedRecords'
        // // let url =  'http://192.168.1.138:8080/user/shopCheckedRecords'
        // //alert(localStorage.token);
        // if(localStorage.token){
        //   axios(url,{
        //     method: 'post',
        //
        //     params:
        //       {
        //         account: userTel,
        //         shopId: '0',
        //         type: "0",
        //         token: localStorage.token
        //       },
        //
        //   }).then(data => {
        //     console.log(data);
        //     this.numIndex = data.data.count;
        //   }).catch(err => {
        //     console.log(err)
        //   });
        // }
    }

}
</script>

<style scoped lang="scss">
body{
	background: #f7f8fa;
}
.mine{
	width: 7.5rem;
    margin-bottom: 2rem;
}
/*top*/
.mineTop{
	width: 7.5rem;
	height: 3.2rem;
	background: url(../../../static/images/mine/backgroundImage.png);
	background-repeat: no-repeat;
    background-size: 100% 100%;
    .headImg{
        width: 35%;
        height: 3.2rem;
        text-align: center;
        float: left;
        img{
            width: 1.6rem;
            height: 1.6rem;
            margin-top: 0.94rem;
        }
    }
    dl{
        width: 65%;
        height: 3.2rem;
        color: #fff;
        float: left;
        dt{
            margin-top: 1.16rem;
            margin-bottom: 0.4rem;
            font-size: 0.34rem;
            padding-bottom: 0.4rem;
            border-bottom: 0.01rem solid #fff;
            a{
                color: #fff;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
        dd{
            font-size: 0.28rem;
        }
    }
}

/*main*/
.mineMain{
    width: 7.5rem;
}
.lookShop{
    height: 0.86rem;
    line-height: 0.86rem;
    text-align: center;
    background: #f7f8fa;
    color: #333;
    font-size: 0.28rem;
    border-bottom: 0.01rem solid #eaeaea;
    span{
        margin-left: .1rem;
        margin-right: .1rem;
        color: red;
    }
}
.mineMain dl{
    width: 7.5rem;
    height: 0.98rem;
    border-bottom: 0.01rem solid #eaeaea;
    background: #fff;
    dt{
        width: 18%;
        height: 0.98rem;
        text-align: center;
        float: left;
        line-height: 0.9rem;
        img{
            width: 0.5rem;
            height: 0.5rem;
        }
    }
    dd{
        width: 70%;
        font-size: 0.3rem;
        color: #333;
        font-weight: 500;
        float: left;
        line-height: 0.98rem;
    }
}

.more{
    width: 10%;
    line-height: 0.98rem;
    text-align: center;
    display: inline-block;
    float: right;
    img{
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
    }
}

/*edition*/
.edition{
    height: 0.98rem;
    line-height: 0.98rem;
    background: #fff;
    border-top: 0.01rem solid #eaeaea;
    border-bottom: 0.01rem solid #eaeaea;
    margin-top: 0.2rem;
    h3{
        font-size: 0.3rem;
        color: #333;
        font-weight: 500;
        float: left;
        padding-left: 0.3rem;
    }
    h5{
        font-size: 0.3rem;
        color: #989898;
        float: right;
        padding-right: 0.3rem;
    }
}
.quitBtn{
    width: 80%;
    height: 0.8rem;
    background: #eaeaea;
    color: #898989;
    font-size: 0.3rem;
    line-height: .8rem;
    text-align: center;
    margin-left: 10%;
    margin-top: .58rem;
}

</style>













