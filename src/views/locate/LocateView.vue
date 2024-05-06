<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import Modal from '@/components/modal/Modal.vue';
import { ref, onMounted, type Ref, onUnmounted } from 'vue';
import MySelect from './components/Select.vue';
import { storeToRefs} from 'pinia'
import {useLocateStore} from '@/store/locate/locate'
import { Loader } from "@googlemaps/js-api-loader"
import { scrollElementContent } from '@/utils/ui/scrollElementContent';

const entitiesContainerRef = ref<HTMLDivElement | null>(null);

const modalStates = ref({
	useMyLocationModalIsOpen: true,
	displayErrorsModalIsOpen: false,
});

// type LocateSearchCategory =  typeof locateSearchCategories[number];
type LocateSearchCategory =  {
	name: string,
	iconName: string,
	subcategories: {
		name: string;
		iconName?: string;
		imgUrl?: string;
		isSelected?: boolean;
	}[],
};

const locateSearchCategories  = ref<LocateSearchCategory[]>([
	{name: 'Entity', iconName: "person", subcategories: [
		{name: 'Museum', iconName: 'temple'},
		{name: 'Circuit', iconName: 'circuit'},
		{name: 'Race car', imgUrl: 'racing-cars.png'},
		{name: 'Exhibition', imgUrl: 'exhibition-car.png'},
		{name: 'Market', imgUrl: 'market.png'},
		{name: 'Rally', imgUrl: 'rally.png'},
		{name: 'Tours', imgUrl: 'tours.png'},
		{name: 'Library', imgUrl: 'library.png'},
		{name: 'Factory', imgUrl: 'factory.png'},
		{name: 'Magazine', imgUrl: 'magazine.png'},
		{name: 'Owner club', imgUrl: 'owner-club.png'},
		{name: 'Concurs', imgUrl: 'concurs.png'},
		{name: 'Collection', imgUrl: 'collection.png'},
	]}, 
	{name: 'Services', iconName: "calendar_pin", subcategories: [
		{name: "Parts", iconName: "temple", imgUrl: ""},
		{name: "Services", iconName: "temple", imgUrl: ""},
		{name: "Body work", iconName: "temple", imgUrl: ""},
		{name: "Interior", iconName: "temple", imgUrl: ""},
		{name: "Electrical", iconName: "temple", imgUrl: ""},
		{name: "Wheels", iconName: "temple", imgUrl: ""},
		{name: "Resplay", iconName: "temple", imgUrl: ""},
		{name: "Tuning", iconName: "temple", imgUrl: ""},
		{name: "Cover", iconName: "temple", imgUrl: ""},
		{name: "Tools", iconName: "temple", imgUrl: ""},
		{name: "Literature", iconName: "temple", imgUrl: ""},
		{name: "Garaging", iconName: "temple", imgUrl: ""},
		{name: "Feight", iconName: "temple", imgUrl: ""},
		{name: "Triler", iconName: "temple", imgUrl: ""},
		{name: "Car box", iconName: "temple", imgUrl: ""},
	]},
	{name: 'Events', iconName: "service-levels", subcategories: [
		{name: 'Museum', iconName: 'temple'},
		{name: 'Circuit', iconName: 'circuit'},
		{name: 'Race car', imgUrl: 'racing-cars.png'},
		{name: 'Exhibition', imgUrl: 'exhibition-car.png'},
		{name: 'Market', imgUrl: 'market.png'},
		{name: 'Rally', imgUrl: 'rally.png'},
		{name: 'Tours', imgUrl: 'tours.png'},
		{name: 'Library', imgUrl: 'library.png'},
		{name: 'Factory', imgUrl: 'factory.png'},
		{name: 'Magazine', imgUrl: 'magazine.png'},
		{name: 'Owner club', imgUrl: 'owner-club.png'},
		{name: 'Concurs', imgUrl: 'concurs.png'},
		{name: 'Collection', imgUrl: 'collection.png'},
	]}, 
]);
const activeLocateSearchCategory = ref<LocateSearchCategory>(locateSearchCategories.value[0]);

const entitiesData : Ref<{}[]> = ref([{}]);

const locateStore = useLocateStore();
const { filterValuesFunctions } = locateStore;
const { filterValues } = storeToRefs(locateStore);

filterValuesFunctions.fetchCountries();
filterValuesFunctions.fetchCities();
filterValuesFunctions.fetchCars();
filterValuesFunctions.fetchBrands();

