<script lang="ts" setup>
import Gallery from './gallery/Gallery.vue';
import Filters from './Filters.vue';
import BeforeSuggested from './BeforeSuggested.vue';
import MainPicture from './MainPicture.vue';
import SelectionInputs from './SelectionInputs.vue';
import AdminReview from './AdminReview.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto"
  >
    <Filters />
    <div class="flex flex-col gap-7 justify-between w-full mt-6">
      <div
        class="flex flex-col md:flex-row justify-between gap-6 overflow-auto h-full pb-3"
      >
        <Gallery :vehicleId="vehicleId" :key="_" v-for="_ in new Array(3)" />
      </div>
      <div class="flex flex-col md:flex-row gap-4 w-full md:justify-between">
        <BeforeSuggested class="md:!w-1/3" />
        <MainPicture class="md:!w-1/3" />
        <SelectionInputs class="md:!w-1/3" />
      </div>
    </div>
    <AdminReview />
  </div>
</template>
