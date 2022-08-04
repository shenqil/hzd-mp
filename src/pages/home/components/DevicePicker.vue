<template>
    <view class="device-picker">
        <picker @change="bindPickerChange" :value="cur" :range="list">
            <view class="device-picker_input">{{ list[cur] || defaultTip }}
                <image class="device-picker_down" src="/static/arrow-down.png" />
            </view>
        </picker>
    </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        list: {
            type: Array,
            default: () => []
        },
        cur: {
            type: Number || String,
            default: -1
        },
        defaultTip: {
            type: String,
            default: ''
        }
    },
    emits: ['update:cur'],
    setup(props, context) {
        function bindPickerChange(e) {
            context.emit('update:cur', e.detail.value)
        }

        return {
            bindPickerChange
        }
    }
})
</script>

<style lang="scss" scoped>
.device-picker {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    font-size: 24rpx;
    color: #333333;
    text-align: center;
    font-weight: 400;
    letter-spacing: 1.01rpx;
    
    &_input {
        max-width: 200rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &_down {
        width: 16rpx;
        height: 12rpx;
        margin-left: 10rpx;
    }
}
</style>