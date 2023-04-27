<script setup lang="ts">
import { ref, computed } from "vue";
const emit = defineEmits<{
  (e: "change", value: any): void;
  (e: "delete"): void;
}>();

interface Props {
  profileImg: any;
}

const props = defineProps<Props>();

const preview = ref<any>("");

const onupload = (e: any) => {
  let reader = new FileReader();

  reader.onload = (e) => {
    preview.value = e?.target?.result;
  };
  reader.readAsDataURL(e.target.files[0]);
  emit("change", e.target.files[0]);
};
</script>
<template>
  <div class="text-center mx-auto">
    <div
      v-if="preview || profileImg"
      class="relative w-28 h-28 shadow-xl text-center flex rounded-md flex-col items-center justify-center mx-auto"
    >
      <img v-if="preview" :src="preview" class="rounded-md" />
      <img v-if="profileImg" :src="profileImg" class="rounded-md" />
      <img
        class="absolute bg-blue-500 w-6 h-6 p-1 rounded-full right-[-5px] bottom-[-5px] cursor-pointer"
        src="@/assets/icons/trash.svg"
        @click="
          () => {
            preview = '';
            $emit('delete');
          }
        "
      />
    </div>

    <label v-else class="cursor-pointer mt-6">
      <div
        class="w-28 h-28 shadow-lg p-4 rounded-md text-center flex flex-col items-center space-y-2 justify-center mx-auto"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_519_395124)">
            <rect width="14" height="14" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.99966 1.74927C7.1157 1.74927 7.22698 1.79536 7.30902 1.87741C7.39107 1.95946 7.43716 2.07074 7.43716 2.18677V6.56177H11.8122C11.9282 6.56177 12.0395 6.60786 12.1215 6.68991C12.2036 6.77196 12.2497 6.88324 12.2497 6.99927C12.2497 7.1153 12.2036 7.22658 12.1215 7.30863C12.0395 7.39067 11.9282 7.43677 11.8122 7.43677H7.43716V11.8118C7.43716 11.9278 7.39107 12.0391 7.30902 12.1211C7.22698 12.2032 7.1157 12.2493 6.99966 12.2493C6.88363 12.2493 6.77235 12.2032 6.69031 12.1211C6.60826 12.0391 6.56216 11.9278 6.56216 11.8118V7.43677H2.18716C2.07113 7.43677 1.95985 7.39067 1.87781 7.30863C1.79576 7.22658 1.74966 7.1153 1.74966 6.99927C1.74966 6.88324 1.79576 6.77196 1.87781 6.68991C1.95985 6.60786 2.07113 6.56177 2.18716 6.56177H6.56216V2.18677C6.56216 2.07074 6.60826 1.95946 6.69031 1.87741C6.77235 1.79536 6.88363 1.74927 6.99966 1.74927Z"
              fill="#212529"
            />
          </g>
          <defs>
            <clipPath id="clip0_519_395124">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <small class="text-gray-500">Upload</small>
      </div>
      <input
        class="hidden"
        type="file"
        id="file"
        accept="image/*"
        @change="onupload"
      />
      <small class="text-gray-500">Select your profile image</small>
    </label>
  </div>
</template>
