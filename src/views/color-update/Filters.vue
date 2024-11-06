<script lang="ts" setup>
import { colorUpdate } from '@/store/color-update';

const colorUpdateStore = colorUpdate();
</script>

<template>
  <div class="min-h-[55px] bg-[#212529] text-white p-4 flex flex-wrap gap-4">
    <v-autocomplete
      class="!min-w-[180px]"
      :label="'label'"
      variant="outlined"
      :items="[]"
      density="compact"
    />
    <div class="flex gap-2">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'single',
        }"
        @click="colorUpdateStore.selectionMode = 'single'"
      >
        Single
        <img src="@/assets/svg/pic.svg" alt="pic" width="16" height="16" />
      </button>

      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.selectionMode === 'multiple',
        }"
        @click="colorUpdateStore.selectionMode = 'multiple'"
      >
        Multi
        <img
          src="@/assets/svg/pic-multi.svg"
          alt="pic-multi"
          width="16"
          height="16"
        />
      </button>
    </div>
    <div class="flex gap-2">
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{ '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'single' }"
        @click="colorUpdateStore.galleryMode = 'single'"
      >
        <img
          src="@/assets/svg/buttons-4.svg"
          alt="buttons-4"
          width="16"
          height="16"
        />
      </button>
      <button
        class="bg-[#6C757D] flex items-center gap-2 p-2 text-sm rounded-md text-white h-8"
        :class="{
          '!bg-[#0D6EFD]': colorUpdateStore.galleryMode === 'multiple',
        }"
        @click="colorUpdateStore.galleryMode = 'multiple'"
      >
        <img
          src="@/assets/svg/buttons-9.svg"
          alt="buttons-9"
          width="16"
          height="16"
        />
      </button>
    </div>
  </div>
</template>
