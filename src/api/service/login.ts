import { commonRequest } from './axios';

export async function login(userName: string, passwordMd5: string) {
  const response = await commonRequest.post('/api/adminUser/login', {
    userName,
    passwordMd5,
  });
  return response.data;
}
