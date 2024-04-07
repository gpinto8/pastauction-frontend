<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

import EntityEventManager from '../helpers/EntityEventManager.vue';
</script>

<template>
  <EntityEventManager />
</template>
