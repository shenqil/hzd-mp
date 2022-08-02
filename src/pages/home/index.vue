<template>
  <view class="home">
    <!-- tools -->
    <view class="home_tools">
      <view class="home_device-select">
        设备选择
        <image class="home_arrow-down" src="/static/arrow-down.png" />
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
        <InfoElement/>
        <InfoElement/>
        <InfoElement/>
        <InfoElement/>
        <InfoElement/>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, markRaw, onUnmounted } from "vue";
import ModuleName from '@/components/ModuleName/index.vue'
import MonitorElement from '@/components/MonitorElement/index.vue'
import ControlElement from '@/components/ControlElement/index.vue'
import InfoElement from '@/components/InfoElement/index.vue';
import demo from '@/api/demo';

export default defineComponent({
  components: {
    ModuleName,
    MonitorElement,
    ControlElement,
    InfoElement
  },
  setup() {
    onMounted(()=>{
      demo.test()
    })
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;

  &_tools {
    height: 40rpx;
    font-size: 24rpx;
    color: #333333;
    text-align: center;
    font-weight: 400;
    letter-spacing: 1.01rpx;
  }

  &_device-select {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  &_arrow-down {
    width: 16rpx;
    height: 12rpx;
    margin-left: 10rpx;
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
