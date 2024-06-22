<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import AppIcon from '@/components/common/AppIcon.vue';
import MySelect from '@/views/locate/components/Select.vue';
import { useLocateStore } from '@/store/locate/locate';
import { isEntityRoadmapData, isEventRoadmapData, useLocateRoadmapStore, type CreateEntityRoadmapBody, type CreateEventRoadmapBody, type EntityEventRoadmapPoint, type EntityRoadmapPoint, type RoadmapData, type VehicleData } from '@/store/locate/locateRoadmapStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import { getCurrentDateFormatted } from '@/store/locate/utils/getCurrentDateFormatted';
import type { LocateExtendedEventData } from '@/store/locate/locateEventStore';
import { httpGet } from '@/api/api';
import axios from 'axios';

const locateStore = useLocateStore();
const { modalStates, activeLocateSearchCategory, items, loadingScreen} = storeToRefs(locateStore);

const { entityRoadmaps, eventsRoadmaps } = storeToRefs(useLocateRoadmapStore());
const { createRoadmap } = useLocateRoadmapStore();
const { roadmapVehicleData } = storeToRefs(useLocateRoadmapStore());

const emits = defineEmits<{
	(event: 'calculate', vehicleData: VehicleData): void
}>();

const formData =  ref({
	// vehicleType: "",
	year: "",
	model: "",
	make: "",
	option: null as Option | null,
	// fuelType: "",
	// fuelCost: "",
	// currencyType: "US$",
	// mileage: "",
});

onMounted(() => {
	roadmapVehicleData.value = null;
});

watch(() => formData.value.year, async () => {
	loadingScreen.value = true;

	roadmapVehicleData.value = null;
	formData.value.make = "";
	formData.value.model = "";
	formData.value.option = null;

	await fetchMakes(formData.value.year);

	loadingScreen.value = false;
});

watch(() => formData.value.make, async () => {
	loadingScreen.value = true;

	roadmapVehicleData.value = null;
	formData.value.model = "";
	formData.value.option = null;

	await fetchModels(formData.value.year, formData.value.make);

	loadingScreen.value = false;
});

watch(() => formData.value.model, async () => {
	loadingScreen.value = true;

	roadmapVehicleData.value = null;
	formData.value.option = null;

	await fetchOptions(formData.value.year, formData.value.make, formData.value.model);

	loadingScreen.value = false;
});

watch(() => formData.value.option, async () => {
	if(!formData.value.option) return;

	loadingScreen.value = true;
	roadmapVehicleData.value = null;

	const vehicle = await fetchVehicle(formData.value.option);

	roadmapVehicleData.value = vehicle;
	roadmapVehicleDataTthumbnailIsLoading.value = true;

	loadingScreen.value = false;
});

const years = ["2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984"];

type Make = {
	"text":string;
	"value":string;
};
const makes = ref<Make[]>([]);

type Model = {
	"text":string;
	"value":string;
};
const models = ref<Model[]>([]);

type Option = {
	"text":string;
	"value":string;
};
const options = ref<Option[]>([]);

const roadmapVehicleDataTthumbnailIsLoading = ref(false);

async function fetchMakes(year: string){
	const response = await (await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`, {
		headers: {
			"Accept": "application/json",
		}
	})).json();

	const data = response as { menuItem: Make | Make[] }
	makes.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchModels(year: string, make: string){
	const response = await (await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/modelNoPhev?year=${year}&make=${make}`, {
		headers: {
			"Accept": "application/json",
		}
	})).json();

	const data = response as { menuItem: Model | Model[] }
	models.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchOptions(year: string, make: string, model: string){
	const response = await (await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`, {
		headers: {
			"Accept": "application/json",
		}
	})).json();

	const data = response as { menuItem: Option | Option[] }
	options.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchVehicle(option: Option){
	const [ response1, response2 ] = await Promise.all([
		await (await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${option.value}`, {
			headers: {
				"Accept": "application/json",
			}
		})).json(),
		// httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/vehicle/${option.value}`),
		await (await fetch(`https://www.fueleconomy.gov/ws/rest/v2/${option.value}`, {
			headers: {
				"Accept": "application/json",
			}
		})).json(),
		// httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/v2/${option.value}`)
	]);

	return { ...response1, ...response2 } as VehicleData;
}

async function calculate(){
	if(!roadmapVehicleData.value) return;

	emits('calculate', roadmapVehicleData.value)

	modalStates.value.calculateCostOfTheTripModal = false;
};

