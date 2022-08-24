<template>
	<view class="taskDetails">
		<ContentLine leftContent="所属地块" :rightContent="dataDetails.blockName||'-'" />
		<ContentLine leftContent="作业类型" :rightContent="dataDetails.farmingTypeName" />
		<ContentLine leftContent="作业时间" :rightContent="dataDetails.farmingTime" />
		<ContentLine leftContent="作业人员" :rightContent="dataDetails.farmingMenberName" />
		<ContentLine leftContent="状态" :rightContent="dataDetails.statusName" />
		<ContentLine leftContent="创建人" :rightContent="dataDetails.createUserName || '-'" />
		<ContentLine leftContent="备注" :rightContent="dataDetails.remark" />
	</view>
</template>

<script>
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
			})
			return {
				dataDetails
			}
		}
	})
</script>

<style lang="scss">
.taskDetails{
	
}
</style>
