<script setup lang="ts">
import { computed } from 'vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  class: string;
  vehicleData: any;
}>();

const updateVehicleStore = updateVehicle();

const image = computed(() => {
  if (updateVehicleStore?.mainPicturePath)
    return updateVehicleStore?.mainPicturePath;
  return `https://pastauction.com/api/v1/photo/${props.vehicleData?.photo_path}`;
});

const brandName = computed(() => props.vehicleData?.brand_name);
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
