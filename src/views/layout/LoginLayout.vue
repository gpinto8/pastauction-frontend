<script setup lang="ts">
import backgroundUrl from '@/assets/images/login.png';
</script>
<template>
  <v-app :theme="'light'">
    <v-app-bar class="pl-16">
      <img class="my-4 pl-16" src="@/assets/images/logo-dark.svg" />
    </v-app-bar>

    <v-main class="d-flex flex-col justify-center position-background"
      :style="{ backgroundImage: `url(${backgroundUrl})` }">
      <div
        class="bg-white p-16 rounded-r-3xl w-[450px] my-auto space-y-6 !text-primary flex flex-col justify-stretch login-container">
        <router-view v-slot="{ Component, route }">
          <transition>
            <component :is="Component" :key="route.name" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.position-background {
  background-size: cover;
  background-position: center 70%;
}
.login-container {
  border-radius: 0 4rem 4rem 0;
}
</style>
