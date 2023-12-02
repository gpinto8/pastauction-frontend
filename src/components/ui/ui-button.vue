<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  variant?: string;
  color?: string;
}

defineProps<Props>();
</script>

<template>
  <button
    class="w-full shadow bg-stone-900 font-normal focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded flex items-center justify-center space-x-3"
    :disabled="disabled"
    :class="[
      { 'bg-opacity-10': disabled },
      { 'bg-white text-blue-800 shadow-none': variant === 'tonal' },
      { '!bg-gray-100 shadow-none !text-black': color === 'gray' },
    ]"
  >
    <slot />
  </button>
</template>
