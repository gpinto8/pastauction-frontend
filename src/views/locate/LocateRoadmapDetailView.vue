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
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import CalculateCostOfTheTripModal from '@/views/locate/modal/calculateCostOfTheTripModal.vue';
import { storeToRefs } from 'pinia';
import { useLocateStore, type Coordinates } from '@/store/locate/locate';
import {
	isEntityRoadmapData,
  isEventRoadmapData,
  isServiceRoadmapData,
  useLocateRoadmapStore,
  type EntityRoadmapData,
	type EventRoadmapData,
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
  type LocateEntityData,
  type LocateExtendedEntityData,
} from '@/store/locate/locateEntityStore';
import LocateMap from './components/LocateMap.vue';
import LocateLocationSearchInput from './components/LocateLocationSearchInput.vue';
import { RouterLink , useRouter } from 'vue-router';
import { makePhoneCall } from '@/store/locate/utils/makePhoneCall';
import LocateEntityCard from './components/LocateEntityCard.vue';
import LocateEventCard from './components/LocateEventCard.vue';

const locateStore = useLocateStore();
const { filterValuesFunctions , getSelectedItems , emitEvent_searchLocation } = locateStore;
const { 
	locateSearchCategories, 
	activeLocateSearchCategory, 
	filterValues, 
	loadingStates, 
	modalStates,
	mapLocationSearchQuery,
	itemsLoading,
	loadingScreen,
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
const { fetchEntitiesForRoadmap, fetchEventsForRoadmap, fetchServiceRoadmaps } = roadmapStore;
const { 
	entityRoadmaps,
	eventsRoadmaps,
	roadmapsLoading, 
	detailRoadmap,
	detailRoadmapEntities,
	detailRoadmapServices,
	detailRoadmapEvents,
	roadmapVehicleData,
} = storeToRefs(roadmapStore);

onMounted(async ()=>{
	if(!detailRoadmap.value) return;

	loadingScreen.value = true;

	if(isEntityRoadmapData(detailRoadmap.value)){
		await fetchEntitiesForRoadmap(detailRoadmap.value);
	} else if(isEventRoadmapData(detailRoadmap.value)){
		await fetchEventsForRoadmap(detailRoadmap.value);
	} else if(isServiceRoadmapData(detailRoadmap.value)){
		await fetchServiceRoadmaps(detailRoadmap.value);
	}

	loadingScreen.value = false;
});

const isEntitySelected = computed(()=> activeLocateSearchCategory.value.name === "Entity");

const roadmaps = computed(() => {
	if(isEntitySelected.value){
		return entityRoadmaps.value;
	} else {
		return eventsRoadmaps.value;
	};
});

const orderBy = ref<typeof orderByOptions[number]>('');
const orderByOptions = ['More new', 'More old'];

const isApproximateCostSectionVisible = ref(false);

const roadmapTripCostsData = ref({
	approximatePrice : "430,00US$",
	mileage: "2503 km",
	time : "25hs 12min",
	detailedCost : "430,00US$",
	fuelCost: "300,00 US$",
	totalTollCost: "130,00 US$",
	tollsCosts: [
		{ label: "Sagamore Bridge Toll Plaza", cost: "US$ 50"},
		{ label: "Bourne Bridge Toll Plaza", cost: "US$ 20"},
		{ label: "Sagamore Bridge Toll Plaza", cost: "US$ 50"},
		{ label: "Tobin Bridge Toll Plaza", cost: "US$ 10"},
	],
});

const activeGoogleMapsDirectionsResult = ref<google.maps.DirectionsResult | null>(null);

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

function gotToRoadmapsListPage() {
	router.push('/locate/roadmaps');
}

function calculateAllCosts(){
	if(!roadmapVehicleData.value) return;
	if(!activeGoogleMapsDirectionsResult.value) return;
	if(!activeGoogleMapsDirectionsResult.value.routes.length) return;

	const mileToKm = (mile: number) => mile * 1.60934;
	const meterToKm = (meter: number) => meter / 1000;
	const secondsToHours = (seconds: number) => seconds / 3600;

	// google maps can return mutliple routes, we will use and display only the first one
	const mainRoute = activeGoogleMapsDirectionsResult.value.routes[0];

	const routeDistanceKm = meterToKm(mainRoute.legs.reduce((p, c) => p + (c.distance?.value || 0), 0));
	const routDurationHr = secondsToHours(mainRoute.legs.reduce((p, c) => p + (c.duration?.value || 0), 0));

	const pricePerKm = mileToKm(parseFloat(roadmapVehicleData.value.fuelCost08) / 15_000);

	const fulesCost = routeDistanceKm * pricePerKm;
	const totalTollCost = mainRoute.fare?.value || 0;

	roadmapTripCostsData.value = {
		approximatePrice : `${fulesCost + totalTollCost}US$`, //"430,00US$",
		mileage: `${routeDistanceKm} km`, //"2503 km",
		time : `${routDurationHr}hs`, //"25hs 12min",
		detailedCost : `${fulesCost + totalTollCost}US$`, //"430,00US$",
		fuelCost: `${fulesCost} US$`, //"300,00 US$",
		totalTollCost: `${totalTollCost} US$`, //"130,00 US$",
		tollsCosts: [
			{ label: "Google Maps estimated total Toll", cost: `US$ ${totalTollCost}`},
		],
		// tollsCosts: [
		// 	{ label: "Sagamore Bridge Toll Plaza", cost: "US$ 50"},
		// 	{ label: "Bourne Bridge Toll Plaza", cost: "US$ 20"},
		// 	{ label: "Sagamore Bridge Toll Plaza", cost: "US$ 50"},
		// 	{ label: "Tobin Bridge Toll Plaza", cost: "US$ 10"},
		// ],
	};
}

</script>

<template>
	<CalculateCostOfTheTripModal @calculate="isApproximateCostSectionVisible = true; calculateAllCosts()"/>

	<!-- temporary block -->
	<RouterLink to="/locate/roadmaps" class="flex items-center">
		<app-icon type="arrow_left" size="45" class=" overflow-visible rounded-full p-3 bg-[#F2F2F2] cursor-pointer hover:opacity-80"/>
	</RouterLink>

	<div class="hidden lg:flex bg-blue-100 lg:h-[52px] justify-center items-center rounded">
    <span class="font-bold md:text-lg lg:text-2xl">Roadmap detail (to do)</span>
  </div>

	<div>
		<LocateMap :items="activeLocateSearchCategory.name === 'Entity' ? detailRoadmapEntities : detailRoadmapEvents" change.google.maps.directions-result="activeGoogleMapsDirectionsResult"/>
	</div>


	<tempalte v-if="!isApproximateCostSectionVisible">
		<div class="flex flex-col gap-5 ">
			<!-- <LocateLocationSearchInput /> -->

			<div class="flex justify-between w-full items-center flex-wrap gap-2">

				<div class="flex gap-5 w-full lg:w-fit">
					<!-- Schedule Selector -->
					<div class="w-1/2 md:w-fit">
						<select class="custom-select" name="schedule" id="">
							<option value="">Schedule</option>
							<option value="any_time">Any Time</option>
							<option value="open_now">Open now</option>
							<option value="open_24hs">Open 24hs</option>
						</select>
						<app-icon class="custom-icon" type="small_arr_down" color="#000" size="sm"></app-icon>
					</div>
					<!-- Range Selector -->
					<div class="w-1/2 md:w-fit">
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

				<LocateBtn  block class="mt-8 md:!mt-0 md:px-4 py-2 w-full md:w-fit md:ml-auto bg-white !text-[#212529] border-[1px] border-[#212529] border-solid">Delete Roadmap</LocateBtn>
				<LocateBtn @click="modalStates.calculateCostOfTheTripModal = true" block class="md:px-4 py-2 w-full md:w-fit  bg-[#212529] text-white border-[1px] border-white">Calculate cost</LocateBtn>
			</div>
		</div>
	</tempalte>

	<tempalte v-else>

		<div class="flex flex-col gap-[10px] md:flex-row md:flex-wrap md:justify-end border-b-[0.5px] border-solid border-[#DEE2E6] pb-3">
			<div class="w-full md:flex md:gap-[24px] md:items-center lg:w-auto lg:flex-1 lg:flex-nowrap">
				<div class="text-lg text-[#212529] font-medium">Approximate cost</div>
				<div class="text-base">
					<span class="text-[#0D6EFD]">Current location</span><span class="text-[#6C757D] ">  >  {{ 'Massachusetts' }}</span>
				</div>
			</div>
			<LocateBtn @click="isApproximateCostSectionVisible = false" block class="bg-white !text-[#212529] border-[1px] border-[#212529] border-solid w-full block md:w-auto md:min-w-[158px]">Modify</LocateBtn>
			<LocateBtn @click="gotToRoadmapsListPage" block class="bg-[#212529] text-white border-[1px] border-white block w-full md:w-auto md:min-w-[158px]">Save</LocateBtn>
		</div>

		<div class="lg:grid lg:gap-4 lg:grid-cols-[1fr_1fr_1fr] lg:[&_>*]:w-full lg:mt-6 md:mt-4">
			<div class="rounded bg-[#F8F9FA] p-3 grid gap-[8px] grid-cols-2 mt-2 h-fit lg:!max-w-[318px]">
				<div class="justify-self-start">Approximate price</div> <div class="font-semibold text-[#0D6EFD] justify-self-end">{{ roadmapTripCostsData.approximatePrice }}</div>
				<div class="justify-self-start">Mileage</div> <div class="font-medium justify-self-end">{{ roadmapTripCostsData.mileage }}</div>
				<div class="justify-self-start">Time</div> <div class="font-semibold justify-self-end">{{ roadmapTripCostsData.time }}</div>
			</div>

			<div class="rounded bg-[#F8F9FA] mt-2">
				<div class="p-3 grid grid-cols-3 justify-items-center gap-y-3 w-[290px] md:w-[356px] mx-auto md:pt-8">
					<div class="flex flex-col items-center col-span-3">
						<svg class="mb-[-30px] w-[204px] md:w-[290px] h-[99px] md:h-[150px]" viewBox="0 0 204 99" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.101563 97.2783C1.49955 72.3809 11.9642 48.8568 29.5199 31.1471C47.0755 13.4374 70.5074 2.76772 95.3916 1.15234C120.276 -0.46303 144.89 7.08771 164.588 22.379C184.286 37.6703 197.705 59.6441 202.31 84.1517L176.649 88.9736C173.222 70.7355 163.236 54.3832 148.578 43.0037C133.919 31.6243 115.601 26.0052 97.083 27.2073C78.5647 28.4094 61.1273 36.3496 48.0627 49.5287C34.9982 62.7078 27.2106 80.214 26.1703 98.742L0.101563 97.2783Z" fill="#0D6EFD"/>
							<path d="M139.608 8.11823C157.199 15.0903 172.506 26.8158 183.819 41.9849C195.131 57.1539 202.004 75.1693 203.669 94.0188L177.305 96.3478C176.071 82.3866 170.981 69.043 162.602 57.8077C154.223 46.5724 142.886 37.8876 129.856 32.7236L139.608 8.11823Z" fill="#212529"/>
						</svg>
						<div class="font-semibold text-lg">Detailed cost</div>
					</div>

					<svg class="md:justify-self-start" idth="67" height="52" viewBox="0 0 67 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect x="21.0078" y="0.726562" width="24" height="24" fill="url(#pattern0_4381_90471)"/>
					<path d="M18.4169 42.7266V31.0902H25.3942V32.3402H19.826V36.272H24.8714V37.522H19.826V42.7266H18.4169ZM32.5788 39.1584V33.9993H33.9197V42.7266H32.5788V41.2493H32.4879C32.2834 41.6925 31.9652 42.0694 31.5334 42.38C31.1016 42.6868 30.5561 42.8402 29.897 42.8402C29.3516 42.8402 28.8667 42.7209 28.4425 42.4822C28.0182 42.2398 27.6849 41.8762 27.4425 41.3913C27.2 40.9027 27.0788 40.2872 27.0788 39.5447V33.9993H28.4197V39.4538C28.4197 40.0902 28.5978 40.5978 28.9538 40.9766C29.3137 41.3554 29.772 41.5447 30.3288 41.5447C30.6622 41.5447 31.0012 41.4595 31.3459 41.2891C31.6944 41.1186 31.986 40.8572 32.2209 40.505C32.4595 40.1527 32.5788 39.7038 32.5788 39.1584ZM40.0348 42.9084C39.1939 42.9084 38.4685 42.7228 37.8587 42.3516C37.2526 41.9766 36.7848 41.4538 36.4553 40.7834C36.1295 40.1091 35.9666 39.325 35.9666 38.4311C35.9666 37.5372 36.1295 36.7493 36.4553 36.0675C36.7848 35.3819 37.2431 34.8478 37.8303 34.4652C38.4212 34.0788 39.1106 33.8857 39.8984 33.8857C40.353 33.8857 40.8018 33.9614 41.245 34.1129C41.6882 34.2644 42.0916 34.5107 42.4553 34.8516C42.8189 35.1887 43.1087 35.6357 43.3246 36.1925C43.5405 36.7493 43.6484 37.4349 43.6484 38.2493V38.8175H36.9212V37.6584H42.2848C42.2848 37.166 42.1863 36.7266 41.9893 36.3402C41.7962 35.9538 41.5196 35.6489 41.1598 35.4254C40.8037 35.2019 40.3833 35.0902 39.8984 35.0902C39.3643 35.0902 38.9022 35.2228 38.5121 35.4879C38.1257 35.7493 37.8284 36.0902 37.62 36.5107C37.4117 36.9311 37.3075 37.3819 37.3075 37.8629V38.6357C37.3075 39.2947 37.4212 39.8535 37.6484 40.3118C37.8795 40.7663 38.1996 41.1129 38.6087 41.3516C39.0178 41.5864 39.4931 41.7038 40.0348 41.7038C40.3871 41.7038 40.7053 41.6546 40.9893 41.5561C41.2772 41.4538 41.5253 41.3023 41.7337 41.1016C41.942 40.897 42.103 40.6432 42.2166 40.3402L43.5121 40.7038C43.3757 41.1432 43.1465 41.5296 42.8246 41.8629C42.5026 42.1925 42.1049 42.45 41.6314 42.6357C41.1579 42.8175 40.6257 42.9084 40.0348 42.9084ZM47.0291 31.0902V42.7266H45.6882V31.0902H47.0291Z" fill="#6C757D"/>
					<defs>
					<pattern id="pattern0_4381_90471" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0_4381_90471" transform="scale(0.00195312)"/>
					</pattern>
					<image id="image0_4381_90471" width="512" height="512" xlink:href="data:image/png;base64,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"/>
					</defs>
					</svg>

					<div class="font-semibold text-[#0D6EFD] text-lg">{{ roadmapTripCostsData.detailedCost }}</div>

					<svg class="md:justify-self-end" width="65" height="52" viewBox="0 0 65 52" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_4381_90475)">
					<path d="M32.8359 15.7266C33.6316 15.7266 34.3946 15.4105 34.9573 14.8479C35.5199 14.2853 35.8359 13.5222 35.8359 12.7266C35.8359 11.9309 35.5199 11.1679 34.9573 10.6052C34.3946 10.0426 33.6316 9.72656 32.8359 9.72656C32.0403 9.72656 31.2772 10.0426 30.7146 10.6052C30.152 11.1679 29.8359 11.9309 29.8359 12.7266C29.8359 13.5222 30.152 14.2853 30.7146 14.8479C31.2772 15.4105 32.0403 15.7266 32.8359 15.7266Z" fill="#212529"/>
					<path d="M20.8359 6.72656C20.8359 6.32874 20.994 5.94721 21.2753 5.6659C21.5566 5.3846 21.9381 5.22656 22.3359 5.22656H43.3359C43.7338 5.22656 44.1153 5.3846 44.3966 5.6659C44.6779 5.94721 44.8359 6.32874 44.8359 6.72656V18.7266C44.8359 19.1244 44.6779 19.5059 44.3966 19.7872C44.1153 20.0685 43.7338 20.2266 43.3359 20.2266H22.3359C21.9381 20.2266 21.5566 20.0685 21.2753 19.7872C20.994 19.5059 20.8359 19.1244 20.8359 18.7266V6.72656ZM25.3359 6.72656C25.3359 7.52221 25.0199 8.28527 24.4573 8.84788C23.8946 9.41049 23.1316 9.72656 22.3359 9.72656V15.7266C23.1316 15.7266 23.8946 16.0426 24.4573 16.6052C25.0199 17.1679 25.3359 17.9309 25.3359 18.7266H40.3359C40.3359 17.9309 40.652 17.1679 41.2146 16.6052C41.7772 16.0426 42.5403 15.7266 43.3359 15.7266V9.72656C42.5403 9.72656 41.7772 9.41049 41.2146 8.84788C40.652 8.28527 40.3359 7.52221 40.3359 6.72656H25.3359Z" fill="#212529"/>
					</g>
					<path d="M20.1087 32.3402V31.0902H28.8359V32.3402H25.1768V42.7266H23.7678V32.3402H20.1087ZM33.1087 42.9084C32.3208 42.9084 31.6295 42.7209 31.0348 42.3459C30.4439 41.9709 29.9818 41.4463 29.6484 40.772C29.3189 40.0978 29.1541 39.3099 29.1541 38.4084C29.1541 37.4993 29.3189 36.7057 29.6484 36.0277C29.9818 35.3497 30.4439 34.8232 31.0348 34.4482C31.6295 34.0732 32.3208 33.8857 33.1087 33.8857C33.8965 33.8857 34.5859 34.0732 35.1768 34.4482C35.7715 34.8232 36.2337 35.3497 36.5632 36.0277C36.8965 36.7057 37.0632 37.4993 37.0632 38.4084C37.0632 39.3099 36.8965 40.0978 36.5632 40.772C36.2337 41.4463 35.7715 41.9709 35.1768 42.3459C34.5859 42.7209 33.8965 42.9084 33.1087 42.9084ZM33.1087 41.7038C33.7071 41.7038 34.1996 41.5504 34.5859 41.2436C34.9723 40.9368 35.2583 40.5334 35.4439 40.0334C35.6295 39.5334 35.7223 38.9917 35.7223 38.4084C35.7223 37.825 35.6295 37.2815 35.4439 36.7777C35.2583 36.2739 34.9723 35.8667 34.5859 35.5561C34.1996 35.2455 33.7071 35.0902 33.1087 35.0902C32.5102 35.0902 32.0178 35.2455 31.6314 35.5561C31.245 35.8667 30.959 36.2739 30.7734 36.7777C30.5878 37.2815 30.495 37.825 30.495 38.4084C30.495 38.9917 30.5878 39.5334 30.7734 40.0334C30.959 40.5334 31.245 40.9368 31.6314 41.2436C32.0178 41.5504 32.5102 41.7038 33.1087 41.7038ZM40.451 31.0902V42.7266H39.1101V31.0902H40.451ZM44.2479 31.0902V42.7266H42.907V31.0902H44.2479Z" fill="#6C757D"/>
					<defs>
					<clipPath id="clip0_4381_90475">
					<rect width="24" height="24" fill="white" transform="translate(20.8359 0.726562)"/>
					</clipPath>
					</defs>
					</svg>

					<div class="flex justify-between col-span-3 w-full">
						<div class="font-semibold text-lg">{{ roadmapTripCostsData.fuelCost }}</div>
						<div class="font-semibold text-lg">{{ roadmapTripCostsData.totalTollCost }}</div>
					</div>

				</div>
			</div>

			<div class="rounded bg-[#F8F9FA] p-3 flex flex-col gap-[16px] mt-2">
				<!-- <div >Approximate price</div> <div class="font-semibold text-[#0D6EFD] justify-self-end">430,00US$</div>
				<div class="justify-self-start">Mileage</div> <div class="font-medium justify-self-end">2503 km</div>
				<div class="justify-self-start">Time</div> <div class="font-semibold justify-self-end">5hs 12min</div> -->

				<div class="flex justify-between items-center border-b-[0.5px] border-solid border-[#DEE2E6] pb-2 text-[18px]">
					<div>Total tolls</div> <div class="font-semibold text-[#0D6EFD] whitespace-nowrap">{{ roadmapTripCostsData.totalTollCost }}</div>
				</div>

				<div v-for="toll in roadmapTripCostsData.tollsCosts" class="flex flex-col md:flex-row lg:gap-2 md:justify-between md:items-center">
					<div>{{ toll.label }}</div> <div class="font-semibold whitespace-nowrap">{{ toll.cost }}</div>
				</div>
			</div>
		</div>
	</tempalte>

	<div class="grid grid-cols-1 md:grid-cols-2 min-[1250px]:grid-cols-3 gap-3" :class="{' md:!grid-cols-1': activeLocateSearchCategory.name === 'Events'}" >
		<LocateEntityCard v-if="activeLocateSearchCategory.name === 'Entity'" :entity="entity" v-for="entity of detailRoadmapEntities" :allowSelect="false" :isSelectedDefault="true" />
		<LocateEntityCard v-if="activeLocateSearchCategory.name === 'Services'" :entity="service" v-for="service of detailRoadmapServices" :allowSelect="false" :isSelectedDefault="true" />
		<LocateEventCard v-if="activeLocateSearchCategory.name === 'Events'" :event="event" v-for="event of detailRoadmapEvents" :allowSelect="false" :isSelectedDefault="true" />
	</div>

</template>
<style scoped>
	* {
		position: relative;
	}

.card {
    @apply p-10 rounded-lg bg-white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
}

/*TAGS*/
.my_tag_icon_box {
    width: 70px;
    height: 60px;
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

