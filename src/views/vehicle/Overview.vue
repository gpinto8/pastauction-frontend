<template>
  <v-container>
    <div class="text-center pb-4">
      <template>
        <h3 class="text-2xl font-medium mb-2">Add vehicles</h3>
        <span class="font-medium text-grey">
          Fill in the following data to add your vehicle to the garage
        </span>
      </template>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.purchase_value"
          label="Is this a vehicle you want, have or had?"
          inline
          required
        >
          <v-radio label="I have it" value="I have it" />
          <v-radio label="I want it" value="I want it" />
          <v-radio label="I had it " value="I had it" />
        </v-radio-group>
      </div>
      <v-autocomplete
        required
        v-model="vehicle.purchase_year"
        label="Year"
        variant="outlined"
        density="compact"
        :items="years"

      />
<!--      <span-->
<!--        @mouseover="store.searchBrands()"-->
<!--        class="position-relative">-->
<!--        <div class="title-of-select">Brand</div>-->
<!--      <select-->
<!--        class="selectBox"-->

<!--        required-->
<!--        v-model="vehicle.id_brand"-->
<!--        name="selectBrand"-->
<!--      >-->

<!--        <option-->
<!--          @select="store.searchFamilies"-->
<!--          v-for="itemB in store.brands" :value="itemB.id">{{itemB.name}}</option>-->
<!--      </select></span>-->


        <v-autocomplete
          :search-input.sync="tempBrandVal"
        required
        @update:search="updateBrands"
        :items="listOfBrands"
        :loading="store.loading.brands"
        label="Make"
        v-model="selectedBrand"
        item-title="name"
        item-value="id"
        variant="outlined"
        density="compact"
           @change="updateBrand"
          return-object


        ></v-autocomplete>


      <v-autocomplete
        required
        v-model="vehicle.id_family"
        :items="store.families"
        @update:search="updateFamiliesAxios"
        :loading="store.loading.families"
        item-value="id"
        item-title="name"
        label="Family"
        variant="outlined"
        density="compact"
      />
<!--      <span class="position-relative"-->
<!--            @click="store.searchFamilies('')"-->

<!--      >-->
<!--        <div class="title-of-select">Family</div>-->
<!--      <select-->
<!--        class="selectBox"-->
<!--        required-->
<!--        v-model="vehicle.id_family"-->
<!--        @update:search="store.searchFamilies"-->
<!--      >-->
<!--        <option v-for="itemB in store .families" :value="itemB.id">{{itemB.name}}</option>-->
<!--      </select></span>-->

      <v-autocomplete
        v-model="vehicle.model_id"
        :items="store.models"
        label="Model"
        item-value="id"
        item-title="family_b"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="(vehicle as any).variant"
        :items="[]"
        label="Variant"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="(vehicle as any).variant"
        :items="[]"
        label="Series"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="(vehicle as any).type_vehicle"
        :items="[]"
        label="Vehicle Type"
        variant="outlined"
        density="compact"
      />
      <v-autocomplete
        v-model="vehicle.body_id"
        :items="store.bodies"
        label="Body"
        item-value="id"
        item-title="type"
        variant="outlined"
        density="compact"
      />
      <v-select
        v-model="(vehicle as any).doors"
        :items="[2, 3, 4, 5]"
        label="Doors"
        variant="outlined"
        density="compact"
      />
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.transmission"
          label="Transmittion"
          inline
        >
          <v-radio label="Manual" value="manual" />
          <v-radio label="Automatic" value="automatic" />
        </v-radio-group>
      </div>
      <v-select
        v-model="(vehicle as any).power"
        :items="[]"
        label="Power"
        variant="outlined"
        density="compact"
      />
      <v-text-field
        v-model="vehicle.engine_capacity"
        label="Engine Capacity"
        variant="outlined"
        density="compact"
      />

      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.driver_side"
          label="Drivers’s Side"
          inline
        >
          <v-radio label="Left hand drive" value="Left hand drive" />
          <v-radio label="Right hand drive" value="Right hand drive" />
          <v-radio label="Center" value="Center" />
        </v-radio-group>
      </div>
      <div>
        <small class="font-semibold">Exteriour color: {{vehicle.exterior_color_id}}</small>
        <div class="flex gap-3">
          <div
            v-for="color in [
              'red',
              'yellow',
              'green',
              'white',
              'black',
              'blue',
            ]"
            class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
            :class="{
              'border-2 !border-blue-500':
                (vehicle as any).exterior_color_id === color,
            }"
            @click="(vehicle as any).exterior_color_id = color"
          >
            <div class="h-full" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </div>
      <div>
        <small class="font-semibold">Interior color: {{vehicle.interior_color_id}}
        </small>
        <div class="flex gap-3">
          <div
            v-for="color in [
              'red',
              'yellow',
              'green',
              'white',
              'black',
              'blue',
            ]"
            class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
            :class="{
              'border-2 !border-blue-500':
                (vehicle as any).interior_color_id === color,
            }"
            @click="(vehicle as any).interior_color_id = color"
          >
            <div class="h-full" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.interior_type"
          label="Interior type"
          inline
        >
          <v-radio label="Leather" value="Leather" />
          <v-radio label="Cloth" value="Cloth" />
          <v-radio label="Vinyl" value="Vinyl" />
          <v-radio label="Alcantara" value="Alcantara" />
          <v-radio label="Wood" value="Wood" />
          <v-radio label="Other" value="Other" />
        </v-radio-group>
      </div>
      <div class="col-span-2">
        <v-radio-group
          v-model="vehicle.originality"
          label="Originallity"
          inline
        >
          <v-radio
            label="Original & highly original"
            value="Original & highly original"
          />
          <v-radio label="Modified" value="Modified" />
          <v-radio label="Restored-Modified" value="Restored-Modified" />
          <v-radio label="Restomod & Custom" value="Restomod & Custom" />
        </v-radio-group>
      </div>
      <div class="col-span-2">
        <v-radio-group v-model="vehicle.status" label="Status" inline>
          <v-radio label="Concours" value="Concours" />
          <v-radio label="Conserved" value="Conserved" />
          <v-radio label="Project" value="Project" />
        </v-radio-group>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useMaisonVehicleStore } from '@/store/datas/masionVehicle';
