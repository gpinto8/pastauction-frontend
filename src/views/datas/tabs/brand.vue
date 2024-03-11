<template>
  <div class="py-4">
    <div class="p-4 bg-white mb-4">
      <div class="grid grid-cols-8 mb-4">
        <div>
          <div>Flag 1</div>
          <div>Flag 2</div>
        </div>
        <div class="col-span-7">
          <div class="space-y-4">
            <div>
              <v-chip
                v-for="brand in store.getListFirstLetters"
                class="ma-2"
                label
                color="black"
                :variant="
                  fakeFilters.brand_name_left_1 !== brand.left_1
                    ? 'outlined'
                    : 'tonal'
                "
                text-color="white"
                @click="
                  () => {
                    fakeFilters.brand_name_left_1 = brand.left_1;
                    filterByFirstLetter();
                  }
                "
              >
                {{ brand.left_1 }}
              </v-chip>
            </div>

            <div>
              <v-chip
                v-for="brand in store.getListFirstTwoLetters"
                class="ma-2"
                label
                color="black"
                :variant="
                  fakeFilters.brand_name_left_2 !== brand.left_1
                    ? 'outlined'
                    : 'tonal'
                "
                text-color="white"
                @click="
                  () => {
                    fakeFilters.brand_name_left_2 = brand.left_1;
                    listBrands();
                  }
                "
              >
                {{ brand.left_1 }}
              </v-chip>
            </div>

            <div class="grid grid-cols-5 gap-1">
              <div
                v-for="brand in store.getListBrands"
                class="whitespace-nowrap cursor-pointer"
                @click="
                  () => {
                    filters.brand_name = brand.name;
                    paginate();
                  }
                "
                :class="
                  filters.brand_name !== brand.name
                    ? 'text-grey-300'
                    : 'text-black'
                "
              >
                {{ brand.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 bg-white">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="(headers as any)"
        :items-length="store.getListItems?.total || 0"
        :items="store.getListItems?.items || []"
        :loading="store.getLoadingListItems"
        class="elevation-1"
        item-value="name"
        density="compact"
      >
        <template #bottom></template>
      </v-data-table>
    </div>
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
                    store.getListItems?.items[0]?.ratio_min_value_sales_sold?.toFixed(
                      2
                    )
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]
                      ?.total_estimation_min_value_sold
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]
                      ?.total_estimation_max_value_sold
                  }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.getListItems?.items[0]?.ratio_max_value_sales_sold?.toFixed(
                      2
                    )
                  }}
                </td>

                <td>
                  {{ store.getListItems?.items[0]?.total_sales_price_sold }}
                </td>
                <td>
                  {{ store.getListItems?.items[0]?.count_vehicle_sales_sold }}
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
                    store.getListItems?.items[0]?.ratio_min_value_sales_est?.toFixed(
                      2
                    )
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]?.total_estimation_min_value_est
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]?.total_estimation_max_value_est
                  }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.getListItems?.items[0]?.ratio_max_value_sales_est?.toFixed(
                      2
                    )
                  }}
                </td>

                <td>
                  {{ store.getListItems?.items[0]?.total_sales_price_est }}
                </td>
                <td>
                  {{ store.getListItems?.items[0]?.count_vehicle_sales_est }}
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
                    store.getListItems?.items[0]?.ratio_min_value_sales_all?.toFixed(
                      2
                    )
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]?.total_estimation_min_value_all
                  }}
                </td>
                <td>
                  {{
                    store.getListItems?.items[0]?.total_estimation_max_value_all
                  }}
                </td>
                <td class="!bg-red-500/20">
                  {{
                    store.getListItems?.items[0]?.ratio_max_value_sales_all?.toFixed(
                      2
                    )
                  }}
                </td>

                <td>
                  {{ store.getListItems?.items[0]?.total_sales_price_all }}
                </td>
                <td>
                  {{ store.getListItems?.items[0]?.count_vehicle_sales_all }}
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
import { ref } from 'vue';
import { useBrandStore } from '@/store/datas/brand';

const store = useBrandStore();

store.auctionLetters('bidwatcher_brand', 'name_left_1');

const filterByFirstLetter = () => {
  let qs = `search=name_left_1:${fakeFilters.value.brand_name_left_1}`;
  store.auctionTwoLetters('bidwatcher_brand', 'name_left_2', qs);
};

const listBrands = () => {
  let qs = `search=name_left_2:${fakeFilters.value.brand_name_left_2}`;
  store.auctionBrands('bidwatcher_brand', 'name', qs);
};

const fakeFilters = ref({
  brand_name_left_1: '',
  brand_name_left_2: null,
});
const tab = ref(null);
const filters = ref({
  brand_name: '',
});

const sort = ref({
  brand_name: '',
});

const itemsPerPage = ref(5);
const headers = ref([
  {
    title: 'Family',
    align: 'start',
    sortable: false,
    key: 'bw_family_name',
  },
  {
    title: 'Nr Vehicles',
    align: 'start',
    sortable: false,
    key: 'count_vehicles_offered',
  },
  {
    title: 'From',
    align: 'start',
    sortable: false,
    key: 'bw_model_year_begin',
  },
  {
    title: 'To',
    align: 'start',
    sortable: false,
    key: 'bw_model_year_end',
  },
  {
    title: 'Years',
    align: 'start',
    sortable: false,
    key: 'years_production',
  },
  {
    title: 'Production',
    align: 'start',
    sortable: false,
    key: 'bw_model_vehicles_produced',
  },
  {
    title: 'Source',
    align: 'start',
    sortable: false,
    key: 'bw_model_source',
  },
  {
    title: 'Model',
    align: 'start',
    sortable: false,
    key: 'bw_model_name',
  },
  {
    title: 'Serie',
    align: 'start',
    sortable: false,
    key: 'bw_model_series',
  },
  {
    title: 'Stage',
    align: 'start',
    sortable: false,
    key: 'bw_model_stage',
  },
  {
    title: 'Avg Min',
    align: 'start',
    sortable: false,
    key: 'estimation_min_value_e',
  },
  {
    title: 'Avg Max',
    align: 'start',
    sortable: false,
    key: 'estimation_max_value_e',
  },
  {
    title: 'Avg Sales',
    align: 'start',
    sortable: false,
    key: 'sales_price_e',
  },
]);

const pager = ref<any>({
  page: 1,
  size: 10,
});

const paginate = () => {
  store.listPaginated(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );
};
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
</style>
