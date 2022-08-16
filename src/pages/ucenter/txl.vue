<template>
	<xiaochao-indexed-list :quanbushuju="shuju" @click="bindClick"></xiaochao-indexed-list>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import vPinyin from './txl/vue-py'
	//引入的演示数据，替换自己的后可以删除组件目录下 shujuliebiao.js文件
	import obj from "@/uni_modules/xiaochao-indexed-list/components/xiaochao-indexed-list/shujuliebiao.js";
	let salesmanName ='zhangsan'
	// #调用汉字转拼音方法
	let namePinyin = vPinyin.chineseToPinYin(salesmanName)
	console.log(namePinyin,13)
	
	export default defineComponent({
		setup() {
			const shuju = ref(obj.obja);
			console.log(shuju,12)
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
