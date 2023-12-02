<template>
  <div class="my-4">
    <v-tabs v-model="tab" bg-color="transparent">
      <v-tab value="one">Global</v-tab>
      <v-tab value="two">Auction Events</v-tab>
      <v-tab value="three">Maison Vehicle</v-tab>
      <v-tab value="four">Maison Events</v-tab>
      <v-tab value="five">Brand</v-tab>
      <v-tab value="six">Model</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"><global /></v-window-item>
        <v-window-item value="two"><auctionEvents /></v-window-item>
        <v-window-item value="three"><maisonVehicle /></v-window-item>
        <v-window-item value="four"><maisonEvents /></v-window-item>
        <v-window-item value="five"><brand /></v-window-item>
        <v-window-item value="six"><model /></v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import global from './tabs/global.vue';
import auctionEvents from './tabs/auctionEvents.vue';
import maisonVehicle from './tabs/maisonVehicle.vue';
import maisonEvents from './tabs/maisonEvents.vue';
import brand from './tabs/brand.vue';
import model from './tabs/model.vue';

const tab = ref(null);
</script>

<style scoped></style>
