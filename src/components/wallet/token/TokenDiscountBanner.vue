<script setup lang="ts">
//import AppIcon from '@/components/common/AppIcon.vue';
import Button from '@/components/common/button.vue';
import { ref } from 'vue';

const isVisible = ref(true);

const handleCloseClick = () => {
  isVisible.value = false;
};
</script>

<template>
  <div
    v-if="isVisible"
    class="flex w-full items-center justify-between px-[35px] py-[17px] mb-[32px] gap-4 max-md:flex-col"
    style="
      border-radius: 12px;
      background: rgba(109, 165, 68, 0.07);
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
    "
  >
    <div class="inline-flex flex-col gap-[6px]">
      <div
        class="flex justify-center w-fit"
        style="
          border-radius: 3px;
          padding: 3px 7px 3px 6px;
          background: #6da544;
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.07);
        "
      >
        <div class="flex w-[103px] h-[16px] items-center gap-1 flex-shrink-0">
          <!-- <app-icon type="tags" size="12" /> -->
          <div
            class="text-white text-center font-inter text-[8px] font-normal leading-[10px] w-fit"
          >
            CATEGORY DISCOUNT
          </div>
        </div>
      </div>
      <div class="flex items-start gap-4">
        <div class="text-[#475467] font-inter text-base font-normal leading-5">
          As part of the "Journalist" category, you benefit 10% discount on your
          purchase.
          <br />
          <br />
          This promotion expires on 05/12/2023
        </div>
      </div>
    </div>
    <!-- <div> -->
    <Button
      classes="max-md:w-full max-md:mt-5 min-w-[150px]"
      @click="handleCloseClick"
      variant="black"
    >
      Close
    </Button>
    <!-- </div> -->
  </div>
</template>

<style></style>
