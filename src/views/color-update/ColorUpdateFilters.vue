<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';
import { watch, ref } from 'vue';
import Filters, {
  type FilterAvailableKeys,
  type FiltersGoValues,
  type FiltersModelValue,
} from '@/components/common/Filters.vue';
import axios from 'axios';

type MakeAllOptional<T> = {
  [K in keyof T]?: T[K];
};

const props = defineProps<{
  vehicleData: any;
  applyFilters?: (data: FiltersGoValues) => void;
}>();

const colorUpdateStore = colorUpdate();
const disabledSupportColor = ref(false);

const filterModelValue = ref<FiltersModelValue>();

const updateFilterModelValue = (
  key: FilterAvailableKeys,
  data: MakeAllOptional<FiltersModelValue[0]>
) => {
  if (key && data && filterModelValue.value) {
    const colorObject = {
      ...filterModelValue.value.find(data => data.key === key),
      ...data,
    } as FiltersModelValue[0];
    const filtered: FiltersModelValue = filterModelValue.value.filter(
      data => data.key !== colorObject.key
    );

    filterModelValue.value = [...filtered, colorObject];
  }
};

watch(
  () => props?.vehicleData,
  async () => {
    filterModelValue.value = [
      {
        key: 'brand_name',
        label: 'Brand',
        value: props?.vehicleData?.brand_name || null,
        isRelated: true,
      },
      {
        key: 'bw_family_name',
        label: 'Family',
        value: props?.vehicleData?.bw_family_name || null,
        isRelated: true,
      },
      {
        key: 'bw_model_name',
        label: 'Model',
        value: props?.vehicleData?.bw_model_name || null,
        isRelated: true,
      },
      {
        key: 'colorfamily_name',
        label: 'Main color',
        value: null as any, // Fetched below, based on the "color_main_name"
        isRelated: true,
      },
      {
        key: 'color_main_name',
        label: 'Support color',
        value: props?.vehicleData?.color_main_name || null,
        isRelated: true,
      },
    ];

    const colorMainName = props?.vehicleData?.color_main_name;
    if (colorMainName && filterModelValue.value) {
      const data = await axios
        .get(
          `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter_color/colorfamily_name/?search=color_main_name:${colorMainName}`
        )
        .catch(e => e);

      const colorFamilyName = data?.data?.items?.[0]?.colorfamily_name;
      updateFilterModelValue('colorfamily_name', { value: colorFamilyName });
    }
  }
);

const colorUpdateFilterUrl =
  'https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter_color';

const colorData = {
  id_color_bicolor: 'No bicolor',
  id_color_body: 'No body color',
  id_color_roof: 'No roof color',
};

const addSpace = (values: string[]) => values.map(item => ` ${item}`);
const colorFamilyAdditionalValues = [
  addSpace([colorData.id_color_bicolor]),
  addSpace([colorData.id_color_body]),
  addSpace([colorData.id_color_roof]),
  addSpace([colorData.id_color_bicolor, colorData.id_color_body]),
  addSpace([colorData.id_color_bicolor, colorData.id_color_roof]),
  addSpace([colorData.id_color_body, colorData.id_color_roof]),
  addSpace([
    colorData.id_color_bicolor,
    colorData.id_color_body,
    colorData.id_color_roof,
  ]),
].map(item => `● ${item}`);

const handleSearchFocus = (key: FilterAvailableKeys) =>
  key === 'colorfamily_name' && (colorUpdateStore.filterMissingColorKeys = []);

const handleValueUpdated = (value: string) => {
  if (value) {
    const missingColorKeys = value
      .split(',')
      .map(
        inputValue =>
          Object.entries(colorData).find(item =>
            inputValue.includes(item[1])
          )?.[0]
      )
      .filter(Boolean) as string[];

    if (missingColorKeys && missingColorKeys?.length) {
      colorUpdateStore.filterMissingColorKeys = missingColorKeys;
    }

    disabledSupportColor.value = !!missingColorKeys?.length;
  }
};

watch(
  () => colorUpdateStore.selectionMode,
  () => {
    // Reset values
    colorUpdateStore.selectingHexColor = false;
    colorUpdateStore.selectedColorFromGallery = {
      hex_code: '',
      id: 0,
      id_family: 0,
      name: '',
    };
    colorUpdateStore.selectedPickColors = [
      {
        key: 'colorfamily_name',
        label: 'Main color:',
        value: '',
        selected: true,
        clicked: false,
      },
      {
        key: 'color_main_name',
        label: 'Bicolor:',
        value: '',
        selected: false,
        clicked: false,
      },
      {
        key: 'color_roof_name',
        label: 'Top color:',
        value: '',
        selected: false,
        clicked: false,
      },
    ];
    colorUpdateStore.dynamicColors = [
      { key: 'colorfamily_name', value: '' },
      { key: 'color_main_name', value: '' },
      { key: 'color_roof_name', value: '' },
    ];
  }
);
</script>

<template>
  <div
    class="min-h-[40px] bg-[#212529] text-white p-4 flex flex-wrap gap-4 rounded-[4px] md:p-0"
  >
    <!-- FILTERS -->
    <Filters
      :fetchUrl="colorUpdateFilterUrl"
      class="!w-full md:!w-[75%] !p-0 md:!px-6 md:!py-5 md:!pb-0"
      classInput="!min-w-[180px] md:!min-w-0 md:!w-[160px] md:!flex-grow-0"
      hideMoveButtons
      :modelValue="filterModelValue"
      @onValueUpdated="handleValueUpdated"
      @onSearchFocus="handleSearchFocus"
      :applyFilters="applyFilters"
      :mobileAccordion="{
        iconUrl: '/src/assets/svg/search-blue.svg',
        title: 'Search',
      }"
      forceSearchLikeKeyword
      :colorFamilyAdditionalValues="colorFamilyAdditionalValues"
      :disabledSupportColor="disabledSupportColor"
      keepUserInputs
    />
    <!-- BUTTONS: SINGLE & MULTIPLE -->
    <div class="flex gap-2 items-center md:py-6">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit h-fit px-4 md:px-2"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'single',
        }"
        @click="colorUpdateStore.selectionMode = 'single'"
      >
        Single
        <img src="@/assets/svg/pic.svg" alt="pic" width="16" height="16" />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white w-full md:w-fit h-fit px-4 md:px-2"
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
    <!-- BUTTONS: GALLERY VIEW -->
    <div class="flex gap-2 items-center md:py-6">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'single',
        }"
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
