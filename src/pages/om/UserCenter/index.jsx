import React, { Component, PureComponent } from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Divider,
} from 'antd';
import SearchForm from '@/common/SearchForm'; //
import UserCenterForm from '@/components/Form/UserCenterForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import {
  actions,
  // mapStateToProps,
} from '@/models/userCenter'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

export const TITLE = '用户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

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
    const { action } = this.props; //
    const formComProps = {
      action,
      init: this.props.itemDetail,
    };
    console.log(' formComProps ： ', formComProps); //
    return (
      <UserCenterForm
        {...formComProps}
        handleOk={this.handleOk}
      ></UserCenterForm>
    );
  };
  handleOk = async props => {
    console.log(' handleOk,  , ： ', props);
    const { form, action } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      // if (action === 'edit') {
      //   this.props.editItemAsync({
      //     ...res,
      //   });
      // }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  componentDidMount() {
    this.props.getItemAsync({
      d_id: '3',
    });
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
