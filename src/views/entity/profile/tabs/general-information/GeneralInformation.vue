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
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="ID" v-model="props.data.value.id"
            :readonly="props.editInputDisabled.value" />
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
        <v-col :cols="4">
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Latitude"
            v-model="props.data.value.latitude" :readonly="props.editInputDisabled.value" />
        </v-col>
        <v-col :cols="4">
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
          <v-text-field :variant="props.editInputVariant.value" density="compact" label="Entity type"
            v-model="props.data.value.entityType" :readonly="props.editInputDisabled.value" />
        </v-col>
      </v-row>
      <v-row>
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
    </template>
  </ManagingSheet>

  <ChangePasswordDialog v-model="editPassword" />
</template>

