<script setup lang="ts">
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import type { LocateExtendedServicesData, LocateServicesData } from '@/store/locate/locateServiceStore';
import { makePhoneCall } from '@/store/locate/utils/makePhoneCall';
import AppIcon from '@/components/common/AppIcon.vue';
import { useLocateStore } from '@/store/locate/locate';
import { getDistanceFromMapCenterToItemLocation } from '@/store/locate/utils/getDistanceFromMapCenterToItemLocation';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import config from '@/config';

const props = defineProps<{
	entity: LocateExtendedEntityData | LocateExtendedServicesData,
	allowSelect?: boolean,
	hideSelect?: boolean,
	isSelectedDefault?: boolean,
}>();

const locateStore = useLocateStore();
const { currentUserLocationMarker } = storeToRefs(locateStore);

const getDistanceFromMapCenterToItemLocation_value = ref("-");
watch(currentUserLocationMarker , async () => {
	const v = await getDistanceFromMapCenterToItemLocation(props.entity);
	if(v) getDistanceFromMapCenterToItemLocation_value.value = v.toString();
})

const imageUrl = config.apiUrl + '/photo/' + ((props.entity as LocateExtendedEntityData).logo_test || (props.entity as LocateExtendedServicesData).entity_logo);
const imgFailedLoading = ref(false);
</script>

<template>
	<v-card class="w-full flex px-2 py-4 gap-2">
		<img v-if="!imgFailedLoading" class="h-12 lg:h-14 aspect-square rounded-full object-cover" :src="imageUrl" alt="" @error="imgFailedLoading = true">
		<div v-if="imgFailedLoading" class="h-12 lg:h-14 aspect-square rounded-full object-cover bg-zinc-300 flex justify-center items-center">
			<img class="h-6 lg:h-8" src="@/assets/images/building-fill.svg" alt="">
		</div>
		<div class="flex-1">
			<!-- FIRST BLOCK -->
			<div>
				<div class="flex justify-between">
						<!-- TITLE -->
						<div class="flex-1 font-[500]">{{ (entity as LocateExtendedEntityData).name_complete }}</div>
						<!-- BTN -->
						<div class="flex gap-2">
								<div @click="makePhoneCall((entity as LocateExtendedEntityData).phone)" class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
										<app-icon type="phone" color="#000" size="md"></app-icon>
								</div>
								<label
										v-if="!hideSelect"
										class="flex justify-center  items-center bg-gray-200 w-8 h-8 rounded cursor-pointer">
										<input type="checkbox" v-model="entity.isSelected" :disabled="!allowSelect" :checked="allowSelect ? entity.isSelected : (typeof isSelectedDefault === 'boolean' ? isSelectedDefault : entity.isSelected)">
								</label>
						</div>
				</div>
				<!-- RATINGS -->
				<div>
						<p class="flex items-center gap-2">
								{{ '-1' }} <app-icon type="star" color="#FFC107" size="sm"></app-icon>
						</p>
				</div>
			</div>
			<!-- SECON BLOCK -->
			<div class="flex flex-col gap-2 text-[#6C757D]">
				<!-- DISTANCE -->
				<div>
						<ul class="flex items-center gap-2 list-inside list-disc">
								<li>{{ (entity as LocateExtendedEntityData).kind_name }}</li>
								<li>{{ getDistanceFromMapCenterToItemLocation_value || "" }}</li>
						</ul>
				</div>
				<!-- CLOCK -->
				<div>
						<span class="text-green-700">
							Open
						</span>
						<span>
							{{ (entity as LocateExtendedEntityData).time_open }}
						</span>
						<span>
							Closes at
						</span>
						<span>
							{{ (entity as LocateExtendedEntityData).time_open }}
						</span>
				</div>
				<!-- LOCATION -->
				<div class="flex gap-1 items-center">
						<app-icon type="marker" color="#ff0000" size="md"></app-icon>
						<p>
								{{ (entity as LocateExtendedEntityData).address }}
						</p>
				</div>
				<!-- SITE -->
				<div>
						<a :href="(entity as LocateExtendedEntityData).website">{{(entity as LocateExtendedEntityData).website}}</a>
				</div>
			</div>
		</div>
	</v-card>
</template>
<style scoped>
	* {
		position: relative;
	}

.card {
    @apply p-10 rounded-lg bg-white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
}

/*TAGS*/
.my_tag_icon_box {
    width: 70px;
    height: 60px;
}

/* Stile per la select personalizzata */
.custom-select {
    padding-right: 35px !important;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

.custom-select,
option {
    color: #000;
}

/* Stile per il componente icona */
.custom-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    /* Regola la distanza dell'icona dalla select come preferisci */
    transform: translateY(-50%);
    pointer-events: none;
}
</style>