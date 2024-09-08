<script setup lang="ts">
// Import
import { ref } from 'vue';
import TokenDiscountBanner from '@/components/wallet/token/TokenDiscountBanner.vue';
import TokenSelectedPlan from '@/components/wallet/token/TokenSelectedPlan.vue';
import PlanSelectionBanner, {
  type ProductDetails,
} from '@/components/wallet/token/PlanSelectionBanner.vue';
import SelectedPlan from '@/components/wallet/token/SelectedPlan.vue';
import Button from '@/components/common/button.vue';
import Modal from '@/components/modal/Modal.vue';

// Props
const props = defineProps<{
  data: ProductDetails;
}>();

// Variables
const selectedPlan = ref<ProductDetails | null>(
  props.data && props.data.family === 5 ? props.data : null
); // PayPerUse only
const tokenModalOpen = ref(false);

const openTokenModal = () => {
  tokenModalOpen.value = true;
};

const closeTokenModal = () => {
  tokenModalOpen.value = false;
};

// First card
let price = 1.0;
let includeOffert = 5;
let counter = ref<number>(0);
let counterQuantity = ref<number>(includeOffert * counter.value);
let counterCost = ref<number>(price * counter.value);

// Bronze
let priceBronze = 1.0;
let includeOffertBronze = 1;
let counterBronze = ref<number>(0);
let counterQuantityBronze = ref<number>(
  includeOffertBronze * counterBronze.value
);
let counterCostBronze = ref<number>(priceBronze * counterBronze.value);

// Silver
let priceSilver = 9.0;
let includeOffertSilver = 10;
let counterSilver = ref<number>(0);
let counterQuantitySilver = ref<number>(
  includeOffertSilver * counterSilver.value
);
let counterCostSilver = ref<number>(priceSilver * counterSilver.value);

// Gold
let priceGold = 85.0;
let includeOffertGold = 100;
let counterGold = ref<number>(0);
let counterQuantityGold = ref<number>(includeOffertGold * counterGold.value);
let counterCostGold = ref<number>(priceGold * counterGold.value);

// Default
const decrement = () => {
  counter.value--;
  calculateQuantityAndCost();
};
const increment = () => {
  counter.value++;
  calculateQuantityAndCost();
};
const calculateQuantityAndCost = () => {
  counterQuantity.value = includeOffert * counter.value;
  counterCost.value = price * counter.value;
};

// Bronze
const decrementBronze = () => {
  counterBronze.value--;
  calculateQuantityAndCostBronze();
};
const incrementBronze = () => {
  counterBronze.value++;
  calculateQuantityAndCostBronze();
};
const calculateQuantityAndCostBronze = () => {
  counterQuantityBronze.value = includeOffertBronze * counterBronze.value;
  counterCostBronze.value = priceBronze * counterBronze.value;
};
const resetTablet = () => {
  counter.value = 0;
  counterQuantity.value = 0;
  counterCost.value = 0;
};
const resetTabletB = () => {
  counter.value = 0;
  counterQuantity.value = 0;
  counterCost.value = 0;
};
const resetTabletS = () => {
  counter.value = 0;
  counterQuantity.value = 0;
  counterCost.value = 0;
};
const resetTabletG = () => {
  counter.value = 0;
  counterQuantity.value = 0;
  counterCost.value = 0;
};

// Silver
const decrementSilver = () => {
  counterSilver.value--;
  calculateQuantityAndCostSilver();
};
const incrementSilver = () => {
  counterSilver.value++;
  calculateQuantityAndCostSilver();
};
const calculateQuantityAndCostSilver = () => {
  counterQuantitySilver.value = includeOffertSilver * counterSilver.value;
  counterCostSilver.value = priceSilver * counterSilver.value;
};

// Gold
const decrementGold = () => {
  counterGold.value--;
  calculateQuantityAndCostGold();
};
const incrementGold = () => {
  counterGold.value++;
  calculateQuantityAndCostGold();
};
const calculateQuantityAndCostGold = () => {
  counterQuantityGold.value = includeOffertGold * counterGold.value;
  counterCostGold.value = priceGold * counterGold.value;
};

const handleSelectedPlan = (family: ProductDetails) => {
  selectedPlan.value = family;
};

