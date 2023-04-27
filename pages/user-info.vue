<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { watch } from "@vue/runtime-core";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import AuthContainer from "~~/components/auth-container.vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useUserStore();
const authStore = useAuthStore();

definePageMeta({
  layout: "personal-info",
});

const formData = ref<any>({
  name: "",
  surname: "",
  birth: new Date(),
  city_id: 0,
  country_id: "",
});
let selected = ref();
let query = ref("");
let selectedCity = ref();
let queryCity = ref("");

onMounted(() => {
  formData.value = authStore.getLoggedUserInfo;
  store.getCountries().then(() => {
    selected.value = store.getListCountries?.find(
      (el: any) => el.iso_code === formData.value.country_id
    );
    store
      .getCities(formData.value.country_id)
      .then(
        () =>
          (selectedCity.value = store.getListCities?.find(
            (el: any) => el.id === formData.value.city_id
          ))
      );
  });

  store.loadImage(authStore.getLoggedUserInfo.profile_picture_url);
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Required field", required),
      minLength: minLength(3),
    },
    surname: {
      required: helpers.withMessage("Required field", required),
      minLength: minLength(3),
    },
    birth: {
      required: helpers.withMessage("Required field", required),
    },
  };
});

const format = (date: Date) => {
  const day = date.getDate();
  let month: any = date.getMonth() + 1;
  const year = date.getFullYear();
  if (month < 10) month = `0${month}`;
  formData.value.birth = `${year}-${month}-${day}`;
  return `${day}-${month}-${year}`;
};
const v$ = useVuelidate(rules, formData);
</script>

<template>
  <AuthContainer>
    <AuthContent>
      <AuthTitle>
        <h3>Personal information</h3>
        <p class="text-base font-normal text-gray-500">
          Complete the data with your personal information.
        </p>
      </AuthTitle>

      <ui-upload
        @change="store.uploadPicture($event)"
        @delete="store.deletePicture"
        :profile-img="store.getProfileImage"
      />

      <UiInput
        v-model="formData.name"
        type="text"
        placeholder="Firstname"
        required
        @change="v$.name.$touch"
        :error-message=" v$.name.$errors.map((e: any) => e.$message)"
      />

      <UiInput
        v-model="formData.surname"
        type="text"
        placeholder="Surname"
        required
        @change="v$.surname.$touch"
        :error-message=" v$.surname.$errors.map((e: any) => e.$message)"
      />

      <VueDatePicker
        v-model="formData.birth"
        placeholder="Date"
        :enable-time-picker="false"
        :format="format"
        required
        @change="v$.birth.$touch"
        :error-message=" v$.birth.$errors.map((e: any) => e.$message)"
      />

      <ui-combobox
        v-model="selected"
        emptySelected="Nothing selected"
        label=""
        :search="query"
        :items="store.getListCountries"
        return-object
        @search="query = $event"
        @click="
          () => {
            formData.country_id = selected.iso_code;
            store.getCities(selected.iso_code);
          }
        "
      />

      <ui-combobox
        v-model="selectedCity"
        emptySelected="Nothing selected"
        label=""
        :search="queryCity"
        :items="store.getListCities"
        return-object
        @search="queryCity = $event"
        @click="formData.city_id = selectedCity.id"
      />

      <br />
      <UiButton :disabled="v$.$invalid" @click="store.updateUser(formData)">
        Complete
      </UiButton>
    </AuthContent>
  </AuthContainer>
</template>
