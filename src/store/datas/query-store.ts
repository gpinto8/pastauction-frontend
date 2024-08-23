import { httpGet } from '@/api/api'
import { cachableWithArgs } from '@/lib/cachable'
import { alphabeticallyByKey, ascendingByKey } from '@/lib/sort'
import { buildQS } from '@/utils/functions/buildQS'
import { defineStore } from 'pinia'
import { BehaviorSubject, debounceTime } from 'rxjs'
import { computed, reactive, ref, watch } from 'vue'

const debounceSearch = debounceTime(200)
const useFilters = () => reactive<{
  auction_area: string
  name_event: string
  country_auction_name: string
  country_maison: string
  maison_name: string
  city_auction_name: string
  auction_year: number | null
}>({
  auction_area: '',
  name_event: '',
  country_auction_name: '',
  country_maison: '',
  maison_name: '',
  city_auction_name: '',
  auction_year: null,
})


export enum Columns {
  area = "country_auction_area",
  auctionCountry = "country_auction_name",
  auctionCity = "city_auction_name",
  auctionEvent = "name_event",
  maison = "maison_name",
  maisonCountry = "country_maison",
  auctionYear = "auction_year",
}

export type UseDatasStore = ReturnType<typeof newStore>
export type DatasStore = ReturnType<UseDatasStore>
const stores: Record<string, UseDatasStore> = {}

export const queryStore = (queryTable: string) => {
  const name = `store-${queryTable}`
  return stores[name] || (stores[name] = newStore(name, queryTable))
}

const queryColumn = cachableWithArgs((column: Columns, search: Record<string, any>) => {
  const qs = buildQS({ search })
  return httpGet(`filter/bidwatcher_auction_query_1/${column}/?${qs}`)
    .then(({ data }) => {
      return data as {
        items: Record<Columns, any>[],
        page: number,
        pages: number,
        size: number,
        total: number,
      }
    })
})

