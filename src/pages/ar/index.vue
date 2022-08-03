<template>
  <view class="camera">
    <camera v-show="!isScanned" device-position="back" flash="off" @error="error" class="camera_content"></camera>
    <image v-show="isScanned" class="camera_content" :src="photo"></image>

    <view v-if="!isScanned" class="camera_scaning">
      <!-- <img class="camera_scaning-img" src="/static/scaning.png" alt=""> -->
      <view class="camera_scaning-img"></view>
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
  </view>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  markRaw,
  nextTick
} from "vue";
import { onShow, onHide } from "@dcloudio/uni-app";
let num = 0

export default defineComponent({
  setup() {
    const cameraCtx = ref(null);
    const photo = ref('')
    const isScanned = ref(false);
    const isShow = ref(false);
    const timeHandle = ref(undefined);
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
    });

    function takePhoto() {
      return new Promise((resolve, reject) => {
        if (!cameraCtx.value) {
          reject("cameraCtx未定义");
          return;
        }
        cameraCtx.value?.takePhoto({
          quality: "high",
          success: (res) => {
            resolve(res.tempImagePath);
          },
          fail: (e) => {
            reject(e);
          },
        });
      });
    }

    function reScanHandle() {
      clearTimeout(timeHandle.value);
      num = 0;
      isScanned.value = false;
      startARTask();
    }

    /**
     * AR 任务
     * */
    async function arTask() {
      // 1.拍照
      photo.value = await takePhoto();
      // 2.上传图片
      console.log(photo);

      if (num++ < 6) {
        throw "no data"
      }
    }

    /**
     * 开始任务
     * */
    async function startARTask() {
      if (!isShow.value) {
        return
      }
      try {
        await arTask();

        isScanned.value = true;
      } catch (error) {
        // 每秒调用一次
        timeHandle.value = setTimeout(() => {
          startARTask();
        }, 1000);
      }
    }

    function error(e) {
      console.error(e);
    }

    onShow(() => {
      isShow.value = true
      nextTick(() => {
        if (!cameraCtx.value) {
          cameraCtx.value = markRaw(uni.createCameraContext());
        }

        if (!isScanned.value) {
          reScanHandle()
        }
      })
      console.log("AR Show");
    });
    onHide(() => {
      console.log("AR Hide");
      isShow.value = false
      clearTimeout(timeHandle.value);
    });
    return {
      isScanned,
      photo,
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
    transform: translateY(500rpx);
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
    z-index: 10;
    width: 500rpx;
    height: 500rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250rpx;
    margin-left: -250rpx;
    background-image: url("/static/scan.gif");
    background-size: cover;

    &-img {
      width: 500rpx;
      height: 10rpx;
      position: absolute;
      top: 0;
      left: 0;
      background-color: pink;
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
      background: #067DFF;
      border-radius: 8rpx;
      display: flex;
      justify-content: center;
      align-items: center;


      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      color: #FFFFFF;
      letter-spacing: 1.41rpx;
      text-align: center;
      font-weight: 400;
    }
  }
}
</style>
