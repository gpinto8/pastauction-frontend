<script setup lang="ts">
import { ref } from 'vue';

import ToggleButton from './helpers/ToggleButton.vue';
import YearPaginator from './helpers/YearPaginator.vue';

const selectPast = ref(true);
const selectOngoing = ref(true);
const selectNext = ref(true);
const year = ref(new Date().getFullYear());
</script>

<template>
  <div class="px-14 mt-12">
    <div class="filters d-flex mb-4">
      <ToggleButton v-model="selectPast" label="Past" color="red" />
      <ToggleButton v-model="selectOngoing" label="Ongoing" color="green" />
      <ToggleButton v-model="selectNext" label="Next" color="blue" />
      <span class="flex-1-1"></span>
      <YearPaginator v-model="year" disabled/>
    </div>
    <v-sheet :elevation="1">
      <v-container>
        <v-row align="center">
          <v-col class="d-flex flex-column align-center">
            <span class="mb-8">You don't have any event yet.</span>
            <v-btn color="#212529" class="px-12 text-white text-none font-normal">Add event</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.red {
  background-color: #D80027;
}
.green {
  background-color: #6DA544;
}
.blue {
  background-color: #227AD2;
}
</style>
