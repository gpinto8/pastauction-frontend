import axios from 'axios';

export const httpPost = (url: string, item: any) => axios.post(url, item);

export const httpPut = (url: string, item: any) => axios.put(url, item);

export const httpGet = (url: string) => axios.get(url);
export const httpElimina = (url: string) => axios.delete(url);

export const getHtml = (url: string) => {
  const config: any = {
    url,
    method: 'GET',
    headers: {
      accept: 'text/html',
    },
  };
  return axios(config);
};

export const download = (url: string, payload: any) => {
  const config: any = {
    url,
    method: 'POST',
    responseType: 'blob',
    data: payload,
  };
  return axios(config);
};

export const upload = (url: string, payload: any) => {
  const config: any = {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload,
  };
  return axios(config);
};

export const load = (url: string) => {
  const config: any = {
    url,
    method: 'GET',
    responseType: 'blob',
  };
  return axios(config);
};
