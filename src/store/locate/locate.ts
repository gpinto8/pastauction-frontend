import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocateStore = defineStore('locate', () => {
    const brandsLoading = ref(false);
    const brands = ref<string[]>([]);

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
  
    async function fetchBrands(table, column) {
        try {
          brandsLoading.value = true;
          brands.value = (await fetchAllItems<{name:string}>(`filter/${table}/${column}/?sort_by=name:asc`)).map(item => item.name);
        }
        finally {
          brandsLoading.value = false;
        }
      }


  return { brandsLoading, brands, fetchBrands };
});
