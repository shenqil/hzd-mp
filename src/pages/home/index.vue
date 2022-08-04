<template>
  <view class="home">
    <!-- tools -->
    <view class="home_tools">
      <view class="home_device-select">
        <DevicePicker v-model:cur="blockData.cur" :list="blockData.list" :defaultTip="'地块选择'" />
      </view>
      <view class="home_device-select">
        <DevicePicker v-model:cur="deviceData.cur" :list="deviceData.list" :defaultTip="'设备选择'" />
      </view>
    </view>

    <!-- 环境监测 -->
    <view class="home_monitor">
      <view class="home_monitor-name">
        <ModuleName :name="'环境监测'" />
      </view>

      <view class="home_monitor-list">
        <MonitorElement />
        <MonitorElement />
        <MonitorElement />
        <MonitorElement />
      </view>
    </view>

    <!-- 控制信息 -->
    <view class="home_control">
      <view class="home_control-name">
        <ModuleName :name="'控制中心'" />
      </view>

      <view class="home_control-list">
        <ControlElement />
        <ControlElement />
      </view>
    </view>

    <!-- 待办信息 -->
    <view class="home_info">
      <view class="home_info-name">
        <ModuleName :name="'待办信息'" />
      </view>
      <view class="home_info-list">
        <InfoElement />
        <InfoElement />
        <InfoElement />
        <InfoElement />
        <InfoElement />
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, ref, onMounted, markRaw, onUnmounted, reactive } from "vue";
import ModuleName from '@/components/ModuleName/index.vue'
import MonitorElement from '@/components/MonitorElement/index.vue'
import ControlElement from '@/components/ControlElement/index.vue'
import InfoElement from '@/components/InfoElement/index.vue';
import DevicePicker from './components/DevicePicker'
import demo from '@/api/demo';

export default defineComponent({
  components: {
    ModuleName,
    MonitorElement,
    ControlElement,
    InfoElement,
    DevicePicker
  },
  setup() {
    const { blockData, deviceData } = useDevice()
    onMounted(() => {
      console.log(demo)
      // demo.test()
    })

    return {
      blockData,
      deviceData
    }
  }
})

function useDevice() {
  const blockData = reactive({
    list: ['块1', '块2', '块3', '块4', '块5'],
    cur: -1
  })

  const deviceData = reactive({
    list: ['设备1', '设备2', '设备3', '设备4', '设备5'],
    cur: -1
  })

  return {
    blockData,
    deviceData
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;

  &_tools {
    height: 40rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  &_monitor {
    padding-top: 20rpx;

    &-list {
      margin-top: 10rpx;
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
  }

  &_control {
    margin-top: 30rpx;

    &-name {
      padding-bottom: 20rpx;
    }
  }

  &_info {
    margin-top: 40rpx;

    &-list {
      padding-top: 20rpx;
    }
  }
}
</style>
