import { cachableWithKey } from '@/lib/cachable'
import axios from 'axios'

// Funzione per ottenere la lista dei prodotti filtrata per ID e ordinata
async function _fetchProductListById (id: string | number) {
  try {
    const response = await axios.get(`https://pastauction.com/api/v1/product/list`, {
      params: {
        search: `family:${id}`,
        sort_by: 'id:asc',
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${btoa("IVoauL&#2l$CqgX05sYvjXOsob2^jj5:CL2MTL7fkO7P1691wZ1LlHj*r^IIH&")}`
      }
    })

    // Restituisci i dati ricevuti dalla chiamata
    return response.data
  } catch (error) {
    console.error('Errore durante la richiesta:', error)
    throw error
  }
}

export const fetchProductListById = cachableWithKey(_fetchProductListById)
