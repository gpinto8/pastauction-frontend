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
  date_filter: 'all',
  model_id: 63072,
});

const sort = ref({
  brand_name: '',
});

const headers = ref([
  {
    title: '',
    align: 'start',
    sortable: false,
    key: 'view',
    thClass: 'bg-red-200',
  },

  {
    title: 'Year',
    align: 'start',
    sortable: false,
    key: 'year',
    thClass: 'bg-red-200',
  },
  {
    title: 'Brand',
    align: 'start',
    sortable: false,
    key: 'name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Model',
    align: 'start',
    sortable: false,
    key: 'model_name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Africa',
    align: 'start',
    sortable: false,
    key: 'Africa',
    thClass: 'bg-green-200',
  },
  {
    title: 'Asia',
    align: 'start',
    sortable: false,
    key: 'Asia',
    thClass: 'bg-green-200',
  },
  {
    title: 'Americhe',
    align: 'start',
    sortable: false,
    key: 'Americhe',
    thClass: 'bg-green-200',
  },
  {
    title: 'Europa',
    align: 'start',
    sortable: false,
    key: 'Europa',
    thClass: 'bg-green-200',
  },
  {
    title: 'UK',
    align: 'start',
    sortable: false,
    key: 'UK',
    thClass: 'bg-green-200',
  },
  {
    title: 'Online',
    align: 'start',
    sortable: false,
    key: 'Online',
    thClass: 'bg-green-200',
  },
  {
    title: 'Oceania',
    align: 'start',
    sortable: false,
    key: 'Oceania',
    thClass: 'bg-green-200',
  },
  {
    title: 'Japan',
    align: 'start',
    sortable: false,
    key: 'Japan',
    thClass: 'bg-green-200',
  },
  {
    title: 'Total',
    align: 'start',
    sortable: false,
    key: 'total',
    thClass: 'bg-yellow-100',
  },
]);

const filtersTag = ref([
  'yesterday',
  'week',
  'month',
  'quarter',
  'year',
  'all',
]);

const paginate = () => {
  store.auctionAlert(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );
};
paginate();

const updateFilter = (filterName: string) => {
  filters.value.date_filter = filterName;
  paginate();
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
        <h5 class="font-bold text-[20px]">Auction Alerts</h5>
        <div class="border-y-2 border-black py-2 flex gap-4 w-full my-4">
          <v-chip
            v-for="tag in filtersTag"
            :key="tag"
            @click="updateFilter(tag)"
            label
            class="filter-tag"
            :class="{
              '!bg-blue-500 text-white': filters.date_filter === tag,
            }"
          >
            {{ tag }}
          </v-chip>
        </div>
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
              <tr
                v-for="item in store.getListItems?.items.filter(
                  (el: any) => el.model_id !== -1
                )"
              >
                <td class="py-1 border-b text-[#212529]">
                  <router-link
                    :to="`/garage/detail/auction-alert-detail/${item.model_id}`"
                    class="text-blue-400"
                  >
                    View
                  </router-link>
                </td>
                <td
                  v-for="head in headers.filter(head => head.key !== 'view')"
                  class="py-1 border-b text-[#212529]"
                  :class="{ 'bg-yellow-100': head.key === 'total' }"
                >
                  {{ item[head.key] }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="w-full bg-yellow-100">
                <td colspan="4" class="py-1 border-b text-[#212529]" />
                <td
                  v-for="head in headers.filter(
                    head =>
                      !['view', 'year', 'name', 'model_name'].includes(head.key)
                  )"
                  class="py-1 border-b text-[#212529]"
                  :class="{ 'bg-yellow-200': head.key === 'total' }"
                >
                  {{
                    store.getListItems?.items.filter(
                      (el: any) => el.model_id === -1
                    )[0][head.key]
                  }}
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

.filter-tag {
  @apply border-y-2 py-2 flex gap-4 w-full justify-center capitalize bg-black text-white !h-10;
}
</style>
