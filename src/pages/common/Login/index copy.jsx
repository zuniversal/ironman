import React, { Component } from 'react';
import './style.less';
import { getItem, setItem, setItems } from 'utils';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { history } from 'umi';
const FormItem = Form.Item;

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // return
        // const {user_id, password, remember} = values
        // setItem('remember', remember)
        // login({user_id, password}).then(res => {
        //   console.log('login  res ：', res, this.props,    )
        //   const {code, mes, content, success, } = res
        //   console.log(' success ： ', success   )//
        //   if (success) {
        //     // const {company_id} = data
        //     // const datas = {
        //     //   ...data[0]
        //     // }
        //     // setItems("company_id", company_id)
        //     setItems("userInfo", content)
        //     if (remember) {
        //       setItem('user_id', content.user_id)
        //     }
        //     console.log(' 跳转  ： ',  )//
        //     history.push('/')
        //   }
        // })
      }
    });
  };
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values)
  //       // return
  //       const {user_id, password, remember} = values
  //       setItem('remember', remember)
  //       login({user_id, password}).then(res => {
  //         console.log('login  res ：', res, this.props,    )
  //         const {code, mes, content, success, } = res
  //         console.log(' success ： ', success   )//
  //         if (success) {
  //           // const {company_id} = data
  //           // const datas = {
  //           //   ...data[0]
  //           // }
  //           // setItems("company_id", company_id)
  //           setItems("userInfo", content)
  //           if (remember) {
  //             setItem('user_id', content.user_id)
  //           }
  //           console.log(' 跳转  ： ',  )//
  //           history.push('calcYarn')
  //         }
  //       })
  //     }
  //   })
  // }

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
          initialValues={{ remember: true }}
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
        <div onClick={this.logins} className="logins"></div>
      </div>
    </div>
  );
};
export default Login;
