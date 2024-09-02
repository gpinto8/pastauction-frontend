<script setup lang="ts">

const props = defineProps<{
    name: string,
    value: string,
}>()

</script>

<template>
    <div class="flex flex-col justify-start border-l-2 pl-2 sm:justify-center sm:items-center sm:border-l-0 sm:pl-0">
        <div class="text-base">{{ name }}</div>
        <div class="text-lg font-semibold">{{ value }}</div>
    </div>
</template>