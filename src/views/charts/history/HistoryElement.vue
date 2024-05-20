<script setup lang="ts">



</script>

<template>
    <v-row justify="start">
        <v-expansion-panels>
            <v-expansion-panel :rounded="'lg'">
                <v-expansion-panel-title collapse-icon="mdi-minus-circle" expand-icon="mdi-plus-circle">
                    <div class="flex-center">
                        <div class="flex flex-col pl-5">
                            <div class="text-lg font-semibold line-clamp-1">
                                Titolo
                            </div>
                            <div class="text-black text-sm line-clamp-2">
                                Single Chart
                            </div>
                            <div class="flex">
                                <div class="text-zinc-600 text-sm line-clamp-2 w-52">
                                    <span class="text-black">Date requested:</span> 12.05.2024
                                </div>
                                <div class="text-zinc-600 text-sm line-clamp-2">
                                    <span class="text-black">Deadline date:</span> 12.05.2024
                                </div>
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="lg:px-32 flex-center flex-col lg:pb-20">
                        <div class="w-full px-10 py-5 bg-gray-100 shadow-md rounded-md">
                            chart.description
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-row>
</template>