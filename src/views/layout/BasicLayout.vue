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
import { useTheme, useDisplay } from 'vuetify';
// Components
import logo from '@/assets/logo.svg';
import AppBarMenuComponent from '@/components/AppBarMenuComponent.vue';
import DrawerComponent from '@/components/DrawerComponent.vue';
import AppIcon from '@/components/common/AppIcon.vue';
import useGlobalStore from '@/store/GlobalStore';
import { storeToRefs } from 'pinia';

/** Vuetify Theme */
const theme = useTheme();

/** Title */
const title = import.meta.env.VITE_APP_TITLE ?? 'Vuetify3 Application';
const { displayMediaQuery } = storeToRefs(useGlobalStore());
/** Store */
const store = useAuthStore();
/** drawer visibility */
const drawer: Ref<boolean> = ref(true);

const route = useRoute();

/** Clear store when snackbar hide */
onMounted(() => {
  document.title = title;
});

const isAvatarMenuOpen = ref(false);

</script>

<template>
  <v-app>
		<v-navigation-drawer
			v-model="drawer"
			:absolute="!displayMediaQuery.md"
			:permanent="displayMediaQuery.md"
			class="!bg-primary rounded-e-2xl"
			:width="
				!displayMediaQuery.md ? '90' :
				displayMediaQuery.lg ? '250' :
				'138'
			"
		>
			<drawer-component @click="drawer = false"/>
		</v-navigation-drawer>

    <v-app-bar elevation="0" style="overflow: visible;" :height="displayMediaQuery.md ? 100 : 140"  >
			<div class="w-full h-full md:py-4 border-b-2 border-[#21252940]">
				<div class="flex justify-between items-center py-6 bg-[#212529] w-full md:hidden">
					<v-img class="h-6" src="@/assets/images/logo.svg" alt="Logo" />
				</div>
				<div class="flex justify-between items-center w-full px-2">
					<app-icon v-if="!displayMediaQuery.md" class="" size="40" type="burger-menu" @click="drawer = !drawer"/>
					<h1 class="font-bold text-[40px] md:pl-6">
						{{ route.name }}
					</h1>
					<app-bar-menu-component :isAvatarMenuOpen="isAvatarMenuOpen"/>

					<div class="mr-6 h-12 aspect-square rounded-full overflow-hidden shadow" v-if="!displayMediaQuery.md" @click="isAvatarMenuOpen = !isAvatarMenuOpen">
						<!-- <v-icon v-if="!isAvatarMenuOpen" icon="mdi-account-circle" /> -->
						<v-img v-if="!isAvatarMenuOpen" class="h-full aspect-square" src="@/assets/images/user-photo-sample.png" alt="Logo" />
						<app-icon v-if="isAvatarMenuOpen" type="x-circle-fill" size="" />
					</div>
				</div>
			</div>
    </v-app-bar>

    <v-main>
      <div class="px-4 overflow-auto">
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
