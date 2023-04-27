<script setup>
const store = useUserStore();

store.getCountries();
</script>

<template>
  <div class="h-screen">
    <div class="w-28 flex gap-2 h-20 mx-10">
      <img src="@/assets/images/before-logo.svg" class="w-10" />
      <img src="@/assets/images/logo.svg" />
    </div>
    <div class="bg-login">
      <slot />
    </div>
  </div>
</template>
<style>
.bg-login {
  background: url("@/assets/images/personal-info.png") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - 80px);
  position: relative;
}
</style>
