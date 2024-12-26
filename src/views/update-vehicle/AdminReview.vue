<script setup lang="ts">
import axios from 'axios';
import ImageryGrid, { type ImageGrid } from './gallery/ImageryGrid.vue';
import { computed, onMounted, ref } from 'vue';
import { useBreakpoint } from '@/utils/functions/useBreakpoint';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

defineProps<{
  class: string;
}>();

const imagePaths = ref<{ id: number; path: string }[]>();
const currentPage = ref(1);
const { breakpoint } = useBreakpoint();
const updateVehicleStore = updateVehicle();

const breakpointCellSize = computed(() => {
  if (breakpoint.value === 'sm') return 2;
  if (breakpoint.value === 'md') return 5;
  return 15;
});

const getImagePaths = async (page: number) => {
  const response = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/query?page=${page}&size=${breakpointCellSize.value}`
  );
  const data = response.data?.items;
  const images = data
    .map((item: any) => {
      const path = item.photo_path;
      const id = item.vehicle_id;

      return {
        id,
        path: path ? `https://pastauction.com/api/v1/photo/${path}` : '',
      };
    })
    .filter(Boolean);
  return images;
};

onMounted(async () => {
  const _imagePaths = await getImagePaths(currentPage.value);
  imagePaths.value = _imagePaths;
});

const handleImageClick = (image: ImageGrid) => {
  const id = image.id;
  if (id) location.replace(`/vehicle_update/${id}`);
};

const goBack = async () => {
  if (currentPage.value === 1) return;
  currentPage.value -= 1;
  const _imagePaths = await getImagePaths(currentPage.value);
  imagePaths.value = _imagePaths;
};

const goForward = async () => {
  currentPage.value += 1;
  const _imagePaths = await getImagePaths(currentPage.value);
  imagePaths.value = _imagePaths;
};

const handleAccept = async () => {
  const vehicleId = updateVehicleStore.currentVehicleData?.vehicle_id;
  const subBodies = updateVehicleStore.selectedSubBodies;
  const colorMainId = updateVehicleStore.selectedSubColor?.id;
  const modelId = updateVehicleStore.selectedVehicleData?.bw_model_id;
  const notesInput = updateVehicleStore.notesInput; // This one is optional

  if (!vehicleId || !subBodies || !colorMainId || !modelId) return;

  const data = {
    vehicle_id: vehicleId,
    body_id: subBodies,
    color_main_id: colorMainId,
    id_model: modelId,
    note: notesInput,
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
      alert('The vehicle has been updated successfully!');
      window.history.back();
    }, 500);
  });
};
</script>

<template>
  <div :class="class">
    <!-- ADMIN BUTTONS -->
    <div class="w-full flex sm:justify-end">
      <div
        class="w-full sm:w-fit flex flex-col sm:flex-row justify-between gap-4 md:gap-6"
      >
        <v-btn
          class="block w-full sm:w-[160px] !text-[#212529] bg-white rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
        >
          Decline
        </v-btn>
        <v-btn
          class="block w-full sm:w-[160px] text-white bg-[#212529] rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
          @click="handleAccept"
        >
          Accept
        </v-btn>
      </div>
    </div>
    <!-- UNDER REVIEW GALLERY -->
    <div class="flex flex-col mt-6 md:mt-0">
      <div class="font-semibold text-[#212529] text-lg md:ml-13 text-center">
        Under review
      </div>
      <div class="flex gap-4 md:gap-2 justify-center items-center">
        <div
          class="cursor-pointer grid place-content-center p-2 bg-[#212529] w-8 h-8 rounded"
          @click="goBack"
        >
          <img
            src="@/assets/svg/greater-than-white.svg"
            alt="Greater than"
            width="12"
            height="12"
          />
        </div>
        <ImageryGrid
          v-if="imagePaths?.length"
          class="flex sm:hidden"
          :images="
            new Array(2).fill(undefined).map((_, i) => ({
              id: imagePaths?.[i]?.id!,
              path: imagePaths?.[i]?.path!,
              metadata: imagePaths?.[i]?.id!,
            }))
          "
          columnCombination="2x80"
          classContainer="flex border-0"
          :onImageClick="handleImageClick"
        />
        <ImageryGrid
          v-if="imagePaths?.length"
          class="hidden sm:flex md:hidden"
          :images="
            new Array(5).fill(undefined).map((_, i) => ({
              id: imagePaths?.[i]?.id!,
              path: imagePaths?.[i]?.path!,
              metadata: imagePaths?.[i]?.id!,
            }))
          "
          columnCombination="5x80"
          classContainer="flex border-0"
          :onImageClick="handleImageClick"
        />
        <ImageryGrid
          v-if="imagePaths?.length"
          class="hidden md:flex"
          :images="
            new Array(15).fill(undefined).map((_, i) => ({
              id: imagePaths?.[i]?.id!,
              path: imagePaths?.[i]?.path!,
              metadata: imagePaths?.[i]?.id!,
            }))
          "
          columnCombination="15x80"
          classContainer="flex border-0"
          :onImageClick="handleImageClick"
        />
        <div
          class="cursor-pointer grid place-content-center p-2 bg-[#212529] w-8 h-8 rounded"
          @click="goForward"
        >
          <img
            src="@/assets/svg/less-than-white.svg"
            alt="Less than"
            width="12"
            height="12"
          />
        </div>
      </div>
    </div>
  </div>
</template>
