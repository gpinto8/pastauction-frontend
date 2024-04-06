<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

const entityEventsStore = useEntityEventsStore();
const { entityEvents, loadingEntityEvents } = storeToRefs(entityEventsStore);

const selectPast = ref(true);
const selectOngoing = ref(true);
const selectNext = ref(true);
const year = ref(new Date().getFullYear());

function statusToColor(status: string) {
  switch (status) {
    case 'past':
      return 'red';
    case 'ongoing':
      return 'green';
    case 'next':
      return 'blue';
    default:
      return 'red';
  }
}

entityEventsStore.fetchEntityEvents();

import ToggleButton from './helpers/ToggleButton.vue';
import YearPaginator from './helpers/YearPaginator.vue';
import Linguetta from './helpers/Linguetta.vue';
import router from '@/router';
</script>

<template>
  <div class="px-14 mt-12">
    <div class="filters d-flex mb-4">
      <ToggleButton v-model="selectPast" label="Past" color="red" />
      <ToggleButton v-model="selectOngoing" label="Ongoing" color="green" />
      <ToggleButton v-model="selectNext" label="Next" color="blue" />
      <v-spacer />
      <YearPaginator v-model="year" />
    </div>
    <v-sheet :elevation="1">
      <v-container v-if="loadingEntityEvents">
        <v-row align="center">
          <v-col class="d-flex flex-column align-center">
            <span class="mb-8">Loading...</span>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else-if="entityEvents.length === 0">
        <v-row align="center">
          <v-col class="d-flex flex-column align-center">
            <span class="mb-8">No event found</span>
            <v-btn :to="{ name: 'EntityEventsNew' }" color="#212529" class="px-12 text-white text-none font-normal">Add
              event</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row class="ml-1 mt-1 mb-4">
          <v-col class="d-flex">
            <span style="font-size: 18px">Events</span>
            <v-spacer />
            <v-btn :to="{ name: 'EntityEventsNew' }" icon="mdi-plus" color="#227AD2" density="compact" />
          </v-col>
        </v-row>
        <v-row class="mb-2 pl-2 pr-4" align="center" v-for="event of entityEvents" :key="event.id">
          <v-col class="mr-4" :cols="1">
            <router-link :to="{ name: 'EntityEventsEvent', params: { id: event.id } }">
              <v-avatar :image="event.avatar" :size="64" />
            </router-link>
          </v-col>
          <v-col>
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.name" readonly
              label="Name" />
          </v-col>
          <v-col>
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.location" readonly
              label="Location" />
          </v-col>
          <v-col class="d-flex align-center">
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.beginDate" readonly
              label="Begin date">
              <template v-slot:append-inner>
                <div class="d-flex align-top">
                  <Linguetta class="ml-2" :color="statusToColor(event.status)" />
                </div>
              </template>
            </v-text-field>
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
