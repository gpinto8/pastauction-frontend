<script setup lang="ts">
// Import
import { onMounted, ref } from 'vue';
import PlansInfoSelection from '@/components/wallet/common/PlansInfoSelection.vue';
import type { Product, ProductDetails } from '../plan/definitions';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { fetchProductDetails } from '@/components/wallet/ajax/AjaxProductDetails';
import ServiceTable from '@/components/wallet/services/ServiceTable.vue';

const familyId = ref<number>();
const products = ref<Product[]>([]);
const family = ref<{
  family: number;
  info: string;
  name: string;
  prezzo: number;
}>();
const tableData = ref<{
  Item: ProductDetails[];
  Services: ProductDetails[];
  Charts: ProductDetails[];
}>({
  Item: [],
  Services: [],
  Charts: [],
});

const emits = defineEmits(['handleBuyClick']);

function handleBuyClick(family: any) {
  emits('handleBuyClick', family);
}

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

onMounted(async () => {
  familyId.value = 6; // Preset to free family
  products.value = await fetchProductListById(familyId.value);
  // For each product.properties.product_id, fetch the product details and populate the table data
  products.value.forEach(async product => {
    const productDetails: ProductDetails = await fetchProductDetails(
      product.id
    );
    if (productDetails) {
      if (productDetails.category === 'CategoryChart') {
        tableData.value.Charts.push(productDetails);
      } else if (
        productDetails.category === 'Chart' ||
        productDetails.category === 'Datas' ||
        productDetails.category === 'Locate' ||
        productDetails.category === 'Marketplace'
      ) {
        tableData.value.Services.push(productDetails);
      } else if (productDetails.category === 'Garage') {
        tableData.value.Item.push(productDetails);
      } else if (
        productDetails.category === 'Subscription' ||
        productDetails.category === 'Subscription_ppu'
      ) {
        family.value = {
          family: productDetails.family,
          info: getFamilyInfo(productDetails.name),
          name: productDetails.name,
          prezzo: productDetails.prezzo,
        };
      }
    }
  });
});

const activeFamilyHandler = async (family: number) => {
  // Reset the table data
  tableData.value = {
    Item: [],
    Services: [],
    Charts: [],
  };

  familyId.value = family;
  products.value = await fetchProductListById(familyId.value);
  // For each product.properties.product_id, fetch the product details and populate the table data
  products.value.forEach(async product => {
    const productDetails: ProductDetails = await fetchProductDetails(
      product.properties.product_id
    );
    if (productDetails) {
      if (productDetails.category === 'CategoryChart') {
        tableData.value.Charts.push(productDetails);
      } else if (
        productDetails.category === 'Chart' ||
        productDetails.category === 'Datas' ||
        productDetails.category === 'Locate' ||
        productDetails.category === 'Marketplace'
      ) {
        tableData.value.Services.push(productDetails);
      } else if (productDetails.category === 'Garage') {
        tableData.value.Item.push(productDetails);
      }
    }
  });
};
</script>

<template>
  <header class="classic-main">
    <PlansInfoSelection @activeProduct="activeFamilyHandler($event)" />
    <ServiceTable :products="tableData" />
    <v-container
      class="bg-[#ECECEC]"
      style="
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
      "
    >
      <div v-if="familyId === 5">
        <div class="flex flex-row justify-end align-center p-4 w-full">
          <button
            class="border !border-[#21252992] bg-white text-black rounded px-6 py-1 text-center cursor-pointer mr-[20px]"
            @click="handleBuyClick(family)"
          >
            Buy Bolts
          </button>
          <button
            class="border !border-[#21252992] bg-black text-white rounded px-6 py-1 text-center cursor-pointer"
            @click="handleBuyClick(family)"
          >
            Buy Tokens
          </button>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-row justify-between align-center p-4 w-full">
          <p>Active till date {{ new Date().toLocaleDateString() }}</p>
          <button
            class="border !border-[#21252992] bg-black text-white rounded px-6 py-1 text-center cursor-pointer"
            @click="handleBuyClick(family)"
          >
            Renew plan
          </button>
        </div>
      </div>
    </v-container>
  </header>
  <!-- /.classic-main -->
</template>

<style scoped></style>
