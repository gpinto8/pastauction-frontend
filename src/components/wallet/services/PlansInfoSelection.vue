<script setup lang="ts">
export interface Product {
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
export interface ProductDetails {
  id: number;
  family: number;
  category: string;
  tipologia: string;
  prezzo: number;
  currency: string;
  name: string;
  properties: {
    limit: string;
    'expire(dd)': string;
    'update(dd)': string;
    graphs: string;
    limit_daily: string;
    available: string;
  };
}

// Import
import { ref } from 'vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

// Variables
let activeProduct = ref<Product | null>(null);
const mappedProducts: Record<number, Product[]> = {};
const orderedFamilyIds = ref<number[]>([]);
const emits = defineEmits(['activeProduct']);
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

// Function
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

const getBadgeStyle = (familyId: number) => {
  let backgroundColor = 'rgba(109, 165, 68, 0.25)';
  const familyName = getFamilyName(familyId);
  if (['Free', 'PayPerUse'].includes(familyName)) {
    backgroundColor = 'rgba(13, 110, 253, 0.25)';
  } else if (['Ready', 'Start'].includes(familyName)) {
    backgroundColor = 'rgba(255, 218, 68, 0.25)';
  }
  return { backgroundColor };
};

const getItemsForCard = async (familyId: number): Promise<void> => {
  try {
    const productsForFamily = await fetchProductListById(familyId);

    // Category filter
    const subscriptionProducts = productsForFamily.filter(
      (item: Product) =>
        item.category === 'Subscription' || item.category === 'Subscription_ppu'
    );

    mappedProducts[familyId] = subscriptionProducts;
    orderedFamilyIds.value.push(familyId);
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
  }
};

const handleBadgeClick = (product: Product) => {
  activeProduct.value = product;
  emits('activeProduct', product);
};

// Chiamate AJAX per ogni ID di famiglia
(async () => {
  const order = [6, 5, 1, 2, 3, 4];
  for (const familyId of order) {
    await getItemsForCard(familyId);
  }
})();
</script>

<template>
  <div
    class="hidden lg:grid grid-cols-6 gap-2 h-[150px] border-b-[1px] border-black"
  >
    <div
      v-for="familyId in orderedFamilyIds"
      :key="familyId"
      class="badge cursor-pointer"
      :class="{
        active:
          activeProduct?.properties.product_id ===
          mappedProducts[familyId][0].properties.product_id,
      }"
      @click="handleBadgeClick(mappedProducts[familyId][0])"
    >
      <div
        class="rounded-t-lg flex flex-col gap-4 px-4 pt-6 pb-[14px]"
        :style="getBadgeStyle(familyId)"
      >
        <div class="flex justify-between">
          <h4
            class="title-js font-semibold"
            v-for="(product, productIndex) in mappedProducts[familyId]"
            :key="productIndex"
          >
            {{ product.name }}
          </h4>
          <img class="w-4.5 h-4.5" src="@/assets/icons/info.svg" alt="info" />
        </div>
        <!-- /title -->
        <div
          v-for="(product, productIndex) in mappedProducts[familyId]"
          :key="productIndex"
          class="flex"
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
        <div class="alt hidden h-[20px]" :style="getBadgeStyle(familyId)"></div>
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
      @click="handleBadgeClick(mappedProducts[familyId][0])"
    >
      <div
        class="badge flex flex-col rounded-xl gap-4 shadow-xl"
        :style="getBadgeStyle(familyId)"
      >
        <div class="flex justify-between px-8 pt-8">
          <h4
            class="title-js font-semibold"
            v-for="(product, productIndex) in mappedProducts[familyId]"
            :key="productIndex"
          >
            {{ product.name }}
          </h4>
          <img class="w-4.5 h-4.5" src="@/assets/icons/info.svg" alt="info" />
        </div>
        <!-- /title -->
        <div
          v-for="(product, productIndex) in mappedProducts[familyId]"
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
  @apply h-full;
}
.badge.active {
  transform: translateY(-15px);
}
</style>