import { type Vehicle } from '@/store/vehicle/vehicle';
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import { storeToRefs } from 'pinia';

const store = useEditVehicleStore();
const { vehicle } = storeToRefs(store);
const emit = defineEmits(['submit']);
const router = useRouter();
const listOfBrands = ref()
const listOfFamilies = ref()
const tempBrandVal = ref<string>('')
const selectedBrand = ref()

const years = (() => {
  const from = 1800;
  const to = new Date().getFullYear();


  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
})();

onMounted(function(){
  vehicle.value.id_family = 0
  vehicle.value.id_brand = 0
  vehicle.value.model_id = 0
})

function updateBrand (val: object){
  vehicle.value.id_brand = selectedBrand.value.id

}
 function updateBrands (val: string){
  store.searchBrands(val)
  listOfBrands.value = []
  store.brands.forEach(function(value){
    // console.log(value.name)
    listOfBrands.value.push({
      id: value.id,
      name: value.name
    })

  })
}

function updateFamiliesAxios (val: any){
  const NameLikeVal = ref("")
  const brandFiltering = ref("")
//
  if(val !== "" && val !== 0 && val !== null)
    NameLikeVal.value = val

  if(vehicle.value.id_brand !== 0)
    brandFiltering.value = ",id_brand:" + vehicle.value.id_brand
  else {
    console.log("NULL")
    brandFiltering.value = '';
  }


  axios.get(
    "filter/bidwatcher_family/name_like:" + val + "/?page=1&size=50&search=with_id:true" + brandFiltering.value
    , {

      headers: {
        "authorization": 'Bearer '+localStorage.getItem('past_token')
      }
    })
    .then(response => {
      store.families = response.data.items
      // console.log(response)
      // store.families.forEach(function(value){
      //   // console.log(value.name)
      //   listOfFamilies.value.push({
      //     id: value.id,
      //     name: value.name
      //   })
      //
      // })
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Handle any errors
    });
  // console.log("Ciao")
}


watch(() => vehicle.value.id_family, (newVal, oldVal) => {
  console.log(`id_family changed from ${oldVal} to ${newVal}`);
  if (newVal !== null) {
    updateModelsAxios()  // Call the function when id_family changes
  }
});



function updateModelsAxios (val?: any){
  const familyFiltering = ref("")


  if(vehicle.value.id_brand !== 0)
    familyFiltering.value = ",id_family:" + vehicle.value.id_family
  else {
    console.log("NULL")
    familyFiltering.value = '';
  }


  axios.get(
    "/filter/bidwatcher_model/family_b/?page=1&size=50&search=with_id:true" + familyFiltering.value
    , {

      headers: {
        "authorization": 'Bearer '+localStorage.getItem('past_token')
      }
    })
    .then(response => {
      store.models = response.data.items
      // console.log(response)
      // store.families.forEach(function(value){
      //   // console.log(value.name)
      //   listOfFamilies.value.push({
      //     id: value.id,
      //     name: value.name
      //   })
      //
      // })
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Handle any errors
    });
  // console.log("Ciao")
}





console.log(store.brands)
</script>

<style scoped>
.selectBox {
  border: 1px solid #9a9a9a;
  padding: 10px 10px;
  height: 45px;
  border-radius: 4px;
  width: 100%;
}
.title-of-select {
  background-color: #F8F9FA;
  position: absolute;
  top: -11px;
  left: 9px;
  font-size: 14px;
  color: #888;
  padding: 0 7px;
}
</style>
