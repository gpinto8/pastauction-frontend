<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import {
  ref,
  onMounted,
  computed,
} from 'vue';
import MySelect from './components/Select.vue';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import { storeToRefs } from 'pinia';
import { useLocateStore } from '@/store/locate/locate';
import {
	isEntityRoadmapData,
  useLocateRoadmapStore,
  type EntityRoadmapData,
  type RoadmapData,
} from '@/store/locate/locateRoadmapStore';

import {
  useLocateEventStore,
} from '@/store/locate/locateEventStore';
import {
  useLocateServiceStore,
} from '@/store/locate/locateServiceStore';
import {
  useLocateEntityStore,
} from '@/store/locate/locateEntityStore';
import { RouterLink , useRouter } from 'vue-router';

const locateStore = useLocateStore();

const { filterValuesFunctions, getSelectedItems, emitEvent_searchLocation } =
  locateStore;
const {
  locateSearchCategories,
  activeLocateSearchCategory,
  filterValues,
  loadingStates,
  modalStates,
  mapLocationSearchQuery,
  itemsLoading,
} = storeToRefs(locateStore);

const entityStore = useLocateEntityStore();
const { fetchEntities } = entityStore;
const { entities, entitiesLoading } = storeToRefs(entityStore);

const serviceStore = useLocateServiceStore();
const { fetchServices } = serviceStore;
const { services, servicesLoading } = storeToRefs(serviceStore);

const eventStore = useLocateEventStore();
const { fetchEvents } = eventStore;
const { events, eventsLoading } = storeToRefs(eventStore);

const roadmapStore = useLocateRoadmapStore();
const { fetchEntityRoadmaps, fetchEventRoadmaps } = roadmapStore;
const { entityRoadmaps, eventsRoadmaps, roadmapsLoading , detailRoadmap } = storeToRefs(roadmapStore);



const router = useRouter();

const orderBy = ref<typeof orderByOptions[number]>('');
const orderByOptions = ['More new', 'More old'];

onMounted(()=>{
	if(activeLocateSearchCategory.value.name === "Entity") fetchEntityRoadmaps();
	if(activeLocateSearchCategory.value.name === "Events") fetchEventRoadmaps();
});

const isEntitySelected = computed(()=> activeLocateSearchCategory.value.name === "Entity");

const roadmaps = computed(() => {
	if(isEntitySelected.value){
		return entityRoadmaps.value;
	} else {
		return eventsRoadmaps.value;
	};
});

const orderedRoadmaps = computed(() => {
	return roadmaps.value.sort((a, b) => {
		const dateA = new Date(a.date_creation).getTime();
    const dateB = new Date(b.date_creation).getTime();

		return orderBy.value === "More old" ? dateA - dateB : dateB - dateA;
	});
});


function formatDate(dateString: string) {
	const today = new Date().toDateString();
	const yesterday = new Date(Date.now() - 86400000).toDateString();
	return (new Date(dateString).toDateString() === today) ? 'today' : (new Date(dateString).toDateString() === yesterday) ? 'yesterday' : dateString;
}

function gotToRoadmapDetailPage(roadmap: RoadmapData) {
	detailRoadmap.value = roadmap;
	router.push('/locate/roadmap-detail');
}

function formatRoadmapKinds(kinds: string){
	return (kinds || "").split(",").map(e => e.trim()).filter(e => !!e).map(e=> ` • ${e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()} `).join("");
}
</script>

<template>
  <div class="hidden lg:block bg-blue-100 lg:p-5 text-center rounded">
    <span class="font-bold md:text-lg lg:text-2xl">Saved road maps</span>
  </div>

  <RouterLink to="/locate">
    <app-icon
      type="arrow_left"
      size="45"
      class="overflow-visible rounded-full p-3 bg-[#F2F2F2] cursor-pointer hover:opacity-80"
    />
  </RouterLink>

  <MySelect
    :selected="orderBy"
    @change="newValue => (orderBy = newValue)"
    placeholder="Order By"
    :items="orderByOptions as any"
    variant="primary"
    class="w-[112px] bg-[#21252926] border-2"
		placeholderColor="black"
		:useOptionSearchFeature="false"
  />

	<div v-if="!roadmapsLoading && !roadmaps.length" class="flex flex-col pt-24 gap-12 items-center">
		<span class="text-[#21252999] text-center">There are no roadmaps saved yet: create the first tour roadmap</span>
		<RouterLink to="/locate">
			<LocateBtn class="text-black bg-white border-black text-none font-normal text-[16px]" border>Create roadmap</LocateBtn>
		</RouterLink>
	</div>

	<div v-else class="flex flex-col  gap-[16px]">
		<template v-for="roadmap of orderedRoadmaps">
			<div class="text-right text-[#787878] mt-1">{{ `(${formatDate(roadmap.date_creation)})` }}</div>

			<div class="flex flex-col shadow-[0px_0px_8px_0px_#5b5b5b1f]  rounded-lg p-[12px] gap-[8px]">

				<div class="flex flex-row w-full pb-[12px] border-b-[1px] border-[#F2F2F2] border-solid">
					<div class="flex-1 text-lg font-[500] tex-black">{{ isEntityRoadmapData(roadmap) ?  roadmap.name : roadmap.event_name }}</div>
					
					<app-icon @click="gotToRoadmapDetailPage(roadmap)" type="arrow-right-circle" class="hover:brightness-90 cursor-pointer" />
				</div>

				<div class="pl-1">
					{{  `• ${roadmap.begin_address}    • Date: ${roadmap.date_tour_planned || roadmap.date_creation}` }}
				</div>

				<div class="pl-1">
					{{ formatRoadmapKinds(roadmap.roadmap_entity_kinds || "") }}
				</div>

			</div>
		</template>
	</div>

</template>
