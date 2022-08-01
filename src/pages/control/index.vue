<template>
  <view class="control">
	<!-- 操作中心 -->
    <div class="control_action">
      <div class="control_action_item" v-for="(item,index) in controlList" :key="index" @click="handelClick(item)">
        <image class="control_action_img" :src="item.imgUrl" mode=""></image>
        <div class="control_action_title">{{item.name}}</div>
      </div>
    </div>
	<!-- 事件信息 -->
	<view class="control_event">
	  <view class="control_event_name">
	    <ModuleName :name="'事件中心'" />
	  </view>
	
	</view>
  </view>
</template>

<script  lang="ts">
import { defineComponent, ref } from 'vue'
import ModuleName from '@/components/ModuleName/index.vue'

export default defineComponent({
  components: {
    ModuleName
  },
  setup() {
    const controlList = ref([
      {
        name:"视频中心",
        imgUrl:"/static/control/video.png",
        id: 0
      },
      {
        name:"种植中心",
        imgUrl:"/static/control/plant.png",
        id: 1
      },
      {
        name:"作业管理",
        imgUrl:"/static/control/task.png",
        id: 2
      },
      {
        name:"事件中心",
        imgUrl:"/static/control/event.png",
        id: 3
      },
    ])
    const handelClick =  ( item: any ) =>{
      console.log(item)
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
		margin: 10rpx 20rpx;
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
		padding: 40rpx 0;
	}
}
</style>
