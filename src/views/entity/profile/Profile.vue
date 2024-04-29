<script setup lang="ts">
import GeneralInformation from './tabs/general-information/GeneralInformation.vue';
import IdentityType from './tabs/identity-type/IdentityType.vue';
import VehiclesOfInterest from './tabs/vehicles-of-interest/VehiclesOfInterest.vue';
import CoreInformation from './tabs/core-information/CoreInformation.vue';
</script>

<template>
  <v-container class="mt-4">
    <v-row>
      <v-col class="text-center">
        <h1 class="title">Welcome to your Entity Profile</h1>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <GeneralInformation />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <IdentityType />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <VehiclesOfInterest />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <CoreInformation />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}
</style>

