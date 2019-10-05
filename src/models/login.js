import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import  {Storage}  from '@/utils/storage';
import {
  message
} from 'antd';
const Model = {
  namespace: 'login',
  state: {
    success: true,
    userInfo:''
  },
  effects: {
    //payload:请求参数
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      
      if (response.success) {
        //保存token和用户信息
         let storage=new Storage();
         storage.setItem('nickname',response.data.nickname,3);
         storage.setItem(response.data.nickname,response.token);
         yield put({
          type: 'changeLoginInfo',
         });
        yield put(routerRedux.replace('/'));
        message.success('登录成功！',2);
      }else{
        message.error('用户名或密码错误!');
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, success: payload.success};
    },
    changeLoginInfo(state, { payload }){
        let storage= new Storage();
        const userInfo= storage.getItem('nickname');
        return { ...state,userInfo: userInfo};
    }
  },
};
export default Model;
