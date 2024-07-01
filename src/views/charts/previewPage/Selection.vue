<script setup lang="ts">
const emits = defineEmits(['checked'])

const props = defineProps<{
    value: number,
    previews?: string[],
    title: string,
    description: string,
    chart: any
}>()

function getChartImageUrl(path: string) {
    return `https://pastauction.com/api/v1/photo/${path}`
}

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
                    <div class="lg:px-32 grid gap-5 col-span-3 lg:pb-20">
                        <div class="" v-for="graphs in chart.dash_graphs">
                            {{ graphs.bidwatcher_product_chart_path }}
                            <img :src="getChartImageUrl(graphs.bidwatcher_product_chart_path)" class="h-32 w-32" alt=""
                                srcset="">
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-row>
</template>