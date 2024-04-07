<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

const entityEventsStore = useEntityEventsStore();

const props = defineProps<{
  id: number;
}>();

async function saveEvent() {

}

const event = ref<any>(null);

async function fetchEvent() {
  event.value = await entityEventsStore.fetchEntityEventByid(props.id);
}
fetchEvent();

import EntityEventManager from '../helpers/EntityEventManager.vue';
</script>

<template>
  <EntityEventManager :is-add="false" :event="event" @save="saveEvent" v-if="event" />
</template>
