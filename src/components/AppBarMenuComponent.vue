<script setup lang="ts">
import { useConfig } from '@/store';

import AppIcon from './common/AppIcon.vue';
import useGlobalStore from '@/store/GlobalStore';
import { storeToRefs } from 'pinia';
import { RouterLink , useRouter } from 'vue-router';

/** Config Store */
const configStore = useConfig();
const { isMobileAvatarMenuOpen } = defineProps(['isMobileAvatarMenuOpen']);

const { displayMediaQuery } = storeToRefs(useGlobalStore());


const menuItems = [
	{ iconName: "help", label: "Currency", to: "" },
	{ iconName: "tabler", label: "Tabler", to: "" },
	{ iconName: "map", label: "Maps", to: "/locate/roadmaps" },
	{ iconName: "coins", label: "Currency", to: "" },
	{ iconName: "bell", label: "Notifications", to: "" },
]
</script>

<template>
	<!-- mobile only -->
	<div v-if="isMobileAvatarMenuOpen" class="md:hidden bg-white z-10 shadow-gray-600 shadow-lg rounded-b-lg absolute top-full right-0 flex flex-col gap-x-2 gap-y-3 p-4 text-xl items-center">
		
		<RouterLink to="/profile">
			<div class="flex flex-row items-center gap-2 pl-3 border-b-[2px] border-[#21252940] w-full pb-[2px] pr-6">
				<img class="h-10 !w-10 aspect-square" src="@/assets/images/user-photo-sample.png" alt="Logo" />
				<span class="font-medium">Gianfranco</span>
			</div>
		</RouterLink>

		<div v-for="item in menuItems" class="flex items-center flex-row gap-2 pl-3 border-b-[1px] border-[#21252940] w-full pb-3 pr-6">
			<RouterLink :to="item.to">
				<v-btn
					class="text-white text-none font-normal !bg-primary"
					icon
					size="small"
				>
					<app-icon :type="item.iconName" size="20" />
				</v-btn>
			</RouterLink>
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
		<RouterLink v-for="item in menuItems" :to="item.to" >
			<v-btn
				class="text-white text-none font-normal !bg-primary"
				icon
				size="small"
			>
				<app-icon :type="item.iconName" size="20" />
			</v-btn>
		</RouterLink>
		<!-- <v-avatar color="info" class="mr-6">
      <v-icon icon="mdi-account-circle" />
    </v-avatar> -->
		<RouterLink to="/profile">
			<img class="h-10 !w-10 aspect-square mr-6" src="@/assets/images/user-photo-sample.png" alt="Logo" />
		</RouterLink>
  </div>
</template>
