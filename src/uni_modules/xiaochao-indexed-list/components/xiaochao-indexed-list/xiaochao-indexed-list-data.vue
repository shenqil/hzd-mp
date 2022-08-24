<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 这一行是为了适应微信滑动条件编译添加的 -->
		<view class="a-a">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="a-a" @touchstart.stop="jichi">
				<!-- #endif -->
				<view v-for="(value, name, index) in shuju" :id="value" :key="shuju[value]">
					<view class="a-a-b a-a-b-a">
						{{name}}
					</view>
					
					<view class="a-a-b" hover-class="a-a-b-hover" hover-start-time="1" hover-stay-time="100" v-for="(shua,shub) in shuju[name]" :key="shua" @tap="mingcheng(shua)">
						
						<image class="img" src="/static/ucenter/touxiang.png" mode=""></image>
						<div class="right">
							<div class="top">{{shua.username}}</div>
							<div class="bottom">
								<span class="lab">{{shua.phone || '--'}}</span>
								<span class="lab">职位：{{shua.userTypeName}}</span>
							</div>
						</div>
					</view>
					
				</view>
			</view>
		</view>
</template>

<script>
	// 页面左边主要数据页面
	export default {
		name: "xiaochao-indexed-list-data",
		emits: ['itemClick', 'update:zuobiao'],
		props: {
			// 检测类型 + 其他验证
			zishuju: {
				type: Object //这个可以根据自己数据类型改，如果改数据类型代码也要改
			},
			zuobiao: {
				default: {}
			}
		},
		data() {
			return {
				shuju: this.zishuju,
				xinzuobiao: {},
				showList: 0
			};
		},
		mounted() {
			let _this = this; //修改this.zuobiao使用
			let chang50du = Object.keys(this.shuju); //防止遍历时候不按顺序  
			uni.createSelectorQuery()
				.in(this)
				.selectAll('.a-a-b.a-a-b-a') //根据class获取所有索引字母的元素，获取data页面内容高度
				.boundingClientRect()
				.exec(ret => {
					let gaodu = ret[0];
					for (let i = 0; i < chang50du.length; i++) { //获取每个字母距离顶部高度和字母结合
						_this.xinzuobiao[chang50du[i]] = gaodu[i].top;
					}
					this.changeTitle(_this.xinzuobiao); //更新上个页面坐标 zuobiao: {}
					_this.xinzuobiao = null; //清除变量内存
					_this.showList = 100;
				});
		},
		methods: {
			jichi() {}, //这个@touchstart.stop 方法是防止ios端滑动透穿解决办法
			mingcheng(mingcheng) { //点击传给上个页面，上个页面在传给插件放置页面
				this.$emit("itemClick", {
					mingcheng
				})
			},
			changeTitle(ev) {
				//触发一个更新事件
				// #ifdef  VUE3
				this.$emit('update:zuobiao', this.zuobiaoccc = ev)
				// #endif
				// #ifdef  VUE2
				this.$emit('update:zuobiao', ev);
				// #endif
			}
		},
		watch: {
			showList: function() {
				uni.hideLoading();
			}
		}
	}
</script>

<style scoped lang="scss">
	.a-a-b {
		position: relative;
		width: 708rpx;
		padding-left: 30rpx;
		font-size: 30rpx;
		display: flex;
		padding: 10rpx 30rpx;
		.img{
			width: 120rpx;
			height: 120rpx;
		}
		.right{
			flex: 1;
			padding: 20rpx;
			.top{
				line-height: 60rpx;
			}
			.bottom{
				line-height: 60rpx;
				display: flex;
				.lab{
					width: 50%;
				}
			}
		}
	}

	.a-a-b::after {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		left: 30rpx;
		height: 1px;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.a-a-b-hover {
		background-color: #eee;
	}

	.a-a-b-a {
		height: 60rpx!important;
		line-height: 60rpx!important;
		border-bottom: 0.03125rpx solid #c8c7cc;
		border-top: 0.03125rpx solid #c8c7cc;
		background-color: #eee;
	}

	.a-a-b-a::after {
		height: 0;
	}

	.a-a-b-a+.a-a-b::after {
		height: 0;
	}
</style>
