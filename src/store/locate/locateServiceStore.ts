import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { fetchAllItems } from './utils/fetchAllItems';

export type LocateServicesData = {
	"service_id_key": number,
	"service_cod_service": number,
	"service_name": string,
	"service_url_image": string,
	"brand_id_key": number,
	"brand_gt_service_mngd": string,
	"brand_name": string,
	"brand_logo": string,
	"brand_brand_type": string,
	"brand_mng_id_key": number,
	"brand_mng_entity_id": number,
	"brand_mng_brand_id": number,
	"brand_mng_cod_family": number,
	"brand_mng_describe": string,
	"brand_mng_vehicle_period": string,
	"brand_mng_vehicle_category": string,
	"brand_mng_vehicle_body_type": string,
	"service_mng_id_key": number,
	"service_mng_brand_managed_id": number,
	"service_mng_cod_service_id": number,
	"service_mng_active": string,
	"entity_id": number,
	"entity_city": string,
	"entity_city_latit": number,
	"entity_city_longit": number,
	"entity_country": string,
	"entity_country_code": string,
	"entity_descr_activity": string,
	"entity_descr_history": string,
	"entity_email": string,
	"entity_logo": string,
	"entity_logo_path": string,
	"entity_logo_url": string,
	"entity_main_contact": string,
	"entity_main_photo": string,
	"entity_main_photo_path": string,
	"entity_main_photo_url": string,
	"entity_name_complete": string,
	"entity_name_short": string,
	"entity_region_state": string
}

/** this type extends the raw data with properties that will be used only in frontend */
export type LocateExtendedServicesData = LocateServicesData & {
	isSelected?: boolean;
}

export const useLocateServiceStore = defineStore('locateServiceStore', () => {
  const services = ref<LocateExtendedServicesData[]>([]);
	const servicesLoading = ref(false);

  async function fetchServices(
    searchParams?: Partial<LocateServicesData>,
    service_cod_services?: number[],
    cleanServicesBeforeFetch = true
  ) {
    servicesLoading.value = true;
    if (cleanServicesBeforeFetch) services.value = [];
    try {
      let searchQueryString = searchParams
        ? Object.keys(searchParams)
            .map(k => k + ':' + (searchParams as any)[k])
            .join(',')
        : '';

      if (service_cod_services?.length && service_cod_services.length !== 0) {
        for (const service_cod_service of service_cod_services) {
          fetchServices({ ...searchParams, service_cod_service: service_cod_service }, [], false);
        }
      } else {
        services.value = await fetchAllItems<LocateServicesData>(
          `/entity_service/?sort_by=name:asc${searchQueryString ? '&' + encodeURI(searchQueryString) : ''}`
        );
      }
    } catch (error) {
    } finally {
      servicesLoading.value = false;
    }
  }


	
  // onMounted(()=>{
  // 	fetchRoadmaps();
  // });

  return {
		services,
		fetchServices,
		servicesLoading,
	};
});
