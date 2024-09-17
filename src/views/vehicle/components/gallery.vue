<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '../components/pagination.vue';
import ExpansionSection from '@/components/entity/ExpansionSection.vue';
import Checkbox from '@/components/ui/ui-checkbox.vue';
import ImageGallery from './imageGallery.vue';

const props = defineProps<{ galleries: any[][] }>();

const currentPage = ref(1);

const MOCK_MAX_ITEMS = 30;
const MOCK_ITEMS = 280;

const checkbox = ref();

const tabletGallery = props.galleries[0].slice(0, 7);
console.log({ tabletGallery });
const mobileGallery = props.galleries[0].slice(0, 5);

const selected = ref(false);
</script>

<template>
  <div class="flex flex-col gap-4 w-fit">
    <ExpansionSection
      title="Core information"
      titleClass="hover:bg-[#212529] h-[100px]"
      panelClass="bg-[#212529] text-[#FFFFFF]"
      class="mobile-gallery text-[#FFFFFF]"
      hideTitle
      @on-selected="selected = $event"
    >
      <template #title>
        <div class="flex items-start justify-between">
          <!-- SELECT -->
          <div class="flex justify-center items-center z-10">
            <Checkbox />
            Select
          </div>
          <ImageGallery v-if="!selected" :maxRows="7" :size="60" :total="7" />
          <div v-else>APERTO</div>
          <!-- GALLERY -->
          <!-- {{ tabletGallery.length }} -->
          <!-- <div
            v-for="(gallery, i) in tabletGallery"
            :key="i"
            :class="{ hidden: i + 1 !== currentPage }"
            class="flex"
          > -->
          <!-- <div class="w-6 h-6">{{ image }}</div> -->
          <!-- <img :src="image" alt="" width="80" height="80" class="border-2 border-solid border-black" /> -->
          <!-- v-for="_ in new Array(MOCK_ITEMS)" -->
          <!-- {{ image }} -->
          <!-- <div>{{ i }}</div> -->
          <!-- <img
                :key="i"
                :src="gallery"
                alt=""
                width="60"
                height="60"
                class="block border-2 border-solid border-black"
              /> -->
          <!-- </div> -->
        </div>
      </template>
      <template #default>
        <ImageGallery :maxRows="5" :size="80" :total="30" />
      </template>
    </ExpansionSection>

    <div>
      <small class="font-semibold">Exteriour color</small>
      <div class="flex gap-3">
        <div
          v-for="color in ['red', 'yellow', 'green', 'white', 'black', 'blue']"
          class="h-8 w-8 border rounded bg-grey-100 p-1 cursor-pointer"
          :class="{}"
        >
          <div class="h-full" :style="{ backgroundColor: color }"></div>
        </div>
      </div>
    </div>

    <v-checkbox
      class="d-inline-flex mr-4"
      v-model="checkbox"
      :value="false"
      :label="'label'"
    />

    <!-- INFORMATION -->
    <div class="flex justify-between">
      <div :key="_" v-for="_ in new Array(5)" class="flex flex-col gap-1">
        <div class="badge font-semibold">Model</div>
        <div class="badge font-normal">993 - IV</div>
      </div>
    </div>

    <!-- GALLERY -->
    <!-- <div class="grid grid-cols-[repeat(5,80px)] border-2 border-solid border-black">
          <img :key="_" v-for="_ in new Array(30)" :src="image" alt="" width="80" height="80" class="border-2 border-solid border-black" />
        </div> -->
    <!-- class="h-[460px]" -->
    <div
      v-for="(gallery, i) in galleries"
      :key="i"
      :class="{ hidden: i + 1 !== currentPage }"
    >
      <div
        class="grid grid-cols-[repeat(5,80px)] border-2 border-solid border-black"
      >
        <!-- <div class="w-6 h-6">{{ image }}</div> -->
        <!-- <img :src="image" alt="" width="80" height="80" class="border-2 border-solid border-black" /> -->
        <!-- v-for="_ in new Array(MOCK_ITEMS)" -->
        <!-- {{ image }} -->
        <img
          v-for="(image, i) in gallery"
          :key="i"
          :src="image"
          alt=""
          width="80"
          height="80"
          class="border-2 border-solid border-black"
        />
      </div>
    </div>
    {{ currentPage }}
    <!-- PAGINATION -->
    <!-- </div> -->
    <Pagination
      :items="MOCK_ITEMS"
      :maxItems="MOCK_MAX_ITEMS"
      @currentPage="currentPage = $event"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.mobile-gallery) {
  .v-expansion-panel-title__icon {
    display: flex !important;
    align-self: start !important;
  }
}
// .mobile-gallery * {
//   .v-expansion-panel-title__icon {
//     display: flex !important;
//     align-self: start !important;
//   }
// }
</style>
