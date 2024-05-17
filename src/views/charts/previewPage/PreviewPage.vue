<template>
    <div class="m-5 max-w-[2000px] m-auto">
        <v-container fluid>
            <v-alert :color="alertColor">
                <v-row justify="center">
                    <v-col cols="12">
                        <div class="text-center text-black">
                            <h3 class="text-white"><strong>{{ alertTitle }}</strong></h3>
                        </div>
                    </v-col>
                </v-row>
            </v-alert>
        </v-container>
        <v-container fluid>
            <v-row justify="start">
                <v-col class="d-flex flex-column">
                    <span class="me-2 mt-1 text-xl">Choose chart you want to update with dataset selected</span>
                    <span class="text-sm text-gray-500">Charts below rappresent a preview with a default standard
                        dataset</span>
                </v-col>
            </v-row>
            <div class="flex flex-col mt-10 space-y-5">
                <!-- <Selection :value="0" title="Minidashboard" description="description">
                    <template #preview>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-card title="North American sales in th world (map)"
                                    text="Explore North American's car auction stats by city: total sales, vehicle counts, top sales, auction events. Interactive bubbles show revenue scale.">
                                    <img src="@/assets/images/minidashboard2.svg" alt="minidashboard image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="Pie chart car type offered"
                                    text="Analyzing the distribution of car shapes in the dataset.">
                                    <img src="@/assets/images/minidashboard1.svg" alt="minidashboard image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="European sales in th world (map)"
                                    text="Explore european's car auction stats by city: total sales, vehicle counts, top sales, and auction events. Interactive bubbles show revenue scale.">
                                    <img src="@/assets/images/minidashboard.svg" alt="minidashboard image card">
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </Selection>
                <Selection :value="1" title="Car Status" description="description">
                    <template #preview>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-card title="Plot maison sales by year"
                                    text="Analyzing Average Sales Prices for Maison Vehicles">
                                    <img src="@/assets/images/carstatus.svg" alt="car status image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="Plot comparison maison sales by year"
                                    text="Comparison of Average and Total Sales by Maison">
                                    <img src="@/assets/images/carstatus1.svg" alt="car status  image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="Return sales info maison"
                                    text="Analyze the Number of Auctions and Car Sales">
                                    <img src="@/assets/images/carstatus2.svg" alt="car status  image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="Plot number sales rate vehicles by age"
                                    text="An analysis of vehicle sales and sales rate based on age">
                                    <img src="@/assets/images/carstatus3.svg" alt="car status  image card">
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-card title="Plot top cities sales europe"
                                    text="Explore the sales and average prices of the most popular European cities.">
                                    <img src="@/assets/images/carstatus4.svg" alt="car status  image card">
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </Selection> -->
                <Selection v-for="(chart, index) of availableCharts" :chart="chart" :value="index" :title="chart.name" :description="chart.subtitle"/>
            </div>
            <v-row v-if="selectedItems.length > 0">
                <v-col cols="12" sm="12">
                    <v-card class="pt-5 mt-5">
                        <v-row justify="start">
                            <v-col col="12" class="ps-10">
                                <h3>Summary</h3>
                            </v-col>
                        </v-row>
                        <v-card-text>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr v-for="(item, index) in selectedItems" :key="index">
                                            <td>
                                                <v-checkbox v-model="selectedCheckboxes" :value="item.index"
                                                    @click.stop></v-checkbox>
                                            </td>
                                            <td>{{ item.title }}</td>
                                            <!-- Aggiungi altre colonne se necessario -->
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">

import Selection from './Selection.vue';
import { useChartsStore } from '../../../store/charts/charts';
import axios from 'axios';

export default {
    components: { Selection, },
    data() {
        return {
            selectedCheckboxes: [] as number[],
            alertColor: '',
            alertTitle: '',
            items: [
                { index: 0, title: 'Item 1' },
                { index: 1, title: 'Item 2' },
            ],
            chartStore: useChartsStore(),
            availableCharts: [] as any[]
        };
    },
    created() {
        this.alertColor = this.$route.query.color as string || 'info';
        this.alertTitle = this.$route.query.title as string || '';
    },
    async mounted() {
        let response = await axios.get('/bidwatcher_product_chart/query', {
            params: {
                search: this.buildSearchSting()
            }
        })
        console.log(response.data.items);
        this.availableCharts = response.data.items
    },
    methods: {
        buildSearchSting() {
            return [
                'versatility:1',
                `category:${this.chartStore.getSelectedChartCategory}`,
                `type:${this.chartStore.getSelectedChartType}`
            ].join(',')
        },
    },
    computed: {
        selectedItems() {
            return this.items.filter(item => this.selectedCheckboxes.includes(item.index));
        },
    },
};
</script>

<style scoped>
.custom-chip {
    background-color: #ffffff;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
}
</style>