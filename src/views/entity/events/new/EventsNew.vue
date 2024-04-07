<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';

import { useEntityEventsStore } from '@/store/entity/events';


const entityEventsStore = useEntityEventsStore();
const router = useRouter();

const sampleEvent = ref({
  name: '',
  beginDate: '',
  beginCountry: '',
  beginCity: '',
  beginAddress: '',
  beginLongitude: '',
  beginLatitude: '',
  endDate: '',
  endCountry: '',
  endCity: '',
  endAddress: '',
  endLongitude: '',
  endLatitude: '',
  categories: [],
  openDay: '',
  openTime: '',
  description: '',
  website: '',
  logo: '',
  photo: '',
  active: true
});

async function addEvent() {
  await entityEventsStore.addEntityEvent(sampleEvent.value);
  router.push({ name: 'EntityEvents' })
}

import EntityEventManager from '../helpers/EntityEventManager.vue';
</script>

<template>
  <EntityEventManager is-add :event="sampleEvent" @add="addEvent" />
</template>
