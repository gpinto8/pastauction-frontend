<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { computed, ref, watch } from 'vue';
import axios from 'axios';

export type FilterAvailableKeys =
  | 'brand_name'
  | 'bw_family_name'
  | 'bw_model_name'
  | 'age_name'
  | 'colorfamily_name'
  | 'color_main_name';

export type FiltersModelValue = {
  key: FilterAvailableKeys;
  value: string;
  isRelated: boolean;
  label: string;
}[];

type FiltersDataProps = {
  key: FilterAvailableKeys;
  label: string;
  defaultValues: string[];
  values: string[];
  isRelated?: boolean;
};

export type FiltersGoValues = {
  key: FilterAvailableKeys;
  value: string;
}[];

const props = defineProps<{
  fetchUrl: string; // e.g "https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter" (yes, with "https" and without the ending "/")
  class?: string;
  modelValue?: FiltersModelValue;
  applyFilters?: (data: FiltersGoValues) => void;
  hideMoveButtons?: boolean;
  classInput?: string;
  mobileAccordion?: {
    title: string;
    iconUrl: string;
  };
  forceSearchLikeKeyword?: boolean; // For the "color-update" page
}>();

defineEmits(['onPrevious', 'onNext']);

const keysShown = computed(() => props.modelValue?.map(data => data.key));

const filtersData = ref<FiltersDataProps[]>([]);
const valuesMap = ref<{ [key in FilterAvailableKeys]: string }>({
  brand_name: '',
  bw_family_name: '',
  bw_model_name: '',
  age_name: '',
  colorfamily_name: '',
  color_main_name: '',
});

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);

const mobileAccordionTitle = computed(
  () => props.mobileAccordion?.title || 'Parameters'
);
const mobileAccordionIconUrl = computed(
  () => props.mobileAccordion?.iconUrl || '/src/assets/svg/parameters.svg'
);

const updateFilterData = (
  key?: FilterAvailableKeys,
  values?: FiltersDataProps['values'],
  updateDefaultValues?: boolean
) => {
  if (key && values?.length) {
    const currentData = filtersData.value.find(_data => _data.key === key);
    const newCurrentData = { ...currentData, values } as FiltersDataProps;
    if (updateDefaultValues) newCurrentData.defaultValues = values;

    const mergedData: FiltersDataProps[] = [
      ...(filtersData.value.filter(item => item.key !== key) || []),
      newCurrentData,
    ];
    filtersData.value = mergedData;
  }
};

const getDynamicParams = (key: FilterAvailableKeys, addLike?: boolean) => {
  if (!filtersData.value.find(item => item?.key === key)?.isRelated) {
    return;
  }

  const additionalParams = filtersData.value
    .map(data => {
      const value = valuesMap.value[data.key];
      if (data.isRelated && data.key !== key && value) {
        const newKey = `${data.key}${addLike ? '_like' : ''}:${value}`;
        return newKey;
      }
    })
    .filter(Boolean)
    .join(',');

  return additionalParams;
};

