<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const {modalStates} = storeToRefs(locateStore);

function openRoadmapList(){
	// to do
};

</script>
<template>
	<Modal :is-modal-open="modalStates.roadmapSuccessfullySaved" @overlay-click="modalStates.roadmapSuccessfullySaved = false">
		<div class="flex flex-col gap-5 bg-white p-8 sm:w-[400px] max-w-[90vw] rounded-lg shadow-lg relative">
			<app-icon class="absolute top-10 right-10" @click="modalStates.roadmapSuccessfullySaved = false" type="close" color="#000" size="sm"></app-icon>

			<div class="flex justify-center">
				<div class="rounded-full bg-[#D1FADF] border-8 border-[#ECFDF3] p-4">
					<app-icon type="check-circle" color="#039855"></app-icon>
				</div>
			</div>

			<p class="font-semibold text-center">Roadmap saved</p>

			<p class="mx-auto mb-4 font-normal text-[#475467]" >Your roadmap was successfully saved</p>

			<div class="flex flex-col md:flex-row gap-4">
				<LocateBtn @click="openRoadmapList(); modalStates.roadmapSuccessfullySaved = false" class="bg-black text-white md:flex-1">Roadmaps list</LocateBtn>
				<LocateBtn @click="modalStates.roadmapSuccessfullySaved = false" class="bg-[#F8F9FA] text-black md:flex-1 border-black"  border>Continue</LocateBtn>
			</div>
		</div>
	</Modal>
</template>