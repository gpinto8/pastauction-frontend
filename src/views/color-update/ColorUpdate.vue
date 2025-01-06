<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ColorUpdateFilters from './ColorUpdateFilters.vue';
import Gallery from './Gallery.vue';
import Inputs from './Inputs.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import {
  type FilterAvailableKeys,
  type FiltersGoValues,
} from '@/components/common/Filters.vue';
import { colorUpdate } from '@/store/color-update';

const colorUpdateStore = colorUpdate();

const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const vehicleData = ref();
const resetGallery = ref(false);
const filterParams = ref('');

onMounted(async () => {
  axios
    .get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`
    )
    .then(response => {
      const _vehicleData = response.data?.items[0];
      if (!_vehicleData) return;

      vehicleData.value = _vehicleData;
    });
});

const applyFilters = async (data: FiltersGoValues) => {
  const getValue = (key: FilterAvailableKeys) =>
    data.find(data => data.key === key)?.value;
  const brandName = getValue('brand_name');
  const familyName = getValue('bw_family_name');
  const modelName = getValue('bw_model_name'); // This is optional
  const colorFamilyName = getValue('colorfamily_name'); // This is optional
  const colorMainName = getValue('color_main_name'); // This is optional

  if (brandName && familyName) {
    let params = [
      brandName ? `brand_name:${brandName}` : '',
      familyName ? `bw_family_name:${familyName}` : '',
      modelName ? `bw_model_name:${modelName}` : '',
    ];

    const filterMissingColorKeys = colorUpdateStore.filterMissingColorKeys;
    if (filterMissingColorKeys?.length) {
      const nullableValue = 0;
      params = params.concat(
        filterMissingColorKeys.map(item => `${item}:${nullableValue}`)
      );
    } else {
      params = params.concat([
        colorFamilyName ? `colorfamily_name:${colorFamilyName}` : '',
        colorMainName ? `color_main_name:${colorMainName}` : '',
      ]);
    }

    const newParams = params.filter(Boolean).join(',');

    filterParams.value = newParams;
    resetGallery.value = true;

    const data = await axios.get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=${newParams}`
    );
    const dataItem = data?.data?.items?.[0];

    if (dataItem) {
      vehicleData.value = dataItem;
      resetGallery.value = false;
    }
  }
};
</script>

<template>
  <div
    class="flex flex-col gap-6 md:max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <ColorUpdateFilters
      class="md:!w-[1300px]"
      :vehicleData="vehicleData"
      :applyFilters="applyFilters"
    />
    <Gallery
      class="md:!w-[1300px]"
      :vehicleData="vehicleData"
      :resetGallery="resetGallery"
      :filterParams="filterParams"
    />
    <Inputs class="md:!w-[1300px]" :vehicleData="vehicleData" />
    <div class="flex w-full justify-end mt-2">
      <button class="bg-black p-2 text-sm rounded-md text-white h-8 w-40">
        Save
      </button>
    </div>
  </div>
</template>
