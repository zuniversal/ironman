import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import UserCenterForm from '@/components/Form/UserCenterForm';

import {
  actions,
  // mapStateToProps,
} from '@/models/userCenter';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

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
    console.log(' formComProps ： ', formComProps);
    return (
      <UserCenterForm
        {...formComProps}
        handleOk={this.handleOk}
      ></UserCenterForm>
    );
  };
  handleOk = async props => {
    console.log(' handleOk,  , ： ', props);
    const { form, action } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'edit') {
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
