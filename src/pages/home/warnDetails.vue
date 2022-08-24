<template>
  <view class="taskDetails" v-if="dataDetails">
    <ContentLine
      leftContent="阈值:"
      :rightContent="dataDetails.threshold || '-'"
    />
    <ContentLine leftContent="实际:" :rightContent="content" />
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import ContentLine from "@/components/ContentLine/ContentLine.vue";
let parmes = null;
export default defineComponent({
  components: {
    ContentLine,
  },
  onLoad(options) {
    parmes = JSON.parse(options.textObj);
  },
  setup() {
    const dataDetails = ref(null);

    const content = computed(() => {
      if (!dataDetails.value) {
        return;
      }
      const {
        elementName = "",
        operatorName = "",
        evalue = "",
      } = dataDetails.value;
      return `${elementName}${operatorName}${evalue}`;
    });

    onMounted(() => {
      dataDetails.value = parmes;
    });
    return {
      content,
      dataDetails,
    };
  },
});
</script>
