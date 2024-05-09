<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import GenericFilter from '../../components/GenericFilter.vue'

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
        <GenericFilter filterName="Attributes" light>
            <div class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-3 lg:flex-wrap">
                <v-btn
                    v-for="attribute in attributes"
                    :key="attribute.body_shape"
                    class="letter-button selection"
                    :variant="selectedAttributes.includes(attribute.body_shape) === true ? 'elevated' : 'outlined'"
                    @click="toggleValueInArray(selectedAttributes, attribute.body_shape)"
                    :color="selectedAttributes.includes(attribute.body_shape) === true ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; font-size: 10px;"
                >
                    {{ attribute.body_shape }}
                </v-btn>
            </div>
        </GenericFilter>
    </div>
</template>