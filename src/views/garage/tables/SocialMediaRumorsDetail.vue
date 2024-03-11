<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';
import { Pie, Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

ChartJS.register(ArcElement, Tooltip, Legend);

import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter();
const store = useGarageStore();

const pager = ref<any>({
  page: 1,
  size: 50,
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

const filtersTag = ref([
  'yesterday',
  'week',
  'month',
  'quarter',
  'year',
  'all',
]);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Positive comments',
      backgroundColor: '#165BAA',
      data: [40, 20, 12, 39, 10, 40],
      barThickness: 16,
      barPercentage: 0.5,
      beginAtZero: true,
    },
    {
      label: 'Negative comments',
      backgroundColor: '#DC3545',
      data: [40, 20, 12, 39, 10, 40],
      barThickness: 16,
      barPercentage: 0.5,
    },
    {
      label: '   Neutral comments',
      backgroundColor: '#6C757D',
      data: [40, 20, 12, 39, 10, 40],
      barThickness: 16,
      barPercentage: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const pieDatas = ref([40, 60]);

const paginate = () => {
  store.socialMediaRumorsDetail(
    pager.value.page,
    pager.value.size,
    filters.value,
    sort.value
  );

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
      </div>
      <div
        class="h-64 p-6 bg-white rounded-md shadow flex-col w-full justify-center items-start gap-6 inline-flex my-4"
      >
        <div class="h-12 flex-col justify-start items-start gap-5 flex">
          <div class="h-7 flex-col justify-start items-start gap-3 flex">
            <div class="text-gray-500 text-xl font-semibold leading-loose">
              Number of comments by social media
            </div>
          </div>
        </div>
        <div class="w-full justify-between items-start inline-flex">
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div
                class="text-blue-600 rounded-3xl justify-center items-center flex"
              >
                <v-icon size="40">mdi-facebook</v-icon>
              </div>
              <div class="text-black text-base font-normal">Facebook</div>
              <div class="text-black text-base font-semibold">
                {{
                  store.getListItems?.items?.filter((el: any) => el.id === -1)[0][
                    'Facebook'
                  ]
                }}
              </div>
              <div
                class="self-stretch px-2.5 py-1 bg-green-700 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-emerald-400 text-xs font-normal leading-3"
                >
                  0.8%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div
                class="text-sky-500 rounded-3xl justify-center items-center inline-flex"
              >
                <v-icon size="40">mdi-twitter</v-icon>
              </div>
              <div class="text-black text-base font-normal">Twitter</div>
              <div class="text-black text-base font-semibold">
                {{
                  store.getListItems?.items?.filter((el: any) => el.id === -1)[0][
                    'X_twitter'
                  ]
                }}
              </div>
              <div
                class="self-stretch px-2.5 py-1 bg-green-700 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-emerald-400 text-xs font-normal leading-3"
                >
                  0.5%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div
                class="text-red-600 rounded-3xl justify-center items-center inline-flex"
              >
                <v-icon size="40">mdi-youtube</v-icon>
              </div>
              <div class="text-black text-base font-normal">Youtube</div>
              <div class="text-black text-base font-semibold">
                {{
                  store.getListItems?.items?.filter((el: any) => el.id === -1)[0][
                    'Youtube'
                  ]
                }}
              </div>
              <div
                class="self-stretch px-2.5 py-1 bg-red-500 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-red-500 text-xs font-normal leading-3"
                >
                  0.9%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div
                class="text-black rounded-3xl justify-center items-center inline-flex"
              >
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="32" height="32" rx="16" fill="black" />
                  <path
                    d="M20.056 13.7901C21.325 14.7004 22.8795 15.236 24.5585 15.236V11.9936C24.2408 11.9937 23.9238 11.9604 23.6129 11.8943V14.4466C21.9341 14.4466 20.3797 13.9109 19.1104 13.0007V19.6175C19.1104 22.9275 16.4366 25.6107 13.1385 25.6107C11.9079 25.6107 10.7641 25.2373 9.81396 24.597C10.8984 25.7098 12.4107 26.4001 14.0839 26.4001C17.3822 26.4001 20.0561 23.7169 20.0561 20.4067V13.7901H20.056V13.7901ZM21.2224 10.5189C20.5739 9.80783 20.1481 8.88895 20.056 7.8731V7.45605H19.1599C19.3855 8.74721 20.1548 9.85029 21.2224 10.5189ZM11.9 22.057C11.5377 21.5802 11.3419 20.9969 11.3428 20.3972C11.3428 18.8834 12.5657 17.6559 14.0746 17.6559C14.3558 17.6558 14.6353 17.699 14.9032 17.7843V14.4695C14.5901 14.4264 14.274 14.4081 13.9581 14.4148V16.9949C13.6899 16.9096 13.4103 16.8663 13.129 16.8665C11.6202 16.8665 10.3973 18.0939 10.3973 19.608C10.3973 20.6786 11.0085 21.6054 11.9 22.057Z"
                    fill="#FF004F"
                  />
                  <path
                    d="M19.1103 13.0006C20.3796 13.9109 21.934 14.4465 23.6129 14.4465V11.8943C22.6757 11.6939 21.8461 11.2025 21.2223 10.5189C20.1546 9.85022 19.3854 8.74714 19.1598 7.45605H16.8061V20.4066C16.8008 21.9164 15.5799 23.1388 14.0743 23.1388C13.1871 23.1388 12.3989 22.7144 11.8997 22.057C11.0083 21.6054 10.397 20.6785 10.397 19.6081C10.397 18.0941 11.62 16.8666 13.1288 16.8666C13.4179 16.8666 13.6965 16.9118 13.9579 16.995V14.4149C10.7177 14.4821 8.11182 17.139 8.11182 20.4067C8.11182 22.0379 8.76074 23.5166 9.81395 24.5971C10.7641 25.2373 11.9079 25.6108 13.1385 25.6108C16.4367 25.6108 19.1104 22.9275 19.1104 19.6175V13.0006H19.1103Z"
                    fill="white"
                  />
                  <path
                    d="M23.613 11.8943V11.2042C22.768 11.2055 21.9395 10.968 21.2225 10.5188C21.8572 11.2162 22.693 11.697 23.613 11.8943ZM19.16 7.45607C19.1385 7.33268 19.122 7.20847 19.1105 7.08379V6.66675H15.8607V19.6174C15.8555 21.127 14.6347 22.3495 13.129 22.3495C12.6869 22.3495 12.2695 22.2442 11.8999 22.057C12.3991 22.7144 13.1873 23.1388 14.0745 23.1388C15.58 23.1388 16.8011 21.9164 16.8063 20.4067V7.45607H19.16ZM13.9582 14.4149V13.6802C13.6866 13.643 13.4129 13.6243 13.1387 13.6244C9.8403 13.6243 7.1665 16.3076 7.1665 19.6174C7.1665 21.6925 8.21735 23.5212 9.8142 24.597C8.76099 23.5166 8.11207 22.0377 8.11207 20.4066C8.11207 17.139 10.7179 14.4821 13.9582 14.4149Z"
                    fill="#00F2EA"
                  />
                </svg>
              </div>
              <div class="text-black text-base font-normal">Tiktok</div>
              <div class="text-black text-base font-semibold">
                {{
                  store.getListItems?.items?.filter((el: any) => el.id === -1)[0][
                    'TikTok'
                  ]
                }}
              </div>
              <div
                class="self-stretch px-2.5 py-1 bg-red-500 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-red-500 text-xs font-normal leading-3"
                >
                  0.9%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.90001 31.8868C6.99696 31.8003 5.96316 31.4836 5.27555 31.2154C4.36445 30.8606 3.71488 30.4384 3.03108 29.7555C2.34727 29.0727 1.92405 28.4231 1.57121 27.512C1.30302 26.8244 0.986316 25.7906 0.899771 23.8875C0.804666 21.8304 0.785645 21.2132 0.785645 16.0014C0.785645 10.7897 0.806568 10.1734 0.89882 8.11436C0.985365 6.21131 1.30397 5.17942 1.57026 4.48991C1.925 3.5788 2.34822 2.92924 3.03012 2.24448C3.71298 1.56163 4.36255 1.13746 5.2746 0.784617C5.96221 0.51642 6.996 0.199721 8.89906 0.113175C10.9571 0.019021 11.5753 0 16.7852 0C21.9969 0 22.6132 0.0209231 24.6722 0.113175C26.5753 0.199721 27.6072 0.518323 28.2967 0.784617C29.2078 1.13746 29.8574 1.56163 30.5412 2.24448C31.225 2.92733 31.6463 3.57785 32.001 4.48896C32.2692 5.17657 32.5859 6.21036 32.6725 8.11341C32.7666 10.1724 32.7856 10.7887 32.7856 16.0005C32.7856 21.2103 32.7666 21.8285 32.6725 23.8875C32.5859 25.7906 32.2673 26.8244 32.001 27.512C31.6463 28.4231 31.224 29.0727 30.5412 29.7555C29.8583 30.4384 29.2078 30.8606 28.2967 31.2154C27.6091 31.4836 26.5753 31.8003 24.6722 31.8868C22.6151 31.981 21.9969 32 16.7852 32C11.5753 32 10.9571 31.9819 8.90001 31.8868"
                  fill="url(#paint0_radial_164_4789)"
                />
                <path
                  d="M13.1553 15.8866C13.1553 13.9438 14.7297 12.3685 16.6725 12.3685C18.6152 12.3685 20.1905 13.9438 20.1905 15.8866C20.1905 17.8293 18.6152 19.4046 16.6725 19.4046C14.7297 19.4046 13.1553 17.8293 13.1553 15.8866M11.2535 15.8866C11.2535 18.8795 13.6795 21.3056 16.6725 21.3056C19.6654 21.3056 22.0915 18.8795 22.0915 15.8866C22.0915 12.8937 19.6654 10.4676 16.6725 10.4676C13.6795 10.4676 11.2535 12.8935 11.2535 15.8866M21.0397 10.2527C21.0396 10.5032 21.1138 10.7481 21.2528 10.9564C21.3919 11.1647 21.5896 11.3271 21.821 11.423C22.0524 11.519 22.307 11.5441 22.5527 11.4954C22.7983 11.4466 23.024 11.3261 23.2012 11.1491C23.3784 10.972 23.4991 10.7464 23.5481 10.5008C23.597 10.2551 23.572 10.0005 23.4763 9.76905C23.3805 9.53761 23.2183 9.33976 23.0101 9.20052C22.8019 9.06129 22.5571 8.98692 22.3066 8.98682H22.3061C21.9704 8.98697 21.6484 9.12038 21.411 9.35773C21.1735 9.59508 21.04 9.91698 21.0397 10.2527M12.4089 24.4768C11.38 24.43 10.8208 24.2586 10.4491 24.1138C9.95642 23.922 9.60486 23.6935 9.23524 23.3244C8.86562 22.9553 8.63683 22.6041 8.44586 22.1114C8.30098 21.7399 8.12959 21.1805 8.08282 20.1516C8.03166 19.0392 8.02144 18.705 8.02144 15.8868C8.02144 13.0685 8.0325 12.7353 8.08282 11.6219C8.12968 10.593 8.30233 10.0347 8.44586 9.66214C8.63767 9.16943 8.86613 8.81788 9.23524 8.44826C9.60436 8.07864 9.95557 7.84984 10.4491 7.65887C10.8206 7.51399 11.38 7.34261 12.4089 7.29583C13.5213 7.24467 13.8555 7.23446 16.6725 7.23446C19.4895 7.23446 19.824 7.24535 20.9373 7.296C21.9662 7.34286 22.5245 7.51551 22.8971 7.65904C23.3898 7.85001 23.7413 8.07931 24.111 8.44843C24.4806 8.81754 24.7085 9.1696 24.9004 9.66231C25.0452 10.0338 25.2166 10.5932 25.2634 11.6221C25.3146 12.7354 25.3248 13.0687 25.3248 15.8869C25.3248 18.7052 25.3146 19.0384 25.2634 20.1517C25.2165 21.1806 25.0443 21.7399 24.9004 22.1115C24.7085 22.6042 24.4801 22.9558 24.111 23.3246C23.7419 23.6933 23.3898 23.9221 22.8971 24.114C22.5256 24.2588 21.9662 24.4302 20.9373 24.477C19.8249 24.5282 19.4907 24.5384 16.6725 24.5384C13.8542 24.5384 13.521 24.5282 12.4089 24.477M12.3215 5.39716C11.1981 5.44833 10.4304 5.62647 9.75996 5.88734C9.06605 6.15675 8.47785 6.51818 7.8905 7.10461C7.30314 7.69104 6.94264 8.27932 6.67323 8.97407C6.41235 9.64492 6.23421 10.4122 6.18305 11.5357C6.13104 12.6609 6.11914 13.0206 6.11914 15.8866C6.11914 18.7525 6.13104 19.1123 6.18305 20.2375C6.23421 21.3611 6.41235 22.1282 6.67323 22.7991C6.94264 23.493 7.30322 24.0824 7.8905 24.6686C8.47777 25.2547 9.06521 25.6157 9.75996 25.8858C10.4317 26.1467 11.1981 26.3248 12.3215 26.376C13.4474 26.4272 13.8065 26.4399 16.6725 26.4399C19.5384 26.4399 19.8982 26.428 21.0234 26.376C22.147 26.3248 22.9141 26.1467 23.585 25.8858C24.2789 25.6157 24.8671 25.255 25.4545 24.6686C26.0418 24.0821 26.4015 23.493 26.6717 22.7991C26.9326 22.1282 27.1116 21.361 27.1619 20.2375C27.2131 19.1114 27.225 18.7525 27.225 15.8866C27.225 13.0206 27.2131 12.6609 27.1619 11.5357C27.1107 10.4121 26.9326 9.6445 26.6717 8.97407C26.4015 8.28016 26.0409 7.69196 25.4545 7.10461C24.868 6.51725 24.2789 6.15675 23.5858 5.88734C22.9141 5.62647 22.1469 5.44748 21.0242 5.39716C19.8988 5.34575 19.5393 5.33325 16.6737 5.33325C13.8082 5.33325 13.4478 5.34516 12.322 5.39716"
                  fill="white"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_164_4789"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(2.85665 31.299) scale(40.6281)"
                  >
                    <stop offset="0.09" stop-color="#FA8F21" />
                    <stop offset="0.78" stop-color="#D82D7E" />
                  </radialGradient>
                </defs>
              </svg>

              <div class="text-black text-base font-normal">Instagram</div>
              <div class="text-black text-base font-semibold">
                {{
                  store.getListItems?.items?.filter((el: any) => el.id === -1)[0][
                    'Instagram'
                  ]
                }}
              </div>
              <div
                class="self-stretch px-2.5 py-1 bg-green-700 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-emerald-400 text-xs font-normal leading-3"
                >
                  0.5%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div class="w-8 h-8 relative">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.0717773"
                    width="32"
                    height="32"
                    rx="16"
                    fill="#F06A35"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.7766 23.5219C22.7806 24.5391 21.7189 25.082 20.364 25.2667C19.585 25.373 11.9783 25.3451 11.3618 25.2337C10.0662 24.9998 8.77035 24.1713 7.90569 23.0242C7.45181 22.422 7.23149 21.9978 7.01313 21.3055C6.74883 20.4675 6.71968 19.8466 6.74611 15.6182C6.7672 12.243 6.78454 11.6555 6.87386 11.2889C7.34939 9.33693 8.65304 7.81439 10.4674 7.09195C11.4515 6.7001 12.0932 6.64086 14.9839 6.67501C16.8262 6.69677 17.3762 6.72214 17.6219 6.79669C18.648 7.10807 19.547 7.6638 20.353 8.48481C21.4842 9.63723 22.0568 10.9141 22.059 12.2895C22.0601 13.0093 22.1755 13.2744 22.5947 13.5199C22.8589 13.6747 22.9525 13.6911 23.7896 13.7282C24.2892 13.7504 24.7577 13.801 24.8308 13.8407C25.0685 13.9699 25.2768 14.2796 25.3502 14.6131C25.4009 14.8432 25.4151 15.7547 25.3981 17.7008C25.3757 20.2793 25.3654 20.4932 25.243 20.9323C24.9482 21.9894 24.4972 22.786 23.7766 23.5219ZM19.9172 20.2891C20.5199 19.9479 20.6254 19.1168 20.1253 18.65L20.1203 18.6454C19.8134 18.3588 19.7777 18.3255 17.2458 18.3236L14.7278 18.3263C12.5505 18.3339 12.2849 18.3679 12.0541 18.5575L12.002 18.6028C11.7678 18.8147 11.6151 19.2324 11.6607 19.5363C11.7085 19.8553 11.9854 20.215 12.2827 20.3445L12.2875 20.3466C12.4389 20.4066 13.1793 20.4551 15.6433 20.4321L19.2979 20.3898L19.9172 20.2891ZM17.0943 12.6719C17.0943 12.2319 16.9257 11.9556 16.5375 11.7596C16.3183 11.6489 16.2371 11.6259 15.2203 11.6212L14.0171 11.6202C12.4204 11.6226 12.247 11.65 11.9745 11.9138L11.9271 11.9608C11.418 12.4746 11.6768 13.4681 12.3695 13.6589C12.4902 13.6922 13.2458 13.7128 14.2273 13.7108L15.019 13.7062C16.246 13.6967 16.4012 13.6802 16.5595 13.5858L16.6225 13.5455C16.9479 13.3262 17.0943 13.054 17.0943 12.6719Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div class="text-black text-base font-normal">Blog</div>
              <div class="text-black text-base font-semibold">1355</div>
              <div
                class="self-stretch px-2.5 py-1 bg-red-500 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                >
                  <v-icon size="14">mdi-arrow-up</v-icon>
                </div>
                <div
                  class="text-center text-red-500 text-xs font-normal leading-3"
                >
                  0.9%
                </div>
              </div>
            </div>
          </div>
          <div class="social-card">
            <div class="flex-col justify-start items-center gap-2 inline-flex">
              <div class="justify-center items-start inline-flex">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_164_4805)">
                    <path
                      d="M24.3574 0H8.35742C7.29656 0 6.27914 0.421427 5.52899 1.17157C4.77885 1.92172 4.35742 2.93913 4.35742 4V28C4.35742 29.0609 4.77885 30.0783 5.52899 30.8284C6.27914 31.5786 7.29656 32 8.35742 32H24.3574C25.4183 32 26.4357 31.5786 27.1858 30.8284C27.936 30.0783 28.3574 29.0609 28.3574 28V4C28.3574 2.93913 27.936 1.92172 27.1858 1.17157C26.4357 0.421427 25.4183 0 24.3574 0V0ZM10.3574 8H22.3574C22.6226 8 22.877 8.10536 23.0645 8.29289C23.2521 8.48043 23.3574 8.73478 23.3574 9C23.3574 9.26522 23.2521 9.51957 23.0645 9.70711C22.877 9.89464 22.6226 10 22.3574 10H10.3574C10.0922 10 9.83785 9.89464 9.65032 9.70711C9.46278 9.51957 9.35742 9.26522 9.35742 9C9.35742 8.73478 9.46278 8.48043 9.65032 8.29289C9.83785 8.10536 10.0922 8 10.3574 8V8ZM9.35742 13C9.35742 12.7348 9.46278 12.4804 9.65032 12.2929C9.83785 12.1054 10.0922 12 10.3574 12H22.3574C22.6226 12 22.877 12.1054 23.0645 12.2929C23.2521 12.4804 23.3574 12.7348 23.3574 13C23.3574 13.2652 23.2521 13.5196 23.0645 13.7071C22.877 13.8946 22.6226 14 22.3574 14H10.3574C10.0922 14 9.83785 13.8946 9.65032 13.7071C9.46278 13.5196 9.35742 13.2652 9.35742 13ZM10.3574 16H22.3574C22.6226 16 22.877 16.1054 23.0645 16.2929C23.2521 16.4804 23.3574 16.7348 23.3574 17C23.3574 17.2652 23.2521 17.5196 23.0645 17.7071C22.877 17.8946 22.6226 18 22.3574 18H10.3574C10.0922 18 9.83785 17.8946 9.65032 17.7071C9.46278 17.5196 9.35742 17.2652 9.35742 17C9.35742 16.7348 9.46278 16.4804 9.65032 16.2929C9.83785 16.1054 10.0922 16 10.3574 16V16ZM10.3574 20H16.3574C16.6226 20 16.877 20.1054 17.0645 20.2929C17.2521 20.4804 17.3574 20.7348 17.3574 21C17.3574 21.2652 17.2521 21.5196 17.0645 21.7071C16.877 21.8946 16.6226 22 16.3574 22H10.3574C10.0922 22 9.83785 21.8946 9.65032 21.7071C9.46278 21.5196 9.35742 21.2652 9.35742 21C9.35742 20.7348 9.46278 20.4804 9.65032 20.2929C9.83785 20.1054 10.0922 20 10.3574 20V20Z"
                      fill="#212529"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_164_4805">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(0.357422)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="text-black text-base font-normal">Magazines</div>
              <div class="text-black text-base font-semibold">1355</div>
              <div
                class="self-stretch px-2.5 py-1 bg-red-500 bg-opacity-10 rounded-sm shadow justify-center items-center gap-1 inline-flex"
              >
                <div
                  class="w-3 h-3 px-0.5 py-px justify-center items-center flex"
                ></div>
                <div
                  class="text-center text-red-500 text-xs font-normal leading-3"
                >
                  0.9%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-6">
      <div class="space-y-4">
        <v-card class="p-4">
          <div class="pb-4">
            <h6 class="text-[#6C757D] font-semibold text-lg">Genre</h6>
            <h4 class="text-[#0B1354] font-medium text-2xl">2.000</h4>
            <p class="text-[#343A40]">Number of people</p>
          </div>
          <hr />
          <Pie
            :width="100"
            :height="50"
            :data="{
              labels: ['Men', 'Women'],
              datasets: [
                {
                  backgroundColor: ['#0D6EFD', '#DEE2E6'],
                  data: pieDatas,
                },
              ],
            }"
            :options="{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
              maintainAspectRatio: true,
            }"
          />
        </v-card>

        <v-card class="px-4 pb-4">
          <div class="py-4 space-y-1">
            <h6 class="text-[#6C757D] font-semibold text-lg">Age range</h6>
            <p class="text-[#343A40]">Number of people</p>
            <div class="flex gap-4 !mt-4">
              <v-chip class="text-white bg-blue-500" label>All</v-chip>
              <v-chip class="text-white bg-black" label>Men</v-chip>
              <v-chip class="text-white bg-black" label>Women</v-chip>
            </div>
          </div>
          <hr />
          <div>
            <small class="text-[#6C757D]">18-24</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="4"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">5%</div>
            </div>
          </div>
          <div>
            <small class="text-[#6C757D]">25-34</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="40"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">40%</div>
            </div>
          </div>
          <div>
            <small class="text-[#6C757D]">35-44</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="35"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">35%</div>
            </div>
          </div>
          <div>
            <small class="text-[#6C757D]">45-54</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="10"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">10%</div>
            </div>
          </div>
          <div>
            <small class="text-[#6C757D]">55-64</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="5"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">5%</div>
            </div>
          </div>
          <div>
            <small class="text-[#6C757D]">+65</small>
            <div class="flex items-center">
              <v-progress-linear
                model-value="5"
                color="blue"
                height="7"
                rounded
              />
              <div class="ml-6 w-10">5%</div>
            </div>
          </div>
        </v-card>
      </div>
      <div class="col-span-2 space-y-4">
        <v-card class="col-span-2">
          <div class="p-6">
            <h6 class="text-[#6C757D] font-semibold text-lg">Total comments</h6>
            <h4 class="text-[#0B1354] font-medium text-2xl">5.987,34</h4>
            <p class="text-[#343A40]">Number of comments per month</p>
          </div>
          <hr />
          <Bar :width="300" :height="100" :data="data" :options="(options as any)" />
        </v-card>
        <v-card class="px-4 pb-4">
          <div class="py-4 space-y-1">
            <h6 class="text-[#6C757D] font-semibold text-lg">Main locations</h6>
            <p class="text-[#343A40]">Countries</p>
          </div>
          <hr />
          <div class="countries">
            <div>
              <small class="text-[#6C757D]">United States</small>
              <div class="flex items-center">
                <v-progress-linear
                  model-value="20"
                  color="blue"
                  height="7"
                  rounded
                />
                <div class="ml-6 w-10">20%</div>
              </div>
            </div>

            <div>
              <small class="text-[#6C757D]">Italy</small>
              <div class="flex items-center">
                <v-progress-linear
                  model-value="50"
                  color="blue"
                  height="7"
                  rounded
                />
                <div class="ml-6 w-10">50%</div>
              </div>
            </div>
            <div>
              <small class="text-[#6C757D]">United Kingdom</small>
              <div class="flex items-center">
                <v-progress-linear
                  model-value="30"
                  color="blue"
                  height="7"
                  rounded
                />
                <div class="ml-6 w-10">30%</div>
              </div>
            </div>
          </div>
        </v-card>
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

.social-card {
  @apply h-40 px-6 py-3 bg-white rounded-md shadow border border-gray-200 justify-center items-center gap-2.5 flex;
}

.v-progress-linear {
  transform: translateX(-58%) !important;
}

.countries {
  .v-progress-linear {
    transform: translateX(-54%) !important;
  }
}
</style>
