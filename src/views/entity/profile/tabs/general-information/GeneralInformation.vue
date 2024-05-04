<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { storeToRefs } from 'pinia';

import { useEntityStore } from '@/store/entity';

import ManagingSheet from '@/components/entity/ManagingSheet.vue';
import ChangePasswordDialog from './helpers/ChangePasswordDialog.vue';

const entityStore = useEntityStore();
const { generalInfo } = storeToRefs(entityStore);
const { fetchGeneralInfo, saveGeneralInfo } = entityStore;

const editPassword = ref(false);
const agingPeriods = ref([
  { type: 'antique', label: 'Antique (1880-1904)' },
  { type: 'veteran', label: 'Veteran (1905-1918)' },
  { type: 'vintage', label: 'Vintage (1919-1930)' },
  { type: 'postVintage', label: 'Post Vintage (1931-1945)' },
  { type: 'classic', label: 'Classic (1946-1964)' },
  { type: 'postClassic', label: 'Post Classic (1965-1974)' },
  { type: 'modern', label: 'Modern (1975-1999)' },
  { type: 'contemporary', label: 'Contemporary (2000-2020)' }
]);
const vehicleTypes = ref([
  { type: 'car', label: 'Cars' },
  { type: 'motorcycle', label: 'Motorcycles' },
  { type: 'tractor', label: 'Tractors' },
  { type: 'boat', label: 'Boats' },
  { type: 'plane', label: 'Planes' },
  { type: 'military', label: 'Military' }
]);

onMounted(async () => {
  await fetchGeneralInfo();
});
</script>

<template>
  <ManagingSheet title="Entity" :edit-callback="saveGeneralInfo" v-model="generalInfo">
    <template #default="props">
      <v-row>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Name short"
            v-model="props.data.value.nameShort" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col>
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Name complete"
            v-model="props.data.value.nameComplete" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="ID"
            v-model="props.data.value.id" :readonly="props.editInputDisabled.value"
            :disabled="!props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Year beginning"
            v-model="props.data.value.yearBeginning" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Year ending"
            v-model="props.data.value.yearEnding" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Address"
            v-model="props.data.value.address" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Postal code"
            v-model="props.data.value.postalCode" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="City"
            v-model="props.data.value.city" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Province"
            v-model="props.data.value.province" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Region state"
            v-model="props.data.value.regionState" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Country"
            v-model="props.data.value.country" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Geo. area"
            v-model="props.data.value.geoArea" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="6">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Latitude"
            v-model="props.data.value.latitude" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="6">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Longitude"
            v-model="props.data.value.longitude" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Website"
            v-model="props.data.value.website" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Phone"
            v-model="props.data.value.phone" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Email"
            v-model="props.data.value.email" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row v-if="!props.isEditing">
        <v-col :cols="12">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Password" readonly>
            <template #append>
              <v-btn color="primary" density="compact" icon="mdi-pencil" @click="editPassword = true" />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2 class="font-weight-bold">Aging Periods</h2>
        </v-col>
        <v-col cols="12">
          <v-checkbox class="d-inline-flex mr-4" v-for="agingPeriod of agingPeriods"
            v-model="props.data.value.agePeriods" :value="agingPeriod.type" :label="agingPeriod.label"
            :variant="props.editInputVariant.value" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2 class="font-weight-bold">Types of Vehicles</h2>
        </v-col>
        <v-col cols="12">
          <v-checkbox class="d-inline-flex mr-4" v-for="vehicleType of vehicleTypes"
            v-model="props.data.value.typesOfVehicle" :value="vehicleType.type" :label="vehicleType.label"
            :variant="props.editInputVariant.value" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
    </template>
  </ManagingSheet>

  <ChangePasswordDialog v-model="editPassword" />
</template>
