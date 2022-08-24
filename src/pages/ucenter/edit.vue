<template>
	<view class="edit">
		<div class="taskDetails_box">
			<div class="taskDetails_left">姓名</div>
			<div class="describe_input">
				<input type="text" v-model="realName" placeholder="请输入姓名">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">用户名</div>
			<div class="describe_input">
				<input type="text" v-model="username" placeholder="请输入用户名">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">手机号</div>
			<div class="describe_input">
				<input type="text" v-model="phone" placeholder="请输入手机号">
			</div>
		</div>
		
		<div class="taskDetails_box">
			<div class="taskDetails_left">邮箱</div>
			<div class="describe_input">
				<input type="text" v-model="email" placeholder="请输入邮箱">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">身份证号</div>
			<div class="describe_input">
				<input type="text" v-model="identityCard" placeholder="请输入身份证号">
			</div>
		</div>
		<div class="btn">
			<button type="primary" @click="handelClick">提交</button>
		</div>
	</view>
</template>

<script>
	import { defineComponent, ref, computed, onMounted } from 'vue'
	import { useStore } from 'vuex'
	import controlApi from "@/api/control";
	import ModuleName from '@/components/ModuleName/index.vue'
	export default defineComponent({
	  components:{
	    ModuleName
	  },
	  setup() {
		// 手机号码验证
		const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		// 邮箱号码验证
		const verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
		const regs = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
	
		// 姓名
		const realName = ref(null);
		// 用户名
		const username = ref(null);
		// 手机号
		const phone = ref(null);
		// 邮箱
		const email = ref(null);
		// 身份证号
		const identityCard = ref(null);
		const handelClick = ()=>{
			if(realName.value ===null){
				uni.showToast({
					title: `请填写姓名`,
					icon:'none'
				})
				return
			}
			
			if(username.value ===null){
				uni.showToast({
					title: `请填写用户名`,
					icon:'none'
				})
				return
			}
			
			if(!reg.test(phone.value)){
				uni.showToast({
					title: `请填写正确的手机号`,
					icon:'none'
				})
				return
			}
			
			if(!verify.test(email.value)){
				uni.showToast({
					title: `请填写正确的邮箱`,
					icon:'none'
				})
				return
			}
			
			if(!regs.test(identityCard.value)){
				uni.showToast({
					title: `请填写正确的身份证号`,
					icon:'none'
				})
				return
			}
			
			let params = {
				realName: realName.value,
				username: username.value,
				phone: phone.value,
				email: email.value,
				identityCard: identityCard.value
			}
			editClick(params)
		}
		async function editClick(params){
			const res = await controlApi.getXphUser({
					...params
			})
			if(res.flag === 1){
				uni.navigateBack({
					delta: 1
				});
				uni.showToast({
					title: res.msg,
					icon:'修改成功'
				})
				
			}else{
				uni.showToast({
					title: res.msg,
					icon:'error'
				})
			}
		}
		return {
			realName,
			username,
			phone,
			email,
			identityCard,
			handelClick
		}
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
