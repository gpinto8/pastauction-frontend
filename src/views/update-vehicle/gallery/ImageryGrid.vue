<script lang="tsx" setup>
import { ref, watch } from 'vue';

export type ImageGrid = { id: number; path?: string; metadata?: any };
export type ImagesGridProps = ImageGrid[];

type ColumnCombinations =
  | '7x60'
  | '4x80'
  | '4x100'
  | '5x80'
  | '11x110'
  | '15x80'
  | '15xauto'
  | '2x80'
  | '6x80'
  | '5x54'
  | '8xauto'
  | '8x152'
  | '7x80'
  | '3x70'
  | '3x152'
  | '2x152'
  | '3x80';

const props = defineProps<{
  images: ImagesGridProps;
  classContainer?: string;
  columnCombination: ColumnCombinations; // It gotta be MAX_ROWS x SIZE
  onImageClick?: (image: ImageGrid) => void;
  autoHeight?: boolean;
  activateSelection?: boolean;
  resetSelection?: boolean;
  noImageText?: string;
  showTooltipId?: boolean;
  fixedHeight?: number;
  getSelectedImages?: (images: ImagesGridProps) => void;
}>();

const selectedImages = ref<ImagesGridProps>([]);

watch(
  () => props.resetSelection,
  () => (selectedImages.value = [])
);

watch(
  () => selectedImages.value,
  () => props.getSelectedImages?.(selectedImages.value)
);

// We create a static map of tailwind classes since we can't dynamically generate them (as per: https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
const gridMap: { [key in ColumnCombinations]: string } = {
  '7x60': 'grid-cols-[repeat(7,60px)]',
  '2x80': 'grid-cols-[repeat(2,80px)]',
  '5x80': 'grid-cols-[repeat(5,80px)]',
  '4x80': 'grid-cols-[repeat(4,80px)]',
  '4x100': 'grid-cols-[repeat(4,100px)]',
  '6x80': 'grid-cols-[repeat(6,80px)]',
  '15x80': 'grid-cols-[repeat(15,80px)]',
  '11x110': 'grid-cols-[repeat(11,110px)]',
  '15xauto': 'grid-cols-[repeat(15,auto)]',
  '5x54': 'grid-cols-[repeat(5,54px)]',
  '8xauto': 'grid-cols-[repeat(8,auto)]',
  '8x152': 'grid-cols-[repeat(8,152px)]',
  '7x80': 'grid-cols-[repeat(7,80px)]',
  '3x70': 'grid-cols-[repeat(3,70px)]',
  '3x152': 'grid-cols-[repeat(3,152px)]',
  '2x152': 'grid-cols-[repeat(2,152px)]',
  '3x80': 'grid-cols-[repeat(3,80px)]',
};
const size = +props.columnCombination.split('x')[1];
const gridClass = `grid ${gridMap[props.columnCombination]} border-2 border-solid border-black`;

const handleClick = (image: ImageGrid, index: number) => {
  props.onImageClick?.(image);

  if (props.activateSelection) {
    if (selectedImages.value?.some(item => item?.id === image.id)) {
      const filteredArray = selectedImages.value?.filter(
        item => item.id !== image.id
      );
      selectedImages.value = filteredArray;
    } else {
      const mergedData = [
        ...(selectedImages.value?.filter(item => item?.id !== image?.id) || []),
        image,
      ];
      selectedImages.value = mergedData;
    }
  }
};
</script>

<template>
  <div
    class="!w-fit bg-[#212529]"
    :class="[gridClass,
      {[classContainer as any]: classContainer,  
      '!bg-[#212529B2]': noImageText  }
    ]"
  >
    <div
      v-if="images?.length"
      v-for="(image, i) in images"
      :key="i"
      :class="{ 'cursor-pointer': image.id }"
    >
      <img
        v-if="image?.path"
        :src="image?.path"
        alt=""
        :width="size"
        :height="!autoHeight ? size : 0"
        class="block border-2 border-solid border-black"
        :class="{
          'border-4 !border-[#0D6EFD]': selectedImages.some(
            item => item?.id === image.id
          ),
        }"
        :style="{
          height: fixedHeight
            ? `${fixedHeight}px`
            : autoHeight
              ? 'auto'
              : `${size}px`,
          width: `${size}px`,
        }"
        @click="() => image.id && handleClick(image, i)"
      />
      <div
        v-else
        class="text-white grid place-content-center border-2 border-solid border-black"
        :class="{
          'border-4 !border-[#0D6EFD]': selectedImages.some(
            item => item?.id === image.id
          ),
        }"
        :style="{
          height: autoHeight ? 'auto' : `${size}px`,
          width: `${size}px`,
        }"
        @click="() => image.id && handleClick(image, i)"
      >
        {{ image?.id }}
      </div>
      <v-tooltip activator="parent" location="top" :open-delay="1000">
        <img :src="image.path" alt="" :width="640" :height="480" />
        <div v-if="showTooltipId" class="text-right w-full mb-3 ml-1">
          <span
            class="bg-black text-white p-2 mb-4 rounded-lg border-[2px] border-white"
          >
            ID: {{ image.id }}
          </span>
        </div>
      </v-tooltip>
    </div>
    <div
      v-else-if="noImageText"
      class="flex justify-center items-center w-max h-full"
    >
      <div class="w-[80%] text-center text-white">
        {{ noImageText }}
      </div>
    </div>
  </div>
</template>
