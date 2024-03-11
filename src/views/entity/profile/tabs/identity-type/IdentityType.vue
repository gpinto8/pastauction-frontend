<script setup lang="ts">
import { ref, watch, computed} from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityStore } from '@/store/entity';

const entityStore = useEntityStore();
const { identityTypeSchema,  
    selectedIdentityTypes: selectedTypes,
    identityTypeClubData,
    identityTypeCircuitData,
    identityTypeCollectorsData, } = storeToRefs(entityStore);
const { fetchIdentityTypes, saveIdentityTypes, updateClubDataToEmpty, updateCircuitDataToEmpty, updateCollectorsDataToEmpty, } = entityStore;

const datiImpacchettati = computed({
  get: () => ({
    identityTypeClubData: identityTypeClubData.value,
    identityTypeCircuitData: identityTypeCircuitData.value,
    identityTypeCollectorsData: identityTypeCollectorsData.value
  }),
  set: (value) => {
    (identityTypeClubData as any).value = value.identityTypeClubData;
    (identityTypeCircuitData as any).value = value.identityTypeCircuitData;
    (identityTypeCollectorsData as any).value = value.identityTypeCollectorsData;
  }
})

watch([selectedTypes], () => {
  if (selectedTypes.value.includes('club')) {
    if (identityTypeClubData.value === null) {
      updateClubDataToEmpty();
    }
  } else {
    (identityTypeClubData as any).value = null;
  }
  if (selectedTypes.value.includes('circuit')) {
    if (identityTypeCircuitData.value === null) {
      updateCircuitDataToEmpty();
    }
  } else {
    (identityTypeCircuitData as any).value = null;
  }
  if (selectedTypes.value.includes('collectors')) {
    if (identityTypeCollectorsData.value === null) {
      updateCollectorsDataToEmpty();
    }
  } else {
    (identityTypeCollectorsData as any).value = null;
}});

const backupSelectedTypes = ref<string[]>([]);
function onStartClicked() {
  backupSelectedTypes.value = [...selectedTypes.value];
}
function onCancelClicked() {
  selectedTypes.value = [...backupSelectedTypes.value];
}

fetchIdentityTypes();

import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import ManagingSheet from '@/components/entity/ManagingSheet.vue';
import IdentityTypeOwnersClub from './helpers/IdentityTypeOwnersClub.vue';
import IdentityTypeCircuit from './helpers/IdentityTypeCircuit.vue';
import IdentityTypeCollectors from './helpers/IdentityTypeCollectors.vue';
</script>

<template>
  <ExpansionSection title="Identity Type">
    <ManagingSheet title="Identity types" v-model="datiImpacchettati" :edit-callback="saveIdentityTypes"
      :on-start-clicked="onStartClicked" :on-cancel-clicked="onCancelClicked">
      <template #default="props">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-checkbox class="d-inline-flex mr-4" v-for="identityType of identityTypeSchema" v-model="selectedTypes"
                :value="identityType.type" :label="identityType.label" :variant="props.editInputVariant.value"
                :readonly="props.editInputDisabled.value" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <IdentityTypeOwnersClub v-model="props.data.value.identityTypeClubData"
                :readonly="props.editInputDisabled.value" v-if="props.data.value.identityTypeClubData" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <IdentityTypeCircuit v-model="props.data.value.identityTypeCircuitData"
                :readonly="props.editInputDisabled.value" v-if="props.data.value.identityTypeCircuitData" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <IdentityTypeCollectors v-model="props.data.value.identityTypeCollectorsData"
                :readonly="props.editInputDisabled.value" v-if="props.data.value.identityTypeCollectorsData" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </ManagingSheet>
  </ExpansionSection>
</template>
