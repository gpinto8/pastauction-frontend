<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import AuthContainer from "~~/components/auth-container.vue";
import { SignUp } from "~/composables/types";
import { useRouter } from "vue-router";

const isOpen = ref(false);
const store = useAuthStore();
const router = useRouter();

function openModal() {
  isOpen.value = true;
}

definePageMeta({
  layout: "custom",
});

const formData = reactive<SignUp>({
  name: "",
  surname: "",
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    name: {
      required: helpers.withMessage("The name field is required", required),
      minLength: minLength(3),
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
        <h3>Create an account</h3>
        <p class="text-base font-normal text-gray-500">
          Start your journey with PastAuction!
        </p>
      </AuthTitle>

      <div class="flex items-center justify-between my-6 space-x-4">
        <UiIconButton image="google" color="white" />
        <UiIconButton image="apple" color="dark" />
        <UiIconButton image="facebook" color="blue" />
      </div>
      <div class="text-center">Or</div>
      <UiInput
        label="Name *"
        v-model="formData.name"
        type="text"
        placeholder="Enter your Name"
        required
        @change="v$.name.$touch"
        :error-message=" v$.name.$errors.map((e: any) => e.$message)"
      />

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
      <UiCheckbox id="name" name="name">
        <span class="text-gray-500">
          By creating an account, you agree to the
        </span>
        <a @click="router.push('/privacy')"> Terms of use and Privacy Policy </a
        >.
      </UiCheckbox>

      <UiButton :disabled="v$.$invalid" @click="store.register(formData)">
        Get Started
      </UiButton>
    </AuthContent>
  </AuthContainer>

  <UiDialog v-model="isOpen" />
</template>
