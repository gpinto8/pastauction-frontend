<script lang="ts" setup>
import Gallery from './gallery/Gallery.vue';
import BeforeSuggested from './BeforeSuggested.vue';
import MainPicture from './MainPicture.vue';
import SelectionInputs from './SelectionInputs.vue';
import AdminReview from './AdminReview.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import { numberToRoman, romanToNumber } from '@/utils/formatters/romanToNumber';
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import { type ColorProps } from './ColorMainNuance.vue';
import VehicleUpdateFilters from './VehicleUpdateFilters.vue';
import type { FiltersGoValues } from '@/components/common/Filters.vue';

const updateVehicleStore = updateVehicle();
const auth = useAuthStore();
const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const isUserAdmin = computed(() => !!(auth.detail?.data?.user_category === 99));
const familyId = ref<number>();

const modelSeries = ref('');
const filterModelNameDetail = ref('');

const previousVehicleData = ref();
const middleVehicleData = ref(); // "vehicleData"
const nextVehicleData = ref();
const selectedVehicleData = ref();
const gallerySelected = ref(0); // --> 1 - previous | 2 - current | 3 - next

const getVehicleData = async (
  familyId: number,
  modelSeries: string,
  modelNameDetail?: string
) => {
  if (familyId && modelSeries) {
    const newModelNameDetail = modelNameDetail
      ? `,bw_model_model_name_detail:${modelNameDetail}`
      : '';

    const currentModelData = await axios
      .get(
        `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=bw_family_id:${familyId},bw_model_series:${modelSeries}${newModelNameDetail}`
      )
      .then(response => response.data?.items?.[0])
      .catch(error => {});

    if (currentModelData) return currentModelData;
  }
};

const resetVehicleData = () => {
  previousVehicleData.value = undefined;
  middleVehicleData.value = undefined;
  nextVehicleData.value = undefined;
};

const setAllVehicleData = async (
  familyId: number,
  modelSeries: string,
  avoidCurrent?: boolean
) => {
  if (!familyId || !modelSeries) return;

  // CURRENT
  if (!avoidCurrent) {
    getVehicleData(familyId, modelSeries, filterModelNameDetail.value).then(
      data => (middleVehicleData.value = data || null)
    );
  }

  const vehicleVersion =
    !filterModelNameDetail.value && middleVehicleData.value?.vehicle_version;
  const vehicleVersionFamilyId = +(vehicleVersion
    ? vehicleVersion + familyId
    : familyId);

  // PREVIOUS
  const previousModelSeries = numberToRoman(romanToNumber(modelSeries) - 1);
  if (previousModelSeries) {
    getVehicleData(
      vehicleVersionFamilyId,
      previousModelSeries,
      filterModelNameDetail.value
    ).then(data => (previousVehicleData.value = data || null));
  }

  // NEXT
  const nextModelSeries = numberToRoman(romanToNumber(modelSeries) + 1);
  if (nextModelSeries) {
    getVehicleData(
      vehicleVersionFamilyId,
      nextModelSeries,
      filterModelNameDetail.value
    ).then(data => (nextVehicleData.value = data || null));
  }
};

watch(
  () => isUserAdmin.value,
  async () => {
    const adminUrl = `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/query?search=vehicle_id:${vehicleId}`; // This is for admin's so we get the user's changes
    const userUrl = `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`; // This is for users
    const url = isUserAdmin.value ? adminUrl : userUrl;

    // COMMON VEHICLE DATA UPDATE
    const response = await axios.get(url);
    let _vehicleData = response.data?.items[0];

    // The thing is that if we dont have any user's changes, then we gotta use the normal api for users .. because the API won't respond will any data and the page will be blank
    if (!_vehicleData) {
      const response = await axios.get(userUrl); // So here we just re-do the fetch with the user's url
      _vehicleData = response.data?.items[0];
      if (!_vehicleData) return; // And if we don't have any data then we really dont have anything so just return ..
    }
    console.log({ _vehicleData });

    // TO COMPLETE
    // If its admin, then pre-compile the user reviewed changes
    if (isUserAdmin.value) {
      // vehicleId = updateVehicleStore.currentVehicleData?.vehicle_id;
      // subBodies = updateVehicleStore.selectedSubBodies;
      // colorMainId = updateVehicleStore.selectedSubColor?.id;
      // modelId = updateVehicleStore.selectedVehicleData?.bw_model_id;
      updateVehicleStore.notesInput = _vehicleData?.bvu_note;
    }

    updateVehicleStore.currentVehicleData = _vehicleData;
    selectedVehicleData.value = _vehicleData;
    middleVehicleData.value = _vehicleData;

    const _familyId = _vehicleData?.bw_family_id;
    const _modelSeries = _vehicleData?.bw_model_series;
    familyId.value = _familyId;
    modelSeries.value = _modelSeries;

    setAllVehicleData(_familyId, _modelSeries, true);

    // UPDATE USER MODIFICATIONS
    if (isUserAdmin.value) {
      // VEHICLE ID & MODEL ID
      const bvuVehicleId = _vehicleData?.bvu_vehicle_id;
      const bvuModelId = _vehicleData?.bvu_id_model;

      const url = `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${bvuVehicleId},bw_model_id:${bvuModelId}`; // This is for users
      const response = await axios.get(url);
      const data = response.data?.items[0];

      updateVehicleStore.selectedVehicleData = data;

      // COLOR MAIN ID
      const bvuColorMainId = _vehicleData?.bvu_color_main_id;
      if (bvuColorMainId) {
        const subColorResponse = await axios.get(
          `https://pastauction.com/api/v1/bidwatcher_color/?search=id:${bvuColorMainId}`
        );
        const subColorData = subColorResponse.data.items?.map(
          (item: any) => item
        )?.[0] as ColorProps;
        updateVehicleStore.selectedSubColor = subColorData;

        const colorFamilyId = subColorData.id_family;
        const colorResponse = await axios.get(
          `https://pastauction.com/api/v1/bidwatcher_color/?search=id_family:${colorFamilyId}`
        );
        const colorData = colorResponse.data.items
          ?.map((item: any) => item)
          ?.find(
            (item: ColorProps) =>
              item.id !== item.id_family && item.id !== subColorData.id
          );
        updateVehicleStore.selectedColor = colorData;
      }
    }
  },
  { immediate: true }
);

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
  modelSeries.value = numberToRoman(romanToNumber(modelSeries.value) + 1);

  if (familyId.value && modelSeries.value) {
    setAllVehicleData(familyId.value, modelSeries.value);
  }
};

