<script setup lang="ts">
// Import
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import PlansCard from '@/components/wallet/plan/PlansCard.vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';

// Emits
const emits = defineEmits(['handleInfoClicked', 'handleBuyClick']);

// Variables
const loading = ref(true);
const productsData: Record<string, any> = ref({});
const modules = ref([Pagination]);
const swiperOptions = {
  breakpoints: {
    360: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    670: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
};

// onMounted
onMounted(async () => {
  try {
    const familiesIds: Record<string, number> = {
      free: 6,
      paypp: 5,
      ready: 1,
      start: 2,
      go: 3,
      pro: 4,
    };

    Promise.all(
      Object.entries(familiesIds).map(
        async ([key, value]) => await fetchProductListById(value)
      )
    )
      .then(products => {
        for (const [index, family] of Object.entries(products)) {
          productsData.value[index] = family;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
  }
});

// Function
function handleMoreInfoClicked(familyID: number) {
  emits('handleInfoClicked', familyID);
}

function handleBuyClick(family: any) {
  emits('handleBuyClick', family);
}
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-96">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </div>

  <v-slide-y-transition>
    <swiper
      v-show="!loading"
      :breakpoints="swiperOptions.breakpoints"
      :centered-slides="false"
      :pagination="{ clickable: true }"
      :modules="modules"
      class="swiperPlans overflow-visible"
      style="padding-bottom: 50px; width: 100%"
    >
      <swiper-slide v-for="(family, index) in productsData" :key="index">
        <PlansCard
          :data="family"
          @handleInfoClicked="handleMoreInfoClicked($event)"
          @handleBuyClick="handleBuyClick($event)"
        />
      </swiper-slide>
    </swiper>
  </v-slide-y-transition>
</template>

<style scoped>
.swiperPlan {
  @apply w-full;
}
</style>
