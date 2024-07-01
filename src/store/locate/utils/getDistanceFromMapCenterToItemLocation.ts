import { routesLibrary } from "@/views/locate/googleMapsLoader";
import { useLocateStore, type ExtendedItem } from "../locate";
import { getCoordonatesForItem } from "../locateRoadmapStore";

function formatDistance(distance: number): string {
	// Helper function to format numbers with commas
	const formatNumber = (num: number): string => {
			return num.toLocaleString();
	};

	if (distance < 1000) {
			return `${formatNumber(distance)} m`;
	} else {
			const kilometers = distance / 1000;
			return `${formatNumber(kilometers)} km`;
	}
}

export async function getDistanceFromMapCenterToItemLocation(item: ExtendedItem, format: "string" | "number" = "string") {
	try {
		const directionsService : google.maps.DirectionsService = new (await routesLibrary).DirectionsService();
	
		const response = await directionsService.route({
			origin: useLocateStore().$state.currentUserLocationMarker!.position!,
			// destination: getCoordonatesForItem(item),
			destination: {lat: 40, lng: 40 },
			travelMode: google.maps.TravelMode.DRIVING,
		});
	
		if(!response.routes.length) return null;
		const distance = response.routes[0].legs.reduce((p, c) => p + (c.distance?.value || 0), 0);

		return format === "string" ? formatDistance(distance) : distance; 
	} catch (error) {
		return null;
	}
}