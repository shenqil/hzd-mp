<template>
	<view class="eventAdd">
		<div class="taskDetails_box">
			<div class="taskDetails_left">事件类型</div>
			<div class="taskDetails_right">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index] || '请选择设备'}}
							<image class="xia" src="../../static/control/xia.png" mode=""></image>
						</view>
					</picker>
				</view>
			</div>
		</div>
		<div class="eventDetails_describe">
			<div class="describe_title">事件描述</div>
			<div class="describe_textarea">
				<textarea maxlength="500" placeholder="请填写事件描述" v-model="textarea" />
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
		<div class="taskDetails_box">
			<div class="taskDetails_left">处理人</div>
			<div class="describe_input">
				<input type="text" placeholder="请输入处理人">
			</div>
		</div>
		<div class="taskDetails_box">
			<div class="taskDetails_left">备注</div>
			<div class="describe_input">
				<input type="text" placeholder="请输入备注">
			</div>
		</div>
		
		<div class="btn">
			<button type="primary">提交</button>
		</div>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default defineComponent({

		setup() {
			const array = ref(['人员受伤', '其他'])
			const index = ref(null)
			const textarea = ref(null)
			const list = ref([])
			const imgList = ref([])
			const bindPickerChange = (e) => {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index.value = e.detail.value
			}
			const addImg = (e) => {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://47.104.191.212:20010/file/image/uplode', //仅为示例，非真实的接口地址
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

			const handelDel = (index)=>{
				imgList.value.splice(index,1)
			}
			
			return {
				array,
				index,
				bindPickerChange,
				textarea,
				addImg,
				imgList,
				handelDel
			}
		}
	})
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
