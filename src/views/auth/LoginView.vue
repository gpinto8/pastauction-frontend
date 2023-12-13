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
    class="bg-white p-14 rounded-r-3xl absolute left-0 top-0 bottom-0 w-[588px] max-h-[680px] my-auto space-y-6 !text-primary flex flex-col justify-center"
  >
    <div class="space-y-2 text-center">
      <h2 class="text-4xl">Sign In</h2>
      <div class="text-grey">Welcome back! Login to your account</div>
    </div>

    <v-form @submit.prevent="submit" class="space-y-4">
      <div>
        <label>E-mail</label>
        <v-text-field
          v-model="user.email"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          placeholder="Enter your email"
          required
          variant="outlined"
          density="comfortable"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>
      </div>
      <div>
        <label>Password</label>
        <v-text-field
          v-model="user.password"
          :error-messages="v$.password.$errors.map(e => e.$message)"
          :counter="10"
          density="comfortable"
          placeholder="Password"
          required
          variant="outlined"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
        ></v-text-field>
      </div>

      <v-btn
        class="!bg-primary text-white w-full !rounded-lg"
        :disabled="v$.$invalid"
        :loading="store.getLoading"
        size="large"
        type="submit"
      >
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
