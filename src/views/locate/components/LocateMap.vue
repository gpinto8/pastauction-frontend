<script setup lang="ts">
import { useLocateStore, type Coordinates, type ExtendedItem } from "@/store/locate/locate";
import type { LocateExtendedEntityData } from "@/store/locate/locateEntityStore";
import type { LocateExtendedEventData } from "@/store/locate/locateEventStore";
import type { LocateExtendedServicesData } from "@/store/locate/locateServiceStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { mapsLibrary, markerLibrary, routesLibrary } from "../googleMapsLoader";

const locateStore = useLocateStore();
const { getSelectedItems } = locateStore;
const { 
	activeLocateSearchCategory, 
	currentUserLocationMarker,
	currentUserLocationBounds,
	items,
	mapLocationSearchQuery,
} = storeToRefs(locateStore);

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
	markers.value = coorodnates.map(c => new AdvancedMarkerElement({
		position: c,
		title: c.title || "",
		map: map,
	}));

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
			coordinates.title = (item as LocateExtendedEntityData).name_short;
			break;
		case "Services":
			coordinates.lat = (item as LocateExtendedServicesData).entity_city_latit;
			coordinates.lng = (item as LocateExtendedServicesData).entity_city_longit;
			coordinates.title = (item as LocateExtendedServicesData).entity_name_short;
			break;
		case "Events":
			coordinates.lat = (item as LocateExtendedEventData).entity_city_latit;
			coordinates.lng = (item as LocateExtendedEventData).entity_city_longit;
			coordinates.title = (item as LocateExtendedEventData).entity_name_short;
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

</script>

<template>
	<div ref="mapRef" class="rounded" style="height: 400px;"></div>
</template>