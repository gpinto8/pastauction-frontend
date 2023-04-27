<script setup>
const store = useAuthStore();
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidenav"
    aria-hidden="true"
  >
    <div class="bg-black overflow-y-auto py-5 px-3 h-full rounded-r-xl">
      <Brand />

      <ul class="space-y-3 mt-10 px-2">
        <li>
          <nuxt-link to="/home" class="menu-item">
            <img src="@/assets/icons/home.svg" />

            <span class="ml-3">Home</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/dashboard.svg" />

            <span class="ml-3">Dashboard</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/garage.svg" />

            <span class="ml-3">Garage</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/chart.svg" />

            <span class="ml-3">Chart</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/locate.svg" />

            <span class="ml-3">Locate</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/wallet.svg" />

            <span class="ml-3">Wallet</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="" class="menu-item">
            <img src="@/assets/icons/settings.svg" />

            <span class="ml-3">Settings</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div
      class="hidden absolute bottom-0 left-0 justify-center p-4 w-full lg:flex"
    >
      <UiButton class="!bg-blue-700" @click="store.logout">
        <img src="@/assets/icons/Logout.svg" />
        <div>Logout</div>
      </UiButton>
    </div>
  </aside>
</template>
<style lang="scss">
.menu-item {
  @apply font-light flex items-center p-3 no-underline text-base  text-white rounded-lg transition-all duration-100 hover:bg-blue-700 hover:text-white;
  &.router-link-active {
    @apply bg-blue-700 text-white;
  }
}
</style>
