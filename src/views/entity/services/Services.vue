<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityServicesStore } from '@/store/entity/services';

const servicesStore = useEntityServicesStore();
const { entityServicesSchema } = storeToRefs(servicesStore);
const { fetchEntityServiceSchema } = servicesStore;

const brands = ref([
  'Mercedes',
  'Renault',
  'Porsche',
  'Ferrari',
  'Lotus'
]);
const selectedBrands = ref([]);

fetchEntityServiceSchema();

import Tegola from './helpers/Tegola.vue';
</script>

<template>
  <div class="px-14 mt-12">
    <v-sheet :elevation="1" class="px-5 pt-5" v-if="entityServicesSchema.length">
      <v-container>
        <v-row class="subheader rounded-lg mb-4">
          <v-col>
            <div class="title font-weight-bold text-center">Services</div>
            <div class="subtitle text-center">In this area you can manage your Brands & Services</div>
          </v-col>
        </v-row>
        <!-- brands -->
        <v-row class="brands">
          <v-col class="d-flex flex-row brands">
            <v-checkbox v-model="selectedBrands" v-for="brand of brands" density="compact" :value="brand"
              :label="brand" />
          </v-col>
        </v-row>
        <!-- services -->
        <v-row class="subheader rounded-lg mb-4">
          <v-col>
            <div class="title font-weight-bold text-center">Manage the brand "Mercedes"</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-row flex-wrap">
            <Tegola v-for="service of entityServicesSchema.slice(0, 1)" :key="service.id" :label="service.label"
              :logo="service.logo" :size="44" status="selected" />
            <Tegola v-for="service of entityServicesSchema.slice(1, 2)" :key="service.id" :label="service.label"
              :logo="service.logo" :size="44" status="actived" />
            <Tegola v-for="service of entityServicesSchema.slice(2)" :key="service.id" :label="service.label"
              :logo="service.logo" :size="44" status="disabled" />
          </v-col>
        </v-row>
        <!-- parts a -->
        <v-row class="subheader rounded-lg mt-12 mb-4">
          <v-col>
            <div class="title font-weight-bold text-center">Manage the service "{{entityServicesSchema[0].label }}"
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-row flex-wrap">
            <Tegola v-for="partA of entityServicesSchema[0].partsA.slice(0, 1)" :key="partA.id" :label="partA.label"
              :logo="partA.logo" :size="44" status="selected" />
            <Tegola v-for="partA of entityServicesSchema[0].partsA.slice(1)" :key="partA.id" :label="partA.label"
              :logo="partA.logo" :size="44" status="disabled" />
          </v-col>
        </v-row>
        <!-- parts b -->
        <v-row class="subheader rounded-lg mt-12 mb-4">
          <v-col>
            <div class="title font-weight-bold text-center">Manage subcategory "{{entityServicesSchema[0].partsA[0].label }}"
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-row flex-wrap">
            <Tegola v-for="partB of entityServicesSchema[0].partsA[0].partsB" :key="partB.id" :label="partB.name"
              :logo="partB.logo" :size="44" status="disabled" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}

.title {
  font-size: 22px;
}

.subtitle {
  margin-top: 4px;
  font-size: 16px;
}
</style>
