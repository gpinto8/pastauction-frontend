<template>
  <br />
  <v-btn icon size="small" @click="router.back()">
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
  <div class="grid grid-cols-2 mt-[32px]">
    <div>
      <Button @click="router.back()" variant="white">Back</Button>
    </div>
    <div class="text-right">
      <Button @click="next" variant="black">Continue</Button>
    </div>
  </div>
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

const formRef = ref<HTMLFormElement | null>(null);

const router = useRouter();
const route = useRoute();
const vehicleStore = useEditVehicleStore();

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
  console.log(vehicleStore.vehicle);
  alert('submit');
  vehicleStore.submit();
}

function next() {
  console.log(formRef, vehicleStore.vehicle);
  if (!formRef.value?.checkValidity()) {
    formRef.value?.reportValidity();
    return;
  }

  const to = match(route.path.split('/').pop())
    .with('overview', () => 'details')
    .with('details', () => 'photos')
    .with('photos', () => 'submit')
    .otherwise(() => null);

  if (to) {
    return router.push(to);
  }

  submit();
}
</script>
