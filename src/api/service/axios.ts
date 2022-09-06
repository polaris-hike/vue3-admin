import Axios from 'axios';
import config from '@/config';
import router from '@/router';
import { localGet } from '@/utils';

const commonRequest = Axios.create({
  timeout: 8000,
  headers: {
    token: localGet('token') || '',
  },
});
// commonRequest.defaults.headers['token'] = localGet('token') || '';
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

  return res;
});

export { commonRequest };
