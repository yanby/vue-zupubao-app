<template>
    <div class="navBar">
        <div class="nav-class">
            <dl class="dl1">
                <router-link to='/home' active-class="active1">
                    <dd>
                        <i class='icon1'></i>
                    </dd>
                    <dt>首页</dt>
                </router-link>
            </dl>

            <dl class="dl2">
                <router-link to='/lookShop' active-class="active2">
                    <dd>
                        <i class='icon2'></i>
                    </dd>
                    <dt>查看商铺</dt>
                </router-link>
            </dl>

            <dl class="dl4">               
                <router-link to='/publish' active-class="active4">
                    <dd>
                        <i class='icon4'></i>
                    </dd>
                    <dt>发布</dt>
                </router-link>             
            </dl>

            <dl class="dl5">
                <span @click="infoBtn()">
                    <!-- <a class="active5">        -->
                    <router-link to='/message' active-class="active5">
                        <dd>
                            <img src="../../static/images/mine/red-ellipse.png" v-if="this.isCount == 1" class="red-ellipse">
                            <!-- <img src="../../static/images/mine/red-ellipse.png" class="red-ellipse"> -->
                            <i class='icon5'></i>
                        </dd>
                        <dt>消息</dt>
                    </router-link>
                    <!-- </a> -->
                </span>
            </dl>

            <dl class="dl3">
                <router-link to='/mine' active-class="active3">
                    <dd>
                        <i class='icon3'></i>
                    </dd>
                    <dt>我的</dt>
                </router-link>
            </dl>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import axios from 'axios';
import qs from "qs";
import Bus from '../../static/js/bus.js'
export default {
    name: 'navBar',
    data () {
        return {
            isCount: null,
        }
    },
    components:{

    },
    watch: {
        
    },
    methods:{
        infoBtn(){
            if(localStorage.iphone){
                this.isMessage();
                this.$router.push({path:"/message"});             
            }else{
                this.$router.push({path:"/login",query:{"urlType":"message"}});  
            }    
        },
        isMessage(){
            let url =  this.changeData() + '/member/auth/getMsgStatus';
            axios(url,{
                method: 'post',
                params:
                {
                    cityId: "110100"  //string  是   
                },
            }).then(data => {
                // console.log(data);
                this.isCount = data.data.count;
            }).catch(err => {
                console.log(err)
            });
        },
    },
    mounted() {
        let self = this
        Bus.$on('msg', (e) => {
            this.isCount = null;
        })　　　
    },
    created(){   
        this.isMessage();       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav{
    width: 100%;
}
.nav-class{
    width: 7.5rem;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    color: #898989;
    /*border-top: 0.008rem solid #d3ddf6;*/
    font-size: 0.2rem;
    box-shadow:2px 0px 12px rgba(132,166,195,0.14);
    z-index: 100;
}
.nav-class dl{
    width: 33.33%;
    /*background-color: #fff;*/
    float: left;
    text-align: center;
    padding-top: .1rem;
}
.nav-class dl a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  display: inline-block;
  width: 100%;
  height: 100%;
}
.nav-class dl{
    width: 20%;
}
.dl5{ 
    dd{
        position: relative;
        .red-ellipse{
            width: .16rem;
            height: .16rem;
            position: absolute;
            top: 0px;
            right: 30%;
        }
    }   
}

.nav-class dd{
    height: 0.45rem;
    width: 100%;
}
.nav-class dt{

    font-weight: bold;
}
.nav-class dd>i{
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
}
.nav-class dd>.icon4{
    display: inline-block;
    height: 1rem;
    width: 1rem;
    position: relative;
    top: -.5rem;
}
.icon1{
    background: url(../../static/images/home/homePage.png) no-repeat;
    background-size: 100% 100%;
}
.icon2{
    background: url(../../static/images/home/shop.png) no-repeat;
    background-size: 100% 100%;
}
.icon3{
    background: url(../../static/images/home/mine.png)no-repeat;
    background-size: 100% 100%;
}
.icon4{
    background: url(../../static/images/home/publish.png) no-repeat;
    background-size: 100% 100%;
}
.icon5{
    background: url(../../static/images/home/info.png)no-repeat;
    background-size: 100% 100%;
}

.active1 dt{color: #65a8ff;}
.active1 .icon1{
    background: url(../../static/images/home/homePage2.png)no-repeat;
    background-size: 100% 100%;
}
.active2 dt{color: #65a8ff;}
.active2 .icon2{
    background: url(../../static/images/home/shop2.png)no-repeat;
    background-size: 100% 100%;
}
.active3 dt{color: #65a8ff;}
.active3 .icon3{
    background: url(../../static/images/home/mine2.png)no-repeat;
    background-size: 100% 100%;
}
.active4 dt{color: #65a8ff;}
.active4 .icon4{
    background: url(../../static/images/home/publish2.png)no-repeat;
    background-size: 100% 100%;
}
.active5 dt{color: #65a8ff;}
.active5 .icon5{
    background: url(../../static/images/home/info2.png)no-repeat;
    background-size: 100% 100%;
}
/*.active5:active {
    dt{
        color: #65a8ff;
    }
    .icon5{
        background: url(../../static/images/home/info2.png)no-repeat;
        background-size: 100% 100%;
    }
} */
</style>















