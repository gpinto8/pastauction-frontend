import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { httpDelete, httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';

export interface ServiceBaseSchema {
  id: number;
  label: string;
  logo: string;
}
export interface ServiceSchema extends ServiceBaseSchema {
  partsA: TypeASchema[];
}
export interface TypeASchema extends ServiceBaseSchema {
  partsB: TypeBSchema[];
}
export interface TypeBSchema {
  id: number;
  name: string;
  logo: string;
}

export const useEntityServicesStore = defineStore('entityServices', () => {
  const entityServicesSchema = ref<ServiceSchema[]>([]);

  async function fetchEntityServiceSchema() {
    const response = await httpGet('/entity_service/schema');
    entityServicesSchema.value = response.data;
  }
 
  return {
    entityServicesSchema,
    fetchEntityServiceSchema
  }
});
