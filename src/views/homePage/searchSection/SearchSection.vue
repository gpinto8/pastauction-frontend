<script setup lang="ts">

import CarAngles from './assets/carAngles.png'
import Data from './assets/data.png'
import Car from './assets/car.png'

</script>

<template>
    <div class="bg-slate-500 flex flex-col px-24 pt-32 pb-20 relative">
        <img :src="Car" class="absolute right-0 h-3/4 z-10" />
        <div class="text-white text-5xl w-full cormorant-custom-600">
            Advanced and detailed search
        </div>
        <div class="flex flex-1 min-h-0 py-10 justify-between gap-10">
            <img :src="CarAngles" class="h-full" />
            <div class="flex justify-end relative">
                <img :src="Data" class="" />
            </div>
        </div>
        <div class="text-xs text-white/50">
            The long-wheelbase Jaguar XJ Super V8 is a well-preserved example of the marque's former flagship
            saloon, previously in long-term ownership, following its initial use by Sir Jackie Stewart. With low
            mileage and a solid maintenance history with Harwoods Jaguar, it would be a smart addition to any marque
            collection, and could also be put into use as a sophisticated and refined daily driver, or a cosseting
            companion for long-distance excursions. The description of this consignment is, to the best of the
            seller’s knowledge, accurate and not misleading. Collecting Cars requests a range of detail about the
            lot from the seller and performs a level of due diligence. However, potential buyers must independently
            satisfy themselves as to the accuracy of the description. Potential buyers should view or arrange
            inspections as well as conduct any research they feel is necessary before committing to bid or
            buy. Please note that it is not uncommon for classic or collectible vehicles to have received cosmetic
            repairs in the past, either to rectify damage or refresh appearance, and this work may be undetectable
            even upon visual inspection. Unless there is an explicit statement by the seller to the contrary, please
            assume that any vehicle could have had bodywork or paintwork during its life. Furthermore, photographs
            may not reflect the true colour or full condition of the vehicle. It is a bidder’s responsibility to
            satisfy themselves of the colour and condition of a vehicle, including its interior and the existence of
            any remedial bodywork or paintwork, before committing to bid or buy. This includes by raising enquiries
            with the seller in the comments section.   
        </div>
    </div>
</template>