import React, { PureComponent } from 'react';
import './style.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, connect } from 'umi';
import loginAvatar from '@/static/assets/loginAvatar.png';
import axios from 'axios'; //
const FormItem = Form.Item;

export const isDev = process.env.NODE_ENV === 'development';

export const TEST_URL = `http://188.131.235.243:31005/api/v1/`;
export const PROXY_URL = `/api/v1/`;
export const BASE_URL = isDev ? PROXY_URL : TEST_URL;

const ForgetPwd = props => {
  const [form] = Form.useForm();

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  const onFinish = values => {
    console.log('Received values of form: ', values, props);
    // form.validateFields(async (err, values) => {
    //   console.log('Received values of form1: ', values, err, props, );
    // if (!err) {
    const { username, password } = values;
    props.dispatch({
      type: 'user/loginAsync',
      payload: values,
    }); //
    // const res = axios
    //   .post(
    //     BASE_URL + 'login',
    //     // { username: 'admin', password: 'afafa' }
    //     values,
    //   )
    //   .then(res => {
    //     console.log('  login  ： ', res);
    //     localStorage.setItem('token', res.data.token);
    //     history.push('/om/home');
    //   })
    //   .catch(err => {
    //     console.log('  err catch  ： ', err, { ...err });
    //     tips(err.response.data.msg_show, 2);
    //   });
    // }
    // });
  };

  return (
    <div className="logins2 loginWrapper">
      <div className="loginFormWrapper">
        <div className="f1"></div>
        <div className="loginForm">
          <div className="loginRow">
            <img src={loginAvatar} className="loginAvatar" />
            <div className="sysystemTitle">欢迎登录电管家平台 忘记密码</div>
          </div>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              username: 'admin',
              password: 'afafa',
              username: '',
              password: '',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入手机号！' }]}
            >
              <Input className={`formItem`} placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input
                className={`formItem`}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item className={`btnFormItem`}>
              <Button type="primary" htmlType="submit" className="loginBtn">
                登录
              </Button>
              <div className="forgetPwdRow">
                <div className="forgetPwd" onClick={() => goPage('forgetPwd')}>
                  忘记密码
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

// export default ForgetPwd;
export default connect()(ForgetPwd);
