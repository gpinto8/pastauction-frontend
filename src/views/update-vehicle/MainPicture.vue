<script setup lang="ts">
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import { computed, ref } from 'vue';

defineProps<{
  class: string;
}>();

const updateVehicleStore = updateVehicle();

const image = computed(() => {
  const data = updateVehicleStore.parametersResponseData?.items;
  if (!data) return;

  return `https://pastauction.com/api/v1/photo/${data[0].photo_path}`;
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-4 justify-center items-center"
    :class="class"
  >
    <div class="w-full flex flex-col gap-3">
      <p class="text-[#21252999] text-sm block sm:hidden">
        Select the appropriate gallery for this vehicle
      </p>
      <img
        :src="image"
        alt=""
        width="400"
        height="400"
        class="rounded-md w-full"
      />
      <p class="text-[#212529] text-base">2000 Porsche Carrera 4S black</p>
    </div>
  </div>
</template>
