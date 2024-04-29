<script setup lang="ts">
import { computed, defineProps } from 'vue';
interface Props {
  image: string | number | null;
  color?: string;
}

const props = defineProps<Props>();
const img = computed(() => `@/assets/icons/icon-${props.image}`);
</script>

<template>
  <button class="btn" :class="color">
    <img v-if="image === 'google'" src="@/assets/icons/icon-google.svg" />
    <img v-else-if="image === 'apple'" src="@/assets/icons/icon-apple.svg" />
    <img
      v-else-if="image === 'facebook'"
      src="@/assets/icons/icon-facebook.svg"
    />
    <img v-else :src="img" />
  </button>
</template>

<style lang="scss">
.btn {
  @apply h-12 w-24 shadow-lg rounded-md flex items-center justify-center;
}
.white {
  @apply bg-white;
}
.dark {
  @apply bg-stone-900;
}
.blue {
  @apply bg-blue-600;
}
</style>
