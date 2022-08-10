<template>
	<view class="planting">
		<!-- 事件中心 -->
		<view class="planting_event">
		  <view class="planting_event_name">
		    <ModuleName :name="'事件中心'" />
			<div class="type">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index] || '事件类型'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<div class="massif">
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<view class="uni-input">{{array1[index1] || '所属地块'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<view class="planting_info_list">
			  <InfoElement @handelClick="eventDetails" v-for="(item,index) in eventList" :elementData="{ content: item.describe,discoverer: item.handleMenberName, time: item.createTime,contentName:'事件内容',name:'处理人', icont: 1,...item}" :key="index"/>
			  <div class="load_more">没有更多了</div>
			</view>
		  </view>
		</view>
		<image class="add" @click="handelAdd" src="../../static/control/jia.png" mode=""></image>
	</view>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue'
	import controlApi from '@/api/control';
	import ModuleName from '@/components/ModuleName/index.vue'
	import InfoElement from '@/components/InfoElement/index.vue';
	let pageNum = 1;
	let pageSize = 10;
	let pages = 0
	let eventListAll = []
	export default defineComponent({
		components: {
		  ModuleName,
		  InfoElement
		},
		onReachBottom() {
			console.log(pages,'我到达底部了')
			if(pageNum<pages){
				pageNum++
				dataList('onReach')
			}
			
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		setup() {
			const array = ref(['A型架第一', 'B型架第一', 'C型架第一', 'D型架第一'])
			const array1 = ref(['A型架第一', 'B型架第一', 'C型架第一监控设备', 'D型架第一'])
			const index = ref(null)
			const index1 = ref(null)
			const status = ref('more')
			const bindPickerChange= (e)=>{
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index.value = e.detail.value
			}
			
			const bindPickerChange1= (e)=>{
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index1.value = e.detail.value
			}
			
			const handelAdd = ()=>{
				uni.navigateTo({
					url: '/pages/control/eventAdd'
				})
			}
			
			const eventDetails = ()=>{
				uni.navigateTo({
					url: '/pages/control/eventDetails'
				})
			}
			
			const { eventList, getEventList} = dataList()
			
			onMounted(()=>{
				getEventList()
			})
			
			return {
				bindPickerChange,
				array,
				index,
				array1,
				index1,
				bindPickerChange1,
				handelAdd,
				eventDetails,
				eventList,
				status
			}
		}
	})
	
	
	function dataList(type){
		if(type){
			getEventList()
		}
		const eventList = ref([])
		
		async function getEventList(){
			let params = {
				pageNum: pageNum,
				pageSize: pageSize,
				param: {
					
				}
			}
			const res = await controlApi.getEventList({
					  ...params
			})
			if (!Array.isArray(res.obj.records)) {
			   console.error("返回数据不存在")
			   return
			}
			pages = res.obj.pages
			eventListAll = eventListAll.concat(res.obj.records)
			eventList.value = eventListAll;
			
		}
		
		return {
			eventList,
			getEventList
			
		}
	}
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
	.add{
		position: fixed;
		right: 50rpx;
		bottom: 50rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.load_more{
		text-align: center;
		line-height: 80rpx;
		color: #666;
		font-size: 32rpx;
	}
}
</style>
