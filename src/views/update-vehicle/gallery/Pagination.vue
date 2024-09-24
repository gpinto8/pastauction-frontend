<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalImages: number;
}>();

const emit = defineEmits(['onPageChanged']);

const currentPage = ref(props.currentPage);
watch(
  () => props.currentPage,
  value => (currentPage.value = value)
);

const visiblePages = computed(() => {
  if (props.totalPages === 1) return [1];
  if (props.totalPages === 2) return [1, 2];
  if (props.totalPages === 3) return [1, 2, 3];

  const currentValue = currentPage.value;
  const firstValue = currentValue - 3 || 1;
  const secondValue = currentValue - 2 || 2;
  const thirdValue = currentValue - 1 || 3;

  if (currentValue <= 3) {
    return [1, 2, 3, 4];
  }

  return [firstValue, secondValue, thirdValue, currentValue];
});

const handlePage = (page: number) => {
  currentPage.value = page;
};
const handleDots = (control: 'next' | 'prev') => {
  if (control === 'next') {
    currentPage.value = props.totalPages;
  } else {
    currentPage.value = 1;
  }
};

const handleControl = (control: 'next' | 'prev') => {
  const pagesRange = [];
  pagesRange.length = props.totalPages;
  for (let i = 0; i < props.totalPages; i++) {
    pagesRange[i] = i + 1;
  }

  if (control === 'next') {
    const newValue = currentPage.value + 1;
    if (!pagesRange.includes(newValue)) return;
    currentPage.value = newValue;
  } else {
    const newValue = currentPage.value - 1;
    if (!pagesRange.includes(newValue)) return;
    currentPage.value = newValue;
  }
};

watch(currentPage, value => {
  emit('onPageChanged', value);
});
</script>

<template>
  <div class="pagination">
    <div class="title">{{ totalImages }} items</div>
    <div class="buttons" v-if="totalPages && totalImages">
      <div class="arrow" @click="handleControl('prev')">
        <img src="@/assets/svg/greater-than.svg" alt="Arrow right" />
      </div>
      <div
        class="text !no-underline"
        v-if="props.totalPages > 5 && currentPage >= 5"
        @click="handleDots('prev')"
      >
        ...
      </div>
      <div
        class="text"
        :class="{
          'bg-[#0D6EFD] text-white': currentPage === page,
        }"
        @click="handlePage(page)"
        v-for="page in visiblePages"
        :key="page"
      >
        {{ page }}
      </div>
      <div
        class="text !no-underline"
        v-if="props.totalPages > 5 && currentPage !== props.totalPages"
        @click="handleDots('next')"
      >
        ...
      </div>
      <div class="arrow" @click="handleControl('next')">
        <img src="@/assets/svg/less-than.svg" alt="Arrow left" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;

  .title {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
  }

  .buttons {
    display: flex;

    * {
      cursor: pointer;
    }

    .text {
      border: 1px solid #dee2e6;
      width: fit-content;
      padding: 4px;
      height: 31px;
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      text-align: left;
      color: #0d6efd;
      display: grid;
      place-items: center;
      text-decoration: underline;
    }

    .arrow {
      display: grid;
      place-items: center;
      padding: 0;
      border: 1px solid #dee2e6;
      width: 30px;
      height: 31px;

      img {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
