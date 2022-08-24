<template>
    <ArRecognition @updateStyle="onUpdateStyle"/>

    <canvas class="canvas" canvas-id="myCanvas" :style="canvasStyle"></canvas>
</template>

<script>
import { defineComponent, ref} from "vue";

import ArRecognition from '@/components/ArRecognition/index.vue'

export default defineComponent({
  components:{
    ArRecognition
  },
  setup() {
    const canvasStyle = ref({
      width: "100vw",
      height: "100vh",
    });

    function onUpdateStyle(v) {
      canvasStyle.value = v
    }

    return {
      canvasStyle,
      onUpdateStyle
    };
  },
});
</script>

<style lang="scss" scoped>
.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 5000rpx;
  left: -500rpx;
}
</style>
