<template>
	<view v-if="!!dataDetails" class="eventDetails">
		<ContentLine :leftContent="'事件类型'" :rightContent="dataDetails.eventTypeName" />
		<div class="eventDetails_describe">
			<div class="describe_title">事件描述</div>
			<div class="describe_content">{{dataDetails.describe}}</div>
		</div>
		<div class="eventDetails_describe">
			<div class="describe_title">图片</div>
			<div class="describe_img">
				<image v-for="(item,index) in  dataDetails.photo" :key="index" :src="item" mode=""></image>
				<div class="nodeData" v-if="dataDetails.photo.length === 0">暂无图片</div>
			</div>
		</div>
		<ContentLine :leftContent="'处理人'" :rightContent="dataDetails.handleMenber" />
		<ContentLine :leftContent="'备注'" :rightContent="dataDetails.remark" />
		<ContentLine :leftContent="'事件状态'" :rightContent="dataDetails.statusName" />
		<div class="checkbox" v-if="dataDetails.statusName === '未确认'">
			<button type="primary" @click="handelClick">确认</button>
		</div>
	</view>
</template>

<script>
	
	import controlApi from '@/api/control';
	import { defineComponent, ref, onMounted } from 'vue'
	import ContentLine from '@/components/ContentLine/ContentLine.vue'
	let parmes = null;
	export default defineComponent({
		components: {
			ContentLine
		},
		onLoad(options){
			
			parmes = JSON.parse(options.textObj)
			parmes.photo =parmes.photo? parmes.photo.split(',') : []
		},
		setup() {
			const dataDetails = ref(null)
			onMounted(()=>{
				
				dataDetails.value = parmes;
				console.log(dataDetails.value,40)
			})
			
			// 事件确认
			const handelClick = ()=>{
				let params = {
					id : dataDetails.value.id,
					status : 1,
				}
				
				getState(params)
				
			}
			
			async  function getState(params){
				let res = await controlApi.getEventUpdate({...params});
				console.log(res,55)
				if(res.flag === 1){
					dataDetails.value.statusName = '确认';
					dataDetails.value.status = 1;
					uni.showToast({
						title: res.msg,
						icon:'success'
					})
				}
			}
			return {
				dataDetails,
				handelClick
			}
		}
		
	})
	
	
</script>

<style lang="scss">
.eventDetails{
	.eventDetails_describe{
		padding: 20rpx;
		box-sizing: border-box;
		border-bottom: 5rpx solid #f2f2f2;
		.describe_title{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #333333;
		}
		.describe_content{
			line-height: 60rpx;
			font-size: 32rpx;
			color: #333333;
			min-height: 200rpx;
		}
		.describe_img{
			image{
				width: 180rpx;
				height: 180rpx;
				margin: 10rpx;
			}
			.nodeData{
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
	.checkbox {
		margin: 40rpx 40rpx;
		padding-bottom: 20rpx;
	
		.cor {
			color: #3399FF;
		}
	
		> button {
			background-color: rgba(6, 125, 255, 1);
		}
	}
}
</style>
