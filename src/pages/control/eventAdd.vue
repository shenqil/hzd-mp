<template>
	<view class="eventAdd">
		<div class="taskDetails_box">
			<div class="taskDetails_left">事件类型</div>
			<div class="taskDetails_right">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index] || '请选择设备'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
					</picker>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default defineComponent({
		
		setup() {
			const array = ref(['人员受伤', '其他'])
			const index = ref(null)
			
			const bindPickerChange = (e)=>{
				console.log('picker发送选择改变，携带值为',e.detail.value )
				index.value= e.detail.value
			}
			
			return {
				array,
				index,
				bindPickerChange
			}
		}
	})
</script>

<style lang="scss" scoped>
.eventAdd{
	.taskDetails_box{
		height: 80rpx;
		width: 100%;
		display: flex;
		border-bottom: 5rpx solid #F2F2F2;
		padding: 0 20rpx;
		box-sizing: border-box;
		
		.taskDetails_left {
			width: 30%;
			height: 80rpx;
			line-height: 80rpx;
			color: 30rpx;
		}
		
		.taskDetails_right {
			width: 70%;
			height: 80rpx;
			line-height: 80rpx;
			color: 30rpx;
			text-align: right;
			.xia{
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
}
</style>
