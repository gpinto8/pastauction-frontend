<script setup lang="ts">
import backgroundUrl from '@/assets/images/login.png';
</script>
<template>
  <v-app :theme="'light'">
    <v-app-bar class="px-10">
      <img src="@/assets/images/logo-dark.svg" />
    </v-app-bar>

    <v-main class="d-flex flex-col justify-center position-background"
      :style="{ backgroundImage: `url(${backgroundUrl})` }">
      <router-view v-slot="{ Component, route }">
        <transition>
          <component :is="Component" :key="route.name" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
.position-background {
  background-size: cover;
  background-position: center 70%;
}
</style>
