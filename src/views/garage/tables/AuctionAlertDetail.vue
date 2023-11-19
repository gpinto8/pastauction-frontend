<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGarageStore } from '@/store/garage';

import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter();
const route = useRoute();
const store = useGarageStore();

const pager = ref<any>({
  page: 1,
  size: 10,
});

const filters = ref({
  garage_id: '0',
  date_filter: 'all',
  model_id: route.params.id,
});

const sort = ref({
  brand_name: '',
});

const headers = ref([
  {
    title: 'Year',
    align: 'start',
    sortable: false,
    key: 'bw_vehicle_year',
    thClass: 'bg-red-200',
  },
  {
    title: 'Shape',
    align: 'start',
    sortable: false,
    key: 'shape',
    thClass: 'bg-red-200',
  },
  {
    title: 'Auctioneer',
    align: 'start',
    sortable: false,
    key: 'auctioneer',
    thClass: 'bg-red-200',
  },
  {
    title: 'Country',
    align: 'start',
    sortable: false,
    key: 'country',
    thClass: 'bg-green-200',
  },
  {
    title: 'Event',
    align: 'start',
    sortable: false,
    key: 'event',
    thClass: 'bg-green-200',
  },
  {
    title: 'Date',
    align: 'start',
    sortable: false,
    key: 'date',
    thClass: 'bg-green-200',
  },

  {
    title: 'Lot',
    align: 'start',
    sortable: false,
    key: 'lot',
    thClass: 'bg-green-200',
  },
  {
    title: 'Min val',
    align: 'start',
    sortable: false,
    key: 'est_min_value',
    thClass: 'bg-green-200',
  },
  {
    title: 'Max val',
    align: 'start',
    sortable: false,
    key: 'est_max_value',
    thClass: 'bg-green-200',
  },
  {
    title: 'Reserve',
    align: 'start',
    sortable: false,
    key: 'est_reserve_price',
    thClass: 'bg-green-200',
  },
  {
    title: 'Currency',
    align: 'start',
    sortable: false,
    key: 'est_currency',
    thClass: 'bg-yellow-100',
  },
  {
    title: '',
    align: 'start',
    sortable: false,
    key: 'vehicle_loved',
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
  store.auctionAlertDetail(
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
      <v-card class="my-12" max-width="374">
        <div>
          <v-carousel
            :continuous="false"
            :show-arrows="false"
            hide-delimiter-background
            height="300"
          >
            <v-carousel-item
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              cover
            ></v-carousel-item>
            <v-carousel-item
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              cover
            ></v-carousel-item>
          </v-carousel>
        </div>

        <v-card-title>Jaguar E Type III 1876</v-card-title>
        <v-card-text class="text-[#5E5E5E] pb-2">
          {{}}
          <div>
            • {{ store.getListItems?.items[0]?.garage_brand }} •
            {{ store.getListItems?.items[0]?.model_name }} •
            {{ store.getListItems?.items[0]?.bw_vehicle_year }}
          </div>
          <div>•Restored-Modified</div>
        </v-card-text>

        <v-card-title class="flex gap-3 items-center !pt-0">
          <div>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_175_5340)">
                <path
                  d="M10.6667 0.332886H0V16.3328H16V0.332886H10.6667Z"
                  fill="white"
                />
                <path
                  d="M0 0.333008H5.33322V16.3332H0V0.333008Z"
                  fill="#6DA544"
                />
                <path
                  d="M10.667 0.332764H16.0002V16.333H10.667V0.332764Z"
                  fill="#D80027"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_5340">
                  <rect
                    y="0.333008"
                    width="16"
                    height="16"
                    rx="8"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <small>{{ store.getListItems?.items[0]?.country }}</small>
        </v-card-title>
      </v-card>

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
              <tr v-for="item in store.getListItems?.items">
                <td
                  v-for="head in headers.filter(head => head.key !== 'view')"
                  class="py-1 border-b text-[#212529]"
                  :class="{ 'bg-yellow-100': head.key === 'total' }"
                >
                  <router-link
                    v-if="head.key === 'shape'"
                    to="/garage/detail/social-media-rumors-detail"
                    class="text-blue-500 underline"
                  >
                    {{ item[head.key] }}
                  </router-link>
                  <span v-else-if="head.key === 'vehicle_loved'">
                    <v-icon v-if="item.vehicle_loved">mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                  </span>
                  <span v-else>
                    {{ item[head.key] }}
                  </span>
                </td>
              </tr>
            </tbody>
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
