<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{ items: number; maxItems: number }>();

const emit = defineEmits(['currentPage']);

const pages = computed(() => {
  const items = Math.ceil(props.items / props.maxItems);
  return items;
});
const currentPage = ref<number>(1);
const MAX_PAGES = 4; // Including 4

const visiblePages = computed(() => {
  const currentValue = currentPage.value;
  const firstValue = currentValue - 3 || 1;
  const secondValue = currentValue - 2 || 2;
  const thirdValue = currentValue - 1 || 3;

  if (currentValue <= 3) {
    return [1, 2, 3, 4];
  }

  return [firstValue, secondValue, thirdValue, currentValue];
});

console.log({
  pages,
  currentPage,
});

watch(currentPage, value => {
  console.log({ value });
  emit('currentPage', value);
});

// defineExpose({
//   currentPage,
// });

const handlePage = (page: number) => {
  currentPage.value = page;
};
const handleDots = (control: 'next' | 'prev') => {
  console.log({ control });
  if (control === 'next') {
    currentPage.value = pages.value;
  } else {
    currentPage.value = 1;
  }
};

const handleControl = (control: 'next' | 'prev') => {
  console.log({ control });

  const pagesRange = [];
  pagesRange.length = pages.value;
  for (let i = 0; i < pages.value; i++) {
    pagesRange[i] = i + 1;
  }

  if (control === 'next') {
    const newValue = currentPage.value + 1;
    console.log('NEXT', {
      currentPage: currentPage.value,
      pages: pages.value,
      newValue,
    });
    if (!pagesRange.includes(newValue)) return;
    // if (newValue > pages.value) return;
    currentPage.value = newValue;
  } else {
    // console.log('else');
    const newValue = currentPage.value - 1;
    console.log('PREVIOUS', {
      currentPage: currentPage.value,
      pages: pages.value,
      newValue,
      includes: pagesRange.includes(newValue),
    });
    if (!pagesRange.includes(newValue)) return;

    currentPage.value = newValue;
  }
};
</script>

<template>
  <div class="pagination">
    <div class="title">{{ items }} items</div>
    {{ currentPage }}
    {{ MAX_PAGES }}
    {{ pages }}
    <div class="buttons">
      <div class="arrow" @click="handleControl('prev')">
        <img src="@/assets/svg/arrow-right.svg" alt="Arrow right" />
      </div>
      <div
        class="text !no-underline"
        v-if="currentPage >= 5"
        @click="handleDots('prev')"
      >
        ...
      </div>
      <div
        class="text"
        :class="{
          'bg-[#0D6EFD] text-white': currentPage === page,
          // hidden: page <= MAX_PAGES,
        }"
        @click="handlePage(page)"
        v-for="(page, index) in visiblePages"
        :key="page"
      >
        <!-- v-show="page <= MAX_PAGES" -->
        <!-- <div v-if="page <= MAX_PAGES"> -->
        {{ page }}
        <!-- </div> -->
      </div>
      <!-- <div class="text">1</div>
      <div class="text">2</div>
      <div class="text">3</div>
      <div class="text">4</div> -->
      <!-- v-if="pages > MAX_PAGES && currentPage !== pages" -->
      <div
        class="text !no-underline"
        v-if="currentPage !== pages"
        @click="handleDots('next')"
      >
        ...
      </div>
      <div class="arrow" @click="handleControl('next')">
        <img src="@/assets/svg/arrow-left.svg" alt="Arrow left" />
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
      width: 25px;
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
