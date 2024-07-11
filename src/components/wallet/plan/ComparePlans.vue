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
import { defineProps } from 'vue';
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
  <div class="flex items-start gap-[40px] font-inter">
    <div class="flex items-start gap-[10px] overflow-x-scroll">
      <!--  Passo i dati per renderizzare il primo componente sulla sx -->
      <PlansPricingCard :products="props.products" @buyThisPlan="buyThisPlan" />
      <!-- componente che ospita la card prima vuota -->
      <EmptyPlans @buyThisPlan="buyThisPlan" />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
