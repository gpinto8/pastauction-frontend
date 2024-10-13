<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { SelectedFiltersProps } from './UpdateVehicle.vue';

export type FilterLabelProps =
  | 'Brand'
  | 'Family'
  | 'Model'
  | 'Start Year'
  | 'End Year';

export type FilterKeyProps =
  | 'brand_name'
  | 'bw_family_name'
  | 'bw_model_name'
  | 'bw_model_year_begin'
  | 'bw_model_year_end';

type FiltersDataProps = {
  key: FilterKeyProps;
  label: FilterLabelProps;
  defaultValues: string[];
  values: string[];
};

defineProps<{
  class: string;
  modelValue?: SelectedFiltersProps;
}>();

defineEmits(['on-previous', 'on-next']);

const filtersData = ref<FiltersDataProps[]>([
  { key: 'brand_name', label: 'Brand', defaultValues: [], values: [] },
  {
    key: 'bw_family_name',
    label: 'Family',
    defaultValues: [],
    values: [],
  },
  { key: 'bw_model_name', label: 'Model', defaultValues: [], values: [] },
  {
    key: 'bw_model_year_begin',
    label: 'Start Year',
    defaultValues: [],
    values: [],
  },
  {
    key: 'bw_model_year_end',
    label: 'End Year',
    defaultValues: [],
    values: [],
  },
]);

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);

onMounted(async () => {
  for await (const data of filtersData.value) {
    const response = await axios.get(
      `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update/${data.key}/?page=1&size=50`
    );

    const _defaultValues = response.data.items.map(
      (item: any) => item[data.key]
    );

    const currentData = filtersData.value.find(_data => _data.key === data.key);
    const newCurrentData = {
      ...currentData,
      defaultValues: _defaultValues,
      values: _defaultValues,
    } as FiltersDataProps;

    const mergedData: FiltersDataProps[] = [
      ...(filtersData.value.filter(item => item.key !== data.key) || []),
      newCurrentData,
    ];
    filtersData.value = mergedData!;
  }
});

