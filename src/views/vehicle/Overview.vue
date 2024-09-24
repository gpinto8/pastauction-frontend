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
        @update:search="store.searchBrands"
      />
      <span class="position-relative">
        <div class="title-of-select">Brand</div>
      <select
        class="selectBox"
        required
        v-model="vehicle.id_brand"
        name="selectBrand"
      >

        <option
          @select="store.searchFamilies"
          v-for="itemB in store.brands" :value="itemB.id">{{itemB.name}}</option>
      </select></span>


<!--        <v-autocomplete-->
<!--        @upda-->
<!--          required-->
<!--        @update:search="store.searchBrands"-->
<!--        :items="store.brands"-->
<!--        :loading="store.loading.brands"-->
<!--        label="Make"-->
<!--        item-title="name"-->
<!--        item-value="name"-->
<!--        variant="outlined"-->
<!--        density="compact"-->
<!--      />-->
      <!-- {{ store.families }} -->
<!--      <v-select-->
<!--        required-->
<!--        v-model="vehicle.id_family"-->

<!--        :items="store.families || []"-->
<!--        @update:search="store.searchFamilies"-->
<!--        @update:focused="store.searchFamilies"-->

<!--        :loading="store.loading.families"-->
<!--        item-value="id"-->
<!--        item-title="name"-->
<!--        label="Family"-->
<!--        variant="outlined"-->
<!--        density="compact"-->
<!--      />-->
      <span class="position-relative"
            @click="store.searchFamilies(null)"

      >
        <div class="title-of-select">Family</div>
      <select
        class="selectBox"
        required
        v-model="vehicle.id_family"
        @update:search="store.searchFamilies"
      >
        <option v-for="itemB in store .families" :value="itemB.id">{{itemB.name}}</option>
      </select></span>

      <v-autocomplete
        v-model="vehicle.model_id"
        :items="store.models"
        label="Model"
        item-value="id"
        item-title="family_a"
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
        <small class="font-semibold">Exteriour color</small>
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
        <small class="font-semibold">Interior color</small>
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMaisonVehicleStore } from '@/store/datas/masionVehicle';
import { type Vehicle } from '@/store/vehicle/vehicle';
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import { storeToRefs } from 'pinia';

const store = useEditVehicleStore();
const { vehicle } = storeToRefs(store);
const emit = defineEmits(['submit']);
const router = useRouter();

const years = (() => {
  const from = 1800;
  const to = new Date().getFullYear();


  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
})();

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
