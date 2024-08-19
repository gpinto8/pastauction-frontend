<template>
  <div class="py-4">
    <form
      class="p-4 bg-white mb-4 flex flex-column gap-4"
      @submit.prevent="submit"
    >
      <div class="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 gap-5">
        <v-autocomplete
          v-model="filters.auction_area"
          label="Area"
          item-title="area"
          item-value="area"
          variant="outlined"
          density="compact"
          :items="store.getListAreas"
        />
        <v-autocomplete
          v-model="filters.country_auction_name"
          label="Auction Country"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :return-object="false"
          :items="store.getListCountries"
        />
        <v-autocomplete
          v-model="filters.city_auction_name"
          label="Auction City"
          @update:search="store.searchCities"
          :loading="store.loading.cities"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListCities"
        />
        <v-autocomplete
          v-model="filters.name_event"
          label="Auction Event"
          @update:search="store.searchEvents"
          :loading="store.loading.events"
          item-title="name_event"
          item-value="name_event"
          variant="outlined"
          density="compact"
          :items="store.getListEvents"
        />
        <v-autocomplete
          v-model="filters.maison_name"
          label="Maison"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListMaison"
        />
        <v-autocomplete
          v-model="filters.country_maison"
          label="Maison Country"
          item-title="name"
          item-value="name"
          variant="outlined"
          density="compact"
          :items="store.getListCountries"
        />
        <v-autocomplete
          v-model="filters.auction_year"
          label="Auction Year"
          item-title="year"
          item-value="year"
          variant="outlined"
          density="compact"
          :items="store.getListYears"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-3 justify-between items-center">
        <div class="text-[#D80027]">
          <span v-if="store.filterAmount < 3">
            Please, select at least 3 parameters
          </span>
        </div>
        <div class="flex justify-end gap-3">
          <v-btn
            @click="submit"
            :disabled="store.loading.submit"
            class="!bg-primary text-white !rounded-sm w-[130px]"
          >
            Run search
          </v-btn>
          <v-btn
            @click="clear"
            :disabled="store.filterAmount === 0"
            class="!bg-primary text-white !rounded-sm w-[130px]"
          >
            Clear
          </v-btn>
        </div>
      </div>
    </form>
    <div class="p-2">
      <div class="mb-5 grid md:grid-cols-2 gap-3 md:max-w-[500px]">
        <!-- <div> -->
        <v-autocomplete
          v-model="store.orderBy"
          label="Order by"
          item-title="title"
          item-value="key"
          variant="solo"
          density="comfortable"
          :items="headers"
        />
        <v-select
          v-model="store.orderByDirection"
          label="Direction"
          item-title="title"
          item-value="key"
          variant="solo"
          density="comfortable"
          :items="[
            { title: 'Ascending', key: 'asc' },
            { title: 'Descending', key: 'desc' },
          ]"
        />
        <!-- </div> -->
      </div>

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

  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    location="top right"
  >
    <div class="flex gap-1 justify-between">
      {{ snackbar.text }}
      <Button
        classes="min-w-[100px] ml-2"
        variant="white"
        @click="snackbar.show = false"
      >
        Close
      </Button>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/store/datas/global';
import { snackbarState } from '@/lib/snackbar-state';
import Button from '@/components/common/button.vue';
import { onBeforeUnmount } from 'vue';

const store = useGlobalStore();
store.init();

const snackbar = snackbarState();

const filters = store.filters;

const sort = store.sort;

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

const pager = store.pager;
function submit() {
  store.submit().catch(error => {
    snackbar.value.show = true;
    snackbar.value.text =
      error.message ||
      'There was an error while fetching data, please try again';
    snackbar.value.color = 'error';
  });
}
function clear() {
  store.clear();
}

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
