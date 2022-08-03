<template>
	<xiaochao-indexed-list :quanbushuju="shuju" @click="bindClick"></xiaochao-indexed-list>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	//引入的演示数据，替换自己的后可以删除组件目录下 shujuliebiao.js文件
	import obj from "@/uni_modules/xiaochao-indexed-list/components/xiaochao-indexed-list/shujuliebiao.js";
	export default defineComponent({
		setup() {
			const shuju = ref(obj.obja);
			const bindClick = (e)=>{
				uni.showToast({
					title: e.linshi,
				});
			}
			return {
				shuju,
				bindClick
			}
		}
		
	})
</script>

<style>

</style>
