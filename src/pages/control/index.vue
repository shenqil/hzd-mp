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
	    <InfoElement @handelClick="eventDetails" v-for="(item,index) in eventList" :elementData="{ content: item.describe,discoverer: item.handleMenberName, time: item.createTime,contentName:'事件内容',name:'处理人', icont: 1,...item}" :key="index"/>
	  </view>
	</view>
	<!-- 种植信息 -->
	<view class="control_event">
	  <view class="control_event_name">
	    <ModuleName :name="'种植信息'" />
	  </view>
	  <view class="control_info_list">
	    <InfoElement @handelClick="playtingDetails" v-for="(item,index) in playtingList" :elementData="{ content: item.plantingTypeName,discoverer: item.blockName, time: item.plantingTime,contentName:'种植类型',name:'所属地块',icont: 1,...item}" :key="index"/>
	  </view>
	</view>
	<!-- 作业信息 -->
	<view class="control_event" >
	  <view class="control_event_name">
	    <ModuleName :name="'作业信息'" />
	  </view>
	  <view class="control_info_list">
	    <InfoElement @handelClick="taskDetails" v-for="(item,index) in taskList" :elementData="{ content: item.farmingTypeName,discoverer: item.farmingMenberName, time: item.farmingTime,contentName:'作业信息',name:'作业人',icont: 1,...item}" :key="index"/>
	  </view>
	</view>
  </view>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import controlApi from '@/api/control';
import ModuleName from '@/components/ModuleName/index.vue'
import InfoElement from '@/components/InfoElement/index.vue';
import { onShow } from "@dcloudio/uni-app";
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
	
	const { eventList, getEventList, playtingList, getPlantingList, taskList, getTaskList } = getListAll()
    const handelClick =  (router) =>{
      console.log(router)
	  uni.navigateTo({
	  	url:`/pages/control/${router}`
	  })
    }
	// 事件详情
	const eventDetails = (item)=>{
		console.log(item,84)
		let textObj = JSON.stringify(item)
		uni.navigateTo({
			url: `/pages/control/eventDetails?textObj=${textObj}`
		})
	}
	// 种植详情
	const playtingDetails = (item)=>{
		let textObj = JSON.stringify(item)
		uni.navigateTo({
			url: `/pages/control/plantingDetails?textObj=${textObj}`
		})
	}
	// 作业详情
	const taskDetails = (item)=>{
		let textObj = JSON.stringify(item)
		uni.navigateTo({
			url: `/pages/control/taskDetails?textObj=${textObj}`
		})
	}
	
	onMounted(() => {
	  
	  getPlantingList()
	 
	})
	
	onShow(()=>{
		getEventList()
		getTaskList()
	})

	
    return {
      controlList,
      handelClick,
	  eventList,
	  playtingList,
	  taskList,
	  eventDetails,
	  playtingDetails,
	  taskDetails
    }
   }
   
   
})


function getListAll (){
  console.log(102)
  const eventList = ref([])
  const playtingList = ref([])
  const taskList = ref([])
  let params = {
  		  pageNum: 0,
  		  pageSize: 2,
		  param: {}
  }
  // 获取事件列表
  async	function getEventList (){
	  
	  const res = await controlApi.getEventList({
		  ...params
	  })
	  if (!Array.isArray(res.obj.records)) {
	     console.error("返回数据不存在")
	     return
	  }
	  eventList.value = res.obj.records
   }
   
   // 获取种植列表
   async  function getPlantingList (){
   	  const res = await controlApi.getPlantingList({
   		  ...params
   	  })
   	  if (!Array.isArray(res.obj.records)) {
   	     console.error("返回数据不存在")
   	     return
   	  }
   	  playtingList.value = res.obj.records
    }
	
	
	// 获取作业列表
	async  function getTaskList (){
		  const res = await controlApi.getTaskList({
			  ...params
		  })
		  if (!Array.isArray(res.obj.records)) {
		     console.error("返回数据不存在")
		     return
		  }
		  taskList.value = res.obj.records
	 }
	 
   
   return {
	   eventList,
   	   getEventList,
	   playtingList,
	   getPlantingList,
	   taskList,
	   getTaskList
   }
}
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
