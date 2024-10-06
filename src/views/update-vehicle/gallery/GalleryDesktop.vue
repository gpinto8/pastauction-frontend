<script setup lang="ts">
import ImageryGrid from './ImageryGrid.vue';
import Parameters from './Parameters.vue';
import Pagination from './Pagination.vue';

defineProps<{
  images: string[];
  currentPage: number;
  imagesPerPage: number;
  totalPages: number;
  totalImages: number;
}>();
const emit = defineEmits(['onPageChanged']);

const handlePageChanged = (page: number) => {
  emit('onPageChanged', page);
};

const handleSelect = () => {
  console.log('Select');
};
</script>

<template>
  <div class="h-full">
    <Parameters />
    <ImageryGrid
      :images="images"
      columnCombination="5x80"
      classContainer="mt-6 mb-4 h-[480px]"
    />
    <div class="flex justify-between gap-2">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        @onPageChanged="handlePageChanged"
      />
      <v-btn
        class="w-fit text-white bg-[#212529] rounded-md font-normal grid place-content-center text-sm text-none text-center"
        @click="handleSelect"
      >
        Select
      </v-btn>
    </div>
  </div>
</template>
