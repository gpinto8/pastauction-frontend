<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

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

const submit = () => {
  store.login(user.value);
};
</script>

<template>
  <div
    class="bg-white p-14 pl-10 rounded-r-3xl w-[450px] my-auto space-y-6 !text-primary flex flex-col justify-stretch">
    <div class="space-y-2 text-center">
      <h2 class="text-3xl">Sign In</h2>
      <div class="text-grey">Welcome back! Login to your account</div>
    </div>

    <v-form @submit.prevent="submit" class="space-y-4">
        <v-text-field v-model="user.email" :error-messages="v$.email.$errors.map(e => e.$message)"
          placeholder="Enter your email" label="Email" required variant="outlined" density="comfortable" @input="v$.email.$touch"
          @blur="v$.email.$touch"></v-text-field>

        <v-text-field v-model="user.password" :error-messages="v$.password.$errors.map(e => e.$message)" :counter="10"
          density="comfortable" placeholder="Password" label="Password" required variant="outlined" @input="v$.password.$touch"
          @blur="v$.password.$touch"></v-text-field>

      <v-btn class="!bg-primary text-white w-full !rounded-lg" :disabled="v$.$invalid" :loading="store.getLoading"
        size="large" type="submit">
        Sign in
      </v-btn>

      <div class="text-center my-3">
        Don't you have an account?
        <router-link to="/sign-up" class="text-blue-600 underline">
          Sign up
        </router-link>
      </div>
    </v-form>
  </div>
</template>
