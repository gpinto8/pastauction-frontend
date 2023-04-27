<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import AuthContainer from "~~/components/auth-container.vue";

definePageMeta({
  layout: "custom",
  middleware: "avoid-if-logged-in",
});

const isOpen = ref(false);
const store = useAuthStore();
const formData = reactive({
  email: "ing.irenavoci@gmail.com",
  password: "Test123.",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);
</script>

<template>
  <AuthContainer>
    <AuthContent>
      <AuthTitle>
        <h3>Sign In</h3>
        <p class="text-base font-normal text-gray-500">
          Welcome back! Login to your account
        </p>
      </AuthTitle>

      <div class="flex items-center justify-between my-6 space-x-4">
        <UiIconButton image="google" color="white" />
        <UiIconButton image="apple" color="dark" />
        <UiIconButton image="facebook" color="blue" />
      </div>
      <div class="text-center">Or</div>

      <UiInput
        label="Email *"
        v-model="formData.email"
        type="text"
        placeholder="Enter your email"
        required
        @change="v$.email.$touch"
        :error-message=" v$.email.$errors.map((e: any) => e.$message)"
      />
      <UiInput
        label="Password *"
        v-model="formData.password"
        type="password"
        placeholder="Password"
        required
        @change="v$.password.$touch"
        :error-message=" v$.password.$errors.map((e: any) => e.$message)"
      />

      <div class="flex justify-between">
        <UiCheckbox id="name" name="name">
          <span class="text-gray-500"> Remember me</span>
        </UiCheckbox>

        <nuxt-link to="reset-password"> Forgot password </nuxt-link>
      </div>

      <UiButton
        :disabled="v$.$invalid"
        @click="store.login(formData)"
        class="relative"
      >
        <div v-if="store.getLoading" role="status" class="absolute right-2">
          <svg
            aria-hidden="true"
            class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        Sign in
      </UiButton>

      <div class="mt-5">
        <span class="text-gray-500"> Don’t have an account? </span>
        <nuxt-link to="create-account"> Sign up </nuxt-link>
      </div>
    </AuthContent>
  </AuthContainer>

  <UiDialog v-model="isOpen" />
</template>
