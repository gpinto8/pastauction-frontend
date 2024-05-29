import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore, storeToRefs } from 'pinia';
import { computed, onMounted, ref, type ComputedRef } from 'vue';
import { useLocateEntityStore, type LocateExtendedEntityData } from './locateEntityStore';
import { useLocateEventStore, type LocateExtendedEventData } from './locateEventStore';
import { useLocateServiceStore, type LocateExtendedServicesData } from './locateServiceStore';

export type Coordinates = google.maps.LatLngLiteral & { title?: string, bounds?: google.maps.LatLngBounds};

/** this type represents the search category that the user can search for in the locate page, for example entity, serives or events */
export type LocateSearchCategory =  {
	name: "Entity" | "Services" | "Events",
	iconName: string,
	subcategories: {
		name: string;
		key: string;
		imgUrl: string;
		isSelected?: boolean;
	}[],
};

export type ExtendedItem = LocateExtendedEntityData | LocateExtendedServicesData | LocateExtendedEventData;

export const useLocateStore = defineStore('locate', 
	{
		state: () => {
			const entityStore = useLocateEntityStore();
			const { fetchEntities } = entityStore;
			const { entities, entitiesLoading } = storeToRefs(entityStore);

			const serviceStore = useLocateServiceStore();
			const { fetchServices } = serviceStore;
			const { services , servicesLoading} = storeToRefs(serviceStore);

			const eventStore = useLocateEventStore();
			const { fetchEvents } = eventStore;
			const { events, eventsLoading } = storeToRefs(eventStore);

			const modalStates = ref({
				useMyLocationModalIsOpen: false,
				displayErrorsModalIsOpen: false,
				createMyRoadmap: false,
				roadmapSuccessfullySaved: false,
				upgradeMyPlan: false,
				cannotCreateRoadmapWarning: false,
				confirmRoadmapDeletionModal: false,
				calculateCostOfTheTripModal: true,
			});
		
			const currentUserLocationMarker =  ref<google.maps.marker.AdvancedMarkerElement | null>(null);
			const currentUserLocationBounds =  ref<google.maps.LatLngBounds>();
			
			const locateSearchCategories  = ref<LocateSearchCategory[]>([
				{name: 'Entity', iconName: "person", subcategories: [
					{key: "Museums", name: 'Museum', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/8.png'},
					{key: "Circuits", name: 'Circuit', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/1.png'},
					{key: "CarRaces", name: 'Race car', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/11.png'},
					{key: "Exhibitions", name: 'Exhibition', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/4.png'},
					{key: "Markets", name: 'Market', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/9.png'},
					{key: "Rally", name: 'Rally', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/12.png'},
					{key: "Tours", name: 'Tours', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/13.png'},
					{key: "Libraries", name: 'Library', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/6.png'},
					{key: "Factories", name: 'Factory', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/5.png'},
					{key: "Magazines", name: 'Magazine', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/7.png'},
					{key: "Owners_Club", name: 'Owner club', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/10.png'},
					{key: "Concours", name: 'Concurs', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/3.png'},
					{key: "PrivateCollections", name: 'Collection', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/2.png'},
				]}, 
				{name: 'Services', iconName: "calendar_pin", subcategories: [
					{key: "1", name: "Parts", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/1.png"},
					{key: "2", name: "Services", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/2.png"},
					{key: "3", name: "Body work", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/3.png"},
					{key: "4", name: "Interior", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/4.png"},
					{key: "5", name: "Electrical", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/5.png"},
					{key: "6", name: "Wheels", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/6.png"},
					{key: "7", name: "Resplay", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/7.png"},
					{key: "8", name: "Tuning", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/8.png"},
					{key: "9", name: "Cover", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/9.png"},
					{key: "10", name: "Tools", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/10.png"},
					{key: "11", name: "Literature", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/11.png"},
					{key: "12", name: "Garaging", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/12.png"},
					{key: "13", name: "Feight", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/13.png"},
					{key: "14", name: "Triler", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/14.png"},
					{key: "15", name: "Car box", imgUrl: "https://past-auction-p.s3.amazonaws.com/Foto_Spare_Service_png/15.png"},
				]},
				{name: 'Events', iconName: "service-levels", subcategories: [
					{key: "", name: 'Museum', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/8.png'},
					{key: "", name: 'Circuit', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/1.png'},
					{key: "", name: 'Race car', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/11.png'},
					{key: "", name: 'Exhibition', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/4.png'},
					{key: "", name: 'Market', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/9.png'},
					{key: "", name: 'Rally', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/12.png'},
					{key: "", name: 'Tours', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/13.png'},
					{key: "", name: 'Library', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/6.png'},
					{key: "", name: 'Factory', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/5.png'},
					{key: "", name: 'Magazine', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/7.png'},
					{key: "", name: 'Owner club', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/10.png'},
					{key: "", name: 'Concurs', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/3.png'},
					{key: "", name: 'Collection', imgUrl: 'https://past-auction-p.s3.amazonaws.com/Foto_Entity_Category_png/2.png'},
				]}, 
			]);
			const activeLocateSearchCategory = ref<LocateSearchCategory>(locateSearchCategories.value[0]);
		
			const filterValues = ref({
				areas: [] as string[],
				countries: [] as string[],
				cities: [] as string[],
				cars: [] as string[],
				brands: [] as string[],
				agings: [
					"Antique (1880-1904)",
					"Veteran (1905-1918)",
					"Vintage (1919-1930)",
					"Post Vintage (1931-1945)",
					"Classic (1946-1964)",
					"Post Classic (1965-1974)",
					"Modern (1975-1999)",
					"Conteporary (2000-2020)",
				],
			});
		
			const loadingStates = ref({
				areasLoading: false,
				countriesLoading: false,
				citiesLoading: false,
				carsLoading: false,
				brandsLoading: false,
				agingsLoading: false,
				entitiesLoading: false,
			});
		
			async function fetchAllItems<T>(
				url: string,
				cb?: (data: T[]) => void,
				maxItemCount = 100
			): Promise<T[]> {
				function addToUrl(url: string, params: string): string {
					return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
				}
				const firstQueryUrl = addToUrl(url, 'size=1');
				const firstQueryResponse = await httpGet(firstQueryUrl);
				const totalItems = firstQueryResponse.data.total;
				const pageSize = 100;
				const numberOfPages = Math.ceil(totalItems / pageSize);
				const items: T[] = [];
				for (let page = 1; page <= numberOfPages; page++) {
					const queryUrl = addToUrl(url, `page=${page}&size=${pageSize}`);
					const response = await httpGet(queryUrl);
		
					items.push(...response.data.items);
					cb && cb(response.data.items);
					if (items.length >= maxItemCount) break;
				}
				return items;
			}
		
			async function fetchBrands(): Promise<string[]> {
				try {
					loadingStates.value.brandsLoading = true;
					filterValues.value.brands = [];
					return (
						await fetchAllItems<{ brand_name: string }>(
							`filter/entity_entity_query/brand_name/?sort_by=name:asc`,
							items => filterValues.value.brands.push(...items.map(e => e.brand_name))
						)
					).map(e => e.brand_name);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.brandsLoading = true;
				}
			}
		
			async function fetchAreas(): Promise<string[]> {
				try {
					loadingStates.value.areasLoading = true;
					filterValues.value.areas = [];
					return (
						await fetchAllItems<{ area_geo: string }>(
							`filter/entity_entity_query/area_geo/?sort_by=name:asc`,
							items => filterValues.value.areas.push(...items.map(e => e.area_geo))
						)
					).map(e => e.area_geo);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.areasLoading = false;
				}
			}
		
			async function fetchCountries(area?: string): Promise<string[]> {
				try {
					loadingStates.value.countriesLoading = true;
					filterValues.value.countries = [];
					return (
						await fetchAllItems<{ country: string }>(
							`filter/entity_entity_query/country/?sort_by=name:asc${area ? '&' + encodeURI('search=area_geo:' + area) : ''}`,
							items =>
								filterValues.value.countries.push(...items.map(e => e.country))
						)
					).map(e => e.country);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.countriesLoading = false;
				}
			}
		
			async function fetchCars(): Promise<string[]> {
				try {
					loadingStates.value.carsLoading = true;
					filterValues.value.cars = [];
		
					const carsSample = [
						{
							"temp_tipo_j": {
								"temp_tipo": "Military"
							}
						},
						{
							"temp_tipo_j": {}
						},
						{
							"temp_tipo_j": {
								"Vehicles": [
									"Cars",
									"Motorcycles",
									"Tractors",
									"Boats",
									"Planes",
									"Military"
								]
							}
						}
					];

					return (
						await fetchAllItems<(typeof carsSample)[number]>(
							`filter/entity_entity_query/temp_tipo_j/?sort_by=name:asc`,
							items => filterValues.value.cars.push(...items.map(e => e.temp_tipo_j.Vehicles || e.temp_tipo_j.temp_tipo || "").flat().filter(e => !!e))
						)
					).map(e => e.temp_tipo_j.Vehicles || e.temp_tipo_j.temp_tipo || "").flat().filter(e => !!e);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.carsLoading = false;
				}
			}
		
			async function fetchCities(country?: string): Promise<string[]> {
				try {
					loadingStates.value.citiesLoading = true;
					filterValues.value.cities = [];
					return (
						await fetchAllItems<{ city: string }>(
							`filter/entity_entity_query/city/?sort_by=name:asc${country ? '&' + encodeURI('search=country:' + country) : ''}`,
							items => filterValues.value.cities.push(...items.map(e => e.city))
						)
					).map(e => e.city);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.citiesLoading = false;
				}
			}
		
			async function fetchAgings(): Promise<string[]> {
				try {
					loadingStates.value.agingsLoading = true;
					filterValues.value.cities = [];
					return (
						await fetchAllItems<{ aging_period_j: string }>(
							`filter/entity_entity_query/aging_period_j/?sort_by=name:asc`,
							items => filterValues.value.areas.push(...items.map(e => e.aging_period_j))
						)
					).map(e => e.aging_period_j);
				} catch (e) {
					return [];
				} finally {
					loadingStates.value.agingsLoading = false;
				}
			}
		
			const items: ComputedRef<ExtendedItem[]> = computed(()=>{
				switch (activeLocateSearchCategory.value.name) {
					case "Entity":
						return entities.value;
					case "Services":
						return services.value;
					case "Events":
						return events.value;
					default:
						return [];
				}
			});
		
			function getSelectedItems(){
				return items.value.filter(i => i.isSelected);
			}
		
			const mapLocationSearchQuery = ref("");
		
			onMounted(()=>{
				fetchBrands();
				fetchAreas();
				fetchCountries();
				fetchCars();
				fetchCities();
				// fetchAgings();
				// fetchEntities();

				// localStorage.getItem('locate:currentUserLocation');
			});
			const itemsLoading = computed(() => {
				// const entityStore = useLocateEntityStore();
				// const serviceStore = useLocateServiceStore();
				// const eventStore = useLocateEventStore();
	
				console.log("entityStore.entitiesLoading", entityStore.entitiesLoading);
				switch (activeLocateSearchCategory.value.name) {
					case "Entity":
						return entityStore.entitiesLoading;
					case "Services":
						return serviceStore.servicesLoading;
					case "Events":
						return eventStore.eventsLoading;
					default:
						return false;
				}
			});

			return {
				filterValues,
				filterValuesFunctions: {
					fetchBrands,
					fetchAreas,
					fetchCountries,
					fetchCars,
					fetchCities,
				},
				loadingStates,
				modalStates,
				currentUserLocationMarker,
				currentUserLocationBounds,
				locateSearchCategories,
				activeLocateSearchCategory,
				items,
				getSelectedItems,
				mapLocationSearchQuery,
				/** this state is just used to mock an event, the idea was to subscribe to this event using watch() and nothing else, this is not a thing */
				event_searchLocation: 0,
				itemsLoading,
				loadingScreen: ref(false),
			};
		},
		/** getters are like comoputed states */
		// getters: {
		// 	/** this state indicates if the current displayed items are loading/fething (based on the search category: entity/services/events) */
		// 	itemsLoading : (state) => {
		// 		const entityStore = useLocateEntityStore();
		// 		const serviceStore = useLocateServiceStore();
		// 		const eventStore = useLocateEventStore();
	
		// 		console.log("entityStore.entitiesLoading", entityStore.entitiesLoading);
		// 		switch (state.activeLocateSearchCategory.name) {
		// 			case "Entity":
		// 				return entityStore.entitiesLoading;
		// 			case "Services":
		// 				return serviceStore.servicesLoading;
		// 			case "Events":
		// 				return eventStore.eventsLoading;
		// 			default:
		// 				return false;
		// 		}
		// 	},
		// },
		actions: {
			emitEvent_searchLocation() {
				this.event_searchLocation++;
			},
		},
	}
);
