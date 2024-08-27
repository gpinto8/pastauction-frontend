import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

const sampleLocateEventData = {
	"id_key": 0,
	"begin_address": "string",
	"begin_city": "string",
	"begin_country": "string",
	"begin_date": "2024-06-22",
	"begin_lat": 0,
	"begin_lon": 0,
	"collect_best_in_garage": "string",
	"collect_rank": "string",
	"collect_score": 0,
	"collect_trophy": "string",
	"collect_year_update": 0,
	"cod_entity_id": 15796,
	"date_end": "2024-06-22",
	"description": "string",
	"end_address": "string",
	"end_city": "string",
	"end_country": "string",
	"end_lat": 0,
	"end_lon": 0,
	"logo_test": "string",
	"name": "string",
	"open_to": "string",
	"event_type": "string",
	"website": "string",
	"disabled": false,
	"entity_phone": "string"
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

  async function fetchEvents<T extends Partial<LocateEventData>>(
    searchParams?: T,
    kind_names?: string[],
		maxCount = 200,
  ) {
    eventsLoading.value = true;
		const allItemes: LocateEventData[] = [];

    try {
      for(const kind_name of (kind_names?.length ? kind_names : [""])){
				if(searchParams && kind_name) searchParams.event_type = kind_name;
				
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
