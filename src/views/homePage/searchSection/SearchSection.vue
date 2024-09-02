<script setup lang="ts">

import CarAngles from './assets/carAngles.png'
import Data from './assets/data.png'
import Car from './assets/car.png'

import Angle1 from './assets/angles/angle-1.png';
import Angle2 from './assets/angles/angle-2.png';
import Angle3 from './assets/angles/angle-3.png';
import Angle4 from './assets/angles/angle-4.png';
import Angle5 from './assets/angles/angle-5.png';
import Angle6 from './assets/angles/angle-6.png';
import Angle7 from './assets/angles/angle-7.png';
import Angle8 from './assets/angles/angle-8.png';
import Angle9 from './assets/angles/angle-9.png';
import Angle10 from './assets/angles/angle-10.png';
import Angle11 from './assets/angles/angle-11.png';
import Angle12 from './assets/angles/angle-12.png';
import Angle13 from './assets/angles/angle-13.png';
import Angle14 from './assets/angles/angle-14.png';
import Angle15 from './assets/angles/angle-15.png';
import Angle16 from './assets/angles/angle-16.png';
import Angle17 from './assets/angles/angle-17.png';
import Angle18 from './assets/angles/angle-18.png';
import Angle19 from './assets/angles/angle-19.png';
import Angle20 from './assets/angles/angle-20.png';

const angles = [
    Angle1,
    Angle2,
    Angle3,
    Angle4,
    Angle5,
    Angle6,
    Angle7,
    Angle8,
    Angle9,
    Angle10,
    Angle11,
    Angle12,
    Angle13,
    Angle14,
    Angle15,
    Angle16,
    Angle17,
    Angle18,
    Angle19,
    Angle20,
];

</script>

<template>
    <div class="bg-slate-500 flex flex-col px-24 pt-32 pb-20 relative">
        <img :src="Car" class="absolute right-0 h-3/4 z-10" />
        <div class="text-white text-5xl w-full cormorant-custom-600">
            Advanced and detailed search
        </div>
        <div class="flex flex-1 min-h-0 py-10 justify-between gap-10">
            <!-- <img :src="CarAngles" class="h-full" /> -->
            <div class="grid grid-cols-4 grid-rows-5 gap-1">
                <div class="overflow-hidden" v-for="angle of angles">
                    <img class="h-full object-cover hover:scale-110 transition-transform" :src="angle" />
                </div>
            </div>
            <div class="flex justify-end relative">
                <img :src="Data" />
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