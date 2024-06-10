import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

const sampleLocateEventData = {
	"event_id_key": 0,
	"event_cod_entity_id": 0,
	"event_disabled": true,
	"event_begin_address": "string",
	"event_begin_city": "string",
	"event_begin_country": "string",
	"event_begin_date": "2024-06-01",
	"event_begin_lat": 0,
	"event_begin_lon": 0,
	"event_collect_best_in_garage": "string",
	"event_collect_rank": "string",
	"event_collect_score": 0,
	"event_collect_trophy": "string",
	"event_collect_year_update": 0,
	"event_date_end": "2024-06-01",
	"event_description": "string",
	"event_end_address": "string",
	"event_end_city": "string",
	"event_end_country": "string",
	"event_end_lat": 0,
	"event_end_lon": 0,
	"event_logo": "string",
	"event_logo_url": "string",
	"event_main_photo": "string",
	"event_name": "string",
	"event_open_to": "string",
	"event_event_type": "string",
	"event_website": "string",
	"entity_id": 0,
	"user_entity_id": 0,
	"user_id": 0,
	"entity_address": "string",
	"entity_aging_period": {},
	"entity_temp_tipo": {},
	"entity_area_geo": "string",
	"entity_city": "string",
	"entity_city_latit": 0,
	"entity_city_longit": 0,
	"entity_country": "string",
	"entity_country_code": "string",
	"entity_days_activity": "string",
	"entity_descr_activity": "string",
	"entity_descr_history": "string",
	"entity_email": "string",
	"entity_logo": "string",
	"entity_logo_path": "string",
	"entity_logo_url": "string",
	"entity_main_photo": "string",
	"entity_main_photo_path": "string",
	"entity_main_photo_url": "string",
	"entity_name_complete": "string",
	"entity_name_short": "string",
	"entity_opening_descr": "string",
	"entity_phone": "string",
	"entity_phone_hand": "string",
	"entity_region_state": "string",
	"entity_social_media": "string",
	"entity_website": "string",
	"entity_brand_name": "string",
	"kind_name": "string",
	"kind_image": "string",
	"point_preferred": true,
	"point_event_id": 0,
	"point_road_id": 0,
	"point_id": 0,
	"road_id_user": 0,
	"road_date_creation": "2024-06-01",
	"road_date_tour_planned": "2024-06-01",
	"road_begin_address": "string",
	"road_begin_country": "string",
	"road_begin_city": "string",
	"road_name": "string",
	"road_image_path": "string",
	"road_id_key": 0
}

export type LocateEventData = typeof sampleLocateEventData & {
	entity_aging_period_j?: string,
	entity_temp_tipo_j?: string
};

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedEventData = LocateEventData & {
	isSelected?: boolean;
	isOpenDetails?: boolean;
	isOpenDescription?: boolean;
}

export const useLocateEventStore = defineStore('locateEventStore', () => {
  const events = ref<LocateExtendedEventData[]>([]);
	const eventsLoading = ref(false);

  async function fetchEvents(
    searchParams?: Partial<LocateEventData>,
    kind_names?: string[],
		maxCount = 200,
  ) {
    eventsLoading.value = true;
		const allItemes: LocateEventData[] = [];

    try {
      for(const kind_name of (kind_names?.length ? kind_names : [""])){
				if(searchParams && kind_name) searchParams.kind_name = kind_name;
				
				let searchQueryString = "&search=";
				if(searchParams) {
					for (const key in searchParams) {
						const value = searchParams[key as keyof typeof searchParams];
						if(value?.toString().replace(/\"/g,"")) searchQueryString += `${key}:${value},`;
					}
					searchQueryString = searchQueryString.substring(0, searchQueryString.length - 1);
				}

				const items = await fetchAllItems<LocateEventData>(
					`/entity_event?sort_by=name:asc${encodeURI(searchQueryString)}`,
					undefined,
					maxCount,
				);

				allItemes.push(...items);
			}

			events.value = allItemes;
    } catch (error) {
    } finally {
      eventsLoading.value = false;
    }
  }


	
  // onMounted(()=>{
  // 	fetchRoadmaps();
  // });

  return {
		events,
		fetchEvents,
		eventsLoading,
	};
});
