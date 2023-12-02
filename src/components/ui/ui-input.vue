<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  modelValue: any;
  type?: string;
  placeholder?: string;
  id?: string;
  label?: string;
  outlined?: boolean;
  class?: any;
  required?: boolean;
  errorMessage?: string | [] | undefined | any;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "input", value: string | number | null): void;
  (e: "change", value: string | number | null): void;
}>();

const value = computed<typeof props.modelValue>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const error = computed(() => props.errorMessage?.length > 0);
</script>

<template>
  <div class="relative w-full">
    <label class="block text-base font-normal mb-1">{{ label }}</label>
    <input
      v-model="value"
      class="bg-gray-white appearance-none border shadow-md border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
      :class="{
        'border-red-500 focus:border-red-500': error,
        'border-[#42d392] ': value && !error,
      }"
      :type="type || 'text'"
      :placeholder="placeholder"
      @input="emit('input', ($event as any)?.target?.value)"
      @change="emit('change', ($event as any)?.target?.value)"
      :required="required"
    />
    <small class="text-red-500">
      <span v-if="error">{{ errorMessage[0] }}</span>
    </small>
    <slot></slot>
  </div>
</template>
