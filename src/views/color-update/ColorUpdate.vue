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
import type { ImageGrid } from '../update-vehicle/gallery/ImageryGrid.vue';

const colorUpdateStore = colorUpdate();

const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const vehicleData = ref();
const selectedVehicleData = ref();
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
  const colorMode = getValue('COLOR_MODE'); // This is optional
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
      if (colorMode) {
        const subColorResponse = await axios.get(
          `https://pastauction.com/api/v1/bidwatcher_color/?search=name:${colorMainName}`
        );
        const subColorData = subColorResponse.data.items?.map(
          (item: any) => item
        );
        const colorId = subColorData?.[0]?.id;

        const modes = colorMode?.split(',');
        const colorModes = {
          id_color_body: 'Body color',
          id_color_roof: 'Roof color',
          id_color_bicolor: 'Bicolor',
        };
        const keyModes = modes?.map(
          mode =>
            Object.entries(colorModes)?.find(item =>
              mode?.includes?.(item?.[1])
            )?.[0]
        );
        const colorParams = keyModes?.map(key => `${[key]}:${colorId}`);
        params = params.concat(colorParams);
      } else {
        params = params.concat([
          colorFamilyName ? `colorfamily_name:${colorFamilyName}` : '',
          colorMainName ? `color_main_name:${colorMainName}` : '',
        ]);
      }
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

const handleImageClick = async (image: ImageGrid) => {
  const vehicleId = image.id;
  if (vehicleId) {
    const data = await axios.get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${image.id}`
    );
    const dataItem = data?.data?.items?.[0];
    selectedVehicleData.value = dataItem;
  }
};

const handleSave = async () => {
  const fetchColorUpdate = async (vehicleId?: string) => {
    if (vehicleId) {
      const dynamicColors = colorUpdateStore.dynamicColors;
      let colors: any = {};

      for await (const color of dynamicColors) {
        const { key, value } = color || {};
        if (key && value) {
          const response = await axios.get(
            `https://pastauction.com/api/v1/bidwatcher_color/?search=name:${value}`
          );
          const colorDataId = response.data.items?.[0]?.id;
          colors[key] = colorDataId;
        }
      }

      if (Object.keys(colors)?.length) {
        // id_color_body    ->  color_main_id
        // id_color_bicolor ->  color_sec_id
        // id_color_roof    ->  color_roof_id

        const data = {
          vehicle_id: vehicleId,
          ...(colors?.color_main_name
            ? { color_main_id: colors?.color_main_name }
            : {}),
          ...(colors?.colorfamily_name
            ? { color_sec_id: colors?.colorfamily_name }
            : {}),
          ...(colors?.color_main_name
            ? { color_roof_id: colors?.color_roof_name }
            : {}),
        };

        const authToken = window.localStorage.getItem('past_token');
        const config = {
          method: 'patch',
          url: 'https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/update',
          headers: {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
          },
          data,
        };

        await axios(config).then(() => {
          setTimeout(() => {
            alert('The color has been updated correctly!');
            window.history.back();
          }, 500);
        });
      }
    }
  };

  const isMultiple = colorUpdateStore.selectionMode === 'multiple';
  if (isMultiple) {
    const multipleGalleryIds = colorUpdateStore.selectedMultipleImages?.map(
      image => image?.id.toString()
    );

    if (multipleGalleryIds?.length) {
      for await (const id of multipleGalleryIds) await fetchColorUpdate(id);
    }
  } else {
    const vehicleId = selectedVehicleData.value?.vehicle_id;
    fetchColorUpdate(vehicleId);
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
      @onImageClick="handleImageClick"
    />
    <Inputs class="md:!w-[1300px]" :vehicleData="selectedVehicleData" />
    <div class="md:!w-[1300px] flex w-full justify-end mt-2">
      <button
        class="bg-black p-2 text-sm rounded-md text-white h-8 w-40"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </div>
</template>
