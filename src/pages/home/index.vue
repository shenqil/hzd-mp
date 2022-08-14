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
    <view v-if="monitorList && monitorList.length" class="home_monitor">
      <view class="home_monitor-name">
        <ModuleName :name="'环境监测'" />
      </view>

      <view class="home_monitor-list">
        <view class="home_monitor-item" v-for="item in monitorList" :key="item.ekey">
          <MonitorElement :elementData="item" />
        </view>
      </view>
    </view>

    <!-- 控制信息 -->
    <view v-if="controlList && controlList.length" class="home_control">
      <view class="home_control-name">
        <ModuleName :name="'控制中心'" />
      </view>

      <view class="home_control-list">
        <view class="home_control-item" v-for="item in controlList" :key="item.ekey">
          <view style="width: 100%;">
            <ControlElement :deviceID="deviceID" :elementData="item" />
          </view>
        </view>
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
import { defineComponent, ref, reactive, computed, watch, onUnmounted } from "vue";
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
    const isLogin = computed(() => store.getters["user/isLogin"]);

    const { deviceID, blockData, deviceData, deviceListLoading, blockInit } = useDeviceList(userInfo)
    const { monitorList, controlList, deviceInfoLoading } = useDeviceInfo(deviceID)

    const loading = computed(() => {
      if (deviceListLoading.value || deviceInfoLoading.value) {
        return true
      }

      return false
    })

    watch(isLogin, (v) => {
      if (v) {
        blockInit()
      }
    }, { immediate: true })

    watch(loading, (v) => {
      if (v) {
        uni.showLoading({
          title: "加载中..."
        });
      } else {
        uni.hideLoading()
      }
    })

    onUnmounted(() => {
      if (loading.value) {
        uni.hideLoading()
      }
    })

    return {
      deviceID,
      blockData,
      deviceData,
      monitorList,
      controlList
    }
  }
})

// 设备列表
function useDeviceList(userInfo) {
  const blockLoading = ref(false)
  const deviceLoading = ref(false)
  // 地块
  const blockData = reactive({
    list: [],
    cur: "-1"
  })

  // 设备
  const deviceData = reactive({
    list: [],
    cur: "-1"
  })

  // 当前选中块
  const blockItem = computed(() => {
    const item = blockData.list[blockData.cur]
    if (item) {
      return item
    }

    return {}
  })

  // 当前选中块ID
  const blockID = computed(() => {
    if (blockItem.value.id) {
      return blockItem.value.id
    }

    return ''
  })

  // 当前选中设备ID
  const deviceID = computed(() => {
    const item = deviceData.list[deviceData.cur]
    if (item) {
      return item.facId
    }

    return ""
  })

  const deviceListLoading = computed(() => {
    if (blockLoading.value || deviceLoading.value) {
      return true
    }

    return false
  })

  watch(blockID, async () => {
    if (deviceLoading.value) {
      console.log("getDeviceList 加载中")
      return
    }
    deviceLoading.value = true
    try {
      await getDeviceList()
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        uni.showToast({
          title: "设备列表获取失败",
          icon: "none"
        })
      })

    }
    deviceLoading.value = false
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

    if (!Array.isArray(res.records)) {
      return
    }

    deviceData.cur = "0"
    deviceData.list = res.records
  }

  async function blockInit() {
    if (blockLoading.value) {
      console.log("getBlockList 加载中")
      return
    }
    blockLoading.value = true
    try {
      await getBlockList()
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        uni.showToast({
          title: "地块列表获取失败",
          icon: "none"
        })
      })

    }

    blockLoading.value = false
  }

  return {
    deviceListLoading,
    blockItem,
    deviceID,
    blockData,
    deviceData,
    blockInit
  }
}

// 设备信息
function useDeviceInfo(deviceID) {
  const deviceInfoLoading = ref(false)
  const monitorList = ref([])
  const controlList = ref([])

  watch(deviceID, async () => {
    deviceInfoLoading.value = true
    try {
      await getDeviceInfo()
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        uni.showToast({
          title: "设备信息获取失败",
          icon: "none"
        })
      })

    }
    deviceInfoLoading.value = false
  })

  // 获取设备信息
  async function getDeviceInfo() {
    monitorList.value = []
    controlList.value = []
    if (!deviceID.value) {
      return
    }

    const res = await homeApi.getDeviceInfo({
      deviceId: deviceID.value
    })

    if (Array.isArray(res.currentDatas)) {
      monitorList.value = res.currentDatas
    }

    if (Array.isArray(res.relayDatas)) {
      controlList.value = res.relayDatas
    }
  }

  return {
    deviceInfoLoading,
    monitorList,
    controlList
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
      justify-content: flex-start;
    }

    &-item {
      width: 222rpx;
      height: 126rpx;
      margin: 10rpx 22rpx 10rpx 0;
      overflow: hidden;
    }

    &-item:nth-child(3n+3) {
      margin-right: 0px;
    }
  }

  &_control {
    margin-top: 30rpx;

    &-name {
      padding-bottom: 20rpx;
    }

    &-list {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-between;
    }

    &-item {
      min-width: 40%;
      display: flex;
      flex-grow: 1;
      margin-left: 5%;
    }

    &-item:nth-child(odd) {
      margin-left: 0px;
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
