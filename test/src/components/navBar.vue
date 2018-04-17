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
export default {
    name: 'navBar',
    data () {
        return {

        }
    },
    methods:{

    },
    created(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    box-shadow: 0px -0.02rem 10px 0px #d3ddf6;
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
.nav-class .dl1{
    width: 25%;
}
.nav-class .dl2{
    width: 50%;
}
.nav-class .dl3{
    width: 25%;
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
</style>















