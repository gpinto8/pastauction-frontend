<script setup lang="ts">
import Filters from './Filters.vue';
import Gallery from './Gallery.vue';
import Inputs from './Inputs.vue';
</script>

<template>
  <div class="flex flex-col gap-4">
    <Filters />
    <Gallery />
    <Inputs />
    <div class="flex w-full justify-end">
      <button class="bg-black p-2 text-sm rounded-md text-white h-8 w-40">
        Save
      </button>
    </div>
  </div>
</template>
