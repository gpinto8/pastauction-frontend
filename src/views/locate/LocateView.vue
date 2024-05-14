<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref, watch } from 'vue';
import MySelect from './components/Select.vue';
import { storeToRefs} from 'pinia'
import { useLocateStore } from '@/store/locate/locate'

import { scrollElementContent } from '@/utils/ui/scrollElementContent';
import config from '@/config';
import { useLocateEventStore } from '@/store/locate/locateEventStore';
import { useLocateServiceStore } from '@/store/locate/locateServiceStore';
import { useLocateEntityStore } from '@/store/locate/locateEntityStore';
import LocateMap from './components/LocateMap.vue';
import LocateLocationSearchInput from './components/LocateLocationSearchInput.vue';

const locateStore = useLocateStore();

const { filterValuesFunctions , getSelectedItems , emitEvent_searchLocation } = locateStore;
const { 
	activeLocateSearchCategory, 
	filterValues, 
	modalStates,
} = storeToRefs(locateStore);

const entityStore = useLocateEntityStore();
const { fetchEntities } = entityStore;
const { entities, entitiesLoading } = storeToRefs(entityStore);

const serviceStore = useLocateServiceStore();
const { fetchServices } = serviceStore;
const { services , servicesLoading} = storeToRefs(serviceStore);

const eventStore = useLocateEventStore();
const { fetchEvents } = eventStore;
const { events, eventsLoading } = storeToRefs(eventStore);

const entitiesContainerRef = ref<HTMLDivElement | null>(null);

const defaultFilters = {
	area: '',
	country: '',
	city: '',
	car: '',
	brand: '',
	aging: '',
};
const activeFilters = ref(defaultFilters);

function resetFilters(){
	activeFilters.value = defaultFilters;
}

/** when the Area filter changes, re-fetch the countries filter possible values */
watch(
  () => activeFilters.value.area,
  (newValue, oldValue) => {
		/** if the user changes the country, we reset the city to prevent non-sense country-city pairs */
		if(newValue.toLocaleLowerCase() !== oldValue.toLocaleLowerCase()){
			activeFilters.value.country = '';
			filterValuesFunctions.fetchCountries(newValue)
		}
  }
);

/** when the cascade filters change or the entity/service/event category filter changes, re-fetch the datas */
watch([
		() => activeFilters.value,
		() => activeLocateSearchCategory.value.subcategories
	], ()=>{

	switch (activeLocateSearchCategory.value.name) {
		case "Entity":
			searchEntities();
			break;
		case "Services":
			searchServices();
			break;
		case "Events":
			searchEvents();
			break;
	}
}, {deep: true});

async function searchEntities(){
	await fetchEntities({
		'brand_name': activeFilters.value.brand,
		'country': activeFilters.value.country,
		'city': activeFilters.value.city,
		'temp_tipo_j': `"${activeFilters.value.car}"`,
		'aging_period_j': `"${activeFilters.value.aging}"`,
	}, activeLocateSearchCategory.value.subcategories.filter(e=>e.isSelected).map(e=>e.name))
}

async function searchServices(){
	await fetchServices({
		'brand_name': activeFilters.value.brand,
		'entity_country': activeFilters.value.country,
		'entity_city': activeFilters.value.city,
		// 'entity_temp_tipo': `"${activeFilters.value.car}"`,
		// 'entity_aging_period': `"${activeFilters.value.aging}"`,
	}, activeLocateSearchCategory.value.subcategories.filter(e=>e.isSelected).map(e=>parseInt(e.name)))
}

async function searchEvents(){
	await fetchEvents({
		'entity_brand_name': activeFilters.value.brand,
		'entity_country': activeFilters.value.country,
		'entity_city': activeFilters.value.city,
		'entity_temp_tipo': `"${activeFilters.value.car}"`,
		'entity_aging_period': `"${activeFilters.value.aging}"`,
	}, activeLocateSearchCategory.value.subcategories.filter(e=>e.isSelected).map(e=>e.name))
}

const apiUrl = config.apiUrl;
async function getImgUrl(photo: string){
	return `${apiUrl}/photo/${photo}`
}

const handleCreateRoadmap = () => {
	let pointsOfInterests = getSelectedItems();

	if(pointsOfInterests.length < 1){
		modalStates.value.cannotCreateRoadmapWarning = true;
	} else {
		modalStates.value.createMyRoadmap = true;
	}
}

function makePhoneCall(phone: string){
	window.open('tel:' + phone, '_blank');
}

</script>

