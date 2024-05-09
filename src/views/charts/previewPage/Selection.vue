<script setup lang="ts">
const emits = defineEmits(['checked'])

const props = defineProps<{
    value: number,
    previews?: string[],
    title: string,
    description: string,
}>()

</script>

<template>
    <v-row justify="start">
        <v-expansion-panels>
            <v-expansion-panel :rounded="''">
                <v-expansion-panel-title class="h-20" collapse-icon="mdi-minus-circle" expand-icon="mdi-plus-circle">
                    <div class="flex-center">
                        <input type="checkbox" class="h-5 w-5 z-10 accent-blue-500" @click="emits('checked', 0)" :value="value" @click.stop/>
                        <div class="flex flex-col pl-5">
                            <div class="text-lg font-semibold">
                                {{title}}
                            </div>
                            <div class="text-zinc-600 text-sm">
                                {{description}}
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <slot name="preview">

                    </slot>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-row>
</template>