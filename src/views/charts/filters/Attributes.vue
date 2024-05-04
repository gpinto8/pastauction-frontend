<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';

defineExpose({
    resetFilter
})
const props = defineProps<{
    attributes: any[]
}>()
const selectedAttributes = defineModel<string[]>({ required: true })

function resetFilter() {
    emptyArray(selectedAttributes.value)
}

</script>

<template>
    <div>
        <v-row justify="start">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="outlined"
                    label
                    size="large"
                >
                    <small>Attributes</small>
                </v-chip>
                <v-btn
                    v-for="attribute in attributes"
                    :key="attribute.body_shape"
                    class="letter-button"
                    :variant="selectedAttributes.includes(attribute.body_shape) === true ? 'elevated' : 'outlined'"
                    @click="toggleValueInArray(selectedAttributes, attribute.body_shape)"
                    :color="selectedAttributes.includes(attribute.body_shape) === true ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ attribute.body_shape }}
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>