<script setup lang="ts">
// Import 
import { useGeneralStore } from '@/store/datas/general';
import { onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Variables
const store = useGeneralStore();

onMounted(() => {
  // Test data
  store.setTokens(300);
  store.setBolts(1500);
});

</script>

<template>
  <div class="dash !hidden md:!flex shadow">
    <div class="token">
      <h3><span class="uppercase">Tokens </span>available</h3>
      <div class="flex items-center gap-2">
        <img src="@/assets/images/bronze_token.png" alt="Bronze Token - Pastauction" class="w-14" />
        <h3>+{{ store.getTokens }}</h3>
      </div>
    </div>
    <div class="plan">
      <div class="current flex gap-10">
        <h3>Free</h3>
        <img src="@/assets/icons/info.svg" alt="Information - Pastauction" class="w-[18px]" />
      </div>
      <p class="text-sm text-grey"><i>Current plan</i></p>
    </div>
    <div class="bolts">
      <div class="flex items-center gap-1">
        <img src="@/assets/images/bolt.png" alt="Bolt - Pastauction" class="h-[25px] rotate-[-90deg]"/>
        <h3>Bolts</h3>
      </div>
      <h3>+{{ store.getBolts }}</h3>
    </div>
  </div>

  <swiper
  :slides-per-view="1.5"
  :initialSlide=1
  :space-between="50"
  :centered-slides="true"
  :pagination="{ clickable: false }"
  class="md:!hidden"
  style="padding-bottom: 50px; width: 100%"
  >
    <swiper-slide>
      <div class="card flex justify-between">
        <div class="">
          <h3 class="uppercase font-semibold">Tokens</h3>
          <h5>Available</h5>
        </div>
        <div class="flex items-center gap-2">
          <img src="@/assets/images/bronze_token.png" alt="Bronze Token - Pastauction" class="w-14" />
          <h3 class="font-bold">+{{ store.getTokens }}</h3>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="card">
        <div class="text-center">
          <h3 class="font-bold">Free</h3>
          <p>Current plan</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="card flex justify-between">
        <div class="">
          <h3 class="uppercase font-semibold">Bolts</h3>
          <h5>Available</h5>
        </div>
        <div class="flex items-center gap-2">
          <img src="@/assets/images/bronze_token.png" alt="Bronze Token - Pastauction" class="w-14" />
          <h3 class="font-bold">+{{ store.getBolts }}</h3>
        </div>
      </div>
    </swiper-slide>

  </swiper>
</template>

<style scoped>
  /* dash */
  .dash {
    @apply flex flex-col md:flex-row items-center justify-between py-6 px-10 gap-10;

    .token,
    .plan,
    .bolts {
      @apply flex flex-col justify-around text-[24px] font-semibold;
    }
  }
  .card{
    background-color: rgba(255, 218, 68, 0.25);
  }
</style>
