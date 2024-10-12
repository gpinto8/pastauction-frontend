<script setup lang="ts">
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
import type { SelectedFiltersProps } from '../UpdateVehicle.vue';

type ParametersDataProps = {
  label: 'Model' | 'Stage' | 'Series' | 'From' | 'To';
  value: string;
}[];

const props = defineProps<{
  modelValue?: any;
  filterData?: SelectedFiltersProps;
}>();

const emit = defineEmits(['update:modelValue', 'getResponseData']);

const mobileOpen = ref(1); // 0 - open | 1 - close
const responseData = ref();

const handleOpenMobile = () => {
  mobileOpen.value = mobileOpen.value === 0 ? 1 : 0;
};

const parametersData = ref<ParametersDataProps>([
  { label: 'Model', value: '' },
  { label: 'Stage', value: '' },
  { label: 'Series', value: '' },
  { label: 'From', value: '' },
  { label: 'To', value: '' },
]);

defineExpose({
  responseData,
});

watch(
  () => [
    props.filterData?.['Brand'],
    props.filterData?.['Family'],
    props.filterData?.['Model'],
    props.filterData?.['Start Year'],
    props.filterData?.['End Year'],
  ],
  newSelectedFilters => {
    const [brand, family, model, startYear, endYear] = newSelectedFilters || [];
    if (brand && family && model && startYear && endYear) {
      axios
        .get(
          `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=brand_name:${brand}&bw_family_name:${family}&bw_model_name:${model}&bw_model_year_begin:${startYear}&bw_model_year_end:${endYear}&page=1&size=50`
        )
        .then(response => {
          const data = response.data;
          if (!data?.items?.length) return;

          responseData.value = data;
          emit('getResponseData', data);

          const [startData, endData] = data?.items || {};
          parametersData.value = [
            { label: 'Model', value: startData?.bw_model_name },
            { label: 'Stage', value: startData?.vehicle_stage },
            { label: 'Series', value: startData?.vehicle_series },
            { label: 'From', value: startData?.vehicle_year },
            { label: 'To', value: endData?.vehicle_year },
          ];
        });
    }
  }
);
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
        <div class="flex justify-between gap-1 w-full">
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
          {{ parametersData[0].label }}
        </div>
        <div
          class="bg-white w-full rounded-sm border border-solid text-white md:!text-black !bg-[#FFFFFF1A] sm:border-[#CED4DA] font-normal p-2 sm:p-1"
        >
          <div class="flex justify-between gap-1 w-full">
            993 - IV
            {{ parametersData[0].label }}
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
            v-for="(parameter, i) in parametersData.slice(
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
