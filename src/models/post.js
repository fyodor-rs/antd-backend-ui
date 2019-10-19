// import { routerRedux } from 'dva/router';
// import { stringify } from 'querystring';
import { queryPost, queryPostBySearch, addPost,deletePost,editPost ,getPostById,queryTags} from '@/services/post';
// import { getPageQuery } from '@/utils/utils';
// import  {Storage}  from '@/utils/storage';
import {
  message
} from 'antd';
const Model = {
  namespace: 'post',
  state: {
    postList:[],
    tagList:[],
    post:null
  },
  effects: {
    *queryTags({payload},{call,put}){
      const response=  yield call(queryTags,payload);
      yield put({
        type: 'saveTagList',
        payload: response,
      });
    },
    *queryPost({payload},{call,put}){
      const response=  yield call(queryPost,payload);
      yield put({
        type: 'savePostList',
        payload: response,
      });
    },
    *queryPostBySearch({payload},{call,put}){
      const response=  yield call(queryPostBySearch,payload);
      yield put({
        type: 'savePostList',
        payload: response,
      });
    },
    *getPostById({payload},{call,put}){
      const response=  yield call(getPostById,payload);
      yield put({
        type: 'savePostInfo',
        payload: response,
      });
    },
    *addPost({ payload }, { call, put }) {
      const response=  yield call(addPost,payload);
      if(response.success){
        yield put({
          type: 'queryPost'
        });
        yield put({
          type: 'queryTags'
        });
        message.success(response.message,2);
      }else{
        message.error(response.message);
      }
    },

    *deletePost( {payload}, {call, put }) {
      const response=  yield call(deletePost,payload);
      if(response.success){
        yield put({
          type: 'queryPost'
        });
        message.success(response.message,2);
      }else{
        message.error(response.message);
      }
    },

    *editPost({payload},{call,put}){
      const response=  yield call(editPost,payload);
      if(response.success){
        yield put({
          type: 'savePostInfo',
          payload: response,
        });
        message.success(response.message,2);
      }else{
        message.error(response.message);
      }
    }
  },
  reducers: {
    savePostList(state, { payload }) {
      return { ...state, postList: payload.data};
    },
    savePostInfo(state, { payload }) {
      return { ...state, post: payload.data};
    },
    saveTagList(state, { payload }) {
      return { ...state, tagList: payload.data};
    },
  },
};
export default Model;
