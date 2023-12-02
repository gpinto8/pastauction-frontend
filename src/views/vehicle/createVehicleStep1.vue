<template>
  <v-container>
    <br />
    <v-btn icon size="small" @click="router.back()">
      <app-icon type="arrow_left" />
    </v-btn>
    <div class="text-center pb-4">
      <template v-if="step === 1">
        <h3 class="text-2xl font-medium mb-2">Add vehicles</h3>
        <span class="font-medium text-grey">
          Fill in the following data to add your vehicle to the garage
        </span>
      </template>
      <template v-if="step === 2">
        <h3 class="text-2xl font-medium mb-2">Details</h3>
        <span class="font-medium text-grey">
          These additional specs will help us provide the most accurate comps.
        </span>
      </template>
    </div>

    <div v-if="step === 1" class="grid grid-cols-2 gap-6">
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.purchase_value"
          label="Is this a vehicle you want, have or had?"
          inline
        >
          <v-radio label="I have it" value="I have it" />
          <v-radio label="I want it" value="I want it" />
          <v-radio label="I had it " value="I had it" />
        </v-radio-group>
      </div>
      <v-select
        v-model="vehicle.year"
        label="Year"
        variant="outlined"
        density="compact"
        :items="[2020, 2021, 2022, 2023]"
      />
      <v-select
        v-model="vehicle.id_brand"
        :items="[2020, 2021, 2022, 2023]"
        label="Make"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.id_family"
        :items="[2020, 2021, 2022, 2023]"
        label="Family"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.model_id"
        :items="[2020, 2021, 2022, 2023]"
        label="Model"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.variant"
        :items="[2020, 2021, 2022, 2023]"
        label="Variant"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.variant"
        :items="[2020, 2021, 2022, 2023]"
        label="Series"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.type_vehicle"
        :items="[2020, 2021, 2022, 2023]"
        label="Vehicle Type"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.body_id"
        :items="[2020, 2021, 2022, 2023]"
        label="Body"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="vehicle.doors"
        :items="[2020, 2021, 2022, 2023]"
        label="Doors"
        variant="outlined"
        density="compact"
      />
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.transmission"
          label="Transmittion"
          inline
        >
          <v-radio label="Manual" value="Manual" />
          <v-radio label="Automatic" value="Automatic" />
        </v-radio-group>
      </div>
      <v-select
        v-model="vehicle.power"
        :items="[2020, 2021, 2022, 2023]"
        label="Power"
        variant="outlined"
        density="compact"
      />
      <v-text-field
        v-model="vehicle.engine_capacity"
        label="Engine Capacity"
        variant="outlined"
        density="compact"
      />

      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.driver_side"
          label="Drivers’s Side"
          inline
        >
          <v-radio label="Left hand drive" value="Left hand drive" />
          <v-radio label="Right hand drive" value="Right hand drive" />
          <v-radio label="Center" value="Center" />
        </v-radio-group>
      </div>
      <div>
        <small class="font-semibold">Exteriour color</small>
        <div class="flex gap-3">
          <div
            v-for="color in [
              'red',
              'yellow',
              'green',
              'white',
              'black',
              'blue',
            ]"
            class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
            :class="{
              'border-2 !border-blue-500': vehicle.exterior_color_id === color,
            }"
            @click="vehicle.exterior_color_id = color"
          >
            <div class="h-full" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </div>
      <div>
        <small class="font-semibold">Interior color</small>
        <div class="flex gap-3">
          <div
            v-for="color in [
              'red',
              'yellow',
              'green',
              'white',
              'black',
              'blue',
            ]"
            class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
            :class="{
              'border-2 !border-blue-500': vehicle.interior_color_id === color,
            }"
            @click="vehicle.interior_color_id = color"
          >
            <div class="h-full" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.transmission"
          label="Interior type"
          inline
        >
          <v-radio label="Leather" value="Leather" />
          <v-radio label="Cloth" value="Cloth" />
          <v-radio label="Vinyl" value="Vinyl" />
          <v-radio label="Alcantara" value="Alcantara" />
          <v-radio label="Wood" value="Wood" />
          <v-radio label="Other" value="Other" />
        </v-radio-group>
      </div>
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.originality"
          label="Originallity"
          inline
        >
          <v-radio
            label="Original & highly original"
            value="Original & highly original"
          />
          <v-radio label="Modified" value="Modified" />
          <v-radio label="Restored-Modified" value="Restored-Modified" />
          <v-radio label="Restomod & Custom" value="Restomod & Custom" />
        </v-radio-group>
      </div>
      <div class="col-span-2">
        <v-radio-group v-model="vehicle.status" label="Status" inline>
          <v-radio label="Concours" value="Concours" />
          <v-radio label="Conserved" value="Conserved" />
          <v-radio label="Project" value="Project" />
        </v-radio-group>
      </div>
    </div>
    <div v-if="step === 2" class="grid grid-cols-2 gap-6">
      <v-text-field
        v-model="vehicle.mileage"
        label="Mileage"
        variant="outlined"
        density="compact"
      />

      <v-select
        v-model="vehicle.original_miles"
        label="Miles"
        variant="outlined"
        density="compact"
        :items="[2020, 2021, 2022, 2023]"
      />
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.original_miles"
          label="Original miles"
          inline
        >
          <v-radio label="Yes" value="Yes" />
          <v-radio label="Unknow" value="Unknow" />
        </v-radio-group>
      </div>
      <v-select
        v-model="vehicle.location_id"
        label="County"
        variant="outlined"
        density="compact"
        :items="[2020, 2021, 2022, 2023]"
      />
      <v-text-field
        v-model="vehicle.plate_numb"
        label="Plate Numb"
        variant="outlined"
        density="compact"
      />
      <v-text-field
        v-model="vehicle.vin"
        label="Vin"
        variant="outlined"
        density="compact"
        hint="If you know it, add your VIN or Chassis Number below."
      />
    </div>
    <div class="grid grid-cols-2">
      <div>
        <v-btn @click="step--">Cancel</v-btn>
      </div>
      <div class="text-right">
        <v-btn
          color="black"
          @click="
            () => {
              if (setp === 2) save();
              else step++;
            }
          "
        >
          {{ step === 1 ? `Continue` : 'Salva' }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMaisonVehicleStore } from '@/store/datas/masionVehicle';
import { useVehicleStore } from '@/store/vehicle/vehicle';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';

/** Router */
const router = useRouter();
const store = useMaisonVehicleStore();
const vehicleStore = useVehicleStore();
const route = useRoute();
const years = ref();
const brands = ref();

vehicleStore.filter('bidwatcher_brand', 'name').then(res => {
  console.log(res);
});

const vehicle = ref({
  id: route.params.id,
  purchase_year: 0,
  purchase_value: 0,
  garage_set_id: route.params.garageId,
  garage_choice: '',
  id_brand: 4855,
  id_family: 134213,
  model_id: 185437,
  location_id: '',
  body_id: 1,
  exterior_color_id: 0,
  interior_color_id: 0,
  variant: '',
  type_vehicle: '',
  year: 0,
  doors: '',
  transmission: '',
  power: '',
  engine_capacity: '',
  driver_side: '',
  originality: '',
  status: '',
  mileage: 0,
  original_miles: '',
  plate_numb: '',
  vin: '',
  main_photo: '',
  registration_certificate: '',
  service_book: '',
  purchase_currency: '',
});

const step = ref(1);
</script>

<style scoped></style>
