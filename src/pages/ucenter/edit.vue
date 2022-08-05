<template>
	<view class="edit">
		<div class="taskDetails_box">
			<div class="taskDetails_left">用户名</div>
			<div class="describe_input">
				<input type="text" placeholder="请输入用户名">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">手机号</div>
			<div class="describe_input">
				<input type="text" placeholder="请输入手机号">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">职业</div>
			<div class="describe_input">
				<input type="text" placeholder="请输入职业">
			</div>
		</div>
		
		<div class="btn">
			<button type="primary">提交</button>
		</div>
	</view>
</template>

<script>
	import { defineComponent, computed, onMounted } from 'vue'
	import { useStore } from 'vuex'
	import ModuleName from '@/components/ModuleName/index.vue'
	export default defineComponent({
	  components:{
	    ModuleName
	  },
	  setup() {
	
	  }
	})
</script>

<style lang="scss" scoped>
.edit{
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
		.describe_input{
			width: 70%;
			input{
				text-align: right;
				line-height: 80rpx;
				width: 100%;
				height: 80rpx;
			}
		}
		
	}
	.btn{
		width: 90%;
		margin: 30rpx auto;
	}
}
</style>
