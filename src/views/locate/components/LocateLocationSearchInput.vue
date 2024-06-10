<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref, onMounted, onBeforeMount, type Ref, watch, computed, type ComputedRef } from 'vue';
import { storeToRefs} from 'pinia'
import { useLocateStore, type Coordinates } from '@/store/locate/locate'
import { geocodingLibrary, markerLibrary } from '../googleMapsLoader';




// onMounted(async () => {
// 	// ({ Map } = await loader.importLibrary("maps"));
// 	// ({ DirectionsService, DirectionsRenderer } = await loader.importLibrary("routes"));
// 	// ({ AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker'));
// 	// ({ Geocoder } = await loader.importLibrary('geocoding'));

// });


const locateStore = useLocateStore();

const { emitEvent_searchLocation } = locateStore;
const { 
	mapLocationSearchQuery,
	currentUserLocationMarker,
	currentUserLocationBounds,
} = storeToRefs(locateStore);


const emit = defineEmits<{
	(e: 'change', newValue: Coordinates): void
}>();


const isOpen = ref(false);
const selectOptionsContainerRef = ref<HTMLElement>();
const locationOptions = ref<google.maps.GeocoderResult[]>([]);
const isLoading = ref(false);

/** used to store event listeners that will listen for document clicks to close the select component, only one click listeners needs to exists at once */
const closeSelectListener = ref<any>();

// when the select component opens, we add an event listener to close the menu if an event ocurs anywhere in the page
watch(isOpen, ()=>{
	if(closeSelectListener.value) document.removeEventListener("click", closeSelectListener.value);
	if(isOpen.value){
		setTimeout(()=>{
			closeSelectListener.value = (event: Event)=>{
				// if(!selectOptionsContainerRef.value?.contains(event.currentTarget as Node)) isOpen.value = false;
			};
			document.addEventListener("click", closeSelectListener.value, {once: true});
		}, 200)
	}
});

// Funzione per cercare la città e spostare il centro della mappa
async function searchLocation() {
	// Verifica se è stata inserita una query di ricerca
	if (!mapLocationSearchQuery.value) return;

	// Esegui la richiesta di geocoding per ottenere le coordinate della città
	const geocoder = new (await geocodingLibrary).Geocoder();
	isLoading.value = true;
	geocoder.geocode({ address: mapLocationSearchQuery.value }, (results, status) => {
		if (status === 'OK' && results) {
			locationOptions.value = results;

			// Sposta il centro della mappa alle coordinate della città
			// map.setCenter(location);

			// Aggiungi un marker per la città
			// markers.value.push({
			// 	position: location,
			// 	title: mapLocationSearchQuery.value
			// });
		}
		isLoading.value = false;
	});
}

async function onOptionClick(option: google.maps.GeocoderResult){
	currentUserLocationBounds.value = option.geometry.bounds;
	if(currentUserLocationMarker.value) currentUserLocationMarker.value.map = null;
	currentUserLocationMarker.value = new (await markerLibrary).AdvancedMarkerElement({
		position: option.geometry.location,
		content: new (await markerLibrary).PinElement({ 'background': '#4fb056', 'borderColor': 'white', 'glyphColor': 'white' }).element,
	});
}

</script>

<template>
    <div ref="locationOptionsContainerRef" class="flex flex-row w-full lg:w-fit relative z-10">
			<input
				@focus="isOpen = true"
				class="w-full rounded-l-lg border border-gray-600 px-2 lg:min-w-[400px] outline-none"
				v-model="mapLocationSearchQuery" 
				@keyup.enter="emitEvent_searchLocation"
				@input="searchLocation"
				id="searchRegion" 
				type="text"
				placeholder="Insert center map address"
			>
			<label class="bg-black rounded-r-lg px-3 py-1" for="searchRegion">
				<app-icon type="search" color="#fff" size="lg"></app-icon>
			</label>
			<div v-if="isOpen" class="absolute mt-1 w-full top-full left-0 rounded-lg border-2 p-2 border-gray-300 flex flex-col gap-2 bg-white z-20">
				<div v-if="locationOptions.length" class="max-h-64 overflow-y-auto flex flex-col gap-1">
					<!-- <div @click.stop="selected = item as any; isOpen = false; emit('change', item)" class="hover:bg-gray-200 px-1 rounded-sm font-thin tracking-wide" v-for="item of filteredItems">{{formatItemFN ? formatItemFN(item) : (item + '')}}</div> -->
					<div @click.stop="onOptionClick(item); isOpen = false; mapLocationSearchQuery = item.formatted_address;" class="hover:bg-gray-200 px-1 rounded-sm font-thin tracking-wide" v-for="item of locationOptions">{{item.formatted_address}}</div>
				</div>
				<!-- <div v-if="searchQuery && !filteredItems?.length" @click="isOpen = false; selected = searchQuery as any; searchQuery = '';" class="text-ceter pb-1 px-1 rounded-lg bg-sky-100"><span class="text-gray-400 font-thin">use</span> {{ searchQuery }}</div> -->
				<div v-if="!locationOptions.length && !isLoading" class="text-gray-400 text-center">no results found</div>
				<div v-if="isLoading" role="status" class="mx-auto">
						<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="sr-only">Loading...</span>
				</div>
			</div>
	</div>
</template>