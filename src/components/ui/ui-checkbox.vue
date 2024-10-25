<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "onSelected"]);

const updateInput = ($event: any) => {
  emit("onSelected", $event.target.checked);
  emit("update:modelValue", $event.target.checked);
};
</script>
<template>
  <div class="flex items-center">
    <input
      v-bind="$attrs"
      :checked="modelValue"
      @change="updateInput"
      type="checkbox"
      class="h-4 w-4 focus:ring-0 cursor-pointer rounded"
    />
    <label
      :for="$attrs.id as any"
      class="ml-2 block text-sm text-gray-700 cursor-pointer"
    >
      <slot />
    </label>
  </div>
</template>
