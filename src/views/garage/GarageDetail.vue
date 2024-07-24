<script setup lang="ts">
import { ref, mergeProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGarageStore, type Garage } from '@/store/garage';
import { useVehicleStore } from '@/store/datas/singleDetailVehicle';
import { useGeneralStore } from '@/store/datas/general';
import { MediaStore } from '@/lib/media-store';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';
import { onBeforeMount } from 'vue';
import Button from '@/components/common/button.vue';

const router = useRouter();
const route = useRoute();

/** Store */
const garageStore = useGarageStore();
const vehicleStore = useVehicleStore();
const generalStore = useGeneralStore();

const garage = ref<Garage | null>(null);
const loading = ref(false);
const mediaStore = new MediaStore();

/** Methods */
onBeforeMount(async () => {
  const promise = Promise.all([
    garageStore.getById(route.params.id.toString()),
    // vehicleStore.listPaginated(1, 50, { garage_set_id: route.params.id }),
  ]);

  loading.value = true;
  promise.finally(() => {
    loading.value = false;
  });

  const [_garage] = await promise;
  mediaStore.loadMedia(_garage.photo);
  garage.value = _garage;
});
</script>

<template>
  <v-container>
    <br />
    <v-btn icon size="small" @click="router.back()">
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
                  class="h-full"
                  icon="mdi-account-circle"
                  :src="`https://past-auction-p.s3.amazonaws.com/LogoCountry/ITA.jpeg`"
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
            <Button classes="min-w-[155px] w-full" variant="black">Edit</Button>
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

    <div class="flex items-center justify-between gap-3">
      <router-link
        to="/garage/detail/view"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="garage_dark" class="mx-auto" />
        <div>Garage view</div>
      </router-link>
      <router-link
        to="/garage/detail/social-media-rumors"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="globe" class="mx-auto" />
        <div>Social Rumors</div>
      </router-link>
      <router-link
        to="/garage/detail/auction-alert"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="calendar" class="mx-auto" />
        <div>Auction Alerts</div>
      </router-link>

      <router-link
        to="#"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="single_chart" class="mx-auto" />
        <div>Single Charts</div>
      </router-link>
      <router-link
        to="#"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="mini_dashboard" class="mx-auto" />
        <div>Mini Dashboard</div>
      </router-link>
      <router-link
        to="#"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="dashboard" class="mx-auto" />
        <div>Dashboard</div>
      </router-link>
      <router-link
        to="#"
        class="block border !border-[#212529] bg-[#F8F9FA] rounded-[4px] px-6 py-2 text-center space-y-2"
      >
        <app-icon type="single_detail" class="mx-auto" />
        <div>Single Detail</div>
      </router-link>
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
            @click="router.push(`/garage/detail/${route.params.id}/vehicle/0`)"
          >
            Add vehicle
          </v-btn>
        </div>
      </div>
    </div>
    <div class="text-xl text-blue-500 font-medium">
      Vehicles ({{ vehicleStore.getListItems?.items?.total ?? 0 }})
    </div>
    <div class="grid grid-cols-3 my-4 gap-10">
      <v-card
        v-for="item in vehicleStore.getListItems?.items"
        :key="item.id"
        width="350"
      >
        <v-img
          height="200"
          :src="mediaStore.map.value[item.photo]"
          cover
          class="text-white"
        >
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
            <template #append>
              <v-btn
                class="text-none font-normal bg-[#F2F2F2] mr-2"
                icon
                size="x-small"
              >
                <app-icon type="pencil" class="ml-2" />
              </v-btn>
              <v-btn
                class="text-none font-normal bg-[#F2F2F2]"
                icon
                size="x-small"
              >
                <app-icon type="trash" class="ml-2.5" />
              </v-btn>
            </template>
          </v-toolbar>
        </v-img>

        <v-card-text>
          <div class="font-medium ms-1 mb-2 text-xl">Mercedes Benz</div>

          <ul class="list-disc mt-4 pl-4">
            <li>{{ item.miles }} mi (TMU)</li>
            <li>{{ item.originality }}</li>
          </ul>
          <div class="flex items-center my-4">
            <v-avatar color="grey" class="mr-3" size="x-small">
              <v-icon icon="mdi-account-circle" />
            </v-avatar>
            <h6>{{ item.location_id }}</h6>
          </div>
          <v-btn variant="outlined" class="text-none font-normal">
            Search spare parts
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
