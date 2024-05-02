<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const emit = defineEmits(['click'])
const store = useAuthStore();


const menuItems = [
	{ label: "Home", value: "home", iconName: "home", to: "/home"},
	{ label: "Datas", value: "datas", iconName: "datas", to: "/datas"},
	{ label: "Garage", value: "garage", iconName: "garage", to: "/garage"},
	{ label: "Charts", value: "charts", iconName: "chart", to: "/charts"},
	{ label: "Locate", value: "locate", iconName: "locate", to: "/locate"},
	{ label: "Wallet", value: "wallet", iconName: "wallet", to: "/wallet"},
	{ label: "Entity", value: "entity", iconName: "person-bounding-box", to: "/entity"},
]

const activeMenuItem = ref<(typeof menuItems)[number]>(menuItems[0]);
</script>


<template>
	<div class="flex flex-col px-3 md:!px-6 py-4 gap-4 h-screen !pb-6 overflow-y-auto">
		<v-list-item nav class="hidden md:block">
			<v-img class="hidden lg:block" src="@/assets/images/logo.svg" alt="Logo" />
			<div class="hidden md:flex lg:hidden justify-center"><app-icon class="w-6 h-12" type="logo" color="#fff" size="xl"></app-icon></div>
			<!-- <template #append>
				<span  @click="emit('click')">
					<v-btn variant="text" icon="mdi-chevron-left" />
				</span>
			</template> -->
		</v-list-item>
		
		<div class="mt-3 md:mt-4 lg:mt-16">
			<RouterLink v-for="item in menuItems" :to="item.to">
				<div
					class="text-white flex flex-col md:flex-col lg:flex-row lg:gap-2 md:justify-center lg:justify-start items-center w-full rounded-lg md:px-2 md:!py-2 lg:px-4 py-5 lg:mb-6"
					:class="{'bg-[#0D6EFD]': activeMenuItem.label === item.label}"
					@click="activeMenuItem = item"
				>
					<app-icon :type="item.iconName" color="#fff" size="lg"></app-icon>
					<span class="hidden md:inline font-light lg:text-lg">{{ item.label }}</span>
				</div>
			</RouterLink>
		</div>

		<div class="flex-1"></div>

		<div @click="store.logout" class="aspect-square cursor-pointer md:aspect-auto hover:opacity-80 duration-75 py-3 flex flex-col lg:flex-row justify-center items-center gap-x-3 bg-[#6C747C] text-white text-none font-normal rounded-lg">
			<app-icon type="logout" size="lg" />
			<span class="hidden md:inline text-lg">Logout</span>
		</div>

		<div class="flex-1"></div>
	</div>
</template>
