<script setup lang="ts">
import SingleData from './SingleData.vue';

const props = defineProps<{
    data: any
}>()

</script>

<template>
    <div class="bg-white shadow-2xl px-2 py-5" v-if="data != null">

        <div class="font-bold text-xl mb-5">Statistic Results</div>

        <div class="space-y-3 sm:space-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <SingleData name="Largest sale" :value="data.max_sales_price_gt.toLocaleString()"/>
            <SingleData name="Lower estimation avg" :value="data.total_estimation_min_value_all.toLocaleString()"/>
            <SingleData name="Higher estimation avg" :value="data.total_estimation_max_value_all.toLocaleString()"/>
            <SingleData name="Total sales amount" :value="data.total_sales_price_sold.toLocaleString()"/>
            <SingleData name="Sales amount avg" :value="data.average_sales.toLocaleString()"/>
            <SingleData name="Smallest sale" :value="data.total_min_sold.toLocaleString()"/>
            <div class="h-[2px] bg-black w-full sm:col-span-full"></div>
            <SingleData name="Chassis code" :value="data.unsold_vehicles.toLocaleString()"/>
            <SingleData name="With Quotation" :value="data.count_with_estimations.toLocaleString()"/>
            <SingleData name="Brand count" :value="data.total_ratio_sales.toLocaleString()"/>
            <SingleData name="Vehicle ount" :value="data.count_vehicle_sales_all.toLocaleString()"/>
        </div>

    </div>
</template>