<script lang="ts" setup>
import { computed, ref } from 'vue';
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import UiCheckbox from '@/components/ui/ui-checkbox.vue';
import ImageryGrid, {
  type ImageGrid,
  type ImagesGridProps,
} from './ImageryGrid.vue';
import Parameters from './Parameters.vue';
import PaginationSlider from './PaginationSlider.vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

const props = defineProps<{
  id: number;
  images: ImagesGridProps;
  currentPage: number;
  imagesPerPage: number;
  totalPages: number;
  totalImages: number;
  vehicleData?: any;
  handleImageClick?: (image: ImageGrid) => void;
  gallerySelected: number;
  noImageText?: string;
}>();

const emit = defineEmits(['onPageChanged', 'onSelected']);

const mobileOpen = ref(1); // 0 - open | 1 - close
const updateVehicleStore = updateVehicle();

const handleOpenMobile = () => {
  mobileOpen.value = mobileOpen.value === 0 ? 1 : 0;
};

const handlePageChanged = (page: number) => {
  emit('onPageChanged', page);
};

const handleSelected = (event: any) => {
  updateVehicleStore.selectedVehicleData = props.vehicleData;
  emit('onSelected', props.id);
};

const isSelected = computed(() => props.id === props.gallerySelected);
</script>

<template>
  <ExpansionSection
    panelClass="mobile-gallery bg-[#212529] text-[#FFFFFF] p-3 sm:p-0"
    :titleClass="`!bg-[#212529] h-fit sm:h-[100px] h-1 p-2`"
    @on-selected="handleSelected"
    hideActions
    disabled
    :forceOpen="mobileOpen"
  >
    <template #title>
      <div
        class="flex text-white flex-col sm:flex-row sm:justify-between gap-3 sm:first-letter:gap-2 w-full sm:py-5 sm:px-3 p-0"
      >
        <div
          class="text-white flex sm:justify-start items-start !justify-between"
        >
          <div class="flex justify-between">
            <UiCheckbox
              @onSelected="handleSelected"
              class="z-10 pointer-events-auto"
              v-model="isSelected"
            />
            <p>Select</p>
          </div>
          <div
            class="flex sm:hidden z-10 pointer-events-auto w-[15%] justify-end"
            :class="{ 'sm:!w-fit': !!mobileOpen }"
          >
            <img
              v-if="mobileOpen"
              src="@/assets/svg/plus-circle.svg"
              alt="plus-circle"
              width="24"
              height="24"
              @click="handleOpenMobile"
              class="h-6 w-6 sm:block cursor-pointer"
            />
            <img
              v-if="!mobileOpen"
              src="@/assets/svg/minus-circle.svg"
              alt="minus-circle"
              width="24"
              height="24"
              @click="handleOpenMobile"
              class="h-6 w-6 sm:block cursor-pointer"
            />
          </div>
        </div>
        <div
          class="flex justify-center sm:w-[70%] w-full"
          :class="{ 'sm:!w-full': !!mobileOpen }"
        >
          <ImageryGrid
            v-if="mobileOpen"
            :images="images.filter(Boolean).slice(0, 7)"
            columnCombination="7x60"
            class="hidden sm:flex justify-between items-center h-[60px]"
            @imageClick="handleImageClick"
            :noImageText="noImageText"
          />
          <ImageryGrid
            v-if="mobileOpen"
            :images="images.filter(Boolean).slice(0, 5)"
            columnCombination="5x54"
            class="flex sm:hidden justify-between items-center h-[54px]"
            @imageClick="handleImageClick"
            :noImageText="noImageText"
          />
          <Parameters v-else :vehicleData="vehicleData" />
        </div>
        <div
          class="hidden sm:flex z-10 pointer-events-auto justify-end"
          :class="{ 'sm:!w-fit': !!mobileOpen }"
        >
          <img
            v-if="mobileOpen"
            src="@/assets/svg/plus-circle.svg"
            alt="plus-circle"
            width="24"
            height="24"
            @click="handleOpenMobile"
            class="hidden h-6 w-6 sm:block cursor-pointer"
          />
          <img
            v-if="!mobileOpen"
            src="@/assets/svg/minus-circle.svg"
            alt="minus-circle"
            width="24"
            height="24"
            @click="handleOpenMobile"
            class="hidden h-6 w-6 sm:block cursor-pointer"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="w-full h-fit">
        <!-- TABLET -->
        <div class="hidden sm:block">
          <ImageryGrid
            :images="images"
            columnCombination="5x80"
            classContainer="w-fit my-0 mx-auto"
            @imageClick="handleImageClick"
            :noImageText="noImageText"
          />
          <PaginationSlider
            :currentPage="currentPage"
            :totalPages="totalPages"
            :totalImages="totalImages"
            @onPageChanged="handlePageChanged"
            classContainer="p-auto !w-[400px] mt-4 mb-0 mx-auto"
          />
        </div>
        <!-- MOBILE -->
        <div class="block sm:hidden">
          <ImageryGrid
            :images="images"
            columnCombination="3x80"
            classContainer="w-fit my-0 mx-auto"
            @imageClick="handleImageClick"
            :noImageText="noImageText"
          />
          <PaginationSlider
            :currentPage="currentPage"
            :totalPages="totalPages"
            :totalImages="totalImages"
            @onPageChanged="handlePageChanged"
            classContainer="p-auto !w-[240px] mt-4 mb-0 mx-auto"
          />
        </div>
      </div>
    </template>
  </ExpansionSection>
</template>

<style scoped lang="scss">
:deep(.mobile-gallery) {
  .v-expansion-panel-title__overlay {
    display: none;
  }
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
}
</style>
