<script setup lang="ts">
import { ref } from 'vue';
import config from '@/config';

 defineProps<{
  label: string;
  logo: string;
  size: number;
}>();

const apiUrl = ref(config.apiUrl);
</script>

<template>
  <div class="px-14 mt-12">
    <v-sheet :elevation="1" class="container d-flex flex-column justify-center align-center">
      <div class="img-container d-flex justify-center align-center">
        <img :src="`${apiUrl}/photo/${logo}`" :width="size" :height="size" />
      </div>
      <div class="label">{{ label }}</div>
    </v-sheet>
  </div>
</template>

<style scoped>
.container {
  border-radius: 12px;
  width: 138px;
  height: 160px;
}

.img-container {
  width: 88px;
  height: 88px;
  margin: 2px;
  background: #fafafa;
}

.label {
  text-align: center;
  font-size: 15px;
}
</style>