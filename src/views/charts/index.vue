<template>
  <div class="m-5">
    <v-container fluid>
      <v-alert>
        <v-row justify="center">
          <v-col cols="12">
            <div class="text-center">
              <h3><strong>What area are you interested in exploring?</strong></h3>
              <p><small>Select the option of your interest.</small></p>
            </div>
          </v-col>
        </v-row>
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-row justify="start">
        <v-col>
          <span class="mdi mdi-cog-outline"></span>
          Bolts available
          <span class="number-span">26</span> <!--TO DO-->
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col>
          Please, select 1 of the charts you prefer 
        </v-col>
      </v-row>
    </v-container>

    <!-- Prima riga di card -->
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="4" v-for="(card, index) in firstRowCards" :key="index">
          <v-card
            :variant="variant"
            class="mx-auto"
            max-width="300"
          >
            <v-card-item>
              <div>
                <div>
                  <v-alert :color="card.isActive ? '#0D6EFD' : 'grey'"  class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                </div>
                <div class="text-caption text-center mt-2 mb-2">
                  <span class="mdi mdi-cog-outline"></span>
                  <span class="font-bold mr-1">{{ card.number }}</span>
                  <small>{{ card.extraCharge }}</small> 
                </div>
                <div class="text-caption text-center">{{ card.description }}</div>
              </div>
            </v-card-item>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                size="small"
                class="float-right"
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

    <!-- Seconda riga di card -->
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="4" v-for="(card, index) in secondRowCards" :key="index">
          <v-card
            :variant="variant"
            class="mx-auto"
            max-width="300"
          >
            <v-card-item>
              <div>
                <div>
                  <v-alert :color="card.isActive ? '#0D6EFD' : 'grey'" class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                </div>
                <div class="text-caption text-center mt-2 mb-2">
                  <span class="mdi mdi-cog-outline"></span>
                  <span class="font-bold mr-1">{{ card.number }}</span>
                  <small>{{ card.extraCharge }}</small> 
                </div>
                <div class="text-caption text-center">{{ card.description }}</div>
              </div>
            </v-card-item>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                size="small"
                class="float-right"
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
          <v-btn @click="openModal" :disabled="!cardSelected" size="small" class="float-right" color="black">Continue</v-btn>
        </v-col>
      </v-row>
    </v-container>


    <!-- Modale -->
    <ModalChartsType :modalOpen="modalOpen" @update:modalOpen="updateModalOpen" />

  </div>
</template>

<script>
import ModalChartsType from './components/ModalChartsType.vue';

export default {
  components: {
    ModalChartsType
  },
  data() {
    return {
      modalOpen: false,
      cardSelected: false,
      firstRowCards: [
        {
          title: 'Brand',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: true,
          isSelected: false
        },
        {
          title: 'Family',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: false,
          isSelected: false,
        },
        {
          title: 'Model',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: false,
          isSelected: false
        },
      ],
      secondRowCards: [
        {
          title: 'Maison',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: false,
          isSelected: false 
        },
        {
          title: 'Auction',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: false,
          isSelected: false
        },
        {
          title: 'Index',
          variant: 'primary',
          number: 26,
          extraCharge: 'Extra charge required',
          description: 'This type of chart is not included in your plan. You can activate it for a fee in bolts',
          isActive: false,
          isSelected: false
        },
      ]
    }
  },

  methods: {

    updateModalOpen(value) {
      this.modalOpen = value;
    },
    
    openModal() {
      if (this.cardSelected) {
        this.modalOpen = true;
        console.log('modalOpen settato a true');
      } else {
        console.log('modalOpen non può essere aperto perché cardSelected non è true');
      }
    },

    selectCard(card) {
      this.firstRowCards.forEach((c) => {
        c.isSelected = false;
      });
      this.secondRowCards.forEach((c) => {
        c.isSelected = false;
      });
      card.isSelected = true;
      this.cardSelected = true;
    },

    toggleSelect(card) {
      card.isSelected = !card.isSelected;
      this.cardSelected = card.isSelected;
    }
}

}
</script>

<style scoped>
.number-span {
  display: inline-block;
  width: 60px; 
  height: 30px; 
  text-align: center; 
  line-height: 30px; 
  border: 1px solid black; 
  border-radius: 10%;
}
</style>
