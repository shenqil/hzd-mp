<template>
    <view class="module-name">
        <view class="module-name_icon"></view>
        {{ name }}
    </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
.module-name {
    height: 45rpx;
    font-size: 32rpx;
    color: #333333;
    letter-spacing: 1.01rpx;
    text-align: center;
    font-weight: 400;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;

    &_icon {
        width: 0px;
        height: 20rpx;
        border: 6rpx solid rgba(6, 125, 255, 1);
        margin-right: 10rpx;
    }
}
</style>