<template>
  <div class="py-4">
    <Filters :store="store" :headers="headers" />
    <div>
      <v-data-table
        v-model:items-per-page="pager.size"
        :headers="headers as any"
        :items-length="store.pager.total || 0"
        :items="store.queryItems"
        :loading="store.loading.submit"
        class="elevation-1"
        item-value="name"
        density="compact"
      >
        <template class="" #top></template>
        <template class="" #bottom>
          <v-pagination
            :disabled="store.loading.submit"
            :length="store.pager.pages"
            v-model="store.pager.page"
            total-visible="6"
          />
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { queryStore, Columns } from '@/store/datas/global';
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

const pager = store.pager;

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

  td,
  th {
    white-space: nowrap;
  }
}
.v-input__details {
  display: none;
}
</style>
