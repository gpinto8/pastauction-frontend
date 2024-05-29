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
