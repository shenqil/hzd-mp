<template>
    <view class="control-element">
        <view class="control-element_name">
            {{ elementData.ename || '' }}
        </view>

        <view class="control-element_el">
            <switch :checked="elementData.evalue" color="#12CE66" style="transform:scale(0.5)" />
        </view>
    </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        blockName: {
            type: String,
            default: ''
        },
        elementData: {
            type: Object,
            default: () => ({
                datetime: '',
                ekey: '',
                ename: '',
                enum: '',
                evalue: ''
            })
        }
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
.control-element {
    width: 100%;
    box-sizing: border-box;
    height: 146rpx;
    background: #FFFFFF;
    box-shadow: 0px 8rpx 15rpx 0px rgba(6, 125, 255, 0.1);
    border-radius: 8rpx;
    margin-bottom: 30rpx;
    padding: 30rpx 20rpx;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-grow: 1;

    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #333333;
    letter-spacing: 0.67rpx;
    font-weight: 400;

    &_el {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>