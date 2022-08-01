<template>
    <view class="info-element">
        <view class="info-element_content">
            告警内容: {{ elementData.content }}
        </view>

        <view class="info-element_discoverer">
            <view class="info-element_discoverer-name">
                <view class="info-element_discoverer-inner">
                    报告人: {{ elementData.discoverer }}
                </view>
            </view>
            <view class="info-element_discoverer-time">
                {{ elementData.time }}
            </view>
        </view>

        <image class="info-element_type" :src="filterPNG(elementData.type)"></image>
    </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import alarmStatus from './img/alarmStatus.png'
import eventStatus from './img/eventStatus.png'
import injuredState from './img/injuredState.png'
import otherStatus from './img/otherStatus.png'
import weatherStatus from './img/weatherStatus.png'
import jobStatus from './img/jobStatus.png'

export default defineComponent({
    props: {
        elementData: {
            type: Object,
            default: () => ({
                type: "event",
                content: '第二地块监控设备异常',
                discoverer: '文化人',
                time: "14:00-15:20"
            })
        }
    },
    setup() {
        function filterPNG(type:string) {
            const map = {
                event: eventStatus
            }

            return (map as any)[type] || eventStatus
        }

        return {
            filterPNG
        }
    }
})
</script>

<style lang="scss" scoped>
.info-element {
    width: 100%;
    box-sizing: border-box;
    height: 146rpx;
    background: #FFFFFF;
    box-shadow: 0px 8rpx 15rpx 0px rgba(6, 125, 255, 0.1);
    border-radius: 8rpx;
    padding: 30rpx 20rpx;
    margin-bottom: 30rpx;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    position: relative;

    &_content {
        width: calc(100% - 87rpx);
        height: 33rpx;
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #333333;
        letter-spacing: 0.67rpx;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &_discoverer {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        &-name {
            min-width: 0;
            display: flex;
            flex-grow: 1;
        }

        &-inner {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 33rpx;
            font-family: PingFangSC-Regular;
            font-size: 24rpx;
            color: #333333;
            letter-spacing: 0.67rpx;
            font-weight: 400;
        }

        &-time {
            height: 33rpx;
            font-family: PingFangSC-Regular;
            font-size: 24rpx;
            color: #999999;
            letter-spacing: 0.67rpx;
            font-weight: 400;
        }
    }
    &_type {
        position: absolute;
        width: 87rpx;
        height: 87rpx;
        top: 0;
        right: 0;
    }
}
</style>