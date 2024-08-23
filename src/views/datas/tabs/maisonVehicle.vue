<template>
  <div class="py-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="p-4 bg-white mb-4 col-span-2">
        <h6 class="font-bold text-lg">Event information</h6>
        <span>
          Event data:
          {{ store.queryItems[0]?.auction_data || '12/04/2023' }}
        </span>
        <div>
          <img :src="store.queryItems[0]?.flag_maison_url" />
          {{ store.queryItems[0]?.maison_name }}
        </div>
        <div class="space-x-4">
          <img :src="store.queryItems[0]?.flag_auction_url" />
          <span>{{ store.queryItems[0]?.name_event }}</span>
          <a href="#" class="text-blue underline font-medium">Vehicles</a>
          <a href="#" class="text-blue underline font-medium">Event</a>
          <br />
          <p class="text-[#6C757D]">
            {{
              store.queryItems[0]?.auction_address ||
              'Gruga Hall, Norbertstrabe 2, 45131, Essen (DEU)'
            }}
          </p>
        </div>
      </div>
      <div class="p-4 bg-white mb-4 max-h-[205px] overflow-y-auto">
        <div class="grid grid-cols-2">
          <div class="space-y-4">
            <div>
              Vehicles on sale:
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.count_vehicle_sales_all || '-' }}
              </span>
            </div>
            <div>
              Vehicles sold nr:
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.count_sales || '-' }}
              </span>
            </div>
            <div>
              Vehicles sold %
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.ratio_sales?.toFixed(2) || '-' }}
              </span>
            </div>
            <div>
              lower evaluation
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.min_sold || '-' }}
              </span>
            </div>
            <div>
              higher evaluation
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.max_sales_price_gt || '-' }}
              </span>
            </div>
            <div>
              average sales price
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.average_sales?.toFixed(2) || '-' }}
              </span>
            </div>
            <div>
              Vehicles evalueted
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.count_with_estimations || '-' }}
              </span>
            </div>
            <div>
              Vehicles evalueted sold
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.count_vehicle_sales_est_gt || '-' }}
              </span>
            </div>
            <div>
              Vehicles "no reserve"
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.total_no_reserve_price || '-' }}
              </span>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              lots nr.
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.lot_numeric || '-' }}
              </span>
            </div>
            <div>
              lower lot nr
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.lower_lot_number || '-' }}
              </span>
            </div>
            <div>
              higher lot nr
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.higher_lot_number || '-' }}
              </span>
            </div>
            <div>
              teoretical_lots
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.teoretical_lots || '-' }}
              </span>
            </div>

            <div>
              deviation_lots
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.deviation_lots || '-' }}
              </span>
            </div>
            <div>
              Vehicles with photo
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.with_photo || '-' }}
              </span>
            </div>
            <div>
              photo gallery nr
              <span class="border rounded sm p-1">
                {{ store.queryItems[0]?.count_galleries || '-' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section D-->
    <table class="table-auto bg-white w-full simple-table">
      <caption>Title</caption>
      <thead>
        <tr>
          <th>{{ store.queryItems[0]?.count_estimations_zero }}</th>
          <th>{{ store.queryItems[0]?.count_within_min_less_50 }}</th>
          <th>{{ store.queryItems[0]?.count_sales_lower_min_50 }}</th>
          <th>{{ store.queryItems[0]?.count_into_evaluetion }}</th>
          <th>{{ store.queryItems[0]?.count_sales_higher_max_50 }}</th>
          <th>
            {{ store.queryItems[0]?.count_higher_than_max_plus_50 }}
          </th>
          <th>
            {{ store.queryItems[0]?.unsold_vehicles }}
          </th>
          <th>
            {{ store.queryItems[0]?.number_vehicles }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>No evaluation</td>
          <td class="!bg-red-500/20">Under 50%</td>
          <td class="bg-yellow-500/20">Under min eval</td>
          <td class="bg-green-500/20">Into evaluation</td>
          <td class="bg-blue-500/20">Over max eval</td>
          <td class="bg-purple-500/20">Over 50%</td>
          <td>Not sold</td>
          <td>Total</td>
        </tr>
        <tr>
          <td></td>
          <td>
            {{ store.queryItems[0]?.count_within_min_less_50_100 }}
          </td>
          <td>
            {{ store.queryItems[0]?.count_sales_lower_min_50_100 }}
          </td>
          <td>{{ store.queryItems[0]?.count_into_evaluetion_100 }}</td>
          <td>
            {{ store.queryItems[0]?.count_sales_higher_max_50_100 }}
          </td>
          <td>
            {{ store.queryItems[0]?.count_higher_than_max_plus_50_100 }}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <Filters :store="store" :headers="headers" @click:row="handleClick" />

    <v-card-text class="mt-5 bg-white p-2">
      <v-tabs v-model="tab" bg-color="transparent" class="mb-4">
        <v-tab value="one">Only sold</v-tab>
        <v-tab value="two">Only eval</v-tab>
        <v-tab value="three">All Vehicle</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="one">
          <table class="table-auto bg-white w-full simple-table">
            <thead>
              <tr>
                <th class="bg-grey-200">Min/Sales</th>
                <th class="bg-grey-200">∑ min eval</th>
                <th class="bg-grey-200">∑ max eval</th>
                <th class="bg-grey-200">Max/Sales</th>
                <th class="bg-grey-200">∑ sales</th>
                <th class="bg-grey-200">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_min_value_sales_sold?.toFixed(2)
                  }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_min_value_sold }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_max_value_sold }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_max_value_sales_sold?.toFixed(2)
                  }}
                </td>

                <td>
                  {{ store.queryItems[0]?.total_sales_price_sold }}
                </td>
                <td>
                  {{ store.queryItems[0]?.count_vehicle_sales_sold }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-window-item>
        <v-window-item value="two">
          <table class="table-auto bg-white w-full simple-table">
            <thead>
              <tr>
                <th class="bg-grey-200">Min/Sales</th>
                <th class="bg-grey-200">∑ min eval</th>
                <th class="bg-grey-200">∑ max eval</th>
                <th class="bg-grey-200">Max/Sales</th>
                <th class="bg-grey-200">∑ sales</th>
                <th class="bg-grey-200">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_min_value_sales_est?.toFixed(2)
                  }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_min_value_est }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_max_value_est }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_max_value_sales_est?.toFixed(2)
                  }}
                </td>

                <td>
                  {{ store.queryItems[0]?.total_sales_price_est }}
                </td>
                <td>
                  {{ store.queryItems[0]?.count_vehicle_sales_est }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-window-item>
        <v-window-item value="three">
          <table class="table-auto bg-white w-full simple-table">
            <thead>
              <tr>
                <th class="bg-grey-200">Min/Sales</th>
                <th class="bg-grey-200">∑ min eval</th>
                <th class="bg-grey-200">∑ max eval</th>
                <th class="bg-grey-200">Max/Sales</th>
                <th class="bg-grey-200">∑ sales</th>
                <th class="bg-grey-200">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_min_value_sales_all?.toFixed(2)
                  }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_min_value_all }}
                </td>
                <td>
                  {{ store.queryItems[0]?.total_estimation_max_value_all }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.queryItems[0]?.ratio_max_value_sales_all?.toFixed(2)
                  }}
                </td>

                <td>
                  {{ store.queryItems[0]?.total_sales_price_all }}
                </td>
                <td>
                  {{ store.queryItems[0]?.count_vehicle_sales_all }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import router from '@/router';
import Filters from '../filters.vue';
import { queryStore } from '@/store/datas/global';

const useStore = queryStore('query_2v');
const store = useStore();
store.init();
const tab = ref(null);
const itemsPerPage = ref(5);
const headers = ref([
  {
    title: 'Date',
    align: 'start',
    sortable: false,
    key: 'auction_data',
  },
  {
    title: 'Event Name',
    align: 'start',
    sortable: false,
    key: 'name_event',
  },
  {
    title: 'City',
    align: 'start',
    sortable: false,
    key: 'city_auction_name',
  },
  {
    title: 'Country',
    align: 'start',
    sortable: false,
    key: 'country_auction_name',
  },
  {
    title: 'Year',
    align: 'start',
    sortable: false,
    key: 'vehicle_year',
  },
  {
    title: 'Brand',
    align: 'start',
    sortable: false,
    key: 'brand_name',
  },
  {
    title: 'Model',
    align: 'start',
    sortable: false,
    key: 'model_name',
  },
  {
    title: 'Val min',
    align: 'start',
    sortable: false,
    key: 'estimation_min_value_e',
  },
  {
    title: 'Val max',
    align: 'start',
    sortable: false,
    key: 'estimation_mxn_value_e',
  },
  {
    title: 'Change',
    align: 'start',
    sortable: false,
    key: 'currency',
  },
  {
    title: 'Vendita',
    align: 'start',
    sortable: false,
    key: 'sales_price_e',
  },
  {
    title: 'Photo',
    align: 'start',
    sortable: false,
    key: 'logo_test',
  },
  {
    title: 'Lot',
    align: 'start',
    sortable: false,
    key: 'lot',
  },
]);

// @ts-ignore
const handleClick = (item, row) => {
  console.log('click', { item, row });
  console.log('click', row.item.raw.vehicle_id);
  router.push({
    name: 'VehicleDetail',
    params: {
      id: row.item.raw.vehicle_id,
    },
  });
};

onBeforeUnmount(() => {
  store.clear();
  store.clearResults();
});
</script>

<style lang="postcss">
.v-table {
  thead tr {
    th {
      @apply !bg-[#0D6EFD]/20 text-sm font-medium;
    }
  }

  tbody tr {
    &:nth-child(odd) {
      td {
        @apply !bg-white;
      }
    }
    &:nth-child(even) {
      td {
        @apply !bg-gray-50;
      }
    }
  }
}

.simple-table {
  @apply mb-4;
  caption {
    @apply py-1 bg-grey-100 font-medium;
  }
  td,
  th {
    @apply p-1 text-center border border-grey-100;
  }
}
</style>
