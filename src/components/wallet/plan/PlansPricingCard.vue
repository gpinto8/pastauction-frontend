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
import { defineProps } from 'vue';
import { useCardsPlansStore } from '@/store/plans/cards';

// Emits
const emits = defineEmits(['buyThisPlan']);

// Props
const props = defineProps<{
  infoCard: Product[];
}>();

// Variables
const mappedDatas = props.infoCard.map((item: any) => ({
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
}));
const nameFamilies = mappedDatas.filter(
  item =>
    item.category === 'Subscription' || item.category === 'Subscription_ppu'
);
const boltsCredits = mappedDatas.filter(item => item.name === 'Bolts Credits');
const vehicleDetail = mappedDatas.filter(
  item => item.name === 'Vehicle Detail'
);
const garageSetup = mappedDatas.filter(item => item.name === 'Garage setup');
const auctionAlert = mappedDatas.filter(item => item.name === 'Auction Alert');
const socialRumors = mappedDatas.filter(item => item.name === 'Social Rumors');
const singleChart = mappedDatas.filter(item => item.name === 'Single Chart');
const miniDashboard = mappedDatas.filter(
  item => item.name === 'Mini Dashboard'
);
const fullDashboard = mappedDatas.filter(
  item => item.name === 'Full Dashboard'
);
const gtc = mappedDatas.filter(item => item.name === 'Gallery, text, chassis');
const searchLocate = mappedDatas.filter(item => item.name === 'Search Locate');
const roadmap = mappedDatas.filter(item => item.name === 'Roadmap');
const sparesParts = mappedDatas.filter(item => item.name === 'Spares Parts');
const brandsChart = mappedDatas.filter(
  item => item.name === '"Active Brand Charts"'
);
const maisonCharts = mappedDatas.filter(
  item => item.name === 'Active Maison Charts'
);
const auctionCharts = mappedDatas.filter(
  item => item.name === 'Active Auction Charts'
);
const indexCharts = mappedDatas.filter(
  item => item.name === 'Active Index Charts'
);
const familyCharts = mappedDatas.filter(
  item => item.name === 'Active Family Charts'
);
const modelCharts = mappedDatas.filter(
  item => item.name === 'Active Model Charts'
);
const cardsStore = useCardsPlansStore(); // init

// Function
const buyThisPlan = (familyId: number) => {
  const family = nameFamilies.find(item => item.family === familyId);
  emits('buyThisPlan', family);
  cardsStore.setCurrentFamilyId(familyId);
};
</script>

