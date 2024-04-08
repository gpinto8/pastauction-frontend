<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { useEntityEventsStore } from '@/store/entity/events';

const entityEventsStore = useEntityEventsStore();
const router = useRouter();

const event = ref<any>(null);

const props = defineProps<{
  id: number;
}>();

async function deleteEvent() {
  await entityEventsStore.deleteEntityEvent(props.id);
  router.push({ name: 'EntityEvents' })
}

async function saveEvent(event:any) {
  await entityEventsStore.updateEntityEvent(props.id, event);
  router.push({ name: 'EntityEvents' })
}

async function duplicateEvent(event: any) {
  await entityEventsStore.duplicateEvent(event);
  router.push({ name: 'EntityEvents' })
}

async function toggleActive(active: boolean) {
  await entityEventsStore.toggleEntityEventActive(props.id, active);
  router.push({ name: 'EntityEvents' })
}

async function fetchEvent() {
  event.value = await entityEventsStore.fetchEntityEventByid(props.id);
}
fetchEvent();

import EntityEventManager from '../helpers/EntityEventManager.vue';
</script>

<template>
  <EntityEventManager :is-add="false" :event="event" @duplicate="duplicateEvent" @save="saveEvent" @delete="deleteEvent" @enable="toggleActive(true)" @disable="toggleActive(false)" v-if="event" />
</template>
