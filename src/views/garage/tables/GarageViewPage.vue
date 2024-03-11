<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';
import { useGeneralStore } from '@/store/datas/general';

import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter();
const store = useGarageStore();
const generalStore = useGeneralStore();

const pager = ref<any>({
  page: 1,
  size: 10,
});

const filters = ref({
  garage_id: '0',
  year: 'same',
  gar_vehicle_id: 23,
});

const sort = ref({
  brand_name: '',
});

const loadedMedia = ref([]);
const headers = ref([
  {
    title: 'Photo',
    align: 'start',
    sortable: false,
    key: 'photo_photo',
    thClass: 'bg-red-200',
  },
  {
    title: 'Year',
    align: 'start',
    sortable: false,
    key: 'gar_vehicle_year',
    thClass: 'bg-red-200',
  },
  {
    title: 'Brand',
    align: 'start',
    sortable: false,
    key: 'brand_name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Model',
    align: 'start',
    sortable: false,
    key: 'bw_model_name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Status',
    align: 'start',
    sortable: false,
    key: 'gar_vehicle_status',
    thClass: 'bg-red-200',
  },
  {
    title: 'Purchase currency',
    align: 'start',
    sortable: false,
    key: 'purchase_currency',
    thClass: 'bg-yellow-200',
  },
  {
    title: 'Purchase value',
    align: 'start',
    sortable: false,
    key: 'purchase_value',
    thClass: 'bg-yellow-200',
  },
  {
    title: 'Purchase year',
    align: 'start',
    sortable: false,
    key: 'purchase_year',
    thClass: 'bg-yellow-200',
  },
  {
    title: 'Avg 36 mo',
    align: 'start',
    sortable: false,
    key: 'sales_avg_36',
    thClass: 'bg-green-200',
  },
  {
    title: 'Avg 24 mo',
    align: 'start',
    sortable: false,
    key: 'sales_avg_24',
    thClass: 'bg-green-200',
  },
  {
    title: 'Avg 6 mo',
    align: 'start',
    sortable: false,
    key: 'sales_avg_6',
    thClass: 'bg-green-200',
  },
  {
    title: '%',
    align: 'start',
    sortable: false,
    key: 'value_ratio',
    thClass: 'bg-blue-200',
  },
  {
    title: 'Result',
    align: 'start',
    sortable: false,
    key: 'value_difference',
    thClass: 'bg-blue-200',
  },
]);

const paginate = () => {
  store.garageView(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );
};
paginate();

const loadMedia = async (id: number, media: string) => {
  if (media !== 'string') {
    await generalStore.loadMedia(media).then(res => {
      if (
        loadedMedia.value?.length === 0 ||
        loadedMedia.value?.findIndex((el: any) => el.id === id) === -1
      )
      // @ts-ignore
        loadedMedia.value.push({ id: id, photo: res });
    });
  }
};
</script>
<template>
  <v-container fluid>
    <br />
    <v-btn icon size="small" @click="router.back()">
      <app-icon type="arrow_left" />
    </v-btn>
    <div>
      <div class="text-center">
        <h5 class="font-bold text-[20px]">Garage View</h5>
        <div class="p-2">
          <table class="table-auto bg-white w-full simple-table">
            <thead>
              <tr class="border-y-2 border-black py-1">
                <th v-for="head in headers" :class="head.thClass">
                  {{ head.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in store.getListItems?.items">
                <td
                  v-for="head in headers"
                  class="py-1 border-b text-[#212529]"
                >
                  <span v-if="head.key === 'photo_photo'">
                    <span class="hidden">
                      {{ loadMedia(item.id, item.photo_photo) }}
                    </span>

                    <v-img
                      :src="(loadedMedia.find((el: any) => el.id === item.id) as any)?.photo"
                      width="50"
                      height="50"
                    />
                  </span>
                  <span v-else>
                    {{ item[head.key] }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="w-full bg-yellow-200">
                <td colspan="2"></td>
                <td>Total</td>
                <td>{{ store.getListItems?.items[0].count ?? '-' }}</td>
                <td>
                  {{ store.getListItems?.items[0].purchase_value_tot ?? '-' }}
                </td>
                <td></td>
                <td></td>
                <td>
                  {{
                    store.getListItems?.items[0].sales_avg_36_tot.toFixed(2) ??
                    '-'
                  }}
                </td>
                <td></td>
                <td>
                  {{
                    store.getListItems?.items[0].sales_avg_24_tot.toFixed(2) ??
                    '-'
                  }}
                </td>
                <td>
                  {{ store.getListItems?.items[0].sales_avg_6_tot ?? '-' }}
                </td>
                <td>
                  {{ store.getListItems?.items[0].value_ratio_tot ?? '-' }}
                </td>
                <td>
                  {{ store.getListItems?.items[0].value_difference_tot ?? '-' }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style lang="postcss">
table {
  th,
  td {
    @apply p-2;
  }
}
</style>
