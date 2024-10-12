<script setup lang="ts">
import axios from 'axios';
import ImageryGrid from './gallery/ImageryGrid.vue';
import { computed, onMounted, ref } from 'vue';
import { useBreakpoint } from '@/utils/functions/useBreakpoint';

defineProps<{
  class: string;
}>();

const imagePaths = ref<{ id: number; path: string }[]>();
const currentPage = ref(1);
const { breakpoint } = useBreakpoint();

const breakpointCellSize = computed(() => {
  if (breakpoint.value === 'sm') return 2;
  if (breakpoint.value === 'md') return 5;
  return 15;
});

const imageCellSize = computed(() => `${breakpointCellSize.value}x80`);

const getImagePaths = async (page: number) => {
  const response = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/query?page=${page}&size=${breakpointCellSize.value}`
  );
  const data = response.data?.items;
  const images = data
    .map((item: any) => {
      const path = item.photo_path;
      const id = item.vehicle_id;

      if (path) {
        return { id, path: `https://pastauction.com/api/v1/photo/${path}` };
      }
    })
    .filter(Boolean);
  return images;
};

onMounted(async () => {
  const _imagePaths = await getImagePaths(currentPage.value);
  imagePaths.value = _imagePaths;
});

const handleImageClick = (id: number) => {
  location.replace(`/vehicle_update/${id}`);
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
          :images="
            new Array(breakpointCellSize).fill(undefined).map((_, i) => ({
              path: imagePaths?.[i]?.path!,
              metadata: imagePaths?.[i]?.id!,
            }))
          "
          :columnCombination="imageCellSize as any"
          classContainer="flex border-0"
          :style="{
            width: `${80 * breakpointCellSize}px`,
            gridTemplateColumns: `repeat(${imageCellSize},80px)`,
          }"
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
