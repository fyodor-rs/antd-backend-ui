import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';
class SecurityLayout extends React.Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady, } = this.state;
    const { children, loading, currentUser,userInfo } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
     const queryString = stringify({
      redirect: window.location.href,
    });
    // if(currentUser.status&&currentUser.status=='401'){
    //   return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    // }
    const isLogin = currentUser &&userInfo
   
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ login, user, loading }) => ({
  userInfo:login.userInfo || user.userInfo,
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
