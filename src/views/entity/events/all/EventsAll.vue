<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

const entityEventsStore = useEntityEventsStore();
const { entityEvents, loadingEntityEvents, entityEventsYear, selectPast, selectOngoing, selectNext } = storeToRefs(entityEventsStore);

entityEventsStore.initializeFetch();

import ToggleButton from '../helpers/ToggleButton.vue';
import YearPaginator from '../helpers/YearPaginator.vue';
import Linguetta from '../helpers/Linguetta.vue';
</script>

<template>
  <div class="px-14 mt-12">
    <div class="filters d-flex mb-4">
      <ToggleButton v-model="selectPast" label="Past" color="red" />
      <ToggleButton v-model="selectOngoing" label="Ongoing" color="green" />
      <ToggleButton v-model="selectNext" label="Next" color="blue" />
      <v-spacer />
      <YearPaginator v-model="entityEventsYear" />
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
        <v-row class="mb-2 pl-2 pr-4" align="center" v-for="event of entityEvents" :key="event.event_id_key">
          <v-col class="mr-4" :cols="1">
            <router-link :to="{ name: 'EntityEventsEvent', params: { id: event.event_id_key } }">
              <v-avatar :image="event.event_logo_url" alt="logo" :size="64" style="border: 1px solid black" />
            </router-link>
          </v-col>
          <v-col>
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.event_name" readonly
              label="Name" />
          </v-col>
          <v-col>
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.event_begin_city" readonly
              label="Location" />
          </v-col>
          <v-col class="d-flex align-center">
            <v-text-field hide-details variant="underlined" density="compact" :model-value="event.event_begin_date" readonly
              label="Begin date">
              <template v-slot:append-inner>
                <div class="d-flex align-top">
                  <Linguetta class="ml-2" :color="entityEventsStore.statusToColor(entityEventsStore.getStatusFromEvent(event))" />
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
