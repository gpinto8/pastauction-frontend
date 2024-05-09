<template>
  <div class="mt-5 w-full flex-center">
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
      <div fluid no-gutters>
        <div class="grid grid-cols-2 md:grid-cols-3" justify="center">
          <MenuSelection v-for="(card, index) in firstRowCards" :key="index" :card="card" :type="'vehicle'" @change="selectCard($event)"/>
          <MenuSelection v-for="(card, index) in secondRowCards" :key="index" :card="card" :type="'maison'" @change="selectCard($event)"/>
        </div>
      </div>
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
import MenuSelection from './components/MenuSelection.vue';
import axios from 'axios';
import ModalChartsType from './components/ModalChartsType.vue';
import router from '@/router/index';
export default {
  components: {
    ModalChartsType, MenuSelection
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