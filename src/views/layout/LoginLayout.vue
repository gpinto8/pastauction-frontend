<script setup lang="ts">
import backgroundUrl from '@/assets/images/login.png';
</script>
<template>
  <v-app :theme="'light'">
    <v-app-bar class="pl-16">
      <img class="my-4 pl-16" src="@/assets/images/logo-dark.svg" />
    </v-app-bar>

    <v-main
      class="d-flex flex-col justify-center position-background max-lg:px-[15px]"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    >
      <div
        class="bg-white p-16 max-lg:py-8 max-lg:px-8 max-w-[500px] lg:min-h-[min(700px,90%)] my-auto space-y-6 !text-primary flex flex-col justify-center login-container max-lg:m-auto rounded-[2rem] lg:rounded-[4rem] lg:rounded-l-[0] relative"
      >
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
</style>
