<template>
	<view>
		<ContentLine leftContent="所属地块" :rightContent="dataDetails.blockName" />
		<ContentLine leftContent="种植类型" :rightContent="dataDetails.itemText" />
		<ContentLine leftContent="种植时间" :rightContent="dataDetails.plantingTime" />
		<ContentLine leftContent="种植面积" :rightContent="dataDetails.plantingArea" />
		<ContentLine leftContent="种植数量" :rightContent="dataDetails.plantingNum" />
		<ContentLine leftContent="单位" :rightContent="dataDetails.unit" />
		<ContentLine leftContent="备注" :rightContent="dataDetails.remark" />
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import ContentLine from '@/components/ContentLine/ContentLine.vue'
	let parmes = null;
	export default defineComponent({
		components: {
			ContentLine
		},
		onLoad(option){
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

</style>
