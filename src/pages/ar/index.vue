<template>
  <view class="camera">
    <camera v-show="!isScanned" device-position="back" flash="off" @error="error" @initdone="initdone"
      class="camera_content"></camera>
    <image v-show="isScanned" class="camera_content" :src="scanInfo.photo"></image>

    <template v-if="isInitdone">
      <view v-if="!isScanned" class="camera_scaning">
        <image class="camera_scaning-img" src="/static/scan-move.png" alt="" :mode="'widthFix'"></image>
      </view>
      <view v-else class="camera_scanned">
        <view class="camera_scanned-title">{{ scanInfo.title }}</view>
        <view class="camera_scanned-content">
          {{ scanInfo.content }}
        </view>

        <view class="camera_scanned-bottom">
          <view class="camera_scanned-button" @click="reScanHandle">继续识别</view>
        </view>
      </view>
    </template>

    <canvas class="canvas" canvas-id="myCanvas" :style="canvasStyle"></canvas>
  </view>
</template>

<script>
import { defineComponent, ref, reactive, markRaw, nextTick, computed, watch } from "vue";
import { onShow, onHide } from "@dcloudio/uni-app";
let num = 0;

export default defineComponent({
  setup() {
    const isInitdone = ref(false);
    const timeHandle = ref(undefined);
    const cameraListener = ref(null);
    const cameraData = ref(null);
    const isScanned = ref(false);
    const isShow = ref(false);
    const canvasStyle = reactive({
      width: "100vw",
      height: "100vh",
    });
    const scanInfo = reactive({
      title: "植物名称：木兰草",
      content:
        "植物介绍：草莓又叫红莓、洋莓、地莓(Strawberry)等，是一种红色的水果。\
        草莓是对蔷薇科草莓属植物的通称，属多年生草本植物，在全世界已知有50多种，原产欧洲。\
        草莓的外观呈心形，鲜美红嫩，果肉多汁，酸甜可口，且有特殊的浓郁水果芳香。\
        由于草莓色、香、味俱佳，而且营养价值高，含丰富维生素C ，有帮助消化的功效，所以被人们誉为“水果皇后”。\
         草莓：草莓不但汁水充足，味道鲜美，还对人体健康有着极大的益处。草莓可以改善 肤色，减轻腹泻，缓解疾病。\
         与此同时，草莓还可以巩固齿龈，清新口气，润泽喉部。\
                 由于草莓色、香、味俱佳，而且营养价值高，含丰富维生素C ，有帮助消化的功效，所以被人们誉为“水果皇后”。\
         草莓：草莓不但汁水充足，味道鲜美，还对人体健康有着极大的益处。草莓可以改善 肤色，减轻腹泻，缓解疾病。\
         与此同时，草莓还可以巩固齿龈，清新口气，润泽喉部。",
      photo: "",
    });
    const isStartTask = computed(()=>{
      return isShow.value && isInitdone.value
    })

    watch(isStartTask,()=>{
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
    },{
      immediate:true
    })

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
      // scanInfo.photo = await toB642()
      if (!scanInfo.photo) {
        throw "no data";
      }
      // 2.上传图片
      console.log(scanInfo.photo, "photo");

      if (num++ < 6) {
        throw "no data";
      }
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
        console.log(error);
        // 每秒调用一次
        timeHandle.value = setTimeout(() => {
          startARTask();
        }, 1000);
      }
    }

    function startTacking() {
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
          console.log(res);
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
        canvasStyle.width = `${frame.width}px`;
        canvasStyle.height = `${frame.height}px`;

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
                  // // 临时文件转base64
                  // uni.getFileSystemManager().readFile({
                  //   filePath: res.tempFilePath, //选择图片返回的相对路径
                  //   encoding: 'base64', //编码格式
                  //   success: res => {
                  //     resolve(res.data)
                  //   }
                  // })
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

    function initdone({ detail }) {
      console.log(detail)
      isInitdone.value = true
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
      canvasStyle,
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

.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 5000rpx;
  left: -500rpx;
}
</style>
