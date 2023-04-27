<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import AuthContainer from "~~/components/auth-container.vue";

const isOpen = ref(false);
const store = useAuthStore();

definePageMeta({
  layout: "custom",
});

const formData = reactive({
  email: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
  };
});

const v$ = useVuelidate(rules, formData);
</script>

<template>
  <AuthContainer>
    <div>
      <nuxt-link to="/login">
        <img src="@/assets/icons/arrow-left.svg" />
      </nuxt-link>
    </div>
    <AuthContent>
      <AuthTitle>
        <h3>Forgot your password?</h3>
        <p class="text-base font-normal text-gray-500">
          We help you to recover it. Fill in your email and we will send you the
          instructions to restore it.
        </p>
      </AuthTitle>
      <UiInput
        label="Email *"
        v-model="formData.email"
        type="text"
        placeholder="Enter your email"
        required
        @change="v$.email.$touch"
        :error="v$.email.$invalid"
        :error-message=" v$.email.$errors.map((e: any) => e.$message)"
      />
      <br />
      <UiButton
        :disabled="v$.$invalid"
        @click="store.confirmIdentity(formData.email)"
      >
        Continue
      </UiButton>
    </AuthContent>
  </AuthContainer>

  <UiDialog v-model="isOpen" />
</template>
