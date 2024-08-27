<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref, onMounted, onBeforeMount, type Ref, watch, computed, type ComputedRef } from 'vue';
import MySelect from '@/views/locate/components/Select.vue';
import { storeToRefs} from 'pinia'
import { useLocateStore, type Coordinates } from '@/store/locate/locate'
import { useLocateRoadmapStore, type EntityRoadmapData } from '@/store/locate/locateRoadmapStore'

import { scrollElementContent } from '@/utils/ui/scrollElementContent';
import config from '@/config';
import CreateMyRoadmapModal from '@/views/locate/modal/createMyRoadmapModal.vue';
import CannotCreateRoadmapWarningModal from '@/views/locate/modal/cannotCreateRoadmapWarningModal.vue';
import UseMyLocationModal from '@/views/locate/modal/useMyLocationModal.vue';
import RoadmapSuccessfullySavedModal from '@/views/locate/modal/roadmapSuccessfullySavedModal.vue';
import UpgradeMyPlanModal from '@/views/locate/modal/upgradeMyPlanModal.vue';
import CalculateCostOfTheTripModal from '@/views/locate/modal/calculateCostOfTheTripModal.vue';
import { useLocateEventStore, type LocateExtendedEventData } from '@/store/locate/locateEventStore';
import { useLocateServiceStore, type LocateExtendedServicesData } from '@/store/locate/locateServiceStore';
import { useLocateEntityStore, type LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import LocateMap from '@/views/locate/components/LocateMap.vue';
import LocateLocationSearchInput from '@/views/locate/components/LocateLocationSearchInput.vue';
import ConfirmRoadmapDeletionModal from '../locate/modal/confirmRoadmapDeletionModal.vue';

const locateStore = useLocateStore();
const { filterValuesFunctions , getSelectedItems , emitEvent_searchLocation } = locateStore;
const { 
	locateSearchCategories, 
	activeLocateSearchCategory, 
	filterValues, 
	loadingStates, 
	modalStates,
	mapLocationSearchQuery,
	itemsLoading,
	loadingScreen,
} = storeToRefs(locateStore);

const entityStore = useLocateEntityStore();
const { fetchEntities } = entityStore;
const { entities, entitiesLoading } = storeToRefs(entityStore);

const serviceStore = useLocateServiceStore();
const { fetchServices } = serviceStore;
const { services , servicesLoading} = storeToRefs(serviceStore);

const eventStore = useLocateEventStore();
const { fetchEvents } = eventStore;
const { events, eventsLoading } = storeToRefs(eventStore);

const roadmapStore = useLocateRoadmapStore();
const { fetchEntityRoadmaps } = roadmapStore;
const { entityRoadmaps, roadmapsLoading } = storeToRefs(roadmapStore);

</script>

<template>
	<!-- loading screen/animation -->
	<div v-if="itemsLoading || roadmapsLoading || loadingScreen" class="absolute w-full h-full top-0 left-0 bg-[#00000070] z-[200] flex items-center justify-center">
		<svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
		</svg>
		<span class="sr-only">Loading...</span>
	</div>
	<div>
		<!-- modals - start -->
		<CreateMyRoadmapModal />
		<CannotCreateRoadmapWarningModal />
		<UseMyLocationModal />
		<RoadmapSuccessfullySavedModal />
		<UpgradeMyPlanModal />
		<ConfirmRoadmapDeletionModal />
		<!-- <CalculateCostOfTheTripModal /> -->
		<!-- modals - end -->
		
		<div class="flex flex-col gap-4 lg:gap-6 lg:mb-96 mx-auto lg:max-w-[1280px]" :class="{'h-full overflow-hidden': loadingStates.entitiesLoading}">
			<div class="flex flex-col gap-8">
				<div class="mt-4 lg:mt-8 flex basis-full gap-2 justify-between md:justify-start md:[&>*]:flex-[0] [&>*]:flex-1 md:gap-8">
					<v-btn
						size="lg"
						v-for="searchCategory in locateSearchCategories"
						@click="activeLocateSearchCategory = searchCategory"
						:class="{ 'bg-blue-700 shadow-[0px_0px_0px_4px_#3184FD80]': activeLocateSearchCategory.name === searchCategory.name, 'bg-blue': activeLocateSearchCategory.name !== searchCategory.name }"
						class="text-white text-none font-normal md:py-3 md:px-4"
					>
						<span class="hidden md:inline">{{ searchCategory.name }}</span>
						<div class="md:hidden p-1 text-xs flex flex-col justify-center items-center">
							<app-icon :type="searchCategory.iconName" size="md"></app-icon>
							<span>{{ searchCategory.name }}</span>
						</div>
					</v-btn>
				</div>
			</div>

			<router-view v-slot="{ Component, route }">
				<transition>
					<component :is="Component" :key="route.name" />
				</transition>
			</router-view>
		</div>
	</div>

</template>