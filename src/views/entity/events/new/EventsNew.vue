<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';

import { useEntityEventsStore } from '@/store/entity/events';


const entityEventsStore = useEntityEventsStore();
const router = useRouter();

const event = ref<any>(null);

async function addEvent(event: any) {
  await entityEventsStore.addEntityEvent(event);
  router.push({ name: 'EntityEvents' })
}
entityEventsStore.initializeAdd().then(data => event.value=data)

import EntityEventManager from '../helpers/EntityEventManager.vue';
</script>

<template>
  <EntityEventManager is-add :event="event" @add="addEvent" v-if="event"/>
</template>
