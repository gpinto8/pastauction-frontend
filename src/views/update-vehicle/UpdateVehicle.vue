<script lang="ts" setup>
import Gallery from './gallery/Gallery.vue';
import Filters from './Filters.vue';
import BeforeSuggested from './BeforeSuggested.vue';
import MainPicture from './MainPicture.vue';
import SelectionInputs from './SelectionInputs.vue';
import AdminReview from './AdminReview.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const { getLoggedUserInfo } = useAuthStore();
const router = useRouter();
const vehicleId = +router.currentRoute.value.params.id || 0;
const isUserAdmin = ref(false);
const familyId = ref(0);
const brandName = ref('');

onMounted(async () => {
  // USER FETCH
  getLoggedUserInfo().then(response => {
    const userInfo = response.data;
    const isAdmin = userInfo?.user_category === 99;
    isUserAdmin.value = isAdmin;
  });

  // VEHICLE FETCH
  axios
    .get(
      `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`
    )
    .then(response => {
      const vehicleData = response.data;
      const _familyId = vehicleData.items[0].bw_family_id;
      const _brandName = vehicleData.items[0].brand_name;
      familyId.value = _familyId;
      brandName.value = _brandName;
    });
});
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto overflow-hidden md:!overflow-auto"
  >
    <Filters
      class="md:min-w-[1300px]"
      v-if="familyId && brandName"
      :familyId="familyId"
      :brandName="brandName"
    />
    <div class="flex flex-col gap-7 justify-between w-full mt-6">
      <div
        class="flex flex-col md:flex-row justify-between gap-6 h-full pb-3 md:min-w-[1300px]"
      >
        <Gallery
          class="md:!min-w-[400px]"
          :familyId="familyId"
          :key="_"
          v-for="_ in new Array(3)"
        />
      </div>
      <div
        class="flex flex-col md:flex-row gap-4 w-full md:justify-between md:min-w-[1300px]"
      >
        <BeforeSuggested class="w-full md:!min-w-[400px] md:w-[400px]" />
        <MainPicture class="w-full md:!min-w-[400px] md:w-[400px]" />
        <SelectionInputs
          class="w-full md:!min-w-[400px] md:w-[400px]"
          :isUserAdmin="isUserAdmin"
        />
      </div>
    </div>
    <AdminReview class="md:min-w-[1300px] mt-6 md:mt-0" v-if="isUserAdmin" />
  </div>
</template>
