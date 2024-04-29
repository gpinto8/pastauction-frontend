<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';
import { useGeneralStore } from '@/store/datas/general';

import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter();
const store = useGarageStore();

const pager = ref<any>({
  page: 1,
  size: 10,
});

const filters = ref({
  garage_id: '0',
  date_filter: 'year',
  gar_vehicle_id: 23,
  family_id: 46304,
  id: 23,
});

const sort = ref({
  brand_name: '',
});

const headers = ref([
  {
    title: '',
    align: 'start',
    sortable: false,
    key: 'view',
    thClass: 'bg-red-200',
  },

  {
    title: 'Year',
    align: 'start',
    sortable: false,
    key: 'year',
    thClass: 'bg-red-200',
  },
  {
    title: 'Brand',
    align: 'start',
    sortable: false,
    key: 'brand_name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Family',
    align: 'start',
    sortable: false,
    key: 'family_name',
    thClass: 'bg-red-200',
  },
  {
    title: 'Twitter',
    align: 'start',
    sortable: false,
    key: 'X_twitter',
    thClass: 'bg-success-200',
  },
  {
    title: 'Instagram',
    align: 'start',
    sortable: false,
    key: 'Instagram',
    thClass: 'bg-success-200',
  },
  {
    title: 'Google',
    align: 'start',
    sortable: false,
    key: 'Google',
    thClass: 'bg-success-200',
  },
  {
    title: 'Youtube',
    align: 'start',
    sortable: false,
    key: 'Youtube',
    thClass: 'bg-success-200',
  },
  {
    title: 'Linkedin',
    align: 'start',
    sortable: false,
    key: 'Linkedin',
    thClass: 'bg-success-200',
  },
  {
    title: 'Facebook',
    align: 'start',
    sortable: false,
    key: 'Facebook',
    thClass: 'bg-success-200',
  },
  {
    title: 'Pinterest',
    align: 'start',
    sortable: false,
    key: 'Pinterest',
    thClass: 'bg-success-200',
  },
  {
    title: 'Total',
    align: 'start',
    sortable: false,
    key: 'total',
    thClass: 'bg-yellow-100',
  },
]);

const filtersTag = ref([
  'yesterday',
  'week',
  'month',
  'quarter',
  'year',
  'all',
]);

const paginate = () => {
  store.socialMediaRumors(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );
};
paginate();

const updateFilter = (filterName: string) => {
  filters.value.date_filter = filterName;
  paginate();
};
</script>
<template>
  <v-container fluid>
    <br />
    <v-btn icon size="small" @click="router.back()">
      <app-icon type="arrow_left" />
    </v-btn>
    <div>
      <div class="text-center">
        <h5 class="font-bold text-[20px]">Social Media Rumors</h5>
        <div class="border-y-2 border-black py-2 flex gap-4 w-full my-4">
          <v-chip
            v-for="tag in filtersTag"
            :key="tag"
            @click="updateFilter(tag)"
            label
            class="filter-tag"
            :class="{
              '!bg-blue-500 text-white': filters.date_filter === tag,
            }"
          >
            {{ tag }}
          </v-chip>
        </div>
        <div class="p-2">
          <table class="table-auto bg-white w-full simple-table">
            <thead>
              <tr class="border-y-2 border-black py-1">
                <th v-for="head in headers" :class="head.thClass">
                  {{ head.title }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in store.getListItems?.items.filter(
                  (el: any) => el.id !== -1
                )"
              >
                <td class="py-1 border-b text-[#212529]">
                  <router-link
                    to="/garage/detail/social-media-rumors-detail"
                    class="text-blue-400"
                  >
                    View
                  </router-link>
                </td>
                <td
                  v-for="head in headers.filter(head => head.key !== 'view')"
                  class="py-1 border-b text-[#212529]"
                  :class="{ 'bg-yellow-100': head.key === 'total' }"
                >
                  {{ item[head.key] }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="w-full bg-yellow-100">
                <td colspan="4" class="py-1 border-b text-[#212529]" />
                <td
                  v-for="head in headers.filter(
                    head =>
                      !['view', 'year', 'brand_name', 'family_name'].includes(
                        head.key
                      )
                  )"
                  class="py-1 border-b text-[#212529]"
                  :class="{ 'bg-yellow-200': head.key === 'total' }"
                >
                  {{
                    store.getListItems?.items.filter((el: any) => el.id === -1)[0][
                      head.key
                    ]
                  }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style lang="postcss">
table {
  th,
  td {
    @apply p-2;
  }
}

.filter-tag {
  @apply border-y-2 py-2 flex gap-4 w-full justify-center capitalize bg-black text-white !h-10;
}
</style>
