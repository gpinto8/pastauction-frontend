<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import { ref } from 'vue';


const props = defineProps({
    family: {
        type: String
    }
})

// Selected models
const models = defineModel<string[]>({required: true})

</script>

<template>
    <div>
        <div class="mt-3">
            <v-chip
                v-for="(model, index) in models"
                :key="index"
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
        <v-row justify="start" class="align-center">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="outlined"
                    label
                    size="large"
                >
                    <small>Model</small>
                </v-chip>

                <p v-if="!family">Please, select the Family of your interest first.</p>
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
            </v-col>
        </v-row>
    </div>
</template>