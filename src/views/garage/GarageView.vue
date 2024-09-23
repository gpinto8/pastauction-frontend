<script setup lang="ts">
import { ref, mergeProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';

import { useGeneralStore } from '@/store/datas/general';

/** Components */
import AppIcon from '@/components/common/AppIcon.vue';
import GarageList from './GarageList.vue';
import axios from 'axios';

/** Store */
const authToken = ref(window.localStorage.getItem('past_token'));

const store = useGarageStore();
const generalStore = useGeneralStore();
const creditsAvailable = ref(0)

/** Router */
const router = useRouter();

type Order = {
  text: string;
  value: Record<string, string>;
};
const orders = [
  { text: 'Newest first', value: { id: 'desc' } },
  { text: 'Oldest first', value: { id: 'asc' } },
] as const;
const order = ref<Record<string, string>>(orders[0].value);

/** Methods */


function setOrder(item: Order) {
  order.value = item.value;
}

onMounted(async () => {
  try {
    const [response] = await Promise.all([axios.get('https://pastauction.com/api/v1/bidwatcher_wallet_balance/query', {
      headers: {
        'authorization': 'Bearer ' + authToken.value,
        'Content-Type': 'application/json'

      }
    })]);

    // Assuming the response has a 'balance' field
    creditsAvailable.value = response.data.balance_tokens;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    } else {
      // Non-Axios error handling
      console.error('Unexpected error:', error);
    }
  }
})

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


<!--
      <div class="top_on_box">

      <div class="black_box">
        <div class="top_up_info" v-if="true">
          <div class="complete_info_box">
            <div class="close_box">X</div>
            <div class="complete_head_info_box">
              <div class="person_box_in_complete">
                <img class="person_icon_complete_info_box" src="@/assets/icons/person_circle.png" alt="Person">
              </div>
              <h3 class="headtext_of_complete">Finish completing your information.</h3>
              <span class="bodytext_of_complete">
              Complete your account information to discover the benefits of Past Auction.
            </span>
              <div class="action_box_in_topup_complete">
                <div class="btnbox_in_topup_complete">
                  <button id="cancel">Cancel</button>
                  <button id="complete"> Complete profile</button>
                </div>

              </div>

            </div>
          </div>
        </div>
        </div>
      </div>
-->




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
      <div class="mainnevbox grid grid-cols-3 gap-10 mb-[32px]">
        <div class="col-span-3 lg:col-span-2">
          <div class="card">
            <div class="flex justify-between flex-wrap gap-3">
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

        <div class="max-lg:col-span-3 card space-y-6 text-center">
          <div class="font-semibold text-2xl">My wallet</div>
          <small class="font-medium">Available credit in my wallet</small>

          <app-icon type="credits" class="mx-auto !w-[60px]" />
          <small class="text-grey">{{creditsAvailable}} credit</small>
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
                    <v-list-item v-for="item in orders" @click="setOrder(item)">
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
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
      </div>
      <div class="mb-[16px] text-blue-500">
        Vehicles ({{ store.getListItems?.total || 0 }})
      </div>
    </template>
    <GarageList :overviewrder="order" />
  </v-container>
</template>

<style>
@media screen and (max-width: 900px) {
  .mainnevbox {
    display: block;
  }
}
</style>
