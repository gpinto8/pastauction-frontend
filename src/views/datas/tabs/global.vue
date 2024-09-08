<template>
  <div class="py-4">
    <Filters :store="store" :headers="headers" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { queryStore, Columns } from '@/store/datas/query-store';
import { onBeforeUnmount } from 'vue';
import Filters from '../filters.vue';

const useStore = queryStore('query_0');
const store = useStore();

store.init();

const headers = ref([
  {
    title: 'Maison',
    align: 'start',
    sortable: false,
    key: 'maison_name',
  },
  {
    title: 'Auction event',
    align: 'start',
    sortable: false,
    key: 'name_event',
  },
  {
    title: 'Auction country',
    align: 'start',
    sortable: false,
    key: 'country_auction_name',
  },
  {
    title: 'Auction city',
    align: 'start',
    sortable: false,
    key: 'city_auction_name',
  },
  {
    title: 'Date',
    align: 'start',
    sortable: false,
    key: 'auction_data',
  },
  {
    title: 'Nr. Vehicles',
    align: 'start',
    sortable: false,
    key: 'number_vehicles',
  },
  {
    title: '% sold',
    align: 'start',
    sortable: false,
    key: 'ratio_sales',
  },
  {
    title: 'Total sales',
    align: 'start',
    sortable: false,
    key: 'gc_vehicles_sold',
  },
  {
    title: 'Avg sales',
    align: 'start',
    sortable: false,
    key: 'avg_sales',
  },
  {
    title: 'Top solds',
    align: 'start',
    sortable: false,
    key: 'gc_vehicles_sold',
  },
]);

onBeforeUnmount(() => {
  store.clear();
  store.clearResults();
});
</script>
