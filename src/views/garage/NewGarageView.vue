<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useGlobalStore } from '@/store/GlobalStore';
import { useGarageStore } from '@/store/garage';
import { useGeneralStore } from '@/store/datas/general';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';

/** Router */
const router = useRouter();

/** Store */
const globalStore = useGlobalStore();
const store = useGarageStore();
const generalStore = useGeneralStore();

/** Interfaces */
interface Garage {
  name: string;
  vehicle_capacity: number | null;
  description: string;
  country: string;
  photo: string;
}

/** Data */
const garage = ref<Garage>({
  name: '',
  vehicle_capacity: null,
  description: '',
  country: '',
  photo: '',
});
const countries = ref<any>([]);
const photoPreview = ref();
const rules = {
  name: { required },
};
const photo = ref();

/** Vuelidate */
const v$ = useVuelidate(rules, garage);

/**
 * Methods
 */
globalStore
  .globalFilter('bidwatcher_country', 'name')
  .then(res => (countries.value = res));

const submit = () => {
  store.create(garage.value).then(res => {
    console.log('response create garage', res);
    generalStore.uploadMedia('garage_set', res.id, photo.value).then(res => {
      console.log('response upload media', res);
      router.push('/garage');
    });
  });
};

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  });
};

const uploadImage = (e: any) => {
  photo.value = e.target.files[0];
  file2Base64(e.target.files[0]).then(res => {
    console.log(res);
    photoPreview.value = res;
  });
};
</script>
<template>
  <v-container>
    <br />
    <v-btn icon size="small" @click="router.back()">
      <app-icon type="arrow_left" />
    </v-btn>
    <div class="text-center pb-4">
      <h3 class="text-2xl font-medium mb-2">Create garage</h3>
      <span class="font-medium text-grey">
        Organize your vehicles in a more comfortable way by creating a garage.
      </span>
    </div>
    <div class="bg-white grid grid-cols-2 gap-20 max-w-6xl mx-auto">
      <div class="px-16 py-9">
        <div class="text-center">
          <h5 class="text-lg font-semibold">Content</h5>
          <small>Upload a photo of your garage</small>
        </div>
        <v-form @submit.prevent="submit">
          <div class="flex items-center justify-center w-32 mx-auto my-4">
            <label
              v-if="!photo"
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-32 border-1 border-gray-300 border-dashed rounded-full px-1 cursor-pointer bg-gray-50"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <div class="text-sm text-blue-500 flex items-center">
                  <AppIcon type="plus_rounded" />
                  <span>Upload Photo</span>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="uploadImage"
              />
            </label>
            <div v-else>
              <v-avatar size="120">
                <img
                  :src="photoPreview"
                  alt="Garage Image"
                  class="rounded-full w-[120px] h-[120px] bg-cover"
                />
              </v-avatar>
              <button type="button">
                <v-badge
                  @click="
                    () => {
                      photoPreview = '';
                      garage.photo = '';
                    }
                  "
                  color="blue"
                >
                  <template #badge>
                    <v-icon size="x-large">mdi-trash-can</v-icon>
                  </template>
                </v-badge>
              </button>
            </div>
          </div>

          <label>Name garage*</label>
          <v-text-field
            v-model="garage.name"
            :error-messages="v$.name.$errors.map(e => e.$message)"
            placeholder="Name garage*"
            required
            variant="outlined"
            density="comfortable"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          />
          <label>Country</label>
          <v-select
            v-model="garage.country"
            :items="countries"
            placeholder="Select"
            variant="outlined"
            density="comfortable"
            item-title="name"
            item-value="name"
          />

          <label>Vehicle capacity</label>
          <v-text-field
            v-model="garage.vehicle_capacity"
            placeholder="Vehicle capacity"
            required
            variant="outlined"
            density="comfortable"
            type="number"
          />

          <label>Additiona description</label>
          <v-textarea placeholder="Write here" variant="outlined"></v-textarea>
          <v-btn
            class="!bg-primary text-white w-full !rounded-lg"
            :disabled="v$.$invalid"
            size="large"
            type="submit"
            :loading="store.getLoading"
          >
            Continue
          </v-btn>
        </v-form>
      </div>
      <img src="@/assets/images/create_garage.png" />
    </div>
  </v-container>
</template>
<style lang="poscss"></style>
