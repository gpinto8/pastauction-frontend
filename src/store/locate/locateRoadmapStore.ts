import { httpDelete, httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';
import type { LocateEntityData, LocateExtendedEntityData } from './locateEntityStore';
import { useLocateStore } from './locate';
import { getCurrentDateFormatted } from './utils/getCurrentDateFormatted';
import type { LocateEventData, LocateExtendedEventData } from './locateEventStore';
import type { LocateExtendedServicesData } from './locateServiceStore';


const sampleEntityRoadmapData = {
	"date_creation": "2024-05-16",
	"date_tour_planned": "2024-05-16",
	"begin_country": "string",
	"begin_city": "string",
	"begin_address": "string",
	"name": "string",
	"image_url": "string",
	"image_path": "string",
	"id_key": 8,
	"roadmap_entity_kinds": "string"
};
export type EntityRoadmapData = typeof sampleEntityRoadmapData;

const sampleEventRoadmapData = {
	"date_creation": "2024-05-16",
	"date_tour_planned": "2024-05-16",
	"begin_country": "string",
	"begin_city": "string",
	"begin_address": "string",
	"event_name": "string",
	"id_event": 0,
	"id_user": 0,
	"image_url": "string",
	"image_path": "string",
	"id_key": 8,
	"roadmap_entity_kinds": "string"
};
export type EventRoadmapData = typeof sampleEventRoadmapData;

export type RoadmapData = EntityRoadmapData | EventRoadmapData;

const sampleCreateEntityRoadmapBody = {
  "date_creation": "2024-05-21",
  "date_tour_planned": "2024-05-21",
  "begin_country": "string",
  "begin_city": "string",
  "begin_address": "string",
  "name": "string",
  "image_url": "string",
  "image_path": "string"
};
export type CreateEntityRoadmapBody = typeof sampleCreateEntityRoadmapBody;

const sampleCreateEventRoadmapBody = {
  "date_creation": "2024-05-21",
  "date_tour_planned": "2024-05-21",
  "begin_country": "string",
  "begin_city": "string",
  "begin_address": "string",
  "event_name": "string",
  "id_event": 0,
  "id_user": 0,
  "image_url": "string",
  "image_path": "string"
};
export type CreateEventRoadmapBody = typeof sampleCreateEventRoadmapBody;

const objEntityRoadmapPoint = {
	"id_entity_entity": 3,
	"id_key_entity_roadmap": 8,
	"date": "2024-05-21",
	"preferred": true
};
export type EntityRoadmapPoint = typeof objEntityRoadmapPoint;

const objEntityEventRoadmapPoint = {
	"id_entity_event": 3,
	"id_key_event_roadmap": 8,
	"roadmap_date": "2024-05-25",
	"preferred": true
}
export type EntityEventRoadmapPoint = typeof objEntityEventRoadmapPoint;

const sampleVehicle = {"atvType":"Hybrid","battery":"-1","c240Dscr":"","c240bDscr":"","charge120":"0.0","charge240":"0.0","charge240b":"0.0","city08":"27","city08U":"26.5354","cityA08":"0","cityA08U":"0.0","cityCD":"0.0","cityE":"0.0","cityMpk":"0","cityUF":"0.0","cityUmpk":"0.0","co2":"295","co2A":"-1","co2City":"329","co2CityA":"-1","co2Highway":"253","co2HighwayA":"-1","co2RatingForGas":"6","comb08":"30","combA08":"0","combE":"0.0","combMpk":"0","combUmpk":"0.0","combinedCD":"0.0","displCylindersTrany":"2.0 L, 4 cyl, Automatic (S8), Turbo","drive":"Rear-Wheel Drive","eng_dscr":"SIDI & PFI; Mild Hybrid","evMotor":"44V Li-Ion","fuelType":"Premium","fuelType1Abbrev":"","fuelType1Long":"Premium Gasoline","fuelType1Short":"Prem","fuelType2Long":"","fuelType2Short":"","fuelTypeAsOne":"Premium Gas","ghgScore":"6","ghgScoreA":"-1","guzzler":"","highway08":"35","highway08U":"34.6716","highwayA08":"0","highwayA08U":"0.0","highwayCD":"0.0","highwayE":"0.0","highwayMpk":"0","highwayUF":"0.0","highwayUmpk":"0.0","hlv":"0","hpv":"0","id":"47767","lv2":"9","lv4":"0","make":"BMW","maxTankSize":"0.0","minTankSize":"15.6","model":"430i Convertible","msrpLabel":"","msrpMax":"0","msrpMin":"0","pv2":"84","pv4":"0","range":"0","rangeA":"","rangeCity":"0.0","rangeCityA":"0.0","rangeCs":"0.0","rangeDesc":"","rangeHwy":"0.0","rangeHwyA":"0.0","startStop":"Y","thumbnail":"2024_BMW_430i_Conv.jpg","trans_dscr":"","UCity":"34.5325","UCityA":"0.0","UHighway":"50.4657","UHighwayA":"0.0","usesGasoline":"true","VClass":"Subcompact Cars","year":"2025","sCharger":"","tCharger":"T"};

/**
* Represents vehicle data from 'https://www.fueleconomy.gov/feg/ws'.
*/
export type VehicleData = {
	/** Type of alternative fuel or advanced technology vehicle */
	atvtype: string;

	/** Annual petroleum consumption in barrels for fuelType1 (1) */
	barrels08: string;

	/** Annual petroleum consumption in barrels for fuelType2 (1) */
	barrelsA08: string;

	/** Time to charge an electric vehicle in hours at 120 V */
	charge120: string;

	/** Time to charge an electric vehicle in hours at 240 V */
	charge240: string;

	/** City MPG for fuelType1 (2), (11) */
	city08: string;

	/** Unrounded city MPG for fuelType1 (2), (3) */
	city08U: string;

	/** City MPG for fuelType2 (2) */
	cityA08: string;

	/** Unrounded city MPG for fuelType2 (2), (3) */
	cityA08U: string;

	/** City gasoline consumption (gallons/100 miles) in charge depleting mode (4) */
	cityCD: string;

	/** City electricity consumption in kw-hrs/100 miles */
	cityE: string;

	/** City miles per Kilogram for Hydrogen */
	cityMpk: string;

	/** Unrounded city miles per Kilogram for Hydrogen */
	cityUmpk: string;

	/** EPA city utility factor (share of electricity) for PHEV */
	cityUF: string;

	/** Tailpipe CO2 in grams/mile for fuelType1 (5) */
	co2: string;

	/** Tailpipe CO2 in grams/mile for fuelType2 (5) */
	co2A: string;

	/** Tailpipe CO2 in grams/mile for fuelType2 (5) */
	co2TailpipeAGpm: string;

	/** Tailpipe CO2 in grams/mile for fuelType1 (5) */
	co2TailpipeGpm: string;

	/** Combined MPG for fuelType1 (2), (11) */
	comb08: string;

	/** Unrounded combined MPG for fuelType1 (2), (3) */
	comb08U: string;

	/** Combined MPG for fuelType2 (2) */
	combA08: string;

	/** Unrounded combined MPG for fuelType2 (2), (3) */
	combA08U: string;

	/** Combined electricity consumption in kw-hrs/100 miles */
	combE: string;

	/** Combined miles per Kilogram for Hydrogen */
	combMpk: string;

	/** Unrounded combined miles per Kilogram for Hydrogen */
	combUmpk: string;

	/** Combined gasoline consumption (gallons/100 miles) in charge depleting mode (4) */
	combinedCD: string;

	/** EPA combined utility factor (share of electricity) for PHEV */
	combinedUF: string;

	/** Engine cylinders */
	cylinders: string;

	/** Engine displacement in liters */
	displ: string;

	/** Drive axle type */
	drive: string;

	/** Emissions list */
	emissionsList: string;

	/** EPA model type index */
	engId: string;

	/** Engine descriptor; see http://www.fueleconomy.gov/feg/findacarhelp.shtml#engine */
	eng_dscr: string;

	/** Electric motor (kw-hrs) */
	evMotor: string;

	/** EPA Fuel Economy Score (-1 = Not available) */
	feScore: string;

	/**
	 * Annual fuel cost for fuelType1 ($) (7)
	 * Annual fuel cost is based on 15,000 miles, 55% city driving, and the price of fuel used by the vehicle.
	*/
	fuelCost08: string;

	/**
	 * Annual fuel cost for fuelType2 ($) (7)
	 * Annual fuel cost is based on 15,000 miles, 55% city driving, and the price of fuel used by the vehicle.
	*/
	fuelCostA08: string;

	/** Fuel type with fuelType1 and fuelType2 (if applicable) */
	fuelType: string;

	/** Fuel type 1. For single fuel vehicles, this will be the only fuel. For dual fuel vehicles, this will be the conventional fuel. */
	fuelType1: string;

	/** Fuel type 2. For dual fuel vehicles, this will be the alternative fuel (e.g. E85, Electricity, CNG, LPG). For single fuel vehicles, this field is not used */
	fuelType2: string;

	/** EPA GHG score (-1 = Not available) */
	ghgScore: string;

	/** EPA GHG score for dual fuel vehicle running on the alternative fuel (-1 = Not available) */
	ghgScoreA: string;

	/** If G or T, this vehicle is subject to the gas guzzler tax */
	guzzler: string;

	/** Highway MPG for fuelType1 (2), (11) */
	highway08: string;

	/** Unrounded highway MPG for fuelType1 (2), (3) */
	highway08U: string;

	/** Highway MPG for fuelType2 (2) */
	highwayA08: string;

	/** Unrounded highway MPG for fuelType2 (2),(3) */
	highwayA08U: string;

	/** Highway gasoline consumption (gallons/100 miles) in charge depleting mode (4) */
	highwayCD: string;

	/** Highway electricity consumption in kw-hrs/100 miles */
	highwayE: string;

	/** Highway miles per Kilogram for Hydrogen */
	highwayMpk: string;

	/** Unrounded highway miles per Kilogram for Hydrogen */
	highwayUmpk: string;

	/** EPA highway utility factor (share of electricity) for PHEV */
	highwayUF: string;

	/** Hatchback luggage volume (cubic feet) (8) */
	hlv: string;

	/** Hatchback passenger volume (cubic feet) (8) */
	hpv: string;

	/** Vehicle record id */
	id: string;

	/** 2 door luggage volume (cubic feet) (8) */
	lv2: string;

	/** 4 door luggage volume (cubic feet) (8) */
	lv4: string;

	/** Manufacturer (division) */
	make: string;

	/** 3-character manufacturer code */
	mfrCode: string;

	/** Model name (carline) */
	model: string;

	/** Indicates if the vehicle has My MPG data; see yourMpgVehicle and yourMpgDriverVehicle */
	mpgData: string;

	/** If true, this vehicle operates on a blend of gasoline and electricity in charge depleting mode */
	phevBlended: string;

	/** 2-door passenger volume (cubic feet) (8) */
	pv2: string;

	/** 4-door passenger volume (cubic feet) (8) */
	pv4: string;

	/** EPA range for fuelType2 */
	rangeA: string;

	/** EPA city range for fuelType2 */
	rangeCityA: string;

	/** EPA highway range for fuelType2 */
	rangeHwyA: string;

	/** Transmission descriptor; see http://www.fueleconomy.gov/feg/findacarhelp.shtml#trany */
	trans_dscr: string;

	/** Transmission */
	trany: string;

	/** Unadjusted city MPG for fuelType1; see the description of the EPA test procedures */
	UCity: string;

	/** Unadjusted city MPG for fuelType2; see the description of the EPA test procedures */
	UCityA: string;

	/** Unadjusted highway MPG for fuelType1; see the description of the EPA test procedures */
	UHighway: string;

	/** Unadjusted highway MPG for fuelType2; see the description of the EPA test procedures */
	UHighwayA: string;

	/** EPA vehicle size class */
	VClass: string;

	/** Model year */
	year: string;

	/** You save/spend over 5 years compared to an average car ($). Savings are positive; a greater amount spent yields a negative number. For dual fuel vehicles, this is the cost savings for gasoline */
	youSaveSpend: string;

	/** If S, this vehicle is supercharged */
	sCharger: string;

	/** If T, this vehicle is turbocharged */
	tCharger: string;

	/** Electric vehicle charger description */
	c240Dscr: string;

	/** Time to charge an electric vehicle in hours at 240 V using the alternate charger */
	charge240b: string;

	/** Electric vehicle alternate charger description */
	c240bDscr: string;

	/** Date the vehicle record was created */
	createdOn: string;

	/** Date the vehicle record was last modified */
	modifiedOn: string;

	/** Indicates if the vehicle has stop-start technology (Y, N, or blank for older vehicles) */
	startStop: string;

	/** EPA composite gasoline-electricity city MPGe for plug-in hybrid vehicles */
	phevCity: string;

	/** EPA composite gasoline-electricity highway MPGe for plug-in hybrid vehicles */
	phevHwy: string;

	/** EPA composite gasoline-electricity combined city-highway MPGe for plug-in hybrid vehicles */
	phevComb: string;

	/** Base model name */
	basemodel: string;
} & typeof sampleVehicle;


export const useLocateRoadmapStore = defineStore('locateRoadmapStore', {
  state: () => ({
    entityRoadmaps: [] as EntityRoadmapData[],
    eventsRoadmaps: [] as EventRoadmapData[],
    roadmapsLoading: false,
		/** the current roadmap that is displayed in the roadmap detail page */
		detailRoadmap: null as RoadmapData | null, 
		detailRoadmapEntities: [] as LocateExtendedEntityData[],
		detailRoadmapServices: [] as LocateExtendedServicesData[],
		detailRoadmapEvents: [] as LocateExtendedEventData[],
		roadmapVehicleData: null as VehicleData | null,
  }),
	actions: {
		async fetchEntityRoadmaps(
      params?: Partial<EntityRoadmapData>
    ): Promise<EntityRoadmapData[]> {
      this.roadmapsLoading = true;
			try {
				const items = await fetchAllItems<EntityRoadmapData>(
					`/entity_roadmap/query`,
					items => this.entityRoadmaps.push(...items),
					50,
				);
	
				return (this.entityRoadmaps = items);
			} catch (error) {
				return [];
			} finally{
				this.roadmapsLoading = false;
			}
    },

		async fetchEventRoadmaps(
      params?: Partial<EventRoadmapData>
    ): Promise<EventRoadmapData[]> {
      this.roadmapsLoading = true;
			try {
				const items = await fetchAllItems<EventRoadmapData>(
					`/entity_event_roadmap/query`,
					items => this.eventsRoadmaps.push(...items),
					50,
				);
	
				return (this.eventsRoadmaps = items);
			} catch (error) {
				return [];
			} finally{
				this.roadmapsLoading = false;
			}
    },

		async saveEntityRoadmap(
      params: Partial<EntityRoadmapData>
    ): Promise<EntityRoadmapData> {
      const response = await httpPost(`/entity_roadmap/create`, {
        date_creation: params.date_creation,
        date_tour_planned: params.date_tour_planned,
        begin_country: params.begin_country,
        begin_city: params.begin_city,
        begin_address: params.begin_address,
        name: params.name,
        image_url: params.image_url,
        image_path: params.image_path,
      });

      return response.data;
    },

		async saveEventRoadmap(
      params: Partial<EntityRoadmapData>
    ): Promise<EntityRoadmapData> {
      const response = await httpPost(`/entity_roadmap/create`, {
        date_creation: params.date_creation,
        date_tour_planned: params.date_tour_planned,
        begin_country: params.begin_country,
        begin_city: params.begin_city,
        begin_address: params.begin_address,
        name: params.name,
        image_url: params.image_url,
        image_path: params.image_path,
      });

      return response.data;
    },

		async fetchEntityRoadmapEntities(
      params?: Partial<LocateEntityData>
    ): Promise<LocateEntityData[]> {
      this.roadmapsLoading = true;
			try {
				const items = await fetchAllItems<LocateEntityData>(
					`/entity_roadmap/query`,
					undefined,
					50,
				);
	
				return items;
			} catch (error) {
				return [];
			} finally{
				this.roadmapsLoading = false;
			}
    },

		async deleteRoadmap(roadmap: RoadmapData): Promise<number> {
			if(isEntityRoadmapData(roadmap)){
				return (await httpDelete(`/entity_roadmap/delete/${roadmap.id_key}`)).status;
			} else {
				return (await httpDelete(`/entity_event_roadmap/delete/${roadmap.id_key}`)).status;
			}
		},

		createRoadmap,

		async fetchEntitiesForRoadmap(roadmap: EntityRoadmapData){
			const items = await fetchAllItems<LocateEntityData>(
				`/entity_entity/query_user?sort_by=name:asc${encodeURI("")}`,
			);

			this.detailRoadmapEntities = items;
		},
		async fetchEventsForRoadmap(event: EventRoadmapData){
			const items = await fetchAllItems<LocateEventData>(
				`/entity_event?sort_by=name:asc${encodeURI("")}`,
			);

			this.detailRoadmapEvents = items;
		},
	},
});

// Overload declarations
function createRoadmap(roadmap: Partial<CreateEntityRoadmapBody>, points: Partial<EntityRoadmapPoint>[]): Promise<EntityRoadmapData>;
function createRoadmap(roadmap: Partial<CreateEventRoadmapBody>, points: Partial<EntityEventRoadmapPoint>[]): Promise<EventRoadmapData>;
async function createRoadmap(roadmap: Partial<CreateEntityRoadmapBody> | Partial<CreateEventRoadmapBody>, points: Partial<EntityRoadmapPoint>[] | Partial<EntityEventRoadmapPoint>[]): Promise<EntityRoadmapData | EventRoadmapData> {
	let createdRoadmap : EntityRoadmapData | EventRoadmapData;

	roadmap.date_creation = getCurrentDateFormatted();

	if(isEntityRoadmapData(roadmap)){
		const response = await httpPost(`/entity_roadmap/create`, roadmap);
		createdRoadmap = response.data;
	}else {
		const response = await httpPost(`/entity_event_roadmap/create`, roadmap);
		createdRoadmap = response.data;
	}

	if(points) for (const point of points) {
		if(isEntityRoadmapData(roadmap)){
			(point as EntityRoadmapPoint).id_key_entity_roadmap = createdRoadmap.id_key;
			(point as EntityRoadmapPoint).date = getCurrentDateFormatted();
		}else {
			(point as EntityEventRoadmapPoint).id_key_event_roadmap = createdRoadmap.id_key;
			(point as EntityEventRoadmapPoint).roadmap_date = getCurrentDateFormatted();
		}
		const response = await httpPost(isEntityRoadmapData(roadmap) ? "/entity_roadmap_points/create" : "/entity_event_roadmap_points/create", point);
	}

	return createdRoadmap;
}

export function isEntityRoadmapData(data: Partial<RoadmapData>): data is EntityRoadmapData {
	return useLocateStore().$state.activeLocateSearchCategory.name === "Entity";
}

export function isEventRoadmapData(data: Partial<RoadmapData>): data is EventRoadmapData {
	return useLocateStore().$state.activeLocateSearchCategory.name === "Events";
}
