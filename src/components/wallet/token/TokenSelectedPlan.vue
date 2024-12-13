<script setup lang="ts">
//Import
import { ref } from 'vue';
import { useCardsPlansStore } from '@/store/plans/cards';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { useGeneralStore } from '@/store/datas/general';
import type { ProductDetails } from '@/components/wallet/token/PlanSelectionBanner.vue';
import { type Product, families } from '../plan/definitions';
import Modal from '@/components/modal/Modal.vue';
import Button from '@/components/common/button.vue';

// Props
const props = defineProps<{
  data: ProductDetails;
}>();

// Variables
const cardsStore = useCardsPlansStore(); // init
let getCurrentData = ref<number>();
const isVisible = ref(props.data && props.data.family !== 5 ? true : false);
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
  <div
    v-if="
      isVisible &&
      props.data &&
      props.data.family !== 5 &&
      props.data.family !== 6
    "
    class="flex flex-col items-start gap-1.5 flex-shrink-0 mb-8 md:block w-full"
  >
    <div
      style="
        border-radius: 12px;
        background: #fff;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
      "
      class="flex justify-center items-center p-[30px] w-full"
    >
      <div class="flex flex-col items-start gap-[10px] w-full">
        <div class="text-[#475467] font-inter text-lg font-medium leading-5">
          Your selected plan
        </div>
        <div
          class="flex flex-col lg:flex-row justify-between w-full gap-[32px]"
        >
          <!-- parte sx gialla -->
          <div
            style="
              border-radius: 12px;
              box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
            "
            :style="{
              background: families[props.data.family].color.background,
            }"
            class="flex justify-center items-center p-[20px] w-full"
          >
            <div
              class="flex lg:flex-col items-start justify-between w-100 flex-wrap gap-3"
            >
              <div class="flex items-center">
                <div
                  class="text-[#101828] font-inter text-2xl font-semibold leading-8 flex-shrink-0"
                >
                  {{ props.data.name }}
                </div>
                <!-- <app-icon color="#6C757D" type="info" size="22" /> -->
              </div>
              <div class="flex items-end lg:order-0 order-1">
                <div
                  class="flex w-[111px] flex-col items-start gap-0.5 flex-shrink-0"
                >
                  <div class="flex items-center">
                    <img
                      src="@/assets/images/bronze_token.png"
                      alt=""
                      class="w-[28px] h-[28px]"
                    />
                    <div
                      class="text-[#101828] font-inter text-2xl font-semibold leading-8"
                    >
                      {{ props.data.prezzo }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="self-stretch text-[#475467] font-inter text-base font-normal leading-[20px] order-1 sm:!order-[0]"
              >
                Monthly Billing
              </div>
            </div>
          </div>
          <!-- parte destra -->
          <div class="flex flex-col gap-[42px]">
            <!-- top -->
            <div__ class="hidden md:flex flex-col justify-center gap-0.5">
              <div class="flex">
                <div class="w-[626px] h-[40px] flex items-start">
                  <!-- uno -->
                  <div
                    style="
                      border-radius: 3.2px 100px 100px 3.2px;
                      border: 4px solid #fff;
                      background: #0d6efd;
                      padding: 14px 26px 14px 524px;
                      border-top: 5px solid #fff;
                    "
                    class="w-full h-[40px] flex-shrink-0 flex justify-end items-center"
                  >
                    <div
                      class="text-white font-inter text-[10px] font-medium leading-[10px] w-[76px] h-[12px] flex-shrink-0"
                    >
                      NEW BALANCE
                    </div>
                  </div>
                </div>
                <!-- due -->
                <div
                  class="flex w-[500.8px] h-[40px] justify-end items-center absolute flex-shrink-0"
                  style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #3075da;
                    padding: 14px 41.8px 14px 418px;
                  "
                >
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0"
                  >
                    TO BUY
                  </div>
                </div>
                <!-- tre -->
                <div
                  class="w-[375.6px] h-[40px] flex items-center absolute flex-shrink-0"
                  style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #4174c0;
                    padding: 14px 34.6px 14px 280px;
                  "
                >
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0"
                  >
                    DISCOUNT
                  </div>
                </div>
                <!-- quattro  -->
                <div
                  class="w-[250.4px] h-[40px] flex items-center absolute flex-shrink-0"
                  style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #5f79a0;
                    padding: 14px 50.4px 14px 169px;
                  "
                >
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0"
                  >
                    PLAN
                  </div>
                </div>
                <!-- cinque -->
                <div
                  class="w-[125.2px] h-[40px] flex items-center absolute flex-shrink-0"
                  style="
                    border-radius: 3.2px 100px 100px 3.2px;
                    border: 4px solid #fff;
                    background: #647186;
                    padding: 14px 34.2px 14px 34px;
                  "
                >
                  <div
                    class="text-white font-inter text-[10px] font-medium leading-[10px] w-[41px] h-[12px] flex-shrink-0"
                  >
                    AVAILABLE
                  </div>
                </div>
              </div>
              <div
                class="flex w-[626px] h-[32px] justify-center items-start gap-[18px]"
              >
                <div
                  class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0"
                  style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  "
                >
                  <div
                    class="text-black text-center font-montserrat text-base font-medium leading-[120%]"
                  >
                    {{ store.getTokens }}
                  </div>
                </div>
                <div
                  class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0"
                  style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  "
                >
                  <div
                    class="text-black text-center font-montserrat text-base font-medium leading-[120%]"
                  >
                    {{ props.data.prezzo }}
                  </div>
                </div>
                <div
                  class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0"
                  style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  "
                >
                  <div
                    class="text-black text-center font-montserrat text-base font-medium leading-[120%]"
                  >
                    {{ discount }}
                  </div>
                </div>
                <div
                  class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0"
                  style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  "
                >
                  <div
                    class="text-black text-center font-montserrat text-base font-medium leading-[120%]"
                  >
                    {{ props.data.prezzo - discount }}
                  </div>
                </div>
                <div
                  class="flex w-[108px] h-[32px] px-0 py-[6.266px] justify-center items-center flex-shrink-0"
                  style="
                    border-radius: 4px;
                    border: 0.5px solid rgba(33, 37, 41, 0.75);
                    background: #fff;
                  "
                >
                  <div
                    class="text-black text-center font-montserrat text-base font-medium leading-[120%]"
                  >
                    {{ store.getTokens - props.data.prezzo - discount }}
                  </div>
                </div>
              </div>
            </div__>
            <!-- bottom -->
            <div_
              v-if="isVisible && props.data"
              class="flex flex-col gap-2 block md:hidden"
            >
              <div
                class="w-[165px] bg-[#647186] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
                style="border-radius: 3.2px 100px 100px 3.2px"
              >
                <div
                  class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]"
                    >
                      {{ store.getTokens }}
                    </div>
                    <div>AVAILABLE</div>
                  </div>
                </div>
              </div>
              <!-- uno -->

              <div
                class="w-[170px] bg-[#5f79a0] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
                style="border-radius: 3.2px 100px 100px 3.2px"
              >
                <div
                  class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]"
                    >
                      {{ props.data.prezzo }}
                    </div>
                    <div>PLAN</div>
                  </div>
                </div>
              </div>
              <!-- due -->

              <div
                class="w-[180px] bg-[#4174c0] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
                style="border-radius: 3.2px 100px 100px 3.2px"
              >
                <div
                  class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]"
                    >
                      {{ discount }}
                    </div>
                    <div>DISCOUNT</div>
                  </div>
                </div>
              </div>
              <!-- tre -->

              <div
                class="w-[190px] bg-[#3075da] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
                style="border-radius: 3.2px 100px 100px 3.2px"
              >
                <div
                  class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]"
                    >
                      {{ props.data.prezzo - discount }}
                    </div>
                    <div>TO BUY</div>
                  </div>
                </div>
              </div>
              <!-- quattro -->

              <div
                class="w-[200px] bg-[#0d6efd] rounded-e-2 py-2 px-5 flex items-center flex-shrink-0"
                style="border-radius: 3.2px 100px 100px 3.2px"
              >
                <div
                  class="text-white font-inter text-[10px] font-medium leading-[10px] flex-shrink-0"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="border bg-white p-2 px-4 text-black text-center font-montserrat text-[14px]"
                    >
                      {{ store.getTokens - props.data.prezzo - discount }}
                    </div>
                    <div>NEW BALANCE</div>
                  </div>
                </div>
              </div>
              <!-- cinque -->
            </div_>

            <div class="flex justify-between md:justify-end gap-3">
              <Button
                @click="handleCloseClick"
                variant="white"
                class="flex w-[147px] h-[32px] px-3 py-1.5 justify-center items-center gap-2"
                style="border: 1px solid #212529"
              >
                <div
                  class="text-[#212529] font-inter text-base font-normal leading-6"
                >
                  Close
                </div>
              </Button>
              <Button
                variant="black"
                @click="openTokenModal"
                class="flex w-[147px] h-[32px] px-3 py-1.5 justify-center items-center gap-2"
              >
                Buy Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="tokenModalOpen && isVisible && props.data"
    :isModalOpen="tokenModalOpen"
    :background="true"
    :auto-width="true"
    class="modal"
    :class="{ block: true, hidden: !tokenModalOpen }"
  >
    <div class="modal-content">
      <img
        class="mx-auto ps-[15px]"
        src="@/assets/images/Content.png"
        alt="car - PastAuction"
      />
      <h3 class="text-center mb-[32px]">
        <b>Do you want to buy {{ props.data.name }}?</b>
      </h3>
      <div
        class="flex flex-column md:!flex-row align-center justify-between gap-3"
      >
        <Button variant="white" classes="grow" @click="closeTokenModal">
          Cancel
        </Button>
        <Button variant="black" classes="grow" @click="closeTokenModal">
          Continue
        </Button>
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
