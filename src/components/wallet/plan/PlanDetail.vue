<script setup lang="ts">
// Interface
interface Product {
  category: string;
  currency: string;
  family: number;
  id: number;
  name: string;
  prezzo: number;
  properties: {
    id: number;
    product_id: number;
    tipo: string;
    value: string;
  };
}

// Import
import { useCardsPlansStore } from '@/store/plans/cards';
import { computed } from 'vue';
import Button from '@/components/common/button.vue';
import { families, plans } from './definitions';

// Emits
const emits = defineEmits(['buyThisPlan']);

// Props
const props = defineProps<{
  products: Product[];
}>();

// Variables
const mappedDatas = computed(() =>
  props.products.map((item: any) => ({
    category: item.category,
    currency: item.currency,
    family: item.family,
    id: item.id,
    name: item.name,
    prezzo: item.prezzo !== 0 ? item.prezzo : '***',
    prezzoAnno: item.prezzo / 5,
    prezzoMese: item.prezzo / 5 / 12,
    tipologia: item.tipologia,
    propertiesId: item.properties.id,
    propertiesProduct_id: item.properties.product_id,
    propertiesTipo: item.properties.tipo,
    propertiesValue: item.properties.value,
  }))
);

const selectedItem = computed(() =>
  mappedDatas.value.find(
    item =>
      item.category === 'Subscription' || item.category === 'Subscription_ppu'
  )
);
const boltsCredits = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Bolts Credits')
);
const vehicleDetail = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Vehicle Detail')
);
const garageSetup = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Garage setup')
);
const auctionAlert = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Auction Alert')
);
const socialRumors = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Social Rumors')
);
const singleChart = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Single Chart')
);
const miniDashboard = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Mini Dashboard')
);
const fullDashboard = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Full Dashboard')
);
const gtc = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Gallery, text, chassis')
);
const searchLocate = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Search Locate')
);
const roadmap = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Roadmap')
);
const sparesParts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Spares Parts')
);
const brandsChart = computed(() =>
  mappedDatas.value.filter(item => item.name === '"Active Brand Charts"')
);
const maisonCharts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Active Maison Charts')
);
const auctionCharts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Active Auction Charts')
);
const indexCharts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Active Index Charts')
);
const familyCharts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Active Family Charts')
);
const modelCharts = computed(() =>
  mappedDatas.value.filter(item => item.name === 'Active Model Charts')
);
const cardsStore = useCardsPlansStore(); // init

const buyThisPlan = (familyId: number) => {
  emits('buyThisPlan', familyId);
};
</script>

