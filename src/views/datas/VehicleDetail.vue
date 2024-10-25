<template>
  <v-container class="py-6">
    <v-btn icon size="small" @click="router.back()">
      <app-icon type="arrow_left" />
    </v-btn>
    <div class="mt-4">
      <h4 class="font-bold">
        {{ store.getListItems?.vehicle_original_descr }}
      </h4>
    </div>

    <div class="grid grid-cols-6 gap-4">
      <div class="col-span-4 space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="font-bold">
            ${{ store.getListItems?.sales_price_e }} USD
          </h4>
          <div class="px-6 py-1 rounded-sm shadow-lg bg-yellow-500">SOLD</div>
        </div>
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            cover
          ></v-carousel-item>
        </v-carousel>

        <v-card class="p-4">
          <h6 class="font-bold text-lg">Description</h6>
          <p class="text-sm text-grey-900">
            {{ store.getListItems?.vehicle_description }}
          </p>

          <br />

          <button
            type="button"
            class="text-blue-500 text-sm flex gap-3 mt-4 items-center"
          >
            <span>View full description</span>
            <app-icon type="chevron_down" size="16" />
          </button>
        </v-card>
        <v-card class="p-4">
          <h6 class="font-bold text-lg mb-2">Event information</h6>
          <div>
            Event data:
            <span class="font-medium">
              {{ store.getListItems?.auction_data }}
            </span>
          </div>
          <div>
            Lot num:
            <span class="font-medium">{{ store.getListItems?.lot }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <img src="@/assets/images/flags/US.png" alt="" />
            <!-- <img src="@/assets/images/flags/Logo_Sotheby 1.png" alt="" /> -->
            <span class="font-medium">
              {{ store.getListItems?.maison_name }}
            </span>
          </div>
          <div class="flex gap-2 items-start">
            <img src="@/assets/images/flags/DE.png" alt="" />
            <p>
              <span class="font-medium">
                {{ store.getListItems?.name_event }}
              </span>
              <br />
              <span class="text-grey">
                {{ store.getListItems?.auction_address }}
              </span>
            </p>
          </div>
        </v-card>
        <v-card class="p-4">
          <h6 class="font-bold text-lg mb-2">market data</h6>
          <v-table>
            <thead>
              <tr>
                <th></th>
                <th>Currency</th>
                <th>Min eval.</th>
                <th>max eval.</th>
                <th>High bid</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Original</th>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.currency }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.estimation_min_value }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.estimation_max_value }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.best_offer }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.sales_price }}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Choosen</th>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.currency }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.estimation_min_value_e }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.estimation_max_value_e }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.best_offer }}
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.sales_price_e }}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Last 24 mo</th>
                <td>
                  <span class="px-6 py-2 rounded-sm shadow-lg">
                    {{ store.getListItems?.currency }}
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-teal-100 text-teal-500 flex items-center gap-1"
                  >
                    <AppIcon type="arrow_up" size="14" />
                    <span>
                      {{ store.getListItems?.min_value_euro_mean_24 }}
                    </span>
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-teal-100 text-teal-500 flex items-center gap-1"
                  >
                    <AppIcon type="arrow_up" size="14" />
                    <span>
                      {{ store.getListItems?.max_value_euro_mean_24 }}
                    </span>
                  </span>
                </td>
                <td>
                  <span class="px-6 py-1 rounded-sm shadow-lg">
                    {{ store.getListItems?.best_offer }}
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-teal-100 text-teal-500 flex items-center gap-1"
                  >
                    <AppIcon type="arrow_up" size="14" />
                    <span>
                      {{ store.getListItems?.sales_price_euro_mean_24 }}
                    </span>
                  </span>
                </td>
              </tr>
              <tr>
                <th>Last 5 ys</th>
                <td>
                  <span class="px-6 py-2 rounded-sm shadow-lg">
                    {{ store.getListItems?.currency }}
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-danger-100 text-danger flex items-center gap-1"
                  >
                    <AppIcon type="arrow_down" size="10" />
                    <span>
                      {{ store.getListItems?.min_value_euro_mean_60 }}
                    </span>
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-danger-100 text-danger flex items-center gap-1"
                  >
                    <AppIcon type="arrow_down" size="10" />
                    <span>
                      {{ store.getListItems?.max_value_euro_mean_60 }}
                    </span>
                  </span>
                </td>
                <td>
                  <span class="px-4 py-2 rounded-sm shadow-lg">
                    {{ store.getListItems?.best_offer }}
                  </span>
                </td>
                <td>
                  <span
                    class="px-2 py-1 rounded-sm shadow-lg bg-teal-100 text-teal-500 flex items-center gap-1"
                  >
                    <AppIcon type="arrow_up" size="14" />
                    <span>
                      {{ store.getListItems?.sales_price_euro_mean_60 }}
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
      <div class="col-span-2 pt-12">
        <v-card class="p-4">
          <h6 class="font-semibold text-lg mb-4">Technical data</h6>
          <v-table class="text-grey-900 text-base" density="compact">
            <tbody>
              <tr>
                <td class="font-medium">Brand</td>
                <td class="text-right">
                  {{ store.getListItems?.brand_name }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Family</td>
                <td class="text-right">
                  {{ store.getListItems?.bw_family_name }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Model</td>
                <td class="text-right">
                  {{ store.getListItems?.bw_model_name }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Series</td>
                <td class="text-right">
                  {{ store.getListItems?.vehicle_series }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Stage</td>
                <td class="text-right">
                  {{ store.getListItems?.vehicle_stage }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Version</td>
                <td class="text-right">{{ store.getListItems?.version }}</td>
              </tr>
              <tr>
                <td class="font-medium">Year</td>
                <td class="text-right">
                  {{ store.getListItems?.vehicle_year }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Plate</td>
                <td class="text-right">
                  {{ store.getListItems?.plate_number }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Period</td>
                <td class="text-right">{{ store.getListItems?.age_name }}</td>
              </tr>
              <tr>
                <td class="font-medium">Chassis</td>
                <td class="text-right">{{ store.getListItems?.chassis }}</td>
              </tr>
              <tr>
                <td class="font-medium">Engine</td>
                <td class="text-right">
                  {{ store.getListItems?.number_engine }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Transmission</td>
                <td class="text-right">
                  {{ store.getListItems?.transmission_type }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Capacity</td>
                <td class="text-right">
                  {{ store.getListItems?.displacement }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Power</td>
                <td class="text-right">
                  {{ store.getListItems?.vehicle_power }}
                </td>
              </tr>
              <tr>
                <td class="font-medium">Km</td>
                <td class="text-right">
                  {{ store.getListItems?.vehicle_km }} km
                </td>
              </tr>
              <tr>
                <td class="font-medium">Interior color</td>
                <td class="text-right">
                  <div
                    v-if="store.getListItems?.interior_color"
                    class="flex gap-3 justify-end"
                  >
                    <app-icon
                      type="circle"
                      :color="store.getListItems?.interior_color"
                    />
                    <span>{{ store.getListItems?.interior_color }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-medium">Exterior color</td>
                <td class="text-right">
                  <div
                    v-if="store.getListItems?.color_main_name"
                    class="flex gap-3 justify-end"
                  >
                    <app-icon
                      type="circle"
                      :color="store.getListItems?.color_main_name"
                    />
                    <span>
                      <span>{{ store.getListItems?.color_main_name }}</span>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-medium">Body</td>
                <td class="text-right">{{ store.getListItems?.shape }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        <v-btn
          class="!bg-primary text-white w-full !rounded mt-4 normal-case"
          @click="handleReportError"
        >
          Report error
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVehicleStore } from '@/store/datas/singleDetailVehicle';

import AppIcon from '@/components/common/AppIcon.vue';

const route = useRoute();
const router = useRouter();
const store = useVehicleStore();
const id = route.params.id || 802213;

store.listPaginated(1, 50, { vehicle_id: 802213 }, {});

const items = ref([
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  },
]);

const handleReportError = () => {
  if (id) router.push({ path: `/vehicle_update/${id}` });
};
</script>
