<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  width?: number;
  height?: number;
  color: 'red' | 'green' | 'blue';
}>();

const defaultWidth = 40;
const defaultHeight = 8;
const internalWidth = ref(props.width ?? defaultWidth);
const internalHeight = ref(props.height ?? defaultHeight);

const colorClass = computed(() => props.color);
</script>

<template>
  <v-sheet
    rounded="rounded"
    class="mx-auto"
    :class="colorClass"
    :height="internalHeight"
    :width="internalWidth"
  ></v-sheet>
</template>

<style scoped>
.red {
  background-color: #d80027;
}

.green {
  background-color: #6da544;
}

.blue {
  background-color: #227ad2;
}
</style>