<template>
  <div class="flex items-start gap-[25px]">
    <div class="flex flex-col bg-white items-start gap-[25px]">
      <div
        class="flex flex-col h-[456px] items-center gap-[10px] flex-shrink-0"
      >
        <div
          class="flex w-[526px] justify-center items-center"
          style="
            padding: 18px 26px 18px 25px;
            border-radius: 12px 12px 0px 0px;
            border-bottom: 1px solid rgba(33, 37, 41, 0.5);
            background: rgba(255, 218, 68, 0.25);
          "
        >
          <div class="flex w-[475px] items-center gap-[210px] flex-shrink-0">
            <div
              class="flex flex-col items-start gap-[8px]"
              v-for="(item, index) in nameFamilies"
              key="index"
            >
              <div
                class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
              >
                {{ item.name }}
              </div>
              <div
                class="flex w-[161px] flex-column-reverse justify-center items-start gap-[2px]"
              >
                <div
                  class="text-gray-600 self-stretch font-inter text-sm font-normal leading-[20px]"
                  v-if="item.name === 'Free-user'"
                >
                  Perpetual Plan
                </div>
                <div
                  class="text-gray-600 self-stretch font-inter text-sm font-normal leading-[20px]"
                  v-if="item.name === 'Pay-per-use'"
                >
                  Bolts required
                </div>
                <div
                  class="text-gray-600 self-stretch font-inter text-sm font-normal leading-[20px]"
                  v-if="
                    item.name === 'Ready Plan' || item.name === 'Start Plan'
                  "
                >
                  Monthly Plan
                </div>
                <div
                  class="text-gray-600 self-stretch font-inter text-sm font-normal leading-[20px]"
                  v-if="item.name === 'Go Plan' || item.name === 'Pro Plan'"
                >
                  Annual Plan
                </div>
                <div class="flex items-start">
                  <img
                    src="@/assets/images/bronze_token.png"
                    alt=""
                    style="width: 28px; height: 28px"
                  />
                  <div
                    class="text-gray-900 font-inter text-[24px] font-semibold leading-[32px]"
                  >
                    {{ item.prezzo }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col h-[94px] items-start gap-[2px]"
              v-for="(item, index) in boltsCredits"
              key="index"
            >
              <div class="flex flex-col items-start gap-[8px]">
                <div class="flex w-[90px] items-center gap-[4px]">
                  <img
                    src="@/assets/images/bolt.png"
                    alt=""
                    class="w-[26px] h-[26px]"
                  />
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
        <div
          class="flex w-[510px] h-[216px] items-start gap-[6px] flex-shrink-0"
        >
          <div
            class="flex w-[252px] h-[216px] flex-col items-start flex-shrink-0"
          >
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="w-[24px] h-[24px]"
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
          <div
            class="flex w-[252px] h-[216px] flex-col items-start flex-shrink-0"
          >
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
                src="@/assets/icons/x-circle-fill.svg"
                alt=""
                class="w-[24px] h-[24px]"
              />
              <img
                v-if="item.propertiesValue < '-1'"
                src="@/assets/icons/x-circle-fill.svg"
                alt=""
                class="w-[24px] h-[24px]"
              />
            </div>
          </div>
        </div>

        <div class="flex items-start gap-[6px]">
          <div
            class="flex w-[252px] h-[216px] flex-col items-start flex-shrink-0"
          >
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="w-[24px] h-[24px]"
                />
                <div class="text-column-header">Services</div>
              </div>
            </div>
            <div class="cell-container">
              <div class="flex items-center gap-[4px]">
                <img
                  src="@/assets/images/bolt.png"
                  alt=""
                  class="w-[18px] h-[18px]"
                />
                <div class="cell-text">Bolts</div>
              </div>
            </div>
          </div>
          <div
            class="flex w-[252px] h-[216px] flex-col items-start flex-shrink-0"
          >
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
      <div
        class="flex flex-col items-start gap-[16px] flex-shrink-0"
        style="padding: 1px 0px"
      >
        <div
          class="flex w-[526px] justify-center items-center flex-shrink-0"
          style="padding: 3px 0px 0px 0px"
        >
          <div
            class="flex w-[526px] h-[46px] justify-center items-center flex-shrink-0"
            style="
              padding: 10.5px 13px 11.5px 13px;
              border-bottom: 1px solid rgba(33, 37, 41, 0.5);
              background: rgba(255, 218, 68, 0.25);
            "
          >
            <div
              class="w-[500px] flex-shrink-0 text-[#3C3C3C] text-base font-normal"
              style="font-family: Montserrat"
            >
              Below period usage limits
            </div>
          </div>
        </div>
      </div>
      <!--          MIDDLE Table-->
      <div class="w-full flex justify-center">
        <div class="flex w-[510px] h-[379px] items-start gap-[6px]">
          <!--              prima colonna-->
          <div
            class="flex w-[168px] h-[384px] flex-col items-start flex-shrink-0"
          >
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/icons/GreenCheck.svg"
                  alt=""
                  class="w-[24px] h-[24px]"
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
          <div
            class="flex w-[56px] h-[384px] flex-col items-start flex-shrink-0"
          >
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
          <div
            class="flex w-[82px] h-[384px] flex-col items-start flex-shrink-0"
          >
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
          <div
            class="flex w-[82px] h-[384px] flex-col items-start flex-shrink-0"
          >
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
          <div
            class="flex w-[82px] h-[384px] flex-col items-start flex-shrink-0"
          >
            <div class="column-container">
              <div class="inner-column-container">
                <img
                  src="@/assets/images/bolt.png"
                  alt=""
                  class="w-[24px] h-[24px]"
                />
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
      <div class="flex flex-col items-end gap-[25px]">
        <div class="flex flex-col h-[375px] items-center gap-[10px]">
          <div
            class="flex h-[46px] justify-center items-center flex-shrink-0"
            style="
              border-bottom: 1px solid rgba(33, 37, 41, 0.5);
              background: rgba(255, 218, 68, 0.25);
              padding: 11px 14px 11px 12px;
            "
          >
            <div
              class="w-[500px] text-[#3C3C3C] font-montserrat text-base font-normal leading-[24px]"
            >
              Use your bolts to activate further services
            </div>
          </div>
          <div class="w-full flex justify-center">
            <div
              class="flex w-[510px] h-[310px] items-start gap-[6px] flex-shrink-0"
            >
              <!--              prima colonna-->
              <div
                class="flex w-[252px] h-[303px] flex-col items-start flex-shrink-0"
              >
                <div class="column-container">
                  <div class="inner-column-container">
                    <img
                      src="@/assets/icons/currency-dollar.svg"
                      alt=""
                      class="w-[24px] h-[24px]"
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
              <div
                class="flex w-[252px] h-[303px] flex-col items-start flex-shrink-0"
              >
                <div class="column-container">
                  <div class="inner-column-container">
                    <img
                      src="@/assets/images/bolt.png"
                      alt=""
                      class="w-[24px] h-[24px]"
                    />
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
        </div>

        <div class="flex pr-[6px] items-center">
          <button
            class="flex text-white font-inter text-base font-normal leading-[24px] w-[230px] justify-center items-center gap-[8px] bg-[#212529]"
            style="
              border-radius: 4px;
              border: 1px solid #212529;
              padding: 6px 12px;
            "
            @click="buyThisPlan(nameFamilies[0].family)"
          >
            Buy plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
