<template>
	<view class="planting">
		<!-- 种植中心 -->
		<view class="planting_event">
		  <view class="planting_event_name">
		    <ModuleName :name="'种植中心'" />
			<div class="type">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index] || '种植类型'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<div class="massif">
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<view class="uni-input">{{array1[index1] || '所属地块'}} <image class="xia" src="../../static/control/xia.png" mode=""></image> </view>
				</picker>
			</div>
			<view class="planting_info_list">
			  <InfoElement v-for="(item,index) in 15 " :key="index" />
			  
			</view>
		  </view>
		</view>
		
	</view>
</template>

<script>
    import { defineComponent, ref } from 'vue'
	import ModuleName from '@/components/ModuleName/index.vue'
	import InfoElement from '@/components/InfoElement/index.vue';
	export default defineComponent({
		components: {
		  ModuleName,
		  InfoElement
		},
		setup() {
			const array = ref(['A型架第一', 'B型架第一', 'C型架第一', 'D型架第一'])
			const array1 = ref(['A型架第一', 'B型架第一', 'C型架第一监控设备', 'D型架第一'])
			const index = ref(null)
			const index1 = ref(null)
			const bindPickerChange= (e)=>{
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index.value = e.detail.value
			}
			
			const bindPickerChange1= (e)=>{
				console.log('picker发送选择改变，携带值为', e.detail.value)
				index1.value = e.detail.value
			}
			
			
			return {
				bindPickerChange,
				array,
				index,
				array1,
				index1,
				bindPickerChange1
			}
		}
	})
</script>

<style lang="scss" scoped>
.planting{
	.planting_event{
		padding: 20rpx;
		.planting_event_name{
			position: relative;
			width: 100%;
			.type{
				position: absolute;
				right: 10rpx;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
				width: 200rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 26rpx;
				text-align: right;
				.xia{
					width: 20rpx;
					height: 20rpx;
					
				}
			}
			.massif{
				position: absolute;
				right: 230rpx;
				top: 0;
				font-size: 32rpx;
				color: #409EFF;
				width: 200rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 26rpx;
				text-align: right;
				.xia{
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}
	.planting_info_list{
		margin: 20rpx 0;
	}
	
}
</style>
