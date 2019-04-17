<template>
<div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <!-- <router-view></router-view> -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--<router-view></router-view>-->
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'App',
    watch:{
        $route: {
            handler: function(to, from){
                if(to.path == "/home"){
                    window.addEventListener("scroll",this.scroll)
                }else{
                    window.removeEventListener("scroll",this.scroll)
                }
            },
            // 深度观察监听
            deep: true
        }
    },
    mounted(){
        if(this.$route.path == "/home"){
            window.addEventListener("scroll",this.scroll)
        }else{
            window.removeEventListener("scroll",this.scroll)
        }
    },
    updated(){
        
    },
    created(){
        var url ="http://" +  window.location.host;
        axios({
            url: this.changeData() + '/show/getOpenedCitiesList',
            method: "post",
        }).then(res => {
            // console.log("获取城市");
            // console.log(res);
            res.data.data.forEach(function (item,index) {
                if(item.m_url == url){
                    sessionStorage.provinceId = item.province_id;
                    sessionStorage.cityId =  item.city_id;
                    sessionStorage.cityName = item.city_name;
                }
            })
        }).catch(err => {
            console.log(err)
        });
    },
    methods:{
        scroll(){
            var scrollTop = $(window).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(window).height();
            if(scrollTop + windowHeight == scrollHeight){
                this.$router.push({
                    path: '/lookShop'
                })
            }
        }
    }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{padding: 0; margin: 0;}
body {
	font-family: "微软雅黑";
    font-size: 16px;
    color: #666;
    width: 7.5rem;
    margin: 0 auto;
    background: #f7f8fa;
}

a{text-decoration: none;}

/*display: -webkit-box;
display: -moz-box;
display: -webkit-flex;
display: -ms-flexbox;

transform: -webkit-box;
transform: -moz-box;
transform: -webkit-flex;
transform: -ms-flexbox;*/
</style>
