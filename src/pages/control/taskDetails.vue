<template>
	<view class="taskDetails">
		<ContentLine leftContent="所属地块" rightContent="A地块" />
		<ContentLine leftContent="作业类型" rightContent="草莓" />
		<ContentLine leftContent="作业时间" rightContent="2020-06-26 09:10:00" />
		<ContentLine leftContent="种植人员" rightContent="123" />
		<ContentLine leftContent="状态" rightContent="7" />
		<ContentLine leftContent="创建人" rightContent="亩" />
		<ContentLine leftContent="备注" rightContent="22235" />
	</view>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import ContentLine from '@/components/ContentLine/ContentLine.vue'
	export default defineComponent({
		components: {
			ContentLine
		},
		setup() {
			return {
				
			}
		}
	})
</script>

<style lang="scss">
.taskDetails{
	
}
</style>
