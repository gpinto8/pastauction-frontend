<script setup lang="ts">
import axios from 'axios';
import GalleryDesktop from './GalleryDesktop.vue';
import GalleryMobile from './GalleryMobile.vue';
import { computed, ref, watch } from 'vue';
import type { SelectedFiltersProps } from '../UpdateVehicle.vue';

const props = defineProps<{
  class: string;
  modelValue?: SelectedFiltersProps;
}>();

defineEmits(['getResponseData']);

const images = ref<string[]>([]);
const currentPage = ref(1);
const imagesPerPage = 30;
const totalPages = ref(0);
const totalImages = ref(0);
const responseData = ref<any>();
const desktopGalleryRef = ref();
const familyId = computed(
  () => desktopGalleryRef?.value?.responseData?.items?.[0]?.bw_family_id
);

const getImages = async (familyId: number, page: number) => {
  const pageSizeParam = `page=${page}&size=${imagesPerPage * 2}`; // Fetch twice the amount of images per page so we can filter out the ones without a photo

  const familyData = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_model/id/?search=family_id:${familyId}&${pageSizeParam}`
  );
  const familyIds = familyData.data.items.map((item: any) => item.id);
  const totalPages = familyData.data.pages;
  const totalImages = familyData.data.total;
  if (!familyIds.length) return;

  const fetchData = async (id: string) => {
    try {
      const photoData = await axios.get(
        `https://pastauction.com/api/v1/filter/bidwatcher_photo/logo_test/?search=id_vehicle:${id}`
      );
      const photoId = photoData.data?.items?.[0]?.logo_test;
      if (photoId) {
        return `https://pastauction.com/api/v1/photo/${photoId}`;
      }
    } catch (error) {}
  };
  const requests = familyIds.map((id: string) => fetchData(id) || '');

  return {
    data: (await Promise.all(requests)).filter(Boolean).slice(0, imagesPerPage), // Here we filter out the empty strings and slice the array to the desired length
    totalPages,
    totalImages,
  };
};

watch(
  () => familyId.value,
  async () => {
    const imageData = await getImages(familyId.value, 1);
    if (imageData) {
      images.value = imageData.data;
      totalPages.value = imageData.totalPages;
      totalImages.value = imageData.totalImages;
    }
  }
);

const handlePageChanged = async (page: number) => {
  currentPage.value = page;
  const imagesArray = await getImages(familyId.value, page);
  if (imagesArray) images.value = imagesArray.data;
};

defineExpose({
  responseData: responseData,
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full" :class="class">
    <div class="block md:hidden">
      <GalleryMobile
        :images="images"
        :currentPage="currentPage"
        :imagesPerPage="imagesPerPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        @onPageChanged="handlePageChanged"
      />
    </div>
    <div class="hidden md:flex h-full flex-col w-fit">
      <GalleryDesktop
        ref="desktopGalleryRef"
        :images="images"
        :currentPage="currentPage"
        :imagesPerPage="imagesPerPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        :modelValue="modelValue"
        @onPageChanged="handlePageChanged"
        @getResponseData="responseData = $event"
      />
    </div>
  </div>
</template>