watch(
  () => props.modelValue,
  async () => {
    if (props.modelValue) {
      filtersData.value = props.modelValue.map(
        ({ key, value, isRelated, label }) => {
          valuesMap.value[key] = value;

          return {
            key,
            label,
            defaultValues: [''],
            values: [''],
            isRelated,
          };
        }
      );
    }

    for await (const data of filtersData.value) {
      // The filters have to be related to each other, thats why we need to pass the previous selected filters values to the current one BUT the current one, ofc
      const dynamicParams = getDynamicParams(data.key);
      const dynamicParamsString = dynamicParams
        ? `search=${dynamicParams}&`
        : '';

      try {
        const url = `${props.fetchUrl}/${data.key}/?${dynamicParamsString}page=1&size=50`;
        const response = await axios.get(url);
        const values = response.data.items.map((item: any) => item[data.key]);
        updateFilterData(data.key, values, true);
      } catch (e) {}
    }
  },
  { immediate: true }
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

const resetFilterDataValue = (key: FilterAvailableKeys) => {
  valuesMap.value[key] = null!; // Do not use '' since the UI won't update for some reason (the input's placeholder won't go down)
};

const resetFilterData = (key: FilterAvailableKeys) => {
  const keySiblingsMap: {
    [key in FilterAvailableKeys]: (FilterAvailableKeys | '')[];
  } = {
    brand_name: [
      'bw_family_name',
      'bw_model_name',
      'age_name',
      'colorfamily_name',
      'color_main_name',
    ],
    bw_family_name: [
      'bw_model_name',
      'age_name',
      'colorfamily_name',
      'color_main_name',
    ],
    bw_model_name: ['age_name', 'colorfamily_name', 'color_main_name'],
    age_name: ['colorfamily_name', 'color_main_name'],
    colorfamily_name: ['color_main_name'],
    color_main_name: [''],
  };

  if (key) {
    const siblings = keySiblingsMap[key];
    if (siblings?.length) {
      siblings.forEach(siblingKey => {
        if (siblingKey) resetFilterDataValue(siblingKey);
      });
    }
  }
};

const handleSearchFocus = async (
  key: FilterAvailableKeys,
  isFocused: boolean
) => {
  if (!isFocused) return;

  // @ts-ignore
  if (key && isFocused) resetFilterDataValue(key); // When the user clicks on the input, it should reset the value
  resetFilterData(key); // Resetting the key's next siblings

  if (isFocused) {
    const dynamicParams = getDynamicParams(key);
    const dynamicParamsString = dynamicParams ? `search=${dynamicParams}&` : '';

    try {
      const url = `${props.fetchUrl}/${key}/?${dynamicParamsString}page=1&size=50`;
      const response = await axios.get(url);
      const values = response.data.items.map((item: any) => item[key]);
      updateFilterData(key, values, true);
    } catch (e) {}
  }
};

const handleSearch = debounce(
  async (key: FilterAvailableKeys, term: string) => {
    if (term) {
      // The filters have to be related to each other, thats why we need to pass the previous selected filters values to the current one BUT the current one, ofc
      const dynamicParams = getDynamicParams(key);
      const dynamicParamsString = dynamicParams ? `,${dynamicParams}` : '';
      const keyword = props.forceSearchLikeKeyword
        ? 'like'
        : key === 'brand_name'
          ? 'like'
          : 'left';

      try {
        const response = await axios.get(
          `${props.fetchUrl}/${key}/?search=${key}_${keyword}:${term}${dynamicParamsString}&page=1&size=50`
        );
        const values = response.data.items.map((item: any) => item?.[key]);
        updateFilterData(key, values);
      } catch (e) {}
    } else {
      const values = filtersData.value.find(data => data.key === key);
      updateFilterData(key, values?.defaultValues);
    }
  }
);

const handleGo = () => {
  const data = filtersData.value.map(({ key }) => {
    const value = valuesMap.value[key];
    return { key, value };
  });

  if (data?.length) props?.applyFilters?.(data);
};

const getFilterData = (key: FilterAvailableKeys) => {
  return filtersData.value.find(item => item.key === key);
};
const getBrandName = () => getFilterData('brand_name');
const getFamilyName = () => getFilterData('bw_family_name');
const getModelName = () => getFilterData('bw_model_name');
const getAgingName = () => getFilterData('age_name');
const getColorFamilyName = () => getFilterData('colorfamily_name');
const getColorMainName = () => getFilterData('color_main_name');

const isAnyKeyAvaiable = computed(() => keysShown.value?.some(key => key));
</script>

<template>
  <div
    class="w-full h-fit bg-[#212529] text-white flex justify-between px-6 py-5 sm:!pb-0 gap-8 rounded-md"
    :class="class"
  >
    <!-- PREVIOUS BUTTON -->
    <button
      v-if="!hideMoveButtons"
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

    <!-- DESKTOP -->
    <div class="hidden sm:flex w-full gap-2 flex-wrap">
      <!-- BRAND NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('brand_name')"
        class="w-fit"
        :class="classInput"
        :label="getBrandName()?.label"
        variant="outlined"
        :items="getBrandName()?.values"
        density="compact"
        :modelValue="valuesMap[getBrandName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getBrandName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getBrandName()?.key!, term)"
        @update:focused="handleSearchFocus(getBrandName()?.key!, $event)"
      />
      <!-- FAMILY NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('bw_family_name')"
        class="w-fit"
        :class="classInput"
        :label="getFamilyName()?.label"
        variant="outlined"
        :items="getFamilyName()?.values"
        density="compact"
        :modelValue="valuesMap[getFamilyName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getFamilyName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getFamilyName()?.key!, term)"
        @update:focused="handleSearchFocus(getFamilyName()?.key!, $event)"
      />
      <!-- MODEL NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('bw_model_name')"
        class="w-fit"
        :class="classInput"
        :label="getModelName()?.label"
        variant="outlined"
        :items="getModelName()?.values"
        density="compact"
        :modelValue="valuesMap[getModelName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getModelName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getModelName()?.key!, term)"
        @update:focused="handleSearchFocus(getModelName()?.key!, $event)"
      />
      <!-- AGING NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('age_name')"
        class="w-fit"
        :class="classInput"
        :label="getAgingName()?.label"
        variant="outlined"
        :items="getAgingName()?.values"
        density="compact"
        :modelValue="valuesMap[getAgingName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getAgingName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getAgingName()?.key!, term)"
        @update:focused="handleSearchFocus(getAgingName()?.key!, $event)"
      />
      <!-- COLOR FAMILY NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('colorfamily_name')"
        class="w-fit"
        :class="classInput"
        :label="getColorFamilyName()?.label"
        variant="outlined"
        :items="getColorFamilyName()?.values"
        density="compact"
        :modelValue="valuesMap[getColorFamilyName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getColorFamilyName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getColorFamilyName()?.key!, term)"
        @update:focused="handleSearchFocus(getColorFamilyName()?.key!, $event)"
      />
      <!-- COLOR MAIN NAME -->
      <v-autocomplete
        v-if="keysShown?.includes('color_main_name')"
        class="w-fit"
        :class="classInput"
        :label="getColorMainName()?.label"
        variant="outlined"
        :items="getColorMainName()?.values"
        density="compact"
        :modelValue="valuesMap[getColorMainName()?.key!]"
        @update:modelValue="
          valuesMap && (valuesMap[getColorMainName()?.key!] = $event || '')
        "
        @update:search="term => handleSearch(getColorMainName()?.key!, term)"
        @update:focused="handleSearchFocus(getColorMainName()?.key!, $event)"
      />
      <!-- GO BUTTON -->
      <v-btn
        v-if="isAnyKeyAvaiable"
        class="flex-end hidden sm:grid items-center mt-1 text-[#212529] bg-white rounded-md font-normal place-content-center text-sm text-none text-center"
        @click="handleGo"
      >
        Go
      </v-btn>
    </div>

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
            :src="mobileAccordionIconUrl"
            :alt="mobileAccordionTitle"
            width="16"
            height="16"
          />
          <p class="text-[#0D6EFD]">{{ mobileAccordionTitle }}</p>
        </div>
      </template>
      <template #default>
        <div class="w-full flex flex-col mt-4">
          <!-- BRAND NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('brand_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getBrandName()?.label"
            variant="outlined"
            :items="getBrandName()?.values"
            density="compact"
            :modelValue="valuesMap[getBrandName()?.key!]"
            @update:modelValue="
              valuesMap && (valuesMap[getBrandName()?.key!] = $event || '')
            "
            @update:search="term => handleSearch(getBrandName()?.key!, term)"
            @update:focused="handleSearchFocus(getBrandName()?.key!, $event)"
          />
          <!-- FAMILY NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('bw_family_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getFamilyName()?.label"
            variant="outlined"
            :items="getFamilyName()?.values"
            density="compact"
            :modelValue="valuesMap[getFamilyName()?.key!]"
            @update:modelValue="
              valuesMap && (valuesMap[getFamilyName()?.key!] = $event || '')
            "
            @update:search="term => handleSearch(getFamilyName()?.key!, term)"
            @update:focused="handleSearchFocus(getFamilyName()?.key!, $event)"
          />
          <!-- MODEL NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('bw_model_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getModelName()?.label"
            variant="outlined"
            :items="getModelName()?.values"
            density="compact"
            :modelValue="valuesMap[getModelName()?.key!]"
            @update:modelValue="
              valuesMap && (valuesMap[getModelName()?.key!] = $event || '')
            "
            @update:search="term => handleSearch(getModelName()?.key!, term)"
            @update:focused="handleSearchFocus(getModelName()?.key!, $event)"
          />
          <!-- AGING NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('age_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getAgingName()?.label"
            variant="outlined"
            :items="getAgingName()?.values"
            density="compact"
            :modelValue="valuesMap[getAgingName()?.key!]"
            @update:modelValue="
              valuesMap && (valuesMap[getAgingName()?.key!] = $event || '')
            "
            @update:search="term => handleSearch(getAgingName()?.key!, term)"
            @update:focused="handleSearchFocus(getAgingName()?.key!, $event)"
          />
          <!-- COLOR FAMILY NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('colorfamily_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getColorFamilyName()?.label"
            variant="outlined"
            :items="getColorFamilyName()?.values"
            density="compact"
            :modelValue="valuesMap[getColorFamilyName()?.key!]"
            @update:modelValue="
              valuesMap &&
                (valuesMap[getColorFamilyName()?.key!] = $event || '')
            "
            @update:search="
              term => handleSearch(getColorFamilyName()?.key!, term)
            "
            @update:focused="
              handleSearchFocus(getColorFamilyName()?.key!, $event)
            "
          />
          <!-- COLOR MAIN NAME -->
          <v-autocomplete
            v-if="keysShown?.includes('color_main_name')"
            class="block sm:hidden w-full"
            :class="classInput"
            :label="getColorMainName()?.label"
            variant="outlined"
            :items="getColorMainName()?.values"
            density="compact"
            :modelValue="valuesMap[getColorMainName()?.key!]"
            @update:modelValue="
              valuesMap && (valuesMap[getColorMainName()?.key!] = $event || '')
            "
            @update:search="
              term => handleSearch(getColorMainName()?.key!, term)
            "
            @update:focused="
              handleSearchFocus(getColorMainName()?.key!, $event)
            "
          />
          <!-- GO BUTTON -->
          <v-btn
            v-if="isAnyKeyAvaiable"
            class="w-full md:w-1/3 text-white bg-[#212529] rounded-md font-normal grid place-content-center text-sm text-none text-center"
            @click="handleGo"
          >
            Go
          </v-btn>
        </div>
      </template>
    </ExpansionSection>

    <!-- NEXT BUTTON -->
    <button
      v-if="!hideMoveButtons"
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
