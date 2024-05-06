import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocateStore = defineStore('locate', () => {
	const filterValues = ref({
		brandsLoading: false,
		areas: [] as string[],
		countries: [] as string[],
		cities: [] as string[],
		cars: [] as string[],
		brands: [] as string[],
		agings: [
			{name: "Antique", startYear: 1880, endYear: 1904},
			{name: "Veteran", startYear: 1905, endYear: 1918},
			{name: "Vintage", startYear: 1919, endYear: 1930},
			{name: "Post Vintage", startYear: 1931, endYear: 1945},
			{name: "Classic", startYear: 1946, endYear: 1964},
			{name: "Post Classic", startYear: 1965, endYear: 1974},
			{name: "Modern", startYear: 1975, endYear: 1999},
			{name: "Conteporary", startYear: 2000, endYear: 2020},
		] as {name: string, startYear: number, endYear: number}[]

	})
    
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
			filterValues.value.brandsLoading = true;
          return (await fetchAllItems<{name:string}>(`filter/entity_entity/brand_main/?sort_by=name:asc`, (items)=> filterValues.value.brands.push(...items.map(e=>e.name)))).map(e=>e.name);
        }catch (e){
			return [];
		}
        finally {
			filterValues.value.brandsLoading = false;
        }
      }

	  async function fetchAreas(): Promise<string[]> {
        try {
			return (await fetchAllItems<{name:string}>(`filter/entity_entity/area_geo/?sort_by=name:asc`, (items)=> filterValues.value.areas.push(...items.map(e=>e.name)))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }

	  async function fetchCountries(area?: string): Promise<string[]> {
        try {
			return (await (fetchAllItems<{name:string}>(`filter/entity_entity/country/?sort_by=name:asc`, (items)=> filterValues.value.countries.push(...items.map(e=>e.name))))).map(e=>e.name);
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
			return (await (fetchAllItems<{name:string}>(`filter/entity_entity/car/?sort_by=name:asc`, (items)=> filterValues.value.cars.push(...items.map(e=>e.name))))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }

	  async function fetchCities(country?: string): Promise<string[]> {
        try {
			return (await (fetchAllItems<{name:string}>(`filter/entity_entity/country/?sort_by=name:asc${country ? '&' + encodeURI('search=country:' + country) : ''}`, (items)=> filterValues.value.cities.push(...items.map(e=>e.name))))).map(e=>e.name);
        }
		catch (e){
			return [];
		}
        finally {
          return [];
        }
      }

	return { 
		filterValues,
		filterValuesFunctions: { fetchBrands, fetchAreas , fetchCountries, fetchCars, fetchCities },
	};
});
