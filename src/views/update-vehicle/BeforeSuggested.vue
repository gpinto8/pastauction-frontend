<script setup lang="ts">
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  class: string;
  vehicleData: any;
}>();

const mobileOpen = ref(1); // 0 - open | 1 - close
const handleOpen = () => (mobileOpen.value = mobileOpen.value === 0 ? 1 : 0);

const beforeData = computed(() => {
  const data = props.vehicleData;
  if (!data) return;

  return [
    { label: 'Family', value: data.bw_family_id },
    { label: 'Model', value: data.bw_model_name },
    { label: 'Stage', value: data.vehicle_stage },
    { label: 'Series', value: data.vehicle_series },
    { label: 'Year', value: data.vehicle_year },
    { label: 'Chasis', value: data.chassis },
    { label: 'Body', value: data.body_shapes },
    { label: 'Color', value: data.color_main_name },
    { label: 'Attribute', value: data.body_types },
  ];
});

const suggestedData = ref([
  { label: 'Family', value: '' },
  { label: 'Model', value: '' },
  { label: 'Stage', value: '' },
  { label: 'Series', value: '' },
  { label: 'Year', value: '', disabled: true },
  { label: 'Chasis', value: '', disabled: true },
  { label: 'Body', value: '' },
  { label: 'Color', value: '' },
  { label: 'Attribute', value: '' },
]);
</script>

<template>
  <!-- DESKTOP -->
  <div class="hidden md:flex inputs gap-4" :class="class">
    <div class="p-3 bg-[#DEE2E6] w-fit h-fit md:w-2/3">
      <div class="title p-2">Before</div>
      <div class="flex flex-col">
        <div class="flex" :key="i" v-for="(data, i) in beforeData">
          <div class="bg-white !w-2/5 badge key">{{ data.label }}</div>
          <div class="bg-white !w-3/5 badge value overflow-hidden">
            {{ data.value }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 !bg-[#DEE2E6] w-fit h-fit md:w-1/3">
      <div class="title p-2">Suggested</div>
      <div
        class="flex flex-col w-full"
        :key="i"
        v-for="(data, i) in suggestedData"
      >
        <input
          class="bg-white border p-1 border-[#CED4DA] border-solid h-[33.67px]"
          density="compact"
          :disabled="data?.disabled"
          v-model="data.value"
        />
      </div>
    </div>
  </div>
  <!-- MOBILE -->
  <ExpansionSection
    class="block md:hidden font-bold text-lg !p-0 !m-0"
    titleClass="bg-[#DEE2E6]"
    panelClass="bg-[#DEE2E6] text-black !p-0 !m-0"
    :forceOpen="mobileOpen"
    hideActions
  >
    <template #title>
      <div class="flex gap-2 w-full items-center">
        <div v-if="mobileOpen === 1" class="text-lg">Description</div>
        <div
          class="flex w-full flex-col cursor-pointer pointer-events-auto z-10"
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
      <div class="flex flex-col sm:flex-row inputs gap-8 w-full !p-0 !m-0">
        <div class="bg-[#DEE2E6] w-full">
          <div class="title p-2">Before</div>
          <div class="flex flex-col">
            <div class="flex" :key="i" v-for="(data, i) in beforeData">
              <div class="bg-white w-2/5 sm:w-2/5 badge key">
                {{ data.label }}
              </div>
              <div class="bg-white w-3/5 sm:w-3/5 badge value">
                {{ data.value }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#DEE2E6] w-full">
          <div class="title p-2">Suggested</div>
          <div
            class="flex flex-col w-full"
            :key="i"
            v-for="(data, i) in suggestedData"
          >
            <input
              class="bg-white border p-1 font-normal border-[#CED4DA] border-solid h-[33.67px]"
              density="compact"
              :disabled="data?.disabled"
              v-model="data.value"
            />
          </div>
        </div>
      </div>
    </template>
  </ExpansionSection>
</template>

<style lang="scss" scoped>
* {
  font-family: Inter;
}

.badge {
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  border: 1px solid #ced4da;
  padding: 5px 9px;
  background: white;
  width: 100%;
}

.inputs {
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
  }

  .key {
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
  }

  .value {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
}
</style>
