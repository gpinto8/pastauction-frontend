<script setup lang="ts">
const vehiclesOfInterest = [
  {
    brand: 'Mercedes',
    family: 'Mercedes',
    model: 'Mercedes',
    type: 'Coupe',
    period: 'Classic',
    active: true
  },
  {
    brand: 'Renault',
    family: 'Renault',
    model: 'Renault',
    type: 'Coupe',
    period: 'Classic',
    active: true
  },
  {
    brand: 'Fiat',
    family: 'Fiat',
    model: 'Fiat',
    type: 'Coupe',
    period: 'Classic',
    active: true
  }
]
</script>

<template>
  <v-container>
    <v-row class="subheader rounded-lg">
      <v-col>
        <span class="font-weight-bold">Your vehicle of interest</span>
      </v-col>
      <v-col class="text-end">
        <v-btn icon="mdi-plus" color="primary" density="compact" />
      </v-col>
    </v-row>
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
      <v-col :cols="1">
        <span class="font-weight-bold">Active</span>
      </v-col>
    </v-row>
    <v-row v-for="(vehicle, index) of vehiclesOfInterest" :key="index">
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Brand" :model-value="vehicle.brand" readonly />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Family" :model-value="vehicle.family" readonly />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Model" :model-value="vehicle.model" readonly />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Type" :model-value="vehicle.type" readonly />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Period" :model-value="vehicle.period" readonly />
      </v-col>
      <v-col :cols="1">
        <v-checkbox width="auto" density="compact" v-model="vehicle.active" readonly />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}
</style>


