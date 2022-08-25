import Axios from 'axios';
import config from '@/config';
import router from '@/router';

const commonRequest = Axios.create({
  baseURL: config.commonServiceHost,
  withCredentials: true,
  timeout: 8000,
});

commonRequest.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.resultCode == 419) {
      router.push({ path: '/login' });
    }
    return Promise.reject(res.data);
  }

  return res.data.data;
});

export { commonRequest };
