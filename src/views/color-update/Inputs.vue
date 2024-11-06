<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const image =
  'https://pastauction.com/api/v1/photo/gAAAAABm8Rztu3cVcqgPWxxZNFss3B-a3fQV5lpM7-SxYAfVJdF_oNKOx_e2LQ7d_KSL0YYI8VYWPN4fQcHr27wjXFibZiMkIL9j0k9x2yD0ANhaFG6_BYEi7BZBshs2IG2OtFWNoNOiO3YuS8SzMhez_i3dWd_4LkFlzX27rIZnLDr7Bs6Q1RHfjOAP8b_gJUnMQJL6Be9Ptmy6EiC-5jg7k-AJq4Nqrg==';
const colorData = ref<any>([]);

const vehicleSpecifications = ref(
  [
    { key: 'Family', value: 991 },
    { key: 'Model', value: '911-V' },
    { key: 'Stage', value: 'V' },
    { key: 'Series', value: '996' },
    { key: 'Year', value: '200' },
    { key: 'Chassis', value: 'WPOCA2994XS6FDASFASDF' },
    { key: 'Body', value: 'Coupè' },
    { key: 'Main', value: 'BLUE' },
    { key: 'Secondary', value: 'BLUE' },
    { key: 'Top/Roof', value: 'BLUE' },
  ].map((data: any) => ({ ...data, key: data.key + ':' }))
);

const pickColors = ref(
  [
    { key: 'Main color', value: 'BLUE' },
    { key: 'Bicolor', value: 'BLUE' },
    { key: 'Top color', value: 'BLUE' },
  ].map((data: any) => ({ ...data, key: data.key + ':' }))
);

onMounted(async () => {
  console.log('mounted');
  // COLOR DATA
  const _colorData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_colorfamily/`
  );
  colorData.value = _colorData.data.items?.map((item: any) => item);
});
</script>

<template>
  <div class="flex gap-4 w-full">
    <!-- VEHICLE SPECIFICATION -->
    <div class="flex flex-col gap-4 p-4 w-[338px] bg-[#DEE2E6] rounded-lg">
      <div class="font-bold">Vehicle Specification</div>
      <div class="flex flex-col gap-2">
        <div
          v-for="(specification, i) in vehicleSpecifications"
          :key="i"
          class="flex border-b border-solid border-[#6C757D]"
        >
          <div class="w-2/5">{{ specification.key }}</div>
          <div class="w-3/5">{{ specification.value }}</div>
        </div>
      </div>
    </div>
    <!-- MAIN PICTURE -->
    <div class="w-fit bg-[#DEE2E6] rounded-lg">
      <img
        :src="image"
        alt="main-image"
        width="16"
        height="16"
        class="!w-[466px] !h-[398px]"
      />
    </div>
    <!-- COLOR SELECTIONS -->
    <div class="flex flex-col justify-between w-[435px] gap-4">
      <!-- SELECT COLOR FROM LIBRARY -->
      <div class="bg-[#DEE2E6] h-max-1/2 p-4 rounded-lg">
        <div>Select color from library</div>
        <div class="flex gap-4 items-center flex-col sm:flex-row">
          <div class="font-semibold text-base w-full sm:w-fit">Main:</div>
          <div class="flex gap-1 flex-wrap w-full">
            <div
              v-for="color in colorData"
              class="h-8 w-8 border-[2px] border-solid border-grey-100 cursor-pointer"
              :class="{
                '!border !border-solid !border-[#212529]': true,
              }"
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
      <!-- PICK COLOR FROM IMAGE -->
      <div class="bg-[#DEE2E6] h-max-1/2 p-4 flex flex-col gap-4 rounded-lg">
        <div>Pick color from image</div>
        <div class="flex justify-center w-full bg-[#E9ECEF]">
          <div class="flex gap-1 p-1">
            <div
              class="h-6 w-6 border-[2px] border-solid border-grey-100 cursor-pointer"
              :class="{
                '!border !border-solid !border-[#212529]': true,
              }"
            >
              <div class="h-full" :style="{ backgroundColor: '#1708FF' }">
                <v-tooltip activator="parent" location="top" text="Blue" />
              </div>
            </div>
            <span>#1708FF</span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="(color, i) in pickColors"
            :key="i"
            class="flex border-b border-solid border-[#6C757D]"
          >
            <div class="w-2/5">{{ color.key }}</div>
            <div class="w-3/5">{{ color.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
