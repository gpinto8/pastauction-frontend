<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import Modal from '@/components/modal/Modal.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MySelect from './components/Select.vue';



//BTN
const activeButton = ref('Entity');
const handleButtonClick = (index: any) => {
    activeButton.value = index;
};

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

//https://www.google.com/maps/dir/
const markers = [
    { lat: 41.9090, lng: 12.5000, title: 'Marker 1' },
    { lat: 41.9123, lng: 12.5032, title: 'Marker 2' },
    { lat: 41.9056, lng: 12.4987, title: 'Marker 3' }
];
// Inizializza la mappa di Google
function initMap() {

    //MAPP
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.9090, lng: 12.5000 }, // Latitudine e longitudine iniziali
        zoom: 8, // Livello di zoom iniziale
    });

    //MARKERS
    markers.forEach(markerInfo => {
        const marker = new google.maps.Marker({
            position: { lat: markerInfo.lat, lng: markerInfo.lng }, // Coordinate del marker
            map: map, // Mappa a cui aggiungere il marker
            title: markerInfo.title // Titolo del marker
        });
    });
}

// Esegui la funzione initMap dopo il montaggio del componente
onMounted(async () => {

    // fetchData();
    // Controlla se il modulo Google Maps JavaScript API è stato caricato correttamente
    if (typeof google !== 'undefined') {
        // Inizializza la mappa
        initMap();
    } else {
        console.error('Google Maps JavaScript API non è stato caricato correttamente.');
    }
});


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
    <div class="flex flex-col gap-8 mb-96">
        <Modal :isModalOpen="error" @close-modal="handleCloseModal"></Modal>
        <div class="flex flex-col gap-8">
            <div class="mt-8 flex gap-10">
                <v-btn @click="handleButtonClick('Entity')"
                    :class="{ 'bg-blue-700': activeButton === 'Entity', 'bg-blue': activeButton !== 'Entity' }"
                    class="text-white text-none font-normal">Entity</v-btn>
                <v-btn @click="handleButtonClick('Services')"
                    :class="{ 'bg-blue-700': activeButton === 'Services', 'bg-blue': activeButton !== 'Services' }"
                    class="text-white text-none font-normal">Services</v-btn>
                <v-btn @click="handleButtonClick('Events')"
                    :class="{ 'bg-blue-700': activeButton === 'Events', 'bg-blue': activeButton !== 'Events' }"
                    class="text-white text-none font-normal">Events</v-btn>
            </div>
            <div class="bg-blue-100 p-5 text-center">
                <span class="font-bold text-2xl">{{ activeButton }}</span>
            </div>
        </div>

        <div class="flex flex-col gap-3 rounded p-2 my_search_bar">
            <div class="flex items-stretch gap-5">
                <MySelect table-name="bidwatcher_brand" column-name="name"></MySelect>
                <MySelect table-name="bidwatcher_brand" column-name="name"></MySelect>
                <MySelect table-name="bidwatcher_brand" column-name="name"></MySelect>
                <MySelect table-name="bidwatcher_brand" column-name="name"></MySelect>
                <MySelect table-name="bidwatcher_brand" column-name="name"></MySelect>
                <v-btn class="bg-blue-700 text-white">
                    Search
                </v-btn>
            </div>
            <div class="flex items-stretch gap-6">

                <div class="flex flex-col gap-1">
                    <div
                        class="flex items-center justify-center bg-white border-4 border-blue-500 rounded my_tag_icon_box">
                        <app-icon type="temple" color="#000" size="xl"></app-icon>
                    </div>
                    <div class="text-white text-center">
                        Museum
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div id="map" style="height: 400px;"></div>
            <!-- <MapboxMap
                access-token="pk.eyJ1IjoidmluY2Vuem8wNCIsImEiOiJjbHRvdW0zaGUwaWtyMmtvNjNpa2lzcHB0In0.-Ay3kQiknh2Hhwfey7DdBw"
                style="height: 400px" zoom="2" :center="mapCenter"
                mapbox-map="{ mapStyle: 'mapbox://styles/mapbox/streets-v11' }">
                <MapboxGeolocateControl />
                <MapboxMarker :coordinates="[41.9027835, 12.4963655]" :options="{ color: 'red' }" />
            </MapboxMap> -->
        </div>

        <div class="p-5 pb-0 shadow-lg rounded-lg">
            <div class="flex flex-col gap-5">
                <div class="flex">
                    <input v-model="searchQuery" @keyup.enter="searchLocation"
                        class="rounded-l-lg border border-gray-600 px-2" id="searchRegion" type="text"
                        placeholder="Insert center map address">
                    <label class="bg-black rounded-r-lg px-3 py-1" for="searchRegion">
                        <app-icon type="search" color="#fff" size="lg"></app-icon>
                    </label>
                </div>
                <div class="flex justify-between">
                    <div class="flex gap-5">
                        <div class="select-container">
                            <select class="custom-select" name="schedule" id="">
                                <option value="">Schedule</option>
                                <option value="any_time">Any Time</option>
                                <option value="open_now">Open now</option>
                                <option value="open_24hs">Open 24hs</option>
                            </select>
                            <app-icon class="custom-icon" type="small_arr_down" color="#000" size="sm"></app-icon>
                        </div>
                        <div class="select-container">
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

                    <div>
                        <v-btn @click="handleCreateRoadmap()" class="bg-black text-white">Create roadmap</v-btn>
                    </div>
                </div>
            </div>
            <div class="mt-10 border-t border-black">
                <p class="font-semibold py-2">
                    Select your points of interest to create your roadmap
                </p>

                <div class="sm:columns-1 md:columns-2 lg:columns-3">
                    <v-card class="w-full flex p-5">
                        <div class="w-1/4">
                            <div class="h-20 w-20 rounded-full">
                                <img class="h-20 w-20 rounded-full object-cover"
                                    src="../../assets//images/create_garage.png" alt="">
                            </div>
                        </div>
                        <div class="w-3/4">
                            <!-- FIRST BLOCK -->
                            <div>
                                <div class="flex justify-between">
                                    <!-- TITLE -->
                                    <div class="w-1/2">
                                        <p>
                                            Museum Villa Ford of Orange
                                        </p>
                                    </div>
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
                            <div class="flex flex-col gap-1">
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
                                <div class="flex items-center">
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

/*SEARCHBAR COLOR*/
.my_search_bar {
    background-color: #212529
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
