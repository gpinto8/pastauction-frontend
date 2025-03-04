<script lang="ts" setup>
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
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

defineProps<{
  vehicleData: any;
}>();

const colorUpdateStore = colorUpdate();

const image = computed(() => {
  const selectedWholePath = colorUpdateStore.selectedGalleryImageWholePath;
  if (selectedWholePath) return selectedWholePath;
});

const colorData = ref<any>([]);
const resetColorValues = ref(false);

const isMultipleGallery = computed(
  () => colorUpdateStore.selectionMode === 'multiple'
);

onMounted(async () => {
  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);
});

const imageCanvas = ref();
const ctx = computed(
  () => imageCanvas.value && imageCanvas.value.getContext('2d')
);

watch(
  () => image.value,
  () => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enable CORS if the image is from another domain
    img.onload = () => {
      if (img?.width && imageCanvas.value?.width)
        imageCanvas.value.width = img.width;
      if (img?.height && imageCanvas.value?.height)
        imageCanvas.value.height = img.height;
      ctx.value?.drawImage?.(img, 0, 0);
    };
    if (image.value) img.src = image.value;
  },
  { immediate: true }
);

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
};

const handleSubColorSelection = async (selectedColor?: ColorProps) => {
  if (selectedColor) {
    colorUpdateStore.selectedColorFromGallery = selectedColor;

    const { name } = colorUpdateStore.selectedColorFromGallery || {};

    for (const pickColor of colorUpdateStore.selectedPickColors) {
      const { selected, key } = pickColor || {};

      if (selected) {
        const dynamicColor = colorUpdateStore.dynamicColors.find(
          color => color.key === key
        );

        if (dynamicColor) dynamicColor.value = name;
      }
    }
  }
};

watch(
  () => colorUpdateStore.selectionMode,
  () => (resetColorValues.value = !resetColorValues.value)
);
</script>

<template>
  <div
    class="flex gap-4 w-full justify-between flex-col md:flex-row"
    :class="{ 'justify-center': isMultipleGallery }"
  >
    <!-- VEHICLE SPECIFICATION -->
    <VehicleSpecification
      v-if="!isMultipleGallery"
      class="hidden md:block"
      :vehicleData="vehicleData"
    />

    <!-- PICK COLOR FROM IMAGE -->
    <PickColor :hidePickColor="isMultipleGallery" class="flex md:hidden" />

    <!-- MAIN PICTURE -->
    <div
      v-if="!isMultipleGallery"
      class="md:w-[-webkit-fill-available] flex justify-center items-center !p-4 bg-[#DEE2E6] rounded-lg overflow-auto md:max-h-[500px]"
    >
      <canvas
        ref="imageCanvas"
        alt="main-image"
        @click="handleSelection"
        class="rounded-lg"
      ></canvas>
    </div>

    <!-- COLOR SELECTIONS -->
    <div class="flex flex-col md:min-w-[280px] md:w-fit gap-4 w-full">
      <!-- SELECT COLOR FROM LIBRARY -->
      <div class="bg-[#DEE2E6] p-4 h-full w-full rounded-lg">
        <ColorMainNuance
          title="Select color from library"
          classTitle="font-bold text-xl !mb-4"
          @onSelectedSubColor="handleSubColorSelection"
          :resetValues="resetColorValues"
        />
      </div>

      <!-- PICK COLOR FROM IMAGE -->
      <PickColor :hidePickColor="isMultipleGallery" class="hidden md:flex" />
    </div>

    <!-- VEHICLE SPECIFICATION -->
    <VehicleSpecification
      v-if="!isMultipleGallery"
      class="block md:hidden"
      :vehicleData="vehicleData"
    />
  </div>
</template>
