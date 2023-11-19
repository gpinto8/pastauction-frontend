import axios from 'axios';

export const post = (url: string, item: any) => axios.post(url, item);

export const put = (url: string, item: any) => axios.put(url, item);

export const get = (url: string) => axios.get(url);
export const elimina = (url: string) => axios.delete(url);

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
