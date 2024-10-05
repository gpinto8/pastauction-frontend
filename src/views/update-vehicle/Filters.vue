<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps<{
  familyId: number;
  brandName: string;
}>();

const filtersMap = ref<{ label: string; value: string[] }[]>();

onMounted(async () => {
  const fetchColumns = [
    { key: 'brand_name', name: 'Brand' },
    { key: 'bw_family_name', name: 'Family' },
    { key: 'bw_model_name', name: 'Model' },
    { key: 'bw_model_year_begin', name: 'Year' },
    { key: 'bw_model_year_end', name: 'Year' },
  ];

  for await (const column of fetchColumns) {
    const filterData = await axios.get(
      `https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update/${column.key}/?search=brand_name:${props.brandName}&page=1&size=100`
    );

    const filterValues = filterData.data.items.map(
      (item: any) => item[column.key]
    );
    filtersMap.value = [
      ...(filtersMap.value || []),
      { label: column.name, value: filterValues },
    ];
  }
});

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);
</script>

<template>
  <div
    class="w-full h-fit bg-[#212529] text-white flex justify-between px-6 py-5 sm:!pb-0 gap-8 rounded-md"
  >
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
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
      <v-autocomplete
        v-for="filter in filtersMap"
        class="hidden sm:block w-fit min-w-[100px]"
        :label="filter.label"
        variant="outlined"
        :items="filter.value"
        density="compact"
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
          <div class="w-full flex flex-col">
            <v-autocomplete
              v-for="filter in filtersMap"
              class="w-full"
              :label="filter.label"
              variant="outlined"
              :items="filter.value"
              density="compact"
            />
          </div>
        </template>
      </ExpansionSection>
    </div>
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
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
