<script lang="ts" setup>
import { ref } from 'vue';
import ImageryGrid from '../update-vehicle/gallery/ImageryGrid.vue';
import Pagination from '../update-vehicle/gallery/Pagination.vue';
import { colorUpdate } from '@/store/color-update';

const colorUpdateStore = colorUpdate();
const currentPage = ref(1);

const image =
  'https://pastauction.com/api/v1/photo/gAAAAABm8Rztu3cVcqgPWxxZNFss3B-a3fQV5lpM7-SxYAfVJdF_oNKOx_e2LQ7d_KSL0YYI8VYWPN4fQcHr27wjXFibZiMkIL9j0k9x2yD0ANhaFG6_BYEi7BZBshs2IG2OtFWNoNOiO3YuS8SzMhez_i3dWd_4LkFlzX27rIZnLDr7Bs6Q1RHfjOAP8b_gJUnMQJL6Be9Ptmy6EiC-5jg7k-AJq4Nqrg==';

const handlePageChanged = () => {};

const handleImageClick = (image: any) => {
  console.log(image);
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <ImageryGrid
      v-if="colorUpdateStore.galleryMode === 'single'"
      :images="
        new Array(75).fill({
          id: 1,
          path: image,
        })
      "
      columnCombination="15x80"
      :onImageClick="handleImageClick"
      :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
      :resetSelection="colorUpdateStore.selectionMode === 'single'"
    />
    <ImageryGrid
      v-else
      :images="
        new Array(24).fill({
          id: 1,
          path: image,
        })
      "
      columnCombination="8x152"
      :onImageClick="handleImageClick"
      :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
      :resetSelection="colorUpdateStore.selectionMode === 'single'"
    />
    <Pagination
      :currentPage="currentPage"
      :totalPages="100"
      :totalImages="100"
      @onPageChanged="handlePageChanged"
    />
  </div>
</template>
