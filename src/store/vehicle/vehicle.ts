import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { buildQS } from '@/utils/functions/buildQS';

import { post, get, put } from '@/api/api';

export const useVehicleStore = defineStore('vehicle', () => {
  // state
  const list = ref();
  const loading = ref(false);
  const detail = ref();
  const listItems = ref();
  const loadingListItems = ref(false);

  // getters
  const getList = computed(() => list.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getListItems = computed(() => listItems.value);
  const getlLoadingListItems = computed(() => loadingListItems.value);

  // actions
  async function listPaginated(
    page: number,
    size: number,
    search?: any,
    sort?: any
  ) {
    loadingListItems.value = true;
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    });

    return await new Promise((resolve, reject) => {
      get(`garage_vehicle/query?${qs}`)
        .then(({ data }) => {
          console.log('Garage', data);

          listItems.value = data;
          loadingListItems.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loadingListItems.value = false;
          reject(err);
        });
    });
  }

  async function create(item: any) {
    console.log('create item', item);

    loading.value = true;
    return await new Promise((resolve, reject) => {
      post('garage_vehicle/create', item)
        .then(({ data }) => {
          console.log(data);
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function update(item: any) {
    console.log('edit item', item);

    loading.value = true;
    return await new Promise((resolve, reject) => {
      put('garage_vehicle/update', item)
        .then(({ data }) => {
          console.log(data);
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function filter(tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      get(`filter/${tablename}/${columnName}?page=1&size=50`)
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  return {
    // state
    // getters
    getList,
    getLoading,
    getDetail,
    getListItems,
    getlLoadingListItems,

    // actions
    listPaginated,
    create,
    update,
    filter,
  };
});
