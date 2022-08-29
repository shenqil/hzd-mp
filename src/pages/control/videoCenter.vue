<template>
	<view class="video">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="selectList" :range-key="'facName'">
						<view class="uni-input">{{index !=null?selectList[index].facName : '请选择设备'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
					</picker>
				</view>
			</view>
		</view>
		<video :autoplay='true'  :show-play-btn="false" :show-fullscreen-btn="true" :title="index !=null?selectList[index].facName:''" class="video_box"
			:src="video"></video>
		<!-- 设备操作 -->
		<view class="video_event">
		  <view class="video_event_name">
		    <ModuleName :name="'设备操作'" />
		  </view>
		  <div class="video_handle">
			  <div class="handle_box">
				  <image class="handle_top sub" @touchstart="handelDown(0)" @touchend="handelUp" mode="" src="../../static/control/shang.png"></image>
				  <image class="handle_right sub" @touchstart="handelDown(3)" @touchend="handelUp" mode="" src="../../static/control/you.png"></image>
				  <image class="handle_bottom sub" @touchstart="handelDown(1)" @touchend="handelUp" mode="" src="../../static/control/xia.png"></image>
				  <image class="handle_left sub" @touchstart="handelDown(2)" @touchend="handelUp" mode="" src="../../static/control/zuo.png"></image>
				  <image class="handle_center sub" @click="handelPhoto" mode="" src="../../static/control/xiangji.png"></image>
			  </div>
		  </div>
		</view>
		<!-- 照片抓拍 -->
		<view class="video_event">
		  <view class="video_event_name">
		    <ModuleName :name="'照片抓拍'" />
			<div class="all" @click="handelAll">查看更多</div>
		  </view>
		 <imgTab :photoList="photoList"></imgTab>
		</view>
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import controlApi from '@/api/control';
	import store from "@/store/index";
	import ModuleName from '@/components/ModuleName/index.vue'
	import imgTab from '@/components/imgTab/imgTab.vue'
	let facId = null;
	let channel = null;
	let accessToken = null;
	let serialNumber = null
	export default defineComponent({
		components:{
			ModuleName,
			imgTab
		},
		setup() {
			
			const index = ref(0)
			
			const bindPickerChange = (e)=>{
				index.value = e.detail.value
			    facId = selectList.value[e.detail.value].facId;
				getVideo(facId)
				getPhoto(facId)
			}
			
			const handelAll = ()=>{
				uni.navigateTo({
					url:`/pages/control/imgDetails?id=${facId}`
				})
			}
			const { selectList, getDevicepage, getVideo, video, photoList, getStart, getStop, getCapture } = dataListAll()
			onMounted(()=>{
				getDevicepage()
			})
			
			// 按下事件
			const handelDown = (direction)=>{
				console.log('我按下了')
				const params = {
					accessToken: accessToken,
					deviceSerial: serialNumber,
					channelNo: channel,
					direction,
					speed: 1,
				};
				getStart(params)
			}
			
			// 松开事件
			const handelUp = ()=>{
				console.log('我松开了')
				const params = {
					accessToken: accessToken,
					deviceSerial: serialNumber,
					channelNo: channel,
				};
				getStop(params)
			}
			// 拍照
			const handelPhoto = ()=>{
				getCapture()
			}
			return {
				selectList,
				index,
				photoList,
				bindPickerChange,
				handelAll,
				video,
				handelDown,
				handelUp,
				handelPhoto
			}
		}
		
	})
	
	function dataListAll(){
		const selectList = ref([]);
		const video = ref(null)
		const photoList = ref([])
		// 获取设备
		async function getDevicepage(){
			const params = {
				creatorId: store.state.user.tokenInfo.userId,
				pageNum: 1,
				pageSize: 10000,
				deviceType: 3
			}
			let res = await controlApi.getDevicepage({ ...params});
			if (!Array.isArray(res.records)) {
			   console.error("返回数据不存在")
			   return
			}
			selectList.value = res.records;
			facId = selectList.value[0].facId || null;
			
			getVideo(selectList.value[0].facId || null)
			getPhoto(selectList.value[0].facId || null)
		}
		// 获取视频流
		async function getVideo(facId){
			
			let res = await controlApi.getVideo(facId);
			video.value = res.hls
			channel = res.channel || null;
			accessToken = res.accessToken || null;
			serialNumber = res.serialNumber || null
		}
		// 获取照片
		async function getPhoto(facId){
			let params = {
				facId: facId,
				pageNum: 1,
				pageSize: 4,
				type: 1
			}
			let res = await controlApi.getPhoto({...params});
			if(res.records.length != 0){
				res.records.forEach(element => {
					element.active = true
				});
			}
			photoList.value = res.records;
		}
		// 视频操作
		async function getStart(params){
			let res = await controlApi.getStart({...params});
		}
		// 操作停止
		async function getStop(params){
			let res = await controlApi.getStop({...params});
		}
		// 拍照
		async function getCapture(params){
			let res = await controlApi.getCapture(facId);
			console.log(res,164)
			if(res){
				uni.showToast({
					title: `操作成功`
				})
			}else{
				uni.showToast({
					title: `操作失败`,
					icon:'error'
				})
			}
		}
		
		return{
			selectList,
			getDevicepage,
			getVideo,
			video,
			getPhoto,
			photoList,
			getStart,
			getStop,
			getCapture
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		.video_box {
			width: 100%;
		}
		.uni-list{
			line-height: 80rpx;
			text-align: right;
			.xia{
				width: 30rpx;
				height: 30rpx;
			}
			.uni-input{
				height: 80rpx;
				font-size: 34rpx;
			}
		}
		.video_event{
			padding: 20rpx;
			.video_handle{
				position: relative;
				height: 320rpx;
				.handle_box{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					height: 312rpx;
					width: 312rpx;
					background: #CDE5FF;
					border-radius: 50%;
					.handle_top{
						position: absolute;
						left: 50%;
						top: 10rpx;
						transform: translateX(-50%);
						width: 80rpx;
						height: 70rpx;
					}
					.handle_right{
						position: absolute;
						top: 50%;
						right: 10rpx;
						transform: translateY(-50%);
						height: 80rpx;
						width: 70rpx;
					}
					.handle_bottom{
						position: absolute;
						left: 50%;
						bottom: 10rpx;
						transform: translateX(-50%);
						width: 80rpx;
						height: 70rpx;
					}
					.handle_left{
						position: absolute;
						top: 50%;
						left: 10rpx;
						transform: translateY(-50%);
						height: 80rpx;
						width: 70rpx;
					}
					.handle_center{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						width: 85rpx;
						height: 78rpx;
					}
					.sub:active{
						opacity: 0.3;
					}
				}
			}
		}
		.video_event_name{
			position: relative;
			.all{
				position: absolute;
				right: 0;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
			}
		}
	}
</style>
