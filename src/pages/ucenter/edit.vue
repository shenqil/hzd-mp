<template>
	<view class="edit">
		<div class="taskDetails_box">
			<div class="taskDetails_left">姓名</div>
			<div class="describe_input">
				<input type="text" v-model="userInfo.realName" placeholder="请输入姓名">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">用户名</div>
			<div class="describe_input">
				<input type="text" v-model="userInfo.username" placeholder="请输入用户名">
			</div>
		</div>
		<!-- <div class="taskDetails_box">
			<div class="taskDetails_left">手机号</div>
			<div class="describe_input">
				<input type="text" v-model="userInfo.phone" placeholder="请输入手机号">
			</div>
		</div>
		
		<div class="taskDetails_box">
			<div class="taskDetails_left">邮箱</div>
			<div class="describe_input">
				<input type="text" v-model="userInfo.email" placeholder="请输入邮箱">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">身份证号</div>
			<div class="describe_input">
				<input type="text" v-model="userInfo.identityCard" placeholder="请输入身份证号">
			</div>
		</div> -->

		<div class="taskDetails_box">
			<div class="taskDetails_left">密码</div>
			<div class="describe_input">
				<input type="password" v-model="password" placeholder="请输入密码">
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
	import md5 from 'js-md5'
	export default defineComponent({
	  components:{
	    ModuleName
	  },
	  setup() {
		const password = ref('')
		const store = useStore()
		const userInfo =  computed(()=>store.getters['user/userInfo'])
		// 手机号码验证
		const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		// 邮箱号码验证
		const verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
		const regs = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
	
		
		const handelClick = ()=>{
			if(userInfo.value.realName ===null || userInfo.value.realName === ''){
				uni.showToast({
					title: `请填写姓名`,
					icon:'none'
				})
				return
			}
			
			if(userInfo.value.username ===null || userInfo.value.username === ''){
				uni.showToast({
					title: `请填写用户名`,
					icon:'none'
				})
				return
			}
			
			if(!reg.test(userInfo.value.phone)){
				uni.showToast({
					title: `请填写正确的手机号`,
					icon:'none'
				})
				return
			}
			
			if(!verify.test(userInfo.value.email)){
				uni.showToast({
					title: `请填写正确的邮箱`,
					icon:'none'
				})
				return
			}
			
			if(!regs.test(userInfo.value.identityCard)){
				uni.showToast({
					title: `请填写正确的身份证号`,
					icon:'none'
				})
				return
			}

			if(password.value && password.value.length < 6){
				uni.showToast({
					title: `请填写6位及以上的密码`,
					icon:'none'
				})
				return
			}

			userInfo.value.age = userInfo.value.age === null?'': userInfo.value.age
			let params = {
				...userInfo.value
			}

			if(password.value && password.value >= 6){
				params.password = md5(password.value)
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
			password,
			userInfo,
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
