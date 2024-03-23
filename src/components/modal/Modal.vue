<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['isModalOpen']);
const emits = defineEmits();

const handleOverlayClick = (event: MouseEvent) => {
  // Assicurati che il clic provenga dallo sfondo opaco
  if (event.target === event.currentTarget) {
    closeModal();
  }
};
const closeModal = () => {
    // Emetti un evento per notificare al genitore la chiusura della modale
    emits('close-modal');
};
</script>

<template class="modal-overlay">
    <div class="z-40">
        <div v-if="isModalOpen" @click="handleOverlayClick" class="fixed inset-0 flex items-center justify-center modal-overlay">
            <div class="flex flex-col gap-5 bg-white p-8 w-full sm:w-96 rounded-lg shadow-lg relative">
                <app-icon class="absolute top-10 right-10" @click="closeModal" type="close" color="#000" size="sm"></app-icon>
                
                <div class="flex justify-center">
                    <div class="rounded-full border-8 border-dark-700 p-4">
                        <app-icon type="pin_map" color="#000" size="sm"></app-icon>
                    </div>
                </div>
                <p>Before you create your roadmap, you have to select your points of interest</p>
                <v-btn @click="closeModal" class="bg-black text-white">Accept</v-btn>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
/* Aggiungi questo stile per lo sfondo opaco */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7); /* Colore grigio con opacità 0.2 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999!important;
}
</style>