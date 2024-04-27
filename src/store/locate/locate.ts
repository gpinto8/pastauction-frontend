import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocateStore = defineStore('locate', () => {
    const brandsLoading = ref(false);
    const areas = ref<string[]>([]);
    const countries = ref<string[]>([]);
    const cars = ref<string[]>([]);
    const brands = ref<string[]>([]);
    const agings = [
		{name: "Antique", startYear: 1880, endYear: 1904},
		{name: "Veteran", startYear: 1905, endYear: 1918},
		{name: "Vintage", startYear: 1919, endYear: 1930},
		{name: "Post Vintage", startYear: 1931, endYear: 1945},
		{name: "Classic", startYear: 1946, endYear: 1964},
		{name: "Post Classic", startYear: 1965, endYear: 1974},
		{name: "Modern", startYear: 1975, endYear: 1999},
		{name: "Conteporary", startYear: 2000, endYear: 2020},
	];

    async function fetchAllItems<T>(url: string, cb?: (data:T[]) => void): Promise<T[]> {
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
  
    async function fetchBrands() : Promise<string[]> {
        try {
          brandsLoading.value = true;
          return (await fetchAllItems<{name:string}>(`filter/entity_model_managed_query/brand_main/?sort_by=name:asc`, (items)=> brands.value.push(...items.map(e=>e.name)))).map(e=>e.name);
        }catch (e){
			return [];
		}
        finally {
          brandsLoading.value = false;
        }
      }

	  async function fetchAreas(): Promise<string[]> {
        try {
			return (await fetchAllItems<{name:string}>(`filter/entity_model_managed_query/area_geo/?sort_by=name:asc`, (items)=> areas.value.push(...items.map(e=>e.name)))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }

	  async function fetchCountries(): Promise<string[]> {
        try {
			return (await (fetchAllItems<{name:string}>(`filter/entity_model_managed_query/country/?sort_by=name:asc`, (items)=> countries.value.push(...items.map(e=>e.name))))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }

	  async function fetchCars(): Promise<string[]> {
        try {
			return (await (fetchAllItems<{name:string}>(`filter/entity_model_managed_query/country/?sort_by=name:asc`, (items)=> cars.value.push(...items.map(e=>e.name))))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }


	return { 
		brands,
		areas,
		cars,
		countries,
		agings,
		fetchBrands,
		fetchAreas,
		brandsLoading,
	};
});
