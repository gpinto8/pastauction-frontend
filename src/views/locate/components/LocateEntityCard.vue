<script setup lang="ts">
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import type { LocateExtendedServicesData } from '@/store/locate/locateServiceStore';
import { makePhoneCall } from '@/store/locate/utils/makePhoneCall';


const props = defineProps<{
	entity: LocateExtendedEntityData | LocateExtendedServicesData,
	allowSelect?: boolean,
	hideSelect?: boolean,
	isSelectedDefault?: boolean,
}>();

</script>

<template>
	<v-card class="w-full flex px-2 py-4 gap-2">
		<img class="h-12 lg:h-14 aspect-square rounded-full object-cover" src="@/assets/images/create_garage.png" alt="">
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
								{{ '0.0' }} <app-icon type="star" color="#FFC107" size="sm"></app-icon>
						</p>
				</div>
			</div>
			<!-- SECON BLOCK -->
			<div class="flex flex-col gap-2">
				<!-- DISTANCE -->
				<div>
						<ul class="flex items-center gap-2 list-inside list-disc">
								<li>{{ (entity as LocateExtendedEntityData).kind_name }}</li>
								<li>{{ 'null' }}</li>
						</ul>
				</div>
				<!-- CLOCK -->
				<div>
						<span class="text-green-700">
							Open
						</span>
						<span>
							{{ '00:00' }}
						</span>
						<span>
							Closes at
						</span>
						<span>
							{{ '00:00' }}
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