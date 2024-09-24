<script setup lang="ts">
import axios from 'axios';
import GalleryDesktop from './GalleryDesktop.vue';
import GalleryMobile from './GalleryMobile.vue';
import { onMounted, ref } from 'vue';

const images = ref<string[]>([]);
const currentPage = ref(1);
const imagesPerPage = 30;
const totalPages = ref(0);
const totalImages = ref(0);

const getImages = async (page: number) => {
  const pageSizeParam = `page=${page}&size=${imagesPerPage}`;
  const vehicleData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:14412`
  );
  const familyId = vehicleData.data.items[0].family_id;
  if (!familyId) return;

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
        // console.log({ photoId });
        // const imageData = await axios.get(
        //   `https://pastauction.com/api/v1/photo/${photoId}`
        // );
        // console.log({ imageData });
        // return photoId;
        // return 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.roblox.com%2Fgames%2F5307215810%2FRandomizer-UPDATE&psig=AOvVaw2xZm5jby2DAHmi1tNDYNye&ust=1727021886239000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDRj4S41IgDFQAAAAAdAAAAABAE';
        return 'https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png';
      }
    } catch (error) {}
  };
  const requests = familyIds.map((id: string) => fetchData(id) || '');

  return { data: await Promise.all(requests), totalPages, totalImages };
};

onMounted(async () => {
  const imagesArray = await getImages(1);
  if (imagesArray) {
    images.value = imagesArray.data;
    totalPages.value = imagesArray.totalPages;
    totalImages.value = imagesArray.totalImages;
  }
});

const handlePageChanged = async (page: number) => {
  currentPage.value = page;
  const imagesArray = await getImages(page);
  if (imagesArray) images.value = imagesArray.data;
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
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
    <div class="hidden md:flex h-full">
      <GalleryDesktop
        :images="images"
        :currentPage="currentPage"
        :imagesPerPage="imagesPerPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        @onPageChanged="handlePageChanged"
      />
    </div>
  </div>
</template>
