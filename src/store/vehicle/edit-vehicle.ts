// In your vehicleStore.ts
import { defineStore } from 'pinia'
import { useVehicleStore, type Vehicle } from './vehicle'
import { reactive, ref } from 'vue'
import { debounceTime, Subject } from 'rxjs'
import { match } from 'ts-pattern'
import pinia from '@/store'
type Entry = { name: string, id: string }
export function mockVehicle (): Vehicle {
  return {
    "purchase_year": new Date().getFullYear(),
    "purchase_value": 0,
    "garage_set_id": "0",
    "garage_choice": "",
    "id_brand": 0,
    "id_family": 0,
    "model_id": 0,
    "location_id": "ITA",
    "body_id": 0,
    "exterior_color_id": 0,
    "interior_color_id": 0,
    "interior_type": "",
    "variant": "",
    "type_vehicle": "",
    "year": 0,
    "doors": "",
    "transmission": "",
    "power": "",
    "engine_capacity": "",
    "driver_side": "",
    "originality": "",
    "status": "",
    "mileage": 0,
    "original_miles": "",
    "plate_numb": "",
    "vin": "",
    "main_photo": "",
    "registration_certificate": "",
    "service_book": "",
    "purchase_currency": "",
    "id": 0,
    "logo": ""
  }
}

export const useEditVehicleStore = defineStore('edit-vehicle', () => {
  const vehicleStore = useVehicleStore()

  const store = {

    brands: ref<Array<Entry>>([]),
    families: ref<Array<Entry>>([]),
    models: ref<Array<Entry>>([]),
    bodies: ref<Array<Entry>>([]),
    countries: ref<Entry[]>([]),
    loading: reactive({
      brands: false,
      families: false,
      models: false,
      bodies: false,
      countries: false,
      submit: false,
      done: false
    }),
    vehicle: ref<Vehicle>(mockVehicle()),

    async submit () {
      if (store.loading.submit) return

      store.loading.submit = true
      // return match(store.vehicle.value.id)
        // .with('new', () => {

          const payload = {
            ...store.vehicle.value,
          }
          delete payload.id
          const addingvehicle = vehicleStore.create(payload).then((result) => {
            store.vehicle.value.id = result.id
          })
          // console.log(addingvehicle.)
          // store.vehicle.value.id = addingvehicle.id
          return addingvehicle

        // })
        // .otherwise(() => vehicleStore.update(store.vehicle.value))
        // .finally(() => store.loading.submit = false)
    },

    async fetchInitialData () {
      if (store.brands.value.length === 0) {  // Only fetch if not already loaded
        // const [brand_names, families, models, body] = await Promise.all([
        //   vehicleStore.filter('bidwatcher_brand', 'name'),
        //   vehicleStore.filter('bidwatcher_family', 'name'),
        //   vehicleStore.filter('bidwatcher_model', 'family_a'),
        //   vehicleStore.filter('bidwatcher_body', 'type'),
        // ]).then(res => res.map(r => r.items))

        // store.brands.value = brand_names
        // store.families.value = families
        // store.models.value = models
        // store.bodies.value = body
      }
    },
    // ---
    brandSearch$: new Subject<string>(),
    done (){
      store.loading.done = true
    },
    async searchBrands (search: string) {
      store.brandSearch$.next(search)
    },
    // ---
    familySearch$: new Subject<string>(),
    async searchFamilies (search: string) {
      store.familySearch$.next(search)
    },
    // ---
    countrySearch$: new Subject<string>(),
    async searchCountries (search: string) {
      store.countrySearch$.next(search)
    },
  }

  // ----
  store.brandSearch$.pipe(
    debounceTime(100),
  )
    .subscribe(async (search) => {
      store.loading.brands = true
      const { items } = await vehicleStore.filter('bidwatcher_brand', 'name', search).finally(() => store.loading.brands = false)
      store.brands.value = items
    })
  // ----
  store.familySearch$.pipe(
    debounceTime(100),
  )
    .subscribe(async (search) => {
      store.loading.families = true
      const { items } = await vehicleStore.filter('bidwatcher_family', 'name', search, true).finally(() => store.loading.families = false)
      store.families.value = items
    })
  // ----
  store.countrySearch$.pipe(
    debounceTime(100),
  )
    .subscribe(async (search) => {
      store.loading.countries = true
      const { items } = await vehicleStore.filter('bidwatcher_country', 'name', search).finally(() => store.loading.countries = false)
      store.countries.value = items
    })


  return store
})
