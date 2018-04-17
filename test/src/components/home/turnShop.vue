<template>
    <div class="turnShop">
        <div class="main">
            <div class="nav clearfix">
                <router-link to='/home'>
                    <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="">
                </router-link>
                <h2 class="navTitle pull-left">委托转铺</h2>
            </div>
            <div class="wrap">
                <div class="wrap-input">
                    <input type="text" name="" placeholder="输入您的手机号码 优铺专家马上服务" maxlength="11" class="txt-input">
                    <!-- <input name="" type="submit" value="提 交" class="subBtn"/>          -->
                    <div class="wrap-input-img"><img src="../../../static/images/home/turnBtn.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'turnShop',
    data () {
        return {

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
/*浮动*/
.pull-right{
    float: right;
}
.pull-left{

    float: left;
}
.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}
.clearfix {
    zoom: 1;
}

input::-webkit-input-placeholder{
    color: #ce961f;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ce961f;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ce961f;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:  #ce961f;
}

.main{
    width: 7.5rem;
    margin: 0 auto;
    background: #f0eff6;
}
.nav{
    width: 7.1rem;
    height:1rem;
    background: #fff;
    margin:0 auto;
    padding: 0.2rem 0.2rem 0 0.2rem;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 10000;
}
.nav a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.navBack{
    width: 0.32rem;
    height: 0.36rem;
    margin-top: 0.26rem;
}
.navTitle{
    height: 1rem;
    width: 6.4rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #111;
    text-align: center;

}
.wrap{
    width: 7.5rem;
    height: 14.34rem;
    margin: 0 auto;
    background: url("../../../static/images/home/turnShop2.png") no-repeat top center;
    background-size: 7.5rem 14.34rem;
    position: relative;
    margin-top: 1rem;
}
.wrap-input{
    width: 7.5rem;
    height: 3rem;
    position: absolute;
    bottom: 0px;
    left: 0px;
}

.wrap-input input{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 80%;
    height: 0.8rem;
    border-radius: 10px;
    margin-left: 10%;
}
.txt-input{
    margin-top: 0.4rem;
    margin-bottom: 0.3rem;
    font-size: 0.3rem;
    background-color: #fae49b;
    text-indent: 0.3rem;
    color: #da9a00;
}
.wrap-input-img{
    /*background-color: #ed5f00;
    font-size: 0.36rem;
    color: #fff;
    font-weight: 600;
    box-shadow: 1px 0px 5px 2px #d96800;*/

    width: 82%;
    height: 1rem;
    margin-left: 9%;
    img{
        width: 100%;
        height: 1rem;
    }


}


/*.subBtn {
    background-color: #ed5f00;
    font-size: 0.36rem;
    color: #fff;
    font-weight: 600;
    box-shadow: 1px 0px 5px 2px #d96800;
}*/


</style>













