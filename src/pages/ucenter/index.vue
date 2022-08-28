<template>
	<view class="ucenter">
		<view class="content">
			<image class="user_title" src = "/static/ucenter/bgc.png">
				<div class="user_bgc" @click="edit">
					<div class="user_left">
					<image src="../../static/ucenter/touxiang.png"></image>
					</div>
					<div class="user_right">
						<div class="user_name">{{userInfo.roleName}}</div>
						<div class="user_phone">手机号码：{{userInfo.phone}}&nbsp;&nbsp;&nbsp;职业：{{userInfo.realName}} </div>
					</div>
				</div>
			</image>
			<!-- 通讯录 -->
			<view class="user_monitor">
			<view class="user_monitor-name">
				<ModuleName :name="'AR'" />
			</view>
			<div class="user_name" @click="handeltxl"> <image class="txl" src="../../static/ucenter/txl.png"></image> AR</div>
			</view>
			<!-- 公众号 -->
			<view class="user_monitor">
			<view class="user_monitor-name">
				<ModuleName :name="'公众号'" />
			</view>
			<div class="user_name" @click="handelwx"> <image class="wx" src="../../static/ucenter/wx.png"></image> 关注微信公众号</div>
			</view>
		</view>

		<view class="sign-out">
			<button type="primary" @click="signOut">退出</button>
		</view>
	</view>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ModuleName from '@/components/ModuleName/index.vue'
export default defineComponent({
  components:{
    ModuleName
  },
  setup() {
    const store = useStore()
    const userInfo =  computed(()=>store.getters['user/userInfo'])
    onMounted(() => {
   
    })
	
	// 通讯录
	const handeltxl = (()=>{
		uni.navigateTo({
			url:"/pages/ar/index"
		})
	})
	
	// 关注微信公众号
	const handelwx = (()=>{
		uni.showToast({
			title: `暂未开放`,
			icon:'none'
		})
	})
	
	const edit = ()=>{
		uni.navigateTo({
			url:"/pages/ucenter/edit"
		})
	}

	function signOut () {
		store.dispatch("user/signOut")
	}
    return {
      userInfo,
	  handeltxl,
	  handelwx,
	  edit,
	  signOut
    }
  }
})
</script>

<style lang="scss" scoped>
.ucenter {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
}
.content {
  .user_title{
	  width: 100%;
	  height: 221rpx;
	  position: relative;
	  .user_bgc{
		  position: absolute;
		  top: 40rpx;
		  left: 40rpx;
		  display: flex;
		  .user_left{
			  width: 120rpx;
			  height: 120rpx;
			  image{
				  width: 100%;
				  height: 100%;
			  }
		  }
		  .user_right{
			  margin-left: 20rpx;
			  padding: 10rpx 0;
			  .user_name{
				  color: #fff;
				  font-size: 34rpx;
				  line-height: 60rpx;
				  font-weight: 600;
				  letter-spacing: 0.88rpx;
			  }
			  .user_phone{
				  font-size: 24rpx;
				  color: #FFFFFF;
				  letter-spacing: 0.89rpx;
				  font-weight: 400;
				  line-height: 50rpx;
				  opacity: 0.7;
			  }
		  }
	  }
  }
  .user_monitor{
    padding: 10rpx;
  }
  .user_monitor{
	.user_name{
		  padding: 20rpx;
		  border-bottom: 1px solid #E2E2E2;
		  .txl{
			  width: 38rpx;
			  height: 44rpx;
			  vertical-align: middle;
		  }
		  .wx{
			  width: 42rpx;
			  height: 38rpx;
			  vertical-align: middle;
		  }
	}
  }
  
}

.sign-out {
	padding: 80rpx 50rpx;
	> button {
		background-color: #3399FF;
	}
}
</style>
