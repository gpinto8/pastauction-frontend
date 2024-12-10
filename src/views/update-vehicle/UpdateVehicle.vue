<script lang="ts" setup>
import Gallery from './gallery/Gallery.vue';
import Filters, { type FilterKeyProps } from './Filters.vue';
import BeforeSuggested from './BeforeSuggested.vue';
import MainPicture from './MainPicture.vue';
import SelectionInputs from './SelectionInputs.vue';
import AdminReview from './AdminReview.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { numberToRoman, romanToNumber } from '@/utils/formatters/romanToNumber';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

export type SelectedFiltersProps = { [key in FilterKeyProps]: string | number };

const updateVehicleStore = updateVehicle();
const { getLoggedUserInfo } = useAuthStore();
const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const isUserAdmin = ref(false);
const familyId = ref<number>();

const modelSeries = ref('');

const previousVehicleData = ref();
const middleVehicleData = ref();
const nextVehicleData = ref();
const selectedVehicleData = ref();
const gallerySelected = ref(0); // --> 1 - previous | 2 - current | 3 - next

const selectedFilters = ref<SelectedFiltersProps>({
  brand_name: '',
  bw_family_name: '',
  bw_model_name: '',
  age_name: '',
});

const getVehicleData = async (familyId: number, modelSeries: string) => {
  const currentModelData = await axios
    .get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=bw_family_id:${familyId},bw_model_series:${modelSeries}`
    )
    .then(response => response.data?.items?.[0])
    .catch(error => {});

  if (currentModelData) return currentModelData;
};

const setAllVehicleData = async (
  familyId: number,
  modelSeries: string,
  avoidCurrent?: boolean
) => {
  if (!familyId || !modelSeries) return;

  // CURRENT
  if (!avoidCurrent) {
    getVehicleData(familyId, modelSeries).then(
      data => (middleVehicleData.value = data || null)
    );
  }

  // PREVIOUS
  const previousModelSeries = numberToRoman(romanToNumber(modelSeries) - 1);
  if (previousModelSeries) {
    getVehicleData(
      +(middleVehicleData.value?.vehicle_version + familyId),
      previousModelSeries
    ).then(data => (previousVehicleData.value = data || null));
  }

  // NEXT
  const nextModelSeries = numberToRoman(romanToNumber(modelSeries) + 1);
  if (nextModelSeries) {
    getVehicleData(
      +(middleVehicleData.value?.vehicle_version + familyId),
      nextModelSeries
    ).then(data => (nextVehicleData.value = data || null));
  }
};

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
      if (!_vehicleData) return;

      updateVehicleStore.currentVehicleData = _vehicleData;
      selectedVehicleData.value = _vehicleData;
      middleVehicleData.value = _vehicleData;

      selectedFilters.value = {
        brand_name: _vehicleData.brand_name,
        bw_family_name: _vehicleData.bw_family_name,
        bw_model_name: _vehicleData.bw_model_name,
        age_name: _vehicleData.vehicle_age_name,
      };

      const _familyId = _vehicleData?.bw_family_id;
      const _modelSeries = _vehicleData?.bw_model_series;
      familyId.value = _familyId;
      modelSeries.value = _modelSeries;

      setAllVehicleData(_familyId, _modelSeries, true);
    });
});

const handleFilterPrevious = () => {
  if (
    modelSeries.value === 'I' ||
    modelSeries.value === 'II' // Because the current one can only be this "II" since there's no previous of "I" ofc ..
  )
    return;

  modelSeries.value = numberToRoman(romanToNumber(modelSeries.value) - 1);

  if (familyId.value && modelSeries.value) {
    setAllVehicleData(familyId.value, modelSeries.value);
  }
};

const handleFilterNext = () => {
  if (modelSeries.value === 'I') return;

  modelSeries.value = numberToRoman(romanToNumber(modelSeries.value) + 1);

  if (familyId.value && modelSeries.value) {
    setAllVehicleData(familyId.value, modelSeries.value);
  }
};

const applyFilters = async () => {
  const { brand_name, bw_family_name, bw_model_name, age_name } =
    selectedFilters.value || {};

  if (brand_name && bw_family_name && bw_model_name) {
    const params = [
      brand_name ? `brand_name:${brand_name}` : '',
      bw_family_name ? `bw_family_name:${bw_family_name}` : '',
      bw_model_name ? `bw_model_name:${bw_model_name}` : '',
      age_name ? `age_name:${age_name}` : '',
    ]
      .filter(Boolean)
      .join(',');
    const data = await axios.get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=${params}`
    );

    const _familyId = data?.data?.items?.[0]?.bw_family_id;
    const _modelSeries = data?.data?.items?.[0]?.bw_model_series;

    if (_familyId && _modelSeries) {
      familyId.value = _familyId;
      modelSeries.value = _modelSeries;
      setAllVehicleData(_familyId, _modelSeries);
    }
  }
};
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <Filters
      class="md:min-w-[1300px]"
      :modelValue="selectedFilters"
      @onPrevious="handleFilterPrevious"
      @onNext="handleFilterNext"
      :applyFilters="applyFilters"
    />
    <div class="flex flex-col gap-7 justify-between w-full mt-6">
      <div
        class="flex flex-col md:flex-row justify-between gap-6 h-full pb-3 md:min-w-[1300px]"
      >
        <!-- PREVIOUS SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery
            :id="1"
            :isUserAdmin="isUserAdmin"
            :vehicleData="previousVehicleData"
            :gallerySelected="gallerySelected"
            @onSelected="gallerySelected = $event"
            noImageText="No earlier models available from the displayed period."
          />
        </div>

        <!-- CURRENT SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery
            :id="2"
            :isUserAdmin="isUserAdmin"
            :vehicleData="middleVehicleData"
            :gallerySelected="gallerySelected"
            :modelValue="selectedFilters"
            @onSelected="gallerySelected = $event"
          />
        </div>

        <!-- NEXT SERIE -->
        <div class="md:!min-w-[400px]">
          <Gallery
            :id="3"
            :isUserAdmin="isUserAdmin"
            :vehicleData="nextVehicleData"
            :gallerySelected="gallerySelected"
            @onSelected="gallerySelected = $event"
            noImageText="No later models available from the displayed period."
          />
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row gap-4 w-full md:justify-between md:min-w-[1300px]"
      >
        <BeforeSuggested
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :vehicleData="selectedVehicleData"
        />
        <MainPicture
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :vehicleData="selectedVehicleData"
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
