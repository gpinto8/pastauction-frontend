<script setup lang="ts">
import { computed } from 'vue';
import backgroundUrl from '@/assets/images/login.png';
</script>
<template>
  <v-app :theme="'light'">
    <v-main>
      <v-toolbar class="px-10">
        <img src="@/assets/images/logo-dark.svg" />
      </v-toolbar>
      <div
        class="px-4 h-full bg-login"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
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
.bg-login {
  background: url('@/assets/images/login-bg.png') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - 80px);
  position: relative;
}
</style>
