<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import { useLocateStore } from '@/store/locate/locate';
import { storeToRefs } from 'pinia';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';

const locateStore = useLocateStore();
const { modalStates, currentUserLocationMarker } = storeToRefs(locateStore);

async function useCurrentUserLocation(){
	const c = await getUserLocation();
	if(c && currentUserLocationMarker.value) currentUserLocationMarker.value.position = c;
}

/**  */
async function getUserLocation() {
	return new Promise<{lat: number, lng: number}>((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((geolocationPosition)=>{
				resolve({lat: geolocationPosition.coords.longitude, lng: geolocationPosition.coords.latitude});
			});
		}else{
			reject('Unable to find your location, please make sure to allow the use of location.')
		}
	});
}
</script>
<template>
	<Modal :is-modal-open="modalStates.useMyLocationModalIsOpen" @overlay-click="modalStates.useMyLocationModalIsOpen = false">
		<div class="flex flex-col gap-5 bg-white p-8 sm:w-96 max-w-[90vw] rounded-lg shadow-lg relative">
			<app-icon class="absolute top-10 right-10" @click="modalStates.useMyLocationModalIsOpen = false" type="close" color="#000" size="sm"></app-icon>
			
			<div class="flex justify-center">
				<div class="rounded-full border-8 border-dark-700 p-4">
					<app-icon type="geo-alt" color="#000"></app-icon>
				</div>
			</div>
			<p class="font-bold text-center">Do you want to use your current location?</p>
			<div class="flex flex-col md:flex-row gap-4">
				<LocateBtn @click="modalStates.useMyLocationModalIsOpen = false	" class="bg-[#F8F9FA] text-black md:flex-1">Cancel</LocateBtn>
				<LocateBtn @click="()=>{modalStates.useMyLocationModalIsOpen = false; useCurrentUserLocation()}" class="bg-black text-white md:flex-1">Accept</LocateBtn>
			</div>
		</div>
	</Modal>
</template>