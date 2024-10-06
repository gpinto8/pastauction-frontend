import axios from 'axios';

export const httpPost = (url: string, item: any) => axios.post(url, item);
export const httpUpload = (url: string, file: FormData) => {
  return axios.post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const httpPut = (url: string, item: any) => axios.put(url, item);
export const httpPatch = (url: string, item: any) => axios.patch(url, item);

export const httpGet = (url: string, config = {}) => axios.get(url, config);
export const httpDelete = (url: string) => axios.delete(url);

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

export function formattedListOfParams(paramsList: (string | null)[], delimiter = ',') {
    return paramsList.filter(param => param != null && param.length > 0).join(delimiter)
}
