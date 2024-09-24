<script setup lang="ts">
import axios from 'axios';
import ImageryGrid from './gallery/ImageryGrid.vue';

const mockImage =
  'https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png';
</script>

<template>
  <!-- ADMIN BUTTONS -->
  <div class="w-full flex sm:justify-end">
    <div
      class="w-full sm:w-fit flex flex-col sm:flex-row justify-between gap-4 md:gap-6"
    >
      <v-btn
        class="block w-full sm:w-[160px] !text-[#212529] bg-white rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
      >
        Decline
      </v-btn>
      <v-btn
        class="block w-full sm:w-[160px] text-white bg-[#212529] rounded-md text-base p-2 text-none text-center md:grid md:place-content-center"
      >
        Accept
      </v-btn>
    </div>
  </div>

  <!-- UNDER REVIEW GALLERY -->
  <div class="flex flex-col">
    <div class="font-semibold text-[#212529] text-lg md:ml-13 text-center">
      Under review
    </div>
    <div class="flex gap-4 md:gap-2 justify-center items-center">
      <div class="grid place-content-center p-2 bg-[#212529] w-8 h-8 rounded">
        <img
          class="cursor-pointer"
          src="@/assets/svg/greater-than-white.svg"
          alt="Greater than"
          width="12"
          height="12"
        />
      </div>
      <div>
        <ImageryGrid
          :images="new Array(2).fill(mockImage)"
          columnCombination="2x80"
          classContainer="flex sm:hidden"
        />
        <ImageryGrid
          :images="new Array(5).fill(mockImage)"
          columnCombination="5x80"
          classContainer="hidden sm:flex md:hidden"
        />
        <ImageryGrid
          :images="new Array(15).fill(mockImage)"
          columnCombination="15x80"
          classContainer="hidden md:flex !flex-wrap border-0"
        />
      </div>

      <div class="grid place-content-center p-2 bg-[#212529] w-8 h-8 rounded">
        <img
          class="cursor-pointer"
          src="@/assets/svg/less-than-white.svg"
          alt="Less than"
          width="12"
          height="12"
        />
      </div>
    </div>
  </div>
</template>
