<template>
  <div class="recommend">
    <h2><span @click="back()"></span>大咖推荐</h2>
    <div class="content">
      <ul>
        <li class="clearfix">
          <div class="img"><img src="../../../static/images/brand/2.jpg" alt=""></div>
          <p>东方安贞（北京）医院管理有限公建设规划部总监--崔利</p>
        </li>
        <li class="clearfix">
          <div class="img"><img src="../../../static/images/brand/2.jpg" alt=""></div>
          <p>东方安贞（北京）医院管理有限公建设规划部总监--崔利</p>
        </li>
        <li class="clearfix">
          <div class="img"><img src="../../../static/images/brand/2.jpg" alt=""></div>
          <p>东方安贞（北京）医院管理有限公建设规划部总监--崔利</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        methods: {
          back(){
              this.$router.push({path:"/home"})
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  .recommend{
    width: 7.5rem;
    margin: 0 auto;
    background: #f7f8fa;
    h2{
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      font-size: .34rem;
      text-align: center;
      color: #333;
      font-weight: bold;
      position: fixed;
      top: 0;
      background: #fff;
      span{
        width: .34rem;
        height: .34rem;
        position: absolute;
        left: .2rem;
        top: .3rem;
        background: url("../../../static/images/mine/back.png") no-repeat;
        -webkit-background-size: .34rem .34rem;
        background-size: .34rem .34rem;
      }
    }
    .content{
      padding-bottom: .2rem;
      margin-top: 1.1rem;
      ul{
        li{
          width: 6.9rem;
          height: 1.74rem;
          margin: .2rem auto 0;
          background: #fff;
          .img{
            width: 2.6rem;
            height: 1.74rem;
            float: left;
            margin:0 auto .2rem;
            img{
              width: 2.6rem;
              height: 1.74rem;
            }
          }
          p{
            width: 4rem;
            float: right;
            padding-top: .2rem;
            font-size: .28rem;
            color: #333;
          }
        }
      }
    }
  }
</style>
