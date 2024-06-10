<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import { useLocateStore } from '@/store/locate/locate';
import { isEntityRoadmapData, isEventRoadmapData, useLocateRoadmapStore, type CreateEntityRoadmapBody, type CreateEventRoadmapBody, type EntityEventRoadmapPoint, type EntityRoadmapPoint, type RoadmapData } from '@/store/locate/locateRoadmapStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import { getCurrentDateFormatted } from '@/store/locate/utils/getCurrentDateFormatted';
import type { LocateExtendedEventData } from '@/store/locate/locateEventStore';
import type { LocateExtendedServicesData } from '@/store/locate/locateServiceStore';
import AppIcon from '@/components/common/AppIcon.vue';

const locateStore = useLocateStore();
const { getSelectedItems } = locateStore;
const { modalStates, activeLocateSearchCategory, items} = storeToRefs(locateStore);

const { entityRoadmaps, eventsRoadmaps } = storeToRefs(useLocateRoadmapStore());
const { createRoadmap } = useLocateRoadmapStore();

const newRoadmapData = ref<Partial<CreateEntityRoadmapBody | CreateEventRoadmapBody>>({});

async function handleSaveRoadmapClick(){
	let points:  Partial<EntityRoadmapPoint>[] | Partial<EntityEventRoadmapPoint>[] = [];

	if(isEntityRoadmapData(newRoadmapData.value)){
		if(!newRoadmapData.value.name) return alert('Roadmap name required');

		points = (items.value as LocateExtendedEntityData[]).filter(e => e.isSelected).map(e => ({
			"id_entity_entity": e.id,
			"preferred": true,
		}));
	}	else if(isEventRoadmapData(newRoadmapData.value)) {
		if(!newRoadmapData.value.event_name) return alert('Roadmap name required');

		const selectedEvents = (items.value as LocateExtendedEventData[]).filter(e => e.isSelected);
		points = selectedEvents.map(e => ({
			"id_entity_event": e.event_id_key,
			"preferred": true
		}));
	}

	function isEntityRoadmapPoint(data: Partial<EntityRoadmapPoint> | Partial<EntityRoadmapPoint>[]): data is EntityRoadmapPoint | EntityRoadmapPoint[] {
		return true;
	}

	/** to do */
	const userHasSubscription = true;
	if(userHasSubscription){
		if(isEntityRoadmapPoint(points)){
			const newRoadmap = await createRoadmap(newRoadmapData.value as CreateEventRoadmapBody, points);
		}
		modalStates.value.createMyRoadmap = false;
	} else {
		modalStates.value.upgradeMyPlan = true;
		modalStates.value.createMyRoadmap = false;
	}
}

function onRoadmapNameChange(v: string){
	if(isEntityRoadmapData(newRoadmapData.value)) newRoadmapData.value.name = v;
	if(isEventRoadmapData(newRoadmapData.value)) newRoadmapData.value.event_name = v;
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
					<li class="">{{  newRoadmapData.begin_address || 'United State, Massachusetts' }}</li>
					<li class="">Date: {{  newRoadmapData.date_creation || '20/03/23'}} to {{ newRoadmapData.date_tour_planned || '28/03/23' }}</li>
					<span class="flex flex-wrap justify-center gap-2">
						<li v-for="subcategory of getSelectedItems()">{{ (subcategory as LocateExtendedEntityData).kind_name || (subcategory as LocateExtendedEventData).kind_name }}</li>
					</span>
				</ul>

				<div>
					<p>Roadmap name</p>
					<input 
						type="text"
						:value="(newRoadmapData as any).name || (newRoadmapData as any).event_name"
						@change="onRoadmapNameChange(($event.target as any).value)"
						placeholder="Type here"
						class="w-full outline-none border-[2px] border-[#CED4DA] border-solid rounded py-2 px-4 text-[16px] font-normal palceholder:text-[#ADB5BD] text-black"
					>
				</div>
				<div class="flex flex-col md:flex-row gap-4">
					<LocateBtn @click="modalStates.createMyRoadmap = false;" class="bg-[#F8F9FA] !text-black md:flex-1 shadow-sm">Cancel</LocateBtn>
					<LocateBtn @click="handleSaveRoadmapClick()" class="bg-black text-white md:flex-1">Save</LocateBtn>
				</div>
			</div>
		</Modal>
</template>