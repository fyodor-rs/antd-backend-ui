import request from '@/utils/request';
export async function query() {
  return request('/server/users');
}
export async function queryCurrent(name) {
  return request(`/server/currentUser?nickname=${name}`);
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryUserBySearch(params) {
  return request(`/server/users/${params}`)
}
export async function deleteUser(params) {
  return request('/server/user/delete', {
    method: 'POST',
    data: params,
  });
}

