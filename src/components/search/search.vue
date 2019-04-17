<script src="../../../../vue-app/node_modules/nuxt/lib/core/module.js"></script>
<template>
<div class="search">
    <div class="title">
        <div class="sou">
            <span></span>
            <form action="" class="">
                <input class="keyword" placeholder="区域/商圈/业态/商铺编号" @focus="shiqu()" v-model="sousuo">
                <b @click="sou()" v-show="close"></b>
            </form>
        </div>
        <div class="cancle">
            <span @click="back()">取消</span>
        </div>
    </div>
    <div class="history" v-if="result===1">
        <dl>
            <dd v-for="(item,index) in arr">{{item}} <span @click="remove(index)"></span></dd>
        </dl>
    </div>
    <div class="noHistory" v-else-if="result===2">
        <div class="img"></div>
        <p>您搜索的内容不存在</p>
    </div>
</div>
</template>

<script>
import qs from 'qs';
export default {
    name: 'search',
    data () {
        return {
            result: "",
            sousuo: "",
            close: false,
            arr: [],
            list: [],
            shopMsg: ""
        }
    },
    mounted(){
        var that = this;
        $(".keyword").on('keypress',function(e) {
            var keycode = e.keyCode;
            if(keycode=='13') {
                e.preventDefault();
                //请求搜索接口
                that.bianhua()
            }
        })
    },
    computed:{

    },
    methods:{
        shiqu(){
            this.close = true;
        },
        back(){
            if(this.$route.query.lookShop){
                this.$router.push({path:"/lookShop"})
            }else if(this.$route.query.home){
                this.$router.push({path:"/home"})
            }else{
                this.$router.go(-1)
            }
        },
        remove(index){
            if(this.arr.length <= 1){
                this.arr.splice(index,1)
                this.result = 0;
            }else{
                this.arr.splice(index,1)
            }
        },
        clearAll(){
            this.arr = [];
            this.result = 0;
        },
        sou(){
            this.sousuo = "";
            this.close = false;
        },
        bianhua(){
            var reg = /^\s*$/g;
            var data = {
                cityId: sessionStorage.cityId, //城市id
                pageSize: "10", //每页数据量
                pageNum: "1", //页码从1开始
                search: this.sousuo,
            }
            if(reg.test(this.sousuo) == false){
                this.$http.post(this.changeData() + "/shop/getShopList",qs.stringify(data)).then(function(res){
                    // console.log(res)
                    this.shopMsg = res.data.shopList;
                    if(this.shopMsg.length == 0){
                        this.result = 2;
                    }else{
                        sessionStorage.search = this.sousuo;
                        this.$router.push({path:"/lookShop",query:{search:this.sousuo}})
                    }
                }.bind(this)).catch(function(err){
                    console.log("搜索页面错误：",err)
                })
            }else{
                layer.open({
                    content: '搜索内容不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
        }
    },
    created() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
.search{
    width: 7.5rem;
    height: 13.34rem;
    overflow: scroll;
    margin: 0 auto;
    background: #fff;
    position: relative;
    .title{
        height: .9rem;
        line-height: .9rem;
        padding: 0 .2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #eaeaea;
        .sou{
          span{
            position: absolute;
            left: .4rem;
            top: .34rem;
            width: .26rem;
            height: .24rem;
            background: url("../../../static/images/search/search.png") no-repeat;
            background-size: .26rem .24rem;
          }
          input[type=search]::-webkit-input-placeholder{
            line-height: .34rem;
          }
          input[type=search]::-webkit-search-cancel-button{
            -webkit-appearance: none;
          }
          b{
            position: absolute;
            top: .34rem;
            right: 1.05rem;
            width: .26rem;
            height: .26rem;
            line-height: .26rem;
            margin-right: .1rem;
            background: url("../../../static/images/search/close.png") no-repeat;
            background-size: .26rem .26rem;
          }
          input{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 5.8rem;
            height: 0.6rem;
            /*line-height: .57rem;*/
            border-radius: 0.1rem;
            background: #f0f1f3;
            padding-left: .6rem;
          }
        }
        .cancle{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          span{
            font-size: .26rem;
            color: #111;
          }
        }
      }
    .history{
      padding: 0 .2rem;
      dl{
        dt{
          font-size: .32rem;
          height: .88rem;
          line-height: .88rem;
          color: #333;
          border-bottom: 0.01rem solid #eaeaea;
          position: relative;
          span{
            position: absolute;
            right: 0;
            top: .4rem;
            width: .3rem;
            height: .3rem;
            background: url("../../../static/images/search/alldelete.png") no-repeat;
            background-size: .3rem .3rem;
          }
        }
        dd{
          font-size: .32rem;
          height: .88rem;
          line-height: .88rem;
          color: #898989;
          border-bottom: 0.01rem solid #eaeaea;
          position: relative;
          span{
            position: absolute;
            right: 0;
            top: .4rem;
            width: .22rem;
            height: .22rem;
            background: url("../../../static/images/search/close-children.png") no-repeat;
            background-size: .22rem .22rem;
          }
        }
      }
    }
    .noHistory{
      padding-top: 2.8rem;
      text-align: center;
      .img{
        width: 2rem;
        height: 1.31rem;
        margin: 0 auto;
        background: url("../../../static/images/search/search-bg.png") no-repeat;
        background-size: 2rem 1.31rem;
        margin-bottom: .4rem;
      }
      p{
        font-size: .3rem;
        color: #898989;
      }
    }
  }
</style>
