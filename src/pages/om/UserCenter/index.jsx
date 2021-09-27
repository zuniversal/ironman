import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import UserCenterForm, {
  UserPasswordForm,
} from '@/components/Form/UserCenterForm';
import { UserManagePasswordForm } from '@/components/Form/UserManageActionForm';
import {
  actions,
  // mapStateToProps,
} from '@/models/userCenter';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

export const TITLE = '用户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ userCenter, user }) => ({userCenter, ...user, });
const mapStateToProps = ({ userCenter }) => userCenter;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class UserCenter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderForm = params => {
    console.log(' renderForm ： ', params, this.state, this.props);
    const { action } = this.props;
    const formComProps = {
      action,
      // init: this.props.userInfo.user,
      init: this.props.itemDetail,
    };
    const {
      location: { query },
    } = this.props;

    console.log(
      ' formComProps ： ',
      formComProps,
      this.props.itemDetail,
      query,
    );
    const formCom =
      query.action === 'pwd' ? (
        <UserPasswordForm
          {...formComProps}
          handleOk={this.handleOk}
        ></UserPasswordForm>
      ) : (
        <UserCenterForm
          {...formComProps}
          handleOk={this.handleOk}
        ></UserCenterForm>
      );

    return !!Object.keys(this.props.itemDetail).length ? (
      formCom
    ) : (
      <div className={`t-c`}>获取不到个人信息数据！</div>
    );
  };
  handleOk = async props => {
    console.log(' handleOk,  , ： ', props);
    const { form, action } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      const formData = props.form.getFieldsValue();
      if (
        action === 'changePwdAsync' &&
        formData.rePassword !== formData.password
      ) {
        tips('2次密码不一致！', 2);
        return;
      }

      if (action === 'changePwdAsync') {
        this.props.changePwdAsync({
          ...res,
        });
        return;
      }

      if (action === 'edit') {
        if (
          res.head_img &&
          res.head_img.fileList &&
          res.head_img.fileList.length > 0
        ) {
          const fileList = res.head_img.fileList;
          console.log(' fileList ： ', fileList);
          res.head_img = fileList.map(v => v.response.url).join(',');
        } else {
          res.head_img = null;
        }
        this.props.editItemAsync({
          ...res,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  componentDidMount() {
    // this.props.getItemAsync({
    //   d_id: '1',
    //   custom_id: '1',
    // });
    this.props.getItemAsync({});
  }

  render() {
    console.log(
      ' %c UserCenter 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className="UserCenter">{this.renderForm()}</div>;
  }
}

export default UserCenter;
