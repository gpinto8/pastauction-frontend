import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

const sampleLocateServicesData = {
	"service_id_key": 0,
	"service_cod_service": 0,
	"service_name": "string",
	"service_url_image": "string",
	"brand_id_key": 0,
	"brand_gt_service_mngd": "string",
	"brand_name": "string",
	"brand_logo": "string",
	"brand_brand_type": "string",
	"brand_mng_id_key": 0,
	"brand_mng_entity_id": 0,
	"brand_mng_brand_id": 0,
	"brand_mng_cod_family": 0,
	"brand_mng_describe": "string",
	"brand_mng_vehicle_period": "string",
	"brand_mng_vehicle_category": "string",
	"brand_mng_vehicle_body_type": "string",
	"service_mng_id_key": 0,
	"service_mng_brand_managed_id": 0,
	"service_mng_cod_service_id": 0,
	"service_mng_active": "string",
	"entity_id": 0,
	"entity_city": "string",
	"entity_city_latit": 0,
	"entity_city_longit": 0,
	"entity_country": "string",
	"entity_country_code": "string",
	"entity_descr_activity": "string",
	"entity_descr_history": "string",
	"entity_email": "string",
	"entity_logo": "string",
	"entity_logo_path": "string",
	"entity_logo_url": "string",
	"entity_main_contact": "string",
	"entity_main_photo": "string",
	"entity_main_photo_path": "string",
	"entity_main_photo_url": "string",
	"entity_name_complete": "string",
	"entity_name_short": "string",
	"entity_region_state": "string"
};

export type LocateServicesData = typeof sampleLocateServicesData & {
	entity_aging_period_j?: string,
	entity_temp_tipo_j?: string
};

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedServicesData = LocateServicesData & {
	isSelected?: boolean;
}

export const useLocateServiceStore = defineStore('locateServiceStore', () => {
  const services = ref<LocateExtendedServicesData[]>([]);
	const servicesLoading = ref(false);

  async function fetchServices(
    searchParams?: Partial<LocateServicesData>,
    service_cod_services?: string[],
  ) {
    servicesLoading.value = true;
    try {
			const allItemes: LocateServicesData[] = [];

			for(const service_cod of (service_cod_services?.length ? service_cod_services : [""])){
				if(searchParams && service_cod) searchParams.service_cod_service = parseInt(service_cod);
				
				let searchQueryString = "&search=";
				if(searchParams) {
					for (const key in searchParams) {
						const value = searchParams[key as keyof typeof searchParams];
						if(value?.toString().replace(/\"/g,"")) searchQueryString += `${key}:${value},`;
					}
					searchQueryString = searchQueryString.substring(0, searchQueryString.length - 1);
				}

				const items = await fetchAllItems<LocateServicesData>(
					`/entity_service/query?sort_by=name:asc${encodeURI(searchQueryString)}`				);

				allItemes.push(...items);
			}
			services.value = allItemes;
    } catch (error) {
    } finally {
      servicesLoading.value = false;
    }
  }

  return {
		services,
		fetchServices,
		servicesLoading,
	};
});
