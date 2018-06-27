import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index.js"

// 一级路由
import NavBar from '@/components/navBar'

//二级路由
import Home from '@/components/home/home.vue'
import LookShop from '@/components/shop/lookShop.vue'
import Mine from '@/components/mine/mine.vue'

// 商品详情
import ShopDetail from '@/components/shop/shopDetail.vue'
import ShopMore from '@/components/shop/shopMore.vue'
import ShopMap from '@/components/shop/shopMap.vue'


// 登陆页
import Login from '@/components/login/login.vue'
// 搜索页
import Search from '@/components/search/search.vue'
// 会员部分
import Buymember from '@/components/mine/buymember.vue'
import BuymemberH5 from '@/components/mine/buymemberH5.vue'
// 已注册会员
import Goodmember from '@/components/mine/goodmember.vue'
// 我的订单
import Order from '@/components/mine/order.vue'
// 选择支付方式
import Payment from '@/components/mine/payment.vue'
// 我的收藏
import Collect from '@/components/mine/collect.vue'
// 我的消息
import Message from '@/components/mine/message.vue'
// 关于优铺
import AboutUP from '@/components/mine/aboutUP.vue'
// 资讯详情
import Consult from '@/components/home/consult.vue'
// 委托找铺
import SeekShop from '@/components/home/seekShop.vue'
// 委托转铺
import TurnShop from '@/components/home/turnShop.vue'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  scrollBehavior: ()=>({y:0}),
  routes: [
    {path: '/', name:'navBar',redirect: "/home",component: NavBar,
        children:[
          {path: '/home',component: Home},
          {
            path: '/lookShop',
            component: LookShop,
            name: "lookShop",
            meta: {keepAlive: true}
           },
          {path: '/mine',component: Mine}
        ]
    },
    /*商铺筛选更多*/
    {
      path: '/shopMore',
      component: ShopMore
    },
    /*商铺地图*/
    {
      path: '/shopMap',
      component: ShopMap
    },
    {
      path: '/shopDetail',
      component: ShopDetail
    },
    {
      path: '/buymember',
      name: 'buymember',
      component: Buymember
    },
    {
      path: '/buymemberH5',
      component: BuymemberH5
    },
    {
      path: '/goodmember',
      component: Goodmember
    },
    // 我的订单
    {
      path: '/order',
      component: Order
    },
    //  选择支付方式
    {
      path: '/payment',
      component: Payment
    },
    // 我的收藏
    {
      path: '/collect',
      component: Collect
    },
    // 我的消息
    {
      path: '/message',
      component: Message
    },
    // 关于优铺
    {
      path: '/aboutUP',
      component: AboutUP
    },
    // 搜索页
    {
      path: '/search',
      component: Search
    },
    // 登录页
    {
      path: '/login',
      component: Login
    },
    // 资讯详情
    {
      path: '/consult',
      component: Consult
    },
    // 委托找铺
    {
      path: '/seekShop',
      component: SeekShop
    },
    // 委托转铺
    {
      path: '/turnShop',
      component: TurnShop
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = Number(localStorage.scrollTop);
      }
      return { x: 0, y: to.meta.savedPosition || 0}
    }
  }
})
export default router;
