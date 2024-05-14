import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

export type LocateEntityData = {
	"address": string,
	"area_geo": string,
	"city": string,
	"city_latit": number,
	"city_longit": number,
	"country": string,
	"country_code": string,
	"days_activity": string,
	"descr_activity": string,
	"descr_history": string,
	"email": string,
	"logo": string,
	"logo_path": string,
	"logo_url": string,
	"main_contact": string,
	"main_photo": string,
	"main_photo_path": string,
	"main_photo_url": string,
	"name_complete": string,
	"name_short": string,
	"opening_descr": string,
	"phone": string,
	"phone_hand": string,
	"po_box": string,
	"postal_code": string,
	"president": string,
	"prov": string,
	"region_state": string,
	"segretary": string,
	"social_media": string,
	"temp_categoria": string,
	"time_close": string,
	"time_open": string,
	"website": string,
	"year_beginning": number,
	"year_end": number,
	"temp_tipo_j": string,
	"aging_period_j": string,
	"logo_test": string,
	"logo_test_main": string,
	"origin_col": string,
	"brand_name": string,
	"kind_name": string,
	"kind_image": string,
	"point_preferred": true,
	"point_entity_id": number,
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
	"road_id_key": number,
	"user_id": number,
	"user_name": string,
};

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedEntityData = LocateEntityData & {
	isSelected?: boolean,
}


export const useLocateEntityStore = defineStore('locateEntityStore', () => {
	const entitiesLoading = ref(false);

  const entities = ref<LocateExtendedEntityData[]>([]);
  async function fetchEntities(searchParams?: Partial<LocateEntityData>, kind_names?: string[], cleanEntitiesBeforeFetch = true, maxCount = 20) {
    entitiesLoading.value = true;
		if(cleanEntitiesBeforeFetch) entities.value = [];
    try {
      let searchQueryString = searchParams
        ? Object.keys(searchParams).filter(k=>!!((searchParams as any)[k]).replace(/\"/g,"")).map(
            k => k + ':' + (searchParams as any)[k]
          ).join(',')
        : '';

			if(kind_names?.length && kind_names.length !== 0){
				for (const kind_name of kind_names) {
					fetchEntities({...searchParams, 'kind_name': kind_name}, [], false, maxCount);
				}
			} else {
				entities.value = await fetchAllItems<LocateEntityData>(
					`/entity_entity/query_user?sort_by=name:asc${searchQueryString ? '&search=' + encodeURI(searchQueryString) : ''}`,
					undefined,
					maxCount
				);
			}
    } catch (error) {
    } finally {
      entitiesLoading.value = false;
    }
  }

	
  // onMounted(()=>{
  // 	fetchRoadmaps();
  // });

  return {
		entities,
		fetchEntities,
		entitiesLoading,
	};
});
