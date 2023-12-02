export const buildURLQuery = (obj: object) => {
  return Object.entries(obj)
    .filter((pair: any) => pair[1])
    .map((pair: any) => {
      if (pair[1]) return pair.map(encodeURIComponent as any).join(':');
    })
    .join(',');
};

export const buildQS = (params?: any) => {
  const object: any = {};

  if (params?.size && params?.page !== null) {
    object.page = params?.page;
    object.size = params?.size;
  }

  if (params?.search) {
    if (buildURLQuery(params.search))
      object.search = buildURLQuery(params.search).toString();
    else delete object.search;
  }

  if (params?.sort) {
    if (buildURLQuery(params.sort))
      object.sort_by = buildURLQuery(params.sort).toString();
    else delete object.sort_by;
  }

  return (<any>Object)
    .entries(object)
    .filter((pair: any) => pair[1])
    .map((pair: any) => {
      if (pair[1]) return pair.join('=');
    })
    .join('&');
};
