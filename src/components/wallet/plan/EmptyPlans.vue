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
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { useCardsPlansStore } from '@/store/plans/cards';
import PlanDetail from './PlanDetail.vue';
import { computed } from 'vue';
import { useAsyncComputed } from '@/lib/async-computed';

// Variables
const cardsStore = useCardsPlansStore();
const emits = defineEmits(['buyThisPlan']);

function getFamilyInfo(name: string) {
  switch (name) {
    case 'Free-user':
      return 'Perpetual plan';
    case 'Pay-per-use':
      return 'Bolts required';
    case 'Ready Plans':
      return 'Monthly Plan';
    case 'Start Plans':
      return 'Monthly Plan';
    default:
      return 'Annual Plan';
  }
}

const buyThisPlan = (familyId: number) => {
  const family = planToCompare.result.value?.find(
    item =>
      item.category === 'Subscription' || item.category === 'Subscription_ppu'
  );

  if (!family) {
    throw new Error('Family not found');
  }

  emits('buyThisPlan', {
    family: family.family,
    name: family.name,
    prezzo: family.prezzo,
    info: getFamilyInfo(family.name),
  });
  cardsStore.setCurrentFamilyId(familyId);
};

const planToCompare = useAsyncComputed(
  computed(async () => {
    if (!cardsStore.getCurrentPlan) return null;
    return fetchProductListById(cardsStore.getCurrentPlan) as Promise<
      Product[]
    >;
  })
);
</script>

<template>
  <template v-if="!planToCompare.result.value">
    <div
      class="flex !w-[526px] h-[1420px] pb-[1096px] flex-col items-center gap-[152px] rounded-[12px] bg-opacity-3 bg-gray-100 shadow-xs"
      style="background: rgba(33, 37, 41, 0.03)"
    >
      <div class="bg-grey w-100 h-[150px] w-full border-black border-b-2"></div>
      <div
        class="w-460 text-white text-opacity-85 font-inter text-[28px] font-semibold leading-[42px]"
      >
        Choose a second plan to compare
      </div>
    </div>
  </template>
  <template v-else>
    <PlanDetail
      :products="planToCompare.result.value"
      @buy-this-plan="buyThisPlan"
    ></PlanDetail>
  </template>
</template>