const activeFilters = ref({
	area: '',
	country: '',
	city: '',
	car: '',
	brand: '',
	aging:{name: "", startYear: 0, endYear: 0}
})

//ROADMAP
let error = ref(false);
let message = "";
let errors = { "icon": "marker", "text": message };
let pointsOfInterests = [];
const handleCreateRoadmap = () => {
    if (pointsOfInterests.length == 0) {
        error.value = true;
        errors.text = "Before you create your roadmap, you have to select your points of interest";
        console.log(error, errors, message);
    } else {
        console.log('Roadmap');
    }
}
//MODAL
const handleCloseModal = () => {
    error.value = false;
}



//GOOGLE MAP
const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ['places', 'marker', 'maps'],
});

//https://www.google.com/maps/dir/
const markers = ref([
    { lat: 41.9090, lng: 12.5000, title: 'Marker 1' },
    { lat: 41.9123, lng: 12.5032, title: 'Marker 2' },
    { lat: 41.9056, lng: 12.4987, title: 'Marker 3' }
]);
const currentUserLocation = ref({ lat: 41.9090, lng: 12.5000 });

let map: google.maps.Map;

const mapRef = ref<HTMLElement>();

// Inizializza la mappa di Google
async function initMap() {
    //MAPP
	const { Map } = await loader.importLibrary("maps");
	const { AdvancedMarkerElement } = await loader.importLibrary('marker');

	map = new Map(mapRef.value!, {
        center: currentUserLocation.value, // Latitudine e longitudine iniziali
        zoom: 8, // Livello di zoom iniziale
    });
	
    //MARKERS
    markers.value.forEach(markerInfo => {
        const marker = new AdvancedMarkerElement({
            position: { lat: markerInfo.lat, lng: markerInfo.lng }, // Coordinate del marker
            map: map, // Mappa a cui aggiungere il marker
            title: markerInfo.title // Titolo del marker
        });
    });
}
function updateLocationOnTheMap(){

}
// Esegui la funzione initMap dopo il montaggio del componente
onMounted(async () => {
	initMap();
});

/**  */
async function getUserLocation() {
	return new Promise<{lat: number, lng: number}>((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((geolocationPosition)=>{
				resolve({lat: geolocationPosition.coords.longitude, lng: geolocationPosition.coords.latitude});
			});
		}else{
			reject('Unable to find your location, please make sure to allow the use of location.')
		}
	});
}
async function useCurrentUserLocation(){
	const c = await getUserLocation();
	if(c) currentUserLocation.value = c;
}
//RICERCA
const searchQuery = ref('');

// Funzione per cercare la città e spostare il centro della mappa
function searchLocation() {

    // Verifica se è stata inserita una query di ricerca
    if (!searchQuery.value) return;

    // Esegui la richiesta di geocoding per ottenere le coordinate della città
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery.value }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
            // Ottieni le coordinate della città trovata
            const location = results[0].geometry.location;
            console.log('CITTA');
            console.log(location);

            // Sposta il centro della mappa alle coordinate della città
            // map.setCenter(location);

            // Aggiungi un marker per la città
            const cityMarker = new google.maps.Marker({
                position: location,
                map: map,
                title: searchQuery.value
            });
        } else {
            console.error('Città non trovata.');
        }
    });
}

</script>

