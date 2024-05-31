<script setup lang="ts">
import { useLocateStore, type Coordinates, type ExtendedItem } from "@/store/locate/locate";
import type { LocateExtendedEntityData } from "@/store/locate/locateEntityStore";
import type { LocateExtendedEventData } from "@/store/locate/locateEventStore";
import type { LocateExtendedServicesData } from "@/store/locate/locateServiceStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { mapsLibrary, markerLibrary, routesLibrary } from "../googleMapsLoader";
import ItemDetailDisplayerModal from '@/views/locate/modal/itemDetailDisplayerModal.vue';

const locateStore = useLocateStore();
const { getSelectedItems } = locateStore;
const { 
	activeLocateSearchCategory, 
	currentUserLocationMarker,
	currentUserLocationBounds,
	items,
	mapLocationSearchQuery,
	modalStates,
} = storeToRefs(locateStore);

const emits = defineEmits<{
	(event: 'change.google.maps.DirectionsResult', result: google.maps.DirectionsResult): void;
	(event: 'onMarkerClick', marker: google.maps.marker.AdvancedMarkerElement, markerItemRef: ExtendedItem): void;
}>();

let map: google.maps.Map;
const mapRef = ref<HTMLElement>();


const markers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);

// Esegui la funzione initMap dopo il montaggio del componente
onMounted(async () => {
	map = new (await mapsLibrary).Map(mapRef.value!, {
		center: { lat: 0, lng: 0 }, // Latitudine e longitudine iniziali
		zoom: 1, // Livello di zoom iniziale
		mapId: import.meta.env.VITE_GOOGLE_MAPS_LOCATE_MAP_ID,
	});
});

watch(
	() => currentUserLocationMarker.value,
	()=>{
		if(currentUserLocationMarker.value) currentUserLocationMarker.value.map = map;
		if(currentUserLocationBounds.value) map.fitBounds(currentUserLocationBounds.value);
	}
);

/** when the users selects/deselects an item, we draw an roadmap that passes throug all those selected/favorites items */
watch([
	() => items.value.map(i => i.isSelected),
	() => currentUserLocationMarker.value,
], () => {
	const waypoints: Coordinates[] = getSelectedItems().map(getCoordonatesForItem).filter(coordonatesValidator);
	const origin: Coordinates = currentUserLocationMarker.value?.position as Coordinates;
	// const destination: Coordinates = waypoints[0];

	// if there exists an origin(current user location) -> we need only 1 waypoint to be able to draw a roadmap, otherwise we need at least 2 waypoints
	if(origin ? waypoints.length : waypoints.length >= 2) drawRoadMap(waypoints, origin);
});

/** when the list of `items` changes we add for each item a marker on the map */
watch(() => items.value, async () => {
	const coorodnates = items.value.map(getCoordonatesForItem).filter(coordonatesValidator);

	const { AdvancedMarkerElement } =  await markerLibrary;
	const newMarkers = coorodnates.map(c => new AdvancedMarkerElement({
		position: c,
		title: `${c.title}` || "",
		map: map,
	}));

	newMarkers.forEach((m, i) => m.addListener("click", () => showItemDataInPopup(m, items.value[i])));
	// newMarkers.forEach((m, i) => m.onclick = () => showItemDataInPopup(m, items.value[i]));

	markers.value = newMarkers;

	fitMapToMarkers(markers.value);

}, { deep: true });

/** every time the markers list changes, clean the old markers in order to be synced */
watch(
	() => markers.value,
	(_, oldMarkers) => oldMarkers.forEach(m => m.map = null),
);

function getCoordonatesForItem(item: ExtendedItem): Coordinates {
	const coordinates: Coordinates = {
		lat: 43.65056, 
		lng: 11.835522,
	};

	switch (activeLocateSearchCategory.value.name) {
		case "Entity":
			coordinates.lat = (item as LocateExtendedEntityData).city_latit;
			coordinates.lng = (item as LocateExtendedEntityData).city_longit;
			coordinates.title = `${(item as LocateExtendedEntityData).name_short} - ${(item as LocateExtendedEntityData).country}, ${(item as LocateExtendedEntityData).city} - ${(item as LocateExtendedEntityData).address}`;
			break;
		case "Services":
			coordinates.lat = (item as LocateExtendedServicesData).entity_city_latit;
			coordinates.lng = (item as LocateExtendedServicesData).entity_city_longit;
			coordinates.title = (item as LocateExtendedServicesData).service_name;
			coordinates.title = `${(item as LocateExtendedServicesData).service_name} - ${(item as LocateExtendedServicesData).entity_country}, ${(item as LocateExtendedServicesData).entity_city}`;
			break;
		case "Events":
			coordinates.lat = (item as LocateExtendedEventData).entity_city_latit;
			coordinates.lng = (item as LocateExtendedEventData).entity_city_longit;
			coordinates.title = (item as LocateExtendedEventData).entity_name_short;
			coordinates.title = `${(item as LocateExtendedEventData).event_name} - ${(item as LocateExtendedEventData).entity_country}, ${(item as LocateExtendedEventData).entity_city} - ${(item as LocateExtendedEventData).entity_address || (item as LocateExtendedEventData).event_begin_address}`;
			break;
	};

	return coordinates;
}

function coordonatesValidator(coordonates: Coordinates): boolean {
    // Check if latitude and longitude are numbers
    if (typeof coordonates.lat !== 'number' || typeof coordonates.lng !== 'number') {
        return false;
    }

    // Check if latitude is within the valid range (-90 to 90)
    if (coordonates.lat < -90 || coordonates.lat > 90) {
        return false;
    }

    // Check if longitude is within the valid range (-180 to 180)
    if (coordonates.lng < -180 || coordonates.lng > 180) {
        return false;
    }

    // If both latitude and longitude pass the checks, return true
    return true;
}



async function drawRoadMap(waypoints: Coordinates[], origin?: Coordinates, destination?: Coordinates){
	try {
		
		const directionsService : google.maps.DirectionsService = new (await routesLibrary).DirectionsService();

		const response = await directionsService.route({
			origin: origin || waypoints[0],
			destination: destination || waypoints[waypoints.length - 1],
			waypoints: waypoints.map(w => ({ location: w })),
			travelMode: google.maps.TravelMode.DRIVING,
		});

		if(!response.routes.length) return;

		emits('change.google.maps.DirectionsResult', response);

		new (await routesLibrary).DirectionsRenderer({
			suppressMarkers: true,
			map: map,
			directions: response,
		}); 
	} catch (error) {
		window.alert("Directions request failed due to " + error);
	}
}

function fitMapToMarkers(markers: google.maps.marker.AdvancedMarkerElement[]) {
	if (markers.length === 0) return;

	const bounds = new google.maps.LatLngBounds();
	markers.forEach(marker => {
		if(marker.position) bounds!.extend(marker.position);
	});

	map.fitBounds(bounds);
}

const activeDisplayedMarkerItem = ref<ExtendedItem | null>(null);
function showItemDataInPopup(marker: google.maps.marker.AdvancedMarkerElement, markerItemRef: ExtendedItem){
	console.log("AAAAAAAAAAAAA");
	activeDisplayedMarkerItem.value = markerItemRef;
	modalStates.value.itemDetailDisplayerModal = true;

}

</script>

<template>
	<ItemDetailDisplayerModal v-if="activeDisplayedMarkerItem && modalStates.itemDetailDisplayerModal" :item="activeDisplayedMarkerItem" />
	<div ref="mapRef" class="rounded h-[248px] md:h-[356px] lg:h-[504px]"></div>
</template>