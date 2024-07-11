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
import { defineProps, onMounted, ref } from 'vue';
import PlansInfoSelection from '@/components/wallet/common/PlansInfoSelection.vue';
import ComparePlans from '@/components/wallet/plan/ComparePlans.vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';

// Props
let props = defineProps<{
  familyID: number;
}>();

const emits = defineEmits(['buyThisPlan']);

// Variables
const propsID = typeof props.familyID === 'number' ? props.familyID : 6; // Verifico l'esistenza dei dati e li salvo in una variabile.
const currentValueFamily = ref<number>(1); // props per PlansInfoSelection.
const products = ref<Product[]>([]);
const isLoading = ref(true);

const buyThisPlan = (plan: Product) => {
  emits('buyThisPlan', plan);
};

// onMounted
onMounted(async () => {
  try {
    const products = await fetchProductListById(propsID);
    currentValueFamily.value = propsID;
    products.value = products; // Salvo i dati in productsData.
    isLoading.value = false; // Elemento di caricamento.
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
    isLoading.value = false;
  }
});
</script>

<template>
  <!-- Barra superiore (cards badge) -->
  <PlansInfoSelection :currentValueFamily="Number(propsID)" />
  <!-- Componente centrale di due colonne sx(cards corrente) dx(vuoto, pronto per compare) -->
  <ComparePlans
    v-if="!isLoading"
    :products="products"
    @buyThisPlan="buyThisPlan"
  />
</template>

<style scoped></style>
