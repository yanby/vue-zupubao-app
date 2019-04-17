// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import echarts from 'echarts'
import qs from "qs"
import axios from "axios"
import router from './router'
import store from './store/index.js'
import host from '../static/js/host/host.js'
import 'mint-ui/lib/style.css'
import 'babel-polyfill'


Vue.use(Mint);
Vue.use(host);
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts; //引入组件
Vue.config.productionTip = false;


//http request 拦截器
axios.interceptors.request.use(
  config => {
	if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
	    config.headers["token"]  = localStorage.token;
	}
	    return config;
	},
   err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(
  response => {
    if(response.data.code == 202){
        localStorage.clear();
        // Toast("登录超时，请重新登录")
        layer.open({
            content: '登录超时，请重新登录',
            skin: 'msg',
            time: 2
        });
        router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
     })
    }
    return response;
  },
  error => {
    return Promise.reject(error)   // 返回接口返回的错误信息
});


//http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.code == 201){
// 	    localStorage.clear();
//         layer.open({
//             content: '请先登录',
//             skin: 'msg',
//             time: 2
//         });
// 	    router.replace({
// 	        path:"login",
// 	        query: {redirect: router.currentRoute.fullPath}
// 	    })
//     }else if(response.data.code == 202){
//         localStorage.clear();
//         // Toast("登录超时，请重新登录")
//         layer.open({
//             content: '登录超时，请重新登录',
//             skin: 'msg',
//             time: 2
//         });
//         router.replace({
// 	        path: 'login',
// 	        query: {redirect: router.currentRoute.fullPath}
// 	    })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)   // 返回接口返回的错误信息
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  host,
  components: { App },
  template: '<App/>'
})
