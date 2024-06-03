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
                <Selection v-for="(chart, index) of availableCharts" :chart="chart" :value="index" :title="chart.name" :description="chart.subtitle"/>
            </div>
            <button @click="retrieveProductsData">
                refresh
            </button>
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
    </div>
</template>

<script lang="ts">

import { chartsOfProduct, querybidwatcherProductChart, querybidwatcherProductChartSelected, queryBidwatcherProductDash } from '@/api/filter/charts/charts';
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
        // this.availableCharts = response.data.items
        this.retrieveProductsData()
    },
    methods: {
        buildSearchSting() {
            return [
                'versatility:1',
                `category:${this.chartStore.getSelectedChartCategory}`,
                `type:${this.chartStore.getSelectedChartType}`
            ].join(',')
        },
        async retrieveProductsData() {
            // if (this.chartStore.getSelectedChartCategory == null || this.chartStore.getSelectedChartType == null) return
            console.log('Inizio richiesta prodotti');
            // const charts = await chartsOfProduct(this.chartStore.getSelectedChartCategory, this.chartStore.getSelectedChartType)
            const charts = await chartsOfProduct('Family', 'Single')

            console.log(charts);

        }
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