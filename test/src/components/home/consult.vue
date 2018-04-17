<template>
    <div class="consult">
        <div class="nav clearfix">
            <router-link to='/home'>
                <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="">
            </router-link>
        </div>
        <div class="wrap">
            <h1>零售地产积极转型 商业地产租金小幅回暖</h1>
            <p>“西单寸土寸金，每一寸地方租金和坪效都非常高。但是唯独商场9层是尴尬楼层。十层是电影院，六七八是餐饮楼层。9层作为高层零售楼层，又不具备餐饮条件。再加上楼层动线比较怪，属于半循环动线。因此，9层只能租给大商，前几年也一直做大商，但是清退之后效果一直不理想。因此，从2016年初开始，商场团队经过长时间探讨，决定将9层改为样街。也就是，将零售楼层切成非常小的铺，把喜欢街区文化的年轻人群提纯，从而吸附在这。”西单大悦城相关负责人告诉21世纪经济报道记者。</p>
            <p>近年来，购物中心饱受同质化困扰。今年三季度，多个购物中心推出新的主题街区。例如：半岛广场“有氧公社”、西单大悦城“样街”、石景山万达广场工业主题街区。</p>
            <p>世邦魏理仕中国华北区顾问及交易服务商业部主管希诺表示：“以零售和体验业态复合为特点的生活方式类门店扩张日趋活跃，此外王府井等核心商圈年底将迎来多个国际品牌的旗舰店，这两类大面积租户将在优质零售物业租户组合中占据日益重要的位置，为北京核心和新兴商圈注入新的活力。”</p>
            <p>酷玩之地</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'consult',
    data () {
        return {
            prizeList: [
            { name: 0 },
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 }
          ],
          activeIndex: 0
        }
    },
    computed:{
        top() {
            return - this.activeIndex * 50 + 'px';
        }
    },
    methods:{
        
    },
    mounted() {
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 1000);
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

.nav{
    width: 7.1rem;
    height:1rem;
    margin:0 auto;
    padding: 0.2rem 0.2rem 0 0.2rem;
    border-bottom: .01rem solid #eee;
}
.navBack{
    width: 0.32rem;
    height: 0.36rem;
    margin-top: 0.26rem;
}
.wrap{
    width: 6.7rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}

.wrap h1 {
    font-size: 0.36rem;
    margin: 0.3rem 0rem; 
    text-align: center;
}

.wrap p {
    font-size: 0.3rem;
    line-height: 0.5rem;
    color: #333;
    text-indent: 2em;
    margin: 0.7rem 0;
    text-align: justify;
}


</style>













