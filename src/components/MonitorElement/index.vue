<template>
    <view class="monitor-element">
        <view class="monitor-element_value">{{ elementData.value }}</view>
        <view class="monitor-element_name">{{ elementData.name }}</view>
    </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        elementData: {
            type: Object,
            default: () => ({
                type: 'temperat',
                name: '大气温度',
                value: '32.6',
            })
        }
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
.monitor-element {
    width: 222rpx;
    height: 126rpx;
    margin: 10rpx 0;
    background-image: url('./img/temperat.png');
    background-size: cover;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    &_value {
        font-size: 40rpx;
        font-weight: 800;
        padding: 5rpx;
    }

    &_name {
        font-size: 28rpx;
        padding: 5rpx;
    }
}
</style>