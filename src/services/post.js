import request from '@/utils/request';
export async function queryPost(params) {
  return request('/server/post/list', {
    method: 'get',
  });
}
export async function queryPostBySearch(params) {
  return request(`/server/post/list/${params}`)
}
export async function addPost(params) {
  return request(`/server/post/add`,{
      method: 'POST',
      data: params,
  });
}
export async function deletePost(params) {
    return request('/server/post/delete', {
      method: 'POST',
      data: params,
    });
  }
  export async function editPost(params) {
    return request(`/server/post/edit`,{
        method: 'POST',
        data: params,
    });
  }
  export async function getPostById(params) {
    return request(`/server/post/${params}`)
  }
  
  