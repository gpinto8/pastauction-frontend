<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { defineModel } from "vue";

// Definisci le proprietà del componente
defineProps({
  placeholder: String,
  tableName: String,
  columnName: String,
  items: Array,
});

const emit = defineEmits<{
	(e: 'change', newValue: string): void
}>();

const model = defineModel<string>();

</script>

<template>
    <div class="select-container">
      <select v-model="model" @change="(e) => $emit('change', (e.target as HTMLSelectElement).value)" class="custom-select" name="test" id="">
		<option class="hidden" value="">{{placeholder || 'Select a value'}}</option>
        <option v-for="item of items" :value=item>{{item}}</option>
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
