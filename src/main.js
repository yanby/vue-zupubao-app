// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import qs from "qs"
import axios from "axios"
import router from './router'
import store from './store/index.js'
import host from '../static/js/host/host.js'
import 'mint-ui/lib/style.css'


Vue.use(Mint);
Vue.use(host);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;


//http request 拦截器
// axios.interceptors.request.use(
//   config => {
//
//     // alert(localStorage.token)
//     if (store.state.mutations.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       // config.headers["Authorization"] = localStorage.token;
//       config.headers.Authorization  = store.state.mutations.token;
//       // alert(config.headers.Authorization)
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.code == "401"){
//       layer.open({
//         content: '登陆超时，请重新登录！'
//         ,skin: 'msg'
//         ,time: 2 //2秒后自动关闭
//       });
//       localStorage.clear();
//       router.replace({
//         path: 'login',
//         query: {redirect: router.currentRoute.fullPath}
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)   // 返回接口返回的错误信息
//   });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  host,
  components: { App },
  template: '<App/>'
})
