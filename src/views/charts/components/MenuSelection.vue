<script setup lang="ts">

type SelectionTypes = 'vehicle' | 'maison'

const typesVariants: { [keyof in SelectionTypes]: {
    color: string
}} = {
    maison: {
        color: "#F3A53F"
    },
    vehicle: {
        color: "#0D6EFD"
    },
}

const props = defineProps<{
    card: any,
    type: SelectionTypes
}>()

const emits = defineEmits<{
    'change': any
}>()

</script>

<template>
    <v-col xs="12">
        <v-card class="mx-auto h-100">
            <v-card-item>
                <div>
                    <div>
                        <v-alert :color="card.isActive ? typesVariants[type].color : 'grey'"
                            class="text-center text-white text-bold p-2 rounded-0" style="font-size:large;">{{
                                card.title
                            }}</v-alert>
                    </div>
                    <div class="d-flex justify-space-around mt-5 mb-5">
                        <img v-if="card.isActive" src="@/assets/images/charts_bluicon.svg" alt="Immagine blu">
                        <img v-else src="@/assets/images/charts_icongrey.svg" alt="Immagine grigio">
                    </div>
                    <div class="text-caption text-center mt-2 mb-2 d-flex justify-center">
                        <img v-if="card.isActive" src="@/assets/images/v-icon.svg" alt="plan included" width="15">
                        <img v-else-if="!card.isActive" src="@/assets/images/x-circle-fill.svg" alt="plan included"
                            width="15">
                        <img v-else src="@/assets/images/bolt.svg" alt="plan included" width="15">
                        <span class="font-bold mr-1">{{ card.number }}</span>
                        <small v-if="card.isActive">Included in plan</small>
                        <small v-else>Not available in this plan</small>
                    </div>
                    <div class="text-caption text-center h-100">{{ card.subtitle }}</div>
                </div>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn size="small" class="float-right px-15" :variant="card.isSelected ? 'elevated' : 'outlined'"
                    :color="card.isSelected ? 'black' : ''" @click="emits('change', card); /*selectCard(card)*/">
                    {{ card.isSelected ? 'Selected' : 'Select' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>