import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

export type RoadmapData = {
  date_creation: string;
  date_tour_planned: string;
  begin_country: string;
  begin_city: string;
  begin_address: string;
  name: string;
  image_url: string;
  image_path: string;
  id_key: number;
};

export type EventRoadmapData = {
	"date_creation": "2024-05-14",
	"date_tour_planned": "2024-05-14",
	"begin_country": "string",
	"begin_city": "string",
	"begin_address": "string",
	"event_name": "string",
	"id_event": 0,
	"id_user": 0,
	"image_url": "string",
	"image_path": "string",
	"id_key": 8
}
export const useLocateRoadmapStore = defineStore('locateRoadmapStore', {
  state: () => ({
    roadmaps: [] as RoadmapData[],
    roadmapsLoading: false,
		/** the current roadmap that is displayed in the roadmap detail page */
		detailRoadmap: null as RoadmapData | null, 
  }),
	actions: {
		async fetchRoadmaps(
      params?: Partial<RoadmapData>
    ): Promise<RoadmapData[]> {
      this.roadmapsLoading = true;
			try {
				const items = await fetchAllItems<RoadmapData>(
					`/entity_roadmap/query`,
					items => this.roadmaps.push(...items),
					50,
				);
	
				return (this.roadmaps = items);
			} catch (error) {
				return [];
			} finally{
				this.roadmapsLoading = false;
			}
    },

		async saveRoadmap(
      params: Partial<RoadmapData>
    ): Promise<RoadmapData> {
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
    }
	},
});

