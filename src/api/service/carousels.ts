import { commonRequest } from './axios';

export async function fetchCarousels(currentPage: number, pageSize: number) {
  const response = await commonRequest.get('/api/carousels', {
    params: {
      pageNumber: currentPage,
      pageSize: pageSize,
    },
  });
  return response.data;
}

export async function fetchCarouselDetail(id: string) {
  const response = await commonRequest.get(`/api/carousels/${id}`);
  return response.data;
}

export async function addCarousels(
  carouselUrl: string,
  redirectUrl: string,
  carouselRank: any
) {
  const response = await commonRequest.post('/api/carousels', {
    carouselUrl,
    redirectUrl,
    carouselRank,
  });
  return response.data;
}

export async function updateCarousels(
  carouselId: any,
  carouselUrl: string,
  redirectUrl: string,
  carouselRank: any
) {
  const response = await commonRequest.put('/api/carousels', {
    carouselId,
    carouselUrl,
    redirectUrl,
    carouselRank,
  });
  return response.data;
}

export async function deleteCarousels(ids: any) {
  const response = await commonRequest.delete('/api/carousels', {
    data: {
      ids,
    },
  });
  return response.data;
}

export async function fetchIndexConfig(
  pageNumber: any,
  pageSize: any,
  configType: any
) {
  const response = await commonRequest.get('/api/indexConfigs', {
    params: {
      pageNumber,
      pageSize,
      configType,
    },
  });
  return response.data;
}
