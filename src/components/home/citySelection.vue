<template>
    <div class="citySelection">
        <div class="nav clearfix">
            <img class="navBack pull-left" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle pull-left">选择城市</h2>
        </div>
        <div class="cityList">
            <ul>
                <li v-for='(item,index) in cityArr' @click="change(index,item)" :class="{active:index===number}">{{item.city_name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
export default {
name: "citySelection",
    data () {
      return {
        number: 0,
        // cityArr: [],
        urlCityName:"",
        cityArr:[]

      }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/home'});
        },

        // 获取开通城市列表
        cityData(){
            let _this = this;
            let url = this.changeData() + '/show/getOpenedCitiesList';
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);
                this.cityArr = data.data.data;
                // console.log(this.cityArr);
                for(var i = 0; i < this.cityArr.length; i++){
                    if (this.cityArr[i].city_name.indexOf(this.urlCityName) == -1) {

                    } else {
                        this.number = i;
                    }
                }
            }).catch(err => {
                console.log(err)
            });
        },

        change(index,item) {
            window.location.href = item.m_url;
        }
    },
    created() {
        this.cityData();
        
        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        this.urlCityName = request['cityName'];
        // console.log(this.urlCityName);
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
/*@import "../../../static/css/commonNav.css";*/
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
.citySelection{
    width: 7.5rem;
    height:100vh;
    background: #fff;
    margin: 0 auto;
}
.nav{
    width: 7.1rem;
    height: 1rem;
    background: #fff;
    margin: 0 auto;
    padding:  0 0.2rem;
    position: fixed;
    top: 0;
    z-index: 10000;
    border-bottom: 0.02rem solid #eee;
}
.nav a{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.navBack{
    width: 0.32rem;
    height: 0.36rem;
    margin-top: 0.3rem;
}
.navTitle{
    height: 1rem;
    width: 6.4rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #3c3c3c;
    text-align: center;
}
.cityList{
    padding-top: .9rem;
    ul{
        width: 6.9rem;
        margin-left: .3rem;
        margin-top: .8rem;
        li{
            width: 2rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            color: #898989;
            font-size: .3rem;
            line-height: .8rem;
            text-align: center;
            margin-right: .45rem;
            margin-bottom: .2rem;
            float: left;
            box-sizing: border-box;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        li:nth-child(3n+3) {
           margin-right: 0;
        }
    }
}

.active{
    color: #64abff!important;
    border: 1px solid #64abff!important;
    background: #edf5ff;
}
</style>
