<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const brands = ref([
  'Mercedes',
  'Renault',
  'Porsche',
  'Ferrari',
  'Lotus'
]);
const selectedBrands = ref([]);
</script>

<template>
  <div class="px-14 mt-12">
    <v-sheet :elevation="1" class="px-5 pt-5">
      <v-container>
        <v-row class="subheader rounded-lg mb-4">
          <v-col>
            <div class="title font-weight-bold text-center">Services</div>
            <div class="subtitle text-center">In this area you can manage your Brands & Services</div>
          </v-col>
        </v-row>
        <v-row class="brands">
          <v-col class="d-flex flex-row ">
            <v-checkbox v-model="selectedBrands" v-for="brand of brands" density="compact" :value="brand" :label="brand" />
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
