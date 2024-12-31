<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';
import UiCheckbox from '@/components/ui/ui-checkbox.vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  vehicleData: any;
}>();

const colorUpdateStore = colorUpdate();

watch(
  () => props.vehicleData,
  () => {
    colorUpdateStore.selectedPickColors.forEach(color => {
      const { color_main_name, color_sec_name, color_roof_name } =
        props.vehicleData || {};

      if (color.key === 'color_main_name') color.value = color_main_name;
      if (color.key === 'color_sec_name') color.value = color_sec_name;
      if (color.key === 'color_roof_name') color.value = color_roof_name;
    });
  }
);

watch(
  () => colorUpdateStore.selectingHexColor,
  () => {
    const cursor = colorUpdateStore.selectingHexColor ? 'crosshair' : '';
    document.body.style.cursor = cursor;
  }
);

watch(
  () => colorUpdateStore.selectedHexColor,
  () => {
    const selectedHexColor = colorUpdateStore.selectedHexColor;

    colorUpdateStore.selectedPickColors.forEach(color => {
      if (color.selected) color.value = selectedHexColor;
    });
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
      <div v-for="(color, i) in colorUpdateStore.selectedPickColors">
        <div class="flex gap-2">
          <UiCheckbox
            @onSelected="handleSelected"
            class="z-10 pointer-events-auto"
            v-model="color.selected"
          />
          <div
            :key="i"
            class="w-full flex gap-3 border-b border-solid border-[#6C757D]"
          >
            <div class="w-fit text-[#212529]">{{ color.label }}</div>
            <div
              v-if="color.value"
              class="w-auto text-[#6C757D] flex items-center gap-2"
            >
              <div
                class="h-3 w-3 rounded-lg border-2 border-black"
                :style="{ backgroundColor: color.value }"
              />
              {{ color.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
