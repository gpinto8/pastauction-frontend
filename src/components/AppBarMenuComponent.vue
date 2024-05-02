<script setup lang="ts">
import { useConfig } from '@/store';

import AppIcon from './common/AppIcon.vue';
import useGlobalStore from '@/store/GlobalStore';
import { storeToRefs } from 'pinia';

/** Config Store */
const configStore = useConfig();
const { isAvatarMenuOpen } = defineProps(['isAvatarMenuOpen']);
const { displayMediaQuery } = storeToRefs(useGlobalStore());


const menuItems = [
	{ iconName: "help", label: "Currency"},
	{ iconName: "tabler", label: "Tabler"},
	{ iconName: "map", label: "Maps"},
	{ iconName: "coins", label: "Currency"},
	{ iconName: "bell", label: "Notifications"},
]
</script>

<template>
	<!-- mobile only -->
	<div v-if="isAvatarMenuOpen" class="md:hidden bg-white z-10 shadow-gray-600 shadow-lg rounded-b-lg absolute top-full right-0 flex flex-col gap-x-2 gap-y-3 p-4 text-xl items-center">
		
		<div class="flex flex-row items-center gap-2 pl-3 border-b-[2px] border-[#21252940] w-full pb-[2px] pr-6">
			<img class="h-10 !w-10 aspect-square" src="@/assets/images/user-photo-sample.png" alt="Logo" />
			<span class="font-medium">Gianfranco</span>
		</div>

		<div v-for="item in menuItems" class="flex items-center flex-row gap-2 pl-3 border-b-[1px] border-[#21252940] w-full pb-3 pr-6">
			<v-btn
				class="text-white text-none font-normal !bg-primary"
				icon
				size="small"
			>
				<app-icon :type="item.iconName" size="20" />
			</v-btn>
			<span class="text-[#475467]">{{ item.label }}</span>
		</div>
	</div>

	<!-- tablet/desktop only -->
  <div class="hidden md:flex space-x-4  flex-nowrap overflow-x-auto">
		<!--v-btn
			icon="mdi-theme-light-dark"
			variant="flat"
			@click="configStore.toggleTheme"
		/-->
		<v-btn
			v-for="item in menuItems"
      class="text-white text-none font-normal !bg-primary"
      icon
      size="small"
    >
      <app-icon :type="item.iconName" size="20" />
    </v-btn>
		<!-- <v-avatar color="info" class="mr-6">
      <v-icon icon="mdi-account-circle" />
    </v-avatar> -->
		<img class="h-10 !w-10 aspect-square mr-6" src="@/assets/images/user-photo-sample.png" alt="Logo" />
  </div>
</template>import useGlobalStore from '@/store/GlobalStore';
import { storeToRefs } from 'pinia';

