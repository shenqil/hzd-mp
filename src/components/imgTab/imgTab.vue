<template>
	<view>
		<view class="list-box">
			<view 
				v-for="(item,index) in photoList" 
				:key="index" 
				:class="{'active':item.active}"
				:data-index="index"
				@tap="previewPhoto"
			>
				<image :src="item.url" mode="aspectFill" lazy-load="true"></image>
				<view>第 {{index+1}} 张图片</view>
			</view>
		</view>
		<view class="load">{{loadTxt}}</view>
	</view>
</template>

<script>
	import { defineComponent, ref} from 'vue'
	export default defineComponent({
		name:"imgTab",
		props:{
			photoList: Array
		},
		setup(props,context){
			const isGet = ref(true)
			const loadTxt = ref(null)
			if(props.photoList.length === 0){
				console.log(30)
				loadTxt.value = '暂无数据'
			}
			
			/* 预览照片 */
			const previewPhoto = (e)=>{
				
				let index=e.currentTarget.dataset.index;
				let list=props.photoList.map((item,index)=>{
					return item.url;
				});
				uni.previewImage({
					current:list[index],	
					urls: list
				});
			}
			
			
			return{
				isGet,
				loadTxt,
				previewPhoto
			}
		}
	})
</script>


<style lang="scss" scoped>
	page {
		background-color: #eee;
	}

	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;

		&>view {
			background-color: #fff;
			width: 50%;
			padding: 20upx;
			box-sizing: border-box;
			opacity: 0;
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}
	
	.load{
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
	.nodata{
		text-align: center;
		line-height: 80rpx;
	}
</style>