<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import Button from '@/components/common/button.vue'

const store = useAuthStore();

const user = ref({
  email: '',
  password: '',
});

const rules = {
  password: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, user);

const snackbar = ref({
  text: '',
  color: '',
  show: false,
});

const submit = () => {
  store.login(user.value)
  .catch((error) => {
    const data = error?.response?.data || {}
    snackbar.value = {
      text:  data.detail || data.message || 'An error occurred. Please try again.',
      color: 'error',
      show: true,
    };
  })
};
</script>

<template>
  <div class="space-y-2 text-center">
    <h2 class="text-4xl p-0">Sign In</h2>
    <div class="text-grey">Welcome back! Login to your account</div>
  </div>

  <v-form @submit.prevent="submit" class="flex flex-col gap-3">
    <v-text-field v-model="user.email" :error-messages="(v$.email.$errors.map(e => e.$message) as any)"
      placeholder="Enter your email" label="Email" required variant="outlined" density="comfortable"
      @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

    <v-text-field v-model="user.password" :error-messages="(v$.password.$errors.map(e => e.$message) as any)" :counter="10"
      density="comfortable" placeholder="Password" label="Password" type="password" required variant="outlined"
      @input="v$.password.$touch" @blur="v$.password.$touch"></v-text-field>


      <v-btn class="!bg-primary text-white w-full !rounded-lg mt-8" :disabled="v$.$invalid" :loading="store.getLoading"
      size="large" type="submit">
      Sign in
    </v-btn>
    <div class="text-center mb-1 mt-5">
      <router-link to="/forgot-password" class="text-blue-600 underline">
        Forgot password
      </router-link>
    </div>

    <div class="text-center mb-3 mt-1">
      Don't you have an account?
      <router-link to="/sign-up" class="text-blue-600 underline">
        Sign up
      </router-link>
    </div>
  </v-form>
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
