<script lang="ts">
import { defineComponent, computed } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isLogin = computed((): boolean => store.getters["user/isLogin"]);

    onLaunch(() => {
      console.log("App Launch");

      // 监听路由变化
      (uni as any).onAppRoute((route:any) => {
        if (!isLogin.value && route.path != 'pages/login/login') {
          uni.redirectTo({
            url: "/pages/login/login",
          });
        }
      })
    });
    onShow(() => {
      console.log("App Show1");
    });
    onHide(() => {
      console.log("App Hide");
    });
  },
});
</script>
<style>
page {
  height: 100%;
}
</style>
