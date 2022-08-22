<template>
	<view>
		<imgTab :photoList="photoList"></imgTab>
	</view>
</template>

<script>
	import { defineComponent, ref, onMounted } from 'vue'
	import { onLoad } from "@dcloudio/uni-app";
	import controlApi from '@/api/control';
	import imgTab from '@/components/imgTab/imgTab.vue'
	export default defineComponent({
		components:{
			imgTab
		},
		setup() {
			const photoList = ref([
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
				// {
				// 	url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2017%2F10%2F06%2Fe1329828d8453d50%21400x400_big.jpg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662018586&t=3d5177d8f0a38792c2f9bfc24e571f5d",
				// 	active: true
				// },
			])
			
			
			
			onLoad((option)=>{
				getPhoto(option.id)
			})
			
			async function getPhoto(facId){
				let params = {
					facId: facId,
					pageNum: 1,
					pageSize: 10000,
					type: 0
				}
				let res = await controlApi.getPhoto({...params});
				
				photoList.value = res.records;
			}
			
			return {
				photoList
				
			}
		}
		
	})
</script>

<style lang="scss" scoped>
	
</style>
