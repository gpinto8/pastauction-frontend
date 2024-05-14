<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import {
  ref,
  onMounted,
  onBeforeMount,
  type Ref,
  watch,
  computed,
  type ComputedRef,
} from 'vue';
import MySelect from './components/Select.vue';
import { storeToRefs } from 'pinia';
import { useLocateStore, type Coordinates } from '@/store/locate/locate';
import {
  useLocateRoadmapStore,
  type RoadmapData,
} from '@/store/locate/locateRoadmapStore';

import {
  useLocateEventStore,
  type LocateExtendedEventData,
} from '@/store/locate/locateEventStore';
import {
  useLocateServiceStore,
  type LocateExtendedServicesData,
} from '@/store/locate/locateServiceStore';
import {
  useLocateEntityStore,
  type LocateExtendedEntityData,
} from '@/store/locate/locateEntityStore';
import LocateMap from './components/LocateMap.vue';
import LocateLocationSearchInput from './components/LocateLocationSearchInput.vue';
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
const { fetchRoadmaps } = roadmapStore;
const { roadmaps, roadmapsLoading , detailRoadmap } = storeToRefs(roadmapStore);

onMounted(()=>{
	fetchRoadmaps();
})
const orderBy = ref<typeof orderByOptions[number]>('');
const orderByOptions = ['More new', 'More old'];

function formatDate(dateString: string) {
	const today = new Date().toDateString();
	const yesterday = new Date(Date.now() - 86400000).toDateString();
	return (new Date(dateString).toDateString() === today) ? 'today' : (new Date(dateString).toDateString() === yesterday) ? 'yesterday' : dateString;
}

const orderedRoadmaps = computed(() => {
	return roadmaps.value.sort((a, b) => {
		const dateA = new Date(a.date_creation).getTime();
    const dateB = new Date(b.date_creation).getTime();

		return orderBy.value === "More old" ? dateA - dateB : dateB - dateA;
	});
});

const router = useRouter();

function gotToRoadmapDetailPage(roadmap: RoadmapData) {
	detailRoadmap.value = roadmap;
	router.push('/locate/roadmap-detail');
}


function makePhoneCall(phone: string){
	window.open('tel:' + phone, '_blank');
}
</script>

<template>
	<!-- temporary block -->
	<RouterLink to="/locate/roadmaps" class="flex items-center">
		<app-icon type="arrow_left" size="45" class=" overflow-visible rounded-full p-3 bg-[#F2F2F2] cursor-pointer hover:opacity-80"/>
	</RouterLink>

	<div class="hidden lg:block bg-blue-100 lg:p-5 text-center rounded">
    <span class="font-bold md:text-lg lg:text-2xl">Roadmap detail (to do)</span>
  </div>

	<div>
			<LocateMap/>
	</div>

	<div class="p-5 shadow-lg rounded-lg">
			<div class="flex flex-col gap-5 ">
					<LocateLocationSearchInput />
					<div class="flex justify-between w-full items-center flex-wrap gap-2">
							<div class="flex gap-5 w-full lg:w-fit">
			<!-- Schedule Selector -->
									<div class="w-1/2 md:w-fit select-container">
											<select class="custom-select" name="schedule" id="">
													<option value="">Schedule</option>
													<option value="any_time">Any Time</option>
													<option value="open_now">Open now</option>
													<option value="open_24hs">Open 24hs</option>
											</select>
											<app-icon class="custom-icon" type="small_arr_down" color="#000" size="sm"></app-icon>
									</div>
			<!-- Range Selector -->
									<div class="w-1/2 md:w-fit select-container">
											<select class="custom-select" name="range" id="">
													<option value="">Range</option>
													<option value="20">20km</option>
													<option value="30">30km</option>
													<option value="40">40km</option>
													<option value="50">50km</option>
											</select>
											<app-icon class="custom-icon" type="small_arr_down" color="#000" size="sm"></app-icon>
									</div>
							</div>
		<div v-if="entities.length" @click="" class="md:px-4 py-2 w-full md:w-fit md:ml-auto text-center rounded bg-black text-white cursor-pointer">Create roadmap</div>
	</div>
			</div>

<div v-if="!entities.length" class="flex flex-row flex-wrap gap-2 md:justify-end mt-10">
	<div class="w-full lg:w-fit text-[#6C757D]">Here you can see information about the different entities</div>
	<div class="flex-1 hidden lg:block"></div>
	<div @click="" class="md:px-4 py-2 w-full md:w-fit text-center rounded text-black bg-white border-black border-[1px] cursor-pointer">Reset All</div>
	<div @click="" class="md:px-4 py-2 w-full md:w-fit text-center rounded bg-black text-white cursor-pointer">Create roadmap</div>
</div>

			<div v-if="entities.length" class="mt-10 border-t border-black">
					<p class="font-semibold py-2">
							Select your points of interest to create your roadmap
					</p>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							<v-card v-for="entity of entities" class="w-full flex px-2 py-4 gap-2">
									<img class="h-12 lg:h-14 aspect-square rounded-full object-cover" src="@/assets/images/create_garage.png" alt="">
									<div class="flex-1">
											<!-- FIRST BLOCK -->
											<div>
													<div class="flex justify-between">
															<!-- TITLE -->
															<div class="flex-1 font-[500]">{{ entity.name_complete }}</div>
															<!-- BTN -->
															<div class="flex gap-2">
																	<div @click="makePhoneCall(entity.phone)" class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
																			<app-icon type="phone" color="#000" size="md"></app-icon>
																	</div>
																	<label
																			class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
																			<input type="checkbox" v-model="entity.isSelected">
																	</label>
															</div>
													</div>
													<!-- RATINGS -->
													<div>
															<p class="flex items-center gap-2">
																	{{ '0.0' }} <app-icon type="star" color="#FFC107" size="sm"></app-icon>
															</p>
													</div>
											</div>
											<!-- SECON BLOCK -->
											<div class="flex flex-col gap-2">
													<!-- DISTANCE -->
													<div>
															<ul class="flex items-center gap-2 list-inside list-disc">
																	<li>{{ entity.kind_name }}</li>
																	<li>{{ 'null' }}</li>
															</ul>
													</div>
													<!-- CLOCK -->
													<div>
															<span class="text-green-700">
																Open
															</span>
															<span>
																{{ '00:00' }}
															</span>
															<span>
																Closes at
															</span>
															<span>
																{{ '00:00' }}
															</span>
													</div>
													<!-- LOCATION -->
													<div class="flex gap-1 items-center">
															<app-icon type="marker" color="#ff0000" size="md"></app-icon>
															<p>
																	{{ entity.address }}
															</p>
													</div>
													<!-- SITE -->
													<div>
															<a :href="entity.website">{{entity.website}}</a>
													</div>
											</div>
									</div>
							</v-card>
					</div>

			</div>
	</div>
</template>

