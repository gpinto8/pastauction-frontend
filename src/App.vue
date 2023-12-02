<script setup lang="ts">
import { useAuthStore } from './store/auth';

const store = useAuthStore();

if (store.isUserAuthenticated) store.getLoggedUserInfo();
</script>

<template>
  <router-view />
</template>

<style lang="postcss"></style>
