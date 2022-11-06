<template>
	<view class="taskDetails">
		<ContentLine leftContent="所属地块" :rightContent="dataDetails.blockName||'-'" />
		<ContentLine leftContent="作业类型" :rightContent="dataDetails.farmingTypeName" />
		<ContentLine leftContent="作业时间" :rightContent="dataDetails.farmingTime" />
		<ContentLine leftContent="作业人员" :rightContent="dataDetails.farmingMenberName" />
		<ContentLine leftContent="状态" :rightContent="dataDetails.statusName" />
		<ContentLine leftContent="创建人" :rightContent="dataDetails.createUserName || '-'" />
		<ContentLine leftContent="备注" :rightContent="dataDetails.remark" />

		<view class="task-btn">
			<button @click="start">开始</button> <button @click="finish">完成</button>
		</view>
	</view>
</template>

<script>
	import controlApi from '@/api/control';
	import { defineComponent, ref ,onMounted} from 'vue'
	import ContentLine from '@/components/ContentLine/ContentLine.vue'
	let parmes = null;
	export default defineComponent({
		components: {
			ContentLine
		},
		onLoad(options){
			parmes = JSON.parse(options.textObj)
		},
		setup() {
			const dataDetails = ref(null)
			
			onMounted(()=>{
				dataDetails.value = parmes
				console.log(dataDetails.value.statusName,dataDetails.value.status)
			})

			function start() {
				uni.showLoading()
				controlApi.npFarmingUpdate({
					id:dataDetails.value.id,
					status:1
				})
				.then(()=>{
					dataDetails.value.statusName = '开始'
				})
				.catch((err)=>{
					console.log(err)
				})
				.finally(()=>{
					uni.hideLoading()
				})
			}

			function finish() {
				uni.showLoading()
				controlApi.npFarmingUpdate({
					id:dataDetails.value.id,
					status:2
				})
				.then(()=>{
					dataDetails.value.statusName = '完成'
				})
				.catch((err)=>{
					console.log(err)
				})
				.finally(()=>{
					uni.hideLoading()
				})
			}
			return {
				dataDetails,
				start,
				finish
			}
		}
	})
</script>

<style lang="scss">
.taskDetails{
	
}
.task-btn{
	margin-top: 30rpx;
	display: flex;
	flex-flow: row;
	justify-content: space-around;
	align-items: center;
	button {
		width: 30%;
		background-color: #3399FF;
		color: #fff;
		border: none;
	}
}
</style>
