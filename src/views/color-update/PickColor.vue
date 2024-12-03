<script lang="ts" setup>
import { ref } from 'vue';

const pickColors = ref(
  [
    { key: 'Main color', value: 'BLUE' },
    { key: 'Bicolor', value: 'BLUE' },
    { key: 'Top color', value: 'BLUE' },
  ].map((data: any) => ({ ...data, key: data.key + ':' }))
);
</script>

<template>
  <div class="bg-[#DEE2E6] h-max-1/2 p-4 flex flex-col gap-4 rounded-lg">
    <div class="font-bold text-xl">Pick color from image</div>
    <div
      class="flex justify-center w-full bg-[#E9ECEF] rounded border border-[#CED4DA]"
    >
      <div class="flex gap-2 p-1">
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
        <span class="text-[#212529] text-sm flex justify-center items-center">
          #1708FF
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="(color, i) in pickColors"
        :key="i"
        class="flex border-b border-solid border-[#6C757D]"
      >
        <div class="w-2/5 text-[#212529]">{{ color.key }}</div>
        <div class="w-3/5 text-[#6C757D]">{{ color.value }}</div>
      </div>
    </div>
  </div>
</template>
