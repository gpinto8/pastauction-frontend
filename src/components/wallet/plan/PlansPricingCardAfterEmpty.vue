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
import { onMounted, ref } from 'vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { useCardsPlansStore } from '@/store/plans/cards';

// Variables
const props = defineProps<{
  compare: Product[];
}>();

const mappedDatas = props.compare.map((item: any) => ({
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

// Variables
const cardsStore = useCardsPlansStore(); // init
const compareFamily = ref<Product[]>([]);
let isLoading = ref(true);
const id = cardsStore.getCurrentPlan;

// Function
onMounted(async () => {
  try {
    const response = await fetchProductListById(id);
    if (response) {
      compareFamily.value = response;
      isLoading.value = false;
    } else {
      console.error('Dati dei prodotti non trovati');
      isLoading.value = false;
    }
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei prodotti:', error);
    isLoading.value = false;
  }
});
</script>

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
