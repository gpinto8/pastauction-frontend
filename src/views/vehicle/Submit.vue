<template>
  <div class="flex flex-col gap-[20px]">
    <div>
      <div class="flex justify-between items-center mb-[20px]">
        <h2 class="text-lg font-[500]">Vehicle photos</h2>
        <div>Edit</div>
      </div>

      <div class="grid lg:grid-cols-6 gap-[20px]">
        <Photo
          v-for="i in 5"
          :big="i == 1"
          :classes="{
            'lg:!min-h-[300px]': i == 1,
          }"
        ></Photo>
      </div>
    </div>

    <div
      class="card flex flex-col gap-[30px] sm:px-[69px] sm:py-[30px]"
      v-for="card in cards"
    >
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-[20px] font-[600] mb-[8px]">{{ card.title }}</h2>
          <p class="text-[#6C757D]">{{ card.subtitle }}</p>
        </div>
        <RouterLink :to="card.to">Edit</RouterLink>
      </div>
      <div>
        <div
          :class="`grid lg:grid-cols-${card.cols} gap-y-[16px] gap-x-[60px]`"
        >
          <div v-for="item in card.items" class="flex justify-between">
            <div class="font-[500]">{{ item[0] }}</div>
            <div class="text-[#6C757D]">{{ item[1] }}</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-[18px] font-[500] mb-[16px]">
          Registration certificate
        </h2>
        <div>Edit</div>
      </div>
      <div :class="gridLayout">
        <Photo v-for="i in 6" />
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-[18px] font-[500] mb-[16px]">Service book</h2>
        <div>Edit</div>
      </div>
      <div :class="gridLayout">
        <Photo v-for="i in 6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import { useVehicleStore } from '@/store/vehicle/vehicle';
import { onMounted } from 'vue';
import Photo from './photos/photo.vue';
import { reactive } from 'vue';

const vehicleStore = useVehicleStore();
const store = useEditVehicleStore();
const gridLayout = 'grid lg:grid-cols-6 gap-[16px]';

function uploadImage() {}

const specs = reactive([
  ['Year', store.vehicle.purchase_year],
  ['Vehicle Type', store.vehicle.type_vehicle],
  ["Driver's side", store.vehicle.driver_side],
  ['Make', store.vehicle.id_brand],
  ['Body', store.vehicle.body_id],
  ['Exterior color', store.vehicle.exterior_color_id],
  ['Family', store.vehicle.id_family],
  ['Doors', store.vehicle.doors],
  ['Interior color', store.vehicle.interior_color_id],
  ['Model', store.vehicle.model_id],
  ['Transmission', store.vehicle.transmission],
  ['Originality', store.vehicle.originality],
  ['Variant', store.vehicle.variant],
  ['Power', store.vehicle.power],
  ['Status', store.vehicle.status],
  // ['Series', store.vehicle.series],
  ['Engine capacity', store.vehicle.engine_capacity],
]);
const details = reactive([
  ['Mileage', store.vehicle.mileage],
  ['Plate Numb', store.vehicle.plate_numb],
  ['Original Miles', store.vehicle.original_miles],
  ['Vin', store.vehicle.vin],
  ['Locate', store.vehicle.location_id],
]);

const cards = [
  {
    title: 'Specs',
    subtitle: 'Details about this vehicle.',
    items: specs,
    to: 'overview',
    cols: 3,
  },
  {
    title: 'Details',
    subtitle: 'Details about this vehicle.',
    items: details,
    to: 'details',
    cols: 2,
  },
];

// onMounted(() => {
//   vehicleStore.getVehiclePhotos(1).then(console.log);
// });
</script>
