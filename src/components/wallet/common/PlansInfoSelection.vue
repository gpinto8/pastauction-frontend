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
import { onBeforeMount } from 'vue';

// Emits
const emits = defineEmits(['activeProduct']);

// Props
let props = defineProps<{
  currentValueFamily?: number; // id attivo
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
      spaceBetween: 16,
    },
  },
};
const cardsStore = useCardsPlansStore(); // init
// Colori delle cards
const getBadgeStyle = (familyId: number) => {
  const { color } = families[familyId];
  return {
    backgroundColor: color.background,
    '--active-color': color.active,
  };
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
onBeforeMount(async () => {
  const order = [6, 5, 1, 2, 3, 4];
  await Promise.all(order.map(familyId => getItemsForCard(familyId)));
});

const handleBadgeClick = (familyId: number) => {
  emits('activeProduct', familyId);
  activeProduct.value = familyId;
  cardsStore.setCurrentPlan(familyId);
};

function normalizedPrize(price: number) {
  return price === 0 ? '***' : price;
}
</script>

<template>
  <div
    class="hidden lg:flex gap-2 align-end h-[150px] border-b-[1px] border-black"
  >
    <div
      v-for="familyId in orderedFamilyIds"
      :key="familyId"
      class="badge desktop-badge cursor-pointer w-full rounded-t-lg"
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
            {{ families[familyId].name }}
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
    class="swiperPlansInfoSelection lg:!hidden overflow-visible"
    style="padding-bottom: 50px; width: 100%"
  >
    <swiper-slide
      class="cursor-pointer"
      v-for="familyId in orderedFamilyIds"
      :key="familyId"
      @click="handleBadgeClick(familyId)"
    >
      <div
        class="badge mobile-badge flex flex-col rounded-[12px] gap-4 shadow-xl py-3 px-8"
        :style="getBadgeStyle(familyId)"
        :class="{
          active:
            familyId === props.currentValueFamily || activeProduct === familyId,
        }"
      >
        <div class="flex justify-between">
          <h4
            class="text-xl font-semibold"
            v-for="(product, productIndex) in filterProducts[familyId]"
            :key="productIndex"
          >
            {{ families[familyId].name }}
          </h4>
          <img class="w-4.5 h-4.5" src="@/assets/icons/info.svg" alt="info" />
        </div>
        <!-- /title -->
        <div
          v-for="(product, productIndex) in filterProducts[familyId]"
          :key="productIndex"
          class="flex"
        >
          <img
            class="w-7 h-7"
            src="@/assets/images/bronze_token.png"
            alt="token"
          />
          <div
            class="w-[49px] text-[#101828] font-inter text-3xl font-semibold leading-[32px]"
          >
            <div>{{ normalizedPrize(product.prezzo) }}</div>
          </div>
        </div>
        <!-- /token -->
        <p class="text-gray-600">Perpetual Plan</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.badge {
  /* @apply h-full; */
}
.badge.desktop-badge.active {
  padding-top: 24px;
}
.badge.mobile-badge {
  border: 2px solid transparent;
  &.active {
    border-color: var(--active-color);
  }
}
</style>
