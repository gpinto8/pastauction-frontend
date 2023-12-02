<script setup lang="ts">
import { useGlobal, useConfig } from '@/store';
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
} from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useTheme } from 'vuetify';

// Components
import logo from '@/assets/logo.svg';
import AppBarMenuComponent from '@/components/AppBarMenuComponent.vue';
import DrawerComponent from '@/components/DrawerComponent.vue';
import AppIcon from '@/components/common/AppIcon.vue';

/** Vuetify Theme */
const theme = useTheme();

/** Title */
const title = import.meta.env.VITE_APP_TITLE ?? 'Vuetify3 Application';

/** Store */
const store = useAuthStore();
/** drawer visibility */
const drawer: Ref<boolean> = ref(true);

const route = useRoute();

/** Clear store when snackbar hide */
onMounted(() => {
  document.title = title;
});
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="!bg-primary rounded-e-2xl"
    >
      <drawer-component />
      <template #append>
        <div class="pa-6">
          <v-btn
            block
            class="bg-[#0D6EFD] text-white text-none font-normal"
            @click="store.logout"
          >
            <app-icon type="logout" class="block mr-4" size="sm" />
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="0" border>
      <!--v-app-bar-nav-icon @click="drawer = !drawer" /-->
      <h1 class="font-bold text-[40px] pl-6">
        {{ route.name }}
      </h1>
      <v-spacer />
      <app-bar-menu-component />
    </v-app-bar>

    <v-main>
      <div class="px-4">
        <router-view v-slot="{ Component, route }">
          <transition>
            <component :is="Component" :key="route.name" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
  <teleport to="head">
    <link rel="icon" :href="logo" type="image/svg+xml" />
  </teleport>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
