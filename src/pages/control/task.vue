<template>
	<view class="planting">
		<!-- 作业中心 -->
		<view class="planting_event">
		  <view class="planting_event_name">
		    <ModuleName :name="'作业中心'" />
			<div class="type">
				<picker @change="bindPickerChange" :value="index" :range="taskTypeList" :range-key="'itemText'">
					<view class="uni-input">{{index!=null?taskTypeList[index].itemText : '作业类型'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<div class="massif">
				<picker @change="bindPickerChange1" :value="BlockIndex" :range="BlockList" :range-key="'blockName'">
					<view class="uni-input">{{BlockIndex!=null?BlockList[BlockIndex].blockName : '所属地块'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<view class="planting_info_list">
			  <InfoElement @handelClick="taskDetails" v-for="(item,index) in taskList" :elementData="{ content: item.farmingTypeName,discoverer: item.farmingMenberName, time: item.farmingTime,contentName:'作业信息',name:'作业人',icont: 1,...item}" :key="index"/>
			  
			</view>
		  </view>
		</view>
		
	</view>
</template>

<script>
    import { defineComponent, ref } from 'vue'
	import controlApi from '@/api/control';
	import ModuleName from '@/components/ModuleName/index.vue'
	import InfoElement from '@/components/InfoElement/index.vue';
	let pageNum = 1;
	let pageSize = 10;
	let pages = 0;
	export default defineComponent({
		components: {
		  ModuleName,
		  InfoElement
		},
		data() {
		    return {
		      taskTypeList: [],
			  BlockList: [],
			  index: null,
			  BlockIndex: null,
			  taskList:[]
		    }
		  },
		created(){
			pageNum = 1 ;
			this.taskList = []
			this.getTaskList()
			this.getSelectList()
		},
		onReachBottom() {
			if(pageNum<pages){
				pageNum++
				this.getTaskList()
			}
			
		},
		onPullDownRefresh() {
			pageNum = 1 ;
			this.taskList = []
			this.getTaskList()
			
		},
		methods:{
			// 获取筛选列表
			async getSelectList(){
				let params = {
					
				}
				const res = await controlApi.getBlockList({
						  ...params
				})
				this.BlockList = res.obj.records
				
				const res1 = await controlApi.getsysDictList({
						 dictCode: 'farmingType'
				})
				
				this.taskTypeList = res1.obj
			},
			// 获取事件列表
			async getTaskList(){
				let params = {
					pageNum: pageNum,
					pageSize: pageSize,
					param: {
						blockId: this.BlockIndex !=null? this.BlockList[this.BlockIndex].id : null,
						farmingType: this.index !=null? this.taskTypeList[this.index].itemValue : null,
					}
				}
				const res = await controlApi.getTaskList({
						  ...params
				})
				uni.stopPullDownRefresh();
				if (!Array.isArray(res.obj.records)) {
				   console.error("返回数据不存在")
				   return
				}
				pages = res.obj.pages
				this.taskList = this.taskList.concat(res.obj.records)
				
			},
			handelAdd(){
				uni.navigateTo({
					url: '/pages/control/eventAdd'
				})
			},
			eventDetails(item){
				let textObj = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/control/eventDetails?textObj=${textObj}`
				})
			},
			bindPickerChange(e){
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value;
				pageNum = 1 ;
				this.taskList = []
				this.getTaskList()
			},
			bindPickerChange1(e){
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.BlockIndex = e.detail.value;
				pageNum = 1 ;
				this.taskList = []
				this.getTaskList()
			},
			taskDetails(item){
				let textObj = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/control/taskDetails?textObj=${textObj}`
				})
			}
		},
		// setup() {
		// 	const array = ref(['A型架第一', 'B型架第一', 'C型架第一', 'D型架第一'])
		// 	const array1 = ref(['A型架第一', 'B型架第一', 'C型架第一监控设备', 'D型架第一'])
		// 	const index = ref(null)
		// 	const index1 = ref(null)
		// 	const bindPickerChange= (e)=>{
		// 		console.log('picker发送选择改变，携带值为', e.detail.value)
		// 		index.value = e.detail.value
		// 	}
			
		// 	const bindPickerChange1= (e)=>{
		// 		console.log('picker发送选择改变，携带值为', e.detail.value)
		// 		index1.value = e.detail.value
		// 	}
			
		// 	const handelClick = ()=>{
		// 		uni.navigateTo({
		// 			url: '/pages/control/taskDetails'
		// 		})
		// 	}
			
		// 	return {
		// 		bindPickerChange,
		// 		array,
		// 		index,
		// 		array1,
		// 		index1,
		// 		bindPickerChange1,
		// 		handelClick
		// 	}
		// }
	})
</script>

<style lang="scss" scoped>
.planting{
	.planting_event{
		padding: 20rpx;
		.planting_event_name{
			position: relative;
			width: 100%;
			.type{
				position: absolute;
				right: 10rpx;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
				width: 200rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 26rpx;
				text-align: right;
				.xia{
					width: 20rpx;
					height: 20rpx;
				}
			}
			.massif{
				position: absolute;
				right: 230rpx;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
				width: 200rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 26rpx;
				text-align: right;
				.xia{
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}
	.planting_info_list{
		margin: 20rpx 0;
	}
	
}
</style>
