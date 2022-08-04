<template>
	<view>
		<div class="taskDetails_box">
			<div class="taskDetails_left">{{leftContent}}</div>
			<div class="taskDetails_right">{{rightContent}}</div>
		</div>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default defineComponent({
		props: {
			leftContent: {
				type: String,
				default: null
			},
			rightContent: {
				type: String,
				default: null
			},
		},
		setup() {
			return {

			}
		}
	})
</script>

<style lang="scss" scoped>
	.taskDetails_box {
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
		}
	}
</style>
