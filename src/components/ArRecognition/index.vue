<template>
  <view class="camera">
    <camera
      v-show="!isScanned"
      device-position="back"
      flash="off"
      @error="error"
      @initdone="initdone"
      class="camera_content"
    ></camera>
    <image
      v-show="isScanned"
      class="camera_content"
      :src="scanInfo.photo"
    ></image>

    <template v-if="isInitdone">
      <view v-if="!isScanned" class="camera_scaning">
        <image
          class="camera_scaning-img"
          src="/static/scan-move.png"
          alt=""
          :mode="'widthFix'"
        ></image>
      </view>
      <view v-else class="camera_scanned">
        <view class="camera_scanned-title">{{ scanInfo.plantName }}</view>
        <view class="camera_scanned-content">
          {{ scanInfo.description }}
        </view>

        <view class="camera_scanned-bottom">
          <view class="camera_scanned-button" @click="reScanHandle"
            >继续识别</view
          >
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  markRaw,
  nextTick,
  computed,
  watch,
} from "vue";
import { onShow, onHide } from "@dcloudio/uni-app";

export default defineComponent({
  setup(props, context) {
    const isInitdone = ref(false);
    const timeHandle = ref(undefined);
    const cameraListener = ref(null);
    const cameraData = ref(null);
    const isScanned = ref(false);
    const isShow = ref(false);
    const scanInfo = reactive({
      plantName: "",
      description: "",
      photo: "",
    });
    const isStartTask = computed(() => {
      return isShow.value && isInitdone.value;
    });

    watch(
      isStartTask,
      () => {
        nextTick(() => {
          if (cameraListener.value) {
            cameraListener.value.start();
          } else {
            startTacking();
          }

          if (!isScanned.value) {
            reScanHandle();
          }
        });
      },
      {
        immediate: true,
      }
    );

    function reScanHandle() {
      isScanned.value = false;
      startARTask();
    }

    /**
     * AR 任务
     * */
    async function arTask() {
      // 1.拍照
      scanInfo.photo = await toB64();
      if (!scanInfo.photo) {
        throw "no data";
      }
      // 2.上传图片
      const res = await uploadFile(scanInfo.photo);


      console.log(res,'uploadFile')
      scanInfo.plantName = res.plantName;
      scanInfo.description = res.description;
    }

    /**
     * 开始任务
     * */
    async function startARTask() {
      if (!isShow.value || isScanned.value) {
        return;
      }
      try {
        await arTask();

        isScanned.value = true;
      } catch (error) {
        console.log(error, "startARTask error");
        // 每秒调用一次
        timeHandle.value = setTimeout(() => {
          startARTask();
        }, 1000);
      }
    }

    function startTacking() {
      console.log("startTacking");
      let count = 0;
      const speedMaxCount = 30;
      const context = uni.createCameraContext();
      if (!context.onCameraFrame) {
        uni.showToast({
          title: '基础库 2.7.0 开始支持".',
          icon: "none",
        });
        return;
      }
      cameraListener.value = markRaw(
        context.onCameraFrame(async function (res) {
          if (isScanned.value || !isShow.value) {
            return;
          }
          if (count < speedMaxCount) {
            count++;
            return;
          }
          console.log(res, "startTacking");
          count = 0;
          cameraData.value = markRaw(res);
        })
      );

      cameraListener.value.start();
    }

    function stopTacking() {
      if (cameraListener.value) {
        cameraListener.value.stop();
      }
    }

    async function toB64() {
      return new Promise((resolve, reject) => {
        const frame = cameraData.value;
        if (!frame) {
          resolve("");
          return;
        }
        const u8Ary = new Uint8Array(frame.data);
        const clamped = new Uint8ClampedArray(u8Ary);

        context.emit("updateStyle", {
          width: `${frame.width}px`,
          height: `${frame.height}px`,
        });

        nextTick(() => {
          uni.canvasPutImageData({
            canvasId: "myCanvas",
            x: 0,
            y: 0,
            width: frame.width,
            height: frame.height,
            data: clamped,
            success() {
              console.log("绘制成功");
              // 转换临时文件
              uni.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: frame.width,
                height: frame.height,
                canvasId: "myCanvas",
                fileType: "jpg",
                destWidth: frame.width,
                destHeight: frame.height,
                // 精度修改
                quality: 0.8,
                success(res) {
                  console.log(res.tempFilePath, "tempFilePath");
                  resolve(res.tempFilePath);
                },
                fail(res) {
                  reject(res);
                },
              });
            },
            fail(res) {
              reject(res);
            },
          });
        });
      });
    }

    async function uploadFile(tempFile) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: `https://jxdd.hzdny.cn:44300/plant/AI/recognition`,
          filePath: tempFile,
          name: "files",
          success: ({ data, errMsg }) => {
            if (errMsg != "uploadFile:ok") {
              reject(errMsg || "");
              return;
            }

            resolve(JSON.parse(data).obj);
          },
          fail: (e) => {
            reject(e);
          },
        });
      });
    }

    function initdone({ detail }) {
      console.log(detail);
      isInitdone.value = true;
    }

    function error(e) {
      console.error(e);
    }

    onShow(() => {
      isShow.value = true;
      console.log("AR Show");
    });
    onHide(() => {
      console.log("AR Hide");
      isShow.value = false;
      cameraData.value = null;
      stopTacking();
      clearTimeout(timeHandle.value);
    });
    return {
      isInitdone,
      initdone,
      isScanned,
      scanInfo,
      error,
      reScanHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes move {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(480rpx);
  }
}

.camera {
  width: 100%;
  height: 100%;
  position: relative;

  &_content {
    width: 100%;
    height: 100%;
  }

  &_scaning {
    z-index: 1000;
    width: 500rpx;
    height: 500rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250rpx;
    margin-left: -250rpx;
    background-image: url("/static/scan.png");
    background-size: cover;

    &-img {
      z-index: 1001;
      width: 500rpx;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(0);
      animation-name: move;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  &_scanned {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    padding: 80rpx 30rpx 0;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background: rgba($color: #ffffff, $alpha: 0.7);
    border-radius: 40rpx 40rpx 0px 0px;
    display: flex;
    flex-flow: column;

    &-title {
      font-family: PingFangSC-Regular;
      font-size: 42rpx;
      color: #333333;
      letter-spacing: 1.32rpx;
      font-weight: 400;
      text-align: center;
    }

    &-content {
      margin-top: 40rpx;
      width: 100%;
      height: 495rpx;
      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      color: #333333;
      letter-spacing: 1.01px;
      font-weight: 400;
      overflow-y: auto;
    }

    &-bottom {
      width: 100%;
      min-height: 80rpx;
      display: flex;
      flex-grow: 1;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    &-button {
      width: 240rpx;
      height: 80rpx;
      background: #067dff;
      border-radius: 8rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      color: #ffffff;
      letter-spacing: 1.41rpx;
      text-align: center;
      font-weight: 400;
    }
  }
}
</style>
