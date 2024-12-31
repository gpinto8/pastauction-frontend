<script lang="tsx" setup>
import Filters, {
  type FiltersGoValues,
  type FiltersModelValue,
} from '@/components/common/Filters.vue';
import { computed } from 'vue';

const props = defineProps<{
  vehicleData: any;
  applyFilters?: (data: FiltersGoValues) => void;
}>();

defineEmits(['onPrevious', 'onNext']);

const filterModelValue = computed<FiltersModelValue>(() => [
  {
    key: 'brand_name',
    label: 'Brand',
    value: props?.vehicleData?.brand_name,
    isRelated: true,
  },
  {
    key: 'bw_family_name',
    label: 'Family',
    value: props?.vehicleData?.bw_family_name,
    isRelated: true,
  },
  {
    key: 'bw_model_name',
    label: 'Model',
    value: props?.vehicleData?.bw_model_name,
    isRelated: true,
  },
  {
    key: 'age_name',
    label: 'Aging',
    value: props?.vehicleData?.age_name,
    isRelated: false,
  },
]);

const vehicleUpdateFilterUrl =
  'https://pastauction.com/api/v1/filter/bidwatcher_vehicle_user_update_filter';
</script>

<template>
  <Filters
    :fetchUrl="vehicleUpdateFilterUrl"
    class="md:min-w-[1300px] md:!h-[86px]"
    classInput="!min-w-[180px]"
    :modelValue="filterModelValue"
    @onPrevious="$emit('onPrevious')"
    @onNext="$emit('onNext')"
    :applyFilters="applyFilters"
  />
</template>
