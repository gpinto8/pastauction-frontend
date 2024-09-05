<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number;
  disabled?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const year = computed(() => +props.modelValue);
const isNextDisabled = computed(
  () => props.disabled || year.value === new Date().getFullYear()
);

function next() {
  if (!props.disabled && !isNextDisabled.value) {
    emit('update:modelValue', year.value + 1);
  }
}
function prev() {
  if (!props.disabled) {
    emit('update:modelValue', year.value - 1);
  }
}
</script>

<template>
  <div class="year-paginator">
    <span class="item arrow" :class="{ disabled: disabled }" @click="prev">
      &lt;
    </span>
    <span class="item mx-2" :class="{ disabled: disabled }">
      {{ modelValue }}
    </span>
    <span
      class="item arrow"
      :class="{ disabled: disabled || isNextDisabled }"
      @click="next"
    >
      &gt;
    </span>
  </div>
</template>

<style scoped>
.year-paginator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  color: blue;
}

.arrow {
  cursor: pointer;
}

.disabled {
  cursor: auto;
  color: grey;
}
</style>
