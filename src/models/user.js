import {
  queryCurrent,
  query as queryUsers
} from '@/services/user';
import {
  Storage
} from '@/utils/storage'
import {
  routerRedux
} from 'dva/router';
import {
  stringify
} from 'querystring';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userInfo: ''
  },
  effects: {
    * fetchUsers(_, {
      call,
      put
    }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'changeUserLsit',
        payload: response.data,
      });
    },

    * fetchCurrent(_, {
      call,
      put
    }) {
      let storage = new Storage();
      let name = storage.getItem('nickname');
      const response = yield call(queryCurrent, name ? name.value : null);
      if (response.success) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      } else {
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
    changeUserLsit(state, {
      payload
    }) {
      return {
        ...state,
        userList: payload
      }
    },
    saveCurrentUser(state, action) {
      let storage = new Storage();
      const userInfo = storage.getItem('nickname');
      return {
        ...state,
        currentUser: action.payload || {},
        userInfo: userInfo
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
