<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import {
  useLocateStore,
  type Coordinates,
  type ExtendedItem,
} from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import {
  isEventRoadmapData,
  useLocateRoadmapStore,
  type EventRoadmapData,
  type RoadmapData,
} from '@/store/locate/locateRoadmapStore';
import { useRouter } from 'vue-router';
import LocateEntityCard from '@/views/locate/components/LocateEntityCard.vue';
import LocateEventCard from '@/views/locate/components/LocateEventCard.vue';
import type { LocateExtendedServicesData } from '@/store/locate/locateServiceStore';
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import type { LocateExtendedEventData } from '@/store/locate/locateEventStore';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const {
  activeLocateSearchCategory,
  currentUserLocationMarker,
  currentUserLocationBounds,
  items,
  mapLocationSearchQuery,
  modalStates,
} = storeToRefs(locateStore);

const roadmapStore = useLocateRoadmapStore();
const {
  fetchEntityRoadmaps,
  fetchEventRoadmaps,
  deleteRoadmap,
  createRoadmap,
} = roadmapStore;
const { entityRoadmaps, eventsRoadmaps, roadmapsLoading, detailRoadmap } =
  storeToRefs(roadmapStore);
const router = useRouter();

const props = defineProps<{
  item: ExtendedItem;
}>();
</script>
<template>
  <Modal
    :is-modal-open="modalStates.itemDetailDisplayerModal"
    @overlay-click="modalStates.itemDetailDisplayerModal = false"
  >
    <div
      class="flex flex-col gap-2 bg-white p-8 w-full sm:min-w-[24rem] sm:max-w-[50rem] m-4 max-h-full overflow-hidden rounded-lg shadow-lg relative"
    >
      <app-icon
        class="ml-auto cursor-pointer hover:opacity-70"
        @click="modalStates.itemDetailDisplayerModal = false"
        type="close"
        color="#000"
        size="sm"
      ></app-icon>

      <div class="h-fit overflow-auto">
        <LocateEntityCard
          allow-select
          v-if="activeLocateSearchCategory.name === 'Entity'"
          :entity="item as LocateExtendedEntityData"
        />
        <LocateEntityCard
          allow-select
          v-if="activeLocateSearchCategory.name === 'Services'"
          :entity="item as LocateExtendedServicesData"
        />
        <LocateEventCard
          allow-select
          v-if="activeLocateSearchCategory.name === 'Events'"
          :event="item as LocateExtendedEventData"
        />
      </div>
    </div>
  </Modal>
</template>
