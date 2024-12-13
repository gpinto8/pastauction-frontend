<template>
    <div class="m-auto max-w-[1000px]">
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
                <Selection v-for="(chart, index) of availableCharts" :chart="chart" :value="index"
                    :title="chart.dash_name" :description="chart.dash_description" />
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
                            <!-- <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr v-for="(item, index) in selectedItems" :key="index">
                                            <td>
                                                <v-checkbox v-model="selectedCheckboxes" :value="item.index"
                                                    @click.stop></v-checkbox>
                                            </td>
                                            <td>{{ item.title }}</td>
                                        </tr>
                                    </tbody>
                                </template>
</v-simple-table> -->
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="flex justify-between">
            <div class="text-sm text-gray-400">
                Please, select at least 1 of the charts you prefer
            </div>
            <div class="flex justify-end mb-10">
                <v-btn size="default" height="28" class="w-full sm:w-32 mr-5" color="black"
                    variant="outlined">Back</v-btn>
                <v-btn size="default" height="28" class="w-full sm:w-32" color="black">Cotinue</v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios';
import { useChartsStore } from '../../../store/charts/charts';
import Selection from './Selection.vue';

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
        let response = await axios.get('/dashboard_detail', {
            params: {
                search: this.buildSearchSting()
            }
        })
        console.log(response);
        this.availableCharts = response.data

    },
    methods: {
        buildSearchSting() {
            return [
                'versatility:1',
                `bidwatcher_product_dash_category:${this.chartStore.getSelectedChartCategory}`,
                `bidwatcher_product_dash_type:${this.chartStore.getSelectedChartType}`
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