<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import useGlobalStore from '@/store/GlobalStore';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const emit = defineEmits(['click'])
const store = useAuthStore();

const { displayMediaQuery } = storeToRefs(useGlobalStore());

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
	<div class="group flex flex-col px-3 md:group-hover:!px-6 py-4 gap-4 md:h-screen !pb-6 overflow-y-auto">
		<div class="md:min-h-[75px] lg:min-h-[100px] md:mt-4">
			<!-- big logo -->
			<v-img class="hidden lg:group-hover:block" src="@/assets/images/logo.svg" alt="Logo" />
			<!-- small logo  -->
			<div class="hidden md:!flex lg:group-hover:!hidden justify-center"><app-icon class="w-6 h-12" type="logo" color="#fff" size="xl"></app-icon></div>
			<!-- <template #append>
				<span  @click="emit('click')">
					<v-btn variant="text" icon="mdi-	chevron-left" />
				</span>
			</template> -->
		</div>
		
		<div class="mt-3 md:!mt-0">
			<RouterLink v-for="item in menuItems" :to="item.to">
				<div
					class="
						text-white flex hover:bg-[#3a3c3d] items-center w-full rounded-lg
						flex-row gap-2 px-1 py-3 min-w-[186px] mb-2 text-lg
						md:flex-col md:min-w-0 md:justify-center md:!px-2 md:!py-4 md:!mb-[2px]
						md:group-hover:!flex-col md:group-hover:gap-0  md:group-hover:aspect-auto
						lg:group-hover:!flex-row lg:group-hover:gap-3 lg:group-hover:justify-start 
					"
					:class="{'bg-[#0D6EFD]': activeMenuItem.label === item.label}"
					@click="activeMenuItem = item"
				>
					<app-icon :type="item.iconName" color="#fff" :size="displayMediaQuery.lg ? 30 : 24"></app-icon>
					<span class="md:hidden md:group-hover:inline font-light md:text-[16px] lg:text-[20px]">{{ item.label }}</span>
				</div>
			</RouterLink>
		</div>

		<div class="flex-1 hidden md:block"></div>

		<div
			@click="store.logout"
			class="
			bg-[#6C747C] text-white cursor-pointer hover:opacity-80 duration-75 text-none font-normal rounded-lg
				py-4 flex flex-row gap-x-3 justify-center items-center
				md:flex-col md:gap-x-2
				lg:group-hover:flex-row
			">
			<app-icon class=" -translate-x-1" type="logout" size="25" />
			<span class="md:hidden md:group-hover:inline md:!text-[16px] lg:!text-[20px]">Logout</span>
		</div>

		<div class="flex-1 hidden md:block"></div>
	</div>
</template>
