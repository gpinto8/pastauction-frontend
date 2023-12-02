<template>
  <div>
    <div
      class="bg-white p-14 rounded-r-3xl absolute left-0 top-0 bottom-0 w-[588px] max-h-[680px] my-auto space-y-6 !text-primary"
    >
      <div class="space-y-2 text-left">
        <h2 class="text-4xl">Personal Information</h2>
        <div class="text-grey">
          Complete the data with your personal information
        </div>
      </div>

      <ui-upload
        @change="store.uploadPicture($event)"
        @delete="store.deletePicture"
        :profile-img="store.getProfileImage"
      />

      <UiInput
        v-model="user.first_name"
        type="text"
        placeholder="Firstname"
        required
        @change="v$.first_name.$touch"
        :error-message="v$.first_name.$errors.map((e: any) => e.$message)"
      />

      <UiInput
        v-model="user.surname"
        type="text"
        placeholder="Surname"
        required
        @change="v$.surname.$touch"
        :error-message="v$.surname.$errors.map((e: any) => e.$message)"
      />

      <VueDatePicker
        v-model="user.birthdate"
        placeholder="Date"
        :enable-time-picker="false"
        :format="format"
        required
        @change="v$.birthdate.$touch"
        :error-message="v$.birthdate.$errors.map((e: any) => e.$message)"
      />

      <v-select
        v-model="user.country"
        label="Country"
        item-title="area"
        item-value="area"
        variant="outlined"
        density="compact"
        :items="store.getListCountries"
      />

      <br />
      <UiButton :disabled="v$.$invalid" @click="store.updateUser(user)">
        Complete
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useAuthStore } from '@/store/auth';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import UiButton from '@/components/ui/ui-button.vue';
import UiCombobox from '@/components/ui/ui-combobox.vue';
import UiInput from '@/components/ui/ui-input.vue';
import UiUpload from '@/components/ui/ui-upload.vue';
import useGlobalStore from '@/store/GlobalStore';

const store = useAuthStore();
const globalStore = useGlobalStore();
const user = ref<any>({
  password: 'string',
  user_category: 19,
  gender: 'string',
  first_name: 'string',
  surname: 'string',
  address: 'string',
  city: 'string',
  country: 'string',
  birthdate: '2023-09-20',
  phone: 'string',
  vat: 'vat',
  nickname: 'string',
  currency: 'EUR',
});

store.getLoggedUserInfo().then(res => {
  user.value = res;
});

onMounted(() => {
  globalStore.globalFilter('bidwatcher_country', 'name').then(res => {
    console.log(res);
  });
  if (store.getDetail?.photo) store.loadImage(store.getDetail.photo);
});

const rules = computed(() => {
  return {
    first_name: {
      required: helpers.withMessage('Required field', required),
      minLength: minLength(3),
    },
    surname: {
      required: helpers.withMessage('Required field', required),
      minLength: minLength(3),
    },
    birthdate: {
      required: helpers.withMessage('Required field', required),
    },
  };
});

const format = (date: Date) => {
  const day = date.getDate();
  let month: any = date.getMonth() + 1;
  const year = date.getFullYear();
  if (month < 10) month = `0${month}`;
  user.value.birth = `${year}-${month}-${day}`;
  return `${day}-${month}-${year}`;
};
const v$ = useVuelidate(rules, user);
</script>

<style scoped></style>
