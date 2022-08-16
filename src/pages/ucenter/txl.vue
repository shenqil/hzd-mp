<template>
	<xiaochao-indexed-list :quanbushuju="shuju" @click="bindClick"></xiaochao-indexed-list>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
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
			// 格式化数据
			const getCountryList = (resData)=>{
				let res = resData;
				this.shortcut=[];
				// 格式化数据
				var map = {};
				res.forEach((item, index) => {
				var key = item.orgCode.slice(0, 1);
				if (!map[key]) {
					this.shortcut.push(key)
					map[key] = {
					title: key,
					items: []
					}
				}
				map[key].items.push(item);
				})
				// 转为数组
				var ret = [];
				for (var k in map) {
				var val = map[k];
				ret.push(val);
				}
				// 排序
				ret.sort((a, b)=>{
				return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				});
				this.shortcut.sort((a, b) =>{
				return a.charCodeAt(0) - b.charCodeAt(0);
				});
				shuju.value = ret;
			// })
			}

			onMounted(()=>{
				let list = []
				// getCountryList(list)
			})
			return {
				shuju,
				bindClick
			}
		}
		
	})
</script>

<style>

</style>
