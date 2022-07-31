<script lang="ts">
import { defineComponent } from 'vue'
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

export default defineComponent({
  setup() {
    onLaunch(() => {
      console.log("App Launch");
    });
    onShow(() => {
      console.log("App Show");
    });
    onHide(() => {
      console.log("App Hide");
    });
  }
})

</script>
<style>
page {
  height: 100%;
}
</style>