function debounce<T extends (...args: any[]) => void>(func: T, timeout = 1000) {
  let timer: any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const handleSearch = debounce(async (key: FilterKeyProps, term: string) => {
  if (term) {
    const filterData = await axios.get(
      `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update/${key}/?search=${key}_like:${term}&page=1&size=50`
    );

    const filterValues = filterData.data.items.map((item: any) => item?.[key]);
    if (!filterValues.length) return;

    const currentData = filtersData.value.find(_data => _data.key === key);
    const newCurrentData = {
      ...currentData,
      values: filterValues,
    } as FiltersDataProps;

    const mergedData: FiltersDataProps[] = [
      ...(filtersData.value.filter(item => item.key !== key) || []),
      newCurrentData,
    ];
    filtersData.value = mergedData!;
  } else {
    const currentData = filtersData.value.find(_data => _data.key === key);
    const newCurrentData = {
      ...currentData,
      values: currentData?.defaultValues,
    } as FiltersDataProps;

    const mergedData: FiltersDataProps[] = [
      ...(filtersData.value.filter(item => item.key !== key) || []),
      newCurrentData,
    ];
    filtersData.value = mergedData!;
  }
});

const getFilterData = (key: FilterKeyProps) => {
  return filtersData.value.find(item => item.key === key);
};
const getBrandName = () => getFilterData('brand_name');
const getFamilyName = () => getFilterData('bw_family_name');
const getModelName = () => getFilterData('bw_model_name');
const getStartYear = () => getFilterData('bw_model_year_begin');
const getEndYear = () => getFilterData('bw_model_year_end');
</script>

<template>
  <div
    class="w-full min-h-[86px] h-fit bg-[#212529] text-white flex justify-between px-6 py-5 sm:!pb-0 gap-8 rounded-md"
    :class="class"
  >
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
      @click="$emit('on-previous', $event)"
    >
      <img
        src="@/assets/svg/arrow-left.svg"
        alt="arrow-left"
        width="16"
        height="16"
      />
      Previous
    </button>
    <div class="w-full flex gap-2 flex-wrap">
      <!-- DESKTOP -->
      <!-- BRAND NAME -->
      <v-autocomplete
        v-if="getBrandName()?.values?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getBrandName()?.label"
        variant="outlined"
        :items="getBrandName()?.values"
        density="compact"
        :modelValue="modelValue?.Brand as string"
        @update:modelValue="
          modelValue && (modelValue[getBrandName()?.label!] = $event)
        "
        @update:search="term => handleSearch(getBrandName()?.key!, term)"
      />
      <!-- FAMILY NAME -->
      <v-autocomplete
        v-if="getFamilyName()?.values?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getFamilyName()?.label"
        variant="outlined"
        :items="getFamilyName()?.values"
        density="compact"
        :modelValue="modelValue?.Family as string"
        @update:modelValue="
          modelValue && (modelValue[getFamilyName()?.label!] = $event)
        "
        @update:search="term => handleSearch(getFamilyName()?.key!, term)"
      />
      <!-- MODEL NAME -->
      <v-autocomplete
        v-if="getModelName()?.values?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getModelName()?.label"
        variant="outlined"
        :items="getModelName()?.values"
        density="compact"
        :modelValue="modelValue?.Model as string"
        @update:modelValue="
          modelValue && (modelValue[getModelName()?.label!] = $event)
        "
        @update:search="term => handleSearch(getModelName()?.key!, term)"
      />
      <!-- START YEAR -->
      <v-autocomplete
        v-if="getStartYear()?.values?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getStartYear()?.label"
        variant="outlined"
        :items="getStartYear()?.values"
        density="compact"
        :modelValue="modelValue?.['Start Year'] as string"
        @update:modelValue="
          modelValue && (modelValue[getStartYear()?.label!] = $event)
        "
        @update:search="term => handleSearch(getStartYear()?.key!, term)"
      />
      <!-- END YEAR -->
      <v-autocomplete
        v-if="getEndYear()?.values?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getEndYear()?.label"
        variant="outlined"
        :items="getEndYear()?.values"
        density="compact"
        :modelValue="modelValue?.['End Year'] as string"
        @update:modelValue="
          modelValue && (modelValue[getEndYear()?.label!] = $event)
        "
        @update:search="term => handleSearch(getEndYear()?.key!, term)"
      />
      <!-- MOBILE -->
      <ExpansionSection
        titleClass="p-0 bg-white"
        class="sm:hidden w-full !m-0 !p-0 !gap-0"
        :forceOpen="mobileOpen"
        hideActions
      >
        <template #title>
          <div
            class="flex cursor-pointer w-full gap-1 p-2 rounded-md justify-center items-center text-sm pointer-events-auto z-10"
            @click="handleOpen"
          >
            <img
              src="@/assets/svg/parameters.svg"
              alt="parameters"
              width="16"
              height="16"
            />
            <p class="text-[#0D6EFD]">Parameters</p>
          </div>
        </template>
        <template #default>
          <div class="w-full flex flex-col mt-4">
            <!-- BRAND NAME -->
            <v-autocomplete
              v-if="getBrandName()?.values?.length"
              class="w-full"
              :label="getBrandName()?.label"
              variant="outlined"
              :items="getBrandName()?.values"
              density="compact"
              :modelValue="modelValue?.Brand as string"
              @update:modelValue="
                modelValue && (modelValue[getBrandName()?.label!] = $event)
              "
              @update:search="term => handleSearch(getBrandName()?.key!, term)"
            />
            <!-- FAMILY NAME -->
            <v-autocomplete
              v-if="getFamilyName()?.values?.length"
              class="w-full"
              :label="getFamilyName()?.label"
              variant="outlined"
              :items="getFamilyName()?.values"
              density="compact"
              :modelValue="modelValue?.Family as string"
              @update:modelValue="
                modelValue && (modelValue[getFamilyName()?.label!] = $event)
              "
              @update:search="term => handleSearch(getFamilyName()?.key!, term)"
            />
            <!-- MODEL NAME -->
            <v-autocomplete
              v-if="getModelName()?.values?.length"
              class="w-full"
              :label="getModelName()?.label"
              variant="outlined"
              :items="getModelName()?.values"
              density="compact"
              :modelValue="modelValue?.Model as string"
              @update:modelValue="
                modelValue && (modelValue[getModelName()?.label!] = $event)
              "
              @update:search="term => handleSearch(getModelName()?.key!, term)"
            />
            <!-- START YEAR -->
            <v-autocomplete
              v-if="getStartYear()?.values?.length"
              class="w-full"
              :label="getStartYear()?.label"
              variant="outlined"
              :items="getStartYear()?.values"
              density="compact"
              :modelValue="modelValue?.['Start Year'] as string"
              @update:modelValue="
                modelValue && (modelValue[getStartYear()?.label!] = $event)
              "
              @update:search="term => handleSearch(getStartYear()?.key!, term)"
            />
            <!-- END YEAR -->
            <v-autocomplete
              v-if="getEndYear()?.values?.length"
              class="w-full"
              :label="getEndYear()?.label"
              variant="outlined"
              :items="getEndYear()?.values"
              density="compact"
              :modelValue="modelValue?.['End Year'] as string"
              @update:modelValue="
                modelValue && (modelValue[getEndYear()?.label!] = $event)
              "
              @update:search="term => handleSearch(getEndYear()?.key!, term)"
            />
          </div>
        </template>
      </ExpansionSection>
    </div>
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
      @click="$emit('on-next', $event)"
    >
      <img
        src="@/assets/svg/arrow-right.svg"
        alt="arrow-right"
        width="16"
        height="16"
      />
      Next
    </button>
  </div>
</template>
