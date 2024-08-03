<template>
  <template>
    <h3 class="text-2xl font-medium mb-2">Details</h3>
    <span class="font-medium text-grey">
      These additional specs will help us provide the most accurate comps.
    </span>
  </template>

  <div class="grid grid-cols-2 gap-6">
    <v-text-field
      v-model="vehicle.mileage"
      label="Mileage"
      variant="outlined"
      density="compact"
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
    <v-autocomplete
      required
      v-model="vehicle.location_id"
      label="Country"
      variant="outlined"
      density="compact"
      item-title="name"
      item-value="id"
      @update:search="store.searchCountries"
      :loading="store.loading.countries"
      :items="store.countries"
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
</template>

<script setup lang="ts">
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import { storeToRefs } from 'pinia';

const store = useEditVehicleStore();
const { vehicle } = storeToRefs(store);
</script>

<style></style>