<template>
  <div class="items-start gap-[25px]" v-if="selectedItem">
    <div class="flex-col bg-white items-start gap-[25px] card-wrapper">
      <div class="flex-col items-center gap-[10px] flex-shrink-0">
        <div
          class="justify-center items-center"
          :style="{
            background: families[selectedItem.family].color.background,
          }"
          style="padding: 18px 26px 18px 25px"
        >
          <div class="flex items-center justify-between flex-shrink-0">
            <div class="items-start gap-[8px]" key="index">
              <div
                class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
              >
                {{ selectedItem.name }}
              </div>
              <div
                class="flex-column-reverse justify-center items-start gap-[2px]"
              >
                <div
                  class="text-gray-600 self-stretch font-inter text-sm font-normal leading-[20px]"
                >
                  {{ families[selectedItem.family].plan.name }}
                </div>
                <div class="items-start">
                  <img
                    src="@/assets/images/bronze_token.png"
                    alt=""
                    style="width: 28px; height: 28px"
                  />
                  <div
                    class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
                  >
                    {{ selectedItem.prezzo }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-col items-start gap-[2px]"
              v-for="(item, index) in boltsCredits"
              key="index"
            >
              <div class="flex-col items-start gap-[8px]">
                <div class="flex items-center gap-[4px]">
                  <img src="@/assets/images/bolt.png" alt="" class="h-[26px]" />
                  <div
                    class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
                  >
                    Bolts
                  </div>
                </div>
                <div
                  class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
                >
                  +{{ item.prezzo }}
                </div>
              </div>
              <div
                class="text-gray-600 font-inter text-[13px] font-normal leading-[20px]"
              >
                Included in plan
              </div>
            </div>
          </div>
        </div>
        <!-- /BADGE -->

        <!--            Middle Top-->
        <div class="flex gap-[6px] p-2">
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="h-[24px]"
                />
                <div class="text-column-header">Services</div>
              </div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Vehicle</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Garage</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Allert</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Rumors</div>
            </div>
          </div>
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <div class="text-column-header">Standard</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in vehicleDetail"
              key="index"
            >
              <div class="cell-text">{{ item.propertiesValue }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in garageSetup"
              key="index"
            >
              <div class="cell-text">{{ item.propertiesValue }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in auctionAlert"
              key="index"
            >
              <div class="cell-text">{{ item.propertiesValue }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in socialRumors"
              key="index"
            >
              <img
                v-if="item.propertiesValue > '-1'"
                src="@/assets/images/x-circle-fill.svg"
                alt=""
                class="h-[24px]"
              />
              <img
                v-if="item.propertiesValue < '-1'"
                src="@/assets/images/x-circle-fill.svg"
                alt=""
                class="h-[24px]"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-[6px] p-2">
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="h-[24px]"
                />
                <div class="text-column-header">Services</div>
              </div>
            </div>
            <div class="cell-container">
              <div class="flex items-center gap-[4px]">
                <img src="@/assets/images/bolt.png" alt="" class="h-[18px]" />
                <div class="cell-text">Bolts</div>
              </div>
            </div>
          </div>
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <div class="text-column-header">Monthly</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in boltsCredits"
              key="index"
            >
              <div class="cell-text">+{{ item.prezzo }}</div>
            </div>
          </div>
        </div>
      </div>

      <!--          MIDDLE-->
      <div style="padding: 1px 0px">
        <div style="padding: 3px 0px 0px 0px">
          <div class="row-divider">
            <div
              class="flex-shrink-0 text-[#3C3C3C] text-base font-normal"
              style="font-family: Montserrat"
            >
              Below period usage limits
            </div>
          </div>
        </div>
      </div>
      <!--          MIDDLE Table-->
      <div class="w-full justify-center">
        <div class="flex gap-[6px] p-2">
          <!--              prima colonna-->
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="h-[24px]"
                />
                <div class="text-column-header">Services</div>
              </div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Chart</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Mini Dashboard</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Full Dashboard</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Vehicle Detail</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">GTC</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Locate</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Roadmap</div>
            </div>
            <div class="cell-container">
              <div class="cell-text">Spares</div>
            </div>
          </div>
          <!--              seconda colonna-->
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <div class="text-column-header">Daily limit</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in singleChart"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in miniDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in fullDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in vehicleDetail"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in gtc"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in searchLocate"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in roadmap"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in sparesParts"
              key="index"
            >
              <div class="cell-text">{{ item.prezzo }}</div>
            </div>
          </div>
          <!--              terza colonna-->
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <div class="text-column-header">Monthly forecast</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in singleChart"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in miniDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in fullDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in vehicleDetail"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in gtc"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in searchLocate"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in roadmap"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in sparesParts"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoMese.toFixed(3) }}</div>
            </div>
          </div>
          <!--              quarta colonna-->
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <div class="text-column-header">Yearly forecast</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in singleChart"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in miniDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in fullDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in vehicleDetail"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in gtc"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in searchLocate"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in roadmap"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in sparesParts"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
          </div>
          <!--              quinta colonna-->
          <div class="w-full _grow">
            <div class="column-container">
              <div class="inner-column-container">
                <img src="@/assets/images/bolt.png" alt="" class="h-[24px]" />
                <div class="text-column-header">Bolts</div>
              </div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in singleChart"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in miniDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in fullDashboard"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in vehicleDetail"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in gtc"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in searchLocate"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in roadmap"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
            <div
              class="cell-container"
              v-for="(item, index) in sparesParts"
              key="index"
            >
              <div class="cell-text">{{ item.prezzoAnno.toFixed(3) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="flex-col items-center gap-[10px]">
          <div class="justify-center items-center flex-shrink-0 row-divider">
            <div
              class="text-[#3C3C3C] font-montserrat text-base font-normal leading-[24px]"
            >
              Use your bolts to activate further services
            </div>
          </div>

          <div class="flex gap-[6px] p-2">
            <!--              prima colonna-->
            <div class="w-full _grow">
              <div class="column-container">
                <div class="inner-column-container">
                  <img
                    src="@/assets/icons/currency-dollar.svg"
                    alt=""
                    class="h-[24px]"
                    style="border-radius: 100px; border: 1px solid #000"
                  />
                  <div class="text-column-header">Active charts area</div>
                </div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Brands Chart</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Maison Charts</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Auction Charts</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Index Charts</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Family Charts</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Model Charts</div>
              </div>
            </div>
            <!--              seconda colonna-->
            <div class="w-full _grow">
              <div class="column-container">
                <div class="inner-column-container">
                  <img src="@/assets/images/bolt.png" alt="" class="h-[24px]" />
                  <div class="text-column-header">Bolts</div>
                </div>
              </div>
              <div class="cell-container">
                <div class="cell-text">-250</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">-750</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">-250</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">-500</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Unlimited</div>
              </div>
              <div class="cell-container">
                <div class="cell-text">Unlimited</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pr-[6px] w-full flex justify-end mt-6" v-if="selectedItem">
          <Button
            variant="black"
            classes="min-w-[200px]"
            @click="buyThisPlan(selectedItem.family)"
          >
            Buy plan
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  box-shadow: 0px 5px 5px 0px #1018280d;
  @apply rounded-xl;
  overflow: hidden;
  padding-bottom: 36px;
}

.column-container {
  display: flex;
  height: 48px;
  padding: 8px 8px 9px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1px solid #000;
  background: #e0e0e0;
}
.inner-column-container {
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: stretch;
}
.text-column-header {
  color: #212529;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
}
.cell-container {
  flex: 1;
  height: 42px;
  min-width: fit-content;
  white-space: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  padding: 8px 8px 9px 8px;
  border-bottom: 1px solid #dee2e6;
}
.cell-text {
  color: #212529;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
}
.row-divider {
  border-bottom: 1px solid rgba(33, 37, 41, 0.5);
  background: rgba(255, 218, 68, 0.25);
  padding: 11px 14px 11px 12px;
  margin-bottom: 8px;
}
</style>
