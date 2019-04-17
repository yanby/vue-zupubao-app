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
    <div class="aera-model" v-show="aeraModel" @click="aeraModelShow($event)">
        <div class="model-inner">
            <ul class="one">
                <li class="one-child" v-for="item in oneArea" @click.stop="oneFun($event,item)">
                    {{item.name}}
                    <ul class="two">
                        <li v-for="item1 in oneAreaChild" @click.stop="oneChildFun($event,item1)">{{item1.childName}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <h2><span @click="back()"></span>{{title}}</h2>
    <div class="content">
        <div class="upload">
            <h3>商铺照片（请至少上传一张）</h3>
            <div class="add">
                <ul class="clearfix">
                    <li v-for="(item,index) in imgList" v-if="imgList.length">
                        <div class="close" @click.stop="delImg(index)"></div>
                        <img :src="item.file.src" alt="">
                    </li>
                    <li class="img" v-if="imgList.length < 6">
                        <input type="file" @change="uploadFun($event)" accept="image/*" multiple>
                    </li>
                </ul>
                <!--<div class="img" v-if="imgList.length < 6">-->
                  <!--<input type="file" @change="uploadFun($event)" accept="image/*" multiple>-->
                <!--</div>-->
            </div>
        </div>
        <div class="wrap">
            <ul>
                <li><span>区域</span><div class="xuan" @click="aeraModelFun()" v-model="area">{{area}}<i></i></div></li>
                <li><span>详细地址</span><input type="text" placeholder="不少于5个字" v-model="adress"></li>
            </ul>
            <ul style="margin-top: .2rem;">
                <li><span>面积</span><input type="number" placeholder="请填写使用面积" v-model="mianji">平米</li>
                <li><span>月租金</span><input type="number" placeholder="请填写" v-model="zujin">元/月</li>
                <li v-if="url == '0'"><span>转让费</span><input type="number" placeholder="请填写" v-model="zhuanrang">万元</li>
                <li v-if="url == '0'"><span style="width: 1.8rem;">展示为面议？</span><mt-switch v-model="value" @change="turn"></mt-switch></li>
            </ul>
            <ul>
                <li style="margin-top: .2rem;"><span>联系人</span><input type="text" placeholder="请填写" v-model="lianxi"></li>
            </ul>
        </div>
    </div>
    <div v-if="next==0" class="next" @click="go()">发布</div>
    <div v-else class="next cur">发布</div>
</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios';
import qs from "qs";
export default {
    data(){
        return{
            limit: 6,
            next: 0,
            url: "",
            type: 1,
            title: "转让信息",
            num: 0,
            listArr: [],
            value: false,//面议开噶
            transfeeFlag: "0",//1面议
            area: "请选择",//区域显示
            areaId: "",
            businessAreaId: "",
            adress:"",//地址显示
            mianji: "",//面积显示
            zujin: "",//租金显示
            zhuanrang: "",//装让费显示
            lianxi: "",//联系人显示
            areaName: "",//域名名称
            backModel: false,//返回弹窗
            aeraModel: false,//区域弹窗
            oneArea: "",//区域一级
            oneAreaChild: "",//区域二级
            imgsrc: "",
            imgList: [],
            imgArr: [],
            imgArrString: "",
            host: "",
            policy: "",
            signature: "",
            accessid: "",
            dir: "",
            expire: "",
            callback: "",
        }
    },
    mounted() {
        this.url = this.$route.query.type;
        if(this.url == 0){
            this.title = "转让信息";
        }else{
            this.title = "出租信息";
        }
        this.init();
        this.ossData();
    },
    methods: {
        back(){
            this.backModel = true;
        },
        init(){
            let typeId = "";
            if(this.url == "0"){
                this.typeId = 1;
            }else{
                this.typeId = 0;
            }
            this.$http(this.changeData() + "/publish/getAreas",{
                method: 'post',
                params: {
                    cityId: sessionStorage.cityId,
                    type: this.typeId
                }
            }).then(res => {
                // console.log(res)
                this.oneArea = res.data.areas;
            }).catch(err => {
                console.log(err)
            });
        },
        //控制区域弹窗
        aeraModelShow(e){
            this.aeraModel = !this.aeraModel;
        },
        //获取区域二级
        oneFun(e,item){
            this.areaName = item.name;
            this.areaId = item.id;
            this.oneAreaChild = item.childList;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        oneChildFun(e,item){
            this.aeraModel = false;
            this.businessAreaId = item.childId;
            this.area = this.areaName +"-"+ item.childName;
            $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        },
        //点击请选择
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
        //点击确认退出
        confirm(){
            if(this.$route.query.urlId == 0){
                this.$router.push({path:"/myPublish",query:{urlType:0}})
            }else if(this.$route.query.urlId == 1){
                this.$router.push({path:"/myPublish",query:{urlType:1}})
            }else{
                this.$router.go(-1)
            }
        },
        //点击开关
        turn(){
            if(this.value == true){
                this.transfeeFlag = 1;
            }
        },
        // 获取OSS
        ossData(){
            axios({
                url: this.changeData() + '/oss/policy',
                method: 'post'
            }).then(res => {
                // console.log(res);
                this.host = res.data.host;
                this.policy = res.data.policy;
                this.signature = res.data.signature;
                this.accessid = res.data.accessid;
                this.dir = res.data.dir;
                this.expire = res.data.expire;
                this.callback = res.data.callback;
            }).catch(err => {
                console.log(err)
            });
        },
        //点击添加图片
        uploadFun(e){
            // console.log(e)
            //如果选了照片就遍历循环，没有选就退出
            if(e.target.files[0].size){
                let files = e.target.files;
                for (let i = 0; i < files.length; i++) {
                    this.fileAdd(files[i]);
                }
            }else{
                return;
            }
        },
        //图片上传本地
        fileAdd(file){
            var that = this;
            //每次添加
            if (this.limit !== undefined) this.limit--;
            if (this.limit !== undefined && this.limit < 0) return;
            // this.imgArr.push({file});
            //如果上传的不是图片提示，否则显示出来
            if (file.type.indexOf('image') == -1) {
                this.$dialog.toast({mes: '请选择图片文件'});
            } else {
                let reader = new FileReader();
                let image = new Image();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    file.src = this.result;
                    that.imgList.push({file});
                    image.src= file.src;
                }
            }
        },
        //点击删除
        delImg(index) {
            this.imgList.splice(index, 1);
            if (this.limit !== undefined) this.limit = 6-this.imgList.length;
        },
        random_string(len) {
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        //点击发布
        go(){
            let _this = this;






            if(this.imgList.length == 0){
                Toast("请最少上传一张图片")
            }else if(this.area == "请选择"){
                Toast("请选择区域")
            }else if(this.adress == "" || this.adress.length < 5){
                Toast("请输入5个字以上的详细地址")
            }else if(this.mianji == ""){
                Toast("请填写使用面积")
            }else if(this.zujin == "") {
                Toast("请填写月租金");
            }else if(this.url == "0" && this.zhuanrang == ""){
                Toast("请填写转让费");                
            }else if(this.lianxi == ""){
                // alert(1);
                Toast("请填写联系人");
            }else{
                Toast("提交中")
                this.next = 1;
                for (var i = 0; i < this.imgList.length; i++){
                    var ossData = new FormData();
                    ossData.append('OSSAccessKeyId', _this.accessid);
                    ossData.append('policy', _this.policy);
                    ossData.append('Signature', _this.signature);
                    //上传阿里云需要一个动态的random
                    ossData.append('key', _this.dir + _this.random_string(32));
                    ossData.append('success_action_status', 200); // 指定返回的状态码
                    ossData.append("callback", _this.callback);
                    ossData.append("file", _this.imgList[i].file);
                    this.$http.post(this.host, ossData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then(res => {
                        // console.log(res);
                        //返回地址如果后台没加/,需要加个/
                        _this.imgsrc = _this.host + "/" + res.data.fileName;
                        //把地址添加到数组中
                        _this.imgArr.push(_this.imgsrc);
                        //转化成字符串上传给后台
                        _this.imgArrString = _this.imgArr.join(",");
                        //判断是否想通
                        if(_this.imgList.length == _this.imgArr.length){
                            _this.upData();
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }
            }
        },
        upData() {
            if(this.url == 0){
                // 商铺转让
                this.type = 1;
                var data = {
                    cityId: sessionStorage.cityId, //市id
                    areaId: this.areaId, //区域id
                    businessAreaId: this.businessAreaId, //商圈id
                    address: this.adress, //地址
                    area: this.mianji, //面积
                    monthlyRent: this.zujin, //月租金
                    linkMan: this.lianxi, // 联系人
                    transfee: this.zhuanrang, //转让费
                    transfeeFlag: this.transfeeFlag, //是否面议标识
                    type: this.type, //0:商铺出租 1:商铺转让 
                    imgs: this.imgArrString, //商铺转让提交 图片地址,多张图片用逗号拼接
                }
            }else{
                // 商铺出租
                this.type = 0;
                var data = {
                    cityId: sessionStorage.cityId, //市id
                    areaId: this.areaId, //区域id
                    businessAreaId: this.businessAreaId, //商圈id
                    address: this.adress, //地址
                    area: this.mianji, //面积
                    monthlyRent: this.zujin, //月租金
                    linkMan: this.lianxi, // 联系人
                    type: this.type, //0:商铺出租 1:商铺转让 
                    imgs: this.imgArrString, //商铺转让提交 图片地址,多张图片用逗号拼接
                }
            }
            this.$http({
                url: this.changeData() + "/publish/auth/getPublishInfo",
                method: "post",
                params: data
            }).then(function(res){
                // console.log(res);
                if(res.data.code=="101"){
                    Toast("发布成功")
                    if(this.url == 0){
                        this.$router.push({path:"/myPublish",query:{urlType:0}});
                    }else{
                        this.$router.push({path:"/myPublish",query:{urlType:1}});
                    }
                }else{
                    Toast(res.data.msg);
                }
            }.bind(this)).catch(function(err){
                console.log(err)
            })
        },
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
  .aera-model{
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
    padding-bottom: 2rem;
    .upload{
      h3{
        padding: .2rem;
        font-size: .26rem;
        color: #898989;
      }
      .add{
        ul{
          li{
            width: 2.2rem;
            height: 1.66rem;
            position: relative;
            margin: 0 .12rem .2rem;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            float: left;
            .close{
              position: absolute;
              right: -.2rem;
              top: -.2rem;
              width: .38rem;
              height: .38rem;
              background: url("../../../static/images/publish/close.png") no-repeat;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
          li.img{
            background: url("../../../static/images/publish/add.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            input{
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
          }
        }

      }
    }
    .wrap{
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
          .mint-switch{
            position: absolute;
            right: 0;
            top: .1rem;
          }
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
            width: 5rem;
            margin-top: -.03rem;
            height: .8rem;
            line-height: .8rem;
          }
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
    &.cur{
      background: #ccc;
    }
  }
}
</style>
