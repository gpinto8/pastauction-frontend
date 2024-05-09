<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue'

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
        <GenericFilter filterName="Model" :light="true">
            <div  class="flex flex-col" no-gutters>
                <p v-if="families.length == 0">Please, select the Family of your interest first.</p>
                <div v-else class="flex letter-button border-brand" color="black" text no-gutters>
                    <div class="flex flex-col"
                        v-for="model in modelList" 
                        :key="model">
                        <div href="#" 
                            class="m-3"
                            :class="{ 'selected': models.includes(model) }" 
                            style="font-size: 16px;" 
                            @click="toggleValueInArray(models, model)">
                            {{ model }}
                        </div>
                    </div>
                </div>
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
            </div>
        </GenericFilter>
    </div>
</template>