<script setup lang="ts">
import { ref, mergeProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGarageStore } from '@/store/garage';
import { useVehicleStore } from '@/store/datas/singleDetailVehicle';
import { useGeneralStore } from '@/store/datas/general';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter();
const route = useRoute();

/** Store */
const store = useGarageStore();
const vehicleStore = useVehicleStore();
const generalStore = useGeneralStore();

const loadedMedia = ref([]);

/** Methods */
vehicleStore.listPaginated(1, 50, { garage_set_id: route.params.id });

const loadMedia = async (id: number, media: string) => {
  await generalStore.loadMedia(media).then(res => {
    if (
      loadedMedia.value?.length === 0 ||
      loadedMedia.value?.findIndex((el: any) => el.id === id) === -1
    )
    
      // @ts-ignore
      loadedMedia.value.push({ id: id, photo: res });
  });
  return loadedMedia;
};
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

    <div class="card">
      <div class="flex justify-between">
        <div class="space-y-3">
          <div class="flex items-center">
            <v-avatar color="grey" class="mr-3">
              <v-icon icon="mdi-account-circle" />
            </v-avatar>
            <h4 class="text-2xl">Garage GTC Full (3)</h4>
          </div>
          <div class="flex items-center">
            <v-avatar color="grey" class="mr-3" size="small">
              <v-icon icon="mdi-account-circle" />
            </v-avatar>
            <h6>Italy</h6>
          </div>
          <div class="text-grey">
            Garage capacity:
            <b>10</b>
          </div>
          <div class="text-grey">
            Additional description:
            <b>Lorem ipsum dolor sit</b>
          </div>
        </div>

        <div>
          <v-btn color="#212529" class="text-white text-none font-normal">
            Edit
          </v-btn>
        </div>
      </div>
    </div>

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
        <span class="hidden">{{ loadMedia(item.id, item.main_photo) }}</span>
        <v-img
          height="200"
          :src="(loadedMedia.find((el: any) => el.id === item.id) as any)?.photo"
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