</script>
<template>
		<Modal :is-modal-open="modalStates.calculateCostOfTheTripModal" @overlay-click="modalStates.calculateCostOfTheTripModal = false">
      <div class="flex flex-col gap-3 bg-white p-8 sm:w-[400px] max-w-[90vw] rounded-lg shadow-lg relative">

				<div class="flex justify-between">
					<div class="rounded-full bg-[#FFF4C7] border-8 border-[#FFE786] p-4">
						<app-icon type="locate" color="#FFC107"></app-icon>
					</div>

					<app-icon @click="modalStates.calculateCostOfTheTripModal = false" class="cursor-pointer" type="close" color="#000" size="sm"></app-icon>
				</div>

				<p class="font-semibold">Approximate cost of the trip</p>


				<!-- <div>
					<p>Vehicle type</p>
					<MySelect
						:selected="formData.vehicleType"
						@change="(newValue: string) => (formData.currencyType = newValue)"
						placeholder="Cars"
						:items="[]"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						placeholder-color="#ADB5BD"
						:useOptionSearchFeature="false"
					/>
				</div> -->

				<div>
					<p>Year</p>
					<MySelect
						:selected="formData.year"
						@change="(newValue) => (formData.year = newValue)"
						placeholder="Year"
						:items="years"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						placeholder-color="#ADB5BD"
						:useOptionSearchFeature="false"
					/>
				</div>

				<div>
					<p>Make</p>
					<MySelect
						:selected="formData.make"
						@change="(newValue) => (formData.make = newValue)"
						placeholder="Make"
						:items="makes.map(e => e.value)"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						placeholder-color="#ADB5BD"
						:useOptionSearchFeature="false"
						:disabled="!formData.year"
					/>
				</div>

				<div>
					<p>Model</p>
					<MySelect
						:selected="formData.model"
						@change="(newValue) => (formData.model = newValue)"
						placeholder="Model"
						:items="models.map(e => e.value)"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						placeholder-color="#ADB5BD"
						:useOptionSearchFeature="false"
						:disabled="!formData.make"
					/>
				</div>

				<div>
					<p>Options</p>
					<MySelect
						:selected="formData.option"
						@change="(newValue) => (formData.option = newValue)"
						placeholder="Option"
						:format-item-f-n="(item: Option) => item?.text"
						:items="options"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						placeholder-color="#ADB5BD"
						:useOptionSearchFeature="false"
						:disabled="!formData.model"
					/>
				</div>

				<img v-if="roadmapVehicleData" :src="'https://www.fueleconomy.gov/feg/photos/' + roadmapVehicleData.thumbnail" alt="" @load="roadmapVehicleDataTthumbnailIsLoading = false" class="w-[180px] mx-auto mt-2">
				<div v-if="roadmapVehicleDataTthumbnailIsLoading" role="status" class="mx-auto">
						<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="sr-only">Loading...</span>
				</div>
				<!-- <div>
					<p>Fuel type</p>
					<MySelect
						:selected="formData.fuelType"
						@change="(newValue: string) => (formData.currencyType = newValue)"
						placeholder="Select"
						placeholder-color="#ADB5BD"
						:items="[]"
						variant="primary"
						class="w-full bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
						:useOptionSearchFeature="false"
					/>
				</div> -->

				<!-- <div>
					<p>Fuel cost</p>
					<div class="flex justify-between gap-4 ">
						<input 
							type="1.530"
							v-model="formData.fuelCost"
							placeholder="0.000"
							class="w-full h-[35px] outline-none bg-white border-[1px] border-[#CED4DA] border-solid rounded py-2 px-4 text-[16px] font-normal palceholder:text-[#ADB5BD] text-black"
						>

						<MySelect
							:selected="formData.currencyType"
							@change="(newValue: string) => (formData.currencyType = newValue)"
							:items="['US$', 'EUR€']"
							variant="primary"
							class="w-[70px] bg-white h-[35px] border-[1px] border-[#CED4DA] border-solid !rounded !text-[#212529]"
							placeholder-color="#ADB5BD"
							:useOptionSearchFeature="false"
						/>
					</div>
				</div> -->
				
				<!-- <div>
					<p>Mileage</p>
					<input
						type="text"
						v-model="formData.mileage"
						placeholder="0.000"
						class="w-full h-[35px] outline-none bg-white border-[1px] border-[#CED4DA] border-solid rounded py-2 px-4 text-[16px] font-normal palceholder:text-[#ADB5BD] text-black"
					>
				</div> -->

				<LocateBtn @click="calculate()" class="bg-black text-white w-full mt-4">Calculate</LocateBtn>

			</div>
		</Modal>
</template>