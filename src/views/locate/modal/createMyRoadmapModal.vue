<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { useLocateRoadmapStore } from '@/store/locate/locateRoadmapStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const locateStore = useLocateStore();
const { modalStates, activeLocateSearchCategory} = storeToRefs(locateStore);

const { roadmaps } = storeToRefs(useLocateRoadmapStore());
const { saveRoadmap } = useLocateRoadmapStore();

const newRoadmapData = ref({
	name: '',
	location: '',
	dateStart: '',
	dateEnd: '',
	begin_country: '',
	begin_city: '',
	begin_address: '',
	image_url: '',
	image_path: '',
});

async function  handleSaveRoadmapClick(){
	if(newRoadmapData.value.name) {
		modalStates.value.createMyRoadmap = false;
		const newRoadmap = await saveRoadmap({
			"date_tour_planned": newRoadmapData.value.dateStart,
			"begin_country": newRoadmapData.value.begin_country,
			"begin_city": newRoadmapData.value.begin_city,
			"begin_address": newRoadmapData.value.begin_address,
			"name": newRoadmapData.value.name,
			"image_url": newRoadmapData.value.image_url,
			"image_path": newRoadmapData.value.image_path
		});
	}else{
		alert('Roadmap name required');
	}
}

</script>
<template>
		<Modal :is-modal-open="modalStates.createMyRoadmap" @overlay-click="modalStates.createMyRoadmap = false">
      <div class="flex flex-col gap-5 bg-white p-8 sm:w-[400px] max-w-[90vw] rounded-lg shadow-lg relative">
				<app-icon class="absolute top-10 right-10" @click="modalStates.createMyRoadmap = false" type="close" color="#000" size="sm"></app-icon>

				<div class="flex justify-center">
					<div class="rounded-full bg-[#FFF4C7] border-8 border-[#FFE786] p-4">
						<app-icon type="locate" color="#FFC107"></app-icon>
					</div>
				</div>

				<p class="font-semibold text-center">Do you want to save your roadmap?</p>

				<ul class="flex flex-col items-center gap-2 list-inside list-disc text-[#6C757D] font-thin text-center">
					<li class="">{{  newRoadmapData.location || 'United State, Massachusetts' }}</li>
					<li class="">Date: {{  newRoadmapData.dateStart || '20/03/23'}} to {{ newRoadmapData.dateEnd || '28/03/23' }}</li>
					<span class="flex flex-wrap gap-2">
						<li v-for="subcategory of activeLocateSearchCategory.subcategories.filter((e, i)=>i < 4 || e.isSelected)">{{ subcategory.name }}</li>
					</span>
				</ul>

				<div>
					<p>Roadmap name</p>
					<input type="text" v-model="newRoadmapData.name" placeholder="Type here" class="w-full outline-none border-[2px] border-[#CED4DA] border-solid rounded py-2 px-4 text-[16px] font-normal palceholder:text-[#ADB5BD] text-black" >
				</div>
				<div class="flex flex-col md:flex-row gap-4">
					<v-btn @click="modalStates.createMyRoadmap = false;" class="bg-[#F8F9FA] text-black md:flex-1">Cancel</v-btn>
					<v-btn @click="handleSaveRoadmapClick()" class="bg-black text-white md:flex-1">Save</v-btn>
				</div>
			</div>
		</Modal>
</template>