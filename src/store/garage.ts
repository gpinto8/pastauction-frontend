import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { buildQS } from '@/utils/functions/buildQS';

import router from '../router';

import { post, get } from '@/api/api';

export const useGarageStore = defineStore('garage', () => {
  // state
  const list = ref();
  const loading = ref(false);
  const detail = ref();
  const listItems = ref();
  const loadingListItems = ref(false);
  const socialRumorsDetail = ref();

  // getters
  const getList = computed(() => list.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getListItems = computed(() => listItems.value);
  const getlLoadingListItems = computed(() => loadingListItems.value);
  const getSocialRumorsDetails = computed(() => socialRumorsDetail.value);

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
      get(`garage_set/query?${qs}`)
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
      post('garage_set/create', item)
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

  async function fetchDetail(id: number) {
    console.log('create item', item);

    loading.value = true;
    return await new Promise((resolve, reject) => {
      post('garage_set/create', item)
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

  function garageView(page: number, size: number, search?: any, sort?: any) {
    loadingListItems.value = true;
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    });

    return new Promise((resolve, reject) => {
      get(`bidwatcher_auction/query_10?${qs}`)
        .then(({ data }) => {
          console.log('Garage view', data);
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

  function socialMediaRumors(
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

    return new Promise((resolve, reject) => {
      get(`bidwatcher_auction/query_12?${qs}`)
        .then(({ data }) => {
          console.log('Garage view', data);
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

  function socialMediaRumorsDetail(
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

    return new Promise((resolve, reject) => {
      get(`bidwatcher_auction/query_13?${qs}`)
        .then(({ data }) => {
          console.log('Garage view', data);
          socialRumorsDetail.value = data;
          resolve(data);
        })
        .catch((err: any) => {
          loadingListItems.value = false;
          reject(err);
        });
    });
  }

  function auctionAlert(page: number, size: number, search?: any, sort?: any) {
    loadingListItems.value = true;
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    });

    return new Promise((resolve, reject) => {
      get(`bidwatcher_auction/query_14?${qs}`)
        .then(({ data }) => {
          console.log('Garage view', data);
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

  function auctionAlertDetail(
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

    return new Promise((resolve, reject) => {
      get(`bidwatcher_auction/query_15?${qs}`)
        .then(({ data }) => {
          console.log('Garage view', data);
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

  return {
    // state
    // getters
    getList,
    getLoading,
    getDetail,
    getListItems,
    getlLoadingListItems,
    getSocialRumorsDetails,

    // actions
    listPaginated,
    create,
    fetchDetail,
    garageView,
    socialMediaRumors,
    socialMediaRumorsDetail,
    auctionAlert,
    auctionAlertDetail,
  };
});
