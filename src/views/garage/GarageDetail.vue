<script setup lang="ts">
import { ref, mergeProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { useRouter, useRoute } from 'vue-router';
import { useGarageStore, type Garage } from '@/store/garage';
// import { useVehicleStore } from '@/store/datas/singleDetailVehicle';
import { useVehicleStore } from '@/store/vehicle/vehicle';
import { useGeneralStore } from '@/store/datas/general';
import { MediaStore } from '@/lib/media-store';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';
import { onBeforeMount } from 'vue';
import Button from '@/components/common/button.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

/** Store */
const garageStore = useGarageStore();
const vehicleStore = useVehicleStore();
const generalStore = useGeneralStore();

// const ve = ref(NaN)
const authToken = ref(window.localStorage.getItem('past_token'));
const garage = ref<Garage | null>(null);
const loading = ref(false);
const mediaStore = new MediaStore();
const services = [
  {
    href: '/garage/detail/view',
    icon: 'garage_dark',
    title: 'Garage view',
  },
  {
    href: '/garage/detail/social-media-rumors',
    icon: 'globe',
    title: 'Social Rumors',
  },
  {
    href: '/garage/detail/auction-alert',
    icon: 'calendar',
    title: 'Auction Alerts',
  },
  {
    href: '#',
    icon: 'single_chart',
    title: 'Single Charts',
  },
  {
    href: '#',
    icon: 'mini_dashboard',
    title: 'Mini Dashboard',
  },
  {
    href: '#',
    icon: 'dashboard',
    title: 'Dashboard',
  },
  {
    href: '#',
    icon: 'single_detail',
    title: 'Single Detail',
  },
];



/** Methods */

 async function deleteGarageVehicle (vehicleId : number, index : number) {
   vehicleStore.getListItems.items.splice(index, 1);
  const apiUrl = "https://pastauction.com/api/v1/garage/garage_vehicle/" + vehicleId
  const authToken = window.localStorage.getItem('past_token')
  try {
    const response =  await axios.delete(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+authToken,
      },
    });
    return true;

  }catch (error) {
    return false;
  }
};

onBeforeMount(async () => {

  const promise = Promise.all([
    garageStore.getById(route.params.id.toString()),
    vehicleStore.listPaginated(1, 50, { garage_set_id: route.params.id }),
  ]);

  loading.value = true;
  promise.finally(() => {
    loading.value = false;
  });

  const [_garage] = await promise;

  if (!_garage) {
    throw new Error('Garage not found');
  }

  mediaStore.loadMedia(_garage.photo);
  vehicleStore.getListItems?.items.forEach((item: any) => {
    mediaStore.loadMedia(item.photo || item.main_photo);
  });

  garage.value = _garage;


  //
  // try {
  //   const [response] = await Promise.all([axios.delete(
  //     'https://pastauction.com/api/v1/garage/garage_vehicle/',
  //     {
  //     headers: {
  //       'authorization': 'Bearer '+authToken.value,
  //       'Content-Type': 'application/json'
  //
  //     }
  //   })]);
  //
  //   // Assuming the response has a 'balance' field
  //   creditsAvailable.value = response.data.balance_tokens;
  // } catch (error: any) {
  //   if (axios.isAxiosError(error)) {
  //     console.error(error);
  //   } else {
  //     // Non-Axios error handling
  //     console.error('Unexpected error:', error);
  //   }
  // }








});
</script>