<template>
	<div class="hidden lg:block bg-blue-100 lg:p-5 text-center rounded">
		<span class="font-bold md:text-lg lg:text-2xl">{{ activeLocateSearchCategory.name }}</span>
	</div>

	<div class="flex flex-col gap-4 rounded p-4 pb-2 bg-[#212529]">
		<div class="hidden lg:flex-row lg:items-stretch lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] md:flex-wrap md:grid md:grid-cols-3 lg:[&>*]:w-auto md:[&>*]:w-full md:gap-3">
				<MySelect @change="newValue => activeFilters.area = newValue" v-model:selected="activeFilters.area" placeholder="Area" :items="filterValues.areas"></MySelect>
				<MySelect @change="newValue => activeFilters.country = newValue" v-model:selected="activeFilters.country" placeholder="Country" :items="filterValues.countries"></MySelect>
				<!-- <MySelect @change="newValue => activeFilters.city = newValue" v-model:selected="activeFilters.city" placeholder="City" :items="filterValues.cities"></MySelect> -->
				<MySelect @change="newValue => activeFilters.car = newValue" v-model:selected="activeFilters.car" placeholder="Car" :items="filterValues.cars"></MySelect>
				<MySelect @change="newValue => activeFilters.brand = newValue" v-model:selected="activeFilters.brand" placeholder="Brand" :items="filterValues.brands"></MySelect>
				<MySelect @change="newValue => activeFilters.aging = newValue" v-model:selected="activeFilters.aging" placeholder="Aging" :items="filterValues.agings"></MySelect>
				<!-- <MySelect @change="newValue => activeFilters.aging = newValue" v-model:selected="activeFilters.aging" placeholder="Aging" :items="filterValues.agings" :filterFN="(i, q)=>i.name.toLowerCase().includes(q.toLowerCase())" :formatItemFN="(i)=> i.name ? `${i.name} (${i.startYear}-${i.endYear})` : ''"></MySelect> -->
			
				<v-btn class="bg-blue-700 text-white !h-full lg:px-6" >
					Search
				</v-btn>
		</div>

		<v-btn block class="bg-white md:hidden">
			<app-icon class="text-[#0D6EFD]" type="search" size="md"></app-icon>
			<span @click="searchEntities" class="text-[#0D6EFD]">Search</span>
		</v-btn>

		<!-- entity type/category selector -->
		<div class="flex flex-row items-center">
			<div class="lg:hidden h-full -ml-4" @click="() => scrollElementContent(entitiesContainerRef!, 'horizontal', -(1/activeLocateSearchCategory.subcategories.length) * 3, '%')">
				<app-icon class="w-1" type="chevron-compact-left" color="#fff" size="xxl"></app-icon>
			</div>

			<div ref="entitiesContainerRef" class="overflow-x-auto -ml-1 -mr-1 lg:m-0 scroll-smooth flex-1 flex flex-row gap-3 lg:gap-0 lg:justify-between whitespace-nowrap">
				<div
					v-for="subcategory of activeLocateSearchCategory.subcategories"
					class="flex flex-col gap-1 items-center justify-center"
					@click="subcategory.isSelected = !subcategory.isSelected"
				>
					<div :class="'flex cursor-pointer items-center justify-center border-4 border-blue-500 rounded my_tag_icon_box ' + (subcategory.isSelected ? 'bg-white' : 'bg-[#CBCBCB]')">
						<img class="scale-[.7]" :src="subcategory.imgUrl" />
					</div>
					<div class="text-white text-center">{{ subcategory.name }}</div>
				</div>
			</div>

			<div class="lg:hidden h-full -mr-4" @click="() => scrollElementContent(entitiesContainerRef!, 'horizontal', +(1/activeLocateSearchCategory.subcategories.length) * 3, '%')">
				<app-icon class="w-1" type="chevron-compact-right" color="#fff" size="xxl"></app-icon>
			</div>
		</div>
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
		<div v-if="entities.length" @click="handleCreateRoadmap()" class="md:px-4 py-2 w-full md:w-fit md:ml-auto text-center rounded bg-black text-white cursor-pointer">Create roadmap</div>
	</div>
			</div>

<div v-if="!entities.length" class="flex flex-row flex-wrap gap-2 md:justify-end mt-10">
	<div class="w-full lg:w-fit text-[#6C757D]">Here you can see information about the different entities</div>
	<div class="flex-1 hidden lg:block"></div>
	<div @click="resetFilters()" class="md:px-4 py-2 w-full md:w-fit text-center rounded text-black bg-white border-black border-[1px] cursor-pointer">Reset All</div>
	<div @click="handleCreateRoadmap()" class="md:px-4 py-2 w-full md:w-fit text-center rounded bg-black text-white cursor-pointer">Create roadmap</div>
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

<style>
.card {
    @apply p-10 rounded-lg bg-white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
}

/*TAGS*/
.my_tag_icon_box {
    width: 70px;
    height: 60px;
}

/* Stile per il contenitore della select */
.select-container {
    position: relative;
    display: inline-block;
    width: max-content;
}

/* Stile per la select personalizzata */
.custom-select {
    padding-right: 35px !important;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

.custom-select,
option {
    color: #000;
}

/* Stile per il componente icona */
.custom-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    /* Regola la distanza dell'icona dalla select come preferisci */
    transform: translateY(-50%);
    pointer-events: none;
}
</style>

