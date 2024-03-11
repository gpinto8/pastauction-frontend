import { httpGet, httpPatch } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEntityVehiclesOfInterestStore = defineStore('entity-vehicles-of-interest', () => {
  type VehicleOfInterest = {
    brand: string;
    family: string;
    model: string;
    type: string;
    period: string;
    active: boolean;
  };

  async function fetchAllItems<T>(url: string): Promise<T[]> {
    function addToUrl(url: string, params: string): string {
      return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
    }
    const firstQueryUrl = addToUrl(url, 'size=1');
    const firstQueryResponse = await httpGet(firstQueryUrl);
    const totalItems = firstQueryResponse.data.total;
    const pageSize = 100;
    const numberOfPages = Math.ceil(totalItems / pageSize);
    const items: T[] = [];
    for (let page = 1; page <= numberOfPages; page++) {
      const queryUrl = addToUrl(url, `page=${page}&size=${pageSize}`);
      const response = await httpGet(queryUrl);
      items.push(...response.data.items);
    }
    return items;
  }
  
  const defaultVehiclesOfInterest: VehicleOfInterest[] = [];

  const brands = ref<string[]>([]);
  const brandsLoading = ref(false);

  const families = ref([
    {
      family: 'Mercedes',
      active: true
    },
    {
      family: 'Renault',
      active: true
    },
    {
      family: 'Fiat',
      active: true
    }
  ]);

  const models = ref([
    {
      model: 'Mercedes',
      active: true
    },
    {
      model: 'Renault',
      active: true
    },
    {
      model: 'Fiat',
      active: true
    }
  ]);

  const types = ref([
    {
      type: 'Coupe',
      active: true
    },
    {
      type: 'Sedan',
      active: true
    },
    {
      type: 'SUV',
      active: true
    }
  ]);

  const periods = ref([
    {
      period: 'Classic',
      active: true
    },
    {
      period: 'Modern',
      active: true
    },
    {
      period: 'Future',
      active: true
    }
  ]);

  const vehiclesOfInterest = ref<VehicleOfInterest[]>([]);

  function convertApiUglyFormatToVehiclesOfInterest(apiUglyVehicleOfInterest: any): VehicleOfInterest {
    return ({
      brand: apiUglyVehicleOfInterest.brand,
      family: apiUglyVehicleOfInterest.family,
      model: apiUglyVehicleOfInterest.model,
      type: apiUglyVehicleOfInterest.model_type,
      period: apiUglyVehicleOfInterest.model_period,
      active: apiUglyVehicleOfInterest.active_vehicles
    })
  }

  function convertVehiclesOfInterestToApiUglyFormat(vehicleOfInterest: VehicleOfInterest): any {
    return ({
      brand: vehicleOfInterest.brand,
      family: vehicleOfInterest.family,
      model: vehicleOfInterest.model,
      model_type: vehicleOfInterest.type,
      model_period: vehicleOfInterest.period,
      active_vehicles: vehicleOfInterest.active
    })
  }

  async function fetchBrands() {
    try {
      brandsLoading.value = true;
      brands.value = (await fetchAllItems<{name:string}>('filter/bidwatcher_brand/name/?sort_by=name:asc')).map(item => item.name);
    }
    finally {
      brandsLoading.value = false;
    }
  }

  async function fetchFamilies(brand: string): Promise<string[]> {
    return (await fetchAllItems<{family_name:string}>(`filter/filter_charts_vehicles/family_name/?family_name:asc&search=brand_name:${brand}`)).map(item => item.family_name);
  }

  async function fetchModels(family: string): Promise<string[]> {
    return (await fetchAllItems<{model_name:string}>(`filter/filter_charts_vehicles/model_name/?model_name:asc&search=family_name:${family}`)).map(item => item.model_name);
  }

  async function fetchVehiclesOfInterest() {
    const entity = (await httpGet('/entity')).data;
    vehiclesOfInterest.value = entity.vehicleOfInterest.map(convertApiUglyFormatToVehiclesOfInterest);
  }

  async function saveVehiclesOfInterest() {
    await httpPatch('/entity_entity/update', { vehiclesOfInterest: vehiclesOfInterest.value.map(convertVehiclesOfInterestToApiUglyFormat) });
  }

  return { vehiclesOfInterest, brands, families, models, types, periods, brandsLoading, fetchVehiclesOfInterest, fetchBrands, fetchFamilies, fetchModels, saveVehiclesOfInterest };
});
