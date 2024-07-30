<template>
  <div class="space-y-6">
    <div class="space-y-2 text-left">
      <h2 class="text-3xl">Personal Information</h2>
      <div class="text-grey">
        Complete the data with your personal information
      </div>
    </div>

    <v-form @submit.prevent="submit" class="flex flex-col gap-3">
      <ui-upload
        @change="uploadPicture"
        @delete="deletePicture"
        :profile-img="store.getProfileImage"
      />

      <v-text-field
        v-model="user.first_name"
        :error-messages="v$.first_name.$errors.map(e => e.$message) as any"
        :counter="10"
        density="comfortable"
        placeholder="Enter your name"
        label="Name"
        required
        variant="outlined"
        @input="v$.first_name.$touch"
        @blur="v$.first_name.$touch"
      ></v-text-field>

      <v-text-field
        v-model="user.surname"
        :error-messages="v$.surname.$errors.map(e => e.$message) as any"
        :counter="10"
        density="comfortable"
        placeholder="Enter your surname"
        label="Surname"
        required
        variant="outlined"
        @input="v$.surname.$touch"
        @blur="v$.surname.$touch"
      ></v-text-field>

      <v-date-input
        :clearable="true"
        @click:clear="user.birthdate = undefined"
        label="Birth Date"
        v-model="user.birthdate"
        variant="outlined"
        :prepend-icon="null as any"
      ></v-date-input>

      <v-autocomplete
        v-model="user.country"
        label="Country"
        :items="countries"
        placeholder="Select or type"
        variant="outlined"
        density="comfortable"
        item-title="name"
        item-value="name"
      />

      <Button
        :loading="loading"
        classes="w-full"
        variant="black"
        :disabled="v$.$invalid || loading"
        type="submit"
      >
        Complete
      </Button>
    </v-form>
  </div>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    location="top right"
  >
    {{ snackbar.text }}
    <Button
      classes="min-w-[100px] ml-2"
      variant="white"
      @click="snackbar.show = false"
    >
      Close
    </Button>
  </v-snackbar>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/components';
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useAuthStore } from '@/store/auth';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import UiCombobox from '@/components/ui/ui-combobox.vue';
import UiInput from '@/components/ui/ui-input.vue';
import UiUpload from '@/components/ui/ui-upload.vue';
import useGlobalStore from '@/store/GlobalStore';
import Button from '@/components/common/button.vue';
import { alphabeticallyByKey } from '@/lib/sort';
import { withLoading } from '@/lib/with-loading';
import { snackbarState } from '@/lib/snackbar-state';
import { onBeforeMount } from 'vue';

type User = {
  // gender: string;
  first_name: string;
  surname: string;
  // address: string;
  // city: string;
  country: string;
  photo: string;
  birthdate?: Date;
  // phone: string;
  // vat: string;
  // nickname: string;
  // currency: string;
};

const store = useAuthStore();
const globalStore = useGlobalStore();
const user = ref<User>({
  // gender: '',
  first_name: '',
  surname: '',
  // address: '',
  // city: '',
  country: '',
  photo: '',
  // birthdate: new Date('2023-09-20'),
  // phone: '',
  // vat: 'vat',
  // nickname: '',
  // currency: 'EUR',
});

const countries = ref<{ name: string; iso_code?: string }[]>([]);
const snackbar = snackbarState();
const loading = ref(false);

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
    // birthdate: {
    //   required: helpers.withMessage('Required field', required),
    // },
  };
});

onBeforeMount(() => {
  loadUser();

  globalStore
    .globalFilterAll<{ name: string }>('bidwatcher_country', 'name')
    .then(res => (countries.value = res.sort(alphabeticallyByKey('name'))));
});

function loadUser() {
  const promise = store.getLoggedUserInfo().then(({ data }) => {
    const fetchedUser = {
      ...data,
    };
    if (data.birthdate) {
      fetchedUser.birthdate = new Date(data.birthdate);
    }

    user.value = fetchedUser;
    if (user.value?.photo) {
      return store.loadImage(user.value.photo);
    }
  });

  withLoading(loading, promise);
}

function uploadPicture(file: File) {
  const promise = store
    .uploadPicture(file)
    .then(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Profile picture updated successfully';
      snackbar.value.color = 'success';
    })
    .catch(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Error updating profile picture, please try again';
      snackbar.value.color = 'error';
    });

  withLoading(loading, promise);
}

function deletePicture() {
  const promise = store
    .deletePicture()
    .then(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Profile picture deleted successfully';
      snackbar.value.color = 'success';
    })
    .catch(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Error deleting profile picture, please try again';
      snackbar.value.color = 'error';
    });

  withLoading(loading, promise);
}

async function submit() {
  const promise = store
    .updateUser(user.value)
    .then(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Profile updated successfully';
      snackbar.value.color = 'success';
    })
    .catch(() => {
      snackbar.value.show = true;
      snackbar.value.text = 'Error updating your profile, please try again';
      snackbar.value.color = 'error';
    })
    .finally(() => {
      loading.value = false;
    });

  withLoading(loading, promise);
}

const v$ = useVuelidate(rules, user);
</script>

<style scoped></style>
