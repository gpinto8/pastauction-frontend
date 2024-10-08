<script lang="tsx" setup>
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import { computed, ref } from 'vue';

defineProps<{
  isUserAdmin: boolean;
}>();

const selectedBodies = ref<string[]>();
const selectedColors = ref<string[]>();
const selectedAttributes = ref<string[]>();

const updateVehicleStore = updateVehicle();

const bodyData = computed(() => {
  const data = updateVehicleStore.parametersResponseData?.items;
  if (!data) return;

  return data[0].body_categories.split(',').filter(Boolean);
});

const attributeData = computed(() => {
  const data = updateVehicleStore.parametersResponseData?.items;
  if (!data) return;

  return data[0].body_types.split(',').filter(Boolean);
});

const handleBodySelection = (body: string) => {
  // If its already selected, remove it
  if (selectedBodies.value?.includes(body)) {
    const filteredBody = selectedBodies.value?.filter(value => value !== body);
    selectedBodies.value = filteredBody;
    return;
  }

  const newBodyChange = [...(selectedBodies.value || []), body];
  selectedBodies.value = newBodyChange;
};

const handleColorSelection = (color: string) => {
  // If its already selected, remove it
  if (selectedColors.value?.includes(color)) {
    const filteredBody = selectedColors.value?.filter(i => i !== color);
    selectedColors.value = filteredBody;
    return;
  }

  const newBodyChange = [...(selectedColors.value || []), color];
  selectedColors.value = newBodyChange;
};

const handleAttributeSelection = (attribute: string) => {
  // If its already selected, remove it
  if (selectedAttributes.value?.includes(attribute)) {
    const filteredBody = selectedAttributes.value?.filter(
      value => value !== attribute
    );
    selectedAttributes.value = filteredBody;
    return;
  }

  const newBodyChange = [...(selectedAttributes.value || []), attribute];
  selectedAttributes.value = newBodyChange;
};
</script>

<template>
  <div class="flex flex-col w-full gap-6" :class="class">
    <div>
      <div class="mb-3 font-semibold text-lg">Body change</div>
      <div class="flex gap-2 flex-wrap">
        <button
          class="p-2 text-sm w-fit rounded-md border-2 border-solid border-[#212529] text-[#212529] bg-white"
          v-for="(data, i) in bodyData"
          :key="i"
          :class="{
            '!bg-[#212529] text-white': selectedBodies?.includes(data),
          }"
          @click="() => handleBodySelection(data)"
        >
          {{ data }}
        </button>
      </div>
    </div>
    <div>
      <div class="mb-3 font-semibold text-lg">Colours changes</div>
      <div class="flex gap-4 items-center flex-col sm:flex-row">
        <div class="font-semibold text-base w-full sm:w-fit">Main:</div>
        <div class="flex gap-1 flex-wrap w-full">
          <div
            v-for="color in [
              'red',
              'yellow',
              'green',
              'white',
              'black',
              'blue',
            ]"
            class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
            :class="{
              '!border !border-solid !border-[#212529]': selectedColors?.some(
                innerColor => innerColor === color
              ),
            }"
            @click="() => handleColorSelection(color)"
          >
            <div class="h-full" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-3 font-semibold text-lg">Attribute changes</div>
      <div class="grid grid-cols-2 sm:flex gap-2 sm:flex-wrap">
        <button
          class="w-full p-2 text-sm sm:w-fit rounded-md border-2 border-solid border-[#212529] text-[#212529] bg-white"
          :key="i"
          :class="{
            '!bg-[#212529] text-white': selectedAttributes?.includes(data),
          }"
          v-for="(data, i) in attributeData"
          @click="() => handleAttributeSelection(data)"
        >
          {{ data }}
        </button>
      </div>
    </div>
    <v-btn
      v-if="!isUserAdmin"
      class="block w-full md:w-[160px] text-white bg-[#212529] rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
    >
      Submit review
    </v-btn>
  </div>
</template>
