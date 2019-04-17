<template>
<div class="qiuzu">
    <div class="back-model" v-if="backModel">
        <div class="model-inner">
            <div class="txt">确定取消本次发布？</div>
            <div class="copation">
                <span @click="backModel=false">取消</span>
                <span @click="confirm()">确定</span>
            </div>
        </div>
    </div>
    <div class="aera-model" v-show="aeraModel" @click="aeraModel = !aeraModel">
        <div class="model-inner">
            <ul class="one">
                <li class="one-child" v-for="item in areas" @click.stop="areaFun($event,item)">
                    {{item.name}}
                    <ul class="two">
                        <li v-for="item1 in areaChild" @click.stop="areaChildFun($event,item1)">{{item1.childName}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="jingying-model" v-show="jingyingModel" @click="jingyingModel = !jingyingModel">
        <div class="model-inner">
            <ul class="one">
                <li class="one-child" v-for="item in shopBusinessTypes" @click.stop="jingyingFun($event,item)">
                    {{item.name}}
                    <ul class="two">
                        <li v-for="item1 in jingyingChild" @click.stop="jingyingChildFun($event,item1)">{{item1.childName}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="type-model" v-show="typeModel" @click="typeModel = !typeModel">
        <div class="model-inner">
            <ul class="one">
                <li class="one-child" v-for="item in type" @click.stop="typeFun($event,item)">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </div>
    <h2><span @click="back()"></span>求租信息</h2>
    <div class="content">
        <ul>
            <li>
                <span>计划经营</span>
                <div class="xuan" v-model="jingying" @click="jingyingModelFun()">{{jingying}}<i></i></div>
            </li>
            <li>
                <span>面积</span>
                <input type="number" placeholder="最小" v-model="xiao" pattern="[0-9]*">|&nbsp;&nbsp;<input type="number" placeholder="最大" v-model="da" pattern="[0-9]*"><b>平米</b>
            </li>
            <li>
                <span>租金范围</span>
                <input type="number" placeholder="最少" v-model="shao" pattern="[0-9]*">|&nbsp;&nbsp;<input type="number" placeholder="最多" v-model="duo" pattern="[0-9]*"><b>元/月</b>
            </li>
        </ul>
        <ul style="margin-top: .2rem;">
            <li>
                <span>区域</span>
                <div class="xuan" v-model="area" @click="aeraModelFun()">{{area}}<i></i></div>
            </li>
            <li>
                <span>商铺类型</span>
                <div class="xuan" @click="typeModelFun()" v-model="typeName">{{typeName}}<i></i></div>
            </li>
        </ul>
        <ul style="margin-top: .2rem;">
            <li><span>联系人</span><input type="text" placeholder="请填写" v-model="lianxi"></li>
        </ul>
    </div>
    <div class="next" @click="go()">发布</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from 'axios';
import qs from "qs";
export default {
    data(){
        return{
            backModel: false,
            num: 0,
            num1:0,
            area: "请选择",//区域
            areas: "",//一级列表
            areaId: "",//区域id
            areaChildId: "",//区域二级id
            areaName: "",//一级名称
            areaChild:"",//二级列表
            shopBusinessTypes: "",//业态
            type: "",//类型
            aeraModel: false,
            jingying: "请选择",
            jingyingModel: false,//
            jingyingName: "",
            jingyingId: "",
            jingyingChild: "",
            jingyingChildId: "",
            typeId: "",
            typeName: "请选择",
            typeModel: false,
            xiao: "",
            da: "",
            duo:"",
            shao: "",
            lianxi: ""
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        back(){
            this.backModel = true;
        },
        init(){
            this.$http(this.changeData() + "/publish/getAreas",{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    type: "2"
                }
            }).then(res => {
                // console.log(res);
                this.areas = res.data.areas;
                this.shopBusinessTypes = res.data.shopBusinessTypes;
                this.type = res.data.type;
            }).catch(err => {
                console.log(err)
            });
        },
        //点击确认退出
        confirm(){
            if(this.$route.query.type){
                this.$router.push({path:"/myPublish",query:{urlType:2}})
            }else{
                this.$router.go(-1);
            }
        },
        //点击区域请选择
        aeraModelFun(){
            var that = this;
            this.aeraModel = true;
            setTimeout(function () {
                if(that.num==0){
                    $(".aera-model .one li").eq(0).click();
                    that.num++;
                }
            },200)
        },
        //获取区域二级
        areaFun(e,item){
            this.areaName = item.name;
            this.areaId = item.id;
            this.areaChild = item.childList;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        areaChildFun(e,item){
            this.aeraModel = false;
            this.areaChildId = item.childId;
            this.area = this.areaName +"-"+ item.childName;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        //点击计划经营请选择
        jingyingModelFun(){
            var that = this;
            this.jingyingModel = true;
            setTimeout(function () {
                if(that.num1==0){
                    $(".jingying-model .one li").eq(0).click();
                    that.num1++;
                }
            },200)
        },
        jingyingFun(e,item){
            this.jingyingName = item.name;
            this.jingyingId = item.id;
            this.jingyingChild = item.childList;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        jingyingChildFun(e,item){
            this.jingyingModel = false;
            this.jingyingChildId = item.childId;
            this.jingying = this.jingyingName +"-"+ item.childName;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        typeModelFun(e,item){
            this.typeModel = true;
        },
        typeFun(e,item){
            this.typeModel = false;
            this.typeName = item.name;
            this.typeId = item.id;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        go(){
            if(this.jingying == "请选择"){
                Toast("请选择计划经营")
            }else if(this.xiao == ""){
                Toast("请填写最小面积")
            }else if(this.da == ""){
                Toast("请填写最大面积")
            }else if(this.shao == ""){
                Toast("请填写最少面积")
            }else if(this.duo == ""){
                Toast("请填写最多面积")
            }else if(this.area == "请选择"){
                Toast("请选择区域")
            }else if(this.typeName == "请选择"){
                Toast("请选择商铺类型")
            }else if(this.lianxi == ""){
                Toast("请填写联系人")
            }else{
                this.$http({
                    url: this.changeData() + "/publish/auth/getPublishInfo",
                    method: 'post',
                    params: {
                        cityId: sessionStorage.cityId, //市id
                        parentManageType: this.jingyingId, //一级业态id
                        sonManageType: this.jingyingChildId, //二级业态id
                        areaLower: this.xiao, //面积下限
                        areaUpper: this.da, //面积上限
                        monthlyRentLower: this.shao, //月租金下限
                        monthlyRentUpper: this.duo, //月租金上限
                        type: "2", // 2:商铺求租
                        areaId: this.areaId, // 区域id
                        businessAreaId: this.areaChildId, // 商圈id
                        linkMan: this.lianxi, // 联系人
                        shopType: this.typeId // 商铺类型id
                    }
                }).then(res => {
                    // console.log(res)
                    if(res.data.code=="101"){
                        Toast("发布成功")
                        this.$router.push({path:"/myPublish",query:{urlType:2}})
                    }else{
                        Toast(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999;
    font-size: .26rem;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #999;
    font-size: .26rem;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #999;
    font-size: .26rem;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #999;
    font-size: .26rem;
  }
.qiuzu{
  width: 7.5rem;
  margin: 0 auto;
  height: 100vh;
  .back-model{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index:999;
    .model-inner{
      width: 5.64rem;
      height: 2.84rem;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -2.82rem;
      margin-top: -1.42rem;
      .txt{
        height: 1.96rem;
        line-height: 1.96rem;
        text-align: center;
      }
      .copation{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 5.64rem;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0;
        span{
          display: inline-block;
          width: 50%;
          height: 0.88rem;
          line-height: 0.88rem;
          font-size: .34rem;
          text-align: center;
          background: #eaeaea;
        }
        span:nth-of-type(2){
          background: #64ABFF;
          color: #fff;
        }
      }
    }
  }
  .aera-model,.jingying-model{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index:999;
    .model-inner{
      position: absolute;
      background: #fff;
      left: 0;
      bottom: 0;
      width: 7.5rem;
      height: 5rem;
      overflow: hidden;
      .one{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        background: #fff;
        width: 2.95rem;
        height: 5rem;
        border-right: .01rem solid #eaeaea;
        overflow: scroll;
        .one-child{
          text-align: center;
          height: .78rem;
          line-height: .78rem;
          font-size: .3rem;
          border-bottom: .01rem solid #fff;
          &.cur{
            color: #7bb5ff;
          }
          .two{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            background: #fff;
            width: 4rem;
            height: 5rem;
            padding-left: .8rem;
            position: absolute;
            left: 2.96rem;
            top: 0;
            text-align: left;
            background: #f7f8fa;
            overflow: scroll;
            li{
              height: .78rem;
              line-height: .78rem;
              font-size: .3rem;
              &.cur{
                color: #7bb5ff;
              }
            }
          }
        }
      }
    }
  }
  .type-model{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index:999;
    .model-inner{
      position: absolute;
      background: #fff;
      left: 0;
      bottom: 0;
      width: 7.5rem;
      height: 5rem;
      overflow: hidden;
      .one{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        background: #fff;
        width: 7.5rem;
        height: 5rem;
        border-right: .01rem solid #eaeaea;
        overflow: scroll;
        .one-child{
          text-align: center;
          height: .78rem;
          line-height: .78rem;
          font-size: .3rem;
          border-bottom: .01rem solid #fff;
          &.cur{
            color: #7bb5ff;
          }
        }
      }
    }
  }
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
    font-size: .34rem;
    font-weight: bold;
    span{
      position: absolute;
      width: .34rem;
      height: .34rem;
      left: .2rem;
      top: .3rem;
      background: url("../../../static/images/common/back.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
    }
  }
  .content{
    margin-top: .9rem;
    ul{
      padding: 0 .2rem;
      background: #fff;
      li{
        height: .88rem;
        line-height: .88rem;
        font-size: .26rem;
        color:#999;
        border-bottom: 0.01rem solid #eaeaea;
        position: relative;
        .xuan{
          width: 5.8rem;
          height: .88rem;
          line-height: .9rem;
          font-size: .26rem;
          color: #999;
          position: absolute;
          left: 1.4rem;
          top: 0;
          i{
            position: absolute;
            right: .1rem;
            top: .3rem;
            width: 0.15rem;
            height: 0.28rem;
            background: url("../../../static/images/mine/more.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
        span{
          display: inline-block;
          width: 1.4rem;
          font-size: .28rem;
          color: #333;
        }
        input{
          width: 2.4rem;
          margin-top: -.03rem;
          height: .8rem;
          line-height: .8rem;
        }
      }
    }
  }
  .next{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    font-size: .32rem;
    background: #64ABFF;
    cursor: pointer;
  }
}
</style>
