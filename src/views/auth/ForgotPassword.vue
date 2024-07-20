<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Button from '@/components/common/button.vue';
const router = useRouter();

const store = useAuthStore();

const user = ref({
  email: '',
});

const snackbar = ref({
  text: '',
  color: '',
  show: false,
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, user);

const submit = () => {
  store
    .forgotPassword(user.value.email)
    .then(() => {
      snackbar.value.text =
        'An email has been sent to you with instructions to reset your password.';
      snackbar.value.color = 'success';
      snackbar.value.show = true;
    })
    .catch(() => {
      snackbar.value.text = 'An error occurred. Please try again.';
      snackbar.value.color = 'error';
      snackbar.value.show = true;
    });
};
</script>

<template>
  <div class="lg:absolute top-[2em] left-[2em]">
    <v-btn variant="flat" icon size="small" @click="router.back()">
      <app-icon type="arrow_left_no_bg" />
    </v-btn>
  </div>
  <div class="space-y-2 text-center">
    <h2 class="text-3xl">Forgot your password?</h2>
    <div class="text-grey">
      We help you to recover it. Fill in your email and we will send you the
      instructions to restore it.
    </div>
  </div>

  <v-form @submit.prevent="submit" class="flex flex-col gap-3">
    <v-text-field
      v-model="user.email"
      :error-messages="v$.email.$errors.map(e => e.$message) as any"
      placeholder="Enter your email"
      label="Email"
      required
      variant="outlined"
      density="comfortable"
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-btn
      class="!bg-primary text-white w-full !rounded-lg"
      :disabled="v$.$invalid"
      :loading="store.getLoading"
      size="large"
      type="submit"
    >
      Continue
    </v-btn>
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

<style scoped lang="scss">
h1 {
  @apply text-2xl font-bold mt-3;
}
</style>
