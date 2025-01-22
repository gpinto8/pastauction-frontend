<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';
import UiCheckbox from '@/components/ui/ui-checkbox.vue';
import { ref, watch } from 'vue';

defineProps<{ hidePickColor?: boolean }>();

const colorUpdateStore = colorUpdate();

const colorShown = ref(colorUpdateStore.selectedHexColor);

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
      if (color.selected) {
        color.value = selectedHexColor;
        color.clicked = true;

        colorShown.value = selectedHexColor; // For the "Pick color from image"
      }
    });
  }
);

watch(
  () => colorUpdateStore.selectedColorFromGallery,
  () => {
    const hexColor = colorUpdateStore.selectedColorFromGallery?.hex_code;
    colorShown.value = hexColor; // For the "Select color from gallery"
  }
);

const handlePickColor = () => {
  colorUpdateStore.selectingHexColor = !colorUpdateStore.selectingHexColor;
};

const handleSelected = () => {
  // Created to fix a problem in which, when selecting and deselecting the checkbox, the color changed .. (because the "selected" prop is inside an object and whenever we update that value, the whole object updates ..)
  colorUpdateStore.selectedPickColors.forEach(color => (color.clicked = false));
};

const getDynamicValue = (key: string) => {
  if (colorUpdateStore.selectionMode === 'multiple') {
    return colorUpdateStore.dynamicColors.find(item => item.key === key)?.value;
  }
};
</script>

<template>
  <div class="bg-[#DEE2E6] h-max-1/2 p-4 flex flex-col gap-4 rounded-lg">
    <div class="font-bold text-xl">Pick color from image</div>
    <div
      v-if="!hidePickColor"
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
              backgroundColor: colorShown || '#000',
            }"
          >
            <v-tooltip
              v-if="colorShown"
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
          {{ colorShown || '#000' }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="(color, i) in colorUpdateStore.selectedPickColors">
        <div class="flex gap-2">
          <UiCheckbox
            class="z-10 pointer-events-auto"
            v-model="color.selected"
            @onSelected="handleSelected"
          />
          <div
            :key="i"
            class="w-full flex gap-3 border-b border-solid border-[#6C757D]"
          >
            <div class="w-fit text-[#212529]">{{ color.label }}</div>
            <div
              v-if="getDynamicValue(color.key) || color.value"
              class="w-auto text-[#6C757D] flex items-center gap-2"
            >
              <div
                class="h-3 w-3 rounded-lg border-2 border-black"
                :style="{
                  backgroundColor: getDynamicValue(color.key) || color.value,
                }"
              />
              {{ getDynamicValue(color.key) || color.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
