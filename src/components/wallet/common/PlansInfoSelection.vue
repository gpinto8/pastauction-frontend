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
import { ref } from 'vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { useCardsPlansStore } from '@/store/plans/cards';
import { families } from '../plan/definitions';

// Emits
const emits = defineEmits(['activeProduct']);

// Props
let props = defineProps<{
  currentValueFamily: number; // id attivo
}>();

// Variables
let filterProducts: Record<number, Product[]> = {}; // Filtro i dati.
let orderedFamilyIds = ref<number[]>([]); // Ordino le famiglie.
let activeProduct = ref<number>(6); // Per aggiungere active class.
let swiperOptions = {
  breakpoints: {
    360: {
      slidesPerView: 1.8,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.8,
      spaceBetween: 50,
    },
  },
};
const cardsStore = useCardsPlansStore(); // init

// Function
// Recupera tutti i family-id e passali alla getItemsForCard per ottenere i risultati.
function getFamilyName(family: number): string {
  switch (family) {
    case 1:
      return 'Free';
    case 2:
      return 'PayPerUse';
    case 3:
      return 'Ready';
    case 4:
      return 'Start';
    case 5:
      return 'Go';
    case 6:
      return 'Pro';
    default:
      return 'Unknown';
  }
}
// Colori delle cards
const getBadgeStyle = (familyId: number) => {
  const backgroundColor = families[familyId].color;
  return { backgroundColor };
};
// Chimaata Ajax
const getItemsForCard = async (familyId: number): Promise<void> => {
  try {
    const productsForFamily = await fetchProductListById(familyId);

    // Category filter
    const subscriptionProducts = productsForFamily.filter(
      (item: Product) =>
        item.category === 'Subscription' || item.category === 'Subscription_ppu'
    );

    filterProducts[familyId] = subscriptionProducts;
    orderedFamilyIds.value.push(familyId);
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
  }
};
// Chiamate AJAX per ogni ID di famiglia
(async () => {
  const order = [6, 5, 1, 2, 3, 4];
  for (const familyId of order) {
    await getItemsForCard(familyId);
  }
})();

const handleBadgeClick = (familyId: number) => {
  emits('activeProduct', familyId);
  activeProduct.value = familyId;
  cardsStore.setCurrentPlan(familyId);
};
</script>

<template>
  <div
    class="hidden lg:flex gap-2 align-end h-[150px] border-b-[1px] border-black"
  >
    <div
      v-for="familyId in orderedFamilyIds"
      :key="familyId"
      class="badge cursor-pointer w-full rounded-t-lg"
      :style="getBadgeStyle(familyId)"
      :class="{
        active:
          familyId === props.currentValueFamily || activeProduct === familyId,
      }"
      @click="handleBadgeClick(familyId)"
    >
      <div class="flex flex-col gap-2 px-4 pt-6 pb-[14px]">
        <div class="flex justify-between">
          <h4
            class="text-xl title-js font-semibold"
            v-for="(product, productIndex) in filterProducts[familyId]"
            :key="productIndex"
          >
            {{ product.name }}
          </h4>
          <img class="w-4.5 h-4.5" src="@/assets/icons/info.svg" alt="info" />
        </div>
        <!-- /title -->
        <div
          v-for="(product, productIndex) in filterProducts[familyId]"
          :key="productIndex"
          class="flex text-2xl"
        >
          <img
            class="w-7 h-7"
            src="@/assets/images/bronze_token.png"
            alt="token"
          />
          <div
            class="w-[49px] text-[#101828] font-inter text-24 font-semibold leading-[32px]"
          >
            <div>{{ product.prezzo }}</div>
          </div>
        </div>
        <!-- /token -->
        <p class="text-gray-600">Perpetual Plan</p>
      </div>
    </div>
  </div>

  <swiper
    :breakpoints="swiperOptions.breakpoints"
    :centered-slides="false"
    :pagination="{ clickable: true }"
    class="swiperPlansInfoSelection lg:!hidden"
    style="padding-bottom: 50px; width: 100%"
  >
    <swiper-slide
      class="cursor-pointer"
      v-for="familyId in orderedFamilyIds"
      :key="familyId"
      @click="handleBadgeClick(familyId)"
    >
      <div
        class="badge flex flex-col rounded-xl gap-4 shadow-xl"
        :style="getBadgeStyle(familyId)"
      >
        <div class="flex justify-between px-8 pt-8">
          <h4
            class="title-js font-semibold"
            v-for="(product, productIndex) in filterProducts[familyId]"
            :key="productIndex"
          >
            {{ product.name }}
          </h4>
          <img class="w-4.5 h-4.5" src="@/assets/icons/info.svg" alt="info" />
        </div>
        <!-- /title -->
        <div
          v-for="(product, productIndex) in filterProducts[familyId]"
          :key="productIndex"
          class="flex px-8"
        >
          <img
            class="w-7 h-7"
            src="@/assets/images/bronze_token.png"
            alt="token"
          />
          <div
            class="w-[49px] text-[#101828] font-inter text-24 font-semibold leading-[32px]"
          >
            <div>{{ product.prezzo }}</div>
          </div>
        </div>
        <!-- /token -->
        <p class="text-gray-600 px-8 pb-8">Perpetual Plan</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.badge {
  /* @apply h-full; */
}
.badge.active {
  /* transform: translateY(-15px); */
  padding-top: 24px;
}
</style>
