<script setup>
const store = useUserStore();
const authStore = useAuthStore();

store.getCountries();

authStore.getUserInfo({ redirect: false });
</script>

<template>
  <div class="overflow-hidden lg:overflow-visible">
    <div
      class="ml-60 lg:ml-0' min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <AsideMenu />
      <TopBar />
      <div class="px-20 py-10">
        <slot />
      </div>
    </div>
  </div>
</template>
