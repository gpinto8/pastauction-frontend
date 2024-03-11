<script setup lang="ts">
import { ref, mergeProps } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';

import { useGeneralStore } from '@/store/datas/general';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';

/** Store */
const store = useGarageStore();
const generalStore = useGeneralStore();

/** Router */
const router = useRouter();

const loadedMedia = ref([]);

/** Methods */
store.listPaginated(1, 10, {}, {});

const loadMedia = async (id: number, media: string) => {
  if (media !== 'string') {
    await generalStore.loadMedia(media).then(res => {
      if (
        loadedMedia.value?.length === 0 ||
        loadedMedia.value?.findIndex((el: any) => el.id === id) === -1
      )
      
      // @ts-ignore
        loadedMedia.value.push({ id: id, photo: res });
    });
  }
};
</script>

<template>
  <v-container>
    <v-overlay
      :model-value="store.getlLoadingListItems"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <template v-if="!store.getListItems?.items?.length">
      <div class="text-center my-10">
        <div class="text-3xl font-medium mb-3">Welcome to the garage area</div>
        <span class="text-grey">
          Automatically track the potential value of the car you own.
        </span>
      </div>

      <div class="card space-y-4 text-center mt-10">
        <div class="text-grey">You don't have any Garage yet.</div>
        <div>
          <v-btn
            color="#212529"
            class="text-white text-none font-normal w-[200px]"
            @click="router.push('garage/create_garage')"
          >
            Add Garage
          </v-btn>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center my-10">
        <div class="text-3xl font-medium mb-3">My garage</div>
      </div>
      <div class="grid grid-cols-3 gap-10">
        <div class="col-span-2">
          <div class="card">
            <div class="flex justify-between">
              <div>
                <div class="font-semibold text-2xl">Current plan</div>
                <b>Plan Ready</b>
              </div>
              <div>
                <v-btn color="#212529" class="text-white text-none font-normal">
                  Upgrade my plan
                </v-btn>
              </div>
            </div>
            <v-list density="compact">
              <v-list-item color="primary" class="pl-0">
                <template #prepend>
                  <app-icon type="check" class="mr-4" />
                </template>
                <v-list-item-title>
                  Includes free services limited to 3 vehicles
                </v-list-item-title>
              </v-list-item>
              <v-list-item color="primary" class="pl-0">
                <template #prepend>
                  <app-icon type="check" class="mr-4" />
                </template>
                <v-list-item-title>
                  100 accesses to Charts, MiniDashboard and Dashboard
                </v-list-item-title>
              </v-list-item>
              <v-list-item color="primary" class="pl-0">
                <template #prepend>
                  <app-icon type="check" class="mr-4" />
                </template>

                <v-list-item-title>
                  Access to view information on up to 500 vehicles
                </v-list-item-title>
              </v-list-item>
              <v-list-item color="primary" class="pl-0">
                <template #prepend>
                  <app-icon type="check" class="mr-4" />
                </template>
                <v-list-item-title>
                  Access to the roadmap with option to save 10 routes
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </div>

        <div class="card space-y-6 text-center">
          <div class="font-semibold text-2xl">My wallet</div>
          <small class="font-medium">Available credit in my wallet</small>

          <app-icon type="credits" class="mx-auto !w-[60px]" />
          <small class="text-grey">20 credit</small>
          <div>
            <v-btn
              color="#212529"
              class="text-white text-none font-normal w-full"
            >
              Add Tokens
            </v-btn>
          </div>
        </div>
        <div class="col-span-3">
          <div class="card">
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
                  @click="router.push('garage/create_garage')"
                >
                  Add garage
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <router-link
          v-for="item in store.getListItems?.items"
          :key="item.id"
          :to="`/garage/detail/${item.id}`"
        >
          <v-card class="mx-auto" max-width="400">
            <v-img
              v-if="(loadedMedia.find((el: any) => el.id === item.id) as any)?.photo"
              class="align-end text-white"
              height="200"
              :src="(loadedMedia.find((el: any) => el.id === item.id) as any)?.photo"
              cover
            />
            <v-img
              v-else
              class="align-end text-white"
              height="200"
              src="@/assets/images/img-1.png"
              cover
            />
            <span class="hidden">{{ loadMedia(item.id, item.photo) }}</span>
            <v-card-title class="pt-4">{{ item.name }}</v-card-title>

            <v-card-text class="text-[#5E5E5E]">
              <div>{{ item.description }}</div>

              <ul class="list-disc mt-4 pl-4">
                <li>
                  Number of vehicles:
                  <b>{{ item.vehicle_capacity }}</b>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </router-link>
      </div>
    </template>
  </v-container>
</template>
