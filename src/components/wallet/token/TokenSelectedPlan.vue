<script setup lang="ts">
//Import
import { ref } from 'vue';
import { useCardsPlansStore } from '@/store/plans/cards';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList.js';
import { useGeneralStore } from '@/store/datas/general';
import type { ProductDetails } from '@/components/wallet/token/PlanSelectionBanner.vue';
import type { Product } from '../services/PlansInfoSelection.vue';

// Props
const props = defineProps<{
  data: ProductDetails;
}>();

// Variables
const cardsStore = useCardsPlansStore(); // init
let getCurrentData = ref<number>();
const isVisible = ref((props.data && props.data.family !== 5) ? true : false);
getCurrentData = cardsStore.getCurrentFamilyId;
const currenValue = ref<Product>();
const store = useGeneralStore();
const discount = 120;
const tokenModalOpen = ref(false);

const openTokenModal = () => {
  tokenModalOpen.value = true;
};

const closeTokenModal = () => {
  tokenModalOpen.value = false;
};

// Function
const handleCloseClick = () => {
  isVisible.value = false;
};

async (getCurrentData: number): Promise<void> => {
  try {
    const response = await fetchProductListById(getCurrentData);
    currenValue.value = response;
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
  }
};
</script>

<template>
  <div v-if="isVisible && props.data && props.data.family !== 5 && props.data.family !== 6"
    class="flex flex-col items-start gap-1.5 flex-shrink-0 mb-8 md:block">
    <div style="
        border-radius: 12px;
        background: #fff;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
        padding: 10px 40px 50px 39px;
      " class="flex justify-center items-center">
      <div class="flex flex-col items-start gap-[10px]">
        <div class="text-[#475467] font-inter text-lg font-medium leading-5">
          Your selected plan
        </div>
        <div class="flex w-[1013px] items-start gap-[62px]">
          <!-- parte sx gialla -->
          <div style="
              border-radius: 12px;
              background: rgba(255, 218, 68, 0.25);
              box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
              padding: 19px 20px 19px 19px;
            " class="flex justify-center items-center">
            <div class="flex flex-col items-start gap-[24px]">
              <div class="flex w-[286px] items-center gap-[126px]">
                <div class="text-[#101828] font-inter text-2xl font-semibold leading-8 w-[136px] flex-shrink-0">
                  {{ props.data.name }}
                </div>
                <!-- <app-icon color="#6C757D" type="info" size="22" /> -->
              </div>
              <div class="flex w-[286px] items-end gap-[63px]">
                <div class="flex w-[111px] flex-col items-start gap-0.5 flex-shrink-0">
                  <div class="flex items-center">
                    <img src="@/assets/images/bronze_token.png" alt="" class="w-[28px] h-[28px]" />
                    <div class="text-[#101828] font-inter text-2xl font-semibold leading-8">
                      {{ props.data.prezzo }}
                    </div>
                  </div>
                  <div class="self-stretch text-[#475467] font-inter text-base font-normal leading-[20px]">
                    Monthly Billing
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- parte destra -->
          <div class="flex h-[148px] flex-col items-end gap-[42px]">
            <!-- top -->
            <div class="flex flex-col justify-center gap-0.5">
              <div class="flex">
                <div class="w-[626px] h-[40px] flex items-start">
                  <!-- uno -->
                  <div style="
                      border-radius: 3.2px 100px 100px 3.2px;
                      border: 4px solid #fff;
                      background: #0d6efd;
                      padding: 14px 26px 14px 524px;
                      border-top: 5px solid #fff;
                    " class="w-full h-[40px] flex-shrink-0 flex justify-end items-center">
                    <div
                      class="text-white font-inter text-[10px] font-medium leading-[10px] w-[76px] h-[12px] flex-shrink-0">
                      NEW BALANCE
                    </div>
                  </div>
                </div>
                <!-- due -->
                <div class="flex w-[500.8px] h-[40px] justify-end items-center absolute flex-shrink-0" style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #3075da;
                    padding: 14px 41.8px 14px 418px;
                  ">
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0">
                    TO BUY
                  </div>
                </div>
                <!-- tre -->
                <div class="w-[375.6px] h-[40px] flex items-center absolute flex-shrink-0" style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #4174c0;
                    padding: 14px 34.6px 14px 280px;
                  ">
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0">
                    DISCOUNT
                  </div>
                </div>
                <!-- quattro  -->
                <div class="w-[250.4px] h-[40px] flex items-center absolute flex-shrink-0" style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #5f79a0;
                    padding: 14px 50.4px 14px 169px;
                  ">
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0">
                    PLAN
                  </div>
                </div>
                <!-- cinque -->
                <div class="w-[125.2px] h-[40px] flex items-center absolute flex-shrink-0" style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #647186;
                    padding: 14px 34.2px 14px 34px;
                  ">
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0">
                    AVAILABLE
                  </div>
                </div>
              </div>
              <div class="flex w-[626px] h-[32px] justify-center items-start gap-[18px]">
                <div class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0" style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  ">
                  <div class="text-black text-center font-montserrat text-base font-medium leading-[120%]">
                    {{ store.getTokens }}
                  </div>
                </div>
                <div class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0" style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  ">
                  <div class="text-black text-center font-montserrat text-base font-medium leading-[120%]">
                    {{ props.data.prezzo }}
                  </div>
                </div>
                <div class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0" style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  ">
                  <div class="text-black text-center font-montserrat text-base font-medium leading-[120%]">
                    {{ discount }}
                  </div>
                </div>
                <div class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0" style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  ">
                  <div class="text-black text-center font-montserrat text-base font-medium leading-[120%]">
                    {{ props.data.prezzo - discount }}
                  </div>
                </div>
                <div class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0" style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  ">
                  <div class="text-black text-center font-montserrat text-base font-medium leading-[120%]">
                    {{ store.getTokens - props.data.prezzo - discount }}
                  </div>
                </div>
              </div>
            </div>
            <!-- bottom -->
            <div class="flex items-start gap-[80px]">
              <button @click="handleCloseClick"
                class="flex w-[147px] h-[32px] px-3 py-1.5 justify-center items-center gap-2" style="
                  border-radius: 4px;
                  border: 1px solid #212529;
                  background: #fff;
                ">
                <div class="text-[#212529] font-inter text-base font-normal leading-6">
                  Close
                </div>
              </button>
              <button class="flex w-[147px] h-[32px] px-3 py-1.5 justify-center items-center gap-2"
                style="border-radius: 4px; background: #212529">
                <div class="text-white font-inter text-base font-normal leading-6" @click="openTokenModal">
                  Buy Plan
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isVisible && props.data" class="flex flex-col gap-2 block md:hidden">
    <div class="w-[165px] bg-[#647186] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
      style="border-radius: 3.2px 100px 100px 3.2px; ">
      <div class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]">
            {{ store.getTokens }}
          </div>
          <div>AVAILABLE</div>
        </div>
      </div>
    </div>
    <!-- uno -->

    <div class="w-[170px] bg-[#5f79a0] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
      style="border-radius: 3.2px 100px 100px 3.2px; ">
      <div class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]">
            {{ props.data.prezzo }}
          </div>
          <div>PLAN</div>
        </div>
      </div>
    </div>
    <!-- due -->

    <div class="w-[180px] bg-[#4174c0] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
      style="border-radius: 3.2px 100px 100px 3.2px; ">
      <div class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]">
            {{ discount }}
          </div>
          <div>DISCOUNT</div>
        </div>
      </div>
    </div>
    <!-- tre -->

    <div class="w-[190px] bg-[#3075da] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
      style="border-radius: 3.2px 100px 100px 3.2px; ">
      <div class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]">
            {{ props.data.prezzo - discount }}
          </div>
          <div>TO BUY</div>
        </div>
      </div>
    </div>
    <!-- quattro -->

    <div class="w-[200px] bg-[#0d6efd] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
      style="border-radius: 3.2px 100px 100px 3.2px; ">
      <div class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]">
            {{ store.getTokens - props.data.prezzo - discount }}
          </div>
          <div>NEW BALANCE</div>
        </div>
      </div>
    </div>
    <!-- cinque -->
  </div>

  <div v-if="tokenModalOpen && isVisible && props.data" class="modal"
    :class="{ 'block': true, 'hidden': !tokenModalOpen }">
    <div class="modal-content">
      <span class="close" @click="closeTokenModal">&times;</span>
      <img class="mx-auto ps-[15px]" src="@/assets/images/Content.png" alt="car - PastAuction" />
      <h3 class="text-center"><b>Do you want to buy {{ props.data.name }}?</b></h3>
      <div class="flex gap-6">
        <div class="flex flex-row align-center justify-around">
          <div class="button_container w-fit bg-bac k text-white px-12 cursor-pointer" @click="closeTokenModal">Cancel
          </div>
          <div class="button_container w-fit bg-back text-white px-12 cursor-pointer" @click="closeTokenModal">Continue
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
