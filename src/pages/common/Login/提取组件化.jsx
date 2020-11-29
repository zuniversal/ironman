import React from 'react';
import './style.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, connect } from 'umi';
import loginAvatar from '@/static/assets/loginAvatar.png';
import LoginForm from '@/components/Form/LoginForm'; //

const Login = props => {
  const [form] = Form.useForm();

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  const onFinish = values => {
    console.log('Received values of form: ', values, props);
    const { username, password } = values;
    props.dispatch({
      type: 'user/loginAsync',
      payload: values,
    });
  };

  return (
    <div className="loginWrapper">
      <div className="loginFormWrapper">
        <div className="f1"></div>
        <div className="loginForm">
          <div className="loginRow">
            <img src={loginAvatar} className="loginAvatar" />
            <div className="sysystemTitle">欢迎登录电管家平台</div>
          </div>

          <LoginForm
            className="login-form"
            name="normal_login"
            initialValues={{
              remember: true,
              username: 'admin',
              password: 'afafa',
              username: '',
              password: '',
            }}
            onFinish={onFinish}
          >
            <Form.Item className={`btnFormItem`} noStyle>
              <Button type="primary" htmlType="submit" className="actionBtn">
                登录
              </Button>
              <div className="forgetPwdRow">
                <div className="forgetPwd" onClick={() => goPage('forgetPwd')}>
                  忘记密码
                </div>
              </div>
            </Form.Item>
          </LoginForm>
        </div>
      </div>
    </div>
  );
};

// export default Login;
export default connect()(Login);
