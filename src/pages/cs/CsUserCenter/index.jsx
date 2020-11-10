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
import CsUserCenterForm from '@/components/Form/CsUserCenterForm'; //
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
} from '@/models/csUserCenter'; //
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

const mapStateToProps = ({ userCenter }) => userCenter;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class CsUserCenter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
      isStartEdit: false,
    };
  }

  startEdit = params => {
    console.log(' startEdit,  , ： ', params);
    this.setState({
      isStartEdit: !this.state.isStartEdit,
    });
  };
  handleOk = async props => {
    console.log(' handleOk,  , ： ', props);
    const { action } = this.props; //
    const { form } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        // this.props.editItemAsync({
        //   ...res,
        // });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  componentDidMount() {
    console.log(
      ' CsUserCenter 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    this.props.getItemAsync({
      d_id: '1',
    });
  }

  render() {
    return (
      <div className="UserCenter">
        {this.state.isStartEdit ? (
          <CsUserCenterEditForm handleOk={this.handleOk}></CsUserCenterEditForm>
        ) : (
          <CsUserCenterForm startEdit={this.startEdit}></CsUserCenterForm>
        )}
      </div>
    );
  }
}

export default CsUserCenter;
