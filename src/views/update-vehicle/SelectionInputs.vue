<script lang="tsx" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

type ColorProps = {
  id: number;
  name: string;
  hex_code: string;
  id_family: number;
};

defineProps<{
  isUserAdmin: boolean;
}>();

const bodyData = ref();
const bodySubData = ref();
const selectedBodies = ref<string[]>();
const selectedSubBodies = ref<{ [key: string]: string[] }[]>();

const colorData = ref<ColorProps[]>();
const colorSubData = ref<ColorProps[]>();
const selectedColor = ref<ColorProps>();
const selectedSubColors = ref<ColorProps[]>();

const attributeData = ref();
const selectedAttributes = ref<string[]>();

const getShapeData = async (category: string) => {
  const shapeData = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_body/shape/?search=category:${category}`
  );
  return shapeData.data.items?.map((item: any) => item.shape);
};

const getSubColorData = async (id: number) => {
  const subColorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_color/?search=id_family:${id}`
  );
  return subColorData.data.items?.map((item: any) => item);
};

onMounted(async () => {
  // BODY DATA
  const _bodyData = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_body/category/`
  );
  bodyData.value = _bodyData.data.items
    ?.map((item: any) => item.category)
    .filter((item: any) => item !== 'Attribbute' && item !== 'Attribute');

  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);

  // ATTRIBUTE DATA
  const _attributeData = await getShapeData('Attribute');
  attributeData.value = _attributeData;
});

const handleBodySelection = async (body: string) => {
  // If its already selected, remove it
  if (body && selectedBodies.value?.includes(body)) {
    const filteredBody = selectedBodies.value?.filter(value => value !== body);
    selectedBodies.value = filteredBody;
    // Take the sub data from the latest selected body
    if (selectedBodies.value.length === 0) {
      bodySubData.value = undefined;
    } else {
      bodySubData.value[body] = await getShapeData(
        selectedBodies.value[selectedBodies.value.length - 1]
      );
    }
    if (selectedSubBodies.value)
      selectedSubBodies.value = selectedSubBodies.value?.filter(
        item => Object.keys(item)[0] !== body
      );
    return;
  }

  const bodyShapeData = await getShapeData(body);
  bodySubData.value = { [body]: bodyShapeData };

  const newBodyChange = [...(selectedBodies.value || []), body];
  selectedBodies.value = newBodyChange;
};

const handleSubBodySelection = async (key: string, value: string) => {
  // If it already exists, remove it
  if (
    selectedSubBodies.value?.length &&
    selectedSubBodies.value?.some(item =>
      Object.values(item)?.[0]?.some(item => item === value)
    )
  ) {
    const filteredSubBody = selectedSubBodies.value
      .map(item => {
        return {
          [Object.keys(item)[0]]: Object.values(item)[0].filter(
            _value => _value !== value
          ),
        };
      })
      .filter(item => Object.values(item)?.[0]?.length);

    selectedSubBodies.value = filteredSubBody as any;
    return;
  }

  const mergedSelectedSubBodies = [
    ...(selectedSubBodies.value ? selectedSubBodies.value : []),
    { [key]: value },
  ];

  const grouped = mergedSelectedSubBodies.reduce((acc: any, obj: any) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    if (!acc[key]) acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});

  const newGrouped = Object.entries(grouped).map(([key, value]) => {
    const newValue: any = Array.isArray(value) ? value.flat(Infinity) : value;
    if (newValue.length === 0) return;
    return { [key]: newValue };
  });

  selectedSubBodies.value = newGrouped as any;
};

const handleColorSelection = async (color: ColorProps) => {
  // If it already exists, remove it
  if (selectedColor.value?.name === color.name) {
    selectedColor.value = undefined;
    colorSubData.value = undefined;
    selectedSubColors.value = [];
    return;
  }

  const _colorSubData: ColorProps[] = await getSubColorData(color.id);
  colorSubData.value = _colorSubData;

  selectedColor.value = color;
  selectedSubColors.value = [];
};

const handleSubColorSelection = async (color: ColorProps) => {
  // If it already exists, remove it
  if (
    selectedSubColors.value &&
    selectedSubColors.value?.find(_color => _color.name === color.name)
  ) {
    const filteredSelectedSubColors = selectedSubColors.value.filter(
      item => item.name !== color.name
    );
    selectedSubColors.value = filteredSelectedSubColors;
    return;
  }

  const mergedSelectedSubColors = [
    ...(selectedSubColors.value ? selectedSubColors.value : []),
    color,
  ];

  selectedSubColors.value = mergedSelectedSubColors;
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
    <!-- BODY -->
    <div class="flex flex-col">
      <div class="mb-3 font-semibold text-lg">Body change</div>
      <!-- BODY DATA -->
      <div class="mb-4 flex gap-2 flex-wrap">
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
      <!-- SUB BODY DATA -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-if="bodySubData"
          class="p-2 text-sm w-fit rounded-md border-2 border-solid border-[#212529] text-[#212529] bg-white"
          v-for="(data, i) in Object.values(bodySubData)?.[0]"
          :key="data"
          :class="{
            '!bg-[#212529] text-white':
              selectedSubBodies &&
              selectedSubBodies.some(subBody =>
                Object.values(subBody)?.[0].includes(data)
              ),
          }"
          @click="
            () => handleSubBodySelection(Object.keys(bodySubData)?.[0], data)
          "
        >
          {{ data }}
        </button>
      </div>
    </div>
    <!-- COLOR -->
    <div class="flex flex-col">
      <div class="mb-3 font-semibold text-lg">Colours changes</div>
      <div class="flex flex-col gap-2">
        <!-- COLOR DATA -->
        <div class="flex gap-4 items-center flex-col sm:flex-row">
          <div class="font-semibold text-base w-full sm:w-fit">Main:</div>
          <div class="flex gap-1 flex-wrap w-full">
            <div
              v-for="color in colorData"
              class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
              :class="{
                '!border !border-solid !border-[#212529]':
                  selectedColor && selectedColor.name === color.name,
              }"
              @click="() => handleColorSelection(color)"
            >
              <div class="h-full" :style="{ backgroundColor: color.hex_code }">
                <v-tooltip
                  activator="parent"
                  location="top"
                  :text="color.name"
                />
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
          <div class="flex gap-1 flex-wrap w-full">
            <div
              v-for="color in colorSubData"
              class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
              :class="{
                '!border !border-solid !border-[#212529]':
                  selectedSubColors?.some(_color => _color.name === color.name),
              }"
              @click="() => handleSubColorSelection(color)"
            >
              <div class="h-full" :style="{ backgroundColor: color.hex_code }">
                <v-tooltip
                  activator="parent"
                  location="top"
                  :text="color.name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ATTRIBUTE -->
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
