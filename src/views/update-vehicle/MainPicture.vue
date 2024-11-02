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

const description = computed(() => {
  const desc =
    updateVehicleStore.selectedImageVehicleData?.vehicle_original_descr ||
    props.vehicleData?.vehicle_original_descr;
  if (desc) return desc;
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
      <p v-if="description" class="text-[#212529] text-base">
        {{ description }}
      </p>
    </div>
    <div class="flex border-[2px] border-solid border-black rounded-sm w-full">
      <input
        type="text"
        class="w-full rounded-sm p-2"
        placeholder="Add further information"
        v-model="updateVehicleStore.notesInput"
      />
    </div>
  </div>
</template>
