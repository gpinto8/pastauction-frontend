<template>
  <div class="py-4">
    <div class="p-4 mb-4">
      <div class="grid grid-cols-7 mb-4 bg-white p-4">
        <div class="col-span-2">
          <div>Flag 1</div>
          <div>Flag 2</div>
        </div>
        <div class="col-span-5">
          <div class="grid grid-cols-3 gap-10">
            <v-text-field
              v-model="filters.bw_family_name"
              placeholder="family"
              required
              variant="outlined"
              density="compact"
              hide-details
            />

            <v-text-field
              v-model="filters.bw_model_year_begin"
              placeholder="from"
              required
              variant="outlined"
              density="compact"
              hide-details
            />

            <v-text-field
              v-model="filters.years_production"
              placeholder="yrs product"
              required
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-text-field
              v-model="filters.bw_model_name"
              placeholder="model"
              required
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-text-field
              v-model="filters.bw_model_year_end"
              placeholder="to"
              required
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-text-field
              v-model="filters.bw_model_vehicles_produced"
              placeholder="nr product"
              required
              variant="outlined"
              density="compact"
              hide-details
            />
          </div>
          <div class="text-right mt-4">
            <v-btn
              @click="paginate()"
              class="!bg-primary text-white !rounded-sm w-[130px]"
            >
              Run search
            </v-btn>
          </div>
        </div>
      </div>
      <div
        v-for="item in store.getListItems?.items"
        class="flex gap-10 w-full p-4 bg-white mb-4"
      >
        <span class="hidden">{{ loadMedia(item.id, item.brand_logo) }}</span>
        <div>
          <v-img
            :src="loadedMedia.find(el => el.id === item.id)?.photo"
            width="200"
            height="200"
          />
        </div>
        <div class="grid grid-cols-2 gap-10 w-full">
          <div class="space-y-4">
            <div class="space-x-6">
              <span class="text-lg font-bold">{{ item.brand_name }}</span>
              <span>{{ item.vehicle_year }}</span>
            </div>
            <div class="space-x-6">
              <span class="text-sm uppercase font-medium">
                {{ item.bw_model_name }}
              </span>
              <span>{{ item.version }}</span>
            </div>
            <div class="space-x-6">
              <span class="italic text-sm">chassis n.</span>
              <span>{{ item.chassis }}</span>
              <span class="italic text-sm">Engine n.</span>
              <span class="italic text-sm">{{ item.number_engine }}</span>
            </div>
            <hr />
            <div class="flex justify-between">
              <span class="font-medium">{{ item.maison_name }}</span>
              <span>{{ item.name_event }}</span>
              <span class="italic text-sm">Lot n.</span>
              <span>{{ item.lot }}</span>
            </div>
          </div>
          <div>
            <table class="table-auto bg-white w-full">
              <thead>
                <tr>
                  <td class="italic text-right py-2">EUR min</td>
                  <td class="italic text-right py-2">EUR max</td>
                  <td class="italic text-right py-2">EUR sale</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-right py-2">
                    {{ item.estimation_min_value_e }}
                  </td>
                  <td class="text-right py-2">
                    {{ item.estimation_max_value_e }}
                  </td>
                  <td class="text-right py-2">{{ item.sales_price_e }}</td>
                </tr>
                <tr>
                  <td class="text-right py-2">
                    {{ item.ratio_min_value_sales_onlyes }}%
                  </td>
                  <td class="text-right py-2">
                    {{ item.ratio_min_value_sales_onlyes }}%
                  </td>
                  <td class="text-right py-2">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
import { useModelStore } from '@/store/datas/model';
import { useGeneralStore } from '@/store/datas/general';

const store = useModelStore();
const generalStore = useGeneralStore();

const tab = ref(null);
const filters = ref({
  bw_family_name: '',
  bw_model_name: '',
  bw_model_year_begin: '',
  bw_model_year_end: '',
  years_production: '',
  bw_model_vehicles_produced: '',
  bw_model_id: 52815,
});

const pager = ref<any>({
  page: 1,
  size: 10,
});
const loadedMedia = ref([]);
const paginate = () => {
  store.listPaginated(pager.value.page, pager.value.size, filters.value);
};

paginate();

const loadMedia = async (id: number, media: string) => {
  await generalStore.loadMedia(media).then(res => {
    if (
      loadedMedia.value?.length === 0 ||
      loadedMedia.value?.findIndex(el => el.id === id) === -1
    )
      loadedMedia.value.push({ id: id, photo: res });
  });
  console.log(loadedMedia);
  return loadedMedia;
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
