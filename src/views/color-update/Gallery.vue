<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import ImageryGrid, {
  type ImageGrid,
  type ImagesGridProps,
} from '../update-vehicle/gallery/ImageryGrid.vue';
import Pagination from '../update-vehicle/gallery/Pagination.vue';
import { colorUpdate } from '@/store/color-update';
import axios from 'axios';
import { useBreakpoint } from '@/utils/functions/useBreakpoint';

const props = defineProps<{
  vehicleData: any;
  resetGallery?: boolean;
  filterParams?: string;
}>();

const colorUpdateStore = colorUpdate();
const currentPage = ref(1);
const images = ref();
const totalPages = ref();
const totalImages = ref();
const resetSelection = ref(false); // For the "Reset" button
const selectedImages = ref<ImagesGridProps>(); // The "multiple" mode selected images
const { device } = useBreakpoint();

const modelName = computed(() => props.vehicleData?.bw_model_name);

const computedResetSelection = computed(
  () => colorUpdateStore.selectionMode === 'single' || resetSelection.value
);

const imagesQuantity = computed(() => {
  let quantity = 0;

  if (colorUpdateStore.galleryMode === 'single') {
    if (device.value === 'mobile') quantity = 12;
    if (device.value === 'tablet') quantity = 35;
    if (device.value === 'desktop') quantity = 44;
  } else {
    if (device.value === 'mobile') quantity = 8;
    if (device.value === 'tablet') quantity = 12;
    if (device.value === 'desktop') quantity = 24;
  }

  return quantity;
});

const slicedImages = computed(() =>
  images.value?.slice(0, imagesQuantity.value)
);

const getImages = async (modelName: string, page: number) => {
  const size = imagesQuantity.value + 20;
  const newParams = props.filterParams || `bw_model_name:${modelName}`;
  const familyData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=${newParams}&page=${page}&size=${size}`
  );

  const totalPages = familyData.data.pages;
  const totalImages = familyData.data.total;
  const data = familyData.data.items;

  const newData = data
    .map((item: any) => {
      const path = item?.photo_path;
      if (path)
        return {
          id: item.vehicle_id,
          path: `https://pastauction.com/api/v1/photo/${path}`,
        };
    })
    .filter(Boolean);

  return { data: newData, totalPages, totalImages };
};

watch(
  () => modelName.value,
  async () => {
    if (!modelName.value) {
      images.value = [];
      totalPages.value = 0;
      totalImages.value = 0;
      return;
    }

    const imageData = await getImages(modelName.value, 1);
    if (imageData) {
      images.value = imageData.data;
      totalPages.value = imageData.totalPages;
      totalImages.value = imageData.totalImages;
    }
  }
);

watch(
  () => [modelName.value, device.value],
  async () => {
    if (!modelName.value || !device.value) return;

    const imageData = await getImages(modelName.value, currentPage.value);
    if (imageData) {
      images.value = imageData.data;
      totalPages.value = imageData.totalPages;
      totalImages.value = imageData.totalImages;
    }
  }
);

watch(
  () => selectedImages.value,
  () => !selectedImages.value?.length && (resetSelection.value = false)
);

watch(
  () => props.resetGallery,
  () => props.resetGallery && (images.value = [])
);

const handlePageChanged = async (page: number) => {
  currentPage.value = page;
  const imagesArray = await getImages(modelName.value, page);
  if (imagesArray) images.value = imagesArray.data;
};

const handleImageClick = (image: ImageGrid) => {
  const wholePath = image?.path;
  if (wholePath) colorUpdateStore.selectedGalleryImageWholePath = wholePath;
};

const resetMultipleSelection = () => (resetSelection.value = true);
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-4 md:min-w-[1300px]"
  >
    <!-- DESKTOP -->
    <template class="hidden md:block bg-[#212529]">
      <!-- DESKTOP SINGLE -->
      <ImageryGrid
        v-if="colorUpdateStore.galleryMode === 'single'"
        :images="slicedImages"
        class="w-full border-[8px] !border-[#212529] rounded-[4px] h-[348px]"
        columnCombination="11x110"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
        :fixedHeight="83"
      />
      <!-- DESKTOP MULTIPLE -->
      <ImageryGrid
        v-else
        :images="slicedImages"
        class="w-full border-[8px] !border-[#212529] rounded-[4px] justify-around"
        columnCombination="8x152"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
      />
    </template>

    <!-- TABLET -->
    <template class="hidden sm:block md:hidden">
      <!-- TABLET SINGLE -->
      <ImageryGrid
        v-if="colorUpdateStore.galleryMode === 'single'"
        :images="slicedImages"
        class="border-[8px] !border-[#212529] rounded-[4px]"
        columnCombination="7x80"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
      />
      <!-- TABLET MULTIPLE -->
      <ImageryGrid
        v-else
        :images="slicedImages"
        class="border-[8px] !border-[#212529] rounded-[4px] !w-full justify-around"
        columnCombination="3x152"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
      />
    </template>

    <!-- MOBILE -->
    <template class="block sm:hidden">
      <!-- MOBILE SINGLE -->
      <ImageryGrid
        v-if="colorUpdateStore.galleryMode === 'single'"
        :images="slicedImages"
        class="border-[8px] !border-[#212529] rounded-[4px]"
        columnCombination="3x80"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
      />
      <!-- MOBILE MULTIPLE -->
      <ImageryGrid
        v-else
        :images="slicedImages"
        class="border-[8px] !border-[#212529] rounded-[4px] !w-full justify-around"
        columnCombination="2x152"
        :onImageClick="handleImageClick"
        :activateSelection="colorUpdateStore.selectionMode === 'multiple'"
        :resetSelection="computedResetSelection"
        showTooltipId
        :getSelectedImages="images => (selectedImages = images)"
      />
    </template>

    <!-- PAGINATION -->
    <div class="flex gap-4">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalImages="totalImages"
        @onPageChanged="handlePageChanged"
      />
      <v-btn
        v-if="colorUpdateStore.selectionMode === 'multiple'"
        class="bg-black text-white py-2 text-[14px]"
        @click="resetMultipleSelection"
      >
        Reset
      </v-btn>
    </div>
  </div>
</template>
