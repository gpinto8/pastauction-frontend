import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

export type LocateEventData = {
	"event_id_key": number,
	"event_cod_entity_id": number,
	"event_disabled": true,
	"event_begin_address": string,
	"event_begin_city": string,
	"event_begin_country": string,
	"event_begin_date": string,
	"event_begin_lat": number,
	"event_begin_lon": number,
	"event_collect_best_in_garage": string,
	"event_collect_rank": string,
	"event_collect_score": number,
	"event_collect_trophy": string,
	"event_collect_year_update": number,
	"event_date_end": string,
	"event_description": string,
	"event_end_address": string,
	"event_end_city": string,
	"event_end_country": string,
	"event_end_lat": number,
	"event_end_lon": number,
	"event_logo": string,
	"event_logo_url": string,
	"event_main_photo": string,
	"event_name": string,
	"event_open_to": string,
	"event_event_type": string,
	"event_website": string,
	"entity_id": number,
	"user_entity_id": number,
	"user_id": number,
	"entity_address": string,
	"entity_aging_period": {},
	"entity_temp_tipo": {},
	"entity_area_geo": string,
	"entity_city": string,
	"entity_city_latit": number,
	"entity_city_longit": number,
	"entity_country": string,
	"entity_country_code": string,
	"entity_days_activity": string,
	"entity_descr_activity": string,
	"entity_descr_history": string,
	"entity_email": string,
	"entity_logo": string,
	"entity_logo_path": string,
	"entity_logo_url": string,
	"entity_main_photo": string,
	"entity_main_photo_path": string,
	"entity_main_photo_url": string,
	"entity_name_complete": string,
	"entity_name_short": string,
	"entity_opening_descr": string,
	"entity_phone": string,
	"entity_phone_hand": string,
	"entity_region_state": string,
	"entity_social_media": string,
	"entity_website": string,
	"entity_brand_name": string,
	"kind_name": string,
	"kind_image": string,
	"point_preferred": true,
	"point_event_id": number,
	"point_road_id": number,
	"point_id": number,
	"road_id_user": number,
	"road_date_creation": string,
	"road_date_tour_planned": string,
	"road_begin_address": string,
	"road_begin_country": string,
	"road_begin_city": string,
	"road_name": string,
	"road_image_path": string,
	"road_id_key": 0
}

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedEventData = LocateEventData & {
	isSelected?: boolean;
}

export const useLocateEventStore = defineStore('locateEventStore', () => {
  const events = ref<LocateExtendedEventData[]>([]);
	const eventsLoading = ref(false);

  async function fetchEvents(
    searchParams?: Partial<LocateEventData>,
    kind_names?: string[],
    cleanEventsBeforeFetch = true
  ) {
    eventsLoading.value = true;
    if (cleanEventsBeforeFetch) events.value = [];

    try {
      let searchQueryString = searchParams
        ? Object.keys(searchParams)
            .map(k => k + ':' + (searchParams as any)[k])
            .join(',')
        : '';

      if (kind_names?.length && kind_names.length !== 0) {
        for (const kind_name of kind_names) {
          fetchEvents({ ...searchParams, kind_name: kind_name }, [], false);
        }
      } else {
        events.value = await fetchAllItems<LocateEventData>(
          `/entity_entity/query_user?sort_by=name:asc${searchQueryString ? '&' + encodeURI(searchQueryString) : ''}`
        );
      }
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
