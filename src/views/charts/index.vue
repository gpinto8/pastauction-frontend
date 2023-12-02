<template>
  <div class="my-4">
    <iframe
      name="my_iframe"
      :srcdoc="htmlContent"
      src="https://www.birthdaycalculatorbydate.com/"
      width="1200px"
      height="1200px"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChartsStore } from '@/store/charts/charts';

const store = useChartsStore();
const htmlContent = ref();

store.getCharts().then(res => (htmlContent.value = res));
</script>

<style scoped></style>
