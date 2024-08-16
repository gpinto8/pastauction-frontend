import { defineStore } from 'pinia'
import { ref, computed, watch, reactive } from 'vue'
import { httpGet } from '@/api/api'
import { buildQS } from '@/utils/functions/buildQS'
import { alphabetically, alphabeticallyByKey, ascendingByKey, descending, descendingByKey } from '@/lib/sort'
import { BehaviorSubject, debounceTime, Subject } from 'rxjs'

const debounceSearch = debounceTime(200)

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
    // id_auction
    // auction_area
    // auction_data
    // auction_year
    // city_auction_name
    // country_auction_name
    // country_maison
    // maison_name
    // maison_type
    // name_event


    loadingListItems.value = true
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    })

    return httpGet(`bidwatcher_auction/query_0?${qs}`)
      .then(({ data }) => {
        console.log(data)
        listItems.value = data
        return data
      })
      .finally(() => {
        loadingListItems.value = false
      })
  }

  async function auctionAreas () {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_auction/area/`)
        .then(({ data }) => {
          console.log(data)
          listAreas.value = data.items.sort(alphabeticallyByKey('area'))
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionCountries (columnName: string = 'name') {
    const area = store.filters.auction_area
    const search: Record<string, string> = {}

    if (area) {
      search.area = area
    }

    const qs = buildQS({
      search: search,
    })

    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_country/${columnName}/?${qs}`)
        .then(({ data }) => {
          console.log(data)
          listCountries.value = data.items.sort(alphabeticallyByKey('name'))
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  async function auctionCities (columnName: string = 'name') {
    const country = store.filters.country_auction_name // TODO actually filter by country
    const search: Record<string, string> = {}
    const like = store.citySearch$.value

    if (country) {
      search.country_name = country
    }
    if (like) {
      // columnName += `_like:${encodeURIComponent(like)}`
      search.name_like = like
    }

    const qs = buildQS({
      search: search
    })


    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_city/${columnName}/?${qs}`)
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

  async function auctionMaison (columnName: string = 'name') {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_maison/${columnName}/`)
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

  async function auctionEvents () {
    const area = store.filters.auction_area
    const year = store.filters.auction_year
    const name = store.eventSearch$.value
    const search: Record<string, string | number> = {}

    if (area) {
      search.area = area
    }
    if (year) {
      search.year = year
    }
    if (name) {
      search.name_event_like = name
    }

    const qs = buildQS({
      search: search,
    })

    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_auction/name_event/?${qs}`)
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

  async function auctionYear () {
    const area = store.filters.auction_area
    const search: Record<string, string> = {}

    if (area) {
      search.area = area
    }

    const qs = buildQS({
      search: search,
    })


    return await new Promise((resolve, reject) => {
      httpGet(`filter/bidwatcher_auction/year/?${qs}`)
        .then(({ data }) => {
          console.log(data)
          listYears.value = data.items.sort(ascendingByKey('year'))
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  const store = {
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

    loading: reactive({
      cities: false,
      events: false,
      submit: false,
    }),

    // actions
    listPaginated,
    auctionAreas,
    auctionCountries,
    auctionCities,
    auctionMaison,
    auctionYear,
    auctionEvents,
    filters: reactive({
      auction_area: 'UK',
      name_event: '',
      country_auction_name: 'United Kingdom',
      country_maison: 'United Kingdom',
      maison_name: '',
      city_auction_name: 'London',
      auction_year: 2021,
    }),
    pager: ref({
      page: 1,
      size: 10,
    }),

    sort: ref({
      auction_area: null,
      name_event: null,
      country_auction_name: null,
      country_maison: null,
      maison_name: null,
      city_auction_name: null,
      auction_year: null,
    }),

    citySearch$: new BehaviorSubject<string>(''),
    async searchCities (search: string) {
      store.citySearch$.next(search)
    },

    eventSearch$: new BehaviorSubject<string>(''),
    async searchEvents (search: string) {
      store.eventSearch$.next(search)
    },

    init () {
      auctionAreas()
      auctionCountries()
      auctionCities()
      auctionMaison()
      auctionYear()
      auctionEvents()
    },

    paginate () {
      return store.listPaginated(store.pager.value.page, store.pager.value.size, store.filters, store.sort.value)
    }
  }

  watch(() => store.filters.auction_area, () => {
    console.log('auction_area', store.filters.auction_area)
    store.filters.country_auction_name = ''
    store.filters.city_auction_name = ''
    // store.filters.auction_year = null
    store.filters.name_event = ''
    auctionCountries()
    auctionEvents()
    auctionYear()
  })
  watch(() => store.filters.country_auction_name, () => {
    console.log('country_auction_name', store.filters.country_auction_name)
    store.filters.city_auction_name = ''
    auctionCities()
  })
  // watch year and query events
  watch(() => store.filters.auction_year, () => {
    console.log('auction_year', store.filters.auction_year)
    auctionEvents()
  })

  store.citySearch$.pipe(debounceSearch)
    .subscribe(async () => {
      store.loading.cities = true
      auctionCities().finally(() => store.loading.cities = false)
    })

  store.eventSearch$.pipe(debounceSearch)
    .subscribe(async () => {
      store.loading.events = true
      auctionEvents().finally(() => store.loading.events = false)
    })



  return store
})
