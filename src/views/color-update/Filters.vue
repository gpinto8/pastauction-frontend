<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { colorUpdate } from '@/store/color-update';
import { ref } from 'vue';

const colorUpdateStore = colorUpdate();

const filterData = ref([
  'Brand',
  'Family',
  'Model',
  'Main color',
  'Support color',
]);

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);
</script>

<template>
  <div
    class="min-h-[40px] bg-[#212529] text-white p-4 flex flex-wrap gap-4 rounded-[4px]"
  >
    <ExpansionSection
      class="block sm:hidden font-bold text-lg !p-0 !m-0 bg-white"
      titleClass="bg-white"
      panelClass="bg-white text-black !p-0 !m-0"
      :forceOpen="mobileOpen"
      hideActions
      @clickTitle="handleOpen"
    >
      <template #title>
        <div
          class="flex z-50 gap-2 w-full items-end justify-center text-[#0D6EFD] font-normal"
        >
          <img
            src="@/assets/svg/search-blue.svg"
            alt="search"
            :width="16"
            :height="16"
            class="self-end"
          />
          Search
        </div>
      </template>
      <template #default>
        <div
          class="flex flex-col gap-4 md:w-[338px] bg-[#DEE2E6] rounded-lg w-full mt-4"
        >
          <div class="flex flex-col gap-2 bg-white">
            <v-autocomplete
              v-for="(label, i) in filterData"
              :key="i"
              class="autocomplete-input !min-w-[180px] h-full bg-white"
              :label="label"
              variant="outlined"
              :items="[]"
              density="compact"
            />
          </div>
        </div>
      </template>
    </ExpansionSection>
    <v-autocomplete
      v-for="(label, i) in filterData"
      :key="i"
      class="autocomplete-input !min-w-[180px] h-full hidden sm:block"
      :label="label"
      variant="outlined"
      :items="[]"
      density="compact"
    />
    <div class="flex gap-2">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'single',
        }"
        @click="colorUpdateStore.selectionMode = 'single'"
      >
        Single
        <img src="@/assets/svg/pic.svg" alt="pic" width="16" height="16" />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'multiple',
        }"
        @click="colorUpdateStore.selectionMode = 'multiple'"
      >
        Multi
        <img
          src="@/assets/svg/pic-multi.svg"
          alt="pic-multi"
          width="16"
          height="16"
        />
      </button>
    </div>
    <div class="flex gap-2 items-center">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{ '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'single' }"
        @click="colorUpdateStore.galleryMode = 'single'"
      >
        <img
          src="@/assets/svg/buttons-4.svg"
          alt="buttons-4"
          width="16"
          height="16"
        />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'multiple',
        }"
        @click="colorUpdateStore.galleryMode = 'multiple'"
      >
        <img
          src="@/assets/svg/buttons-9.svg"
          alt="buttons-9"
          width="16"
          height="16"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.autocomplete-input) {
  .v-input__details {
    display: none !important;
  }

  * {
    height: 35px !important;

    .v-progress-linear__background,
    .v-progress-linear__indeterminate {
      display: none !important;
    }
  }
}
</style>
