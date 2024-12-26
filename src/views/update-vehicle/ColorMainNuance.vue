<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { updateVehicle } from '@/store/vehicle/update-vehicle';

defineProps<{ title: string; classTitle?: string }>();

const emit = defineEmits<{
  (e: 'onSelectedSubColor', value: ColorProps | undefined): void;
}>();

export type ColorProps = {
  id: number;
  name: string;
  hex_code: string;
  id_family: number;
};

const updateVehicleStore = updateVehicle();

const colorData = ref<ColorProps[]>();
const colorSubData = ref<ColorProps[]>();
const selectedColor = ref<ColorProps>();
const selectedSubColor = ref<ColorProps>();

onMounted(async () => {
  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);
});

watch(
  () => updateVehicleStore.selectedColor,
  () => {
    const color = updateVehicleStore.selectedColor;
    handleColorSelection({ ...color, id: color.id_family }, true);
  }
);

watch(
  () => updateVehicleStore.selectedSubColor,
  () => {
    const color = updateVehicleStore.selectedSubColor;
    selectedSubColor.value = color;
  }
);

watch(
  () => selectedSubColor.value,
  () => {
    if (selectedSubColor.value)
      emit('onSelectedSubColor', selectedSubColor.value);
  }
);

const getSubColorData = async (id: number) => {
  const subColorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_color/?search=id_family:${id}`
  );
  return subColorData.data.items?.map((item: any) => item);
};

const handleColorSelection = async (
  color: ColorProps,
  avoidResettingSubColor?: boolean
) => {
  emit('onSelectedSubColor', undefined);

  // If it already exists, remove it
  if (selectedColor.value?.name === color.name) {
    selectedColor.value = undefined;
    colorSubData.value = undefined;
    selectedSubColor.value = undefined;
    return;
  }

  const _colorSubData: ColorProps[] = await getSubColorData(color.id);
  colorSubData.value = _colorSubData;

  selectedColor.value = color;
  if (!avoidResettingSubColor) selectedSubColor.value = undefined;
};

const handleSubColorSelection = async (color: ColorProps) => {
  // If it already exists, remove it
  if (selectedSubColor.value === color) {
    selectedSubColor.value = undefined;
    return;
  }

  selectedSubColor.value = color;
};
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-3 font-semibold text-lg" :class="[classTitle]">
      {{ title }}
    </div>
    <div class="flex flex-col gap-2">
      <!-- COLOR DATA -->
      <div class="flex gap-4 items-center flex-col sm:flex-row">
        <div class="font-semibold text-base w-full sm:w-fit">Main:</div>
        <div class="flex gap-1 flex-wrap w-full">
          <div
            v-for="color in colorData"
            class="h-8 w-8 border-[2px] border-solid border-grey-100 cursor-pointer"
            :class="{
              '!border !border-solid !border-[#212529]':
                selectedColor && selectedColor.name === color.name,
            }"
            @click="() => handleColorSelection(color)"
          >
            <div class="h-full" :style="{ backgroundColor: color.hex_code }">
              <v-tooltip activator="parent" location="top" :text="color.name" />
            </div>
          </div>
        </div>
      </div>
      <!-- SUB COLOR DATA -->
      <div
        v-if="colorSubData?.length && selectedColor"
        class="flex gap-4 items-center flex-col sm:flex-row"
      >
        <div class="font-semibold text-base w-full sm:w-fit">Nuance:</div>
        <div class="flex gap-1 flex-wrap w-full md:w-fit">
          <div
            v-for="color in colorSubData"
            class="h-8 w-8 border-[2px] border-solid border-grey-100 cursor-pointer"
            :class="{
              '!border !border-solid !border-[#212529]':
                selectedSubColor?.name === color.name,
            }"
            @click="() => handleSubColorSelection(color)"
          >
            <div class="h-full" :style="{ backgroundColor: color.hex_code }">
              <v-tooltip activator="parent" location="top" :text="color.name" />
            </div>
          </div>
          <div class="flex justify-center items-center">
            {{ selectedSubColor?.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
