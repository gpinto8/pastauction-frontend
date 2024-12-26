<script lang="tsx" setup>
import { updateVehicle } from '@/store/vehicle/update-vehicle';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import ColorMainNuance, { type ColorProps } from './ColorMainNuance.vue';

type BodyDataProps = { label: string; mode: 'type' | 'category_vehicle' };

type AttributeDataExtraProps = {
  name: string;
  shortName: string;
};

defineProps<{
  isUserAdmin: boolean;
}>();

const updateVehicleStore = updateVehicle();

const bodyData = ref<BodyDataProps[]>();
const bodySubData = ref<string[]>();
const selectedBody = ref<string>();
const selectedSubBodies = ref<string[]>();

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

const updateBodyData = async (bodyType: string) => {
  const _bodyData = await axios.get(
    `https://pastauction.com/api/v1/filter/bidwatcher_brand/category_vehicle/?search=type:${bodyType}`
  );

  const mergedBodyData: BodyDataProps[] = [
    ...(_bodyData?.data?.items || []).map((item: any) => ({
      label: item?.category_vehicle,
      mode: 'category_vehicle',
    })),
  ]
    .filter(item => item.label !== '' && item.label !== 'Attribute')
    .filter(Boolean);

  bodyData.value = mergedBodyData;
};

// BODY DATA
watch(
  () => updateVehicleStore.selectedVehicleData,
  () => {
    const bodyType = updateVehicleStore.selectedVehicleData?.body_types;
    updateBodyData(bodyType);
  }
);

// BODY DATA
watch(
  () => updateVehicleStore.currentVehicleData,
  () => {
    const bodyType = updateVehicleStore.currentVehicleData?.body_types;
    updateBodyData(bodyType);
  }
);

onMounted(async () => {
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
  selectedSubBodies.value = undefined;
  updateVehicleStore.selectedSubBodies = [];

  // If its already selected, remove it
  if (selectedBody.value === body.label) {
    selectedBody.value = '';
    bodySubData.value = undefined;
    return;
  }

  const shapeData = await getShapeData(body.label, 'type');
  bodySubData.value = shapeData;
  selectedBody.value = body.label;
};

const handleSubBodySelection = async (value: string) => {
  // If it already exists, remove it
  if (selectedSubBodies.value?.includes(value)) {
    const filteredBody = selectedSubBodies.value?.filter(
      _value => _value !== value
    );
    selectedSubBodies.value = filteredBody;
    updateVehicleStore.selectedSubBodies = filteredBody;
    return;
  }

  const mergedData = [...(selectedSubBodies.value || []), value];
  selectedSubBodies.value = mergedData;
  updateVehicleStore.selectedSubBodies = mergedData;
};

const handleAttributeSelection = (attribute: string) => {
  // If its already selected, remove it
  if (selectedAttributes.value?.includes(attribute)) {
    const filteredBody = selectedAttributes.value?.filter(
      value => value !== attribute
    );
    selectedAttributes.value = filteredBody;
    updateVehicleStore.selectedAttribute = filteredBody;
    return;
  }

  const newBodyChange = [...(selectedAttributes.value || []), attribute];
  selectedAttributes.value = newBodyChange;
  updateVehicleStore.selectedAttribute = newBodyChange;
};

const handleColorChange = (color?: ColorProps) => {
  if (color) updateVehicleStore.selectedSubColor = color;
};

const submitReview = async () => {
  const vehicleId = updateVehicleStore.currentVehicleData?.vehicle_id;
  const subBodies = updateVehicleStore.selectedSubBodies;
  const colorMainId = updateVehicleStore.selectedSubColor?.id;
  const modelId = updateVehicleStore.selectedVehicleData?.bw_model_id;
  const notesInput = updateVehicleStore.notesInput; // This one is optional

  if (!vehicleId || !subBodies || !colorMainId || !modelId) return;

  const data = {
    vehicle_id: vehicleId,
    body_id: subBodies,
    color_main_id: colorMainId,
    id_model: modelId,
    note: notesInput,
  };

  const authToken = window.localStorage.getItem('past_token');
  const config = {
    method: 'post',
    url: 'https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/create',
    headers: {
      Authorization: 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    data,
  };

  await axios(config).then(() => {
    setTimeout(() => {
      alert('The review has been submitted successfully!');
      window.history.back();
    }, 500);
  });
};
</script>

<template>
  <div class="flex flex-col w-full gap-6" :class="class">
    <!-- BODY -->
    <div class="flex flex-col">
      <div class="mb-3 font-semibold text-lg">Body change</div>
      <!-- BODY DATA -->
      <div class="mb-4 flex gap-2 flex-wrap md:w-max">
        <button
          class="p-2 text-sm w-fit rounded-md border-[1px] border-solid border-[#212529] text-[#212529] bg-white"
          v-for="(data, i) in bodyData"
          :key="i"
          :class="{
            '!bg-[#212529] text-white': selectedBody === data.label,
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
          v-for="(data, i) in bodySubData"
          :key="data"
          :class="{
            '!bg-[#212529] text-white': selectedSubBodies?.includes(data),
          }"
          @click="() => handleSubBodySelection(data)"
        >
          {{ data }}
        </button>
      </div>
    </div>
    <!-- COLOR -->
    <ColorMainNuance
      title="Colours changes"
      @onSelectedSubColor="handleColorChange"
    />
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
