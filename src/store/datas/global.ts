import { defineStore } from 'pinia'
import { ref, computed, watch, reactive } from 'vue'
import { httpGet } from '@/api/api'
import { buildQS } from '@/utils/functions/buildQS'
import { alphabetically, alphabeticallyByKey, ascendingByKey, descending, descendingByKey } from '@/lib/sort'
import { BehaviorSubject, debounceTime, Subject } from 'rxjs'

const debounceSearch = debounceTime(200)

export const useGlobalStore = defineStore('dataGlobal', () => {
  // state
  const queryResult = ref()
  const listAreas = ref()
  const listCountries = ref()
  const listCities = ref()
  const listMaison = ref()
  const listYears = ref()
  const loading = ref(false)
  const detail = ref()
  const listEvents = ref()
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


    store.loading.submit = true
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    })

    return httpGet(`bidwatcher_auction/query_0?${qs}`)
      .then(({ data }) => {
        console.log(data)
        queryResult.value = data
        store.pager.value = {
          page: parseInt(data.page) ?? 0,
          size: parseInt(data.size) ?? 0,
          pages: parseInt(data.pages) ?? 0,
          total: parseInt(data.total) ?? 0,
        }
        return data
      })
      .finally(() => {
        store.loading.submit = false
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
    queryItems: computed(() => (queryResult.value?.items || []).map((item: any) => {
      return {
        ...item,
        ratio_sales: (item.ratio_sales).toFixed(2) + '%',
        avg_sales: (item.avg_sales).toFixed(2),
      }
    })),
    getListAreas: computed(() => listAreas.value),
    getListCountries: computed(() => listCountries.value),
    getListCities: computed(() => listCities.value),
    getListMaison: computed(() => listMaison.value),
    getListYears: computed(() => listYears.value),
    getLoading: computed(() => loading.value),
    getDetail: computed(() => detail.value),
    getListEvents: computed(() => listEvents.value),

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
      pages: 1,
      total: 0,
    }),

    sort: computed(function (): Record<string, string> {
      if (!store.orderBy.value) {
        return {}
      }
      return {
        [store.orderBy.value]: store.orderByDirection.value
      }
    }),

    orderBy: ref<string>(''),
    orderByDirection: ref<'asc' | 'desc'>('asc'),


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
    },
    submit () {
      return store.listPaginated(1, store.pager.value.size, store.filters, store.sort.value)
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

  watch(() => store.pager.value.page, store.paginate)
  watch(() => store.orderBy.value, store.submit)
  watch(() => store.orderByDirection.value, store.submit)

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