<template>
    <div class="flex flex-col gap-4 lg:gap-6 lg:mb-96 mx-auto lg:max-w-[1280px]">
        <Modal :is-modal-open="error" @close-modal="error = false">
            <div class="flex flex-col gap-5 bg-white p-8 w-full sm:w-96 rounded-lg shadow-lg relative">

				<app-icon class="absolute top-10 right-10" @click="error = false" type="close" color="#000" size="sm"></app-icon>
				
				<div class="flex justify-center">
					<div class="rounded-full border-8 border-dark-700 p-4">
						<app-icon type="pin_map" color="#000" size="sm"></app-icon>
					</div>
				</div>
				<p>Before you create your roadmap, you have to select your points of interest</p>
				<v-btn @click="error = false" class="bg-black text-white">Accept</v-btn>
			</div>
		</Modal>

        <Modal :is-modal-open="modalStates.useMyLocationModalIsOpen" @close-modal="modalStates.useMyLocationModalIsOpen = false">
            <div class="flex flex-col gap-5 bg-white p-8 sm:w-96 max-w-[90vw] rounded-lg shadow-lg relative">
				<app-icon class="absolute top-10 right-10" @click="modalStates.useMyLocationModalIsOpen = false" type="close" color="#000" size="sm"></app-icon>
				
				<div class="flex justify-center">
					<div class="rounded-full border-8 border-dark-700 p-4">
						<app-icon type="geo-alt" color="#000"></app-icon>
					</div>
				</div>
				<p class="font-bold text-center">Do you want to use your current location?</p>
				<div class="flex flex-col md:flex-row gap-4">
					<v-btn @click="modalStates.useMyLocationModalIsOpen = false	" class="bg-[#F8F9FA] text-black md:flex-1">Cancel</v-btn>
					<v-btn @click="()=>{modalStates.useMyLocationModalIsOpen = false; useCurrentUserLocation()}" class="bg-black text-white md:flex-1">Accept</v-btn>
				</div>
			</div>
		</Modal>

        <div class="flex flex-col gap-8">
            <div class="mt-4 lg:mt-8 flex basis-full gap-2 justify-between md:justify-start md:[&>*]:flex-[0] [&>*]:flex-1 md:gap-8">
                <v-btn
					size="lg"
					v-for="searchCategory in locateSearchCategories"
					@click="activeLocateSearchCategory = searchCategory"
                    :class="{ 'bg-blue-700 shadow-[0px_0px_0px_4px_#3184FD80]': activeLocateSearchCategory.name === searchCategory.name, 'bg-blue': activeLocateSearchCategory.name !== searchCategory.name }"
                    class="text-white text-none font-normal md:py-3 md:px-4"
				>
					<span class="hidden md:inline">{{ searchCategory.name }}</span>
					<div class="md:hidden p-1 text-xs flex flex-col justify-center items-center">
						<app-icon :type="searchCategory.iconName" size="md"></app-icon>
						<span>{{ searchCategory.name }}</span>
					</div>
				</v-btn>
            </div>
        </div>

		<div class="hidden lg:block bg-blue-100 lg:p-5 text-center rounded">
            <span class="font-bold md:text-lg lg:text-2xl">{{ activeLocateSearchCategory.name }}</span>
        </div>

        <div class="flex flex-col gap-4 rounded p-4 pb-2 bg-[#212529]">
            <div class="hidden lg:flex-row lg:items-stretch lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] md:flex-wrap md:grid md:grid-cols-3 lg:[&>*]:w-auto md:[&>*]:w-full md:gap-3">
                <!-- <MySelect v-model="activeFilters.area" @change="" placeholder="Area" table-name="bidwatcher_brand" column-name="name" :items="filterValues.areas"></MySelect> -->
                <MySelect v-model="activeFilters.country" @change="newValue => filterValuesFunctions.fetchCities(newValue)" placeholder="Country" table-name="bidwatcher_brand" column-name="name" :items="filterValues.countries"></MySelect>
                <MySelect v-model="activeFilters.city" placeholder="City" table-name="bidwatcher_brand" column-name="name" :items="filterValues.cities"></MySelect>
                <MySelect v-model="activeFilters.car" placeholder="Cars" table-name="bidwatcher_brand" column-name="name" :items="filterValues.cars"></MySelect>
                <MySelect v-model="activeFilters.brand" placeholder="Brand" table-name="bidwatcher_brand" column-name="name" :items="filterValues.brands"></MySelect>
                <MySelect @change="newValue => activeFilters.aging = filterValues.agings.find(el=> el.name === newValue)!" placeholder="Aging" table-name="bidwatcher_brand" column-name="name" :items="filterValues.agings"></MySelect>
                <v-btn class="bg-blue-700 text-white !h-full lg:px-6">
                    Search
                </v-btn>
            </div>

			<v-btn block class="bg-white md:hidden">
				<app-icon class="text-[#0D6EFD]" type="search" size="md"></app-icon>
				<span class="text-[#0D6EFD]">Search</span>
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
							<app-icon v-if="subcategory.iconName" :type="subcategory.iconName" color="#000" size="xl"></app-icon>
							<img class="scale-[.8]" v-if="subcategory.imgUrl" :src="'src/assets/images/' + subcategory.imgUrl" />
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
            <div ref="mapRef" id="map" class="rounded" style="height: 400px;"></div>
            <!-- <MapboxMap
                access-token="pk.eyJ1IjoidmluY2Vuem8wNCIsImEiOiJjbHRvdW0zaGUwaWtyMmtvNjNpa2lzcHB0In0.-Ay3kQiknh2Hhwfey7DdBw"
                style="height: 400px" zoom="2" :center="mapCenter"
                mapbox-map="{ mapStyle: 'mapbox://styles/mapbox/streets-v11' }">
                <MapboxGeolocateControl />
                <MapboxMarker :coordinates="[41.9027835, 12.4963655]" :options="{ color: 'red' }" />
            </MapboxMap> -->
        </div>

        <div class="p-5 shadow-lg rounded-lg">
            <div class="flex flex-col gap-5 ">
                <div class="flex flex-row w-full lg:w-fit">
                    <input 
						class="w-full rounded-l-lg border border-gray-600 px-2 lg:min-w-[400px]"
						v-model="searchQuery" 
						@keyup.enter="searchLocation"
						id="searchRegion" 
						type="text"
                        placeholder="Insert center map address"
					>
                    <label class="bg-black rounded-r-lg px-3 py-1" for="searchRegion">
                        <app-icon type="search" color="#fff" size="lg"></app-icon>
                    </label>
                </div>
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
					<div @click="handleCreateRoadmap()" class="md:px-4 py-2 w-full md:w-fit md:ml-auto text-center rounded bg-black text-white">Create roadmap</div>
				</div>
            </div>

			<div v-if="!entitiesData.length" class="flex flex-row flex-wrap gap-2 md:justify-end mt-10">
				<div class="w-full lg:w-fit text-[#6C757D]">Here you can see information about the different entities</div>
				<div class="flex-1 hidden lg:block"></div>
				<div @click="handleCreateRoadmap()" class="md:px-4 py-2 w-full md:w-fit text-center rounded text-black bg-white border-black border-[1px]">Reset All</div>
				<div @click="handleCreateRoadmap()" class="md:px-4 py-2 w-full md:w-fit text-center rounded bg-black text-white">Create roadmap</div>
			</div>

            <div v-if="entitiesData.length" class="mt-10 border-t border-black">
                <p class="font-semibold py-2">
                    Select your points of interest to create your roadmap
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <v-card v-for="i of [0,0,0]" class="w-full flex px-2 py-4 gap-2">
                        <img class="h-12 lg:h-14 aspect-square rounded-full object-cover" src="../../assets//images/create_garage.png" alt="">
                        <div class="flex-1">
                            <!-- FIRST BLOCK -->
                            <div>
                                <div class="flex justify-between">
                                    <!-- TITLE -->
                                    <div class="flex-1 font-[500]">Museum Villa Ford of Orange</div>
                                    <!-- BTN -->
                                    <div class="flex gap-2">
                                        <div
                                            class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
                                            <app-icon type="phone" color="#000" size="md"></app-icon>
                                        </div>
                                        <label
                                            class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
                                            <input type="checkbox">
                                        </label>
                                    </div>
                                </div>
                                <!-- RATINGS -->
                                <div>
                                    <p class="flex items-center gap-2">
                                        4.7 <app-icon type="star" color="#FFC107" size="sm"></app-icon>
                                    </p>
                                </div>
                            </div>
                            <!-- SECON BLOCK -->
                            <div class="flex flex-col gap-2">
                                <!-- DISTANCE -->
                                <div>
                                    <ul class="flex items-center gap-2 list-inside list-disc">
                                        <li>Museum</li>
                                        <li>450m</li>
                                    </ul>
                                </div>
                                <!-- CLOCK -->
                                <div>
                                    <span class="text-green-700">
                                        Open
                                    </span>
                                    <span>
                                        15:00
                                    </span>
                                    <span>
                                        Closes at
                                    </span>
                                    <span>
                                        21:00
                                    </span>
                                </div>
                                <!-- LOCATION -->
                                <div class="flex gap-1 items-center">
                                    <app-icon type="marker" color="#ff0000" size="md"></app-icon>
                                    <p>
                                        2550 N Tustin St Orange, CA 92865
                                    </p>
                                </div>
                                <!-- SITE -->
                                <div>
                                    <a href="www.villaford.com">www.villaford.com</a>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </div>

            </div>
        </div>
    </div>
    <!-- <v-container class="space-y-10">

    </v-container> -->
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

