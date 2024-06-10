<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const { modalStates } = storeToRefs(locateStore);

</script>
<template>
	<Modal :is-modal-open="modalStates.cannotCreateRoadmapWarning" @overlay-click="modalStates.cannotCreateRoadmapWarning = false">
		<div class="flex flex-col gap-5 bg-white p-8 w-full sm:w-96 rounded-lg shadow-lg relative">

			<app-icon class="absolute top-10 right-10" @click="modalStates.cannotCreateRoadmapWarning = false" type="close" color="#000" size="sm"></app-icon>
			
			<div class="flex justify-center">
				<div class="rounded-full border-8 border-dark-700 p-4">
					<app-icon type="pin_map" color="#000" size="sm"></app-icon>
				</div>
			</div>
			<p>Before you create your roadmap, you have to select your points of interest</p>
			<LocateBtn @click="modalStates.cannotCreateRoadmapWarning = false" class="bg-black text-white">Accept</LocateBtn>
		</div>
	</Modal>
</template>