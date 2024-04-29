<script setup lang="ts">
import { ref } from 'vue';

import AppIcon from '@/components/common/AppIcon.vue';

const tab = ref(null);
</script>

<template>
  <v-container class="space-y-10">
    <div class="p-10 pb-0 shadow-lg rounded-lg mt-10">
      <div class="grid grid-cols-3 gap-10">
        <div class="col-span-2 space-y-3">
          <span class="text-4xl font-medium">Hi Gianfraco!</span>
          <div>
            In PastAuction, you will be able to search and filter relevant data
            for your next classic car purchase.
          </div>
        </div>
        <div>
          <img src="@/assets/images/home.svg" alt="home" class="-mb-6" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-2">
        <div class="card">
          <div class="flex justify-between">
            <div>
              <div class="font-semibold text-2xl">Current plan</div>
              <b>Plan Ready</b>
            </div>
            <div>
              <v-btn color="#212529" class="text-white text-none font-normal">
                Upgrade my plan
              </v-btn>
            </div>
          </div>
          <v-list density="compact">
            <v-list-item color="primary" class="pl-0">
              <template #prepend>
                <app-icon type="check" class="mr-4" />
              </template>
              <v-list-item-title>
                Includes free services limited to 3 vehicles
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template #prepend>
                <app-icon type="check" class="mr-4" />
              </template>
              <v-list-item-title>
                100 accesses to Charts, MiniDashboard and Dashboard
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template #prepend>
                <app-icon type="check" class="mr-4" />
              </template>

              <v-list-item-title>
                Access to view information on up to 500 vehicles
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template #prepend>
                <app-icon type="check" class="mr-4" />
              </template>
              <v-list-item-title>
                Access to the roadmap with option to save 10 routes
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <div class="card space-y-6 text-center">
        <div class="font-semibold text-2xl">My wallet</div>
        <small class="font-medium">Available credit in my wallet</small>

        <app-icon type="credits" class="mx-auto !w-[60px]" />
        <small class="text-grey">20 credit</small>
        <div>
          <v-btn
            color="#212529"
            class="text-white text-none font-normal w-full"
          >
            Add Tokens
          </v-btn>
        </div>
      </div>
    </div>
    <div>
      <v-tabs v-model="tab" color="blue" align-tabs="start">
        <v-tab :value="1">Garage (0)</v-tab>
        <v-tab :value="2">Locate (0)</v-tab>
        <v-tab :value="3">Charts (0)</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <div class="card space-y-4 text-center">
              <div class="text-grey">You don't have any Garage yet.</div>
              <div>
                <v-btn
                  color="#212529"
                  class="text-white text-none font-normal w-[200px]"
                >
                  Add Garage
                </v-btn>
              </div>
            </div>
          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </v-container>
</template>

<style lang="postcss">
.card {
  @apply p-10 rounded-lg bg-white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
}
</style>
