<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppIcon from '@/components/common/AppIcon.vue';
import { fetchProductListById } from '@/components/locate/Api.js';

// Definisci le proprietà del componente
const props = defineProps({
  tableName: String,
  columnName: String
});

// Variabili reactive per mantenere lo stato
const productList = ref([]);

// Effettua la richiesta dei dati quando il componente viene montato
onMounted(() => {
  // Eseguire la richiesta solo se tableName e columnName sono stati forniti come props
  if (props.tableName && props.columnName) {
    fetchProductListById(props.tableName, props.columnName)
      .then((data: any) => {
        productList.value = data;
      })
      .catch((error: any) => {
        console.error('Errore durante la richiesta:', error);
      });
  }
});
</script>

<template>
    <div class="select-container w-100">
      <select class="custom-select" name="test" id="">
        <option v-for="item of productList" :value=item.id>{{item.name}}</option>
      </select>
      <app-icon class="custom-icon" type="small_arr_down" color="#000" size="sm"></app-icon>
    </div>
    <!-- Aggiungi qui il tuo codice per visualizzare i dati del productList -->
</template>

<style>
/* Stile per il contenitore della select */
.select-container {
  position: relative;
  display: inline-block;
  width: max-content;
}

/* Stile per la select personalizzata */
.custom-select {
  padding-right: 35px !important;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.custom-select,
option {
  color: #000;
}

.custom-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  /* Regola la distanza dell'icona dalla select come preferisci */
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
