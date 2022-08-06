<template>
    <view class="control-element">
        <view class="control-element_name">
            设备名称: {{ elementData.ename || '' }}
        </view>

        <view class="control-element_block">
            <view class="control-element_block-name">
                <view class="control-element_block-inner">
                    所属地块: {{ blockName || '' }}
                </view>
            </view>
            <view class="control-element_block-control">
                <switch :checked="elementData.evalue" color="#12CE66" style="transform:scale(0.6)" />
                <!-- <switch checked color="#12CE66" style="transform:scale(0.6)" />
                <switch checked color="#12CE66" style="transform:scale(0.6)" /> -->
            </view>
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

    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #333333;
    letter-spacing: 0.67rpx;
    font-weight: 400;

    &_block {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        &-name {
            display: flex;
            flex-grow: 1;
            min-width: 0;
        }

        &-inner {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &-control {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
        }
    }
}
</style>