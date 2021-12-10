import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, connect } from 'umi';
import loginAvatar from '@/static/assets/loginAvatar.png';
import ForgetPwdForm from '@/components/Form/ForgetPwdForm';
import { tips } from '@/utils';

const ForgetPwd = props => {
  const [form] = Form.useForm();

  const getCode = params => {
    console.log(' getCode   params,   ： ', params);
    tips('验证码已发送！');
  };

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  const onFinish = values => {
    console.log('Received values of form: ', values, props);
    const { username, password } = values;
    history.push('/resetPwd');
    // props.dispatch({
    //   type: 'user/loginAsync',
    //   payload: values,
    // });
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

          <ForgetPwdForm
            className="login-form"
            initialValues={{
              remember: true,
              username: 'admin',
              password: 'afafa',
              username: '',
              password: '',
            }}
            onSubmit={onFinish}
            getCode={getCode}
          >
            <Form.Item className={`btnFormItem`} noStyle>
              <Button
                type="primary"
                // htmlType="submit"
                className="actionBtn"
                onClick={() => goPage('/resetPwd')}
              >
                下一步
              </Button>
            </Form.Item>
          </ForgetPwdForm>
        </div>
      </div>
    </div>
  );
};

// export default ForgetPwd;
export default connect()(ForgetPwd);
