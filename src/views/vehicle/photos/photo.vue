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
        @change="uploadImageToggle"
      />
    </label>
    <img v-else :src="photoPrev" alt="">

  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';
import axios from 'axios';
import { id } from 'vuetify/locale';

defineProps(['id' , 'big' , 'classes'])
const theFile = ref();
const emit = defineEmits(['uploadImage']);
// defineProps<{ big?: boolean; classes?: Record<string, boolean>; id: Record<string, number> }>();
const uploadedImg = ref(false);
const photo = ref();

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  });
};

const photoPrev = ref()
function uploadImageToggle(e: any){
  emit("uploadImage")
  uploadedImg.value = !uploadedImg.value
  photo.value = e.target.files[0];
  file2Base64(e.target.files[0]).then(res => {
    photoPrev.value = res

    try {
      const response =  axios.post('http://pastauction.com/api/v1/update_garage_vehicle_photo/', {
        file:res ,
        vahicle_id: id
      }, {
        headers: {
          'Content-Type': 'application/json', // Adjust if needed (e.g., 'multipart/form-data' for file uploads)
        },
      });

      // console.log('Photo uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }

  });

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
