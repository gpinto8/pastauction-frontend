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
import { useCardsPlansStore } from '@/store/plans/cards';
import PlanDetail from './PlanDetail.vue';

// Emits
const emits = defineEmits(['buyThisPlan']);

// Props
const props = defineProps<{
  products: Product[];
}>();

// Variables
const mappedDatas = props.products.map((item: any) => ({
  category: item.category,
  currency: item.currency,
  family: item.family,
  id: item.id,
  name: item.name,
  prezzo: item.prezzo !== 0 ? item.prezzo : '***',
  prezzoAnno: item.prezzo / 5,
  prezzoMese: item.prezzo / 5 / 12,
  tipologia: item.tipologia,
  propertiesId: item.properties.id,
  propertiesProduct_id: item.properties.product_id,
  propertiesTipo: item.properties.tipo,
  propertiesValue: item.properties.value,
}));
const nameFamilies = mappedDatas.filter(
  item =>
    item.category === 'Subscription' || item.category === 'Subscription_ppu'
);
const cardsStore = useCardsPlansStore(); // init

// Function
const buyThisPlan = (familyId: number) => {
  const family = nameFamilies.find(item => item.family === familyId);
  emits('buyThisPlan', family);
  cardsStore.setCurrentFamilyId(familyId);
};
</script>

<template>
  <PlanDetail :products="products" @buy-this-plan="buyThisPlan"></PlanDetail>
</template>
