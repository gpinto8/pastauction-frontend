<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useEntityStore } from '@/store/entity';

import ManagingSheet from '@/components/entity/ManagingSheet.vue';
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import BtnFileInput from './helpers/BtnFileInput.vue';
import config from '@/config';

const entityStore = useEntityStore();
const { coreInfo } = storeToRefs(entityStore);
const { fetchCoreInfo, saveCoreInfo, uploadPhoto } = entityStore;

const apiUrl = ref(config.apiUrl);

onMounted(async () => {
  await fetchCoreInfo();
});
</script>

<template>
  <ExpansionSection title="Core information">
    <ManagingSheet title="Core information" :edit-callback="saveCoreInfo" v-model="coreInfo">
      <template #default="props">
        <v-row>
          <v-col :cols="12">
            <span class="font-weight-bold">Opening hours</span>
          </v-col>
          <v-col>
            <v-text-field :variant="props.editInputVariant.value" density="compact" label="Open day"
              v-model="props.data.value.openDay" :readonly="props.editInputDisabled.value" />
          </v-col>
          <v-col :cols="3" class="d-flex">
            <v-text-field append-inner-icon="mdi-clock-outline" :variant="props.editInputVariant.value"
              density="compact" label="Open time" v-model="props.data.value.timeFrom"
              :readonly="props.editInputDisabled.value" class="shrink" />
            <v-text-field append-inner-icon="mdi-clock-outline" :variant="props.editInputVariant.value"
              density="compact" label="Close time" v-model="props.data.value.timeTo"
              :readonly="props.editInputDisabled.value" class="shrink ml-4" />
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <span class="font-weight-bold">Main photo</span>
          </v-col>
          <v-col>
            <v-img :src="`${apiUrl}/photo/${props.data.value.mainPhoto}`" width="230"
              v-if="props.editInputDisabled.value" />
            <BtnFileInput @selected="uploadPhoto" v-else>
              <template #activator="{ activate }">
                <v-btn class="ml-0 mx-2" color="primary" @click="activate">{{
                  props.data.value.mainPhoto ? 'Change photo' : 'Add photo'
                  }}</v-btn>
              </template>
            </BtnFileInput>
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <span class="font-weight-bold">Activity description</span>
          </v-col>
          <v-col>
            <v-textarea :variant="props.editInputVariant.value" density="compact"
              v-model="props.data.value.activityDescription" :readonly="props.editInputDisabled.value" />
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <span class="font-weight-bold">History of activity</span>
          </v-col>
          <v-col>
            <v-textarea :variant="props.editInputVariant.value" density="compact"
              v-model="props.data.value.historyOfActivity" :readonly="props.editInputDisabled.value" />
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <span class="font-weight-bold">Opening description</span>
          </v-col>
          <v-col>
            <v-textarea :variant="props.editInputVariant.value" density="compact"
              v-model="props.data.value.openingDescription" :readonly="props.editInputDisabled.value" />
          </v-col>
        </v-row>
      </template>
    </ManagingSheet>
  </ExpansionSection>
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}
</style>
