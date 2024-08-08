import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { httpGet } from '@/api/api'
import { buildQS } from '@/utils/functions/buildQS'

export const useGlobalStore = defineStore('dataGlobal', () => {
  // state
  const listItems = ref()
  const listAreas = ref()
  const listCountries = ref()
  const listCities = ref()
  const listMaison = ref()
  const listYears = ref()
  const loading = ref(false)
  const detail = ref()
  const loadingListItems = ref(false)
  const listEvents = ref()
  // getters
  const getListItems = computed(() => listItems.value)
  const getListAreas = computed(() => listAreas.value)
  const getListCountries = computed(() => listCountries.value)
  const getListCities = computed(() => listCities.value)
  const getListMaison = computed(() => listMaison.value)
  const getListYears = computed(() => listYears.value)
  const getLoading = computed(() => loading.value)
  const getDetail = computed(() => detail.value)
  const getLoadingListItems = computed(() => loadingListItems.value)
  const getListEvents = computed(() => listEvents.value)
  // actions
  async function listPaginated (
    page: number,
    size: number,
    search?: any,
    sort?: any
  ) {
    loadingListItems.value = true
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    })

    return await new Promise((resolve, reject) => {
      httpGet(`bidwatcher_auction/query_0?${qs}`)
        .then(({ data }) => {
          console.log(data)
          listItems.value = data
          loadingListItems.value = false
          resolve(data)
        })
        .catch((err: any) => {
          loadingListItems.value = false
          reject(err)
        })
    })
  }

  async function auctionAreas (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listAreas.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionCountries (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listCountries.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionCities (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listCities.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionMaison (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listMaison.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionEvents (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listEvents.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionYear (tablename?: string, columnName?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tablename}/${columnName}/`)
        .then(({ data }) => {
          console.log(data)
          listYears.value = data.items
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  return {
    // state
    // getters
    getListItems,
    getListAreas,
    getLoading,
    getDetail,
    getListCountries,
    getListCities,
    getListMaison,
    getListYears,
    getLoadingListItems,
    getListEvents,

    // actions
    listPaginated,
    auctionAreas,
    auctionCountries,
    auctionCities,
    auctionMaison,
    auctionYear,
    auctionEvents,
  }
})
