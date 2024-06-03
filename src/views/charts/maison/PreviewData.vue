<script setup lang="ts">
import SingleData from '../previewData/SingleData.vue';

const props = defineProps<{
    data: any
}>()

</script>

<template>
    <div class="bg-white shadow-2xl px-2 py-5" v-if="Object.keys(data).length > 0">

        <div class="font-bold text-xl mb-5">Statistic Results</div>

        <div class="space-y-3 sm:space-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <SingleData name="Sales turnover" :value="data.total_sales_price_all?.toLocaleString()"/>
            <SingleData name="Vehicles sold" :value="data.count_vehicle_sales_sold?.toLocaleString()"/>
            <SingleData name="Vehicle count" :value="data.number_vehicles?.toLocaleString()"/>
            <SingleData name="Lower estimation GT" :value="data.total_estimation_max_value_all?.toLocaleString()"/>
            <SingleData name="Higher estimation GT" :value="data.total_estimation_min_value_all?.toLocaleString()"/>
            <SingleData name="Sold vehicles" :value="data.average_sales?.toLocaleString()"/>
            <div class="h-[2px] bg-black w-full sm:col-span-full"></div>
            <SingleData name="Gallery " :value="data.ratio_sales?.toLocaleString()"/>
            <SingleData name="Photo " :value="data.with_photo?.toLocaleString()"/>
            <SingleData name="Higher sales price " :value="data.max_sales_price?.toLocaleString()"/>
            <SingleData name="Lower sales price  " :value="data.min_sold?.toLocaleString()"/>
        </div>

    </div>
</template>