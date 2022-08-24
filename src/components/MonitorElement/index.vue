<template>
    <view class="monitor-element">
        <view class="monitor-element_value">{{ elementData.evalue }} {{ elementData.eunit }}</view>
        <view class="monitor-element_name">{{ elementData.ename }}</view>
    </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        elementData: {
            type: Object,
            default: () => ({
                datetime: '',
                ekey: '',
                ename: '',
                enum: '',
                eunit: '',
                evalue: ''
            })
        }
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
.monitor-element {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-image: url('./img/temperat.png');
    background-size: cover;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    &_value {
        box-sizing: border-box;
        width: 100%;
        font-size: 36rpx;
        font-weight: 600;
        padding: 5rpx;
        letter-spacing: 0.67rpx;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }

    &_name {
        box-sizing: border-box;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #666666;
        letter-spacing: 0.67rpx;
        font-weight: 400;
        padding: 5rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
}
</style>