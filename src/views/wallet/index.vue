<script setup lang="ts">
// Import
import { onMounted, ref } from 'vue';
import DashBoard from '@/components/wallet/common/DashBoard.vue';
import PlansSwiper from '@/components/wallet/plan/PlansSwiper.vue';
import PlansDetails from '@/components/wallet/plan/PlansDetails.vue';
import ServicesPage from '@/components/wallet/services/ServicesPage.vue';
import Dashboard from '@/components/wallet/payment/Dashboard.vue';
import TokenPage from '@/components/wallet/token/TokenPage.vue';

//Variables
const showCarousel = ref(true);
const showPlans = ref(true);
const tab = ref('plans');
const selectedFamilyId = ref<number>(1);
const familyData = ref();

// onMounted
onMounted(() => {
  selectedFamilyId.value = 1;
});

// Function
function changeTab(newTab: string) {
  tab.value = newTab;
  showPlans.value = true;
}

function handleMoreInfoClicked(familyID: number) {
  selectedFamilyId.value = familyID;
  showPlans.value = false;
}

function handleBuyClick(family: any) {
  tab.value = 'token';
  familyData.value = family;
}

function buyThisPlan(plan: any) {
  tab.value = 'token';
  familyData.value = plan;
}
</script>

<template>
  <!-- <div class="lg:m-12"> -->
  <div class="container mx-auto max-w-[1092px]">
    <header class="md:classic-main !pb-0">
      <DashBoard />
    </header>
    <!-- /.classic-main -->

    <main class="classic-main bg-transparent">
      <div class="grid grid-cols-4 shadow">
        <div
          :class="'col-span-1 tab ' + (tab === 'plans' ? 'tab-selected' : '')"
          @click="changeTab('plans')"
        >
          <h4 class="hidden md:block">Plans</h4>
          <img
            class="md:hidden"
            src="@/assets/svg/documents-outline.svg"
            alt="Plans - Pastauction"
          />
        </div>
        <div
          :class="'col-span-1 tab ' + (tab === 'token' ? 'tab-selected' : '')"
          @click="changeTab('token')"
        >
          <h4 class="hidden md:block">Token/Cart</h4>
          <img
            class="md:hidden"
            src="@/assets/svg/shop-window.svg"
            alt="Token/Cart - Pastauction"
          />
        </div>
        <div
          :class="
            'col-span-1 tab ' + (tab === 'services' ? 'tab-selected' : '')
          "
          @click="changeTab('services')"
        >
          <h4 class="hidden md:block">My services</h4>
          <img
            class="md:hidden"
            src="@/assets/svg/clipboard-check.svg"
            alt="My services - Pastauction"
          />
        </div>
        <div
          :class="'col-span-1 tab ' + (tab === 'payment' ? 'tab-selected' : '')"
          @click="changeTab('payment')"
        >
          <h4 class="hidden md:block">Payment history</h4>
          <img
            class="md:hidden"
            src="@/assets/svg/credit-card-2-back.svg"
            alt="Payment history - Pastauction"
          />
        </div>
      </div>

      <div class="plans" v-if="showCarousel && tab === 'plans'">
        <div class="textOverTab">Choose the best plan for you</div>
        <PlansSwiper
          v-if="showPlans"
          @handleInfoClicked="handleMoreInfoClicked($event)"
          @handleBuyClick="handleBuyClick($event)"
        />
        <PlansDetails
          v-else
          :selectedFamilyId="selectedFamilyId"
          @buyThisPlan="buyThisPlan"
        />
      </div>

      <div class="token" v-if="showCarousel && tab === 'token'">
        <div class="textOverTab">Token/Cart</div>
        <TokenPage :data="familyData" />
      </div>

      <div class="services" v-if="showCarousel && tab === 'services'">
        <div class="textOverTab">My services</div>
        <ServicesPage @handleBuyClick="handleBuyClick" />
      </div>

      <div class="payment" v-if="showCarousel && tab === 'payment'">
        <Dashboard />
      </div>
    </main>
    <!-- /.classic-main -->
  </div>
</template>

<style lang="scss" scoped>
.classic-main {
  @apply my-16 rounded-xl bg-white;

  .tab {
    @apply flex items-center justify-center border rounded-t-xl py-3 px-6 lg:px-16 cursor-pointer font-semibold;
    border: 1px solid #0d6efd;
  }

  .tab-selected {
    @apply bg-[#0d6efd] text-white;
    img {
      @apply invert;
    }
  }

  .textOverTab {
    @apply text-[#3C3C3C] my-9;
  }
}
</style>
