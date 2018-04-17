<template>
  <div class="shopCollect">
    <h2><span @click="back()"></span><b>我的收藏</b><i v-show="yes===1" @click="compile()">编辑</i><i v-show="yes===2" @click="complete()">完成</i></h2>
    <!--<shopList :child-msg="yes"></shopList>-->

    <div class="detail">
      <ul>
        <li v-for="(item,index) in shopMsg" @click="go(item.id)">
          <div class="wrap">
            <div class="select" v-if="yes===2">
              <div class="check" @click.stop="xuan($event,item.shopCollId)"></div>
            </div>
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


    <div class="noOrder" v-show="yes===0">
        <dl>
            <dt>
                <img src="../../../static/images/mine/noOrders.png">
            </dt>
            <p>暂无收藏信息</p>
            <dd>
                <router-link to="/lookShop">
                    <span>立即收藏</span>
                </router-link>
            </dd>
        </dl>
    </div>


    <div class="delete" @click="remove()" v-show="yes===2">删除</div>
  </div>

</template>

<script>
  import qs from 'qs';
  export default {
    data(){
      return {
        yes: "",
        select: 0,
        shopMsg: "",
        ids: "",
        arr: []
      }
    },
    mounted(){
      this.init()
    },
    components:{

    },
    methods:{
      init(){
        let USERS = window.localStorage.getItem("iphone");

        var data = {
          userId: USERS,
          token: localStorage.token
        }

        this.$http.post(this.changeData() + "/shopCollection/getShopCollection",qs.stringify(data)).then(function(res){
          console.log(res);

          if(res.data.code=="200"){
            this.shopMsg = res.data.content;
            if(this.shopMsg.length==0){
              this.yes = 0;
            }else{
              this.yes = 1;
            }
          }else{
            this.yes = 0;
          }


        }.bind(this)).catch(function(err){
          console.log("收藏页面错误：",err)
        })
      },
      go(id){
        this.$router.push({path: "/shopDetail",query:{shopId:id}})
      },
      back(){
        this.$router.go(-1);
      },
      compile(){
        this.yes = 2;
        this.select = 1;
        this.tab = 1;
      },
      complete(){
        this.yes = 1;
        this.select = 0;
        this.tab = 0;
      },
      remove(){
        var that = this;

        var data = {
          shopIds : this.ids,
          token: localStorage.token
        }

        let USERS = window.localStorage.getItem("iphone");

        var data2 = {
          userId: USERS,
          token: localStorage.token
        }
        this.$http.post(this.changeData() + "/shopCollection/batchDele",qs.stringify(data)).then(function(res){
          console.log(res)
          if(res.data.code == 200){
            layer.open({
              content: '删除成功！',
              skin: 'msg',
              time: 2 //2秒后自动关闭
            });
            that.$http.post(this.changeData() + "/shopCollection/getShopCollection",qs.stringify(data2)).then(function(res){
              console.log(res);
              that.shopMsg = res.data.content;
              console.log(that.shopMsg)
              that.arr = [];
              if(that.shopMsg.length==0){
                that.yes = 0;
              }else{
                that.yes = 1;
              }

            }.bind(that)).catch(function(err){
              console.log("收藏页面错误：",err)
            })
          }
        }.bind(this)).catch(function(err){
          console.log("收藏页面错误：",err)
        })
      },
      xuan(e,id){
        if($(e.srcElement).hasClass("cur")){
          $(e.srcElement).removeClass("cur")
        }else{
          this.tab = 3;
          $(e.srcElement).addClass("cur")
          this.arr.push(id);
          this.ids = this.arr.join(",")
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/shopList.scss";
  .detail{
    padding-top: .91rem;
    padding-bottom: 0;
  }
  .shopCollect{
    width: 7.5rem;
    margin: 0 auto;
    h2{
      position: fixed;
      top: 0;
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      background: #fff;
      z-index: 100;
      border-bottom: .01rem solid #eaeaea;
      span{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .3rem;
        width: .34rem;
        height: .34rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .34rem .34rem;
      }
      b{
        font-size: .34rem;
      }
      i{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        right: .2rem;
        top: 0;
        font-size: .3rem;
      }
    }
    .delete{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin: 0 auto;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #64AAFF;
      color: #fff;
      font-size: .34rem;
    }
  }

  .noOrder{
    width: 7.5rem;
    .noOrderTop{
        height: .9rem;
        text-align: center;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        position: relative;
        h3{
            width: 75%;
            line-height: 1rem;
            font-size: 0.36rem;
            color: #333;
            float: left;
            text-align: center;
        }
        i{
            display: inline-block;
            width: 13%;
            height: 1rem;
            line-height: 1rem;
            float: left;
            img{
                width: 0.4rem;
                height: 0.4rem;
            }
        }
    }
    dl{
        width: 7.5rem;
        /*height: 6rem;*/
        /*background: pink;*/
        text-align: center;
        dt{
            /*width: 3rem;
            height: 3rem;*/
            /*background: red;*/
            margin-top: 1.4rem;
            img{
                width: 3rem;
                height: 3rem;
            }
        }
        p{
            font-size: .28rem;
            color: #898989;
            margin-top: .38rem;
            margin-bottom: .5rem;
        }
        dd{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
            span{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
                display: inline-block;
                width: 3rem;
                height: .89rem;
                background: #47abff;
                line-height: .89rem;
                color: #fff;
                font-size: .34rem;
                border-radius: 5px;
            }
        }
    }
}
</style>
