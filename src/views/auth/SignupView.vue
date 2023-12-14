<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

const store = useAuthStore();

const user = ref({
  email: 'ing.irenavoci@gmail.com',
  password: 'string',
  user_category: 0,
  gender: '',
  first_name: 'Irena',
  surname: '',
  address: '',
  city: '',
  country: '',
  birthdate: null,
  phone: '',
  vat: '',
  nickname: '',
});

const rules = {
  first_name: { required },
  password: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, user);

const submit = () => {
  store.register(user.value);
};
</script>

<template>
  <div class="space-y-2 text-center">
    <h2 class="text-3xl">Create an account</h2>
    <div class="text-grey">Start your journey with PastAuction</div>
  </div>

  <v-form @submit.prevent="submit">
    <v-text-field v-model="user.first_name" :error-messages="v$.first_name.$errors.map(e => e.$message)" :counter="10"
      density="comfortable" placeholder="Enter your name" label="Name" required variant="outlined"
      @input="v$.first_name.$touch" @blur="v$.first_name.$touch"></v-text-field>

    <v-text-field v-model="user.email" :error-messages="v$.email.$errors.map(e => e.$message)"
      placeholder="Enter your email" label="Email" required variant="outlined" density="comfortable"
      @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

    <v-text-field v-model="user.password" :error-messages="v$.password.$errors.map(e => e.$message)" :counter="10"
      density="comfortable" placeholder="Password" label="Password" required variant="outlined"
      @input="v$.password.$touch" @blur="v$.password.$touch"></v-text-field>

    <v-checkbox>
      <template #label>
        <div>
          By creating an account you agree to the
          <br />
          <b>Terms of use and Privacy Policy</b>
        </div>
      </template>
    </v-checkbox>

    <v-btn class="!bg-primary text-white w-full !rounded-lg" :disabled="v$.$invalid" :loading="store.getLoading"
      size="large" type="submit">
      Get Started
    </v-btn>
    <div class="text-center my-3">
      Already have an account?
      <router-link to="/login" class="text-blue-600 underline">
        Sign in
      </router-link>
    </div>
  </v-form>
</template>
