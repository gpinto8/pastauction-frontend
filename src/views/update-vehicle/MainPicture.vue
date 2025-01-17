<script setup lang="ts">
import { computed } from 'vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  class: string;
  vehicleData: any;
  isUserAdmin: boolean;
}>();

const updateVehicleStore = updateVehicle();

const image = computed(() => {
  let newPath = '';
  const path =
    updateVehicleStore.selectedImageVehicleData?.photo_path ||
    props.vehicleData?.photo_path;
  if (path) newPath = `https://pastauction.com/api/v1/photo/${path}`;

  const id =
    updateVehicleStore.selectedImageVehicleData?.vehicle_id ||
    props.vehicleData?.vehicle_id;

  return { path: newPath, id };
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
      <div>
        <img
          :src="image?.path"
          alt=""
          width="400"
          class="rounded-md w-full"
          :class="{ 'cursor-pointer': isUserAdmin }"
        />
        <v-tooltip
          v-if="isUserAdmin"
          activator="parent"
          location="top"
          :open-delay="1000"
        >
          <img :src="image?.path" alt="" width="800" class="rounded-md" />
          <div class="text-right w-full mb-3 ml-1">
            <span
              class="bg-black text-white p-2 mb-4 rounded-lg border-[2px] border-white"
            >
              ID: {{ image?.id }}
            </span>
          </div>
        </v-tooltip>
      </div>

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
