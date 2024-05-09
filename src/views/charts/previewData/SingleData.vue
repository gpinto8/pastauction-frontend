<script setup lang="ts">

const props = defineProps<{
    name: string,
    value: string,
}>()

</script>

<template>
    <div class="flex flex-col">
        <div class="text-xl">{{ name }}</div>
        <div class="text-2xl">{{ value }}</div>
    </div>
</template>