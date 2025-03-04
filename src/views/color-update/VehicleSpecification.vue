<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { colorUpdate } from '@/store/color-update';
import axios from 'axios';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  vehicleData: any;
}>();

const colorUpdateStore = colorUpdate();

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);

const vehicleSpecifications = computed<
  { key: string; label: string; value: string; colored?: boolean }[]
>(() => {
  const {
    bw_family_name,
    bw_model_name,
    vehicle_stage,
    vehicle_series,
    bw_model_year_begin,
    chassis,
    body_shapes,
    color_main_name,
    color_sec_name,
    color_roof_name,
  } = props.vehicleData || {};

  return [
    { key: 'bw_family_name', label: 'Family', value: bw_family_name },
    { key: 'bw_model_name', label: 'Model', value: bw_model_name },
    { key: 'vehicle_stage', label: 'Stage', value: vehicle_stage },
    { key: 'vehicle_series', label: 'Series', value: vehicle_series },
    { key: 'bw_model_year_begin', label: 'Year', value: bw_model_year_begin },
    { key: 'chassis', label: 'Chassis', value: chassis },
    { key: 'body_shapes', label: 'Body', value: body_shapes },
    { key: 'colorfamily_name', label: 'Main', value: color_main_name },
    { key: 'color_main_name', label: 'Secondary', value: color_sec_name },
    { key: 'color_roof_name', label: 'Top/Roof', value: color_roof_name },
  ].map((data: any) => ({ ...data, label: data.label + ':' }));
});

// THIS UPDATES THE DYNAMIC COLORS FROM "Select color from gallery"
watch(
  () => colorUpdateStore.selectedColorFromGallery,
  () => {
    const { name } = colorUpdateStore.selectedColorFromGallery || {};

    for (const pickColor of colorUpdateStore.selectedPickColors) {
      const { selected, key } = pickColor || {};

      if (selected) {
        const dynamicColor = colorUpdateStore.dynamicColors.find(
          color => color.key === key
        );
        if (dynamicColor) dynamicColor.value = name;
      }
    }
  }
);

// THIS UPDATES THE DYNAMIC COLORS FROM THE "Pick color from image"
watch(
  () => colorUpdateStore.selectedPickColors,
  async () => {
    for await (const pickColor of colorUpdateStore.selectedPickColors) {
      const { selected, value, key, clicked } = pickColor || {};

      if (selected && value && clicked) {
        const pickedHexColor = encodeURIComponent(value); // #FF0000 || value
        if (pickedHexColor) {
          const response = await axios
            .get(
              `https://pastauction.com/api/v1/bidwatcher_color/convert/${pickedHexColor}`
            )
            .catch(e => e);

          const color = response?.data;

          if (color && key) {
            const dynamicColor = colorUpdateStore.dynamicColors.find(
              color => color.key === key
            );
            if (dynamicColor) dynamicColor.value = color;
          }
        }
      }
    }
  },
  { deep: true }
);

const getDynamicColorValue = (key: string) =>
  colorUpdateStore.dynamicColors.find(color => color.key === key)?.value;
</script>

<template>
  <div>
    <div
      class="hidden md:flex flex-col gap-6 p-4 md:min-w-[280px] md:w-fit bg-[#DEE2E6] rounded-lg w-full h-full"
    >
      <div class="font-bold text-xl w-full">Vehicle Specification</div>
      <div class="flex flex-col gap-2">
        <div
          v-for="(specification, i) in vehicleSpecifications"
          :key="i"
          class="flex border-b border-solid border-[#6C757D] text-base"
        >
          <div class="w-2/5 text-[#212529]">{{ specification.label }}</div>
          <div class="w-3/5 text-[#6C757D]">
            {{ specification.value }}
            <span
              v-if="getDynamicColorValue(specification.key)"
              class="!text-blue-700"
            >
              ({{ getDynamicColorValue(specification.key) }})
            </span>
          </div>
        </div>
      </div>
    </div>
    <ExpansionSection
      class="block md:hidden font-bold text-lg !p-0 !m-0"
      titleClass="bg-[#DEE2E6]"
      panelClass="bg-[#DEE2E6] text-black !p-0 !m-0"
      :forceOpen="mobileOpen"
      hideActions
    >
      <template #title>
        <div class="flex gap-2 w-full items-center">
          <div class="text-lg w-full">Vehicle Specification</div>
          <div
            class="flex w-fit flex-col cursor-pointer pointer-events-auto z-10"
          >
            <img
              v-if="mobileOpen === 0"
              src="@/assets/svg/minus-circle-black.svg"
              alt="plus-circle"
              width="24"
              height="24"
              @click="handleOpen"
              class="self-end"
            />
            <img
              v-if="mobileOpen === 1"
              src="@/assets/svg/plus-circle-black.svg"
              alt="plus-circle"
              width="24"
              height="24"
              @click="handleOpen"
              class="self-end"
            />
          </div>
        </div>
      </template>
      <template #default>
        <div
          class="flex flex-col gap-4 md:w-[338px] bg-[#DEE2E6] rounded-lg w-full mt-4"
        >
          <div class="flex flex-col gap-2">
            <div
              v-for="(specification, i) in vehicleSpecifications"
              :key="i"
              class="flex border-b border-solid border-[#6C757D] text-base"
            >
              <div class="w-3/6 text-[#212529]">{{ specification.label }}</div>
              <div class="w-3/6 text-[#6C757D]">
                {{ specification.value }}
                <span
                  v-if="getDynamicColorValue(specification.key)"
                  class="!text-blue-700"
                >
                  ({{ getDynamicColorValue(specification.key) }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExpansionSection>
  </div>
</template>

<styled lang="scss" scoped>
// .scrollable {
//   overflow-x: scroll !important;
//   border: none !important;

//   ::-webkit-scrollbar {
//     height: 0px !important;
//   }
// }
</styled>
