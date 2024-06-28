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
    emits('overlay-click');
};
</script>

<template class="modal-overlay ">
    <div class="z-40">
			<div v-if="isModalOpen" @click="handleOverlayClick" class="fixed inset-0 flex items-center justify-center modal-overlay">
				<slot/>
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
  z-index: 100 !important;
}
</style>