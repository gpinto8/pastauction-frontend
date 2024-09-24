<script setup lang="ts">
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { ref } from 'vue';

const mobileOpen = ref(1); // 0 - open | 1 - close

const handleOpenMobile = () => {
  console.log({ mobileOpen: mobileOpen.value });
  mobileOpen.value = mobileOpen.value === 0 ? 1 : 0;
};
</script>

<template>
  <!-- DESKTOP & TABLET -->
  <div
    class="hidden sm:flex flex-col sm:flex-row gap-1 justify-center items-center w-full h-fit"
  >
    <div
      :key="_"
      v-for="_ in new Array(5)"
      class="flex sm:flex-col sm:gap-1 w-full"
    >
      <div
        class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] sm:font-semibold p-2 sm:p-1"
      >
        Model
      </div>
      <div
        class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
      >
        <div class="flex justify-between gap-1 w-full">
          993 - IV
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
          Model
        </div>
        <div
          class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
        >
          <div class="flex justify-between gap-1 w-full">
            993 - IV
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
            :key="_"
            v-for="_ in new Array(5)"
            class="flex sm:flex-col sm:gap-1 w-full"
          >
            <div
              class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] sm:font-semibold p-2 sm:p-1"
            >
              Model
            </div>
            <div
              class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
            >
              <div class="flex justify-between gap-1 w-full">993 - IV</div>
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
