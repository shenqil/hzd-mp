<template>
  <view class="home">
    <!-- tools -->
    <view class="home_tools">
      <view class="home_device-select">
        <DevicePicker :rangeKey="'blockName'" v-model:cur="blockData.cur" :list="blockData.list" :defaultTip="'地块选择'" />
      </view>
      <view class="home_device-select">
        <DevicePicker :rangeKey="'facName'" v-model:cur="deviceData.cur" :list="deviceData.list" :defaultTip="'设备选择'" />
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

<script lang="ts">
import { defineComponent, onMounted, reactive, computed, watch } from "vue";
import ModuleName from '@/components/ModuleName/index.vue'
import MonitorElement from '@/components/MonitorElement/index.vue'
import ControlElement from '@/components/ControlElement/index.vue'
import InfoElement from '@/components/InfoElement/index.vue';
import DevicePicker from './components/DevicePicker.vue';
import homeApi from '@/api/home';
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ModuleName,
    MonitorElement,
    ControlElement,
    InfoElement,
    DevicePicker
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.getters['user/userInfo'])
    const { blockData, deviceData, getBlockList } = useDevice(userInfo)
    onMounted(() => {
      getBlockList()
    })

    return {
      blockData,
      deviceData
    }
  }
})

// 设备列表Hook
function useDevice(userInfo) {
  const blockData = reactive({
    list: [],
    cur: "-1"
  })

  const deviceData = reactive({
    list: [],
    cur: "-1"
  })

  const blockID = computed(() => {
    const item = blockData.list[blockData.cur]
    if (item) {
      return item.id
    }

    return {}
  })

  const deviceID = computed(() => {
    const item = deviceData.list[deviceData.cur]
    if (item) {
      return item.id
    }

    return {}
  })

  watch(blockID, () => {
    getDeviceList()
  })

  // 获取地块列表
  async function getBlockList() {
    const res = await homeApi.getBlockList({
      // creatorId: userInfo.value.id
    })
    if (!Array.isArray(res.obj.records)) {
      console.error("返回数据不存在")
      return
    }
    blockData.cur = '0'
    blockData.list = res.obj.records
  }

  // 获取设备列表
  async function getDeviceList() {
    const blockId = blockID.value
    if (!blockId) {
      return
    }

    const res = await homeApi.getDeviceList({
      creatorId: userInfo.value.id,
      blockId
    })

    if (Array.isArray(!res.records)) {
      return
    }

    deviceData.cur = "0"
    deviceData.list = res.records
  }

  return {
    deviceID,
    blockData,
    deviceData,
    getBlockList
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
