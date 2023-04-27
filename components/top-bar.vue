<script setup>
const store = useUserStore();
</script>
<template>
  <div class="flex items-center justify-between w-full border-b px-10 py-4">
    <h1 class="text-xl font-semibold">Home</h1>
    <div class="flex item-center space-x-4">
      <img
        class="bg-stone-800 w-9 h-9 p-2 rounded-full"
        src="@/assets/icons/cart.svg"
      />
      <img
        class="bg-stone-800 w-9 h-9 p-2 rounded-full"
        src="@/assets/icons/bell.svg"
      />
      <router-link to="/user-info">
        <img class="w-9 h-9" src="@/assets/icons/avatar.svg" />
      </router-link>
    </div>
  </div>
</template>
