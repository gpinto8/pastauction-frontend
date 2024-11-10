<script setup lang="ts">
import axios from 'axios';
import GalleryDesktop from './GalleryDesktop.vue';
import GalleryMobile from './GalleryMobile.vue';
import { computed, ref, watch } from 'vue';
import type { SelectedFiltersProps } from '../UpdateVehicle.vue';
import type { ImageGrid, ImagesGridProps } from './ImageryGrid.vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  id: number;
  class?: string;
  modelValue?: SelectedFiltersProps;
  vehicleData?: any;
  isUserAdmin?: boolean;
  gallerySelected: number;
  noImageText?: string;
}>();

defineEmits(['getResponseData', 'onSelected']);

const images = ref<ImagesGridProps>([]);
const currentPage = ref(1);
const imagesPerPage = 30;
const totalPages = ref(0);
const totalImages = ref(0);
const updateVehicleStore = updateVehicle();

const modelId = computed(() => props.vehicleData?.bw_model_id);

const getImages = async (modelId: number, page: number) => {
  const familyData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=bw_model_id:${modelId}&page=${page}&size=30`
  );
  const totalPages = familyData.data.pages;
  const totalImages = familyData.data.total;
  const data = familyData.data.items;

  const newData = data.map((item: any) => ({
    id: item.vehicle_id,
    path: item?.photo_path
      ? `https://pastauction.com/api/v1/photo/${item.photo_path}`
      : '',
  }));

  return { data: newData, totalPages, totalImages };
};

watch(
  () => modelId.value,
  async () => {
    if (!modelId.value) {
      images.value = [];
      totalPages.value = 0;
      totalImages.value = 0;
      return;
    }

    const imageData = await getImages(modelId.value, 1);
    if (imageData) {
      images.value = imageData.data;
      totalPages.value = imageData.totalPages;
      totalImages.value = imageData.totalImages;
    }
  }
);

const handlePageChanged = async (page: number) => {
  currentPage.value = page;
  const imagesArray = await getImages(modelId.value, page);
  if (imagesArray) images.value = imagesArray.data;
};

const handleImageClick = async (image: ImageGrid) => {
  const imageData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${image.id}`
  );
  const data = imageData.data?.items?.[0];
  if (data) updateVehicleStore.selectedImageVehicleData = data;
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full" :class="class">
    <div class="block md:hidden">
      <GalleryMobile
        :id="id"
        :images="images"
        :vehicleData="vehicleData"
        :currentPage="currentPage"
        :imagesPerPage="imagesPerPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        :modelValue="modelValue"
        :handleImageClick="props.isUserAdmin ? handleImageClick : undefined"
        :gallerySelected="gallerySelected"
        @onPageChanged="handlePageChanged"
        @onSelected="$emit('onSelected', $event)"
        :noImageText="noImageText"
        />
    </div>
    <div class="hidden md:flex h-full flex-col w-fit">
      <GalleryDesktop
        :id="id"
        :images="images.slice(0, 24)"
        :vehicleData="vehicleData"
        :currentPage="currentPage"
        :imagesPerPage="imagesPerPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        :modelValue="modelValue"
        :handleImageClick="props.isUserAdmin ? handleImageClick : undefined"
        :gallerySelected="gallerySelected"
        @onPageChanged="handlePageChanged"
        @onSelected="$emit('onSelected', $event)"
        :noImageText="noImageText"
      />
    </div>
  </div>
</template>