const applyFilters = async (data: FiltersGoValues) => {
  const getValue = (key: string) => data.find(data => data.key === key)?.value;
  const brandName = getValue('brand_name');
  const familyName = getValue('bw_family_name');
  const modelName = getValue('bw_model_name');
  const ageName = getValue('age_name'); // This is optional

  if (brandName && familyName && modelName) {
    const params = [
      brandName ? `brand_name:${brandName}` : '',
      familyName ? `bw_family_name:${familyName}` : '',
      modelName ? `bw_model_name:${modelName}` : '',
      ageName ? `age_name:${ageName}` : '',
    ]
      .filter(Boolean)
      .join(',');
    const data = await axios.get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=${params}`
    );
    const dataItem = data?.data?.items?.[0];

    resetVehicleData();

    middleVehicleData.value = dataItem;
    filterModelNameDetail.value = dataItem?.bw_model_model_name_detail;

    const _familyId = dataItem?.bw_family_id;
    const _modelSeries = dataItem?.bw_model_series;

    if (_familyId && _modelSeries) {
      familyId.value = _familyId;
      modelSeries.value = _modelSeries;

      setAllVehicleData(_familyId, _modelSeries, true);
    }
  }
};

const sendApi = async (method: string, path: string, data?: any) => {
  const authToken = window.localStorage.getItem('past_token');
  const config = {
    method,
    url: 'https://pastauction.com/api/v1/' + path,
    headers: {
      Authorization: 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    data: data || {},
  };
  await axios(config)
    .then(response => {
      console.log(path, { response, data });
    })
    .catch(e => e);
};

const dataInput = computed(() => ({
  vehicle_id: vehicleId,
  body_id: ['Buggy'],
  color_main_id: 10,
  color_roof_id: 10,
  id_model: 36247,
  note: 'SADF ASDFASDF',
}));

const handleSendReview = async () => {
  console.log('handleSendReview');
  await sendApi(
    'post',
    'bidwatcher_vehicle_user_update/create',
    dataInput.value
  );
};

const handleGet = async () => {
  console.log('handleGet');
  await sendApi(
    'get',
    'bidwatcher_vehicle/query?search=vehicle_id:' + vehicleId
  );
  await sendApi(
    'get',
    'bidwatcher_vehicle_user_update/query?search=vehicle_id:' + vehicleId
  );
};

const handleAcceptReview = async () => {
  console.log('handleAcceptReview');
  await sendApi(
    'patch',
    'bidwatcher_vehicle_user_update/update',
    dataInput.value
  );
};
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <div class="flex flex-column gap-4 items-center justify-center">
      <div>
        <strong>DATA:</strong>
        {{ dataInput }}
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 justify-center items-center">
      <button
        class="p-2 rounded-lg bg-black text-white w-fit"
        @click="handleSendReview"
      >
        SEND REVIEW
      </button>
      <button
        class="p-2 rounded-lg bg-black text-white w-fit"
        @click="handleGet"
      >
        GET
      </button>
      <button
        class="p-2 rounded-lg bg-black text-white w-fit"
        @click="handleAcceptReview"
      >
        ACCEPT REVIEW
      </button>
    </div>
    <VehicleUpdateFilters
      :vehicleData="middleVehicleData"
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
