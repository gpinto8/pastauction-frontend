<script setup lang="ts">
import { onMounted } from "vue";
const { $toast } = useNuxtApp();

definePageMeta({
  layout: "authenticated",
  middleware: "auth",
});
const store = useAuthStore();
const userStore = useUserStore();

const isOpen = ref(false);

onMounted(() => {
  if (!userStore.getUserPrompted) {
    $toast.success("Welcome to PastAuction!");
    isOpen.value = true;
  }
});
</script>

<template>
  <div
    class="bg-white rounded-xl px-14 py-4 grid grid-cols-3 items-center gap-10 justify-between w-full"
  >
    <div class="col-span-2">
      <h3 class="font-semibold text-2xl">
        Hi,
        <span v-if="store.userInfo">{{ store.getLoggedUserInfo.name }}</span> !
      </h3>
      <p>
        In PastAuction, you will be able to search and filter relevant data for
        your <br />next classic car purchase.
      </p>
    </div>
    <img src="@/assets/images/home.svg" class="-mb-10" />
  </div>
  <div class="grid grid-cols-3 mt-10 gap-10">
    <div class="col-span-2">
      <div
        class="bg-white rounded-xl px-6 py-6 items-center gap-4 justify-between w-full"
      >
        <h3 class="font-semibold text-xl">Current plan</h3>
        <div class="font-semibold">Plan Free</div>
        <br />
        <div class="flex space-x-2 items-center mb-4">
          <img src="@/assets/icons/check.svg" />
          <p>Includes free services limited to 3 vehicles</p>
        </div>
        <div class="flex space-x-2 items-center mb-4">
          <img src="@/assets/icons/check.svg" />
          <p>Access to Social Rumors and Aution Alert</p>
        </div>
        <div class="flex space-x-2 items-center mb-4">
          <img src="@/assets/icons/check.svg" />
          <p>Access to view information on up to 10 vehicles</p>
        </div>
        <div class="flex space-x-2 items-center mb-4">
          <img src="@/assets/icons/check.svg" />
          <p>Access to 3 Single Charts and 1 Dashboard</p>
        </div>
        <div class="flex space-x-2 items-center">
          <img src="@/assets/icons/check.svg" />
          <p>Access to the roadmap</p>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-xl px-10 py-8 space-y-6 justify-between w-full text-center"
    >
      <h3 class="font-semibold text-xl">My Wallet</h3>
      <div class="text-sm font-medium">
        Add coins to your virtual wallet and get access to exclusive plans!
      </div>
      <div>
        <img src="@/assets/icons/money.svg" class="mx-auto" />
        <div class="text-sm font-medium text-gray-600 mt-2">0 credits</div>
      </div>
      <UiButton> Add Coins </UiButton>
    </div>
    <div class="col-span-3">
      <div>
        <ul class="flex space-x-6">
          <li
            class="text-xl py-1 text-blue-700 border-b-2 border-blue-700 cursor-pointer"
          >
            Garage (0)
          </li>
          <li
            class="text-xl py-1 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 cursor-pointer"
          >
            Locale (0)
          </li>
          <li
            class="text-xl py-1 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 cursor-pointer"
          >
            Charts (0)
          </li>
        </ul>
      </div>
      <div
        class="bg-white rounded-xl px-10 py-14 space-y-6 justify-between w-full text-center mt-3"
      >
        <div class="text-sm font-medium">
          You don't have any vehicles in your Garage yet.
        </div>

        <UiButton class="!w-72 mx-auto"> Add vehicles </UiButton>
      </div>
    </div>
    <UiDialogPersonalInfo v-model="isOpen" @close="isOpen = false" />
  </div>
</template>
