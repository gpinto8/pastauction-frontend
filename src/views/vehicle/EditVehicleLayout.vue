<template>
  <br />
  <v-btn icon size="small" @click="back">
    <app-icon type="arrow_left" />
  </v-btn>
  <div class="text-center mb-[29px]">
    <h2 class="text-[28px] mb-[16px] font-[500]">
      {{ route.name }}
    </h2>
    <p v-if="route.meta.subtitle" class="text-[#6C757D]">
      {{ route.meta.subtitle }}
    </p>
  </div>
  <!-- <keep-alive> -->
  <form @submit="noop" ref="formRef">
    <router-view @submit="submit"></router-view>
  </form>
  <!-- </keep-alive> -->
  <div class="flex justify-between max-sm:flex-col gap-3 mt-[32px]">
    <Button classes="min-w-[250px]" @click="back" variant="white">
      {{ backButtonLabel }}
    </Button>

    <Button
      classes="min-w-[250px]"
      @click="next"
      variant="black"
      :loading="vehicleStore.loading.done"
    >
<!--      {{}}-->
      {{nextButtonLabel}}
    </Button>
  </div>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    location="top right"
  >
    {{ snackbar.text }}
    <Button
      classes="min-w-[100px] ml-2"
      variant="white"
      @click="snackbar.show = false"
    >
      Close
    </Button>
  </v-snackbar>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useEditVehicleStore } from '@/store/vehicle/edit-vehicle';
import Button from '@/components/common/button.vue';
import { noop } from '@/utils/functions/noop';
import { ref } from 'vue';
import { match } from 'ts-pattern';
import { computed } from 'vue';
import { snackbarState } from '@/lib/snackbar-state';

const formRef = ref<HTMLFormElement | null>(null);

const router = useRouter();
const route = useRoute();
const vehicleStore = useEditVehicleStore();
const snackbar = snackbarState();

const nextButtonLabel = computed(() => {
  return match(route.path.split('/').pop())
    .with('submit', () => 'Add vehicle')
    .otherwise(() => 'Next');
});
const backButtonLabel = computed(() => {
  return match(route.path.split('/').pop())
    .with('overview', () => 'Cancel')
    .otherwise(() => 'Back');
});

// Initialize vehicle in store if needed
onMounted(() => {
  if (!vehicleStore.vehicle.id) {
    vehicleStore.vehicle.id = route.params.id.toString();
    vehicleStore.vehicle.garage_set_id = route.params.garageId.toString();
  }
  // Fetch initial data if not already loaded
  vehicleStore.fetchInitialData();
});

function submit() {
  vehicleStore
    .submit()
    .then(() => {
      console.log(vehicleStore)
      router.push(`/garage/detail/${route.params.garageId}`);
    })
    .catch(error => {
      snackbar.value.show = true;
      snackbar.value.text = error.message || 'An error occurred';
      snackbar.value.color = 'error';
    });
}

function next() {

  if(route.name === "Details"){
    alert("DONE");
    submit();
  }

  const to = match(route.path.split('/').pop())
    .with('overview', () => 'details')
    .with('details', () => 'photos')
    // .with('photos', () => 'submit')
    .otherwise(() => null);

  if (to) {
    return router.push(to);
  }

}

function back() {
  const to = match(route.path.split('/').pop())
    .with('details', () => 'overview')
    .with('photos', () => 'overview')
    .with('submit', () => 'details')
    .otherwise(() => null);

  if (to) {
    return router.push(to);
  }

  router.push(`/garage/detail/${route.params.garageId}`);
}
</script>
