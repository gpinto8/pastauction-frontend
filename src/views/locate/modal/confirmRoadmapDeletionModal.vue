<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import { isEventRoadmapData, useLocateRoadmapStore, type EventRoadmapData, type RoadmapData } from '@/store/locate/locateRoadmapStore';
import { useRouter } from 'vue-router';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const { modalStates } = storeToRefs(locateStore);

const roadmapStore = useLocateRoadmapStore();
const { fetchEntityRoadmaps, fetchEventRoadmaps, deleteRoadmap, createRoadmap } = roadmapStore;
const { entityRoadmaps, eventsRoadmaps, roadmapsLoading, detailRoadmap } = storeToRefs(roadmapStore);
const router = useRouter();

async function deleteCurrentRoadmap(){
	if(detailRoadmap.value){
		await deleteRoadmap(detailRoadmap.value);
		router.push('/locate/roadmaps');
	}
};
</script>
<template>
	<Modal :is-modal-open="modalStates.confirmRoadmapDeletionModal" @overlay-click="modalStates.confirmRoadmapDeletionModal = false">
		<div class="flex flex-col gap-5 bg-white p-8 w-full sm:w-96 rounded-lg shadow-lg relative">

			<app-icon class="absolute top-10 right-10" @click="modalStates.confirmRoadmapDeletionModal = false" type="close" color="#000" size="sm"></app-icon>
			
			<div class="flex justify-center">
				<div class="rounded-full border-8 border-dark-700 p-4">
					<app-icon type="pin_map" color="#000" size="sm"></app-icon>
				</div>
			</div>
			<p class="font-semibold text-center">Delete roadmap</p>
			
			<p>Are you sure you want to delete this roadmap?</p>
			<p>This action cannot be undone</p>

			<div class="flex flex-col md:flex-row gap-4">
				<LocateBtn @click="modalStates.confirmRoadmapDeletionModal = false" class="bg-[#F8F9FA] text-black md:flex-1">Cancel</LocateBtn>
				<LocateBtn @click="deleteCurrentRoadmap(); modalStates.confirmRoadmapDeletionModal = false" class="bg-black text-white md:flex-1">Delete</LocateBtn>
			</div>
		</div>
	</Modal>
</template>