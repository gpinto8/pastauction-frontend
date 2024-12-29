<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ColorUpdateFilters from './ColorUpdateFilters.vue';
import Gallery from './Gallery.vue';
import Inputs from './Inputs.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const vehicleData = ref();

onMounted(async () => {
  axios
    .get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`
    )
    .then(response => {
      const _vehicleData = response.data?.items[0];
      if (!_vehicleData) return;

      vehicleData.value = _vehicleData;
    });
});
</script>

<template>
  <div
    class="flex flex-col gap-6 md:max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <ColorUpdateFilters class="md:!w-[1300px]" :vehicleData="vehicleData" />
    <Gallery class="md:!w-[1300px]" :vehicleData="vehicleData" />
    <Inputs class="md:!w-[1300px]" :vehicleData="vehicleData" />
    <div class="flex w-full justify-end mt-2">
      <button class="bg-black p-2 text-sm rounded-md text-white h-8 w-40">
        Save
      </button>
    </div>
  </div>
</template>
