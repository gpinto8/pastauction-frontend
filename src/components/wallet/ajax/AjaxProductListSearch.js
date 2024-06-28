import axios from 'axios';

export async function fetchProductListBySearch(key, value) {
  try {
    const response = await axios.get(`https://pastauction.com/api/v1/product/list`, {
      params: {
        search: `${key}:${value}`,
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${btoa("IVoauL&#2l$CqgX05sYvjXOsob2^jj5:CL2MTL7fkO7P1691wZ1LlHj*r^IIH&")}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
    throw error;
  }
}
