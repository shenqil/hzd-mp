<template>
    <view class="info-element" @click="handelClick">
        <view class="info-element_content">
            {{ elementData.contentName }}: {{ elementData.content }}
        </view>

        <view class="info-element_discoverer">
            <view class="info-element_discoverer-name">
                <view class="info-element_discoverer-inner">
                    {{ elementData.name }}: {{ elementData.discoverer }}
                </view>
            </view>
            <view class="info-element_discoverer-time">
                {{ elementData.time }}
            </view>
        </view>

        <image class="info-element_type" v-if="!elementData.icont || elementData.type"
            :src="filterPNG(elementData.type)"></image>
    </view>
</template>

<script>
import { defineComponent } from 'vue'
import alarmStatus from './img/alarmStatus.png'
import eventStatus from './img/eventStatus.png'

export default defineComponent({
    props: {
        elementData: {
            type: Object,
            default: () => ({
                type: "event",
                content: '第二地块监控设备异常',
                discoverer: '文化人',
                time: "14:00-15:20",
                name: '处理人',
                contentName: '告警内容',
                id: null
            })
        }
    },
    setup(props, context) {
        function filterPNG(type) {
            const map = {
                event: eventStatus,
                warning: alarmStatus,
            }

            return map[type] || eventStatus
        }

        const handelClick = () => {
            context.emit('handelClick', { ...props.elementData })
        }

        return {
            filterPNG,
            handelClick
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