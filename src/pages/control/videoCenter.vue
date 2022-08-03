<template>
	<view class="video">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index] || '请选择设备'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
					</picker>
				</view>
			</view>
		</view>
		<video title="这是一个视频" class="video_box"
			src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"></video>
		<!-- 设备操作 -->
		<view class="video_event">
		  <view class="video_event_name">
		    <ModuleName :name="'设备操作'" />
		  </view>
		  <div class="video_handle">
			  <div class="handle_box">
				  <image class="handle_top sub" mode="" src="../../static/control/shang.png"></image>
				  <image class="handle_right sub" mode="" src="../../static/control/you.png"></image>
				  <image class="handle_bottom sub" mode="" src="../../static/control/xia.png"></image>
				  <image class="handle_left sub" mode="" src="../../static/control/zuo.png"></image>
				  <image class="handle_center sub" mode="" src="../../static/control/xiangji.png"></image>
			  </div>
		  </div>
		</view>
		<!-- 照片抓拍 -->
		<view class="video_event">
		  <view class="video_event_name">
		    <ModuleName :name="'照片抓拍'" />
			<div class="all" @click="handelAll">查看更多</div>
		  </view>
		 <imgTab :photoList="photoList"></imgTab>
		</view>
	</view>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import ModuleName from '@/components/ModuleName/index.vue'
	import imgTab from '@/components/imgTab/imgTab.vue'
	
	export default defineComponent({
		components:{
			ModuleName,
			imgTab
		},
		setup() {
			const array = ref(['A型架第一监控设备', 'B型架第一监控设备', 'C型架第一监控设备', 'D型架第一监控设备'])
			const index = ref(null)
			const photoList = ref(
				[
					{
						url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
						active: true
					},
					{
						url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
						active: true
					},
					{
						url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
						active: true
					},
					{
						url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
						active: true
					}
				]
			)
			
			const bindPickerChange = (e)=>{
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index.value = e.edetail.value
			}
			
			const handelAll = ()=>{
				uni.navigateTo({
					url:"/pages/control/imgDetails"
				})
			}
			return {
				array,
				index,
				photoList,
				bindPickerChange,
				handelAll
			}
		}
		
	})
</script>

<style lang="scss" scoped>
	.video {
		.video_box {
			width: 100%;
		}
		.uni-list{
			line-height: 80rpx;
			text-align: right;
			.xia{
				width: 30rpx;
				height: 30rpx;
			}
			.uni-input{
				height: 80rpx;
				font-size: 34rpx;
			}
		}
		.video_event{
			padding: 20rpx;
			.video_handle{
				position: relative;
				height: 320rpx;
				.handle_box{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					height: 312rpx;
					width: 312rpx;
					background: #CDE5FF;
					border-radius: 50%;
					.handle_top{
						position: absolute;
						left: 50%;
						top: 10rpx;
						transform: translateX(-50%);
						width: 80rpx;
						height: 70rpx;
					}
					.handle_right{
						position: absolute;
						top: 50%;
						right: 10rpx;
						transform: translateY(-50%);
						height: 80rpx;
						width: 70rpx;
					}
					.handle_bottom{
						position: absolute;
						left: 50%;
						bottom: 10rpx;
						transform: translateX(-50%);
						width: 80rpx;
						height: 70rpx;
					}
					.handle_left{
						position: absolute;
						top: 50%;
						left: 10rpx;
						transform: translateY(-50%);
						height: 80rpx;
						width: 70rpx;
					}
					.handle_center{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						width: 85rpx;
						height: 78rpx;
					}
					.sub:active{
						opacity: 0.3;
					}
				}
			}
		}
		.video_event_name{
			position: relative;
			.all{
				position: absolute;
				right: 0;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
			}
		}
	}
</style>
