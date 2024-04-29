<template>
  <div class="m-5 w-full flex-center">
    <div class="max-w-[1000px]">
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
          <v-col class="d-flex">
            <img class="me-2" src="@/assets/images/bolt.svg" alt="Immagine blu">
            <span class="me-2 mt-1">Bolts available</span>  
            <v-chip
              class="custom-chip"
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
      <div class="m-5 d-flex align-center justify-center">
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <!-- Prima riga di card -->
      <v-container fluid>
        <v-row justify="center">
          <v-col xs="12" v-for="(card, index) in firstRowCards" :key="index">
            <v-card
              class="mx-auto h-100"
            >
              <v-card-item>
                <div>
                  <div>
                    <v-alert :color="card.isActive ? '#0D6EFD' : 'grey'"  class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                  </div>
                  <div class="d-flex justify-space-around mt-5 mb-5">
                    <img v-if="card.isActive" src="@/assets/images/charts_bluicon.svg" alt="Immagine blu">
                    <img v-else src="@/assets/images/charts_icongrey.svg" alt="Immagine grigio" >
                  </div>
                  <div class="text-caption text-center mt-2 mb-2 d-flex justify-center">
                    <img v-if="card.isActive" src="@/assets/images/v-icon.svg" alt="plan included" width="15">
                    <img v-else-if="!card.isActive" src="@/assets/images/x-circle-fill.svg" alt="plan included" width="15">
                    <img v-else src="@/assets/images/bolt.svg" alt="plan included" width="15">
                    <span class="font-bold mr-1">{{ card.number }}</span>
                    <small v-if="card.isActive">Included in plan</small>
                    <small v-else="!card.isActive">Not available in this plan</small> 
                  </div>
                  <div class="text-caption text-center h-100">{{ card.subtitle }}</div>
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
      <!-- Seconda riga di card -->
      <v-container fluid>
        <v-row justify="center">
          <v-col v-for="(card, index) in secondRowCards" :key="index">
            <v-card
              class="mx-auto h-100"
            >
              <v-card-item>
                <div>
                  <div>
                    <v-alert :color="card.isActive ? '#F3A53F' : 'grey'" class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{ card.title }}</v-alert>
                  </div>
                  <div class="d-flex justify-space-around mt-5 mb-5">
                    <img v-if="card.isActive" src="@/assets/images/chart_iconyellow.svg" alt="Immagine blu">
                    <img v-else src="@/assets/images/charts_icongrey.svg" alt="Immagine grigio" >
                  </div>
                  <div class="text-caption text-center mt-2 mb-2 d-flex justify-center">
                    <img v-if="card.isActive" src="@/assets/images/v-icon.svg" alt="plan included" width="15">
                    <img v-else-if="!card.isActive" src="@/assets/images/x-circle-fill.svg" alt="plan included" width="15">
                    <img v-else src="@/assets/images/bolt.svg" alt="plan included" width="15">
                    <span class="font-bold mr-1">{{ card.number }}</span>
                    <small v-if="card.isActive">Included in plan</small>
                    <small v-else="!card.isActive">Not available in this plan</small> 
                  </div>
                  <div class="text-caption text-center">{{ card.subtitle }}</div>
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
            <v-btn @click="openModal" :disabled="!cardSelected" size="small" class="float-right" color="black">Continue</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <ModalChartsType 
        :modalOpen="modalOpen" 
        :description="selectedDescription" 
        @update:modalOpen="updateModalOpen" 
        @continueClicked="continueProcess"
      />
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import ModalChartsType from './components/ModalChartsType.vue';
import router from '@/router/index';
export default {
  components: {
    ModalChartsType
  },
  data() {
    return {
      modalOpen: false,
      cardSelected: false,
      selectedDescription: '',
      firstRowCards: [] as any[],
      secondRowCards: [] as any[],
      loading: true
      }
  },
  async mounted() {
    try {
      await this.fetchChartSelection();
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  },
  methods: {
    updateModalOpen(value: any) {
      this.modalOpen = value;
    },
    
    openModal() {
      if (this.cardSelected) {
        this.modalOpen = true;
      }
    },
    async fetchChartSelection() {
      try {
        const response = await axios.get('/chart/selection');
        this.firstRowCards = response.data.items.slice(0, 3).map((item: any) => ({
          ...item,
          isActive: item.available === 1 
        }));
        this.secondRowCards = response.data.items.slice(3).map((item: any) => ({
          ...item,
          isActive: item.available === 1 
        }));
        // Imposta lo stato di caricamento su falso quando le card sono caricate
        this.loading = false;
      } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
      }
    },
    continueProcess() {
      router.push({ path: '/charts/filters' });
    },
    selectCard(card: any) {
      this.firstRowCards.forEach((c: any) => {
        c.isSelected = false;
      });
      this.secondRowCards.forEach((c: any) => {
        c.isSelected = false;
      });
      card.isSelected = true;
      this.cardSelected = true;
      const selectedObject: any = this.firstRowCards.find(c => c === card) || this.secondRowCards.find(c => c === card);
      this.selectedDescription = selectedObject.description;
      this.$emit('cardSelected', selectedObject.description);
    },
    toggleSelect(card: any) {
      card.isSelected = !card.isSelected;
      this.cardSelected = card.isSelected;
    }
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