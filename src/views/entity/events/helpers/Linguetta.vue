<script setup lang="ts">
import { defineProps, computed, defineEmits, ref } from 'vue';

const props = defineProps<{
    width?: number,
    height?: number,
    color: 'red' | 'green' | 'blue',
}>();

const defaultWidth = 40;
const defaultHeight = 8;
const internalWidth = ref(props.width ?? defaultWidth);
const internalHeight = ref(props.height ?? defaultHeight);

const colorClass = computed(() => props.color);
</script>

<template>
    <v-sheet rounded="rounded" class="mx-auto" :class="colorClass" :height="internalHeight"
        :width="internalWidth"></v-sheet>
</template>

<style scoped>
.red {
    background-color: #D80027;
}

.green {
    background-color: #6DA544;
}

.blue {
    background-color: #227AD2;
}
</style>