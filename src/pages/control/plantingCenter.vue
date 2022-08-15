<template>
	<view class="planting">
		<!-- 种植中心 -->
		<view class="planting_event">
		  <view class="planting_event_name">
		    <ModuleName :name="'种植中心'" />
			<div class="type">
				<picker @change="bindPickerChange" :value="index" :range="plantingTypeList" :range-key="'plantTypeName'">
					<view class="uni-input">{{index != null?plantingTypeList[index].itemText : '种植类型'}}  <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<div class="massif">
				<picker @change="bindPickerChange1" :value="userIndex" :range="userList">
					<view class="uni-input">{{userList[userIndex] || '所属地块'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<view class="planting_info_list">
			  <InfoElement @handelClick="playtingDetails" v-for="(item,index) in playtingList" :elementData="{ content: item.plantingTypeName,discoverer: item.blockName, time: item.plantingTime,contentName:'种植类型',name:'所属地块',icont: 1,...item}" :key="index"/>
			  
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
		      plantingTypeList: [],
			  userList: [],
			  index: null,
			  userIndex: null,
			  playtingList:[]
		    }
		  },
		created(){
			pageNum = 1 ;
			this.playtingList = []
			this.getPlantingList()
			this.getSelectList()
		},
		onReachBottom() {
			if(pageNum<pages){
				pageNum++
				this.getPlantingList()
			}
			
		},
		onPullDownRefresh() {
			pageNum = 1 ;
			this.playtingList = []
			this.getPlantingList()
			
		},
		methods:{
			// 获取筛选列表
			async getSelectList(){
				let params = {
					
				}
				const res = await controlApi.getxphUserList({
						  ...params
				})
				this.userList = res.obj.records
				
				const res1 = await controlApi.getplantType({
						 ...params
				})
				
				this.plantingTypeList = res1.obj.records
			},
			// 获取事件列表
			async getPlantingList(){
				let params = {
					pageNum: pageNum,
					pageSize: pageSize,
					param: {
						blockId: this.userIndex !=null? this.userList[this.userIndex].id : null,
						plantingType: this.index !=null? this.plantingTypeList[this.index].itemValue : null,
					}
				}
				const res = await controlApi.getPlantingList({
						  ...params
				})
				uni.stopPullDownRefresh();
				if (!Array.isArray(res.obj.records)) {
				   console.error("返回数据不存在")
				   return
				}
				pages = res.obj.pages
				this.playtingList = this.playtingList.concat(res.obj.records)
				
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
				this.playtingList = []
				this.getPlantingList()
			},
			bindPickerChange1(e){
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.userIndex = e.detail.value;
				pageNum = 1 ;
				this.playtingList = []
				this.getPlantingList()
			},
			playtingDetails(item){
				let textObj = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/control/plantingDetails?textObj=${textObj}`
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
		// 			url: '/pages/control/plantingDetails'
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
