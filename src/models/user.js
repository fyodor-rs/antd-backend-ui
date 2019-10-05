import { queryCurrent, query as queryUsers } from '@/services/user';
import {Storage} from '@/utils/storage'
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userInfo:''
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      let storage= new Storage();
      const userInfo= storage.getItem('nickname');
      return { ...state, currentUser: action.payload || {},userInfo:userInfo };
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
