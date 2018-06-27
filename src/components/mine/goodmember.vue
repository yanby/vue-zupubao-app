<template>
    <div class="goodmember">
      <h2><span @click="back()"></span>我的会员</h2>
      <div class="wrap">
        <div class="member" v-for="item in list">
          <div class="member-msg" v-if="item.memberType === '0'">
              <p>购买日：{{item.createTime}}</p>
          </div>
          <div class="vip-msg" v-if="item.memberType === '1'">
            <p>购买日：{{item.createTime}}</p>
          </div>
          <div class="member-tequan" v-if="item.memberType === '0'">
              <div class="member-detail">
                <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)</div>
                <p><span>到期日：{{item.endTime}}</span><router-link to="/buymember">会员延期</router-link></p>
              </div>
          </div>
        <div class="vip-tequan" v-if="item.memberType === '1'">
          <div class="vip-detail">
            <div>您今日还可免费查看<span>{{item.restNum}}套</span>商铺 (共{{item.totalNum}}套/日)<br>一对一专属服务，3个月内帮您匹配{{item.size}}的商铺</div>
            <p><span>到期日：{{item.endTime}}</span><router-link :to="{name:'buymember',query:{news:'1'}}">VIP延期</router-link></p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          list: "",
          huiyuan: "",
          vip: ""
        }
      },
      mounted(){
        this.init();
      },
      methods: {
        back(){
          this.$router.push({path:"/mine"})
        },
        init(){
          var that = this;
          var data = {
            account : localStorage.iphone,
            token: localStorage.token
          }
          this.$http(this.changeData() + "/member/getMyMember",{
            method: 'post',
            params: data
          }).then(res => {
            console.log(res)
            this.list = res.data.data;
            try{
              that.list.forEach(function (item,index) {
                item.createTime = getNewDate(item.createTime);
                item.endTime = getNewDate(item.endTime);
              })
            }catch(e){
              console.log(e)
            }
          }).catch(err => {
            console.log(err)
          });
        }
      }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  .goodmember{
    background: #fff;
    h2{
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .34rem;
      font-weight: bold;
      border-bottom: 0.01rem solid #eaeaea;
      position: fixed;
      top: 0;
      background: #fff;
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
    }
    .wrap{
      margin-top: .9rem;
    }
    .member{
      padding-top: .4rem;
      .vip-msg{
        width: 7.5rem;
        height: 3.49rem;
        margin: 0 auto;
        background: url("../../../static/images/mine/vip-bg.png") no-repeat;
        background-size: 7.5rem 3.49rem;
        div{
          padding-top: 1.5rem;
          font-size: .3rem;
          height: .3rem;
          line-height: .3rem;
          color: #fff;
          text-align: center;
        }
        p{
          padding-top: 1.9rem;
          font-size: .22rem;
          color: #fff;
          text-align: center;
        }
      }
      .vip-tequan{
        h3{
          padding: 0 .2rem;
          height: .9rem;
          line-height: .9rem;
          font-size: .34rem;
          color: #111;
          border-bottom: .01rem solid #eaeaea;
          span{
            display: inline-block;
            width: .4rem;
            height: .37rem;
            background: url("../../../static/images/mine/tequan.png") no-repeat;
            background-size: .4rem .37rem;
            vertical-align: text-bottom;
            margin-right: .2rem;
          }
        }
        .vip-detail{
          padding: .3rem .68rem;
          div{
            font-size: .3rem;
            line-height: .5rem;
            color: #666;
            margin-bottom: .42rem;
            span{
              color: #e8584f;
            }
          }
          p{
            span{
              color: #ccc;
              font-size: .28rem;
              margin-right: .4rem;
            }
            a{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              display: inline-block;
              width: 1.8rem;
              height: .49rem;
              line-height: .53rem;
              font-size: .28rem;
              background: #ffb678;
              text-align: center;
              color: #fff;
              border-radius: .1rem;
            }
          }
        }
      }
      .member-msg{
        width: 7.5rem;
        height: 3.49rem;
        margin: 0 auto;
        background: url("../../../static/images/mine/member-bg.png") no-repeat;
        background-size: 7.5rem 3.49rem;
        div{
          padding-top: 1.5rem;
          font-size: .3rem;
          height: .3rem;
          line-height: .3rem;
          color: #fff;
          text-align: center;
        }
        p{
          padding-top: 1.9rem;
          font-size: .22rem;
          color: #fff;
          text-align: center;
        }
      }
      .member-tequan{
        h3{
          padding: 0 .2rem;
          height: .9rem;
          line-height: .9rem;
          font-size: .34rem;
          color: #111;
          border-bottom: .01rem solid #eaeaea;
          span{
            display: inline-block;
            width: .4rem;
            height: .37rem;
            background: url("../../../static/images/mine/tequan.png") no-repeat;
            background-size: .4rem .37rem;
            vertical-align: text-bottom;
            margin-right: .2rem;
          }
        }
        .member-detail{
          padding: .3rem .68rem;
          div{
            font-size: .3rem;
            height: .3rem;
            line-height: .3rem;
            color: #666;
            margin-bottom: .42rem;
            span{
              color: #e8584f;
            }
          }
          p{
            span{
              color: #ccc;
              font-size: .28rem;
              margin-right: .4rem;
            }
            a{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              display: inline-block;
              width: 1.8rem;
              height: .49rem;
              line-height: .53rem;
              font-size: .28rem;
              background: #ffb678;
              text-align: center;
              color: #fff;
              border-radius: .1rem;
            }
          }
        }
      }
    }
    .vip{

    }
  }
</style>
