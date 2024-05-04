<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, watch } from 'vue';

const props = defineProps<{
    families: string[]
}>()

// Selected models
const models = defineModel<string[]>({required: true})
const modelList = ref<string[]>([])

watch(props.families, async () => {

    if (props.families.length == 0) { resetFilter() }

    try {
        const response = await axios.get(
            "/filter/filter_charts_vehicles/model_name/",
            {
                params: {
                    search: `family_name:${props.families.join("|")}`,
                },
            }
        );

        modelList.value = response.data.items.map((item: any) => item.model_name);
    } catch (error) {
        console.error("Errore nella richiesta GET:", error);
    }
}, {
    deep: true
})

function resetFilter() {
    models.value.splice(0, models.value.length)
    modelList.value.splice(0, modelList.value.length)
}

</script>

<template>
    <div>
        <v-row justify="start" class="align-center" no-gutters>
            <v-chip
                class="custom-chip mr-3 align-self-start"
                color="#0D6EFD"
                variant="outlined"
                label
                size="large"
            >
                <small>Model</small>
            </v-chip>
            <v-col class="">
                <p v-if="families.length == 0">Please, select the Family of your interest first.</p>
                <v-row v-else class="letter-button border-brand" color="black" text>
                    <v-col 
                        v-for="model in modelList" 
                        :key="model" 
                        cols="12" sm="6" md="4" lg="3">
                        <div href="#" 
                            class="m-3"
                            :class="{ 'selected': models.includes(model) }" 
                            style="font-size: 16px;" 
                            @click="toggleValueInArray(models, model)">
                            {{ model }}
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-3">
                    <v-chip
                        v-for="(model, index) in models"
                        :key="model"
                        class="m-2"
                        closable
                        color="black"
                        style="border-radius: 5px;"
                        variant="flat"
                        @click:close="toggleValueInArray(models, model)"
                    >
                        {{ model }}
                    </v-chip>
                </div>
            </v-col>
        </v-row>
    </div>
</template>