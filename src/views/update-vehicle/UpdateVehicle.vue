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
  const vehicleData = await axios.get(
    `https://pastauction.com/api/v1/bidwatcher_vehicle/query?search=vehicle_id:${vehicleId}`
  );

  const _familyId = vehicleData.data.items[0].bw_family_id;
  const _brandName = vehicleData.data.items[0].brand_name;
  familyId.value = _familyId;
  brandName.value = _brandName;

  const userInfo = await getLoggedUserInfo();
  if (userInfo) {
    const isAdmin = userInfo?.data?.user_category === 99;
    isUserAdmin.value = isAdmin;
  }
});
</script>

<template>
  <div
    class="flex flex-col justify-between gap-0 md:gap-6 max-w-[1300px] my-0 mx-auto"
  >
    <Filters
      v-if="familyId && brandName"
      :familyId="familyId"
      :brandName="brandName"
    />
    <div class="flex flex-col gap-7 justify-between w-full mt-6">
      <div
        class="flex flex-col md:flex-row justify-between gap-6 overflow-auto h-full pb-3"
      >
        <Gallery :familyId="familyId" :key="_" v-for="_ in new Array(3)" />
      </div>
      <div class="flex flex-col md:flex-row gap-4 w-full md:justify-between">
        <BeforeSuggested class="md:!w-1/3" />
        <MainPicture class="md:!w-1/3" />
        <SelectionInputs class="md:!w-1/3" :isUserAdmin="isUserAdmin" />
      </div>
    </div>
    <AdminReview v-if="isUserAdmin" />
  </div>
</template>
