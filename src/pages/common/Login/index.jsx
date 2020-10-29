import React, { Component } from 'react';
import './style.less';
import { getItem, setItem, setItems, tips } from '@/utils';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import axios from 'axios'; //
const FormItem = Form.Item;

export const isDev = process.env.NODE_ENV === 'development';

export const TEST_URL = `http://188.131.235.243:31002/api/v1/`;
export const PROXY_URL = `/api/v1/`;
export const BASE_URL = isDev ? PROXY_URL : TEST_URL;
const Login = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    // form.validateFields(async (err, values) => {
    // if (!err) {
    // console.log('Received values of form1: ', values)
    const { username, password } = values;

    const res = axios
      .post(
        BASE_URL + 'login',
        // { username: 'admin', password: 'afafa' }
        values,
      )
      .then(res => {
        console.log('  login  ： ', res);
        localStorage.setItem('token', res.data.token);
        history.push('/om/home');
      })
      .catch(err => {
        console.log('  err catch  ： ', err, { ...err });
        tips(err.response.data.msg_show, 2);
      });
    // }
  };

  // logins = () => {
  //   console.log('loginss ：', )

  // }
  // render() {
  //   const { getFieldDecorator } = this.props.form
  //   const isRemember = getItem('remember')
  //   console.log(' isRemember ： ', isRemember,  )//
  //   const user_id = isRemember ? getItem('user_id') : ''

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="esTitle">OMS System</div>

        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            username: 'admin',
            password: 'afafa',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
        {/* <div onClick={this.logins} className="logins"></div> */}
      </div>
    </div>
  );
};
export default Login;
