import { commonRequest } from './axios';

export async function userLogin(userName: string, passwordMd5: string) {
  const response = await commonRequest.post('/api/adminUser/login', {
    userName,
    passwordMd5,
  });
  return response.data;
}

export async function getProfile() {
  const response = await commonRequest.get('/api/adminUser/profile');
  return response.data;
}

export async function userLogout() {
  const response = await commonRequest.delete('/api/adminUser/logout');
  return response.data;
}
