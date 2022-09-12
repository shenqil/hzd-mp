<template>
  <view class="camera">
    <camera
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
        <view class="camera_scanned-body">
          <image class="camera_scanned-back" src="/static/back.png" />
          <view class="camera_scanned-container">
            <view class="camera_scanned-wrap">
              <view class="camera_scanned-img">
                <image
                  v-show="scanInfo.photo"
                  mode="aspectFill"
                  :src="scanInfo.photo"
                />
              </view>

              <view class="camera_scanned-text">
                <view class="camera_scanned-title">
                  <view>{{ scanInfo.plantName }}</view>
                  <image src="/static/record.png" @click="recordHandle" />
                </view>
                <view class="camera_scanned-content">
                  {{ scanInfo.description }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <image
          class="camera_scanned-identify"
          src="/static/identify.png"
          @click="reScanHandle"
        />
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
  onMounted,
  onUnmounted,
} from "vue";
var plugin = requirePlugin("WechatSI");
// 在js中创建音频对象
var innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false; //不让它自动播放
innerAudioContext.src = "";

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
      count: 0,
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
      innerAudioContext.stop();
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

      console.log(res, "uploadFile");
      if (scanInfo.plantName != res.plantName) {
        scanInfo.plantName = res.plantName;
        scanInfo.count = 0;
      }

      scanInfo.count++;

      if (scanInfo.count <= 1) {
        throw "数据不稳定";
      }

      scanInfo.description = res.description;
      scanInfo.count = 0;
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

        cameraData.value = null;
        isScanned.value = true;
      } catch (error) {
        console.log(error, "startARTask error");
        // 每秒调用一次
        timeHandle.value = setTimeout(() => {
          startARTask();
        }, 500);
      }
    }

    function startTacking() {
      console.log("startTacking");
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
      console.log(detail, "z-index");
      isInitdone.value = true;
    }

    function error(e) {
      console.error(e);
    }

    function recordHandle() {
      console.log("textToSpeech", scanInfo.description);
      if (!scanInfo.description) {
        return;
      }
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: scanInfo.description,
        success: function (res) {
          innerAudioContext.src = res.filename;
          innerAudioContext.play();
          console.log("succ tts", res.filename);
        },
        fail: function (res) {
          console.log("fail tts", res);
        },
      });
    }

    onMounted(() => {
      isShow.value = true;
      console.log("AR Show");
    });
    onUnmounted(() => {
      console.log("AR Hide");
      innerAudioContext.stop();
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
      recordHandle,
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
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
  }

  &_scaning {
    z-index: 10000;
    width: 500rpx;
    height: 500rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250rpx;
    margin-left: -250rpx;
    background-image: url("/static/scan.png");
    background-size: cover;
    overflow: hidden;

    &-img {
      z-index: 10001;
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
    position: absolute;
    left: 0px;
    bottom: 0px;
    display: flex;
    flex-flow: column;
    z-index: 10001;

    &-body {
      margin: 0 auto;
      position: relative;
    }

    &-back {
      width: 600rpx;
      height: 644rpx;
    }

    &-container {
      box-sizing: border-box;
      width: 600rpx;
      height: 644rpx;
      position: absolute;
      top: 0;
      left: 0;
      padding: 108rpx 24rpx 36rpx 56rpx;
    }

    &-wrap {
      width: 100%;
      height: 100%;
    }

    &-img {
      width: 520rpx;
      height: 260rpx;

      image {
        width: 520rpx;
        height: 260rpx;
      }
    }

    &-text {
      box-sizing: border-box;
      width: 520rpx;
      height: calc(100% - 280rpx);
      margin-top: 20rpx;
      background-color: rgba(6, 125, 255, 0.4);
    }

    &-title {
      font-size: 32rpx;
      color: #fff;
      font-weight: 400;
      padding: 10rpx 20rpx 20rpx 20rpx;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      image {
        width: 40rpx;
        height: 40rpx;
      }
    }

    &-content {
      box-sizing: border-box;
      padding: 0px 20rpx 20rpx 20rpx;
      width: 100%;
      height: 148rpx;
      font-size: 28rpx;
      overflow-y: auto;
      color: rgba($color: #fff, $alpha: 0.9);
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

    &-identify {
      width: 254rpx;
      height: 67rpx;
      margin: 20rpx auto 40rpx;
    }
  }
}

// .camera_scanned-content::-webkit-scrollbar {
//   width: 10rpx !important;
//   height: 10rpx !important;
//   background-color: rgba(0, 0, 0, 0) !important;
// }

// /*定义滚动条轨道 内阴影+圆角*/
// .camera_scanned-content::-webkit-scrollbar-track {
//   border-radius: 5rpx !important;
//   background-color: rgba(0, 0, 0, 0) !important;
// }

// /*定义滑块 内阴影+圆角*/
// .camera_scanned-content::-webkit-scrollbar-thumb {
//   border-radius: 5rpx !important;
//   background-color: rgba(6, 125, 255, 1) !important;
// }
</style>
