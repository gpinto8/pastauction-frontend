import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { httpGet } from '@/api/api';

export const useCardsPlansStore = defineStore('cards', () => {
  // Variables
  const card = ref();
  const cardDetail = ref();
  const currentPlan = ref();

  const familyiId = ref(); // from PlansPrincingCard
  const familyiIdDetail = ref();
  const currentFamilyiId = ref();

  // METHODS
  // Cards
  const getCard = computed(() => card.value);
  const getCurrentPlan = computed(() => currentPlan.value);
  const setCurrentPlan = (plan: any) => {
    currentPlan.value = plan;
  }

  // familyId
  const getFamilyId = computed(() => familyiId.value);
  const getCurrentFamilyId = computed(() => currentFamilyiId.value)
  const setCurrentFamilyId = (familyiId: any) => {
    currentFamilyiId.value = familyiId;
  }

  interface Item {
    id: string;
    family: number;
    category: string;
    tipologia: string;
    prezzo: number;
    currency: string;
    name: string;
    // Aggiungi altri campi se necessario
  }

  interface Detail {
    limit: string;
    expire: string; // "expire(dd)"
    update: string; // "update(dd)"
    graphs: string;
    limit_daily: string;
    // Aggiungi altri campi se necessario
  }

  interface ItemWithDetail extends Item {
    detail: Detail;
  }
  async function plansCard(familyValue?: string) {
    try {
      const response = await httpGet(
        `/product/list?search=family%3A${familyValue}&page=1&size=50`
      );
      const itemsWithDetails = await Promise.all(
        response.data.items.map(async (item: Item) => {
          const detail = await cardDetails(item.id); // Assicurati che cardDetails sia definita e importata correttamente
          return { ...item, detail };
        })
      );

      card.value = { ...response.data, items: itemsWithDetails };
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function cardDetails(idValue?: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`/product/${idValue}/details`)
        .then(({ data }) => {
          cardDetail.value = data.items;
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
  

  return {
    plansCard,
    cardDetails,
    cardDetail,
    // Cards
    getCard,
    getCurrentPlan,
    setCurrentPlan,
    // family
    getFamilyId,
    getCurrentFamilyId,
    setCurrentFamilyId,
  };
});
