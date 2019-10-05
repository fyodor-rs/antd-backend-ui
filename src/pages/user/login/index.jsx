import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
    autoLogin: true,
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values },
      });
    }
  };
  render() {
    const { userLogin, submitting } = this.props;
    const { success} = userLogin;
    const { autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
        forceRefresh={true}
          // defaultActiveKey={type}
          // onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          // onCreate={form => {
          //   this.loginForm = form;
          // }}
        >
            <UserName
              name="nickname"
              placeholder={`${formatMessage({
                id: 'user-login.login.userName',
              })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.userName.required',
                  }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })} `}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={e => {
                // e.preventDefault();
                console.log(e);
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
   
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
