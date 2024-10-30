<script lang="tsx" setup>
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import axios from 'axios';
import { onMounted, ref } from 'vue';

type BodyDataProps = { label: string; mode: 'type' | 'category_vehicle' };

type ColorProps = {
  id: number;
  name: string;
  hex_code: string;
  id_family: number;
};

type AttributeDataExtraProps = {
  name: string;
  shortName: string;
};

defineProps<{
  isUserAdmin: boolean;
}>();

const updateVehicleStore = updateVehicle();

const bodyData = ref<BodyDataProps[]>();
const bodySubData = ref();
const selectedBodies = ref<string[]>();
const selectedSubBodies = ref<{ [key: string]: string[] }[]>();

const colorData = ref<ColorProps[]>();
const colorSubData = ref<ColorProps[]>();
const selectedColor = ref<ColorProps>();
const selectedSubColor = ref<ColorProps>();

const attributeData = ref<string[]>();
const attributeDataExtra = ref<AttributeDataExtraProps[]>();
const selectedAttributes = ref<string[]>();

const getShapeData = async (
  value: string,
  bodyMode?: BodyDataProps['mode']
) => {
  const searchMode = bodyMode || 'category';
  const shapeData = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_body/shape/?search=${searchMode}:${value}`
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
  const _bodyData1 = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_body/type/`
  );
  const _bodyData2 = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_brand/category_vehicle/`
  );

  const mergedBodyData: BodyDataProps[] = [
    ...(_bodyData1?.data?.items || []).map((item: any) => ({
      label: item?.type,
      mode: 'type',
    })),
    ...(_bodyData2?.data?.items || []).map((item: any) => ({
      label: item?.category_vehicle,
      mode: 'category_vehicle',
    })),
  ]
    .filter(item => item.label !== '' && item.label !== 'Attribute')
    .filter(Boolean);
  bodyData.value = mergedBodyData;

  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);

  // ATTRIBUTE DATA
  const _attributeData = await getShapeData('Attribute');
  const _attributeDataExtra: AttributeDataExtraProps[] = [
    { name: '(RHD) Hand Drive', shortName: 'RHD' },
    { name: '(CEN) Hand Drive', shortName: 'CEN' },
    { name: '(LHD) Hand Drive', shortName: 'LHD' },
  ];

  attributeData.value = _attributeData.filter(
    (item: any) => !_attributeDataExtra.some(data => data.name === item)
  );
  attributeDataExtra.value = _attributeDataExtra;
});

const handleBodySelection = async (body: BodyDataProps) => {
  // If its already selected, remove it
  if (body.label && selectedBodies.value?.includes(body.label)) {
    const filteredBody = selectedBodies.value?.filter(
      value => value !== body.label
    );
    selectedBodies.value = filteredBody;
    // Take the sub data from the latest selected body
    if (selectedBodies.value.length === 0) {
      bodySubData.value = undefined;
    } else {
      bodySubData.value[body.label] = await getShapeData(
        selectedBodies.value[selectedBodies.value.length - 1]
      );
    }
    if (selectedSubBodies.value)
      selectedSubBodies.value = selectedSubBodies.value?.filter(
        item => Object.keys(item)[0] !== body.label
      );
    return;
  }

  const bodyShapeData = await getShapeData(body.label, body.mode);
  bodySubData.value = { [body.label]: bodyShapeData };

  const newBodyChange = [...(selectedBodies.value || []), body.label];
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
    selectedSubColor.value = undefined;
    return;
  }

  const _colorSubData: ColorProps[] = await getSubColorData(color.id);
  colorSubData.value = _colorSubData;

  selectedColor.value = color;
  selectedSubColor.value = undefined;
};

const handleSubColorSelection = async (color: ColorProps) => {
  // If it already exists, remove it
  if (selectedSubColor.value === color) {
    selectedSubColor.value = undefined;
    return;
  }

  selectedSubColor.value = color;
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

const submitReview = async () => {
  const data: any = {};

  // MAIN PICTURE
  const path = updateVehicleStore.mainPicturePath;
  if (path) data.photo_path = path;

  // SUGGESTED DATA
  const suggestedData = updateVehicleStore.suggestedData;
  if (suggestedData) {
    const family = suggestedData?.find(item => item.label === 'Family');
    const model = suggestedData?.find(item => item.label === 'Model');
    const stage = suggestedData?.find(item => item.label === 'Stage');
    const series = suggestedData?.find(item => item.label === 'Series');
    // const body = suggestedData?.find(item => item.label === 'Body');
    // const color = suggestedData?.find(item => item.label === 'Color');
    // const attribute = suggestedData?.find(item => item.label === 'Attribute');

    // { label: 'Family', value: data?.bw_family_id },
    //   { label: 'Model', value: data?.bw_model_name },
    //   { label: 'Stage', value: data?.vehicle_stage },
    //   { label: 'Series', value: data?.vehicle_series },
    //   { label: 'Year', value: data?.vehicle_year },
    //   { label: 'Chasis', value: data?.chassis },
    //   { label: 'Body', value: data?.body_shapes },
    //   { label: 'Color', value: data?.color_main_name },
    //   { label: 'Attribute', value: data?.body_types },

    if (family) data.bw_family_id = family.value;
    if (model) data.bw_model_name = model.value;
    if (stage) data.vehicle_stage = stage.value;
    if (series) data.vehicle_series = series.value;
    // if (body) data.body_shapes = body.value;
    // if (color) data.color_main_name = color.value;
    // if (attribute) data.id_key = attribute.value;
  }

  // BODY CHANGES
  const bodies = selectedBodies.value?.join(',');
  if (bodies) data.body_categories = bodies;

  const subBodies = selectedSubBodies.value
    ?.map(body => Object.values(body))
    .flat(Infinity)
    .join(',');
  if (subBodies) data.body_shapes = subBodies;

  // COLOR
  const colorId = selectedColor.value?.id;
  if (colorId) data.color_main_id = colorId;

  // ATTRIBUTE CHANGES
  const attributes = selectedAttributes.value?.join(',');
  if (attributes) data.body_types = attributes;

  console.log({ data });

  const authToken = window.localStorage.getItem('past_token');
  const config = {
    method: 'post',
    url: 'https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/create',
    headers: {
      Authorization: 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    data: {
      vehicle_id: 34920,
      color_main_id: 60,
      body_types: 'asdfasdf',
      // ...data,
      // vehicle_id: 9999,
      // id_age: 9999,
      // bodies_id: 9999,
      // body_id: 9999,
      // brand_id: 9999,
      // color_main_id: 9999,
      // color_roof_id: 9999,
      // color_sec_id: 9999,
      // update_date: '2009-09-29',
      // family_id: 9999,
      // id_model: 9999,
      // note: 'BLABLABLA',
    },
    // data,
    // data: {
    //   vehicle_id: 34920,
    //   // id_key: 900,
    //   // id_age: 373,
    //   // bodies_id: 2000000,
    //   // body_id: 3,
    //   // brand_id: 0,
    //   // color_main_id: 0,
    //   // color_roof_id: 0,
    //   // color_sec_id: 0,
    //   // update_date: '2024-10-27',
    //   // family_id: 0,
    //   // id_model: 36247,
    //   // note: 'string',
    // },
  };

  console.log({ config: data });

  // await axios(config)
  //   .then(response => {
  //     console.log({ data: response.data });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  // const data = await axios.post(
  //   `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/create/`,
  //   {
  //     // vehicle_id: 636672,
  //     // id_age: 373,
  //     // bodies_id: 2000000,
  //     // body_id: 3,
  //     // brand_id: 0,
  //     // color_main_id: 0,
  //     // color_roof_id: 0,
  //     // color_sec_id: 0,
  //     // update_date: '2024-10-27',
  //     // family_id: 0,
  //     // id_model: 36247,
  //     // note: 'string',
  //     // user_id: 0,
  //     // id_key: 0,
  //   },
  //   {
  //     // data: {
  //     //   id_key: 900,
  //     // },
  //   }
  //   // null,
  //   // {q
  //   // bidwatcher_vehicle/?params=bidwatcher_vehicle:${123},db:${'asdf'},token:${'asdf'},user_uuid:${'db0ac65b-2460-4c95-886f-32a864414d42'}`,
  //   // headers: {
  //   //   authorization: 'Bearer ' + authToken.value,
  //   //   'Content-Type': 'application/json',
  //   // },
  //   //   body: {
  //   //   }
  //   // data: {
  //   //   bw_model_id: 0,
  //   //   bw_family_id: 0,
  //   //   bw_model_name: 'string',
  //   //   bw_model_series: 'string',
  //   //   bw_model_year_begin: 0,
  //   //   bw_model_year_end: 0,
  //   //   vehicle_id: 0,
  //   //   vehicle_series: 'string',
  //   //   vehicle_stage: 'string',
  //   //   vehicle_version: 'string',
  //   //   vehicle_original_descr: 'string',
  //   //   vehicle_year: 'string',
  //   //   brand_logo: 'string',
  //   //   brand_name: 'string',
  //   //   bw_family_name: 'string',
  //   //   photo_id: 0,
  //   //   photo_path: 'string',
  //   // },
  //   // }
  // );
  // console.log({ data });
  // {
  //   body: selectedBodies.value,
  //   sub_body: selectedSubBodies.value,
  //   color: selectedColor.value,
  //   sub_color: selectedSubColor.value,
  //   attribute: selectedAttributes.value,
  // }
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
          class="p-2 text-sm w-fit rounded-md border-[1px] border-solid border-[#212529] text-[#212529] bg-white"
          v-for="(data, i) in bodyData"
          :key="i"
          :class="{
            '!bg-[#212529] text-white': selectedBodies?.includes(data.label),
          }"
          @click="() => handleBodySelection(data)"
        >
          {{ data.label }}
        </button>
      </div>
      <!-- SUB BODY DATA -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-if="bodySubData"
          class="p-2 text-sm w-fit rounded-md border-[1px] border-solid border-[#212529] text-[#212529] bg-white"
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
              class="h-8 w-8 border-[2px] border-solid border-grey-100 cursor-pointer"
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
                <v-tooltip
                  activator="parent"
                  location="top"
                  :text="color.name"
                />
              </div>
            </div>
            <div class="flex justify-center items-center">
              {{ selectedSubColor?.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ATTRIBUTE -->
    <div>
      <div class="mb-3 font-semibold text-lg">Attribute changes</div>
      <div class="flex gap-2 flex-wrap">
        <div class="flex flex-wrap gap-2">
          <button
            class="w-fit p-2 text-sm rounded-md border-[1px] border-solid border-[#212529] text-[#212529] bg-white"
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
        <div class="flex gap-2 flex-wrap">
          <img
            src="@/assets/svg/brochure-folded.svg"
            alt="brochure-folded"
            width="20"
            height="20"
          />
          <button
            class="w-fit p-2 text-sm rounded-md border-[1px] border-solid border-[#212529] text-[#212529] bg-white"
            :key="i"
            :class="{
              '!bg-[#212529] text-white': selectedAttributes?.includes(
                data.name
              ),
            }"
            v-for="(data, i) in attributeDataExtra"
            @click="() => handleAttributeSelection(data.name)"
          >
            {{ data.shortName }}
            <v-tooltip activator="parent" location="top" :text="data.name" />
          </button>
        </div>
      </div>
    </div>
    <v-btn
      v-if="!isUserAdmin"
      class="block w-full md:w-[160px] text-white bg-[#212529] rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
      @click="submitReview"
    >
      Submit review
    </v-btn>
  </div>
</template>
