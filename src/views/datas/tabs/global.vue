<template>
  <div class="py-4">
    <div class="p-4 bg-white mb-4">
      <div class="grid grid-cols-2 mb-4 justify-between items-center">
        <div class="text-[#D80027]">
          <span v-if="getLengthOfFilters < 3">
            Please, select almost 3 parameters
          </span>
        </div>
        <div class="text-right">
          <v-btn
            @click="paginate"
            class="!bg-primary text-white !rounded-sm w-[130px]"
          >
            Run search
          </v-btn>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-2">
        <v-select
          v-model="filters.auction_area"
          label="Area"
          item-title="area"
          item-value="area"
          variant="outlined"
          density="compact"
          :items="store.getListAreas"
        />
        <v-select
          v-model="filters.country_auction_name"
          label="Auction Country"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :return-object="false"
          :items="store.getListCountries"
        />
        <v-select
          v-model="filters.city_auction_name"
          label="Auction City"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListCities"
        />
        <v-select
          v-model="filters.name_event"
          label="Auction Event"
          item-title="name_event"
          item-value="name_event"
          variant="outlined"
          density="compact"
          :items="store.getListEvents"
        />
        <v-select
          v-model="filters.maison_name"
          label="Maison"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListMaison"
        />
        <v-select
          v-model="filters.country_maison"
          label="Maison Country"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListCountries"
        />
        <v-select
          v-model="filters.auction_year"
          label="Auction Year"
          item-title="year"
          item-value="year"
          variant="outlined"
          density="compact"
          :items="store.getListYears"
        />
      </div>
    </div>
    <div class="p-2 bg-white">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers as any"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/store/datas/global';

const store = useGlobalStore();

store.auctionAreas('bidwatcher_auction', 'area');
store.auctionCountries('bidwatcher_country', 'name');
store.auctionCities('bidwatcher_city', 'name');
store.auctionMaison('bidwatcher_maison', 'name');
store.auctionYear('bidwatcher_auction', 'year');
store.auctionEvents('bidwatcher_auction', 'name_event');

const filters = ref({
  auction_area: null,
  name_event: null,
  country_auction_name: null,
  country_maison: null,
  maison_name: null,
  city_auction_name: null,
  auction_year: null,
});

const sort = ref({
  auction_area: null,
  name_event: null,
  country_auction_name: null,
  country_maison: null,
  maison_name: null,
  city_auction_name: null,
  auction_year: null,
});

const itemsPerPage = ref(5);
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
    key: 'country_maison',
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

const pager = ref<any>({
  page: 1,
  size: 10,
});

const getLengthOfFilters = computed(
  () => Object.values(filters.value).filter(el => el !== null).length
);

const paginate = () => {
  store.listPaginated(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );
};
paginate();
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