<template>
  <v-container>
    <br />
    <v-btn icon size="small" @click="router.push('/garage')">
      <app-icon type="arrow_left" />
    </v-btn>

    <div class="text-center my-4">
      <div class="text-3xl font-medium mb-3">My garage</div>
      <span class="text-grey">
        Use the search engine to filter your vehicles
      </span>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-[200px]">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
    <v-slide-y-transition>
      <div class="card" v-if="garage">
        <div class="flex max-sm:flex-col justify-between gap-5">
          <div class="space-y-3">
            <div class="flex items-center">
              <v-avatar color="grey" class="mr-3" :size="50">
                <v-icon
                  v-if="!mediaStore.map.value[garage.photo]"
                  icon="mdi-account-circle"
                />
                <img
                  class="h-full object-cover"
                  icon="mdi-account-circle"
                  v-if="mediaStore.map.value[garage.photo]"
                  :src="mediaStore.map.value[garage.photo]"
                />
              </v-avatar>
              <h4 class="text-2xl">{{ garage?.name }}</h4>
            </div>
            <div class="flex items-center" v-if="garage.country">
              <v-avatar color="grey" class="mr-3" :size="16">
                <img
                  class="h-full object-cover"
                  icon="mdi-account-circle"
                  :src="`https://past-auction-p.s3.amazonaws.com/LogoCountry/`+garage.country.substring(0 , 3).toUpperCase()+`.jpeg`"
                />
                <!-- TODO :src="`https://past-auction-p.s3.amazonaws.com/LogoCountry/${garage.country}.jpeg`" -->
              </v-avatar>
              <h6>{{ garage.country }}</h6>
            </div>
            <div class="text-grey" v-if="garage.vehicle_capacity">
              Garage capacity:
              <b>{{ garage.vehicle_capacity }}</b>
            </div>
            <div class="text-grey" v-if="garage.description">
              Additional description:
              <b>{{ garage.description }}</b>
            </div>
          </div>

          <div class="max-sm:w-full">
            <Button
              :to="`/garage/detail/${route.params.id}/edit`"
              classes="min-w-[155px] w-full"
              variant="black"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </v-slide-y-transition>

    <div class="my-4">
      <div class="text-2xl font-medium mb-1">Services available</div>
      <span class="text-grey">
        Click on the available services to obtain more detailed information
        about the vehicles.
      </span>
    </div>

    <div class="card p-0 min-[1280px]:px-[20px]">
      <swiper
        class="a_ones_titles"
        :space-between="17"
        wrapper-class="max-[1280px]:pb-[40px] py-[20px]"
        :pagination="{ clickable: true }"
        :modules="[Pagination]"
        :breakpoints="{
          320: {
            slidesPerView: 1.1,
            enabled: true,
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
          },
          640: {
            slidesPerView: 3.5,
            enabled: true,
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
          },
          768: {
            slidesPerView: 4.5,
            enabled: true,
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
          },
          1280: {
            enabled: false,
            slidesPerView: services.length,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
          },
        }"
      >
        <!--  -->
        <swiper-slide v-for="service in services">
          <router-link
            :to="service.href"
            class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
          >
            <app-icon :type="service.icon" class="mx-auto" />
            <div>{{ service.title }}</div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <div class="card my-10">
      <div class="flex justify-between">
        <div>
          <v-menu>
            <template #activator="{ props: menu }">
              <v-btn
                color="#212529"
                class="text-white text-none font-normal w-full flex items-center"
                v-bind="mergeProps(menu)"
              >
                Order by
                <app-icon type="chevron_down" class="ml-3" />
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Oldest first</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Newest first</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-btn
            color="#212529"
            class="text-white text-none font-normal"
            :to="`/garage/detail/${route.params.id}/vehicle/new/edit`"
          >
            <!-- @click="
              router.push()
            " -->
            Add vehicle
          </v-btn>
        </div>
      </div>
    </div>
    <div class="text-xl text-blue-500 font-medium">
      Vehicles ({{ vehicleStore.getListItems?.total ?? 0 }})
    </div>
    <div v-if="loading" class="flex justify-center items-center h-[200px]">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
    <v-slide-y-transition>
      <div
        v-if="!loading"
        class="grid sm:grid-cols-2 lg:grid-cols-3 my-4 gap-[24px]"
      >
        <v-card
          variant="flat"
          v-for="(item , index) in vehicleStore.getListItems?.items"
          :key="item.id"
          class="rounded-[9px] card-shadow"
        >
          <v-img
            height="200"
            :src="
              mediaStore.map.value[item.photo] ||
              'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            "
            cover
            class="text-white"
          >
            <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
<!--              <template #append>-->
                <v-btn
                  @click="router.push('/garage/detail/' + garage?.id +'/vehicle/' + item.id + '/edit')"
                  class="text-none font-normal bg-[#F2F2F2] mr-2"
                  icon
                  size="x-small"
                >
                  <app-icon type="pencil" class="ml-2" />
                </v-btn>
                <v-btn
                  class="text-none font-normal bg-[#F2F2F2]"
                  icon
                  @click="deleteGarageVehicle(item.id , index)"

                  size="x-small"
                >
                  <app-icon type="trash" class="ml-2.5" />
                </v-btn>
<!--              </template>-->
            </v-toolbar>
          </v-img>

          <v-card-text>
            <div class="font-medium ms-1 mb-2 text-xl">
              Brand {{ item.id_brand }}
            </div>

            <ul class="list-disc mt-4 pl-4">
              <li>{{ item.miles || 0 }} mi (TMU)</li>
              <li>{{ item.originality }}</li>
            </ul>
            <div class="flex items-center my-4">
              <v-avatar color="grey" class="mr-[5px]" size="16">
                <img
                  v-if="item.location_id"
                  icon="mdi-account-circle"
                  class="h-full"
                  :src="`https://past-auction-p.s3.amazonaws.com/LogoCountry/${item.location_id}.jpeg`"
                />
                <v-icon v-else icon="mdi-account-circle" />
              </v-avatar>
              <h6>{{ item.location_id }}</h6>
            </div>
            <v-btn variant="outlined" class="text-none font-normal">
              Search spare parts
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-slide-y-transition>
  </v-container>
</template>

<style lang="scss" scoped>
.card-shadow {
  box-shadow: 0px 2px 4px 0px #00000013;
}
.a_ones_titles a{
  height: 99px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
