<script setup lang="ts">
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

defineProps<{
  class: string;
}>();

onMounted(async () => {
  const response = await axios.get(
    'https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=bw_family_id:39763'
  );
  console.log(response);
});

const mobileOpen = ref(1); // 0 - open | 1 - close

const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);
</script>

<template>
  <!-- DESKTOP -->
  <div class="hidden md:flex inputs gap-4" :class="class">
    <div class="p-3 bg-[#DEE2E6] w-fit h-fit md:w-2/3">
      <div class="title p-2">Before</div>
      <div class="flex flex-col">
        <div class="flex" :key="_" v-for="_ in new Array(10)">
          <div class="bg-white w-2/5 badge key">Family</div>
          <div class="bg-white w-3/5 badge value">911</div>
        </div>
      </div>
    </div>
    <div class="p-3 !bg-[#DEE2E6] w-fit h-fit md:w-1/3">
      <div class="title p-2">Suggested</div>
      <div class="flex flex-col w-full" :key="_" v-for="_ in new Array(10)">
        <div class="badge w-full value">911</div>
      </div>
    </div>
  </div>
  <!-- MOBILE -->
  <ExpansionSection
    class="mobile-accordion block md:hidden font-bold text-lg !p-0 !m-0"
    titleClass="bg-[#DEE2E6]"
    panelClass="bg-[#DEE2E6] text-black !p-0 !m-0"
    :forceOpen="mobileOpen"
    hideActions
  >
    <template #title>
      <div class="flex gap-2 w-full items-center">
        <div v-if="mobileOpen === 1" class="text-lg">Description</div>
        <div
          class="hidden sm:flex w-full flex-col cursor-pointer pointer-events-auto z-10"
        >
          <img
            v-if="mobileOpen === 0"
            src="@/assets/svg/minus-circle-black.svg"
            alt="plus-circle"
            width="24"
            height="24"
            @click="handleOpen"
            class="self-end"
          />
          <img
            v-if="mobileOpen === 1"
            src="@/assets/svg/plus-circle-black.svg"
            alt="plus-circle"
            width="24"
            height="24"
            @click="handleOpen"
            class="self-end"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col sm:flex-row inputs gap-8 w-full !p-0 !m-0">
        <div class="bg-[#DEE2E6] w-full">
          <div class="title p-2">Before</div>
          <div class="flex flex-col">
            <div class="flex" :key="_" v-for="_ in new Array(10)">
              <div class="bg-white w-2/5 sm:w-2/5 badge key">Family</div>
              <div class="bg-white w-3/5 sm:w-3/5 badge value">911</div>
            </div>
          </div>
        </div>
        <div class="bg-[#DEE2E6] w-full">
          <div class="title p-2">Suggested</div>
          <div class="flex flex-col w-full" :key="_" v-for="_ in new Array(10)">
            <div class="badge w-full value">911</div>
          </div>
        </div>
      </div>
    </template>
  </ExpansionSection>
</template>

<style lang="scss" scoped>
* {
  font-family: Inter;
}

.badge {
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  border: 1px solid #ced4da;
  padding: 5px 9px;
  background: white;
  width: 100%;
}

.inputs {
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
  }

  .key {
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
  }

  .value {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
}
</style>
