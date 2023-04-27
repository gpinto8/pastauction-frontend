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
  code: null as any,
});

const rules = computed(() => {
  return {
    code: {
      required: helpers.withMessage("The code field is required", required),
      minLength: minLength(5),
    },
  };
});

const v$ = useVuelidate(rules, formData);
</script>

<template>
  <AuthContainer>
    <div v-if="!store.getRegisteredUser?.email">
      <img src="@/assets/icons/arrow-left.svg" />
    </div>
    <AuthContent>
      <AuthTitle>
        <h3>Confirm your identity</h3>
        <p class="text-base font-normal text-gray-500">
          Check your email and verify your account
        </p>
      </AuthTitle>

      <UiInput
        label="Enter the 5 digit-code"
        v-model="formData.code"
        type="number"
        placeholder="XXXXXX"
        required
        @change="v$.code.$touch"
        :error-message=" v$.code.$errors.map((e: any) => e.$message)"
      />

      <div class="text-base !mt-6">
        <span class="text-gray-500"> Did you not receive the code? </span>
        <a
          @click="store.verify(store.getRegisteredUser?.email)"
          class="font-light"
        >
          Resend code
        </a>
      </div>

      <UiButton
        :disabled="v$.$invalid"
        @click="store.verifyEmail(formData.code)"
      >
        Get Started
      </UiButton>
    </AuthContent>
  </AuthContainer>

  <UiDialog v-model="isOpen" />
</template>
