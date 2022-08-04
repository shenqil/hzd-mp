<template>
	<view class="eventDetails">
		<ContentLine :leftContent="'事件类型'" :rightContent="'天气恶劣'" />
		<div class="eventDetails_describe">
			<div class="describe_title">事件描述</div>
			<div class="describe_content">第二地块天气出现异常</div>
		</div>
		<div class="eventDetails_describe">
			<div class="describe_title">图片添加</div>
			<div class="describe_img">
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d" mode=""></image>
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d" mode=""></image>
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d" mode=""></image>
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d" mode=""></image>
			</div>
		</div>
		<ContentLine :leftContent="'处理人'" :rightContent="'张三'" />
		<ContentLine :leftContent="'备注'" :rightContent="'下雨'" />
	</view>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import ContentLine from '@/components/ContentLine/ContentLine.vue'
	export default defineComponent({
		components: {
			ContentLine
		},
		setup() {
			return {
				
			}
		}
	})
</script>

<style lang="scss">
.eventDetails{
	.eventDetails_describe{
		padding: 20rpx;
		box-sizing: border-box;
		border-bottom: 5rpx solid #f2f2f2;
		.describe_title{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #333333;
		}
		.describe_content{
			line-height: 60rpx;
			font-size: 32rpx;
			color: #333333;
			min-height: 200rpx;
		}
		.describe_img{
			image{
				width: 180rpx;
				height: 180rpx;
				margin: 10rpx;
			}
		}
	}
}
</style>
