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
