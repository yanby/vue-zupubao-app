import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index.js"

// 一级路由
import NavBar from '@/components/navBar'

//二级路由
import Home from '@/components/home/home.vue' //首页
import Echarts from '@/components/home/echarts.vue' //首页
import LookShop from '@/components/shop/lookShop.vue' //查看商铺
import Mine from '@/components/mine/mine.vue' //我的
import Publish from '@/components/publish/publish.vue' //发布
import Message from '@/components/mine/message.vue' //我的


import Qiuzu from '@/components/publish/qiuzu.vue' //发布
import Gather from '@/components/publish/gather.vue' //发布
// 商品详情
import ShopDetail from '@/components/shop/shopDetail.vue'
import ShopMore from '@/components/shop/shopMore.vue'
import ShopMap from '@/components/shop/shopMap.vue'

//合作品牌、大咖推荐
import Cooperation from '@/components/brand/cooperation.vue'
import Recommend from '@/components/brand/recommend.vue'


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
// import Message from '@/components/mine/message.vue'
// 关于优铺
import AboutUP from '@/components/mine/aboutUP.vue'
// 资讯详情
import Consult from '@/components/home/consult.vue'
// 委托找铺
import SeekShop from '@/components/home/seekShop.vue'
// 委托转铺
import TurnShop from '@/components/home/turnShop.vue'
// 选择城市
import CitySelection from '@/components/home/citySelection.vue'
//求组列表
import Wanted from '@/components/home/wanted.vue'
import WantedDetail from '@/components/home/wantedDetail.vue'
// 邀请好友
import InviteFriends from '@/components/mine/inviteFriends.vue'
// 我的邀请
import MyInvite from '@/components/mine/myInvite.vue'
// 邀请注册
import InviteRegister from '@/components/mine/inviteRegister.vue'
// 我要纠错
import ErrorCorrection from '@/components/shop/errorCorrection.vue'
// 我的发布
import MyPublish from '@/components/mine/myPublish.vue'
// 转铺会员
import TurnShopMember from '@/components/mine/turnShopMember.vue'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  scrollBehavior: ()=>({y:0}),
  routes: [
    {path: '*', name:'navBar',redirect: "/home",component: NavBar,
        children:[
          {path: '/home',component: Home},
          {
            path: '/lookShop',
            component: LookShop,
            name: "lookShop",
            meta: {keepAlive: true}
           },
          {path: '/mine',component: Mine},
          {path: '/publish',component: Publish},
          {path: '/message',component: Message},
          // {path: '/lookShop',component: LookShop},
        ]
    },

    {
      path: '/qiuzu',
      component: Qiuzu
    },
    {
      path: '/gather',
      component: Gather
    },
    /*echarts*/
    {
      path: '/echarts',
      component: Echarts
    },
    /*商铺筛选更多*/
    {
      path: '/shopMore',
      component: ShopMore
    },
    /*合作品牌*/
    {
      path: '/cooperation',
      component: Cooperation
    },
    /*大咖推荐*/
    {
      path: '/recommend',
      component: Recommend
    },
    /*求租列表*/
    {
      path: '/wanted',
      component: Wanted
    },
    /*求租列表*/
    {
      path: '/wantedDetail',
      component: WantedDetail
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
    // {
    //   path: '/message',
    //   component: Message
    // },
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
    },
    // 选择城市
    {
      path: '/citySelection',
      component: CitySelection
    },
    // 邀请好友
    {
      path: '/inviteFriends',
      component: InviteFriends
    },
    // 我的邀请
    {
      path: '/myInvite',
      component: MyInvite
    },
    // 邀请注册
    {
      path: '/inviteRegister',
      component: InviteRegister
    },
    // 我要纠错
    {
      path: '/errorCorrection',
      component: ErrorCorrection
    },
    // 我的发布
    {
      path: '/myPublish',
      component: MyPublish
    },
    // 转铺会员
    {
      path: '/turnShopMember',
      component: TurnShopMember
    },
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
