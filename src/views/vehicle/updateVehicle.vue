<script lang="ts" setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import VehiclePagination from './vehiclePagination.vue';
import Gallery from './components/gallery.vue';

// 1
axios
  .get('/bidwatcher_vehicle_user_update/query', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('past_token')}`,
    },
  })
  .then(response => {
    console.log({ data: response.data });
  })
  .catch(error => {
    console.log(error);
  });

// 2
axios.get(
  `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/query?page=1&size=50`
);

// 3
axios.get(
  `https://pastauction.com/api/v1/bidwatcher_vehicle_user_update/query?page=1&size=50`,
  {
    headers: {
      Accept: 'application/json',
      // Authorization: `Basic ${btoa('IVoauL&#2l$CqgX05sYvjXOsob2^jj5:CL2MTL7fkO7P1691wZ1LlHj*r^IIH&')}`,
      Authorization: `Bearer ${window.localStorage.getItem('past_token')}`,
    },
  }
);

// 4
axios.get(`https://pastauction.com/api/v1/product/103/details`, {
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${btoa('IVoauL&#2l$CqgX05sYvjXOsob2^jj5:CL2MTL7fkO7P1691wZ1LlHj*r^IIH&')}`,
  },
});

const vehiclePagination = ref();
const image = ref(
  'https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png'
);
const currentPage = ref(1);
// const currentPage = computed(
//   () =>
//     vehiclePagination.value?.find((item: any) => item.currentPage)?.currentPage
// );
console.log({ vehiclePagination, currentPage });

const MOCK_ITEMS = 280;
const MOCK_MAX_ITEMS = 30;

const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const galleryChunks = computed(() => {
  const chunked = chunk(new Array(MOCK_ITEMS), MOCK_MAX_ITEMS);
  console.log({ chunked });
  for (let i = 0; i < chunked.length; i++) {
    for (let j = 0; j < chunked[i].length; j++) {
      chunked[i][j] = image.value;
    }
    // chunked[i] = chunked[i].map((_, j) => image.value);
  }
  return chunked;
  // chunked.forEach((chunk, i) => {
  //   chunked[i] = chunk.map((_, j) => image.value);
  // });
});
console.log({ galleryChunks: galleryChunks.value[0] });
</script>

<template>
  <div class="flex flex-col justify-between gap-6">
    <!-- FILTERS -->
    <div class="w-full h-20">FILTERS</div>

    <!-- GALLERY -->
    <div class="flex w-full gap-4 justify-between h-fit">
      <div class="flex flex-col gap-4 w-fit" :key="_" v-for="_ in new Array(3)">
        <Gallery :galleries="galleryChunks" />

        <!-- INFORMATION -->
        <!-- <div class="flex justify-between">
          <div :key="_" v-for="_ in new Array(5)" class="flex flex-col gap-1">
            <div class="badge font-semibold">Model</div>
            <div class="badge font-normal">993 - IV</div>
          </div>
        </div> -->

        <!-- GALLERY -->
        <!-- <div class="grid grid-cols-[repeat(5,80px)] border-2 border-solid border-black">
          <img :key="_" v-for="_ in new Array(30)" :src="image" alt="" width="80" height="80" class="border-2 border-solid border-black" />
        </div> -->
        <!-- <div
          class=""
          v-for="(gallery, i) in galleryChunks"
          :key="i"
          :class="{ hidden: i + 1 !== currentPage }"
        >
          <div
            class="grid grid-cols-[repeat(5,80px)] border-2 border-solid border-black"
          > -->
        <!-- <div class="w-6 h-6">{{ image }}</div> -->
        <!-- <img :src="image" alt="" width="80" height="80" class="border-2 border-solid border-black" /> -->
        <!-- v-for="_ in new Array(MOCK_ITEMS)" -->
        <!-- {{ image }} -->
        <!-- <img
              :key="_"
              v-for="image in gallery"
              :src="image"
              alt=""
              width="80"
              height="80"
              class="border-2 border-solid border-black"
            />
          </div>
          {{ currentPage }} -->
        <!-- PAGINATION -->
        <!-- </div> -->
        <!-- <VehiclePagination
          :items="MOCK_ITEMS"
          :maxItems="MOCK_MAX_ITEMS"
          @currentPage="currentPage = $event"
        /> -->
      </div>
    </div>
    <!-- 
    <Gallery :galleries="galleryChunks" />
    <Gallery :galleries="galleryChunks" />
    <Gallery :galleries="galleryChunks" /> -->

    <!-- DETAIL -->
    <div class="flex gap-7 justify-between w-full">
      <!-- CHANGES -->
      <div class="inputs flex gap-4 w-1/3">
        <div class="p-3 bg-[#DEE2E6] w-[236px] h-fit">
          <div class="title p-2">Before</div>
          <div class="flex flex-col">
            <div class="flex" :key="_" v-for="_ in new Array(10)">
              <div class="bg-white w-2/5 badge key">Family</div>
              <div class="bg-white w-3/5 badge value">911</div>
            </div>
          </div>
        </div>
        <div class="p-3 bg-[#DEE2E6] w-[165px] h-fit">
          <div class="title p-2">Suggested</div>
          <div class="flex flex-col w-full">
            <div class="badge w-full value">911</div>
          </div>
        </div>
      </div>

      <!-- PIC -->
      <div class="flex flex-col gap-4 w-1/3 justify-center items-center">
        <img :src="image" alt="" width="400" height="400" />
        <p>2000 Porsche Carrera 4S black</p>
      </div>

      <!-- CHANGES -->
      <div class="w-1/3">SADFSADF</div>
    </div>
  </div>
</template>

<style lang="scss">
.badge {
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  border: 1px solid #ced4da;
  padding: 5px 9px;
}

.inputs {
  * {
    font-family: Inter;
  }

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

  .badge {
    @apply bg-white rounded-sm border border-solid border-[#CED4DA];
  }
}
</style>
