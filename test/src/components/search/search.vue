<template>
  <div class="search">
      <form action="" ref="form" @submit.prevent="onEnvent()">
          <div class="title">
              <div class="sou">
                  <span></span>
                  <input type="type" placeholder="区域、面积、租金、商铺编号" v-model="sousuo" @keydown.13="bianhua()">
                  <b @click="sou()" v-show="close"></b>
              </div>
              <div class="cancle">
                <span @click="back()">取消</span>
              </div>
          </div>
          <div class="history" v-if="result===1">
              <dl>
                <dt>搜索历史 <span @click="clearAll()"></span></dt>
                <dd v-for="(item,index) in arr">{{item}} <span @click="remove(index)"></span></dd>
              </dl>
          </div>
          <div class="noHistory" v-else-if="result===2">
              <div class="img"></div>
              <p>您搜索的内容不存在</p>
          </div>
      </form>
  </div>
</template>

<script>
export default {
    name: 'search',
    data () {
      return {
        result: 1,
        sousuo: "",
        close: false,
        arr: [],
        historyList: [{"history_id":"1","history_name":"霍营"},{"history_id":"2","history_name":"回龙观"},{"history_id":"3","history_name":"国贸"},{"history_id":"4","history_name":"永安里"}]
      }
    },
    mounted(){
      // this.$http.post("/api/youpu/history").then(function(res){
      //   console.log(res)
      //   this.historyList = res.data.home_search_history;
      //
      // }.bind(this)).catch(function(err){
      //   console.log("商店列表页面错误：",err)
      // })
    },
    computed:{

    },
    methods:{
      back(){
        this.$router.go(-1)
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
      onEnvent(){
        // this.result  = 2;
      },
      sou(){
        this.sousuo = "";
        this.close = false;
      },
      bianhua(){
        this.result = 1;
        this.arr.unshift(this.sousuo);
        this.close = true;
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
            top: .35rem;
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
            top: .35rem;
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
            height: 0.57rem;
            border-radius: 0.1rem;
            background: #f0f1f3;
            padding-left: .5rem;
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
