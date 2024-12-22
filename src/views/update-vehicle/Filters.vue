<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
import type { SelectedFiltersProps } from './UpdateVehicle.vue';

export type FilterLabelProps = 'Brand' | 'Family' | 'Model' | 'Aging';

export type FilterKeyProps =
  | 'brand_name'
  | 'bw_family_name'
  | 'bw_model_name'
  | 'age_name';

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
  applyFilters?: () => void;
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
    key: 'age_name',
    label: 'Aging',
    defaultValues: [],
    values: [],
    isRelated: true,
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

function debounce<T extends (...args: any[]) => void>(func: T, timeout = 500) {
  let timer: any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const handleSearchFocus = async (key: string, isFocused: boolean) => {
  // @ts-ignore
  if (isFocused && key && props.modelValue) props.modelValue[key] = null; // When the user clicks on the input, it should reset the value

  const isKeyValueEmpty: boolean = !(props.modelValue as any)?.[key]!;
  // const hasAnyValue =
  //   props.modelValue &&
  //   Object.values(props.modelValue).some(item => {
  //     return item;
  //   });

  if (isFocused && isKeyValueEmpty) {
    const dynamicParams = getDynamicParams(key);
    const dynamicParamsString = dynamicParams ? `search=${dynamicParams}&` : '';

    const url = `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter/${key}/?${dynamicParamsString}page=1&size=50`;
    const response = await axios.get(url);

    const values = response.data.items.map((item: any) => item[key]);
    updateFilterData(key, values, true);
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
const getAgingName = () => getFilterData('age_name');

const handleGo = () => props?.applyFilters?.();
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
      <!-- AGING NAME -->
      <v-autocomplete
        v-if="getAgingName()?.defaultValues?.length"
        class="hidden sm:block w-fit !min-w-[180px]"
        :label="getAgingName()?.label"
        variant="outlined"
        :items="getAgingName()?.values"
        density="compact"
        :modelValue="modelValue?.age_name as string"
        @update:modelValue="
          modelValue && (modelValue[getAgingName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getAgingName()?.key!, term)"
        @update:focused="handleSearchFocus(getAgingName()?.key!, $event)"
      />
      <!-- GO BUTTON -->
      <v-btn
        class="hidden sm:grid items-center mt-1 text-[#212529] bg-white rounded-md font-normal place-content-center text-sm text-none text-center"
        @click="handleGo"
      >
        Go
      </v-btn>

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
            <!-- AGING NAME -->
            <v-autocomplete
              v-if="getAgingName()?.defaultValues?.length"
              class="w-full"
              :label="getAgingName()?.label"
              variant="outlined"
              :items="getAgingName()?.values"
              density="compact"
              :modelValue="modelValue?.age_name as string"
              @update:modelValue="
                modelValue && (modelValue[getAgingName()?.key!] = $event || '')
              "
              @update:search="term => handleSearch(getAgingName()?.key!, term)"
              @update:focused="handleSearchFocus(getAgingName()?.key!, $event)"
            />
            <!-- GO BUTTON -->
            <v-btn
              class="w-1/3 text-white bg-[#212529] rounded-md font-normal grid place-content-center text-sm text-none text-center"
              @click="handleGo"
            >
              Go
            </v-btn>
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
