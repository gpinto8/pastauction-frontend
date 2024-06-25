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
};

// Import
import { computed, defineProps, defineEmits } from 'vue';

// Emits
const emits = defineEmits(['handleInfoClicked', 'handleBuyClick']);

// Props
const props = defineProps<{
  data: Product,
}>();

// Variables
const mappedDatas = (props.data as any).map((item: Product) => ({
  category: item.category,
  currency: item.currency,
  family: item.family,
  id: item.id,
  name: item.name,
  prezzo: item.prezzo,
  tipologia: (item as any).tipologia,
  propertiesId: item.properties.id,
  propertiesProduct_id: item.properties.product_id,
  propertiesTipo: item.properties.tipo,
  propertiesValue: item.properties.value,
}));
const nameFamilies = mappedDatas.filter((item: Product) => item.category === 'Subscription' || item.category === 'Subscription_ppu');
const mappedDataFamily = nameFamilies.map((item: any) => ({
  name: item.name,
  family: item.family,
  prezzo: item.prezzo !== 0 ? item.prezzo : '***',
  info: getFamilyInfo(item.name),
}));
const mappedDatasWithoutLastItem = mappedDatas.slice(0, -1);

// Function
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

const onMoreInfoClicked = (familyId: number) => {
  emits('handleInfoClicked', familyId);
};

const onBuyClick = (family: any) => {
  emits('handleBuyClick', family);
};

function getIconType(item: any): string {
  let available = item.propertiesValue;
  if (available == -1) {
    return 'y';
  } else if (available == 0) {
    return 'x';
  } else {
    return '$';
  }
}

const containerTopStyle = computed(() => {
  let backgroundColor = 'rgba(109, 165, 68, 0.25)';

  const familyNames = mappedDataFamily.map((family: any) => family.name);

  if (familyNames.includes('Free-user') || familyNames.includes('Pay-per-use')) {
    backgroundColor = 'rgba(13, 110, 253, 0.25)';
  } else if (familyNames.includes('Ready Plans') || familyNames.includes('Start Plans')) {
    backgroundColor = 'rgba(255, 218, 68, 0.25)';
  }

  return { backgroundColor };
});
</script>

<template>
  <div class="container_top !w-full" v-for="(family, index) in mappedDataFamily" key="index" :style="containerTopStyle">
    <div class="flex justify-between mb-3">
      <div class="topLabel">{{ family.name }}</div>
      <div class="flex items-center">
        <img class="w-5" src="@/assets/icons/info.svg" alt="Icon Token - PastAuction"/>
      </div>
    </div>
    <div class="mb-4">
      <img class="w-7 h-7 inline-block" src="@/assets/images/bronze_token.png" alt="Icon Token - PastAuction"/>
      <span class="text-[#101828]">{{ family.prezzo }}</span>
      <div class="text-[#475467] text-left">{{ family.info }}</div>
    </div>
  </div>

  <div class="container_bottom">
    <div class="check_items">
      <div class="flex w-full" v-for="(item, index) in mappedDatasWithoutLastItem" key="index">
        <div class="me-2">
          <div class="border rounded-full" v-if="getIconType(item) === '$'">
            <img class="w-[20px] p-[1px]" src="@/assets/icons/dollar.svg" alt="Dollar Icon - PastAuction"/>
          </div>
          <img v-else-if="getIconType(item) === 'y'" class="w-[20px]" src="@/assets/icons/GreenCheck.svg" alt="Check Icon - PastAuction" />
          <img v-else class="w-[20px]" src="@/assets/icons/x-circle-fill.svg" alt="X Icon" />
        </div>
        <div class="text"> {{ item.name }} </div>
        <div class="w-2/4 flex justify-end" v-if="item.name === 'Bolts Credits - PastAuction'">
          <div class="flex items-center justify-end gap-2 border px-2">
            <div class="w-[45px] text-[#212529] font-inter font-sm"> {{ item.prezzo }} </div>
            <img class="w-[18px] h-[18px]" src="@/assets/images/bolt.png" alt="Bolts Credits - PastAuction"/>
          </div>
        </div>
      </div>
    </div>
    <div class="cta flex gap-6" v-for="(family, index) in mappedDataFamily" key="index">
      <button class="button_container bg-black" v-if="family.name === 'Free-user'" @click="onMoreInfoClicked(family.family)">More Info</button>
      <button class="button_container bg-black" v-if="family.name === 'Pay-per-use'" @click="onBuyClick(family)">Buy Now</button>
      <button class="button_container bg-white" v-if="family.name !== 'Pay-per-use' && family.name !== 'Free-user'" @click="onBuyClick(family)">Buy Now</button>
      <button class="button_container" v-if="family.name !== 'Pay-per-use' && family.name !== 'Free-user'" @click="onMoreInfoClicked(family.family)">More Info</button>
    </div>
  </div>
</template>

<style>
.container_top {
  @apply pt-[20px] px-[20px] flex flex-col content-between rounded-t-xl;
}

.topLabel {
  @apply text-[#101828];
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
}

.container_bottom {
  @apply p-[20px] bg-white;
}

.check_item {
  @apply flex items-center gap-[12px];
  align-self: stretch;
}

.check_items {
  @apply flex flex-col items-start gap-[12px];
  align-self: stretch;
}

.circle {
  @apply flex justify-center items-center w-6 h-6 border;
  border-radius: 100px;
}

.button_container {
  @apply flex justify-center items-center gap-[8px] w-full text-white bg-[#212529] mt-6;
  padding: 6px 12px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #212529;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
</style>
