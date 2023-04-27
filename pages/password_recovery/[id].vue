<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from "@vuelidate/validators";
import AuthContainer from "~~/components/auth-container.vue";

const isOpen = ref(false);
const store = useAuthStore();

function openModal() {
  isOpen.value = true;
}

definePageMeta({
  layout: "custom",
});

const formData = reactive({
  password: "",
  newPassword: "",
});

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage("The password field is required", required),
    },
    newPassword: {
      required: helpers.withMessage(
        "The repeat password field is required",
        required
      ),
      sameAsEmail: sameAs(formData.password),
    },
  };
});

const v$ = useVuelidate(rules, formData);
const route = useRoute();

const userId = ref(route.params.id);
</script>

<template>
  <AuthContainer>
    <nuxt-link to="/reset-password">
      <img src="@/assets/icons/arrow-left.svg" />
    </nuxt-link>
    <AuthContent>
      <AuthTitle>
        <h3>Enter a new password?</h3>
      </AuthTitle>

      <UiInput
        label="Password *"
        v-model="formData.password"
        type="password"
        placeholder="Password"
        required
        @change="v$.password.$touch"
        :error-message=" v$.password.$errors.map((e: any) => e.$message)"
      />
      <UiInput
        label="Repeat Password *"
        v-model="formData.newPassword"
        type="password"
        placeholder="Password"
        required
        @change="v$.password.$touch"
        :error-message=" v$.password.$errors.map((e: any) => e.$message)"
      />
      <br />
      <UiButton
        :disabled="v$.$invalid"
        @click="store.resetConfirm(userId, formData.newPassword)"
      >
        Continue
      </UiButton>
    </AuthContent>
  </AuthContainer>

  <UiDialog v-model="isOpen" />
</template>
