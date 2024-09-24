<template>
  <div
    class="w-full h-fit bg-[#212529] text-white flex justify-between px-6 py-5 sm:!pb-0 gap-8 rounded-md"
  >
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
    >
      <img
        src="@/assets/svg/arrow-left.svg"
        alt="arrow-left"
        width="16"
        height="16"
      />
      Previous
    </button>
    <div class="w-full flex gap-2 flex-wrap">
      <v-autocomplete
        v-for="item in new Array(5)"
        class="hidden sm:block w-fit min-w-[100px]"
        label="Area"
        variant="outlined"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        density="compact"
      />
      <div
        class="flex w-full sm:hidden bg-white gap-1 p-2 rounded-md justify-center"
      >
        <img
          src="@/assets/svg/parameters.svg"
          alt="parameters"
          width="16"
          height="16"
        />
        <p class="text-[#0D6EFD]">Parameters</p>
      </div>
    </div>
    <button
      class="hidden md:flex justify-center items-baseline gap-2 w-fit h-fit py-2 px-6 border border-solid !border-[#DEE2E6] rounded-md bg-[#212529] text-white"
    >
      <img
        src="@/assets/svg/arrow-right.svg"
        alt="arrow-right"
        width="16"
        height="16"
      />
      Next
    </button>
  </div>
</template>
