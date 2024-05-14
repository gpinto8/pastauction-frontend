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

const layoutContainerRef = ref<HTMLElement>();

const isMobileNavMenuOpen = ref(false);
const isMobileAvatarMenuOpen = ref(false);

// when mobile nav menu opens, we add an event listener to close the menu if an event ocurs anywhere in the page
watch(isMobileNavMenuOpen, ()=>{
	if(isMobileNavMenuOpen.value){
		layoutContainerRef.value!.addEventListener("click", (event)=>{
			isMobileNavMenuOpen.value = false;
		}, {once: true});
	}
});

// when avatar menu opens, we add an event listener to close the menu if an event ocurs anywhere in the page
watch(isMobileAvatarMenuOpen, ()=>{
	if(isMobileAvatarMenuOpen.value){
		layoutContainerRef.value!.addEventListener("click", (event)=>{
			isMobileAvatarMenuOpen.value = false;
		}, {once: true});
	}
});


</script>

<template>
  <div ref="layoutContainerRef" class="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[90px_1fr] w-screen h-screen overflow-hidden relative">

		<!-- navbar menu / responsive -->

		<div
			ref="navMenuRef"
			:class="{'-translate-y-full !shadow-none': !displayMediaQuery.md && !isMobileNavMenuOpen}"
			class="
				!bg-primary duration-150 ease-out peer 
				absolute z-10 row-start-2 row-span-1 col-span-1 rounded-b-xl h-fit shadow-gray-600 shadow-lg
				md:absolute md:z-30 md:top-0 md:h-screen md:row-start-1 md:row-span-2 md:!rounded-e-xl md:block md:w-[90px] hover:md:w-[140px]  md:!rounded-bl-none md:shadow-3xl md:hover:shadow-black
				hover:lg:w-[250px]
			"
		>
			<drawer-component @click="drawer = false"/>
		</div>

		<!-- header bar / responsive -->
    <div class="overflow-visible  z-20 bg-white sticky top-0 md:col-start-2">
			<div class="w-full h-full md:py-4 border-b-2 border-[#21252940]">
				<div v-if="isMobileNavMenuOpen || isMobileAvatarMenuOpen"  class="h-[62px] flex justify-between items-center py-6 bg-[#212529] w-full md:hidden">
					<v-img class="h-6" src="@/assets/images/logo.svg" alt="Logo" />
				</div>
				<div class="flex justify-between items-center w-full px-2">
					<!-- the icon that togles the nav menu on mobile -->
					<app-icon v-if="!displayMediaQuery.md" class="" size="40" type="burger-menu" @click.stop="isMobileNavMenuOpen = !isMobileNavMenuOpen; isMobileAvatarMenuOpen = false;"/>

					<!-- current name of the page -->
					<h1 class="font-bold text-[40px] md:pl-6">
						{{ route.name }}
					</h1>

					<!-- the content of the avatar/profile menu -->
					<app-bar-menu-component  :isMobileAvatarMenuOpen="isMobileAvatarMenuOpen"/>

					<!-- the avatar icon that opens the avatar menu on mobile -->
					<div v-if="!displayMediaQuery.md" class="mr-6 h-12 aspect-square rounded-full overflow-hidden shadow" @click.stop="isMobileAvatarMenuOpen = !isMobileAvatarMenuOpen; isMobileNavMenuOpen = false;">
						<!-- <v-icon v-if="!isMobileAvatarMenuOpen" icon="mdi-account-circle" /> -->
						<v-img v-if="!isMobileAvatarMenuOpen" class="h-full aspect-square" src="@/assets/images/user-photo-sample.png" alt="Logo" />
						<app-icon v-if="isMobileAvatarMenuOpen" type="x-circle-fill" size="" />
					</div>
				</div>
			</div>
    </div>

		<!-- main page / content box -->
		<div class="overflow-auto flex-center md:col-start-2 h-full w-full">
            <div class="    p-4 duration-150 max-w-[1000px] h-full w-full">
                <router-view v-slot="{ Component, route }">
                    <transition>
                        <component :is="Component" :key="route.name" />
                    </transition>
                </router-view>
            </div>
		</div>
  </div>
  <teleport to="head">
    <link rel="icon" :href="logo" type="image/svg+xml" />
  </teleport>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
