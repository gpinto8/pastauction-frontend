<script setup lang="ts">
import { defineProps, computed, ref} from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

const entityEventsStore = useEntityEventsStore();
const { entityEventCategoires } = storeToRefs(entityEventsStore);

const props = defineProps<{
  isAdd: boolean;
}>();

import activeIcon from '@/assets/icons/active_on.svg?url';
import inactiveIcon from '@/assets/icons/active_off.svg?url';
import Linguetta from '../helpers/Linguetta.vue';

const event = ref({
  id: 1,
  status: 'past',
  name: 'Nome',
  beginDate: '2022-01-01',
  beginCountry: 'Italy',
  beginCity: 'Rome',
  beginAddress: 'Via Roma 1',
  beginLongitude: 12.4963655,
  beginLatitude: 41.9027835,
  endDate: '2022-01-01',
  endCountry: 'Italy',
  endCity: 'Rome',
  endAddress: 'Via Roma 1',
  endLongitude: 12.4963655,
  endLatitude: 41.9027835,
  categories: [],
  openDay: '2022-01-01',
  openTime: '00:00',
  description: 'Description',
  website: 'https://www.google.com',
  logo: 'https://www.google.com',
  photo: 'https://www.google.com',
  active: false
})

const iconActive = computed(() => event.value.active ? activeIcon : inactiveIcon);

function duplicateEvent() {
  console.log('duplicateEvent');
}
function deleteEvent() {
  console.log('deleteEvent');
}
function addEvent() {
  console.log('addEvent');
}
function saveEvent() {
  console.log('saveEvent');
}
function resetEvent() {
  console.log('resetEvent');
}
function toggleActive() {
  console.log('toggleActive');
}
</script>

<template>
  <v-sheet>
    <v-container>
      <v-row class="subheader rounded-lg mb-4">
        <v-col :cols="2" class="d-flex align-center">
          <Linguetta :color="entityEventsStore.statusToColor(event.status)" :width="100" />
        </v-col>
        <v-col class="text-center d-flex align-center justify-center">
          <img :src="iconActive" class="icon-active mr-2" @click="toggleActive" />
          <span class="font-weight-bold" style="font-size: 18px">Event</span>
        </v-col>
        <v-col :cols="2" class="text-end">
          <v-btn class="mr-2" icon="mdi-file-document" color="black" density="compact" @click="duplicateEvent" />
          <v-btn icon="mdi-delete" color="red" density="compact" @click="deleteEvent" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="4" class="d-flex">
          <v-text-field class="mr-2" variant="outlined" density="compact" label="ID" :model-value="event.id" disabled />
          <v-text-field variant="outlined" density="compact" label="Name" v-model="event.name" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Begin</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date" v-model="event.beginDate" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="event.beginCountry" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="event.beginCity" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="event.beginAddress" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="event.beginLongitude" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="event.beginLatitude" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">End</span>
        </v-col>

        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date" v-model="event.endDate" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="event.endCountry" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="event.endCity" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="event.endAddress" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="event.endLongitude" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="event.endLatitude" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Category</span>
        </v-col>
        <v-col cols="12">
          <v-checkbox class="d-inline-flex mr-4" v-for="category of entityEventCategoires" v-model="event.categories"
            :value="category.value" :label="category.label" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Event information</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open day" type="date" v-model="event.openDay" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open time" v-model="event.openTime" />
        </v-col>
        <v-col :cols="12">
          <v-textarea variant="outlined" density="compact" label="Description" v-model="event.description" />
        </v-col>
        <v-col :cols="12">
          <v-text-field variant="outlined" density="compact" label="Website" v-model="event.website" />
        </v-col>
      </v-row>

      <v-row v-if="isAdd">
        <v-col class="d-flex justify-end" :cols="12">
          <v-btn class="px-16" color="primary" @click="addEvent">Add</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="d-flex justify-end" :cols="12">
          <v-btn class="px-16 mr-4" color="grey" @click="resetEvent">Reset</v-btn>
          <v-btn class="px-16" color="primary" @click="saveEvent">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}

.icon-active {
  height: 25px;
  width: 25px;
  display: inline-block;
  cursor: pointer;
}
</style>
