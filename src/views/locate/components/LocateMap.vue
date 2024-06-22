<script setup lang="ts">
import { useLocateStore, type Coordinates, type ExtendedItem } from "@/store/locate/locate";
import type { LocateExtendedEntityData } from "@/store/locate/locateEntityStore";
import type { LocateExtendedEventData } from "@/store/locate/locateEventStore";
import type { LocateExtendedServicesData } from "@/store/locate/locateServiceStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { mapsLibrary, markerLibrary, routesLibrary } from "../googleMapsLoader";
import ItemDetailDisplayerModal from '@/views/locate/modal/itemDetailDisplayerModal.vue';
import { getCoordonatesForItem } from "@/store/locate/locateRoadmapStore";

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

const props = defineProps<{
	items: ExtendedItem[],
	circleRadiusMeters?: number;
}>();

let map: google.maps.Map;
const mapRef = ref<HTMLElement>();


const markers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);
let currentDirectionsRenderer: google.maps.DirectionsRenderer;
let currentCircle: google.maps.Circle;

// Esegui la funzione initMap dopo il montaggio del componente
onMounted(async () => {
	map = new (await mapsLibrary).Map(mapRef.value!, {
		zoom: 1, // Livello di zoom iniziale
		mapId: import.meta.env.VITE_GOOGLE_MAPS_LOCATE_MAP_ID,
	});
	if(currentUserLocationMarker.value) {
			currentUserLocationMarker.value.map = map
	};
});


// this watch consumes the currentUserLocationMarker state to attach it on this map
watch(
	[() => currentUserLocationMarker.value, () => props.circleRadiusMeters],
	async ()=>{
		if(currentUserLocationMarker.value) {
			currentUserLocationMarker.value.map = map

			if(currentUserLocationBounds.value) {
				map.fitBounds(currentUserLocationBounds.value);
			} else {
				const bounds = new google.maps.LatLngBounds(currentUserLocationMarker.value.position);
				map.fitBounds(currentUserLocationBounds.value = bounds);
				map.moveCamera({zoom: 5});
			};

			if(currentCircle) currentCircle.setMap(null);
			if(props.circleRadiusMeters){
				currentCircle = new (await mapsLibrary).Circle({
					strokeColor: "#04ff00",
					strokeOpacity: 0.2,
					strokeWeight: 2,
					fillColor: "#04ff00",
					fillOpacity: 0.1,
					map: map,
					center: currentUserLocationMarker.value.position,
					radius: props.circleRadiusMeters,
					zIndex: -1,
				});
			}
		};
	},
);

/** when the users selects/deselects an item, we draw an roadmap that passes throug all those selected/favorites items */
watch(
	[
		() => props.items.map(i => i.isSelected),
		() => currentUserLocationMarker.value,
	],
	() => {
		const waypoints: Coordinates[] = props.items.filter(i => i.isSelected).map(getCoordonatesForItem).filter(coordonatesValidator);
		const origin: Coordinates = currentUserLocationMarker.value?.position as Coordinates;
		// const destination: Coordinates = waypoints[0];

		// delete the previos route on the map if exists
		if(currentDirectionsRenderer) currentDirectionsRenderer.setMap(null);

		// if there exists an origin(current user location) -> we need only 1 waypoint to be able to draw a roadmap, otherwise we need at least 2 waypoints
		if(origin ? waypoints.length : waypoints.length >= 2) drawRoadMap(waypoints, origin);
	},
	{ immediate: true , deep: true },
);

/** when the list of `items` changes we add for each item a marker on the map */
watch(() => props.items, async () => {
	const coorodnates = props.items.map(getCoordonatesForItem).filter(coordonatesValidator);

	const { AdvancedMarkerElement } =  await markerLibrary;
	const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
	
	for (let i = 0; i < coorodnates.length; i++) {
		const c = coorodnates[i];
		newMarkers.push(new AdvancedMarkerElement({
			position: c,
			title: `${c.title}` || "",
			map: map,
			content: new (await markerLibrary).PinElement({
				'background': props.items[i].isSelected ? '#5c6cfa' : "",
				'borderColor': 'white',
				'glyphColor': 'white' ,
				'scale': props.items[i].isSelected ? 1.2: 1,
				
			}).element,
			zIndex: props.items[i].isSelected ? 2: 1,
		}))
	}

	newMarkers.forEach((m, i) => {
		m.addListener("click", () => showItemDataInPopup(m, props.items[i]))

		m.addListener('mouseover', function() {
			m.style.opacity = "0.8";
		});

		m.addListener('mouseout', function() {
			m.style.opacity = "1";
		});
	});

	markers.value = newMarkers;

	fitMapToMarkers(currentUserLocationMarker.value ? markers.value.concat(currentUserLocationMarker.value) : markers.value);

}, { deep: true });

/** every time the markers list changes, clean the old markers in order to be synced */
watch(
	() => markers.value,
	(_, oldMarkers) => oldMarkers.forEach(m => m.map = null),
);

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
			waypoints: waypoints.map(w => ({ location: w , stopover: true})),
			travelMode: google.maps.TravelMode.DRIVING,
			optimizeWaypoints: true,
		});

		if(!response.routes.length) return;

		emits('change.google.maps.DirectionsResult', response);

		currentDirectionsRenderer = new (await routesLibrary).DirectionsRenderer({
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
	activeDisplayedMarkerItem.value = markerItemRef;
	modalStates.value.itemDetailDisplayerModal = true;

}

</script>

<template>
	<ItemDetailDisplayerModal v-if="activeDisplayedMarkerItem && modalStates.itemDetailDisplayerModal" :item="activeDisplayedMarkerItem" />
	<div ref="mapRef" class="rounded h-[248px] md:h-[356px] lg:h-[504px]"></div>
</template>