<script setup lang="ts">
// Interface
interface Product {
  category: string;
  currency: string;
  family: number;
  id: number;
  name: string;
  prezzo: number;
  properties: {
    id: number;
    product_id: number;
    tipo: string;
    value: string;
  };
}

// Import
import { Swiper, SwiperSlide } from 'swiper/vue';
import PlansPricingCard from '@/components/wallet/plan/PlansPricingCard.vue';
import EmptyPlans from '@/components/wallet/plan/EmptyPlans.vue';

// Emits
const emits = defineEmits(['moreInfoClicked', 'buyThisPlan']);

const buyThisPlan = (plan: Product) => {
  emits('buyThisPlan', plan);
};

// Props
const props = defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div class="mt-[35px] mb-[35px] overflow-x-hidden font-inter">
    <div class="text-[#3C3C3C] font-inter text-16 font-normal leading-5">
      By choosing the READY plan you can get these advantages
    </div>
  </div>
  <div class="flex justify-between gap-[40px] font-inter">
    <swiper
      :breakpoints="{
        0: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      }"
    >
      <swiper-slide>
        <PlansPricingCard
          :products="props.products"
          @buyThisPlan="buyThisPlan"
        />
      </swiper-slide>
      <swiper-slide>
        <EmptyPlans @buyThisPlan="buyThisPlan" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.swiper {
  overflow: visible;
  width: 100%;
}
</style>
