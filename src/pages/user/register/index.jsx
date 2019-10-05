import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {
  Alert,
  Form,
  Input,
  Icon,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@connect(({ register, loading }) => ({
  userRegister: register,
  submitting: loading.effects['register/register'],
}))
class Register extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values['confirm']
        const { dispatch } = this.props;
        dispatch({
          type: 'register/register',
          payload: { ...values },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { userRegister, submitting } = this.props;
    const { success,message} = userRegister;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));
    
    return (
      <Form className={styles.main} {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input placeholder={formatMessage({id: 'user-login.nickname.placeholder'})}/>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder={formatMessage({id: 'user-login.email.placeholder'})}/>)}
        </Form.Item>
        <Form.Item  hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder={formatMessage({id: 'user-login.password.placeholder'})}/>)}
        </Form.Item>

        <Form.Item  hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder={formatMessage({id: 'user-login.confirm-password.placeholder'})}/>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={formatMessage({id: 'user-login.phone-number.placeholder'})}/>)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Link className={styles.link} to="/user/login">
               <FormattedMessage id="user-login.register.sign-in" />
          </Link>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm;
