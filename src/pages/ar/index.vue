<template>
  <view class="camera">
    <camera device-position="back" flash="off" @error="error" class="camera-content"></camera>
    <view v-if="isScanned" class="camera-scaning">
      <button @click="reScanHandle">重新扫描</button>
      这是一个西瓜
    </view>
    <view v-else class="camera-scanned">
      <image src="/static/scan.gif" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, markRaw, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    const cameraCtx = ref<UniApp.CameraContext>();
    const isScanned = ref(false)
    const timeHandle = ref<any>(undefined)

    function takePhoto() {
      return new Promise((resolve, reject) => {
        if (!cameraCtx.value) {
          reject("cameraCtx未定义")
          return
        }
        cameraCtx.value?.takePhoto({
          quality: 'high',
          success: (res) => {
            resolve(res.tempImagePath)
          },
          fail: (e) => {
            reject(e)
          }
        });
      })
    }

    function reScanHandle() {
      clearTimeout(timeHandle.value)
      isScanned.value = false
      startARTask()
    }

    /**
     * AR 任务
     * */
    async function arTask() {
      // 1.拍照
      const photo = await takePhoto()
      // 2.上传图片
      console.log(photo)
    }

    /**
     * 开始任务
     * */
    async function startARTask() {
      try {
        await arTask()
      } catch (error) {
        console.error(error)
        // 每秒调用一次
        timeHandle.value = setTimeout(() => {
          startARTask()
        }, 1000)
      }

      isScanned.value = true
    }

    function error(e: any) {
      console.error(e);
    }

    onMounted(() => {
      cameraCtx.value = markRaw(uni.createCameraContext());
      startARTask()
      console.log('AR onMounted')
    });

    onUnmounted(() => {
      clearTimeout(timeHandle.value)
      console.log('AR onUnmounted')
    })

    return {
      isScanned,
      error,
      reScanHandle
    };
  },
});
</script>

<style lang="scss" scoped>
.camera {
  width: 100%;
  height: 100%;
  position: relative;

  &-content {
    width: 100%;
    height: 100%;
  }

  &-scaning {
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0px;
    top: 100px;
  }

  &-scanned {
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0px;
    top: 100px;
  }
}
</style>
