import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { queryPost, addPost,deletePost,editPost ,getPostById} from '@/services/post';
import { getPageQuery } from '@/utils/utils';
import  {Storage}  from '@/utils/storage';
import {
  message
} from 'antd';
const Model = {
  namespace: 'post',
  state: {
    postList:[],
    post:null
  },
  effects: {
    *queryPost({payload},{call,put}){
      const response=  yield call(queryPost,payload);
      yield put({
        type: 'savePostList',
        payload: response,
      });
    },
    *getPostById({payload},{call,put}){
      const response=  yield call(getPostById,payload);
      yield put({
        type: 'savePostList',
        payload: response,
      });
    },
    *addPost({ payload }, { call, put }) {
      const response=  yield call(addPost,payload);
      if(response.success){
        message.success(response.message,2);
      }else{
        message.error(response.message);
      }
    },

    *deletePost( payload , {call, put }) {
      
    },

    editPost({payload},{call,put}){

    }

  },
  reducers: {
    savePostList(state, { payload }) {
      return { ...state, postList: payload.data};
    },
    savePostInfo(state, { payload }) {
      return { ...state, post: payload.data};
    },
    // changeLoginInfo(state, { payload }){
    //     let storage= new Storage();
    //     const userInfo= storage.getItem('nickname');
    //     return { ...state,userInfo: userInfo};
    // }
  },
};
export default Model;
