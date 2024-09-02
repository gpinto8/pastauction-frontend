<script setup lang="ts">
import { getImageFromPath } from '@/api/photo/photo';
import { computed } from 'vue';

const emits = defineEmits(['checked'])

const props = defineProps<{
    value: number,
    previews?: string[],
    title: string,
    description: string,
    chart: any
}>()

const isSingleChart = computed(() => {
    return props.chart.dash_graphs.length == 1
})

</script>

<template>
    <v-row justify="start">
        <v-expansion-panels>
            <v-expansion-panel :rounded="'lg'">
                <v-expansion-panel-title class="h-20" collapse-icon="mdi-minus-circle" expand-icon="mdi-plus-circle">
                    <div class="flex-center">
                        <div class="flex-center rounded-md bg-gray-100 p-2 shadow-md">
                            <input type="checkbox" class="h-5 w-5 z-10 accent-blue-500" @click="emits('checked', 0)"
                                :value="value" @click.stop />
                        </div>
                        <div class="flex flex-col pl-5">
                            <div class="text-lg font-semibold line-clamp-1">
                                {{ title }}
                            </div>
                            <div class="text-zinc-600 text-sm line-clamp-2">
                                {{ description }}
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="grid gap-5 lg:pb-20" :class="isSingleChart ? 'grid-cols-1' : 'grid-cols-3'">
                        <div class="border border-solid px-2 py-4 rounded-lg flex flex-col"
                            v-for="graph in chart.dash_graphs">
                            <div class="flex flex-col" v-if="!isSingleChart">
                                <div class="text-sm font-semibold">
                                    {{ graph.chart_name }}
                                </div>
                                <div class="text-[12px] text-gray-400 mb-5">
                                    {{ graph.bidwatcher_product_chart_description }}
                                </div>
                            </div>

                            <img :src="getImageFromPath(graph.bidwatcher_product_chart_path)" alt="" srcset="">

                            <div v-if="isSingleChart">
                                <div class="bg-zinc-100 rounded-md px-10 py-5">
                                    {{ chart.dash_description }}
                                </div>
                            </div>

                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-row>
</template>