<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <div class="px-14 mt-12">
    Event  {{ id }}
  </div>
</template>
