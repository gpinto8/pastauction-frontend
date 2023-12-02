<script setup lang="ts">
import { useConfig } from '@/store';

import AppIcon from './common/AppIcon.vue';

/** Config Store */
const configStore = useConfig();
</script>

<template>
  <div class="space-x-4">
    <!--v-btn
  icon="mdi-theme-light-dark"
  variant="flat"
  @click="configStore.toggleTheme"
/-->
    <v-btn
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon type="help" size="20" />
    </v-btn>

    <v-btn
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon type="tabler" size="20" />
    </v-btn>

    <v-btn
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon type="map" size="20" />
    </v-btn>

    <v-btn
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon type="coins" size="25" />
    </v-btn>

    <v-btn
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon type="bell" size="20" />
    </v-btn>
    <v-avatar color="info" class="mr-6">
      <v-icon icon="mdi-account-circle" />
    </v-avatar>
  </div>
</template>
