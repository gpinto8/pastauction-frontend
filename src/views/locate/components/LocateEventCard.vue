<script setup lang="ts">
import type { LocateExtendedEntityData } from '@/store/locate/locateEntityStore';
import type { LocateExtendedEventData } from '@/store/locate/locateEventStore';
import { makePhoneCall } from '@/store/locate/utils/makePhoneCall';


const props = defineProps<{
	event: LocateExtendedEventData,
}>();

</script>

<template>
	<v-card class="grid justify-items-start gap-2 grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] w-full rounded-lg p-3">

		<!-- card actions/buttons -->
		<div class="col-span-2 md:col-span-1 md:col-start-3 md:justify-self-end w-full flex md:justify-center md:w-fit gap-2 justify-between [&>*]:cursor-pointer">
			<!-- phone icon -->
			<div @click="makePhoneCall(event.entity_phone || event.entity_phone_hand)" class="hover:contrast-75 hidden md:flex h-[34px] w-[34px] rounded bg-[#F0F0F080] justify-center items-center">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.56809 1.66037C4.4943 1.56544 4.40115 1.48731 4.29484 1.43115C4.18853 1.37499 4.07149 1.34209 3.95149 1.33465C3.83149 1.3272 3.71127 1.34537 3.59883 1.38795C3.48639 1.43053 3.3843 1.49655 3.29934 1.58162L2.00684 2.87537C1.40309 3.48037 1.18059 4.33662 1.44434 5.08787C2.53901 8.19735 4.31971 11.0205 6.65434 13.3479C8.98175 15.6825 11.8049 17.4632 14.9143 18.5579C15.6656 18.8216 16.5218 18.5991 17.1268 17.9954L18.4193 16.7029C18.5044 16.6179 18.5704 16.5158 18.613 16.4034C18.6556 16.2909 18.6738 16.1707 18.6663 16.0507C18.6589 15.9307 18.626 15.8137 18.5698 15.7074C18.5136 15.6011 18.4355 15.5079 18.3406 15.4341L15.4568 13.1916C15.3554 13.113 15.2375 13.0584 15.1119 13.032C14.9863 13.0055 14.8563 13.008 14.7318 13.0391L11.9943 13.7229C11.6289 13.8142 11.2461 13.8093 10.8831 13.7088C10.5202 13.6083 10.1894 13.4154 9.92309 13.1491L6.85309 10.0779C6.58655 9.81167 6.3935 9.48097 6.29273 9.11799C6.19196 8.75501 6.18692 8.37213 6.27809 8.00662L6.96309 5.26912C6.99422 5.14461 6.99667 5.01466 6.97026 4.88907C6.94384 4.76348 6.88924 4.64553 6.81059 4.54412L4.56809 1.66037ZM2.35559 0.639119C2.57433 0.420306 2.83712 0.250532 3.12651 0.14107C3.4159 0.0316089 3.72527 -0.0150353 4.03407 0.00423504C4.34286 0.0235054 4.64403 0.108249 4.91757 0.25284C5.1911 0.39743 5.43075 0.598558 5.62059 0.842869L7.86309 3.72537C8.27434 4.25412 8.41934 4.94287 8.25684 5.59287L7.57309 8.33037C7.53774 8.47216 7.53965 8.62068 7.57863 8.76151C7.61762 8.90234 7.69236 9.0307 7.79559 9.13412L10.8668 12.2054C10.9704 12.3088 11.099 12.3837 11.24 12.4227C11.3811 12.4617 11.5299 12.4634 11.6718 12.4279L14.4081 11.7441C14.7289 11.6639 15.0637 11.6577 15.3872 11.7259C15.7107 11.7941 16.0145 11.935 16.2756 12.1379L19.1581 14.3804C20.1943 15.1866 20.2893 16.7179 19.3618 17.6441L18.0693 18.9366C17.1443 19.8616 15.7618 20.2679 14.4731 19.8141C11.1746 18.6535 8.17968 16.7652 5.71059 14.2891C3.2347 11.8204 1.34635 8.82594 0.185589 5.52787C-0.266911 4.24037 0.139339 2.85662 1.06434 1.93162L2.35684 0.639119H2.35559Z" fill="#212529"/>
				</svg>
			</div>

			<!-- selector -->
			<div class="hover:contrast-75 h-[34px] w-[34px] rounded bg-[#F0F0F080] flex justify-center items-center">
				<input class="h-1/2 w-1/2" type="checkbox" name="" id="">
			</div>


			<!-- open/close icon -->
			<div @click="event.isOpenDetails = !event.isOpenDetails" class="hover:contrast-75 h-[34px] w-[34px] rounded bg-[#F0F0F080] flex justify-center items-center">
				<!-- plus -->
				<svg v-if="!event.isOpenDetails" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5ZM12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76515 1.26428 3.51472 3.51472C1.26428 5.76515 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76515 22.7357 8.8174 24 12 24Z" fill="#212529"/>
					<path d="M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6Z" fill="#212529"/>
				</svg>
				<!-- minus -->
				<svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5ZM12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76515 1.26428 3.51472 3.51472C1.26428 5.76515 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76515 22.7357 8.8174 24 12 24Z" fill="#212529"/>
					<path d="M6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12Z" fill="#212529"/>
				</svg>
			</div>
		</div>

		<!-- event img -->
		<img class="h-12 lg:h-14 md:col-start-1 md:row-start-1 aspect-square rounded-full object-cover" src="@/assets/images/create_garage.png" alt="">
		
		<div class="md:col-start-2 md:row-span- md:row-start-1">
			<!-- name -->
			<div class="text-lg font-semibold">Museum Villa Ford of Orange</div>
			<!-- short description -->
			<div class="text-sm font-medium md:mt-2 md:text-base">Historical collection exhibition</div>
		</div>

		<!-- details box -->
		<div v-if="event.isOpenDetails" class="col-span-full w-full flex flex-col gap-2 mb-6 lg:grid lg:grid-cols-[auto_1fr]">
			<div class="flex gap-3 items-center">
				<span class="text-lg font-semibold">Event category</span>
				<span class="text-lg font-medium">Museum</span>
			</div>

			<div class="col-span-2 row-start-6 text-[#0D6EFD] underline lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:justify-self-end">www.villaford.com</div>

			<div class="w-full  !rounded-lg !overflow-hidden">
				<img class="w-full h-[182px] lg:w-[316px] object-cover" src="@/assets/images/create_garage.png" alt="">
			</div>
			<!-- long description box -->
			<div class="border-[1px] border-solid border-[#CED4DA] rounded p-2 py-4 px-2 flex flex-col gap-2">

				<div @click="event.isOpenDescription = !event.isOpenDescription" class="flex items-center justify-between">
					<div>Description</div>

					<svg :class="{'rotate-180': event.isOpenDescription}" class="md:hidden duration-75" width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0.470341 0.97034C0.540009 0.900495 0.622773 0.845081 0.71389 0.807271C0.805008 0.769462 0.90269 0.75 1.00134 0.75C1.09999 0.75 1.19767 0.769462 1.28879 0.807271C1.37991 0.845081 1.46267 0.900495 1.53234 0.97034L10.0013 9.44084L18.4703 0.97034C18.5401 0.900608 18.6229 0.845294 18.714 0.807555C18.8051 0.769817 18.9027 0.750393 19.0013 0.750393C19.1 0.750393 19.1976 0.769817 19.2887 0.807555C19.3798 0.845294 19.4626 0.900608 19.5323 0.97034C19.6021 1.04007 19.6574 1.12286 19.6951 1.21396C19.7329 1.30507 19.7523 1.40272 19.7523 1.50134C19.7523 1.59996 19.7329 1.69761 19.6951 1.78872C19.6574 1.87982 19.6021 1.96261 19.5323 2.03234L10.5323 11.0323C10.4627 11.1022 10.3799 11.1576 10.2888 11.1954C10.1977 11.2332 10.1 11.2527 10.0013 11.2527C9.90269 11.2527 9.80501 11.2332 9.71389 11.1954C9.62277 11.1576 9.54001 11.1022 9.47034 11.0323L0.470341 2.03234C0.400496 1.96267 0.345082 1.87991 0.307272 1.78879C0.269462 1.69767 0.25 1.59999 0.25 1.50134C0.25 1.40269 0.269462 1.30501 0.307272 1.21389C0.345082 1.12277 0.400496 1.04001 0.470341 0.97034Z" fill="#212529"/>
					</svg>
				</div>

				<!-- long description content -->
				<div :class="{'hidden': !event.isOpenDescription}" class="text-[#6C757D] md:!block">{{ event.event_description }}</div>
			</div>

			<div class="text-lg font-semibold">Begin</div>
			<!-- Begin box -->
			<div class="grid grid-cols-2 [&>*]:col-span-2 md:grid-cols-12 md:[&>*]:col-span-12 gap-2 mt-2 lg:col-span-2 lg:grid-cols-6 lg:[&>*]:!col-span-1">

				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Date</span>
					<span class="pl-2 text-[#6C757D]">25/01/23</span>
				</div>

				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Country</span>
					<span class="pl-2 text-[#6C757D]">Country</span>
				</div>

				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">City</span>
					<span class="pl-2 text-[#6C757D]">City</span>
				</div>

				<div class="md:col-span-3 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Address</span>
					<span class="pl-2 text-[#6C757D]">Address</span>
				</div>

				<div class="!col-span-1 md:!col-span-6 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Latit</span>
					<span class="pl-2 text-[#6C757D]">City latit</span>
				</div>

				<div class="!col-span-1 md:!col-span-6 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Longit</span>
					<span class="pl-2 text-[#6C757D]">City longit</span>
				</div>

			</div>


			<div class="text-lg font-semibold">End</div>
			<!-- End box -->
			<div class="grid grid-cols-2 [&>*]:col-span-2 md:grid-cols-12 md:[&>*]:col-span-12 gap-2 mt-2 lg:col-span-2 lg:grid-cols-6 lg:[&>*]:!col-span-1">

				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Date</span>
					<span class="pl-2 text-[#6C757D]">25/01/23</span>
				</div>

				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Country</span>
					<span class="pl-2 text-[#6C757D]">Country</span>
				</div>
				
				<div class="md:!col-span-4 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">City</span>
					<span class="pl-2 text-[#6C757D]">City</span>
				</div>

				<div class="md:col-span-3 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Address</span>
					<span class="pl-2 text-[#6C757D]">Address</span>
				</div>

				<div class="!col-span-1 md:!col-span-6 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Latit</span>
					<span class="pl-2 text-[#6C757D]">City latit</span>
				</div>

				<div class="!col-span-1 md:!col-span-6 flex flex-col gap-2 border-b-[1px] border-solid border-[#CED4DA] pb-1">
					<span class="">Longit</span>
					<span class="pl-2 text-[#6C757D]">City longit</span>
				</div>

			</div>

		</div>

		<span class="col-span-2 text-center ml-8 text-[#6C757D]">• Museum • 450 m</span>

		<span class="col-span-2 row-start-6 ml-8 md:col-start-3 md:row-span-2 md:col-span-1 text-[#0D6EFD] underline">www.villaford.com</span>

		<span class="col-span-2 text-center ml-8 text-[#6C757D]"><span class="text-green-700">Open</span> 15:00 Closes at 21:00</span>

		<!-- adress -->
		<div class="col-span-2 text-center flex gap-1 ml-8">
			<!-- pin icon -->
			<svg class="mt-1" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 16.5C6 16.5 12 10.814 12 6.5C12 4.9087 11.3679 3.38258 10.2426 2.25736C9.11742 1.13214 7.5913 0.5 6 0.5C4.4087 0.5 2.88258 1.13214 1.75736 2.25736C0.632141 3.38258 2.37122e-08 4.9087 0 6.5C0 10.814 6 16.5 6 16.5ZM6 9.5C5.20435 9.5 4.44129 9.18393 3.87868 8.62132C3.31607 8.05871 3 7.29565 3 6.5C3 5.70435 3.31607 4.94129 3.87868 4.37868C4.44129 3.81607 5.20435 3.5 6 3.5C6.79565 3.5 7.55871 3.81607 8.12132 4.37868C8.68393 4.94129 9 5.70435 9 6.5C9 7.29565 8.68393 8.05871 8.12132 8.62132C7.55871 9.18393 6.79565 9.5 6 9.5Z" fill="#DC3545"/>
			</svg>

			<!-- address -->
			<span class="text-left text-[#6C757D]">2550 N Tustin St Orange, CA 92865</span>
		</div>

		<!-- rating -->
		<div class="col-span-2 md:col-start-3 md:justify-self-end ml-8 flex items-center gap-1">
			<!-- stars  -->
			<span>4.7</span>

			<!-- star icon -->
			<svg class="mt-1" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.74168 0.638724C5.98116 -0.0983248 7.02389 -0.0983244 7.26337 0.638724L8.11903 3.27216C8.22613 3.60178 8.53329 3.82495 8.87987 3.82495H11.6488C12.4238 3.82495 12.746 4.81664 12.1191 5.27216L9.87892 6.89971C9.59853 7.10343 9.48121 7.46452 9.58831 7.79414L10.444 10.4276C10.6834 11.1646 9.83986 11.7775 9.21289 11.322L6.97275 9.69445C6.69236 9.49074 6.31269 9.49074 6.0323 9.69445L3.79216 11.322C3.16519 11.7775 2.32161 11.1646 2.56109 10.4276L3.41674 7.79414C3.52384 7.46452 3.40652 7.10343 3.12613 6.89971L0.885993 5.27216C0.259022 4.81664 0.581242 3.82495 1.35622 3.82495H4.12518C4.47176 3.82495 4.77893 3.60178 4.88602 3.27216L5.74168 0.638724Z" fill="#FFC107"/>
			</svg>
		</div>

	</v-card>
</template>
<style>
	svg {
		overflow: visible;
	}
</style>