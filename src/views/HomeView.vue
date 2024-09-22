<script setup lang="ts">
import { onMounted , ref } from 'vue';
import { useStore } from 'vuex';
import AppIcon from '@/components/common/AppIcon.vue';
import axios, { type AxiosResponse } from 'axios';


interface WalletBalance {
  balance: number;
}

const tab = ref(null);
const store = useStore()

const creditsAvailable = ref(NaN)
const authToken = ref(window.localStorage.getItem('past_token'));
const myGarage = ref({
  total: 0 ,
  items: [
    {"name":"Garage di test","description":"","country":"Italy","vehicle_capacity":5,"id":410,"photo":null}
  ]
})


onMounted(async () => {
    try {
      const [response] = await Promise.all([axios.get('https://pastauction.com/api/v1/bidwatcher_wallet_balance/query', {
        headers: {
          'authorization': 'Bearer '+authToken.value,
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



  // GARAGE REQUEST

  try {
   // console.log("Ciao")

      const [response] = await Promise.all([axios.get('https://pastauction.com/api/v1/garage_set/query', {
        data: {
          page: 1,
          size: 50
        },
        headers: {
          'authorization': 'Bearer '+authToken.value,
          'Content-Type': 'application/json'
        },
      })]);

    myGarage.value = response.data
    // Assuming the response has a 'balance' field
    // Assuming the response has a 'balance' field
    // creditsAvailable.value = response.data.balance_tokens;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    } else {
      // Non-Axios error handling
      console.error('Unexpected error:', error);
    }
  }
});

</script>


<template>
  <div class="top_on_box" v-if="false">
    <div class="top_on_box" >
      <div class="top_up_info" v-if="false">
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













      <div class="area_manage_topup_question" v-if="false">
        <div class="complete_info_box">
          <div class="close_box">X</div>
          <div class="complete_head_areamanagement_box">
            <h3 class="headtext_of_complete">Which area do you want to manage?</h3>
            <span class="bodytext_of_complete">
              Select one of the options to visualize the information
            </span>
            <div class="action_box_in_topup_complete">
              <div class="selectboxes_of_area_management">
                <div class="select_box_in_areamanagement">

                  <div class="icon_in_select_areamanagement usericarea">
                    <img src="@/assets/icons/white_person.svg" alt="white person  ">
                  </div>

                  <div class="select_managearea_sedcbox">
                    <h3 class="select_managearea_sedcbox_title">
                      User area
                    </h3>
                    <span class="select_managearea_sedcbox_desc">
                      Select if you want to manage your Garage, Charts area, Find parts and much more
                    </span>
                  </div>


                </div>
                <div class="select_box_in_areamanagement">


                  <div class="icon_in_select_areamanagement shieldicon">
                    <img src="@/assets/icons/shield.svg" alt="entity">
                  </div>

                  <div class="select_managearea_sedcbox">
                    <h3 class="select_managearea_sedcbox_title">
                      User area
                    </h3>
                    <span class="select_managearea_sedcbox_desc">
                      Select if you want to manage your Garage, Charts area, Find parts and much more
                    </span>
                  </div>



                </div>
              </div>

            </div>

          </div>
        </div>


      </div>








      </div>



  </div>



  <v-container class="space-y-10">
    <div class="p-10 pb-0 shadow-lg rounded-lg mt-10">
      <div class="grid grid-cols-3 gap-10">
        <div class="col-span-2 space-y-3">
          <span class="text-4xl font-medium">Hi Gianfraco!</span>
          <div>
            In PastAuction, you will be able to search and filter relevant data
            for your next classic car purchase.
          </div>
        </div>
        <div>
          <img src="@/assets/images/home.svg" alt="home" class="-mb-6" />
        </div>
      </div>
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
    </div>
    <div>
      <v-tabs v-model="tab" color="blue" align-tabs="start">
        <v-tab :value="1">Garage ({{myGarage.total}})</v-tab>
        <v-tab :value="2">Locate (0)</v-tab>
        <v-tab :value="3">Charts (0)</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid
                       v-if="tab === 1 && myGarage.total === 0"
          >
            <div class="card space-y-4 text-center">
              <div class="text-grey">You don't have any Garage yet.</div>
              <div>
                <v-btn
                  color="#212529"
                  class="text-white text-none font-normal w-[200px]"
                >
                  Add Garage
                </v-btn>
              </div>
            </div>
          </v-container>
          <div v-else-if="tab === 1 " class="garage_items_list_main_box">
            <div class="garage_items">
              <a class="garage_item" v-for="item in myGarage.items">
                <div class="garage_image">
                  <img :src="item.photo !== null ? item.photo : ''" alt="">

                </div>
                <div class="garage_data">
                  <div class="garage_title">
                    {{item.name}}
                  </div>
                  <div class="garage_desc">
                    hello my name is is
                    {{item.description}}
                  </div>
                  <div class="garage_counting">
                    <ul class="counting_gar">                    Number of vehicles:
                      <li>{{item.vehicle_capacity}}</li></ul>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </v-window-item>
      </v-window>
    </div>
  </v-container>



</template>

<style lang="postcss">
.card {
  @apply p-10 rounded-lg bg-white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.075);
}
.black_box {
  width: 100%;
  height: 100%;
  z-index: 31;
  top: 0;
  left: 0;
  position: fixed;
 background-color: #000c;
}
.close_box{
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 5px;
}
.top_up_info {
  width: 400px;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  margin: 163px auto;
}
.area_manage_topup_question {
    width: 800px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
    margin: 163px auto;
}
.complete_info_box {
  position: relative;
}
.person_icon_complete_info_box {
  max-width: 24px;
}
.person_box_in_complete {
  background-color: #E4E7EC;
  width: fit-content;
  padding: 10px;
  margin: 0 auto 25px;
  border-radius: 50px;
  box-shadow: 0 0 0 10px #F4F4F4;
}
.complete_head_info_box {
  padding: 20px 0 10px 0;
  margin: 0 auto;}
.complete_head_areamanagement_box {
  padding: 50px 0 30px 0;
  margin: 0 auto;
 }
.headtext_of_complete {
  //styleName: Text lg / Semibold;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  width: 95%;
  margin: 0 auto;
  text-align: center;
}
.bodytext_of_complete{
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 5px auto;
  width: 85%;
  text-align: center;
  display: block;
}
.btnbox_in_topup_complete {
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  button {
    padding: 10px 12px;
    border-radius: 4px ;
    gap: 8px;
    &#cancel {
      background: #F8F9FA;
      border: 1px solid #F8F9FA
    }
    &#complete {
      background: #000;
      color: #fff;

    }
    width: 47%;
  }
}
.action_box_in_topup_complete {
  margin: 25px 0;
}

.selectboxes_of_area_management{
  display: flex;
  justify-content: space-around;
  .select_box_in_areamanagement{
    cursor: pointer;
    border: 1px solid #CECECE;
    border-radius: 12px;
    width: 45%;
  }
}
.select_managearea_sedcbox {
  text-align: center;
  width: 75%;
  margin: 20px auto;
  h3 {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
  }
  .select_managearea_sedcbox_desc {
    font-family: Inter;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

  }
}
.icon_in_select_areamanagement{
  &.usericarea {
    background: #2D8EFF;
    width: fit-content;
    padding: 12px;
    margin: 30px auto 0;
    box-shadow: 0 0 0 7px #DEEDFF;
    border-radius: 50px;
  }
  &.shieldicon {
    background: #6C757D;
    width: fit-content;
    padding: 12px;
    margin: 30px auto 0;
    box-shadow: 0 0 0 7px #CECECE;
    border-radius: 50px;
  }
  img {
    width: 28px;
    height: 28px;
  }
}

.garage_items {
  margin-top: 30px;
  display: flex;
  .garage_item {
    background-color: #fff;
    width: 30%;
    margin: 0 2%;
    border-radius: 8px;
    overflow: hidden;
    .garage_data {
      padding: 30px 15px 20px;
      .garage_desc {
        font-size: 14px;
        line-height: 24px;
        text-align: left;
        margin: 10px auto 13px;
      }
      .garage_title {
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
      }
      .garage_counting {
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        .counting_gar {
          list-style: circle;
          li {
            display: inline;

            display: inline;
            font-family: Inter;
            font-size: 14px;
            font-weight: 600;
            line-height: 24px;
            text-align: left;
          }
        }
      }
    }
    .garage_image {
      height: 200px;
      img {
        max-height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
