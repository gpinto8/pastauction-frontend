<script lang="ts" setup>
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  vehicleData: any;
}>();

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);

const vehicleSpecifications = computed(() =>
  [
    { key: 'Family', value: props.vehicleData?.bw_family_id },
    { key: 'Model', value: props.vehicleData?.bw_model_id },
    { key: 'Stage', value: props.vehicleData?.vehicle_stage },
    { key: 'Series', value: props.vehicleData?.vehicle_series },
    { key: 'Year', value: props.vehicleData?.bw_model_year_begin },
    { key: 'Chassis', value: props.vehicleData?.chassis },
    { key: 'Body', value: props.vehicleData?.body_shapes },
    { key: 'Main', value: props.vehicleData?.color_main_name },
    { key: 'Secondary', value: props.vehicleData?.color_sec_name },
    { key: 'Top/Roof', value: props.vehicleData?.color_roof_name },
  ].map((data: any) => ({ ...data, key: data.key + ':' }))
);
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
          <div class="w-2/5 text-[#212529]">{{ specification.key }}</div>
          <div class="w-3/5 text-[#6C757D]">
            {{ specification.value }}
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
              <div class="w-3/6 text-[#212529]">{{ specification.key }}</div>
              <div class="w-3/6 text-[#6C757D]">
                {{ specification.value }}
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
