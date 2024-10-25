<script setup lang="ts">
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { computed, ref } from 'vue';

const props = defineProps<{ vehicleData?: any }>();

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpenMobile = () => {
  mobileOpen.value = mobileOpen.value === 0 ? 1 : 0;
};

const parametersData = computed(() => {
  const data = props.vehicleData;

  return [
    { label: 'Model', value: data?.bw_model_name || '' },
    { label: 'Stage', value: data?.vehicle_stage || '' },
    { label: 'Series', value: data?.vehicle_series || '' },
    { label: 'From', value: data?.bw_model_year_begin || '' },
    { label: 'To', value: data?.bw_model_year_end || '' },
  ];
});
</script>

<template>
  <!-- DESKTOP & TABLET -->
  <div
    class="hidden sm:flex flex-col sm:flex-row gap-1 justify-center items-center w-full h-fit"
  >
    <div
      :key="i"
      v-for="(parameter, i) in parametersData"
      class="flex sm:flex-col sm:gap-1 w-full"
    >
      <div
        class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] sm:font-semibold p-2 sm:p-1"
      >
        {{ parameter.label }}
      </div>
      <div
        class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
      >
        <div class="flex justify-between gap-1 w-max h-[24px]">
          {{ parameter.value }}
          <img
            class="block sm:hidden"
            src="@/assets/svg/down-equal.svg"
            alt="down-equal"
            width="24"
            height="24"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- MOBILE -->
  <div class="block sm:hidden w-full h-fit">
    <ExpansionSection
      panelClass="mobile-gallery bg-[#212529] text-[#FFFFFF] w-full !p-0 h-fit"
      titleClass="!bg-[#212529] !p-0 h-fit !min-h-0 !pb-1"
      hideActions
      disabled
      :forceOpen="mobileOpen"
    >
      <template #title>
        <div
          class="bg-white w-full h-fit rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] sm:font-semibold p-2 sm:p-1"
        >
          {{ parametersData?.[0].label }}
        </div>
        <div
          class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
        >
          <div class="flex justify-between gap-1 w-full">
            {{ parametersData?.[0].value }}
            <img
              @click="handleOpenMobile"
              class="block sm:hidden pointer-events-auto cursor-pointer"
              src="@/assets/svg/down-equal.svg"
              alt="down-equal"
              width="24"
              height="24"
            />
          </div>
        </div>
      </template>
      <template #default>
        <div
          class="flex flex-col sm:flex-row gap-1 justify-center items-center w-full h-fit"
        >
          <div
            :key="i"
            v-for="(parameter, i) in parametersData?.slice(
              1,
              parametersData.length
            )"
            class="flex sm:flex-col sm:gap-1 w-full"
          >
            <div
              class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] sm:font-semibold p-2 sm:p-1"
            >
              {{ parameter.label }}
            </div>
            <div
              class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
            >
              <div class="flex justify-between gap-1 w-full">
                {{ parameter.value }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExpansionSection>
  </div>
</template>

<style scoped lang="scss">
:deep(.mobile-gallery) {
  .v-expansion-panel-title__overlay {
    display: none;
  }
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
}
</style>
