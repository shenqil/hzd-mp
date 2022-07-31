<template>
  <view class="content">
    <view >
      <view class="title">{{ storeCount }}</view>
      <view class="title">{{ isLogin }}</view>
      <view class="title">{{ userInfo }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const storeCount = computed((): number => store.getters['user/count'])
    const isLogin = computed((): number => store.getters['user/isLogin'])
    const userInfo = computed((): number => store.getters['user/userInfo'])

    onMounted(() => {
      setInterval(() => {
        store.dispatch('user/setCount')
      },1000)
    })

    return {
      storeCount,
      isLogin,
      userInfo
    }
  }
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
