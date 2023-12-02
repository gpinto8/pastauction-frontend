import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { get } from '@/api/api';
import { buildQS } from '@/utils/functions/buildQS';

export const useBrandStore = defineStore('brand', () => {
  // state
  const listItems = ref();
  const listFirstLetters = ref();
  const listFirstTwoLetters = ref();
  const listBrand = ref();
  const loading = ref(false);
  const detail = ref();
  const loadingListItems = ref(false);
  // getters

  const getListItems = computed(() => listItems.value);
  const getListFirstLetters = computed(() => listFirstLetters.value);
  const getListFirstTwoLetters = computed(() => listFirstTwoLetters.value);
  const getListBrands = computed(() => listBrand.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getLoadingListItems = computed(() => loadingListItems.value);

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
      get(`bidwatcher_model/query_m?${qs}`)
        .then(({ data }) => {
          console.log(data);
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

  async function auctionLetters(tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      get(`filter/${tablename}/${columnName}`)
        .then(({ data }) => {
          console.log(data);
          listFirstLetters.value = data.items;
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
  async function auctionTwoLetters(
    tablename?: string,
    columnName?: string,
    qs?: string
  ) {
    return await new Promise((resolve, reject) => {
      get(`filter/${tablename}/${columnName}/?${qs}`)
        .then(({ data }) => {
          console.log(data);
          listFirstTwoLetters.value = data.items;
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async function auctionBrands(
    tablename?: string,
    columnName?: string,
    qs?: string
  ) {
    return await new Promise((resolve, reject) => {
      get(`filter/${tablename}/${columnName}/?${qs}`)
        .then(({ data }) => {
          console.log(data);
          listBrand.value = data.items;
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
    getListItems,
    getListFirstLetters,
    getListFirstTwoLetters,
    getListBrands,
    getLoading,
    getDetail,
    getLoadingListItems,

    // actions
    listPaginated,
    auctionLetters,
    auctionTwoLetters,
    auctionBrands,
  };
});
