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
	export default defineComponent({
		components:{
			ModuleName,
			imgTab
		},
		setup() {
			const array = ref(['A型架第一监控设备', 'B型架第一监控设备', 'C型架第一监控设备', 'D型架第一监控设备'])
			const index = ref(0)
			
			
			const bindPickerChange = (e)=>{
				index.value = e.detail.value
			    facId = selectList.value[e.detail.value].facId;
				channel = selectList.value[e.detail.value].channel || null;
				accessToken = selectList.value[e.detail.value].accessToken || null;
				getVideo(facId)
			}
			
			const handelAll = ()=>{
				uni.navigateTo({
					url:`/pages/control/imgDetails?id=${facId}`
				})
			}
			const { selectList, getDevicepage, getVideo, video, photoList } = dataListAll()
			onMounted(()=>{
				getDevicepage()
			})
			
			// 按下事件
			const handelDown = (direction)=>{
				console.log('我按下了')
				const params = {
					accessToken: accessToken,
					deviceSerial: facId,
					channelNo: channel,
					direction,
					speed: 1,
				};
			}
			
			// 松开事件
			const handelUp = ()=>{
				console.log('我松开了')
				const payload = {
					accessToken: accessToken,
					deviceSerial: facId,
					channelNo: channel,
				};
				
			}
			
			const handelPhoto = ()=>{
				console.log('拍照')
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
		const photoList = ref(
			[
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// }
			]
		)
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
			channel = selectList.value[0].channel || null;
			accessToken = selectList.value[0].accessToken || null;
			getVideo(selectList.value[0].facId || null)
			getPhoto(selectList.value[0].facId || null)
		}
		
		async function getVideo(facId){
			
			let res = await controlApi.getVideo(facId);
			video.value = res.hls
		}
		
		async function getPhoto(facId){
			let params = {
				facId: facId,
				pageNum: 1,
				pageSize: 4,
				type: 0
			}
			let res = await controlApi.getPhoto({...params});
			
			photoList.value = res.records;
			console.log(photoList.value.length,138)
		}
		return{
			selectList,
			getDevicepage,
			getVideo,
			video,
			getPhoto,
			photoList,
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
