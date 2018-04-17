<template>
    <div class="mine">
        <div class="mineTop">
        	<div class="headImg"><img src="../../../static/images/mine/headImg.png"></div>
        	<dl>
        		<dt>
                    <router-link to='/login'>登录您的优铺账号>></router-link>
                </dt>
                <!-- <dt>我的优铺账号</dt>   -->
    		    <dd>获得最新商铺信息和专业服务</dd>
                <!-- <dd>13240967310</dd> -->
        	</dl>
        </div>
        <div class="mineMain">
        	<div class="lookShop">今日已查看<span>3</span>套铺源（共10套／日）</div>
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
            <h5>V1.2.1</h5>
        </div>
        <!-- <div class="quitBtn">退出当前帐号</div> -->
    </div> 
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            // list: [{
            //     images: '../../../static/images/home/shopImg.png',
            //     reach: '朝阳-双井|100m²',
            //     address: '广平门黄平路平米商店黄平路平米商店黄平路平米商店',
            //     money: '6.76'
            //   }, {
            //     images: '../../../static/images/home/shopImg.png',
            //     reach: '朝阳-双井|100m²',
            //     address: '广平门黄平路平米商店...',
            //     money: '6.76'
            //   }, {
            //     images: '../../../static/images/home/shopImg.png',
            //     reach: '朝阳-双井|100m²',
            //     address: '广平门黄平路平米商店...',
            //     money: '6.76'
            //   }, {
            //     images: '../../../static/images/home/shopImg.png',
            //     reach: '朝阳-双井|100m²',
            //     address: '广平门黄平路平米商店...',
            //     money: '6.76'
            // }],
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
    },
    created() {
         
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













