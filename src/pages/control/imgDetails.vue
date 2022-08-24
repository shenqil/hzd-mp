<template>
	<view>
		<imgTab :loadTxt="loadTxt" :photoList="photoList"></imgTab>
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
				
			])
			const loadTxt = ref(null)
			onLoad((option)=>{
				getPhoto(option.id)
			})
			
			async function getPhoto(facId){
				let params = {
					facId: facId,
					pageNum: 1,
					pageSize: 10000,
					type: 1
				}
				let res = await controlApi.getPhoto({...params});
				if(res.records.length != 0){
					loadTxt.value = '没有更多了'
					res.records.forEach(element => {
						element.active = true
					});
				}else{
					loadTxt.value = '暂无数据'
				}
				photoList.value = res.records;
			}
			
			return {
				photoList,
				loadTxt
				
			}
		}
		
	})
</script>

<style lang="scss" scoped>
	
</style>
