<template>
  <div class="m-5">
    <v-container fluid>
      <v-alert
          color="info"
          variant="tonal"
      >
        <v-row justify="center">
          <v-col cols="12">
            <div class="text-center text-black">
              <h3><strong>Brand Area</strong></h3>
              <p><small>Select the option of your interest.</small></p>
            </div>
          </v-col>
        </v-row>
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-row justify="start">
        <v-col class="d-flex">
          <img class="me-2" src="@/assets/images/bolt.svg" alt="Immagine blu">
          <span class="me-2 mt-1">Bolts available</span>  
          <v-chip
            class="me-2 custom-chip"
            color=""
            label
          > 
            26
          </v-chip>
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col>
          Please, select 1 of the charts you prefer 
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
    <v-row justify="center">
      <v-col v-for="(card, index) in brandRow" :key="index">
        <v-card
          :variant="variant"
          class="mx-auto"
        >
          <v-card-item>
            <div>
              <div>
                <v-alert v-if="card.title === 'Dashboard'" color="info" class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                <v-alert v-if="card.title === 'Single chart'" color="#FFDA44" class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                <v-alert v-if="card.title === 'Minidashboard'" color="success" class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
              </div>
              <div class="d-flex justify-space-around mt-2">
                <img class="" src="@/assets/images/brand-card.svg" alt="Immagine brand">
              </div>
              <div class="text-caption text-center mt-2 mb-2">
                  <v-alert 
                      v-if="card.title === 'Dashboard'"
                      style="border: 1px solid;"
                      color="info"
                      variant="tonal"
                      class="d-flex justify-space-around"
                  >
                  <div class="d-flex">
                      <strong>{{ card.boltReq }} </strong>
                      <p class="ms-2 text-black"> Required Bolts</p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsToday }}</strong>
                      <p class="ms-2 text-black">Charts still available today </p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsMonth }}</strong>
                      <p class="ms-2 text-black">Charts still available this month</p>
                  </div>
                  </v-alert>
                  <v-alert 
                      v-if="card.title === 'Single chart'"
                      style="border: 1px solid;"
                      color="#FFDA44"
                      variant="tonal"
                      class="d-flex justify-space-around"
                  >
                  <div class="d-flex">
                      <strong>{{ card.boltReq }} </strong>
                      <p class="ms-2 text-black"> Required Bolts</p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsToday }}</strong>
                      <p class="ms-2 text-black">Charts still available today </p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsMonth }}</strong>
                      <p class="ms-2 text-black">Charts still available this month</p>
                  </div>
                  </v-alert>
                  <v-alert 
                      v-if="card.title === 'Minidashboard'"
                      style="border: 1px solid;"
                      color="success"
                      variant="tonal"
                      class="d-flex justify-space-around"
                  >
                  <div class="d-flex">
                      <strong>{{ card.boltReq }} </strong>
                      <p class="ms-2 text-black"> Required Bolts</p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsToday }}</strong>
                      <p class="ms-2 text-black">Charts still available today </p>
                  </div>
                  <div class="d-flex">
                      <strong>{{ card.chartsMonth }}</strong>
                      <p class="ms-2 text-black">Charts still available this month</p>
                  </div>
                  </v-alert>
              </div>
            </div>
          </v-card-item>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              size="small"
              class="float-right px-15"
              :variant="card.isSelected ? 'elevated' : 'outlined'"
              :color="card.isSelected ? 'black' : ''"
              @click="selectCard(card)"
            >
            {{ card.isSelected ? 'Selected' : 'Select' }}
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
  <v-container fluid>
      <v-row>
          <v-col cols="12">
              <div class="d-flex justify-end">
                  <v-btn size="small" class="mr-2" variant="outlined" color="black" @click="this.$router.push({ path: '/charts/filters/' });">Back</v-btn>
                  <v-btn @click="continueProcess" :disabled="!cardSelected" size="small" class="float-right" color="black">Continue</v-btn>
              </div>
          </v-col>
      </v-row>
  </v-container>
  </div>
</template>

<script>
import router from '@/router/index';

export default {
  data() {
      return {
          cardSelected: false,
          brandRow: [
              {
                  'title' : 'Single chart',
                  isSelected: false,
                  'boltReq' : 3,
                  'chartsToday' : 20,
                  'chartsMonth' : 15,

              },
              {
                  'title' : 'Minidashboard',
                  isSelected: false,
                  'boltReq' : 3,
                  'chartsToday' : 2,
                  'chartsMonth' : 15,

              },
              {
                  'title' : 'Dashboard',
                  isSelected: false,
                  'boltReq' : 4,
                  'chartsToday' : 27,
                  'chartsMonth' : 1,

              }
          ]
      }
  },
  methods: {

    continueProcess() {
        const selectedCard = this.brandRow.find(card => card.isSelected);
        router.push({ 
            path: '/charts/filters/brand/preview',
            query: { 
                color: selectedCard.title === 'Dashboard' ? 'info' : selectedCard.title === 'Single chart' ? '#FFDA44' : 'success',
                title: selectedCard.title
            }
        });
    },

      selectCard(card) {
      this.brandRow.forEach((c) => {
          c.isSelected = false;
      });
      card.isSelected = true;
      this.cardSelected = true;
      },
  }

}
</script>

<style scoped>
.custom-chip {
  background-color: #ffffff;
  border: 1px solid #000000;
  padding-left: 20px;
  padding-right: 20px; 
  }

</style>