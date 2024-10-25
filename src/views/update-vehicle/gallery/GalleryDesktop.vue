<script setup lang="ts">
import ImageryGrid, {
  type ImageGrid,
  type ImagesGridProps,
} from './ImageryGrid.vue';
import Parameters from './Parameters.vue';
import Pagination from './Pagination.vue';
import type { SelectedFiltersProps } from '../UpdateVehicle.vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import { computed } from 'vue';

const props = defineProps<{
  id: number;
  images: ImagesGridProps;
  currentPage: number;
  imagesPerPage: number;
  totalPages: number;
  totalImages: number;
  modelValue?: SelectedFiltersProps;
  vehicleData?: any;
  handleImageClick?: (image: ImageGrid) => void;
  gallerySelected: number;
}>();

const emit = defineEmits(['onPageChanged', 'onSelected']);

const updateVehicleStore = updateVehicle();

const handlePageChanged = (page: number) => {
  emit('onPageChanged', page);
};

const handleSelect = () => {
  if (props.vehicleData) {
    updateVehicleStore.selectedVehicleData = props.vehicleData;
    emit('onSelected', props.id);
  }
};

const isSelected = computed(() => props.id === props.gallerySelected);
</script>

<template>
  <div class="h-full">
    <Parameters :vehicleData="vehicleData" />
    <ImageryGrid
      :images="images"
      columnCombination="4x100"
      classContainer="mt-6 mb-4 h-[480px] justify-center items-center bg-[#212529]"
      autoHeight
      @imageClick="handleImageClick"
    />
    <div class="flex justify-between gap-2">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        @onPageChanged="handlePageChanged"
      />
      <v-btn
        class="w-fit text-[#212529] bg-white rounded-md font-normal grid place-content-center text-sm text-none text-center"
        :class="{ '!bg-[#212529] !text-white': isSelected }"
        @click="handleSelect"
      >
        Select
      </v-btn>
    </div>
  </div>
</template>
