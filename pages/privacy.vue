<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/composables/login";
definePageMeta({
  layout: "custom",
  middleware: "avoid-if-logged-in",
});
const router = useRouter();
const store = useAuthStore();
const isOpen = ref(true);

const closeDialog = () => {
  isOpen.value = false;
  router.go(-1);
};

const confirm = () => {
  isOpen.value = false;
  if (store.getRegisteredUser?.email) router.push("/login");
  else router.go(-1);
};
</script>

<template>
  <UiDialog v-model="isOpen" @close="closeDialog" @confirm="confirm" />
</template>
