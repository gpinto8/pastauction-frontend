<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';
import { computed } from 'vue';
import Filters, {
  type FiltersGoValues,
  type FiltersModelValue,
} from '@/components/common/Filters.vue';

const props = defineProps<{ vehicleData: any }>();

const colorUpdateStore = colorUpdate();

const filterModelValue = computed<FiltersModelValue>(() => [
  {
    key: 'brand_name',
    label: 'Brand',
    value: props?.vehicleData?.brand_name,
    isRelated: true,
  },
  {
    key: 'bw_family_name',
    label: 'Family',
    value: props?.vehicleData?.bw_family_name,
    isRelated: true,
  },
  {
    key: 'bw_model_name',
    label: 'Model',
    value: props?.vehicleData?.bw_model_name,
    isRelated: true,
  },
  {
    key: 'color_main_name',
    label: 'Main color',
    value: props?.vehicleData?.color_main_name,
    isRelated: false,
  },
  {
    key: 'color_sec_name',
    label: 'Support color',
    value: props?.vehicleData?.color_sec_name,
    isRelated: false,
  },
]);

const applyFilters = async (data: FiltersGoValues) => {
  console.log({ data });
};
</script>

<template>
  <div
    class="min-h-[40px] bg-[#212529] text-white p-4 flex flex-wrap gap-4 rounded-[4px] md:p-0"
  >
    <!-- FILTERS -->
    <Filters
      class="!w-full md:!w-[75%] !p-0 md:!px-6 md:!py-5 md:!pb-0"
      classInput="!min-w-[180px] md:!min-w-0 md:!w-[160px] md:!flex-grow-0"
      hideMoveButtons
      :modelValue="filterModelValue"
      @onPrevious="() => {}"
      @onNext="() => {}"
      :applyFilters="applyFilters"
      :mobileAccordion="{
        iconUrl: '/src/assets/svg/search-blue.svg',
        title: 'Search',
      }"
    />
    <!-- BUTTONS: SINGLE & MULTIPLE -->
    <div class="flex gap-2 items-center md:py-6">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit h-fit px-4 md:px-2"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'single',
        }"
        @click="colorUpdateStore.selectionMode = 'single'"
      >
        Single
        <img src="@/assets/svg/pic.svg" alt="pic" width="16" height="16" />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit h-fit px-4 md:px-2"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'multiple',
        }"
        @click="colorUpdateStore.selectionMode = 'multiple'"
      >
        Multi
        <img
          src="@/assets/svg/pic-multi.svg"
          alt="pic-multi"
          width="16"
          height="16"
        />
      </button>
    </div>
    <!-- BUTTONS: GALLERY VIEW -->
    <div class="flex gap-2 items-center md:py-6">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'single',
        }"
        @click="colorUpdateStore.galleryMode = 'single'"
      >
        <img
          src="@/assets/svg/buttons-4.svg"
          alt="buttons-4"
          width="16"
          height="16"
        />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'multiple',
        }"
        @click="colorUpdateStore.galleryMode = 'multiple'"
      >
        <img
          src="@/assets/svg/buttons-9.svg"
          alt="buttons-9"
          width="16"
          height="16"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.autocomplete-input) {
  .v-input__details {
    display: none !important;
  }

  * {
    height: 35px !important;

    .v-progress-linear__background,
    .v-progress-linear__indeterminate {
      display: none !important;
    }
  }
}
</style>
