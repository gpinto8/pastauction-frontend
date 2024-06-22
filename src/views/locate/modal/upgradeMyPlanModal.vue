<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const {modalStates} = storeToRefs(locateStore);

</script>
<template>
			<Modal :is-modal-open="modalStates.upgradeMyPlan" @overlay-click="modalStates.upgradeMyPlan = false">
      <div class="flex flex-col gap-5 bg-white p-8 sm:w-[400px] max-w-[90vw] rounded-lg shadow-lg relative">
				<app-icon class="absolute top-10 right-10" @click="modalStates.upgradeMyPlan = false" type="close" color="#000" size="sm"></app-icon>

				<img class="mx-auto w-[185px]" src="@/assets/images/car-dialog-chart.svg" alt="Immagine">

				<p class="font-semibold text-center">Upgrade my plan</p>

				<p class="mx-auto mb-4 font-normal text-[#475467] text-center">To save your roadmap, you must update your plan.</p>

				<div class="flex flex-col md:flex-row gap-4">
					<LocateBtn @click="modalStates.upgradeMyPlan = false;" class="bg-[#F8F9FA] text-black md:flex-1">Cancel</LocateBtn>
					<LocateBtn @click="modalStates.upgradeMyPlan = false;" class="bg-black text-white md:flex-1">Upgrade my plan</LocateBtn>
				</div>
			</div>
		</Modal>
</template>