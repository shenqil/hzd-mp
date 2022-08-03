<template>
	<view class="login">
		<div class="login_input">
			<input class="input" type="text" placeholder="请输入账号" v-model="account"/>
		</div>
		<div class="login_input">
			<input class="input" type="password" placeholder="请输入账号" v-model="password"/>
		</div>
		<div class="login_checkbox">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="name" style="transform:scale(0.8)" />本人已阅读并同意 <span @click.stop="privacy" class="cor">隐私政策</span> 和 <span @click.stop="privacy" class="cor">用户协议</span>
				</label>
			</checkbox-group>
		</div>
		<div class="login_checkbox">
			<button type="primary" @click="login(0)">登录</button>
		</div>
		<div class="login_checkbox">
			<button type="default" open-type="getUserInfo" @getuserinfo="wxLogin" @click="login(1)">微信一键登录</button>
		</div>
	</view>
</template>

<script>
import { defineComponent ,ref} from 'vue'
import { useStore } from "vuex";
import auth from '@/api/auth';

export default defineComponent({
    setup() {
		const store = useStore();

        const account = ref("")
        const password = ref("")
        const isChecked = ref(false)
		// 隐私政策
		const privacy = ()=>{
			console.log('隐私政策')
		}
		// 勾选协议
		const checkboxChange = (e)=>{
			console.log(e,36)
			isChecked.value = e.detail.value.length === 0 ? false : true;
			console.log(isChecked.value ,40)
		}
		
		// 账号登录
		const login = async (id)=>{
			if(isChecked.value === false){
				uni.showToast({
					title: `请勾选协议`,
					icon:'none'
				})
				return
			}
			
			if(account.value === ''){
				uni.showToast({
					title: `请输入账号`,
					icon:'none'
				})
				return
			}

			if(password.value === ''){
				uni.showToast({
					title: `请输入密码`,
					icon:'none'
				})
				return
			}

			try {
				await store.dispatch('user/login',{
					username: account.value,
					password: password.value
				})
				uni.switchTab({
					url: "/pages/home/index",
				});
			} catch (error) {
				console.error(error)
				uni.showToast({
					title: `${error}` || `登录失败，网络错误`,
					icon:'none'
				})
			}
		}
		
		// 微信一键登录
		const wxLogin = ()=>{
			uni.login({
				provider:"weixin",
				success:(res)=>{
					console.log(res);
					// 获取微信登录的授权码
					var code = res.code
					//在写发送request请求，
					uni.request({})
				}
			})
		}

		return {
			account,
			password,
			isChecked,
			privacy,
			login,
			checkboxChange,
			wxLogin
		}
    },
})
</script>

<style lang="scss" scoped>
.login{
	.login_input{
		margin:40rpx 40rpx;
		border-bottom: 1.1px solid rgba(226,226,226,1);
		padding-bottom: 20rpx;
		.input{
			line-height: 30rpx;
			color:  #D0D0D0;
		}
	}
	.login_checkbox{
		margin:40rpx 40rpx;
		padding-bottom: 20rpx;
		.cor{
			color: #3399FF;
		}
	}
}
</style>
