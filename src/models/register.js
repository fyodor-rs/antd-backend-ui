import {
  routerRedux
} from 'dva/router';
import {
  stringify
} from 'querystring';
import {
  register
} from '@/services/register';
import {
  message
} from 'antd';
const Model = {
  namespace: 'register',
  state: {
    success: true,
    message: ""
  },
  effects: {
    * register({
      payload
    }, {
      call,
      put
    }) {
      console.log(payload)
      const response = yield call(register, payload);
      console.log(response)
      yield put({
        type: 'changeRegisterStatus',
        payload: response,
      }); 
      if (response.success) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
        message.success('注册成功！');
      }else{
        message.error(response.message);
      }
    }
  },
  reducers: {
    changeRegisterStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return { ...state, success: payload.success,message:payload.message };
    },
  },
};
export default Model;
