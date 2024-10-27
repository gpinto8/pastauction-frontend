<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { ref, watch } from 'vue';
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
  isRelated?: boolean;
};

const props = defineProps<{
  class: string;
  modelValue?: SelectedFiltersProps;
}>();

defineEmits(['onPrevious', 'onNext']);

const filtersData = ref<FiltersDataProps[]>([
  {
    key: 'brand_name',
    label: 'Brand',
    defaultValues: [],
    values: [],
    isRelated: true,
  },
  {
    key: 'bw_family_name',
    label: 'Family',
    defaultValues: [],
    values: [],
    isRelated: true,
  },
  {
    key: 'bw_model_name',
    label: 'Model',
    defaultValues: [],
    values: [],
    isRelated: true,
  },
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

const updateFilterData = (
  key?: string,
  values?: FiltersDataProps['values'],
  updateDefaultValues?: boolean
) => {
  if (key && values) {
    const currentData = filtersData.value.find(_data => _data.key === key);
    const newCurrentData = { ...currentData, values } as FiltersDataProps;
    if (updateDefaultValues) newCurrentData.defaultValues = values;

    const mergedData: FiltersDataProps[] = [
      ...(filtersData.value.filter(item => item.key !== key) || []),
      newCurrentData,
    ];
    filtersData.value = mergedData!;
  }
};

const getDynamicParams = (key: string, addLike?: boolean) => {
  if (!filtersData.value.find(item => item?.key === key)?.isRelated) {
    return;
  }

  const {
    bw_model_name,
    bw_model_year_begin,
    bw_model_year_end,
    ...newModelValue // Excluding the 2 keys that dont have to be filtered related to the others
  } = props.modelValue || {};

  const additionalParams = newModelValue
    ? Object.entries(newModelValue)
        .map(([_key, _value]) => {
          if (_value && _key !== key) {
            const newKey = `${_key}${addLike ? '_like' : ''}:${_value}`;
            return newKey;
          }
        })
        .filter(Boolean)
        .join(',')
    : '';

  return additionalParams;
};

watch(
  () => props.modelValue,
  async () => {
    if (Object.values(props.modelValue || {}).some(item => !item)) return;

    for await (const data of filtersData.value) {
      // The filters have to be related to each other, thats why we need to pass the previous selected filters values to the current one BUT the current one, ofc
      const dynamicParams = getDynamicParams(data.key);
      const dynamicParamsString = dynamicParams
        ? `search=${dynamicParams}&`
        : '';

      const url = `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter/${data.key}/?${dynamicParamsString}page=1&size=50`;
      const response = await axios.get(url);

      const values = response.data.items.map((item: any) => item[data.key]);
      updateFilterData(data.key, values, true);
    }
  }
);

function debounce<T extends (...args: any[]) => void>(func: T, timeout = 10) {
  let timer: any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const handleSearchFocus = async (key: string, isFocused: boolean) => {
  const isKeyValueEmpty: boolean = !(props.modelValue as any)?.[key]!;
  const hasAnyValue =
    props.modelValue &&
    Object.values(props.modelValue).some(item => {
      return item;
    });

  if (isFocused && isKeyValueEmpty && hasAnyValue) {
    const dynamicParams = getDynamicParams(key, true);
    const dynamicParamsString = dynamicParams ? `search=${dynamicParams}&` : '';

    const url = `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter/${key}/?${dynamicParamsString}page=1&size=50`;
    const response = await axios.get(url);

    const values = response.data.items.map((item: any) => item[key]);
    updateFilterData(key, values);
  }
};

const handleSearch = debounce(async (key: FilterKeyProps, term: string) => {
  if (term) {
    // The filters have to be related to each other, thats why we need to pass the previous selected filters values to the current one BUT the current one, ofc
    const dynamicParams = getDynamicParams(key, true);
    const dynamicParamsString = dynamicParams ? `,${dynamicParams}` : '';

    const response = await axios.get(
      `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter/${key}/?search=${key}_like:${term}${dynamicParamsString}&page=1&size=50`
    );

    const values = response.data.items.map((item: any) => item?.[key]);
    updateFilterData(key, values);
  } else {
    const values = filtersData.value.find(data => data.key === key);
    updateFilterData(key, values?.defaultValues);
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
      @click="$emit('onPrevious', $event)"
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
        v-if="getBrandName()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getBrandName()?.label"
        variant="outlined"
        :items="getBrandName()?.values"
        density="compact"
        :modelValue="modelValue?.brand_name as string"
        @update:modelValue="
          modelValue && (modelValue[getBrandName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getBrandName()?.key!, term)"
        @update:focused="handleSearchFocus(getBrandName()?.key!, $event)"
      />
      <!-- FAMILY NAME -->
      <v-autocomplete
        v-if="getFamilyName()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getFamilyName()?.label"
        variant="outlined"
        :items="getFamilyName()?.values"
        density="compact"
        :modelValue="modelValue?.bw_family_name as string"
        @update:modelValue="
          modelValue && (modelValue[getFamilyName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getFamilyName()?.key!, term)"
        @update:focused="handleSearchFocus(getFamilyName()?.key!, $event)"
      />
      <!-- MODEL NAME -->
      <v-autocomplete
        v-if="getModelName()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getModelName()?.label"
        variant="outlined"
        :items="getModelName()?.values"
        density="compact"
        :modelValue="modelValue?.bw_model_name as string"
        @update:modelValue="
          modelValue && (modelValue[getModelName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getModelName()?.key!, term)"
        @update:focused="handleSearchFocus(getModelName()?.key!, $event)"
      />
      <!-- START YEAR -->
      <v-autocomplete
        v-if="getStartYear()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getStartYear()?.label"
        variant="outlined"
        :items="getStartYear()?.values"
        density="compact"
        :modelValue="modelValue?.bw_model_year_begin as string"
        @update:modelValue="
          modelValue && (modelValue[getStartYear()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getStartYear()?.key!, term)"
        @update:focused="handleSearchFocus(getStartYear()?.key!, $event)"
      />
      <!-- END YEAR -->
      <v-autocomplete
        v-if="getEndYear()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getEndYear()?.label"
        variant="outlined"
        :items="getEndYear()?.values"
        density="compact"
        :modelValue="modelValue?.bw_model_year_end as string"
        @update:modelValue="
          modelValue && (modelValue[getEndYear()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getEndYear()?.key!, term)"
        @update:focused="handleSearchFocus(getEndYear()?.key!, $event)"
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
              v-if="getBrandName()?.defaultValues?.length"
              class="w-full"
              :label="getBrandName()?.label"
              variant="outlined"
              :items="getBrandName()?.values"
              density="compact"
              :modelValue="modelValue?.brand_name as string"
              @update:modelValue="
                modelValue && (modelValue[getBrandName()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getBrandName()?.key!, term)"
              @update:focused="handleSearchFocus(getBrandName()?.key!, $event)"
            />
            <!-- FAMILY NAME -->
            <v-autocomplete
              v-if="getFamilyName()?.defaultValues?.length"
              class="w-full"
              :label="getFamilyName()?.label"
              variant="outlined"
              :items="getFamilyName()?.values"
              density="compact"
              :modelValue="modelValue?.bw_family_name as string"
              @update:modelValue="
                modelValue && (modelValue[getFamilyName()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getFamilyName()?.key!, term)"
              @update:focused="handleSearchFocus(getFamilyName()?.key!, $event)"
            />
            <!-- MODEL NAME -->
            <v-autocomplete
              v-if="getModelName()?.defaultValues?.length"
              class="w-full"
              :label="getModelName()?.label"
              variant="outlined"
              :items="getModelName()?.values"
              density="compact"
              :modelValue="modelValue?.bw_model_name as string"
              @update:modelValue="
                modelValue && (modelValue[getModelName()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getModelName()?.key!, term)"
              @update:focused="handleSearchFocus(getModelName()?.key!, $event)"
            />
            <!-- START YEAR -->
            <v-autocomplete
              v-if="getStartYear()?.defaultValues?.length"
              class="w-full"
              :label="getStartYear()?.label"
              variant="outlined"
              :items="getStartYear()?.values"
              density="compact"
              :modelValue="modelValue?.bw_model_year_begin as string"
              @update:modelValue="
                modelValue && (modelValue[getStartYear()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getStartYear()?.key!, term)"
              @update:focused="handleSearchFocus(getStartYear()?.key!, $event)"
            />
            <!-- END YEAR -->
            <v-autocomplete
              v-if="getEndYear()?.defaultValues?.length"
              class="w-full"
              :label="getEndYear()?.label"
              variant="outlined"
              :items="getEndYear()?.values"
              density="compact"
              :modelValue="modelValue?.bw_model_year_end as string"
              @update:modelValue="
                modelValue && (modelValue[getEndYear()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getEndYear()?.key!, term)"
              @update:focused="handleSearchFocus(getEndYear()?.key!, $event)"
            />
          </div>
        </template>
      </ExpansionSection>
    </div>
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
      @click="$emit('onNext', $event)"
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