function newStore (name: string, queryTable: string) {
  return defineStore(name, () => {
    // state
    const queryResult = ref()
    const filters = useFilters()
    // actions
    async function listPaginated (
      page: number,
      size: number,
      search?: any,
      sort?: any
    ) {

      if (store.filterAmount.value < 3) {
        throw new Error('Please select at least 3 filters')
      }


      store.loading.submit = true
      const qs = buildQS({
        page: page,
        size: size,
        search: search,
        sort: sort,
      })

      return httpGet(`bidwatcher_auction/${queryTable}?${qs}`)
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

    async function _auctionAreas () {
      const column = Columns.area
      return queryColumn(column, filters)
        .then((data) => {
          console.log(data)
          store.listAreas.value = data.items.sort(alphabeticallyByKey(column))
          return data
        })
    }

    async function _auctionCountries () {
      const column = Columns.auctionCountry
      const area = filters.auction_area
      const search: Record<string, string> = {}

      if (area) {
        search.country_auction_area = area
      }

      return queryColumn(column, { ...filters, ...search })
        .then((data) => {
          console.log(data)
          store.listCountries.value = data.items.sort(alphabeticallyByKey(column))
          return data
        })
    }

    async function _maisonCountries () {
      const column = Columns.maisonCountry
      const area = filters.auction_area
      const search: Record<string, string> = {}

      if (area) {
        search.country_auction_area = area
      }

      return queryColumn(column, { ...filters, ...search })
        .then((data) => {
          console.log(data)
          store.listMaisonCountries.value = data.items.sort(alphabeticallyByKey(column))
          return data
        })
    }

    async function _auctionCities () {
      const column = Columns.auctionCity
      const country = filters.country_auction_name
      const search: Record<string, string> = {}
      const like = store.citySearch$.value

      if (country) {
        search[Columns.auctionCountry] = country
      }
      if (like) {
        // columnName += `_like:${encodeURIComponent(like)}`
        search[column] = like
      }

      return queryColumn(column, { ...filters, ...search })
        .then((data) => {
          console.log(data)
          store.listCities.value = data.items
          return data
        })
    }

    async function _auctionMaison () {
      const column = Columns.maison
      return queryColumn(column, {})
        .then((data) => {
          console.log(data)
          store.listMaison.value = data.items
          return data
        })
    }

    async function _auctionEvents () {
      const column = Columns.auctionEvent
      const area = filters.auction_area
      const year = filters.auction_year
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

      return queryColumn(column, { ...filters, ...search })
        .then((data) => {
          console.log(data)
          store.listEvents.value = data.items
          return data
        })
    }

    async function _auctionYear () {
      const column = Columns.auctionYear
      const area = filters.auction_area
      const search: Record<string, string> = {}

      if (area) {
        search.area = area
      }

      return queryColumn(column, { ...filters, ...search })
        .then((data) => {
          console.log(data)
          store.listYears.value = data.items.sort(ascendingByKey(column))
          return data
        })
    }

    function withLoading<T> (fn: () => Promise<T>, column: Columns) {
      return async () => {
        store.loading[column] = true
        return fn().finally(() => store.loading[column] = false)
      }
    }

    const auctionAreas = withLoading(_auctionAreas, Columns.area)
    const auctionCountries = withLoading(_auctionCountries, Columns.auctionCountry)
    const maisonCountries = withLoading(_maisonCountries, Columns.maisonCountry)
    const auctionCities = withLoading(_auctionCities, Columns.auctionCity)
    const auctionMaison = withLoading(_auctionMaison, Columns.maison)
    const auctionYear = withLoading(_auctionYear, Columns.auctionEvent)
    const auctionEvents = withLoading(_auctionEvents, Columns.auctionYear)

    const store = {
      // state
      listCountries: ref(),
      listCities: ref(),
      listMaison: ref(),
      listMaisonCountries: ref(),
      listYears: ref(),
      listEvents: ref(),
      listAreas: ref(),

      // getters
      queryItems: computed(() => (queryResult.value?.items || []).map((item: any) => {
        const parsed = {
          ...item,
        }
        if ('ratio_sales' in item) {
          parsed.ratio_sales = (item?.ratio_sales * 100).toFixed(2) + '%'
        }
        if ('avg_sales' in item) {
          parsed.avg_sales = (item?.avg_sales).toFixed(2)
        }

        return parsed
      })),

      loading: reactive<Record<Columns | 'submit', boolean>>({
        [Columns.area]: false,
        [Columns.auctionCountry]: false,
        [Columns.auctionCity]: false,
        [Columns.auctionEvent]: false,
        [Columns.maison]: false,
        [Columns.maisonCountry]: false,
        [Columns.auctionYear]: false,
        submit: false,
      }),

      // actions
      listPaginated,
      auctionAreas,
      auctionCountries,
      maisonCountries,
      auctionCities,
      auctionMaison,
      auctionYear,
      auctionEvents,
      filters,
      filterAmount: computed(function (): number {
        return Object.values(filters).filter(Boolean).length
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
        maisonCountries()
        auctionCities()
        auctionMaison()
        auctionYear()
        auctionEvents()
      },

      filter () {
        store.init()
      },

      paginate () {
        return store.listPaginated(store.pager.value.page, store.pager.value.size, filters, store.sort.value)
      },
      submit () {
        return store.listPaginated(1, store.pager.value.size, filters, store.sort.value)
      },
      clear () {
        Object.entries(useFilters()).forEach(([key, value]) => {
          if (key in filters) {
            // @ts-ignore
            filters[key] = value
          }
        })
      },
      clearResults () {
        queryResult.value = null
      },
    }

    watch(() => store.pager.value.page, store.paginate)
    watch(() => store.orderBy.value, store.submit)
    watch(() => store.orderByDirection.value, store.submit)

    watch(() => filters, store.filter, { deep: true })

    store.citySearch$.pipe(debounceSearch)
      .subscribe(async () => {
        auctionCities()
      })

    store.eventSearch$.pipe(debounceSearch)
      .subscribe(async () => {
        auctionEvents()
      })

    return store
  })
}