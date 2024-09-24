<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  totalImages: number;
  classContainer?: string;
}>();

const emit = defineEmits<{ (e: 'onPageChanged', value: number): void }>();

const onPageChanged = (value: number) => {
  let newValue = value;
  if (value === 0) newValue = 1;
  emit('onPageChanged', newValue);
};
</script>

<template>
  <div
    class="w-full flex gap-2 justify-center items-baseline pointer-events-auto"
    :class="classContainer"
  >
    <p>{{ totalImages }} items</p>
    <v-slider
      :max="totalPages"
      :model-value="currentPage"
      @end="onPageChanged"
      :step="1"
      show-ticks
      thumb-label
    ></v-slider>
  </div>
</template>
