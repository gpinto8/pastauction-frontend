<script setup lang="ts">
const props = defineProps<{
  isModalOpen: boolean;
  background?: boolean;
  autoWidth?: boolean;
  classes?: string;
  closeBtn?: boolean;
}>();
const emits = defineEmits<{
  'overlay-click': void[];
}>();

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

<template class="modal-overlay">
  <div class="z-[9999]">
    <v-slide-y-transition>
      <div
        v-if="isModalOpen"
        @click="handleOverlayClick"
        class="fixed inset-0 items-center justify-center modal-overlay max-h-screen overflow-y-auto"
      >
        <div
          :class="{
            'flex flex-col gap-5 bg-white p-8 w-full rounded-lg shadow-lg relative':
              background,
            'sm:w-96': autoWidth,
            [classes || '']: classes,
          }"
        >
          <div v-if="closeBtn" class="flex justify-end">
            <button @click="closeModal">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#212529"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <slot />
        </div>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<style lang="scss">
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
  padding: 2em;
  > * {
    margin: auto;
  }
}
</style>
