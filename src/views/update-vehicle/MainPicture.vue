<script setup lang="ts">
import { computed } from 'vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  class: string;
  vehicleData: any;
}>();

const updateVehicleStore = updateVehicle();

const image = computed(() => {
  const path =
    updateVehicleStore.selectedImageVehicleData?.photo_path ||
    props.vehicleData?.photo_path;
  if (path) return `https://pastauction.com/api/v1/photo/${path}`;
});

const brandName = computed(() => {
  const name =
    updateVehicleStore.selectedImageVehicleData?.brand_name ||
    props.vehicleData?.brand_name;
  if (name) return name;
});
</script>

<template>
  <div class="w-full flex flex-col gap-4 items-center" :class="class">
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
      <p v-if="brandName" class="text-[#212529] text-base">{{ brandName }}</p>
    </div>
  </div>
</template>
