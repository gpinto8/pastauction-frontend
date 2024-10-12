<script lang="ts" setup>
import Gallery from './gallery/Gallery.vue';
import Filters, { type FilterLabelProps } from './Filters.vue';
import BeforeSuggested from './BeforeSuggested.vue';
import MainPicture from './MainPicture.vue';
import SelectionInputs from './SelectionInputs.vue';
import AdminReview from './AdminReview.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import axios from 'axios';

export type SelectedFiltersProps = {
  [key in FilterLabelProps]: string | number;
};

const { getLoggedUserInfo } = useAuthStore();
const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const isUserAdmin = ref(false);
const vehicleData = ref('');

const selectedFilters = ref<SelectedFiltersProps>({
  Brand: '',
  Family: '',
  Model: '',
  'Start Year': '',
  'End Year': '',
});

onMounted(async () => {
  // USER FETCH
  getLoggedUserInfo().then(response => {
    const userInfo = response.data;
    const isAdmin = userInfo?.user_category === 99;
    isUserAdmin.value = isAdmin;
  });

  // VEHICLE FETCH
  axios
    .get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`
    )
    .then(response => {
      const _vehicleData = response.data?.items[0];

      if (_vehicleData) {
        vehicleData.value = _vehicleData;
        selectedFilters.value = {
          Brand: _vehicleData.brand_name,
          Family: _vehicleData.bw_family_name,
          Model: _vehicleData.bw_model_name,
          'Start Year': _vehicleData.bw_model_year_begin,
          'End Year': _vehicleData.bw_model_year_end,
        };
      }
    });
});
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <Filters class="md:min-w-[1300px]" :modelValue="selectedFilters" />
    <div class="flex flex-col gap-7 justify-between w-full mt-6">
      <div
        class="flex flex-col md:flex-row justify-between gap-6 h-full pb-3 md:min-w-[1300px]"
      >
        <!-- PREVIOUS SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery :vehicleData="vehicleData" />
        </div>

        <!-- CURRENT SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery :modelValue="selectedFilters" :vehicleData="vehicleData" />
        </div>

        <!-- NEXT SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery :vehicleData="vehicleData" />
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row gap-4 w-full md:justify-between md:min-w-[1300px]"
      >
        <BeforeSuggested
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :vehicleData="vehicleData"
        />
        <MainPicture
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :vehicleData="vehicleData"
        />
        <SelectionInputs
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :isUserAdmin="isUserAdmin"
        />
      </div>
    </div>
    <AdminReview class="md:min-w-[1300px] mt-6 md:mt-0" v-if="isUserAdmin" />
  </div>
</template>
