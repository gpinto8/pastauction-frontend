<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue';
import LocateBtn from '@/views/locate/components/LocateBtn.vue';
import AppIcon from '@/components/common/AppIcon.vue';
import MySelect from '@/views/locate/components/Select.vue';
import { useLocateStore } from '@/store/locate/locate';
import { isEntityRoadmapData, isEventRoadmapData, useLocateRoadmapStore, type CreateEntityRoadmapBody, type CreateEventRoadmapBody, type EntityEventRoadmapPoint, type EntityRoadmapPoint, type RoadmapData } from '@/store/locate/locateRoadmapStore';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import { getCurrentDateFormatted } from '@/store/locate/utils/getCurrentDateFormatted';
import type { LocateExtendedEventData } from '@/store/locate/locateEventStore';
import { httpGet } from '@/api/api';
import axios from 'axios';

const locateStore = useLocateStore();
const { modalStates, activeLocateSearchCategory, items, loadingScreen} = storeToRefs(locateStore);

const { entityRoadmaps, eventsRoadmaps } = storeToRefs(useLocateRoadmapStore());
const { createRoadmap } = useLocateRoadmapStore();

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

watch(() => formData.value.year, async () => {
	loadingScreen.value = true;
	formData.value.make = "";
	formData.value.model = "";
	formData.value.option = null;
	await fetchMakes(formData.value.year);
	loadingScreen.value = false;
});

watch(() => formData.value.make, async () => {
	loadingScreen.value = true;
	formData.value.model = "";
	formData.value.option = null;
	await fetchModels(formData.value.year, formData.value.make);
	loadingScreen.value = false;
});

watch(() => formData.value.model, async () => {
	loadingScreen.value = true;
	formData.value.option = null;
	await fetchOptions(formData.value.year, formData.value.make, formData.value.model);
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

const sampleVehicle = {"atvType":"Hybrid","battery":"-1","c240Dscr":"","c240bDscr":"","charge120":"0.0","charge240":"0.0","charge240b":"0.0","city08":"27","city08U":"26.5354","cityA08":"0","cityA08U":"0.0","cityCD":"0.0","cityE":"0.0","cityMpk":"0","cityUF":"0.0","cityUmpk":"0.0","co2":"295","co2A":"-1","co2City":"329","co2CityA":"-1","co2Highway":"253","co2HighwayA":"-1","co2RatingForGas":"6","comb08":"30","combA08":"0","combE":"0.0","combMpk":"0","combUmpk":"0.0","combinedCD":"0.0","displCylindersTrany":"2.0 L, 4 cyl, Automatic (S8), Turbo","drive":"Rear-Wheel Drive","eng_dscr":"SIDI & PFI; Mild Hybrid","evMotor":"44V Li-Ion","fuelType":"Premium","fuelType1Abbrev":"","fuelType1Long":"Premium Gasoline","fuelType1Short":"Prem","fuelType2Long":"","fuelType2Short":"","fuelTypeAsOne":"Premium Gas","ghgScore":"6","ghgScoreA":"-1","guzzler":"","highway08":"35","highway08U":"34.6716","highwayA08":"0","highwayA08U":"0.0","highwayCD":"0.0","highwayE":"0.0","highwayMpk":"0","highwayUF":"0.0","highwayUmpk":"0.0","hlv":"0","hpv":"0","id":"47767","lv2":"9","lv4":"0","make":"BMW","maxTankSize":"0.0","minTankSize":"15.6","model":"430i Convertible","msrpLabel":"","msrpMax":"0","msrpMin":"0","pv2":"84","pv4":"0","range":"0","rangeA":"","rangeCity":"0.0","rangeCityA":"0.0","rangeCs":"0.0","rangeDesc":"","rangeHwy":"0.0","rangeHwyA":"0.0","startStop":"Y","thumbnail":"2024_BMW_430i_Conv.jpg","trans_dscr":"","UCity":"34.5325","UCityA":"0.0","UHighway":"50.4657","UHighwayA":"0.0","usesGasoline":"true","VClass":"Subcompact Cars","year":"2025","sCharger":"","tCharger":"T"};
type Vehicle = typeof sampleVehicle;

async function fetchMakes(year: string){
	const response = await httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`);
	const data = response.data as { menuItem: Make | Make[] }
	// const response = await axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`, { headers: {}}) as any as { menuItem: Make | Make[] };
	makes.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchModels(year: string, make: string){
	const response = await httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/vehicle/menu/modelNoPhev?year=${year}&make=${make}`);
	const data = response.data as { menuItem: Model | Model[] }
	models.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchOptions(year: string, make: string, model: string){
	const response = await httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`);
	const data = response.data as { menuItem: Option | Option[] }
	options.value = Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

async function fetchVehicle(option: Option){
	const response = await httpGet(`https://corsproxy.io/?https://www.fueleconomy.gov/ws/rest/v2/${option.value}`);
	return response.data as Vehicle;
}

async function calculate(){
	if(!formData.value.option) return;

	loadingScreen.value = true;

	const vehicle = await fetchVehicle(formData.value.option);

	loadingScreen.value = false;

};

</script>
<template>
		<Modal :is-modal-open="modalStates.calculateCostOfTheTripModal" @overlay-click="modalStates.calculateCostOfTheTripModal = false">
      <div class="flex flex-col gap-3 bg-white p-8 sm:w-[400px] max-w-[90vw] rounded-lg shadow-lg relative">

				<div class="flex justify-between">
					<div class="rounded-full bg-[#FFF4C7] border-8 border-[#FFE786] p-4">
						<app-icon type="locate" color="#FFC107"></app-icon>
					</div>

					<app-icon @click="modalStates.calculateCostOfTheTripModal = false" type="close" color="#000" size="sm"></app-icon>
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