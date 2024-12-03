<script setup lang="ts">
import Filters from './Filters.vue';
import Gallery from './Gallery.vue';
import Inputs from './Inputs.vue';
</script>

<template>
  <div
    class="flex flex-col gap-6 md:max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <Filters class="md:!w-[1300px]" />
    <Gallery class="md:!w-[1300px]" />
    <Inputs class="md:!w-[1300px]" />
    <div class="flex w-full justify-end mt-2">
      <button class="bg-black p-2 text-sm rounded-md text-white h-8 w-40">
        Save
      </button>
    </div>
  </div>
</template>
