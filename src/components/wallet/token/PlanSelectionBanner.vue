<script lang="ts" setup>
import { fetchProductListBySearch } from '@/components/wallet/ajax/AjaxProductListSearch.js';
import { useGeneralStore } from '@/store/datas/general';
import { onBeforeMount } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

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

const families = ref<ProductDetails[]>([]);
const store = useGeneralStore();
const discountModalOpen = ref(false);

const openDiscountModal = () => {
  discountModalOpen.value = true;
};

const closeDiscountModal = () => {
  discountModalOpen.value = false;
};

onBeforeMount(async () => {
  const familiesSubscription: ProductDetails[] = await fetchProductListBySearch(
    'category',
    'Subscription'
  );
  const familiesSubscriptionPpu: ProductDetails[] =
    await fetchProductListBySearch('category', 'Subscription_ppu');
  let allFamilies = familiesSubscriptionPpu.concat(familiesSubscription);
  allFamilies = allFamilies.filter(family => family.name !== 'Free-user');

  // Sanitize family names
  allFamilies = allFamilies.map(family => {
    family.name = family.name.replace(/-/g, '');
    family.name = family.name.replace(/_/g, '');
    family.name = family.name.replace(/ /g, '');
    family.name = family.name.replace('Plans', '');
    if (family.category === 'Subscription_ppu') {
      family.name = 'PayPerUse';
    }
    return family;
  });

  families.value = allFamilies;
});

const tokens = computed(() => store.getTokens);
const maxValue = 10000;
const progress = computed(() =>
  tokens.value < 250
    ? 1000
    : tokens.value >= 250 && tokens.value < 500
      ? 3000
      : tokens.value >= 500 && tokens.value < 2500
        ? 5000
        : tokens.value >= 2500 && tokens.value < 8500
          ? 7000
          : tokens.value >= 8500
            ? 9000
            : tokens.value
);
const progressPercentage = computed(
  () => (progress.value / maxValue) * 100 + '%'
);
</script>

<template>
  <div
    class="text-[#475467] font-inter text-lg font-medium leading-5 mt-[30px] mb-[10px] pl-[36px]"
  >
    Plans available for you
  </div>
  <div class="flex w-100 flex-col items-start gap-1.5 flex-shrink-0 mb-10">
    <div
      class="flex w-100 justify-start items-center"
      style="
        border-radius: 12px;
        background: #fff;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
        padding: 24px;
      "
    >
      <div class="flex w-full flex-col items-start">
        <div
          class="flex w-full flex-row justify-between align-center mb-[15px]"
        >
          <div
            class="flex flex-row gap-[5px] text-[#3C3C3C70] font-inter text-sm font-regular"
          >
            Your new wallet balance is
            <div class="text-[#6DA544] font-inter text-sm font-regular">
              {{ tokens }} TKN
            </div>
          </div>
          <v-btn
            size="small"
            color="green"
            density="comfortable"
            @click="openDiscountModal"
            class="text-[10px]"
          >
            CATEGORY DISCOUNT
          </v-btn>
        </div>
        <div
          class="flex lg:flex-col w-full progress-vertical"
          :style="{ '--progress': progressPercentage }"
        >
          <v-progress-linear
            class="v-progress"
            rounded
            color="#212529"
            height="12"
            v-bind:max="maxValue"
            v-bind:model-value="progress"
          />
          <div
            class="cards flex flex-col lg:flex-row justify-around w-100 max-lg:gap-[26px]"
          >
            <div v-for="family in families" :key="family.id">
              <div class="flex lg:flex-col items-center">
                <div class="max-lg:hidden line w-[2px] min-h-[20px]">
                  &nbsp;
                </div>
                <div class="lg:hidden line h-[2px] w-full">&nbsp;</div>
                <div
                  class="card flex max-lg:items-center lg:m-w-[100px] m-w-[200px] md:m-w-[500px] lg:ms-0 md:!justify-between flex-shrink-0 justify-center p-[0px] gap-[4px] max-lg:w-[var(--width)] lg:flex-col"
                  style="--width: calc(100% - 20px)"
                  v-bind:class="{ active: tokens >= family.prezzo }"
                >
                  <div class="font-inter text-[18px] font-bold w-full">
                    {{ family.name }}
                  </div>
                  <div class="flex items-center gap-1 lg:w-[100px] w-[30%]">
                    <img
                      class="w-6 h-6"
                      src="@/assets/images/bronze_token.png"
                      alt="token"
                    />
                    <div class="text-center font-inter text-[18px] font-bold">
                      {{ family.prezzo ? family.prezzo : '***' }}
                    </div>
                  </div>
                  <div class="w-full flex justify-end">
                    <v-btn
                      size="small"
                      rounded="4px"
                      color="black"
                      density="comfortable"
                      v-bind:disabled="tokens < family.prezzo"
                      @click="$emit('selectedPlan', family)"
                      class="lg:w-full text-[10px] capitalize"
                    >
                      Select
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="discountModalOpen"
    class="modal"
    :class="{ block: true, hidden: !discountModalOpen }"
  >
    <div class="modal-content">
      <span class="close" @click="closeDiscountModal">&times;</span>
      <img
        class="mx-auto ps-[15px]"
        src="@/assets/svg/visto.svg"
        alt="stroke - PastAuction"
      />
      <h3 class="text-center"><b>Category discount</b></h3>
      <p class="text-center">
        As part of the "Journalist" category, you benefit 10% discount on your
        purchase.
        <br />
        This promotion expires on 05/12/2023
      </p>
      <div class="flex flex-row justify-center mt-[25px]">
        <div
          class="border !border-[#21252992] bg-black text-white rounded px-6 py-1 text-center cursor-pointer"
          @click="closeDiscountModal"
        >
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* .v-progress-linear {
  width: 550px;
  top: 300px !important;
  height: 12px !important;
  left: -80% !important;
  transform: rotate(90deg) !important;
} */

.line {
  background: #e4e4e5;
  // display: block;
}

.card {
  border-radius: 15px;
  background: #e4e4e5;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
  padding: 7px;
}

.card.active {
  background-color: #0d6efd55;
}

/* Modal */
.modal {
  position: fixed;
  z-index: 9999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  @apply w-3/4 md:w-2/4 lg:w-1/4 bg-[#fefefe] p-10 absolute top-[15%] md:top-[20%] lg:top-[35%] left-[50%];
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #888;
}

/* Stili per il pulsante di chiusura della modale */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
<style lang="scss">
@media screen and (max-width: 1024px) {
  .progress-vertical .v-progress-linear {
    height: unset !important;
    left: unset !important;
    transform: unset !important;
    width: 12px;
    .v-progress-linear__determinate {
      width: 100% !important;
      height: var(--progress) !important;
    }
  }
  /* @media screen and (min-width: 768px) { */
  /* .v-progress {
    width: 520px;
    top: 290px !important;
    height: 12px !important;
    left: -25% !important;
    transform: rotate(90deg) !important;
  } */
}

@media screen and (min-width: 1024px) {
  /* .v-progress-linear {
    width: 100% !important;
  } */
  /* .v-progress {
    width: 100% !important;
    top: 0px !important;
    height: 12px !important;
    --v-progress-linear-height: 12px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  } */
}
</style>
