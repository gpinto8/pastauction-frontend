<script setup lang="ts">
import { ref , onMounted} from 'vue';
import { storeToRefs } from 'pinia';

import { useEntityStore } from '@/store/entity';

import ManagingSheet from '@/components/entity/ManagingSheet.vue';
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import VehiclesOfInterestRow from './helpers/VehiclesOfInterestRow.vue';

const entityStore = useEntityStore();
const { vehiclesOfInterest } = storeToRefs(entityStore);
const { fetchVehiclesOfInterest, saveVehiclesOfInterest, fetchBrands } = entityStore;

const vehicleToAddEmpty = {
      brand: '',
      family: '',
      model: '',
      type: '',
      period: '',
      active: true
    };
const vehicleToAdd = ref( {...vehicleToAddEmpty});

const resetVehicleToAdd = () => {
  vehicleToAdd.value = {...vehicleToAddEmpty};
};

onMounted(async () => {
  await Promise.all([fetchVehiclesOfInterest(), fetchBrands()]);
});
</script>

<template>
  <ExpansionSection title="Vehicles of interest">
    <ManagingSheet title="Your vehicles of interest" :edit-callback="saveVehiclesOfInterest"
      v-model="vehiclesOfInterest">
      <template #default="props">
        <v-row class="mt-12">
          <v-col>
            <span class="font-weight-bold">Brand</span>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Family</span>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Model</span>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Type</span>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Period</span>
          </v-col>
          <v-col class="d-flex justify-center" :cols="1">
            <span class="font-weight-bold">Active</span>
          </v-col>
          <v-col class="d-flex justify-center" v-if="props.isEditing.value" :cols="1">
            <span class="font-weight-bold">Delete</span>
          </v-col>
        </v-row>
        <VehiclesOfInterestRow v-for="(vehicle, index) of props.data.value" :key="index" :vehicle="vehicle"
          :isEditing="props.isEditing.value" :isAddMode="false" :editInputDisabled="props.editInputDisabled.value"
          @button-clicked="props.data.value.splice(index, 1)" />
        <VehiclesOfInterestRow class="mt-8 mb-10" :vehicle="vehicleToAdd" :isEditing="props.isEditing.value" isAddMode
          :editInputDisabled="props.editInputDisabled.value"
          @button-clicked="() => { props.data.value.push(vehicleToAdd); resetVehicleToAdd(); }"
          v-if="props.isEditing.value" />
      </template>
    </ManagingSheet>
  </ExpansionSection>
</template>
