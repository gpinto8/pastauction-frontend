<script lang="tsx" setup>
export type ImageGrid = { id: number; path: string; metadata?: any };
export type ImagesGridProps = ImageGrid[];

type ColumnCombinations =
  | '7x60'
  | '4x80'
  | '4x100'
  | '5x80'
  | '15x80'
  | '2x80'
  | '6x80'
  | '5x54'
  | '3x80';

const props = defineProps<{
  images: ImagesGridProps;
  classContainer?: string;
  columnCombination: ColumnCombinations; // It gotta be MAX_ROWS x SIZE
  onImageClick?: (image: ImageGrid) => void;
  autoHeight?: boolean;
}>();

// We create a static map of tailwind classes since we can't dynamically generate them (as per: https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
const gridMap: { [key in ColumnCombinations]: string } = {
  '7x60': 'grid-cols-[repeat(7,60px)]',
  '2x80': 'grid-cols-[repeat(2,80px)]',
  '5x80': 'grid-cols-[repeat(5,80px)]',
  '4x80': 'grid-cols-[repeat(4,80px)]',
  '4x100': 'grid-cols-[repeat(4,100px)]',
  '6x80': 'grid-cols-[repeat(6,80px)]',
  '15x80': 'grid-cols-[repeat(15,80px)]',
  '5x54': 'grid-cols-[repeat(5,54px)]',
  '3x80': 'grid-cols-[repeat(3,80px)]',
};
const size = +props.columnCombination.split('x')[1];
const gridClass = `grid ${gridMap[props.columnCombination]} border-2 border-solid border-black`;
</script>

<template>
  <div :class="[gridClass, {[classContainer as any]: classContainer}]">
    <div v-for="(image, i) in images" :key="i" class="cursor-pointer">
      <img
        :src="image.path"
        alt=""
        :width="size"
        :height="!autoHeight ? size : 0"
        class="block border-2 border-solid border-black"
        :style="{
          height: autoHeight ? 'auto' : `${size}px`,
          width: `${size}px`,
        }"
        @click="() => image.path && onImageClick?.(image)"
      />
      <v-tooltip activator="parent" location="top" :open-delay="1000">
        <img :src="image.path" alt="" :width="300" :height="300" />
      </v-tooltip>
    </div>
  </div>
</template>
