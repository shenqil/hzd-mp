<template>
  <view class="control">
	<!-- 操作中心 -->
    <div class="control_action">
      <div class="control_action_item" v-for="(item,index) in controlList" :key="index" @click="handelClick(item.router)">
        <image class="control_action_img" :src="item.imgUrl" mode=""></image>
        <div class="control_action_title">{{item.name}}</div>
      </div>
    </div>
	<!-- 事件信息 -->
	<view class="control_event">
	  <view class="control_event_name">
	    <ModuleName :name="'事件信息'" />
	  </view>
	  <view class="control_info_list">
	    <InfoElement/>
	    <InfoElement/>
	  </view>
	</view>
	<!-- 种植信息 -->
	<view class="control_event">
	  <view class="control_event_name">
	    <ModuleName :name="'种植信息'" />
	  </view>
	  <view class="control_info_list">
	    <InfoElement/>
	    <InfoElement/>
	  </view>
	</view>
	<!-- 作业信息 -->
	<view class="control_event">
	  <view class="control_event_name">
	    <ModuleName :name="'作业信息'" />
	  </view>
	  <view class="control_info_list">
	    <InfoElement/>
	    <InfoElement/>
	  </view>
	</view>
  </view>
</template>

<script  lang="ts">
import { defineComponent, ref } from 'vue'
import ModuleName from '@/components/ModuleName/index.vue'
import InfoElement from '@/components/InfoElement/index.vue';
export default defineComponent({
  components: {
    ModuleName,
	InfoElement
  },
  setup() {
    const controlList = ref([
      {
        name:"视频中心",
        imgUrl:"/static/control/video.png",
        router: "videoCenter"
      },
      {
        name:"种植中心",
        imgUrl:"/static/control/plant.png",
        router: "plantingCenter"
      },
      {
        name:"作业管理",
        imgUrl:"/static/control/task.png",
        router: "task"
      },
      {
        name:"事件中心",
        imgUrl:"/static/control/event.png",
        router: "eventCenter"
      },
    ])
    const handelClick =  ( router: string ) =>{
      console.log(router)
	  uni.navigateTo({
	  	url:`/pages/control/${router}`
	  })
    }
    return {
      controlList,
      handelClick
    }
   }
})
</script>

<style lang="scss" scoped>
.control{
	background: #fff;
	.control_action{
		background: #FFFFFF;
		box-shadow: 0px 9px 17px 0px rgba(98,157,252,0.15);
		border-radius: 8.88px;
		display: flex;
		margin: 10rpx 20rpx 40rpx 20rpx;
		padding: 22rpx 10rpx;
		.control_action_item{
			width: 25%;
			text-align: center;
			.control_action_img{
				width: 75rpx;
				height: 75rpx;
			}
			.control_action_title{
				font-size: 26rpx;
			}
		}
	}
	.control_event{
		margin: 20rpx;
		.control_event_name{
			margin: 20rpx;
		}
	}
}
</style>
