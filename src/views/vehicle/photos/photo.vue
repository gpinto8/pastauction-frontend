<template>
  <!-- {{ classes }} -->
  <div
    class="photo"
    :class="{ 'sm:col-span-2 sm:row-span-2 h-full': big, ...classes }"
  >
    <label
      v-if="!uploadedImg"
      for="dropzone-file"
      class="h-full w-full flex items-center justify-center"
    >
      <div class="flex items-center">
        <AppIcon type="plus_rounded" />
        <span>Upload Photo</span>
      </div>
      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        accept="image/*"
        @change="uploadImageToggle()"
      />
    </label>

  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';

const theFile = ref();
const emit = defineEmits(['uploadImage']);
defineProps<{ big?: boolean; classes?: Record<string, boolean> }>();
const uploadedImg = ref(false);
function uploadImageToggle(){
  emit("uploadImage")
  uploadedImg.value = !uploadedImg.value


}

</script>

<style lang="scss" scoped>
.photo {
  box-shadow: 0px 2px 4px 0px #00000013;
  background: white;
  min-height: 164px;
  color: #0d6efd;
  border-radius: 10px;
  // border: 1px solid red;
  > label {
    cursor: pointer;
  }
}

.blue {
  color: #0d6efd;
}
</style>
