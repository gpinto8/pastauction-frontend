<script setup lang="ts">
import ImageryGrid from './ImageryGrid.vue';
import Parameters from './Parameters.vue';
import Pagination from './Pagination.vue';
import type { SelectedFiltersProps } from '../UpdateVehicle.vue';
import { ref } from 'vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  images: string[];
  currentPage: number;
  imagesPerPage: number;
  totalPages: number;
  totalImages: number;
  modelValue?: SelectedFiltersProps;
}>();

const emit = defineEmits(['onPageChanged', 'getResponseData']);

const responseData = ref<any>();
const updateVehicleStore = updateVehicle();

const handlePageChanged = (page: number) => {
  emit('onPageChanged', page);
};

const handleSelect = () => {
  if (
    props.modelValue?.Brand &&
    props.modelValue?.Family &&
    props.modelValue?.Model &&
    props.modelValue?.['Start Year'] &&
    props.modelValue?.['End Year']
  ) {
    updateVehicleStore.parametersResponseData = responseData;
  }
};

defineExpose({
  responseData: responseData,
});
</script>

<template>
  <div class="h-full">
    <Parameters
      :filterData="modelValue"
      @getResponseData="responseData = $event"
    />
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
