<template>
	<xiaochao-indexed-list :quanbushuju="shuju" @click="bindClick"></xiaochao-indexed-list>
</template>

<script>
	//引入的演示数据，替换自己的后可以删除组件目录下 shujuliebiao.js文件
	import obj from "@/uni_modules/xiaochao-indexed-list/components/xiaochao-indexed-list/shujuliebiao.js";
	export default {
		data() {
			return {
				shuju: obj.obja
			}
		},
		methods: {
			bindClick(e) {
				console.log(e.linshi);
				uni.showToast({
					title: e.linshi,
				});
			}
		}
	}
</script>

<style>

</style>
