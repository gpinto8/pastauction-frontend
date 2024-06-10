import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems, fetchAllItemsV2 } from './utils/fetchAllItems';


const sampleLocateEntityData = {
	"id": 15796,
	"address": "string",
	"area_geo": "string",
	"city": "string",
	"city_latit": 0,
	"city_longit": 0,
	"country": "string",
	"country_code": "string",
	"days_activity": "string",
	"descr_activity": "string",
	"descr_history": "string",
	"email": "string",
	"logo": "string",
	"logo_path": "string",
	"logo_url": "string",
	"main_contact": "string",
	"main_photo": "string",
	"main_photo_path": "string",
	"main_photo_url": "string",
	"name_complete": "string",
	"name_short": "string",
	"opening_descr": "string",
	"phone": "string",
	"phone_hand": "string",
	"po_box": "string",
	"postal_code": "string",
	"president": "string",
	"prov": "string",
	"region_state": "string",
	"segretary": "string",
	"social_media": "string",
	"temp_categoria": "string",
	"time_close": "string",
	"time_open": "string",
	"website": "string",
	"year_beginning": 0,
	"year_end": 0,
	"temp_tipo_j": "string",
	"aging_period_j": "string",
	"aging_period": "string",
	"temp_tipo": "string",
	"logo_test": "string",
	"logo_test_main": "string",
	"origin_col": "string",
	"brand_name": "string",
	"kind_name": "string",
	"kind_image": "string",
	"point_preferred": true,
	"point_entity_id": 0,
	"point_road_id": 0,
	"point_id": 0,
	"road_id_user": 0,
	"road_date_creation": "2024-05-25",
	"road_date_tour_planned": "2024-05-25",
	"road_begin_address": "string",
	"road_begin_country": "string",
	"road_begin_city": "string",
	"road_name": "string",
	"road_image_path": "string",
	"road_id_key": 0,
	"user_id": 0,
	"user_name": "string"
};

export type LocateEntityData = typeof sampleLocateEntityData;

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedEntityData = LocateEntityData & {
	isSelected?: boolean,
}


export const useLocateEntityStore = defineStore('locateEntityStore', {
  state: () => ({
		entities: [] as LocateExtendedEntityData[] ,
		entitiesLoading: false,
	}),

	actions: {
  async fetchEntities(searchParams?: Partial<LocateEntityData>, kind_names?: string[], maxCount = 200) {
    this.entitiesLoading = true;
    try {
			const allItemes: LocateEntityData[] = [];

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

				const items = await fetchAllItems<LocateEntityData>(
					`/entity_entity/query_user?sort_by=name:asc${encodeURI(searchQueryString)}`,
					undefined,
					maxCount,
				);

				allItemes.push(...items);
			}

			this.entities = allItemes;

    } catch (error) {
    } finally {
			this.entitiesLoading = false;
    }
  }
	}
});
