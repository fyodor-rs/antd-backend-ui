import request from '@/utils/request';
export async function register(params) {
  return request('/server/register', {
    method: 'POST',
    data: params,
  });
}