const resetCounters = () => {
  counter.value = 0;
  counterBronze.value = 0;
  counterSilver.value = 0;
  counterGold.value = 0;
  counterQuantityBronze.value = 0;
  counterQuantitySilver.value = 0;
  counterQuantityGold.value = 0;
  counterCostBronze.value = 0;
  counterCostSilver.value = 0;
  counterCostGold.value = 0;
};
</script>

<template>
  <div class="flex flex-col items-start flex-shrink-0 font-inter my-8">
    <TokenDiscountBanner />
    <TokenSelectedPlan :data="props.data" />

    <h3 class="ps-6 py-4 text-[#475467]">
      We have prepared the best TOKEN offer for you
    </h3>

    <div class="shadow rounded-t-xl px-6 pt-6 w-full bg-white">
      <div class="hidden lg:flex planCard items-center justify-between">
        <div
          class="cardImg w-[315px] flex justify-between gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <img
            src="@/assets/images/token_bronze.png"
            alt="token bronze - pastAuction"
          />
          <div class="contentCard flex flex-col items-end justify-around">
            <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
              € {{ price }}
            </div>
            <div>
              <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                Includes {{ includeOffert }} BRONZE TKN
              </p>
            </div>
          </div>
        </div>
        <div class="quantity">
          <div class="flex flex-col items-center gap-1">
            <div class="text-[12px] text-[#21252950]"></div>
            <div class="flex gap-1">
              <button
                class="rounded border border-black px-2"
                @click="decrement()"
              >
                -
              </button>
              <span class="border !border-[#21252992] rounded px-4">
                {{ counter }}
              </span>
              <button
                class="rounded border border-black px-2"
                @click="increment()"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="totQuantity flex flex-col justify-start">
          <div class="font-normal text-[10px] text-[#21252950]">BRONZE TKN</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            {{ counterQuantity }}
          </div>
        </div>
        <div class="totPrice">
          <div class="text-[10px] text-[#21252950]">Cost in your currency</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            € {{ counterCost }}
          </div>
        </div>
      </div>
      <!-- /Token default price -->

      <div
        class="hidden md:flex flex-col lg:hidden planCard items-center justify-between gap-6"
      >
        <div class="flex justify-between items-center w-full">
          <div
            class="cardImg w-[315px] flex justify-between gap-2 border !border-[#21252992] rounded-sm p-2"
          >
            <img
              src="@/assets/images/token_bronze.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ price }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffert }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>
          <div class="quantity">
            <div class="flex flex-col items-center gap-1">
              <div class="text-[12px] text-[#21252950]"></div>
              <div class="flex gap-1">
                <button
                  class="rounded border border-black px-2"
                  @click="decrement()"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counter }}
                </span>
                <button
                  class="rounded border border-black px-2"
                  @click="increment()"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full">
          <button
            class="border !border-[#21252992] rounded px-6 py-1 text-center"
            @click="resetTablet"
          >
            Reset
          </button>
          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              {{ counterQuantity }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCost }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token default tablet -->

      <div class="flex md:hidden planCard items-center justify-between mb-6">
        <div
          class="cardImg w-[315px] justify-between flex flex-col gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <div class="flex border-b">
            <img
              width="150"
              src="@/assets/images/token_bronze.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceBronze }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertBronze }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-1">
            <button class="rounded px-2" @click="decrement()">-</button>
            <span class="border !border-[#21252992] rounded px-4">
              {{ counter }}
            </span>
            <button class="rounded px-2" @click="increment()">+</button>
          </div>

          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div
              class="border !border-[#21252992] rounded px-6 text-center w-full"
            >
              {{ counterQuantity }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCost }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token default mobile -->

      <p class="my-4">Special Offer</p>

      <div class="divisore border my-3"></div>
      <!-- /.divisor -->

      <div class="hidden lg:flex planCard items-center justify-between">
        <div
          class="cardImg w-[315px] justify-between flex gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <img
            src="@/assets/images/token_bronze.png"
            alt="token bronze - pastAuction"
          />
          <div class="contentCard flex flex-col items-end justify-around">
            <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
              € {{ priceBronze }}
            </div>
            <div>
              <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                Includes {{ includeOffertBronze }} BRONZE TKN
              </p>
            </div>
          </div>
        </div>
        <div class="quantity">
          <div class="flex flex-col items-center gap-1">
            <div class="text-[12px] text-[#21252981]">4 for this month</div>
            <div class="flex gap-1">
              <button class="rounded px-2" @click="decrementBronze()">-</button>
              <span class="border !border-[#21252992] rounded px-4">
                {{ counterBronze }}
              </span>
              <button class="rounded px-2" @click="incrementBronze()">+</button>
            </div>
          </div>
        </div>
        <div class="totQuantity flex flex-col justify-start">
          <div class="font-normal text-[10px] text-[#21252950]">BRONZE TKN</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            {{ counterQuantityBronze }}
          </div>
        </div>
        <div class="totPrice">
          <div class="text-[10px] text-[#21252950]">Cost in your currency</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            € {{ counterCostBronze }}
          </div>
        </div>
      </div>
      <!-- /Token bronze -->

      <div
        class="hidden md:flex flex-col lg:hidden planCard items-center justify-between gap-6 mb-6"
      >
        <div class="flex justify-between items-center w-full">
          <div
            class="cardImg w-[315px] flex justify-between gap-2 border !border-[#21252992] rounded-sm p-2"
          >
            <img
              src="@/assets/images/token_bronze.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceBronze }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertBronze }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>
          <div class="quantity">
            <div class="flex flex-col items-center gap-1">
              <div class="text-[12px] text-[#21252950]"></div>
              <div class="flex gap-1">
                <button
                  class="rounded border border-black px-2"
                  @click="decrementBronze()"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counterBronze }}
                </span>
                <button
                  class="rounded border border-black px-2"
                  @click="incrementBronze()"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full">
          <button
            class="border !border-[#21252992] rounded px-6 py-1 text-center"
            @click="resetTabletB"
          >
            Reset
          </button>
          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              {{ counterQuantityBronze }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostBronze }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token bronze tablet -->

      <div class="flex md:hidden planCard items-center justify-between mb-6">
        <div
          class="cardImg w-[315px] justify-between flex flex-col gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <div class="flex border-b">
            <img
              width="150"
              src="@/assets/images/token_bronze.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceBronze }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">bronze token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertBronze }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-1">
            <button class="rounded px-2" @click="decrementBronze()">-</button>
            <span class="border !border-[#21252992] rounded px-4">
              {{ counterBronze }}
            </span>
            <button class="rounded px-2" @click="incrementBronze()">+</button>
          </div>

          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div
              class="border !border-[#21252992] rounded px-6 text-center w-full"
            >
              {{ counterQuantityBronze }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostBronze }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token bronze mobile -->

      <div class="hidden lg:flex planCard items-center justify-between my-4">
        <div
          class="cardImg w-[315px] justify-between flex gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <img
            src="@/assets/images/token_arr.png"
            alt="token bronze - pastAuction"
          />
          <div class="contentCard flex flex-col items-end justify-around">
            <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
              € {{ priceSilver }}
            </div>
            <div>
              <h3 class="namePlanCard uppercase text-bold">silver token</h3>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                1 SILVER TKN includes
              </p>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                {{ includeOffertSilver }} BRONZE TKN
              </p>
            </div>
          </div>
        </div>
        <div class="quantity">
          <div class="flex flex-col items-center gap-1">
            <div class="text-[12px] text-[#21252981]"></div>
            <div class="flex gap-1">
              <button class="rounded px-2" @click="decrementSilver()">-</button>
              <span class="border !border-[#21252992] rounded px-4">
                {{ counterSilver }}
              </span>
              <button class="rounded px-2" @click="incrementSilver()">+</button>
            </div>
          </div>
        </div>
        <div class="totQuantity flex flex-col justify-start">
          <div class="font-normal text-[10px] text-[#21252950]">BRONZE TKN</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            {{ counterQuantitySilver }}
          </div>
        </div>
        <div class="totPrice">
          <div class="text-[10px] text-[#21252950]">Cost in your currency</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            € {{ counterCostSilver }}
          </div>
        </div>
      </div>
      <!-- /Token silver -->

      <div
        class="hidden md:flex flex-col lg:hidden planCard items-center justify-between gap-6 mb-6"
      >
        <div class="flex justify-between items-center w-full">
          <div
            class="cardImg w-[315px] flex justify-between gap-2 border !border-[#21252992] rounded-sm p-2"
          >
            <img
              src="@/assets/images/token_arr.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceSilver }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">silver token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertSilver }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>
          <div class="quantity">
            <div class="flex flex-col items-center gap-1">
              <div class="text-[12px] text-[#21252950]"></div>
              <div class="flex gap-1">
                <button
                  class="rounded border border-black px-2"
                  @click="decrementSilver()"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counterSilver }}
                </span>
                <button
                  class="rounded border border-black px-2"
                  @click="incrementSilver()"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full">
          <button
            class="border !border-[#21252992] rounded px-6 py-1 text-center"
            @click="resetTabletS"
          >
            Reset
          </button>
          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              {{ counterQuantitySilver }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostSilver }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token silver tablet -->

      <div class="flex md:hidden planCard items-center justify-between mb-6">
        <div
          class="cardImg w-[315px] justify-between flex flex-col gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <div class="flex border-b">
            <img
              width="150"
              src="@/assets/images/token_arr.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceSilver }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">silver token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertSilver }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-1">
            <button class="rounded px-2" @click="decrementSilver()">-</button>
            <span class="border !border-[#21252992] rounded px-4">
              {{ counterSilver }}
            </span>
            <button class="rounded px-2" @click="incrementSilver()">+</button>
          </div>

          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div
              class="border !border-[#21252992] rounded px-6 text-center w-full"
            >
              {{ counterQuantitySilver }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostSilver }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token silver mobile -->

      <div class="hidden lg:flex planCard items-center justify-between pb-6">
        <div
          class="cardImg w-[315px] justify-between flex gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <img
            src="@/assets/images/token_gold.png"
            alt="token bronze - pastAuction"
          />
          <div class="contentCard flex flex-col items-end justify-around">
            <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
              € {{ priceGold }}
            </div>
            <div>
              <h3 class="namePlanCard uppercase text-bold">gold token</h3>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                1 GOLD TKN includes
              </p>
              <p class="textPlanCard text-[12px] text-[#21252950]">
                {{ includeOffertGold }} BRONZE TKN
              </p>
            </div>
          </div>
        </div>
        <div class="quantity">
          <div class="flex flex-col items-center gap-1">
            <div class="text-[12px] text-[#21252981]"></div>
            <div class="flex gap-1">
              <button class="rounded px-2" @click="decrementGold()">-</button>
              <span class="border !border-[#21252992] rounded px-4">
                {{ counterGold }}
              </span>
              <button class="rounded px-2" @click="incrementGold()">+</button>
            </div>
          </div>
        </div>
        <div class="totQuantity flex flex-col justify-start">
          <div class="font-normal text-[10px] text-[#21252950]">BRONZE TKN</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            {{ counterQuantityGold }}
          </div>
        </div>
        <div class="totPrice">
          <div class="text-[10px] text-[#21252950]">Cost in your currency</div>
          <div class="border !border-[#21252992] rounded px-6 text-center">
            € {{ counterCostGold }}
          </div>
        </div>
      </div>
      <!-- /Token gold -->

      <div
        class="hidden md:flex flex-col lg:hidden planCard items-center justify-between gap-6 mb-6"
      >
        <div class="flex justify-between items-center w-full">
          <div
            class="cardImg w-[315px] flex justify-between gap-2 border !border-[#21252992] rounded-sm p-2"
          >
            <img
              src="@/assets/images/token_gold.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceGold }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">Gold token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertGold }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>
          <div class="quantity">
            <div class="flex flex-col items-center gap-1">
              <div class="text-[12px] text-[#21252950]"></div>
              <div class="flex gap-1">
                <button
                  class="rounded border border-black px-2"
                  @click="decrementGold()"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counterGold }}
                </span>
                <button
                  class="rounded border border-black px-2"
                  @click="incrementGold()"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full">
          <button
            class="border !border-[#21252992] rounded px-6 py-1 text-center"
            @click="resetTabletS"
          >
            Reset
          </button>
          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              {{ counterQuantityGold }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostGold }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token Gold tablet -->

      <div class="flex md:hidden planCard items-center justify-between mb-6">
        <div
          class="cardImg w-[315px] justify-between flex flex-col gap-2 border !border-[#21252992] rounded-sm p-2"
        >
          <div class="flex border-b">
            <img
              width="150"
              src="@/assets/images/token_gold.png"
              alt="token bronze - pastAuction"
            />
            <div class="contentCard flex flex-col items-end justify-around">
              <div class="price rounded-sm bg-[#6DA544] text-white px-4 w-fit">
                € {{ priceGold }}
              </div>
              <div>
                <h3 class="namePlanCard uppercase text-bold">gold token</h3>
                <p class="textPlanCard text-[12px] text-[#21252950]">
                  Includes {{ includeOffertGold }} BRONZE TKN
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-1">
            <button class="rounded px-2" @click="decrementGold()">-</button>
            <span class="border !border-[#21252992] rounded px-4">
              {{ counterGold }}
            </span>
            <button class="rounded px-2" @click="incrementGold()">+</button>
          </div>

          <div class="totQuantity flex flex-col justify-start">
            <div class="font-normal text-[10px] text-[#21252950]">
              BRONZE TKN
            </div>
            <div
              class="border !border-[#21252992] rounded px-6 text-center w-full"
            >
              {{ counterQuantityGold }}
            </div>
          </div>
          <div class="totPrice">
            <div class="text-[10px] text-[#21252950]">
              Cost in your currency
            </div>
            <div class="border !border-[#21252992] rounded px-6 text-center">
              € {{ counterCostGold }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Token gold mobile -->
    </div>

    <div class="shadow rounded-b-xl bg-[#ECECEC] py-8 px-6 w-full">
      <div class="bg-[#ECECEC]">
        <div class="flex justify-between flex-col md:flex-row">
          <h2 class="font-bold text-[20px] mb-[26px] md:mb-0">
            Total purchase
          </h2>
          <!-- sx -->

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-y-[25px] md:gap-x-[80px]"
          >
            <div class="totQuantity flex flex-col justify-start">
              <div class="font-normal text-[10px] text-[#21252950]">
                BRONZE TKN
              </div>
              <div
                class="border !border-[#21252992] rounded px-6 text-center bg-white"
              >
                {{
                  counterQuantityBronze +
                  counterQuantitySilver +
                  counterQuantityGold
                }}
              </div>
            </div>

            <!-- Bronze token -->
            <div class="totQuantity flex flex-col justify-start">
              <div class="font-normal text-[10px] text-[#21252950]">
                Full cost in your currency
              </div>
              <div
                class="border !border-[#21252992] rounded px-6 text-center bg-white"
              >
                €
                {{ counterCostBronze + counterCostSilver + counterCostGold }}
              </div>
            </div>

            <div class="totQuantity flex flex-col justify-start">
              <Button
                variant="white"
                class="border !border-[#21252992] rounded px-6 py-1 text-center"
                @click="resetCounters"
              >
                Reset All
              </Button>
            </div>

            <div class="totQuantity flex flex-col justify-start">
              <Button
                variant="black"
                class="border !border-[#21252992] bg-black text-white rounded px-6 py-1 text-center"
                @click="openTokenModal"
              >
                Buy Token
              </Button>
            </div>
            <!-- Full cost in your currency -->
          </div>
          <!-- dx -->
        </div>
      </div>
    </div>
    <!-- /Total purchase -->

    <PlanSelectionBanner @selectedPlan="handleSelectedPlan($event)" />

    <!-- SelectedPlan -->
    <div class="w-full" v-if="selectedPlan">
      <SelectedPlan :plan="selectedPlan" />
    </div>
    <!-- /SelectedPlan -->
  </div>

  <Modal :is-modal-open="tokenModalOpen" :background="true" :auto-width="true">
    <!-- <div class="modal-content"> -->
    <span class="close" @click="closeTokenModal">&times;</span>
    <img
      class="mx-auto ps-[15px]"
      src="@/assets/svg/visto.svg"
      alt="stroke - PastAuction"
    />
    <h3 class="text-center"><b>Your TOKEN credit is insufficient</b></h3>
    <p class="text-center">
      Please top up TKN to your account and proceed to purchase.
    </p>
    <div class="grid lg:grid-cols-2 gap-3 mt-[25px]">
      <Button variant="black" classes="w-full" @click="closeTokenModal">
        Close
      </Button>
      <Button variant="black" classes="w-full" @click="closeTokenModal">
        Buy TOKEN
      </Button>
    </div>
    <!-- </div> -->
  </Modal>
</template>

<style scoped>
.cardSX {
  border-color: black !important;
  border-radius: 4px;
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
