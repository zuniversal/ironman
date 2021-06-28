import React, { useEffect } from 'react';
import './style.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, connect } from 'umi';
import loginAvatar from '@/static/assets/loginAvatar.png';
import LoginForm from '@/components/Form/LoginForm';
import { logoutGuest } from '@/models/user';

const Login = props => {
  const [form] = Form.useForm();

  useEffect(() => {
    logoutGuest();
  }, []);

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  // props.dispatch({
  //   type: 'user/getNotifyAsync',
  //   payload: {
  //     name: 'zyb',
  //   },
  // });
  const onFinish = values => {
    console.log('onFinish 提交 : ', values, props);
    const { username, password } = values;
    props.dispatch({
      type: 'user/loginAsync',
      // payload: values,
      payload: values.values,
    });
  };

  return (
    <div className="loginWrapper">
      <div className="loginFormWrapper">
        <div className="f1"></div>
        <div className="loginForm">
          <div className="loginRow">
            {/* <img src={loginAvatar} className="loginAvatar" /> */}
            <div className="sysystemTitle">欢迎登录</div>
          </div>

          <LoginForm
            className="login-form"
            // name="normal_login"
            name="loginForm"
            initialValues={{
              remember: true,
              username: 'admin',
              password: 'afafa',
              username: '',
              password: '',
            }}
            onSubmit={onFinish}
            // onFinish={onFinish}
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
