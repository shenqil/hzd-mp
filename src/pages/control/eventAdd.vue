<template>
	<view class="eventAdd">
		<div class="taskDetails_box">
			<div class="taskDetails_left">事件类型</div>
			<div class="taskDetails_right">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :range-key="'itemText'" :value="index"  :range="eventTypeList">
						<view class="uni-input">{{index != null?eventTypeList[index].itemText : '请选择'}}
							<image class="xia" src="../../static/control/xia.png" mode=""></image>
						</view>
					</picker>
				</view>
			</div>
		</div>
		<div class="eventDetails_describe">
			<div class="describe_title">事件描述</div>
			<div class="describe_textarea">
				<textarea maxlength="500" placeholder="请填写事件描述" v-model="describe" />
			</div>
		</div>
		<div class="eventDetails_describe">
			<div class="describe_title">图片添加</div>
			<div class="describe_img">
				<image class="img"  v-for="(item,index) in imgList" :key="index" :src="item" mode="">
					<span class="xx" @click="handelDel(index)">x</span>
				</image> 
				<image class="sub" @click="addImg" src="/static/control/add.png" mode=""></image>

			</div>
		</div>
		<!-- <div class="taskDetails_box">
			<div class="taskDetails_left">处理人</div>
			<div class="describe_input">
				<input type="text" v-model="handleMenber" placeholder="请输入处理人">
			</div>
		</div> -->
		
		<div class="taskDetails_box">
			<div class="taskDetails_left">处理人</div>
			<div class="taskDetails_right">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange1" :range-key="'username'" :value="index"  :range="userList">
						<view class="uni-input">{{userIndex != null?userList[userIndex].username : '请输入处理人'}}
							<image class="xia" src="../../static/control/xia.png" mode=""></image>
						</view>
					</picker>
				</view>
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">备注</div>
			<div class="describe_input">
				<input type="text" v-model="remark" placeholder="请输入备注">
			</div>
		</div>
		
		<div class="btn">
			<button type="primary" @click="submit">提交</button>
		</div>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref,
		onMounted
	} from 'vue'
	import { apiServer } from "@/http/index";
	import store from "@/store/index";
	import controlApi from '@/api/control';
	export default defineComponent({

		setup() {
			
			const index = ref(null)
			const userIndex = ref(null)
			const describe = ref(null)
			const imgList = ref([])
			const remark = ref(null)
			const bindPickerChange = (e) => {
				index.value = e.detail.value
			}
			const bindPickerChange1 = (e) => {
				userIndex.value = e.detail.value
			}
			const addImg = (e) => {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url:apiServer.baseUrl + '/file/image/uplode', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test',
								 sysDictItemId:30
							},
							success: (uploadFileRes) => {
							 
							  imgList.value.push(JSON.parse(uploadFileRes.data).obj)
							}
						});
					}
				});
				
			}
			const { eventTypeList, getSelectList, userList, getEventReport } = selectAll()
			onMounted(()=>{
				getSelectList()
			})
			
			const handelDel = (index)=>{
				imgList.value.splice(index,1)
			}
			// 提交
			const submit = ()=>{
				
				if(index.value ===null){
					uni.showToast({
						title: `请选择事件类型`,
						icon:'none'
					})
					return
				}
				
				if(describe.value === null){
					uni.showToast({
						title: `请填写事件描述`,
						icon:'none'
					})
					return
				}
				
				if(userIndex.value ===null){
					uni.showToast({
						title: `请选择处理人`,
						icon:'none'
					})
					return
				}
				
				if(imgList.value.length === 0){
					uni.showToast({
						title: `请上传图片`,
						icon:'none'
					})
					return
				}
				
				
				let params = {
					eventType: index.value !=null? eventTypeList.value[index.value].itemValue : null,
					handleMenber: userIndex.value !=null? userList.value[userIndex.value].id : null,
					describe: describe.value,
					remark: remark.value,
					photo: imgList.value.toString(),
					createUser: store.state.user.tokenInfo.userId
				}
				getEventReport(params)
			}
			return {
				index,
				bindPickerChange,
				describe,
				addImg,
				imgList,
				handelDel,
				eventTypeList,
				userList,
				userIndex,
				bindPickerChange1,
				remark,
				submit
			}
		}
	})
	
	function selectAll(){
		const eventTypeList = ref([])
		
		const userList = ref([])
		// 获取筛选列表
		async function getSelectList(){
			
			const res = await controlApi.getsysDictList({
					 dictCode: 'eventType'
			})
			
			eventTypeList.value = res.obj;
			
			
			const res1 = await controlApi.getxphUserList({
					 
			})
			userList.value = res1.obj.records
		}
		
		async function getEventReport(params){
			console.log(params,168)
			
			const res = await controlApi.getEventReport({
					 ...params
			})
			if(res.flag === 1){
				uni.navigateBack({
					delta: 1
				});
				uni.showToast({
					title: res.msg,
					icon:'success'
				})
				
			}else{
				uni.showToast({
					title: res.msg,
					icon:'error'
				})
			}
		}
		
		return {
			eventTypeList,
			getSelectList,
			userList,
			getEventReport
		}
	}
</script>

<style lang="scss" scoped>
	.eventAdd {
		.taskDetails_box {
			height: 80rpx;
			width: 100%;
			display: flex;
			border-bottom: 5rpx solid #F2F2F2;
			padding: 0 20rpx;
			box-sizing: border-box;

			.taskDetails_left {
				width: 30%;
				height: 80rpx;
				line-height: 80rpx;
				color: 30rpx;
			}

			.taskDetails_right {
				width: 70%;
				height: 80rpx;
				line-height: 80rpx;
				color: 30rpx;
				text-align: right;

				.xia {
					width: 30rpx;
					height: 30rpx;
				}
				
			}
			.describe_input{
				width: 70%;
				input{
					text-align: right;
					line-height: 80rpx;
					width: 100%;
					height: 80rpx;
				}
			}
			
		}

		.eventDetails_describe {
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 5rpx solid #f2f2f2;

			.describe_title {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 38rpx;
				color: #333333;
			}

			.describe_content {
				line-height: 60rpx;
				font-size: 32rpx;
				color: #333333;
				min-height: 200rpx;
			}

			.describe_img {
				.img {
					width: 180rpx;
					height: 180rpx;
					margin: 10rpx;
					position: relative;
					.xx{
						position: absolute;
						right: 0rpx;
						top: 0rpx;
						height: 40rpx;
						width: 40rpx;
						border-radius: 0 0 0 50%;
						background: rgba(0,0,0,.8);
						color: #ccc;
						line-height: 32rpx;
						text-align: center;
						font-size: 26rpx;
					}
				}

				.sub {
					width: 180rpx;
					height: 180rpx;
					margin: 10rpx;
				}

				.sub:active {
					opacity: 0.3;
				}
				
			}
		}
		.btn{
			width: 90%;
			margin: 30rpx auto;
		}
	}
</style>
