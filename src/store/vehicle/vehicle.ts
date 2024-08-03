import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { buildQS } from '@/utils/functions/buildQS'

import { httpPost, httpGet, httpPut } from '@/api/api'

export type Vehicle = {
  id?: string | number
  purchase_year: number
  purchase_value: number
  garage_set_id: string
  garage_choice: string
  id_brand: number,
  id_family: number,
  model_id: number,
  location_id: string
  body_id: number
  exterior_color_id: number
  interior_color_id: number
  variant: string
  type_vehicle: string
  year: number
  doors: string
  transmission: string
  power: string
  engine_capacity: string
  interior_type: string
  driver_side: string
  originality: string
  status: string
  mileage: number
  original_miles: string
  plate_numb: string
  vin: string
  main_photo: string
  registration_certificate: string
  service_book: string
  purchase_currency: string
  logo: string
}

export type CreateVehiclePayload = Omit<Vehicle, 'id'>

export const useVehicleStore = defineStore('vehicle', () => {
  // state
  const list = ref()
  const loading = ref(false)
  const detail = ref()
  const listItems = ref()
  const loadingListItems = ref(false)

  // getters
  const getList = computed(() => list.value)
  const getLoading = computed(() => loading.value)
  const getDetail = computed(() => detail.value)
  const getListItems = computed(() => listItems.value)
  const getlLoadingListItems = computed(() => loadingListItems.value)

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
      httpGet(`garage_vehicle/query?${qs}`)
        .then(({ data }) => {
          console.log('Garage', data)

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

  async function create (item: CreateVehiclePayload) {
    console.log('create item', item)
    loading.value = true
    const { data } = await httpPost('garage_vehicle/create', item).finally(() => loading.value = false)
    return data
  }

  async function update (item: Vehicle) {
    console.log('edit item', item)
    loading.value = true
    const { data } = await httpPut('garage_vehicle/update', item).finally(() => loading.value = false)
    return data
  }

  async function upsert (item: Vehicle | CreateVehiclePayload) {
    return 'id' in item ? update(item) : create(item)
  }

  async function filter (tablename?: string, columnName?: string, search?: string) {
    if (search) {
      columnName += `_like:${search}`
    }
    const { data } = await httpGet(`filter/${tablename}/${columnName}/?page=1&size=50`)
    return data
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
    upsert,
    filter,
  }
})
