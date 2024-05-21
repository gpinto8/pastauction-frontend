import { httpDelete, httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';
import type { LocateEntityData } from './locateEntityStore';
import { useLocateStore } from './locate';


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

// Overload declarations
function createRoadmap(roadmap: EntityRoadmapData): Promise<EntityRoadmapData>;
function createRoadmap(roadmap: EventRoadmapData): Promise<EventRoadmapData>;

// Implementation
async function createRoadmap(roadmap: EntityRoadmapData | EventRoadmapData): Promise<EntityRoadmapData | EventRoadmapData> {
	// The implementation can be customized as needed
	return roadmap;
}

export const useLocateRoadmapStore = defineStore('locateRoadmapStore', {
  state: () => ({
    entityRoadmaps: [] as EntityRoadmapData[],
    eventsRoadmaps: [] as EventRoadmapData[],
    roadmapsLoading: false,
		/** the current roadmap that is displayed in the roadmap detail page */
		detailRoadmap: null as EntityRoadmapData | EventRoadmapData | null, 
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

		async deleteRoadmap(roadmap: RoadmapData) {
			if(isEntityRoadmapData(roadmap)){
				const resp = await httpDelete(`/entity_roadmap/delete/${roadmap.id_key}`);
			}

			if(isEventRoadmapData(roadmap)){
				const resp = await httpDelete(`/entity_event_roadmap/delete/${roadmap.id_key}`);
			}
		},

		createRoadmap,
	},
});

export function isEntityRoadmapData(data: RoadmapData): data is EntityRoadmapData {
	return useLocateStore().$state.activeLocateSearchCategory.name === "Entity";
}

export function isEventRoadmapData(data: RoadmapData): data is EventRoadmapData {
	return useLocateStore().$state.activeLocateSearchCategory.name === "Events";
}
