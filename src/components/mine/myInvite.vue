<template>
<div class="myInvite">
    <div class="myInvite-top">
        <i>
            <router-link to='/inviteFriends'>
                <img src="../../../static/images/mine/back.png">
            </router-link>
        </i>
        <h3>我的邀请</h3>
    </div>
    <div class="inviteFriends-box">
        <div class="inviteFriends-num">
            <dl class="dl1">
                <dt>邀请人数：</dt>
                <dd><span>{{totalCount}}</span>人</dd>
            </dl>
            <dl>
                <dt>送会员服务：</dt>
                <dd><span>{{days}}</span>天</dd>
            </dl>
        </div>
        <ul class="inviteFriends-list">
            <li v-for="(item,index) in listArr">
                <p>{{item.invitedMobile}}</p>
                <span>{{item.createTime}}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'myInvite',
    data () {
        return {
            listArr: [],
            days: "",
            totalCount: ""
        }
    },
    computed:{

    },
    methods:{
        // 获取邀请好友列表
        listData(){
            let _this = this;
            // 接口调用
            let url = this.changeData() + '/user/selectInvitedList'
            axios(url,{
                method: 'post',
                params: {
                    token: window.localStorage.token,
                    phone: window.localStorage.iphone
                }
            }).then(data => {
                // console.log(data);
                // 邀请人数
                this.totalCount = data.data.totalCount;
                this.days = data.data.days;
                this.listArr = data.data.invitedList;

            }).catch(err => {
                console.log(err)
            });
        },
      
    },
    mounted() {
        this.listData();
    }
}
</script>
<style scoped lang="scss"  type="text/scss">
.myInvite{
    width: 7.5rem;
    margin: 0 auto;
}
.myInvite-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 1000000;
    h3{
        width: 75%;
        line-height: 1rem;
        font-size: 0.36rem;
        color: #333;
        float: left;
        text-align: center;
    }
    i{
        display: inline-block;
        width: 13%;
        height: 1rem;
        line-height: 1rem;
        float: left;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        img{
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}
.inviteFriends-box{
    width: 7.5rem;
    margin-top: 1rem;
    .inviteFriends-num{
        width: 7.5rem;
        height: .9rem;
        text-align: center;
        dl{
            line-height: .9rem;
            float: left;
            dt{
                float: left;

            }
            dd{
                float: left;
                span{
                    color: #e95f01;
                    margin-right: .1rem;
                }

            }
        }
        .dl1{
            margin-left: 1.27rem;
            margin-right: .57rem;
            dd{
                span{
                    color: #74aaf8;
                }
            }
        }
    }
    .inviteFriends-list{
        background: #fff;
        li{
            height: .88rem;
            line-height: .88rem;
            background: #fff;
            border-bottom: 1px solid #eaeaea;
            
            p{
                float: left;
                margin-left: .2rem;
            }
            span{
               float: right;
               margin-right: .2rem;
            }
        }
        li:first-child{
            border-top: 1px solid #eaeaea;
        }

    }
}
</style>
