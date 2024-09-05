<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string;
  width?: number;
  color: 'red' | 'green' | 'blue';
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const width = computed(() => (props.width ? `${props.width}px` : '90px'));

const colorClass = computed(() => (props.modelValue ? props.color : 'grey'));
const widthStyle = computed(() => ({ width: width.value }));

function toggle() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <v-btn
    class="mr-2 text-white text-none font-normal"
    :class="colorClass"
    :style="widthStyle"
    @click="toggle"
  >
    <slot>{{ label }}</slot>
  </v-btn>
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

.grey {
  background-color: #888a8c;
}
</style>
