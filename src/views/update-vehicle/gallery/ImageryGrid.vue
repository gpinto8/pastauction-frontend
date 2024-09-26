<script lang="tsx" setup>
type ColumnCombinations =
  | '7x60'
  | '5x80'
  | '15x80'
  | '2x80'
  | '6x80'
  | '5x54'
  | '3x80';

const props = defineProps<{
  images: (string | undefined)[];
  classContainer?: string;
  columnCombination: ColumnCombinations; // It gotta be MAX_ROWS x SIZE
}>();

// We create a static map of tailwind classes since we can't dynamically generate them (as per: https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
const gridMap: { [key in ColumnCombinations]: string } = {
  '7x60': 'grid-cols-[repeat(7,60px)]',
  '2x80': 'grid-cols-[repeat(2,80px)]',
  '5x80': 'grid-cols-[repeat(5,80px)]',
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
    <img
      v-for="(image, i) in images"
      :key="i"
      :src="image"
      alt="gallery image"
      :width="size"
      :height="size"
      class="block border-2 border-solid border-black"
      :style="{ height: `${size}px`, width: `${size}px` }"
    />
  </div>
</template>
