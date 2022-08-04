<template>
    <view class="monitor-element">
        <view class="monitor-element_value">{{ elementData.value }}</view>
        <view class="monitor-element_name">{{ elementData.name }}</view>
    </view>
</template>

<script>
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
        font-weight: 600;
        padding: 5rpx;
        letter-spacing: 0.67rpx;
        color: #000;
    }

    &_name {
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #666666;
        letter-spacing: 0.67rpx;
        font-weight: 400;
        padding: 5rpx;
    }
}
</style>