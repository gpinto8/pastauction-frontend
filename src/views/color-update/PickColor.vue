<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';
import { ref, watch } from 'vue';

const props = defineProps<{
  vehicleData: any;
}>();

const colorUpdateStore = colorUpdate();

const pickColors = ref(
  [
    { key: 'Main color', value: props.vehicleData?.color_main_name },
    { key: 'Bicolor', value: props.vehicleData?.color_sec_name },
    { key: 'Top color', value: props.vehicleData?.color_roof_name },
  ].map((data: any) => ({ ...data, key: data.key + ':' }))
);

watch(
  () => colorUpdateStore.selectingHexColor,
  () => {
    const cursor = colorUpdateStore.selectingHexColor ? 'crosshair' : '';
    document.body.style.cursor = cursor;
  }
);

const handlePickColor = () => {
  colorUpdateStore.selectingHexColor = !colorUpdateStore.selectingHexColor;
};
</script>

<template>
  <div class="bg-[#DEE2E6] h-max-1/2 p-4 flex flex-col gap-4 rounded-lg">
    <div class="font-bold text-xl">Pick color from image</div>
    <div
      class="flex justify-center w-full bg-[#E9ECEF] rounded border border-[#CED4DA]"
      :class="{
        '!border-[#0000ff] !border-[2px]': colorUpdateStore.selectingHexColor,
      }"
    >
      <div class="flex gap-2 p-1">
        <div
          class="h-6 w-6 border-[2px] border-solid border-grey-100 cursor-pointer"
          :class="{
            '!border !border-solid !border-[#212529]': true,
          }"
          @click="handlePickColor"
        >
          <div
            class="h-full"
            :style="{
              backgroundColor: colorUpdateStore.selectedHexColor || '#000',
            }"
          >
            <v-tooltip
              v-if="colorUpdateStore.selectedHexColor"
              activator="parent"
              location="top"
              :text="
                colorUpdateStore.selectingHexColor
                  ? 'Deactivate color picker'
                  : 'Activate color picker'
              "
            />
          </div>
        </div>
        <span class="text-[#212529] text-sm flex justify-center items-center">
          {{ colorUpdateStore.selectedHexColor || '#000' }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="(color, i) in pickColors"
        :key="i"
        class="flex border-b border-solid border-[#6C757D]"
      >
        <div class="w-2/5 text-[#212529]">{{ color.key }}</div>
        <div class="w-3/5 text-[#6C757D]">{{ color.value }}</div>
      </div>
    </div>
  </div>
</template>
