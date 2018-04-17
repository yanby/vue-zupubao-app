<template>
	<div class="shopMore">
		<h2><span @click="back()"></span>更多筛选</h2>
		<div class="wrap">
			<div class="one">
				<h3><span></span>商铺类型</h3>
				<ul>
					<li @click="leixing($event)" v-for="(item,index) in type">{{item}}</li>
				</ul>
			</div>
			<div class="one">
				<h3><span></span>设施配套</h3>
				<ul>
					<li @click="leixing($event)" v-for="(item,index) in type">{{item}}</li>
				</ul>
			</div>
			<div class="one">
				<h3><span></span>特色标签</h3>
				<ul>
					<li @click="leixing($event)" v-for="(item,index) in type">{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="btn">
	        <div><span @click="clean()">清空</span></div>
	        <div><span>保存</span></div>
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				type: ["全部","商业街临铺","底商社区","写字楼配套","临街门面","档口摊位","购物中心"]
			}
		},
		methods: {
			back(){
	            this.$router.go(-1)
	        },
			leixing(e){
				if($(e.srcElement).hasClass("cur")){
					$(e.srcElement).removeClass("cur");
				}else{
					$(e.srcElement).addClass("cur");
				}
			},
      clean(){
        window.location.reload();
      }
		}
	}
</script>
<style lang="scss" type="text/scss" scoped>
	.shopMore{
		width: 7.5rem;
    height: 13.34rem;
		margin: 0 auto;
    background: #fff;
    overflow: scroll;
		h2{
      width: 7.5rem;
			height: .9rem;
			line-height: .9rem;
			text-align: center;
			font-size: .34rem;
      font-weight: bold;
      position: fixed;
      left: 0;
      top: 0;
      background: #fff;
      border-bottom: .01rem solid #eaeaea;
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
			padding-bottom: 1rem;
      padding-top: .9rem;
			.one{
				padding: .3rem .2rem .1rem;
				border-top: .01rem solid #eaeaea;
				h3{
					height: .28rem;
					line-height: .28rem;
					font-size: .28rem;
					font-weight: bold;
					margin-bottom: .2rem;
					color: #333;
				}
				ul{
          overflow: hidden;
					li{
						width: 22%;
						height: .62rem;
            float: left;
						margin-right: 2%;
						line-height: .7rem;
						color: #898989;
						border: 0.01rem solid #eaeaea;
						border-radius: 0.1rem;
						text-align: center;
						font-size: .28rem;
						margin-bottom: .2rem;
						&.cur{
							color: #64aaff;
							border-color: #64aaff;
              background: #e1eefe;
						}
					}
				}
			}
		}
	    .btn{
        position: fixed;
        left: 0;
        bottom: 0;
          width: 7.5rem;
          height: .88rem;
          background: #fff;
          border-top: 0.01rem solid #eaeaea;
          display: flex;
          justify-content: space-around;
          align-items: center;
          div:nth-of-type(1){
            width: 50%;
            text-align: center;
            span{
              display: inline-block;
              width: 3rem;
              height: .5rem;
              line-height: .55rem;
              text-align: center;
              font-size: .3rem;
              background: #f7f8fa;
              color: #898989;
              border-radius: .05rem;
            }
          }
          div:nth-of-type(2){
            width: 50%;
            text-align: center;
            span{
              display: inline-block;
              width: 3rem;
              height: .5rem;
              line-height: .55rem;
              text-align: center;
              font-size: .3rem;
              background: #7bb5ff;
              color: #fff;
              border-radius: .05rem;
            }

          }
        }
	}
</style>
