<script setup lang="ts">
import { useAuthStore } from './store/auth';

const store = useAuthStore();

if (store.isUserAuthenticated) {
  store.getLoggedUserInfo().catch(err => {
    if (err?.response?.status === 401) {
      store.logout();
    }
  });
}
</script>

<template>
  <router-view />
</template>

<style lang="postcss"></style>
