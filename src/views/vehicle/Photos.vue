<template>
  <div>
      <div :class="gridLayout">
        <Photo
          v-for="i in 9" :big="i == 1"
          :id="store.vehicle.id"

        ></Photo>
      </div>

    <div class="flex justify-end mt-4">
      <div class="flex items-center blue">
        <AppIcon type="plus_rounded" />
        <span>Add more photos</span>
      </div>
    </div>

    <div>
      <h2 class="text-lg mb-[16px]">Registration certificate</h2>
      <div :class="gridLayout">
        <Photo v-for="i in 6" />
      </div>
      <div class="flex justify-end mt-4">
        <div class="flex items-center blue">
          <AppIcon type="plus_rounded" />
          <span>Add more photos</span>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-lg mb-[16px]">Service book</h2>
      <div :class="gridLayout">
        <Photo v-for="i in 6" />
      </div>
      <div class="flex justify-end mt-4">
        <div class="flex items-center blue">
          <AppIcon type="plus_rounded" />
          <span>Add more photos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import { useVehicleStore } from '@/store/vehicle/vehicle';
import { onMounted } from 'vue';
import Photo from './photos/photo.vue';

const vehicleStore = useVehicleStore();
const store = useEditVehicleStore();
const gridLayout = 'grid lg:grid-cols-6 gap-[16px]';

function uploadImage() {}

// onMounted(() => {
//   vehicleStore.getVehiclePhotos(1).then(console.log);
// });
</script>
