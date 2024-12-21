<script lang="ts" setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import ColorMainNuance from '../update-vehicle/ColorMainNuance.vue';
import VehicleSpecification from './VehicleSpecification.vue';
import PickColor from './PickColor.vue';
import { colorUpdate } from '@/store/color-update';

type ColorProps = {
  id: number;
  name: string;
  hex_code: string;
  id_family: number;
};

const colorUpdateStore = colorUpdate();

const image =
  'https://pastauction.com/api/v1/photo/gAAAAABm8Rztu3cVcqgPWxxZNFss3B-a3fQV5lpM7-SxYAfVJdF_oNKOx_e2LQ7d_KSL0YYI8VYWPN4fQcHr27wjXFibZiMkIL9j0k9x2yD0ANhaFG6_BYEi7BZBshs2IG2OtFWNoNOiO3YuS8SzMhez_i3dWd_4LkFlzX27rIZnLDr7Bs6Q1RHfjOAP8b_gJUnMQJL6Be9Ptmy6EiC-5jg7k-AJq4Nqrg==';
const colorData = ref<any>([]);

const isMultipleGallery = computed(
  () => colorUpdateStore.selectionMode === 'multiple'
);

onMounted(async () => {
  console.log('mounted');
  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);
});

const handleSubColorSelection = (color?: ColorProps) => {
  console.log('sub color selected', color);
};
const imageCanvas = ref();
const ctx = computed(
  () => imageCanvas.value && imageCanvas.value.getContext('2d')
);

onMounted(() => {
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // Enable CORS if the image is from another domain
  img.onload = () => {
    if (imageCanvas.value?.width) imageCanvas.value.width = img.width;
    if (imageCanvas.value?.height) imageCanvas.value.height = img.height;
    ctx.value.drawImage(img, 0, 0);
  };
  img.src = image;
});

const handleSelection = (e: any) => {
  if (!colorUpdateStore.selectingHexColor) return;

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${[r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')}`.toUpperCase();
  };

  const rect = imageCanvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const pixelData = ctx.value.getImageData(x, y, 1, 1).data;
  const [r, g, b] = pixelData;
  const hexColor = rgbToHex(r, g, b);

  colorUpdateStore.selectedHexColor = hexColor;
  colorUpdateStore.selectingHexColor = false;
};
</script>

<template>
  <div
    class="flex gap-4 w-full justify-between flex-col md:flex-row"
    :class="{ 'justify-center': isMultipleGallery }"
  >
    <!-- VEHICLE SPECIFICATION -->
    <VehicleSpecification v-if="!isMultipleGallery" class="hidden md:block" />

    <!-- PICK COLOR FROM IMAGE -->
    <PickColor v-if="!isMultipleGallery" class="flex md:hidden" />

    <!-- MAIN PICTURE -->
    <div v-if="!isMultipleGallery" class="md:w-fit bg-[#DEE2E6] rounded-lg">
      <canvas
        ref="imageCanvas"
        alt="main-image"
        @click="handleSelection"
        class="w-full md:!w-[466px] md:!h-[398px] rounded-lg"
      ></canvas>
    </div>

    <!-- COLOR SELECTIONS -->
    <div class="flex flex-col md:w-[435px] gap-4 w-full">
      <!-- SELECT COLOR FROM LIBRARY -->
      <div class="bg-[#DEE2E6] p-4 h-full w-full rounded-lg">
        <ColorMainNuance
          title="Select color from library"
          classTitle="font-bold text-xl !mb-4"
          @onSelectedSubColor="handleSubColorSelection"
        />
      </div>

      <!-- PICK COLOR FROM IMAGE -->
      <PickColor class="hidden md:flex" />
    </div>

    <!-- VEHICLE SPECIFICATION -->
    <VehicleSpecification v-if="!isMultipleGallery" class="block md:hidden" />
  </div>
</template>
