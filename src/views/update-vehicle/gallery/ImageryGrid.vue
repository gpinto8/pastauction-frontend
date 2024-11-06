<script lang="tsx" setup>
import { ref, watch } from 'vue';

export type ImageGrid = { id: number; path?: string; metadata?: any };
export type ImagesGridProps = ImageGrid[];

type ColumnCombinations =
  | '7x60'
  | '4x80'
  | '4x100'
  | '5x80'
  | '15x80'
  | '15xauto'
  | '2x80'
  | '6x80'
  | '5x54'
  | '8xauto'
  | '8x152'
  | '3x80';

const props = defineProps<{
  images: ImagesGridProps;
  classContainer?: string;
  columnCombination: ColumnCombinations; // It gotta be MAX_ROWS x SIZE
  onImageClick?: (image: ImageGrid) => void;
  autoHeight?: boolean;
  activateSelection?: boolean;
  resetSelection?: boolean;
}>();

const selectedImages = ref<number[]>([]);

watch(
  () => props.resetSelection,
  () => (selectedImages.value = [])
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
  '15xauto': 'grid-cols-[repeat(15,auto)]',
  '5x54': 'grid-cols-[repeat(5,54px)]',
  '8xauto': 'grid-cols-[repeat(8,auto)]',
  '8x152': 'grid-cols-[repeat(8,152px)]',
  '3x80': 'grid-cols-[repeat(3,80px)]',
};
const size = +props.columnCombination.split('x')[1];
const gridClass = `grid ${gridMap[props.columnCombination]} border-2 border-solid border-black`;

const handleClick = (image: ImageGrid, index: number) => {
  props.onImageClick?.(image);

  if (props.activateSelection) {
    if (selectedImages.value.includes(index)) {
      selectedImages.value = selectedImages.value.filter(i => i !== index);
      return;
    }
    selectedImages.value = [...(selectedImages.value || []), index];
  }
};
</script>

<template>
  <div
    class="!w-fit"
    :class="[gridClass, {[classContainer as any]: classContainer}]"
  >
    <div
      v-for="(image, i) in images"
      :key="i"
      :class="{ 'cursor-pointer': image.id }"
    >
      <img
        :src="image?.path"
        alt=""
        :width="size"
        :height="!autoHeight ? size : 0"
        class="block border-2 border-solid border-black"
        :class="{ 'border-4 border-[#0D6EFD]': selectedImages.includes(i) }"
        :style="{
          height: autoHeight ? 'auto' : `${size}px`,
          width: `${size}px`,
        }"
        @click="() => image.id && handleClick(image, i)"
      />
      <v-tooltip activator="parent" location="top" :open-delay="1000">
        <img :src="image.path" alt="" :width="640" :height="480" />
      </v-tooltip>
    </div>
  </div>
</template>
