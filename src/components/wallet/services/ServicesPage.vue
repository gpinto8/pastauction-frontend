<script setup lang="ts">
// Import
import { onMounted, ref } from 'vue';
import PlansInfoSelection from '@/components/wallet/common/PlansInfoSelection.vue';
import type { Product, ProductDetails } from '../plan/definitions';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { fetchProductDetails } from '@/components/wallet/ajax/AjaxProductDetails';
import ServiceTable from '@/components/wallet/services/ServiceTable.vue';
import { load } from 'webfontloader';
import Button from '@/components/common/button.vue';

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
const loading = ref(true);

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
  withLoading(loadFamily());
});

function withLoading(promise: Promise<any>) {
  loading.value = true;
  return promise.finally(() => {
    loading.value = false;
  });
}

async function loadFamily() {
  if (!familyId.value) {
    throw new Error('Family ID not set');
  }

  products.value = await fetchProductListById(familyId.value);
  // For each product.properties.product_id, fetch the product details and populate the table data
  return Promise.all(
    products.value.map(async product => {
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
    })
  );
}

const activeFamilyHandler = async (family: number) => {
  // Reset the table data
  tableData.value = {
    Item: [],
    Services: [],
    Charts: [],
  };

  familyId.value = family;
  withLoading(loadFamily());
};
</script>

<template>
  <PlansInfoSelection @activeProduct="activeFamilyHandler($event)" />
  <header class="classic-main">
    <ServiceTable :loading="loading" :products="tableData" />
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
        <div class="flex justify-end align-center p-4 gap-3">
          <Button variant="white" @click="handleBuyClick(family)">
            Buy Bolts
          </Button>
          <Button variant="black" @click="handleBuyClick(family)">
            Buy Tokens
          </Button>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-row justify-between align-center p-4 w-full">
          <p>Active till date {{ new Date().toLocaleDateString() }}</p>
          <Button variant="black" @click="handleBuyClick(family)">
            Renew plan
          </Button>
        </div>
      </div>
    </v-container>
  </header>
  <!-- /.classic-main -->
</template>

<style scoped></style>
