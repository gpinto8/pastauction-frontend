import axios from 'axios';

export async function fetchProductListById(tablename, column_name) {
  try {
    const response = await axios.get(`https://pastauction.com/api/v1/product/list`, {
      params: {
        tablename: tablename,
        column_name: column_name,
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${btoa("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjBhYzY1Yi0yNDYwLTRjOTUtODg2Zi0zMmE4NjQ0MTRkNDIiLCJleHAiOjE3MTExNDcwMzV9.659LaJmY4LXaSYyC4oZb4-RaW1oPWZ5NGWIngr2Dnnk")}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
    throw error;
  }
}

